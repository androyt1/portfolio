import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { aboutHighlights, siteContent } from '@/data/portfolio';

const glanceItems = [
  {
    label: 'Base',
    value: siteContent.location,
  },
  {
    label: 'Education',
    value: 'B.Sc. Library & Information Science',
  },
  {
    label: 'Credential',
    value: 'React Security certification',
  },
] as const;

export function AboutSection() {
  return (
    <SectionShell id="about">
      <Container className="space-y-12">
        <SectionHeading
          description="This section is meant to make the senior-level signal obvious quickly: product judgment, systems thinking, and the kind of execution quality that survives scale."
          eyebrow="About"
          title="I build AI products that work in production - not just demos. My background in frontend engineering means I can own the full stack: from LLM orchestration and RAG pipelines to the interface the user actually touches."
        />

        <div className="grid gap-6 xl:grid-cols-12">
          <Reveal className="surface-strong rounded-[2rem] p-7 sm:p-8 xl:col-span-7">
            <p className="font-display text-3xl text-white sm:text-4xl">
              Production AI engineering with frontend-level usability and delivery discipline.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
              My strongest work happens where AI capability and product quality
              both matter. That usually means LLM-powered workflows, retrieval
              systems, agent orchestration, and interfaces that help users trust
              what the system is doing instead of fighting it.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/42">
                  Typical scope
                </p>
                <p className="mt-3 text-lg text-white/80">
                  RAG systems, agentic tools, LLM-powered product workflows,
                  internal platforms, and frontend architecture for complex applications.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/42">
                  Working style
                </p>
                <p className="mt-3 text-lg text-white/80">
                  Clear tradeoffs, strong implementation detail, and a bias toward
                  shipping AI features that stay reliable under real product use.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="surface rounded-[2rem] p-6 sm:p-7 xl:col-span-5">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">
              At a glance
            </p>
            <div className="mt-5 grid gap-4">
              {glanceItems.map((item) => (
                <div
                  className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5"
                  key={item.label}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg leading-7 text-white/82">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {aboutHighlights.map((item, index) => (
            <Reveal
              className="surface rounded-[1.75rem] p-6"
              delay={index * 0.08}
              key={item.title}
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-5 w-5 text-cyan-100" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/62">{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
