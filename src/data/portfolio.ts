import photoFile from './photo.webp';
import resumeFile from './resume.pdf';

export const navigation = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
] as const;

export const siteContent = {
  name: 'Andrew Aghoghovwia',
  role: 'Senior Frontend Engineer & AI Specialist',
  headline:
    'Production AI systems with a frontend edge. RAG pipelines. Agentic workflows. Interfaces that make AI feel natural.',
  summary:
    'Senior engineer with 7+ years shipping production-grade products. I now specialise in AI engineering - building RAG pipelines, agentic systems, and LLM-powered features using LangChain, LangGraph, and OpenAI - with the frontend craft to make them feel seamless to users.',
  availability:
    'Open to senior frontend, full-stack, and AI product engineering roles',
  location: 'Carshalton, UK · Remote / Hybrid',
  email: 'androyt1@gmail.com',
  phone: '+44 7821 460751',
  photoSrc: photoFile,
  resumeHref: resumeFile,
  socialLinks: [] as { href: string; label: string }[],
  heroStats: [
    { label: 'Years shipping products', value: '7+' },
    { label: 'Frontend performance uplift', value: '40%' },
    { label: 'Deployment turnaround reduced', value: '30%' },
  ],
  sketchfabModel: {
    uid: '6e76a429bf1e4d9a87fa9eab73f70bc2',
    title: 'Futuristic device',
    creator: 'denj666',
    href: 'https://sketchfab.com/3d-models/futuristic-device-6e76a429bf1e4d9a87fa9eab73f70bc2',
    alternates: [
      {
        title: 'Premium Laptop 3D Model',
        href: 'https://sketchfab.com/3d-models/premium-laptop-3d-model-ar-view-1c14282b813e492897d8c2bf52bc7321',
      },
      {
        title: '2.0 - A Futuristic 3D Bot Model',
        href: 'https://sketchfab.com/3d-models/20-a-futuristic-3d-bot-model-c4d1c9c2a79e489b84bdd3790e0abe96',
      },
    ],
  },
} as const;

export const aboutHighlights = [
  {
    title: 'Scalable frontend systems',
    copy:
      'Advanced React, TypeScript, Next.js, Tailwind CSS, shadcn/ui, Storybook, and design-system work that stays maintainable under real product pressure.',
  },
  {
    title: 'AI product integration',
    copy:
      'Hands-on with LangChain, LangGraph, OpenAI, RAG pipelines, and vector databases such as Pinecone and Weaviate for context-aware product experiences.',
  },
  {
    title: 'Measured delivery impact',
    copy:
      'Track record of improving application performance by 40 percent, reducing deployment time by 30 percent, and mentoring teams toward cleaner delivery habits.',
  },
] as const;

export const coreStack = [
  {
    eyebrow: 'UI Systems',
    label: 'React',
    summary: 'Component architecture for complex, high-velocity product surfaces.',
  },
  {
    eyebrow: 'Typed Frontend',
    label: 'TypeScript',
    summary: 'Safer application structure, contracts, and long-term maintainability.',
  },
  {
    eyebrow: 'App Router',
    label: 'Next.js',
    summary: 'Hybrid rendering, server boundaries, and product-grade delivery patterns.',
  },
  {
    eyebrow: 'Model APIs',
    label: 'OpenAI',
    summary: 'LLM features, assistants, and product UX shaped around real model behavior.',
  },
  {
    eyebrow: 'Orchestration',
    label: 'LangChain',
    summary: 'Retrieval pipelines, tool wiring, and composable AI workflows.',
  },
  {
    eyebrow: 'Agents',
    label: 'LangGraph',
    summary: 'Stateful agent flows built for multi-step reasoning and action.',
  },
  {
    eyebrow: 'Retrieval',
    label: 'RAG',
    summary: 'Grounded answer systems designed for production trust and context quality.',
  },
  {
    eyebrow: 'Vector Search',
    label: 'Pinecone',
    summary: 'Fast semantic retrieval and memory layers for AI-native product features.',
  },
  {
    eyebrow: 'Tracing',
    label: 'LangSmith',
    summary: 'Evaluation, debugging, and observability for LLM workflows in production.',
  },
  {
    eyebrow: 'Runtime',
    label: 'Python',
    summary: 'Backend automation, orchestration services, and AI-focused service layers.',
  },
  {
    eyebrow: 'Styling',
    label: 'Tailwind',
    summary: 'Fast visual systems with consistent spacing, polish, and control.',
  },
  {
    eyebrow: 'Components',
    label: 'Storybook',
    summary: 'Shared UI primitives, documentation, and interface testing discipline.',
  },
  {
    eyebrow: 'Data Layer',
    label: 'Supabase',
    summary: 'Realtime data, auth, and operational speed for product teams.',
  },
  {
    eyebrow: 'Infrastructure',
    label: 'AWS',
    summary: 'Deployment, scaling, and cloud primitives behind reliable product delivery.',
  },
] as const;

export const skillGroups = [
  {
    title: 'Frontend Systems',
    summary:
      'Advanced product UI architecture, responsive performance, and scalable component strategy.',
    skills: [
      { label: 'React + TypeScript', level: 97 },
      { label: 'Next.js App Router + Astro', level: 92 },
      { label: 'Tailwind CSS + design systems', level: 95 },
      { label: 'Testing with Vitest, Cypress, Playwright', level: 88 },
    ],
  },
  {
    title: 'AI Product Delivery',
    summary:
      'Shipping AI-enhanced features with real product constraints in mind.',
    skills: [
      { label: 'OpenAI API + Gemini Vision', level: 91 },
      { label: 'RAG systems + retrieval orchestration', level: 89 },
      { label: 'Vector databases: Pinecone / Weaviate', level: 86 },
      { label: 'Prompt and workflow UX design', level: 87 },
    ],
  },
  {
    title: 'Platform & Delivery',
    summary:
      'Enough backend and DevOps fluency to own production outcomes, not just interfaces.',
    skills: [
      { label: 'Node.js, Supabase, serverless APIs', level: 89 },
      { label: 'AWS, Docker, CI/CD', level: 87 },
      { label: 'State: Redux Toolkit, Zustand, TanStack Query', level: 92 },
      { label: 'SEO, Core Web Vitals, analytics', level: 90 },
    ],
  },
] as const;

