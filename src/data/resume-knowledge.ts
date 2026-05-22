export interface ResumeKnowledgeChunk {
  content: string;
  id: string;
  section: string;
  tags: string[];
  title: string;
}

export const resumeChatPromptSuggestions = [
  'What makes Andrew a strong senior frontend hire?',
  'Summarize his AI product experience.',
  'What impact did he have at HSBC?',
  'Which frontend stack does he use most often?',
] as const;

export const resumeKnowledge: ResumeKnowledgeChunk[] = [
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
