import OpenAI from 'openai';

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

interface ServerlessRequest {
  body?: ChatRequestBody | string;
  headers: Record<string, string | string[] | undefined>;
  method?: string;
}

interface ServerlessResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ServerlessResponse;
  json(body: unknown): void;
}

interface ResumeKnowledgeChunk {
  content: string;
  id: string;
  section: string;
  tags: string[];
  title: string;
}

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
const model = process.env.OPENAI_MODEL ?? 'gpt-5-mini';
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 10;
const rateLimitStore = new Map<string, RateLimitEntry>();
const assistantName = 'Andrew Aghoghovwia';
const resumeKnowledge: ResumeKnowledgeChunk[] = [
  {
    content:
      'Senior Frontend Engineer with 7+ years building fast, reliable, visually polished web applications. Strongest at combining scalable React and TypeScript architecture with practical generative AI integration. Known for maintainable code, cross-functional collaboration, mentoring, and measurable improvements such as 40% faster performance and 30% faster deployment turnaround.',
    id: 'summary',
    section: 'Professional Summary',
    tags: [
      'overview',
      'summary',
      'senior',
      'frontend',
      'fullstack',
      'ai',
      'impact',
      'leadership',
    ],
    title: 'Profile Snapshot',
  },
  {
    content:
      'Primary frontend stack includes TypeScript, React, Next.js App Router, Vue.js, HTML5, SCSS, Tailwind CSS, and Astro. State management experience includes Redux Toolkit, Zustand, and TanStack Query. Testing experience includes Jest, Vitest, Cypress, and Playwright. UI system experience includes shadcn/ui, Radix UI, MUI, Storybook, and HSBC’s Masala Design System.',
    id: 'frontend-stack',
    section: 'Technical Skills',
    tags: [
      'react',
      'typescript',
      'next.js',
      'frontend',
      'tailwind',
      'testing',
      'storybook',
      'design systems',
    ],
    title: 'Frontend Stack',
  },
  {
    content:
      'AI and modern product engineering experience includes OpenAI API, Gemini Pro Vision, retrieval-augmented generation systems, and vector databases such as Pinecone and Weaviate. Supporting backend and delivery tooling includes Node.js, AWS Lambda, S3, Docker, CI/CD, GitHub Actions, Vercel, and Supabase.',
    id: 'ai-stack',
    section: 'Technical Skills',
    tags: [
      'ai',
      'openai',
      'gemini',
      'rag',
      'pinecone',
      'weaviate',
      'node',
      'aws',
      'vercel',
      'supabase',
    ],
    title: 'AI and Platform Stack',
  },
  {
    content:
      'Since August 2023, Andrew has worked as a contract Frontend and AI Engineer focused on R&D. He engineered RAG systems using OpenAI APIs, Gemini Vision, Pinecone, and Weaviate; architected Next.js dashboards with serverless edge functions and sub-100ms response times; built accessible UI libraries with shadcn/ui and Storybook; and used Astro and Qwik to maximize Core Web Vitals and SEO.',
    id: 'contract-rnd',
    section: 'Experience',
    tags: [
      'contract',
      'frontend engineer',
      'ai engineer',
      'r&d',
      'next.js',
      'rag',
      'core web vitals',
      'seo',
    ],
    title: 'Contract and R&D Work',
  },
  {
    content:
      'At HSBC in Leeds from December 2022 to August 2023, Andrew served as Senior Frontend Developer. He delivered onboarding and ETL interfaces with React, TypeScript, and the Masala Design System; improved application performance by 40% through code splitting, lazy loading, and render optimization; refined AWS CodePipeline and Jenkins workflows with DevOps; and reduced deployment turnaround by 30% while mentoring junior developers.',
    id: 'hsbc',
    section: 'Experience',
    tags: [
      'hsbc',
      'enterprise',
      'performance',
      'ci/cd',
      'aws',
      'jenkins',
      'mentoring',
      'design system',
    ],
    title: 'HSBC Impact',
  },
  {
    content:
      'From February 2021 to November 2022, Andrew worked as a Lead Frontend Developer in the e-commerce sector. He delivered more than 10 high-performance Next.js and Tailwind storefronts integrated with Shopify APIs, built analytics dashboards using D3.js and Chart.js, and implemented GTM, GA4, Facebook Pixel, and automated SEO audits.',
    id: 'ecommerce',
    section: 'Experience',
    tags: [
      'e-commerce',
      'shopify',
      'analytics',
      'd3',
      'chart.js',
      'next.js',
      'seo',
    ],
    title: 'E-commerce Leadership',
  },
  {
    content:
      'From 2016 to 2020 at Kobu Innovative Solutions, Andrew worked as a Full Stack Web Developer. He led a major frontend rewrite from legacy code to React and Vue, improving load times and UX metrics by 30%, implemented WebSockets for realtime chat and notifications, and built payment-enabled commerce platforms using Stripe, PayPal, and mobile gateways.',
    id: 'kobu',
    section: 'Experience',
    tags: [
      'full stack',
      'react',
      'vue',
      'websockets',
      'stripe',
      'paypal',
      'payments',
      'realtime',
    ],
    title: 'Full-stack Foundations',
  },
  {
    content:
      'Featured projects include an AI Study Companion built with Next.js, OpenAI, and RAG for context-aware document Q&A plus Gemini Vision-based multimodal analysis; and a Real-Time Collaboration Board using WebSockets and Supabase with live cursors, threaded comments, and markdown autosave similar to Google Docs.',
    id: 'projects',
    section: 'Featured Projects',
    tags: [
      'projects',
      'study companion',
      'collaboration board',
      'supabase',
      'websockets',
      'multimodal',
    ],
    title: 'Featured Product Work',
  },
  {
    content:
      'Education: B.Sc. Library and Information Science from Delta State University, Nigeria. Certification: Code Warrior White Belt in React Security from 2023, focused on secure coding, XSS prevention, and SQL injection prevention.',
    id: 'education',
    section: 'Education and Certifications',
    tags: [
      'education',
      'degree',
      'certification',
      'react security',
      'xss',
      'sql injection',
    ],
    title: 'Education and Certification',
  },
];
const stopWords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'he',
  'how',
  'i',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'to',
  'what',
  'which',
  'with',
  'would',
  'you',
]);

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#/\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function scoreChunk(chunk: ResumeKnowledgeChunk, query: string, tokens: string[]) {
  const title = normalizeText(chunk.title);
  const section = normalizeText(chunk.section);
  const content = normalizeText(chunk.content);
  const tags = chunk.tags.map(normalizeText);
  const uniqueTokens = [...new Set(tokens)];
  let score = 0;

  for (const token of uniqueTokens) {
    if (tags.some((tag) => tag.includes(token))) {
      score += 5;
    }

    if (title.includes(token)) {
      score += 4;
    }

    if (section.includes(token)) {
      score += 3;
    }

    if (content.includes(token)) {
      score += token.length >= 5 ? 2.4 : 1.2;
    }
  }

  if (query.includes('why hire') || query.includes('strong fit')) {
    if (chunk.id === 'summary' || chunk.id === 'hsbc' || chunk.id === 'contract-rnd') {
      score += 6;
    }
  }

  return score;
}