export const projects = [
  {
    title: 'AI Study Companion',
    outcome: 'Context-aware document Q&A with multimodal analysis',
    description:
      'Built a study assistant that lets users upload materials, ask natural-language questions, and receive grounded responses using retrieval and multimodal reasoning.',
    stack: ['Next.js', 'OpenAI', 'Gemini Vision', 'RAG', 'Pinecone'],
    liveHref: '#contact',
    repoHref: '#contact',
    accent: 'from-cyan-300/25 via-sky-300/10 to-transparent',
    highlight:
      'Retrieval grounding, multimodal analysis, and polished learning workflows',
  },
  {
    title: 'Real-Time Collaboration Board',
    outcome: 'Google-Docs-style collaboration for product teams',
    description:
      'Developed a collaborative workspace with live cursors, threaded comments, markdown autosave, and multiplayer feedback loops powered by realtime infrastructure.',
    stack: ['React', 'TypeScript', 'Supabase', 'WebSockets', 'Tailwind'],
    liveHref: '#contact',
    repoHref: '#contact',
    accent: 'from-fuchsia-200/20 via-indigo-200/8 to-transparent',
    highlight:
      'Realtime presence, autosave behavior, and team workflow clarity',
  },
  {
    title: 'Enterprise Onboarding Platform',
    outcome: '40 percent faster frontend performance at enterprise scale',
    description:
      'Delivered complex onboarding and ETL tracking interfaces at HSBC, pairing React and TypeScript with a disciplined design-system approach and better delivery infrastructure.',
    stack: ['React', 'TypeScript', 'AWS', 'Jenkins', 'Masala Design System'],
    liveHref: '#experience',
    repoHref: '#experience',
    accent: 'from-emerald-200/20 via-slate-100/10 to-transparent',
    highlight:
      'Performance work, enterprise UI, and deployment pipeline improvements',
  },
] as const;

export const experience = [
  {
    company: 'Contract / R&D',
    role: 'Frontend & AI Engineer',
    period: 'Aug 2023 - Present',
    summary:
      'Design and build AI-powered product experiences, from retrieval architecture and multimodal workflows to polished, production-grade frontend delivery.',
    bullets: [
      'Engineered RAG systems integrating OpenAI APIs and Gemini Vision with Pinecone and Weaviate for context-aware responses.',
      'Architected scalable dashboards with Next.js App Router and serverless edge functions, hitting sub-100ms response times in data-heavy views.',
      'Built modular, accessible UI libraries with shadcn/ui and Storybook to standardize delivery across client projects.',
      'Used Astro and Qwik for static content delivery to maximize Core Web Vitals and SEO.',
    ],
  },
  {
    company: 'HSBC, Leeds, UK',
    role: 'Senior Frontend Developer',
    period: 'Dec 2022 - Aug 2023',
    summary:
      'Delivered onboarding and ETL tracking interfaces in a regulated enterprise environment with a high bar for performance, design consistency, and release reliability.',
    bullets: [
      'Built complex interfaces with React, TypeScript, and the internal Masala Design System.',
      'Improved application performance by 40 percent through code splitting, lazy loading, and component-level optimization.',
      'Partnered with DevOps on AWS CodePipeline and Jenkins workflows, reducing deployment turnaround by 30 percent.',
      'Mentored junior developers and drove cleaner design patterns through code reviews.',
    ],
  },
  {
    company: 'E-commerce Sector, Remote',
    role: 'Lead Frontend Developer (Contract)',
    period: 'Feb 2021 - Nov 2022',
    summary:
      'Owned storefront performance and analytics-heavy product surfaces across multiple e-commerce builds.',
    bullets: [
      'Delivered more than 10 high-performance e-commerce platforms with Next.js and Tailwind CSS, integrated with Shopify APIs.',
      'Designed custom admin dashboards with D3.js and Chart.js for live sales analytics and conversion funnels.',
      'Integrated GTM, GA4, and Facebook Pixel while automating SEO audits for stronger search visibility.',
    ],
  },
  {
    company: 'Kobu Innovative Solutions, Warri, Nigeria',
    role: 'Full Stack Web Developer',
    period: '2016 - 2020',
    summary:
      'Handled full-stack web delivery across frontend modernization, realtime product behavior, and payment-enabled commerce solutions.',
    bullets: [
      'Led a major frontend rewrite from legacy code to React and Vue, improving page load times and user experience metrics by 30 percent.',
      'Implemented WebSockets for realtime chat, live notifications, and dynamic content updates.',
      'Built e-commerce solutions integrating Stripe, PayPal, and mobile payment gateways.',
    ],
  },
] as const;

export const services = [
  {
    title: 'Frontend architecture',
    copy:
      'React and Next.js systems, state strategy, design-system structure, and codebases that stay clean when products grow fast.',
  },
  {
    title: 'AI feature integration',
    copy:
      'Practical AI product work using OpenAI APIs, Gemini Vision, retrieval pipelines, and UX that makes model behavior feel useful rather than gimmicky.',
  },
  {
    title: 'Performance-minded delivery',
    copy:
      'Performance optimization, CI/CD hardening, SEO, and the quality controls that move polished features into production with less friction.',
  },
] as const;
