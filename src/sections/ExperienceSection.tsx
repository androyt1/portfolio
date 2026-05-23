import { BriefcaseBusiness, Gauge, ShieldCheck } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/portfolio';

const sideSignals = [
  {
    icon: Gauge,
    title: 'Performance-minded',
    copy: 'Budgets, render discipline, bundle awareness, and zero patience for jank.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-safe',
    copy: 'Rollout strategy, observability, and quality controls that reduce avoidable churn.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Business-aware',
    copy: 'Understands what the product needs to prove, not just what the UI needs to look like.',
  },
] as const;

export function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <Container className="space-y-12">
        <SectionHeading
          description={`From enterprise banking products at HSBC to AI-native
tools built with LangChain and LangGraph — every role
has sharpened both my technical range and my instinct
for what actually ships.`}
          eyebrow="Professional Experience"
          title="Senior-level work across enterprise delivery, AI product engineering, and high-performance frontend execution."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {sideSignals.map((signal, index) => (
            <Reveal
              className="surface rounded-[1.75rem] p-6"
              delay={index * 0.08}
              key={signal.title}
            >
              <signal.icon className="h-5 w-5 text-cyan-100" />
              <h3 className="mt-4 text-lg font-semibold text-white">{signal.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/62">{signal.copy}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {experience.map((role, index) => (
            <Reveal
              className="surface h-full rounded-[2rem] p-6 sm:p-7"
              delay={index * 0.08}
              key={`${role.company}-${role.period}`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                      {role.period}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-sm text-cyan-100/76">{role.company}</p>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.32em] text-white/52">
                    Experience
                  </div>
                </div>
                <p className="text-base leading-7 text-white/66">{role.summary}</p>
                <ul className="space-y-3 text-sm leading-7 text-white/62">
                  {role.bullets.map((bullet) => (
                    <li className="flex gap-3" key={bullet}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
