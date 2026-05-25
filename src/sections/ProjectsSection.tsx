import { ArrowUpRight, Github } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";
  const outcomeBaseClass = "text-xs uppercase tracking-[0.4em]";
  const outcomeThemeClass = isLightTheme ? "text-slate-500" : "text-white/42";
  const outcomeClass = `${outcomeBaseClass} ${outcomeThemeClass}`;

  const titleBaseClass = "mt-3 text-2xl font-semibold";
  const titleThemeClass = isLightTheme ? "text-slate-950" : "text-white";
  const titleClass = `${titleBaseClass} ${titleThemeClass}`;

  const caseStudyBaseClass =
    "rounded-full border px-3 py-2 text-xs uppercase tracking-[0.35em] text-center border-[#0d9488]/26";
  const caseStudyThemeClass = isLightTheme
    ? "bg-[#0d9488] text-teal-50 shadow-[0_10px_22px_rgba(13,148,136,0.08)]"
    : "bg-[#0d9488]/10 text-teal-100/88";
  const caseStudyClass = `${caseStudyBaseClass} ${caseStudyThemeClass}`;

  const previewShellBaseClass =
    "relative overflow-hidden rounded-[1.6rem] border p-5";
  const previewShellThemeClass = isLightTheme
    ? "border-[#0d9488]/20 bg-white/78 shadow-[0_18px_40px_rgba(148,163,184,0.12)]"
    : "border-[#0d9488]/18";
  const previewShellClass = `${previewShellBaseClass} ${previewShellThemeClass}`;

  const previewOverlayBaseClass = "absolute inset-0";
  const previewOverlayThemeClass = isLightTheme
    ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.86),transparent_54%),linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))]"
    : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_52%)]";
  const previewOverlayClass = `${previewOverlayBaseClass} ${previewOverlayThemeClass}`;

  const browserDotBaseClass = "h-2.5 w-2.5 rounded-full";
  const browserDotPrimaryThemeClass = isLightTheme
    ? "bg-slate-400/70"
    : "bg-white/45";
  const browserDotPrimaryClass = `${browserDotBaseClass} ${browserDotPrimaryThemeClass}`;
  const browserDotSecondaryThemeClass = isLightTheme
    ? "bg-slate-400/30"
    : "bg-white/18";
  const browserDotSecondaryClass = `${browserDotBaseClass} ${browserDotSecondaryThemeClass}`;

  const detailCardBaseClass = "rounded-2xl border p-4";
  const detailCardThemeClass = isLightTheme
    ? "border-slate-900/8 bg-white/82 shadow-[0_12px_28px_rgba(148,163,184,0.12)]"
    : "border-[#0d9488]/18 bg-black/18";
  const detailCardClass = `${detailCardBaseClass} ${detailCardThemeClass}`;

  const detailLabelBaseClass = "text-xs uppercase tracking-[0.35em]";
  const detailLabelThemeClass = isLightTheme
    ? "text-slate-500"
    : "text-white/36";
  const detailLabelClass = `${detailLabelBaseClass} ${detailLabelThemeClass}`;

  const detailTextBaseClass = "mt-3 text-sm leading-6";
  const detailTextThemeClass = isLightTheme
    ? "text-slate-800"
    : "text-white/76";
  const detailTextClass = `${detailTextBaseClass} ${detailTextThemeClass}`;

  const descriptionBaseClass = "text-base leading-7";
  const descriptionThemeClass = isLightTheme
    ? "text-slate-700"
    : "text-white/65";
  const descriptionClass = `${descriptionBaseClass} ${descriptionThemeClass}`;

  const stackChipBaseClass = "rounded-full border px-3 py-2 text-sm";
  const stackChipThemeClass = isLightTheme
    ? "border-[#0d9488]/20 bg-white/84 text-slate-700 shadow-[0_10px_20px_rgba(148,163,184,0.08)]"
    : "border-[#0d9488]/18 bg-[#0d9488]/8 text-white/72";
  const stackChipClass = `${stackChipBaseClass} ${stackChipThemeClass}`;

  const actionButtonBaseClass =
    "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition";
  const liveButtonThemeClass = isLightTheme
    ? "border-[#0d9488]/28 bg-[#fbfffe] text-slate-950 shadow-[0_12px_28px_rgba(13,148,136,0.1)] hover:border-[#0d9488]/42 hover:bg-[#dffaf4]"
    : "border-[#0d9488]/24 bg-white text-slate-950 hover:border-[#0d9488]/38 hover:bg-[#ccfbf1]";
  const liveButtonClass = `${actionButtonBaseClass} ${liveButtonThemeClass}`;

  const repoButtonThemeClass = isLightTheme
    ? "border-[#0d9488]/28 bg-[#0d9488]/12 text-[#0f766e] shadow-[0_10px_22px_rgba(13,148,136,0.08)] hover:border-[#0d9488]/40 hover:bg-[#0d9488]/18"
    : "border-[#0d9488]/24 bg-[#0d9488]/8 text-teal-100 hover:bg-[#0d9488]/14";
  const repoButtonClass = `${actionButtonBaseClass} ${repoButtonThemeClass}`;
  const getProjectSpan = (index: number) => {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";

    const trailingCount = projects.length - 2;
    if (trailingCount <= 1) return "lg:col-span-12";

    const trailingIndex = index - 2;
    const isLastTrailingCard = trailingIndex === trailingCount - 1;

    return trailingCount % 2 === 1 && isLastTrailingCard
      ? "lg:col-span-12"
      : "lg:col-span-6";
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
                      <p className={outcomeClass}>{project.outcome}</p>
                      <h3 className={titleClass}>{project.title}</h3>
                    </div>
                    <div className={caseStudyClass}>Case study</div>
                  </div>

                  <div
                    className={`${previewShellClass} bg-gradient-to-br ${project.accent}`}
                  >
                    <div className={previewOverlayClass} />
                    <div className="relative flex min-h-44 flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <span className={browserDotPrimaryClass} />
                        <span className={browserDotSecondaryClass} />
                        <span className={browserDotSecondaryClass} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className={detailCardClass}>
                          <p className={detailLabelClass}>Focus</p>
                          <p className={detailTextClass}>{project.highlight}</p>
                        </div>
                        <div className={detailCardClass}>
                          <p className={detailLabelClass}>Result</p>
                          <p className={detailTextClass}>{project.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className={descriptionClass}>{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className={stackChipClass} key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    className={liveButtonClass}
                    href={project.liveHref}
                    rel={
                      project.liveHref.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                    target={
                      project.liveHref.startsWith("http") ? "_blank" : undefined
                    }
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    className={repoButtonClass}
                    href={project.repoHref}
                    rel={
                      project.repoHref.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                    target={
                      project.repoHref.startsWith("http") ? "_blank" : undefined
                    }
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
