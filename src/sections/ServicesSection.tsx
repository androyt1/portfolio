import { Layers3, PaintbrushVertical, ServerCog } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/data/portfolio';

const serviceIcons = [Layers3, PaintbrushVertical, ServerCog] as const;

export function ServicesSection() {
  return (
    <SectionShell id="services">
      <Container className="space-y-12">
        <SectionHeading
          description="A concise articulation of value for founders, recruiters, and hiring managers scanning for scope fit."
          eyebrow="What I Offer"
          title="The sort of work I tend to own when the quality bar needs to be visibly high."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];

            return (
              <Reveal
                className="surface rounded-[2rem] p-6 sm:p-7"
                delay={index * 0.08}
                key={service.title}
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                      <Icon className="h-5 w-5 text-cyan-100" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/64">
                      {service.copy}
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/18 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/36">
                      Suitable for
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      Senior IC roles, staff-leaning frontend tracks, early platform work,
                      and polish-critical launches.
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
