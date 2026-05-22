import { ArrowUpRight, Download, Github, Globe, Linkedin, Mail } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { navigation, siteContent } from '@/data/portfolio';

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case 'github':
      return <Github className="h-4 w-4" />;
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
    case 'website':
      return <Globe className="h-4 w-4" />;
    default:
      return <ArrowUpRight className="h-4 w-4" />;
  }
}

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40">
      <Container className="pointer-events-auto">
        <div className="surface mx-auto flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <a className="flex items-center gap-3" href="#top">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/8">
              <img
                alt={siteContent.name}
                className="h-full w-full object-cover"
                src={siteContent.photoSrc}
              />
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">{siteContent.name}</p>
              <p className="text-xs text-white/50">{siteContent.role}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
              href={`mailto:${siteContent.email}`}
            >
              <Mail className="h-4 w-4" />
            </a>
            {siteContent.socialLinks.slice(0, 2).map((link) => (
              <a
                aria-label={link.label}
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white sm:flex"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {getSocialIcon(link.label)}
              </a>
            ))}
            <MagneticButton
              className="hidden sm:inline-flex"
              download
              href={siteContent.resumeHref}
              icon={<Download className="h-4 w-4" />}
            >
              Resume
            </MagneticButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
