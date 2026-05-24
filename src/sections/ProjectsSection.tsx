import { ArrowUpRight, Github } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/portfolio';

export function ProjectsSection() {
  const { resolvedTheme } = useTheme();
  const liveButtonClass =
    resolvedTheme === 'light'
      ? 'inline-flex items-center gap-2 rounded-full border border-[#0d9488]/28 bg-[#fbfffe] px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_28px_rgba(13,148,136,0.1)] transition hover:border-[#0d9488]/42 hover:bg-[#dffaf4]'
      : 'inline-flex items-center gap-2 rounded-full border border-[#0d9488]/24 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-[#0d9488]/38 hover:bg-[#ccfbf1]';
  const repoButtonClass =
    resolvedTheme === 'light'
      ? 'inline-flex items-center gap-2 rounded-full border border-[#0d9488]/28 bg-[#0d9488]/12 px-4 py-3 text-sm font-semibold text-[#0f766e] shadow-[0_10px_22px_rgba(13,148,136,0.08)] transition hover:border-[#0d9488]/40 hover:bg-[#0d9488]/18'
      : 'inline-flex items-center gap-2 rounded-full border border-[#0d9488]/24 bg-[#0d9488]/8 px-4 py-3 text-sm font-semibold text-teal-100 transition hover:bg-[#0d9488]/14';
  const getProjectSpan = (index: number) => {
    if (index === 0) return 'lg:col-span-7';
    if (index === 1) return 'lg:col-span-5';

    const trailingCount = projects.length - 2;
    if (trailingCount <= 1) return 'lg:col-span-12';

    const trailingIndex = index - 2;
    const isLastTrailingCard = trailingIndex === trailingCount - 1;

    return trailingCount % 2 === 1 && isLastTrailingCard
      ? 'lg:col-span-12'
      : 'lg:col-span-6';
  };

  return (
    <SectionShell id="projects">
      <Container className="space-y-12">
        <SectionHeading
          description="These cards are structured like compact case studies: product problem, quality bar, outcome, and the stack used to get there."
          eyebrow="Featured Projects"
          title="Built to read like serious product work, not a grid of demo thumbnails."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {projects.map((project, index) => (
            <Reveal
              className={`surface group overflow-hidden rounded-[2rem] p-6 sm:p-7 ${getProjectSpan(index)}`}
              delay={index * 0.08}
              key={project.title}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-white/42">
                        {project.outcome}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <div className="rounded-full border border-[#0d9488]/26 bg-[#0d9488]/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-teal-100/88">
                      Case study
                    </div>
                  </div>

                  <div
                    className={`relative overflow-hidden rounded-[1.6rem] border border-[#0d9488]/18 bg-gradient-to-br ${project.accent} p-5`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_52%)]" />
                    <div className="relative flex min-h-44 flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-[#0d9488]/18 bg-black/18 p-4">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/36">
                            Focus
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/76">
                            {project.highlight}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-[#0d9488]/18 bg-black/18 p-4">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/36">
                            Result
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/76">
                            {project.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-base leading-7 text-white/65">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        className="rounded-full border border-[#0d9488]/18 bg-[#0d9488]/8 px-3 py-2 text-sm text-white/72"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    className={liveButtonClass}
                    href={project.liveHref}
                    rel={project.liveHref.startsWith('http') ? 'noreferrer' : undefined}
                    target={project.liveHref.startsWith('http') ? '_blank' : undefined}
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    className={repoButtonClass}
                    href={project.repoHref}
                    rel={project.repoHref.startsWith('http') ? 'noreferrer' : undefined}
                    target={project.repoHref.startsWith('http') ? '_blank' : undefined}
                  >
                    GitHub
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
