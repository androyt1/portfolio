import {
  resumeKnowledge,
  type ResumeKnowledgeChunk,
} from '../data/resume-knowledge';

const assistantName = 'Andrew Aghoghovwia';

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

  if (query.includes('contact') || query.includes('email')) {
    if (chunk.id === 'summary') {
      score += 2;
    }
  }

  return score;
}

export function findResumeContext(question: string, limit = 4) {
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

export function buildResumePrompt(context: ResumeKnowledgeChunk[]) {
  const contextBlock = context
    .map(
      (chunk, index) =>
        `[${index + 1}] ${chunk.title} (${chunk.section})\n${chunk.content}`,
    )
    .join('\n\n');

  return [
    `You are a concise hiring-assistant for ${assistantName}'s portfolio website.`,
    `Answer questions only from the provided resume knowledge and the visible conversation.`,
    'If the answer is not grounded in the provided material, say that it does not appear in the current resume and suggest contacting Andrew directly.',
    'Optimize for recruiters and hiring managers: be precise, concrete, and easy to scan.',
    'Do not invent employers, dates, metrics, salary expectations, visa status, or portfolio links.',
    'Keep answers to roughly 2-5 sentences unless the user explicitly asks for more detail.',
    '',
    'Resume knowledge:',
    contextBlock,
  ].join('\n');
}