function findResumeContext(question: string, limit = 4) {
  const normalizedQuestion = normalizeText(question);
  const tokens = tokenize(question);

  const ranked = resumeKnowledge
    .map((chunk) => ({
      chunk,
      score: scoreChunk(chunk, normalizedQuestion, tokens),
    }))
    .sort((left, right) => right.score - left.score);

  const useful = ranked.filter((entry) => entry.score > 0).slice(0, limit);

  return (useful.length > 0 ? useful : ranked.slice(0, limit)).map(
    (entry) => entry.chunk,
  );
}

function buildResumePrompt(context: ResumeKnowledgeChunk[]) {
  const contextBlock = context
    .map(
      (chunk, index) =>
        `[${index + 1}] ${chunk.title} (${chunk.section})\n${chunk.content}`,
    )
    .join('\n\n');

  return [
    `You are a concise hiring-assistant for ${assistantName}'s portfolio website.`,
    'Answer questions only from the provided resume knowledge and the visible conversation.',
    'If the answer is not grounded in the provided material, say that it does not appear in the current resume and suggest contacting Andrew directly.',
    'Optimize for recruiters and hiring managers: be precise, concrete, and easy to scan.',
    'Do not invent employers, dates, metrics, salary expectations, visa status, or portfolio links.',
    'Keep answers to roughly 2-5 sentences unless the user explicitly asks for more detail.',
    '',
    'Resume knowledge:',
    contextBlock,
  ].join('\n');
}

function jsonResponse(
  response: ServerlessResponse,
  body: unknown,
  status = 200,
) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.status(status).json(body);
}

function getClientKey(request: ServerlessRequest) {
  const forwardedFor = request.headers['x-forwarded-for'];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const ip = value?.split(',')[0]?.trim();
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

export default async function handler(
  request: ServerlessRequest,
  response: ServerlessResponse,
) {
  if (request.method !== 'POST') {
    return jsonResponse(response, { error: 'Method not allowed.' }, 405);
  }

  if (!client) {
    return jsonResponse(
      response,
      {
        error:
          'Resume chat is not configured yet. Set OPENAI_API_KEY in Vercel project settings.',
      },
      503,
    );
  }

  if (isRateLimited(getClientKey(request))) {
    return jsonResponse(
      response,
      { error: 'Too many requests. Please wait a moment and try again.' },
      429,
    );
  }

  let body: ChatRequestBody;

  try {
    body =
      typeof request.body === 'string'
        ? (JSON.parse(request.body) as ChatRequestBody)
        : ((request.body ?? {}) as ChatRequestBody);
  } catch {
    return jsonResponse(response, { error: 'Invalid request body.' }, 400);
  }

  const messages = normalizeMessages(body.messages ?? []);
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return jsonResponse(response, { error: 'A user message is required.' }, 400);
  }

  const context = findResumeContext(latestUserMessage.content, 4);
  const instructions = buildResumePrompt(context);

  try {
    const openAIResponse = await client.responses.create({
      input: messages.map((message) => ({
        content: [{ text: message.content, type: 'input_text' }],
        role: message.role,
      })),
      instructions,
      max_output_tokens: 420,
      model,
      store: false,
    });

    const answer = openAIResponse.output_text?.trim();

    if (!answer) {
      return jsonResponse(
        response,
        {
          error:
            'The assistant could not produce a response. Please try a more specific question.',
        },
        502,
      );
    }

    return jsonResponse(response, {
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
      response,
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
