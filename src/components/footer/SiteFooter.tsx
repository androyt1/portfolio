import { Container } from '@/components/layout/Container';
import { siteContent } from '@/data/portfolio';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 py-8">
      <Container className="text-center text-sm text-white/42">
        <p className="mx-auto max-w-4xl">
          {new Date().getFullYear()} {siteContent.name}. Built with React, TypeScript,
          Tailwind, Framer Motion, GSAP, Lenis, and an OpenAI-powered resume chat.
        </p>
      </Container>
    </footer>
  );
}
