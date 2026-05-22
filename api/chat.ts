import OpenAI from 'openai';

import { buildResumePrompt, findResumeContext } from '../src/lib/resume-retrieval';

interface ChatRequestMessage {
  content: string;
  role: 'assistant' | 'user';
}

interface ChatRequestBody {
  messages?: ChatRequestMessage[];
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
const model = process.env.OPENAI_MODEL ?? 'gpt-5-mini';
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 10;
const rateLimitStore = new Map<string, RateLimitEntry>();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    status,
  });
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim();
  return ip || 'anonymous';
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(clientKey);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return false;
  }

  if (entry.count >= rateLimitMaxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

function normalizeMessages(messages: ChatRequestMessage[]) {
  return messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .map((message) => ({
      content: message.content.trim().slice(0, 1_200),
      role: message.role,
    }))
    .filter((message) => message.content.length > 0)
    .slice(-8);
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  if (!client) {
    return jsonResponse(
      {
        error:
          'Resume chat is not configured yet. Set OPENAI_API_KEY in Vercel project settings.',
      },
      503,
    );
  }

  if (isRateLimited(getClientKey(request))) {
    return jsonResponse(
      { error: 'Too many requests. Please wait a moment and try again.' },
      429,
    );
  }

  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  const messages = normalizeMessages(body.messages ?? []);
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return jsonResponse({ error: 'A user message is required.' }, 400);
  }

  const context = findResumeContext(latestUserMessage.content, 4);
  const instructions = buildResumePrompt(context);

  try {
    const response = await client.responses.create({
      input: messages.map((message) => ({
        content: [{ text: message.content, type: 'input_text' }],
        role: message.role,
      })),
      instructions,
      max_output_tokens: 420,
      model,
      store: false,
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      return jsonResponse(
        {
          error:
            'The assistant could not produce a response. Please try a more specific question.',
        },
        502,
      );
    }

    return jsonResponse({
      answer,
      citations: context.map((chunk) => ({
        id: chunk.id,
        section: chunk.section,
        title: chunk.title,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unexpected upstream error while generating the response.';

    return jsonResponse(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? message
            : 'The chat service is temporarily unavailable.',
      },
      500,
    );
  }
}
