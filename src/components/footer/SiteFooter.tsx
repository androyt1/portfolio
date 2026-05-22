import { Container } from '@/components/layout/Container';
import { siteContent } from '@/data/portfolio';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 py-8">
      <Container className="flex flex-col gap-3 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {new Date().getFullYear()} {siteContent.name}. Built with React, TypeScript,
          Tailwind, Framer Motion, GSAP, Lenis, and an OpenAI-powered resume chat.
        </p>
        <p>Content, assets, and resume knowledge are sourced from `src/data/`.</p>
      </Container>
    </footer>
  );
}
