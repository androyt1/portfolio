import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { useState, type MouseEvent } from 'react';

import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { navigation, siteContent } from '@/data/portfolio';
import { useDeviceProfile } from '@/hooks/use-device-profile';

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
  const { allowViewportMotion } = useDeviceProfile();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (href: string) => {
    if (typeof window === 'undefined' || !href.startsWith('#')) {
      return;
    }

    if (href === '#top') {
      window.history.replaceState(null, '', href);
      window.scrollTo({ behavior: allowViewportMotion ? 'smooth' : 'auto', top: 0 });
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) {
      return;
    }

    const headerBar = document.querySelector<HTMLElement>('[data-site-header-bar]');
    const headerOffset = headerBar?.getBoundingClientRect().height ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 24;

    window.history.replaceState(null, '', href);
    window.scrollTo({
      behavior: allowViewportMotion ? 'smooth' : 'auto',
      top: Math.max(top, 0),
    });
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();

    const runScroll = () => scrollToSection(href);
    if (isOpen) {
      window.requestAnimationFrame(() => window.requestAnimationFrame(runScroll));
      return;
    }

    runScroll();
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40">
      <Container className="pointer-events-auto">
        <div className="mx-auto space-y-3">
          <div
            className="surface flex items-center justify-between rounded-full px-4 py-3 sm:px-5"
            data-site-header-bar
          >
            <a
              className="flex items-center gap-3"
              href="#top"
              onClick={(event) => handleNavClick(event, '#top')}
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/8">
                <img
                  alt={siteContent.name}
                  className="h-full w-full object-cover"
                  src={siteContent.photoSrc}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  {siteContent.name}
                </p>
                <p className="hidden text-xs text-white/50 sm:block">{siteContent.role}</p>
              </div>
            </a>

            <nav className="hidden items-center gap-5 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                aria-label="Email"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white sm:flex"
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
              <button
                aria-controls="mobile-navigation"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
                onClick={() => setIsOpen((open) => !open)}
                type="button"
              >
                {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="surface overflow-hidden rounded-[1.75rem] px-4 py-4 lg:hidden"
                exit={{ opacity: 0, y: -10 }}
                id="mobile-navigation"
                initial={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <nav className="grid gap-1">
                  {navigation.map((item) => (
                    <a
                      className="rounded-2xl px-3 py-3 text-sm font-medium text-white/78 transition hover:bg-white/6 hover:text-white"
                      href={item.href}
                      key={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-3 border-t border-white/10 pt-4">
                  <MagneticButton
                    className="w-full"
                    download
                    href={siteContent.resumeHref}
                    icon={<Download className="h-4 w-4" />}
                  >
                    Download Resume
                  </MagneticButton>

                  <a
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/76 transition hover:bg-white/10 hover:text-white"
                    href={`mailto:${siteContent.email}`}
                    onClick={closeMenu}
                  >
                    <span>Email</span>
                    <Mail className="h-4 w-4" />
                  </a>

                  {siteContent.socialLinks.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {siteContent.socialLinks.map((link) => (
                        <a
                          className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/76 transition hover:bg-white/10 hover:text-white"
                          href={link.href}
                          key={link.label}
                          onClick={closeMenu}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span>{link.label}</span>
                          {getSocialIcon(link.label)}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}
