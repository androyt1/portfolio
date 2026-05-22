import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { siteContent } from '@/data/portfolio';

const contactCards = [
  {
    label: 'Email',
    value: siteContent.email,
    href: `mailto:${siteContent.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: siteContent.phone,
    href: `tel:${siteContent.phone.replace(/\s+/g, '')}`,
    icon: Phone,
  },
  {
    label: 'Location',
    value: siteContent.location,
    href: undefined,
    icon: MapPin,
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: siteContent.resumeHref,
    icon: Download,
  },
] as const;

export function ContactSection() {
  return (
    <SectionShell className="pb-24 sm:pb-28 lg:pb-32" id="contact">
      <Container className="space-y-12">
        <SectionHeading
          description="The close is intentionally direct: clear contact paths, immediate resume access, and enough signal that a recruiter can place the fit quickly."
          eyebrow="Contact"
          title="If the role needs strong frontend craft, AI product fluency, and dependable delivery, let’s talk."
        />

        <Reveal className="surface-strong rounded-[2rem] p-7 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="font-display text-3xl text-white sm:text-4xl">
                Available for senior frontend, full-stack, and AI product engineering conversations.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/66">
                I work best on products that care about interface quality,
                performance, and maintainable systems at the same time. If you are
                hiring for a role where modern frontend depth and practical AI
                integration both matter, this is the kind of work I want to be doing.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <MagneticButton
                href={`mailto:${siteContent.email}`}
                icon={<Mail className="h-4 w-4" />}
              >
                Start a Conversation
              </MagneticButton>
              <MagneticButton
                download
                href={siteContent.resumeHref}
                icon={<Download className="h-4 w-4" />}
                variant="secondary"
              >
                Download Resume
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card, index) => (
            <Reveal
              className="surface rounded-[1.75rem] p-6"
              delay={index * 0.08}
              key={card.label}
            >
              <card.icon className="h-5 w-5 text-cyan-100" />
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/40">
                {card.label}
              </p>
              {card.href ? (
                <a
                  className="mt-3 inline-flex items-center gap-2 text-lg text-white transition hover:text-cyan-100"
                  download={card.label === 'Resume'}
                  href={card.href}
                >
                  {card.value}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <p className="mt-3 text-lg text-white/76">{card.value}</p>
              )}
            </Reveal>
          ))}
        </div>

        {siteContent.socialLinks.length > 0 ? (
          <Reveal className="surface rounded-[1.75rem] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              Profiles
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {siteContent.socialLinks.map((link) => (
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:bg-white/10"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </SectionShell>
  );
}
