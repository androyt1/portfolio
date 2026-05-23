import { motion } from "framer-motion";
import { ArrowDownRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { lazy, Suspense } from "react";

import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteContent } from "@/data/portfolio";
import { useDeviceProfile } from "@/hooks/use-device-profile";

const focusPoints = [
  "Enterprise-grade frontend architecture",
  "AI-native product workflows with retrieval and multimodal inputs",
  "Performance tuning, design systems, and production delivery quality",
] as const;

const HeroParticles = lazy(async () => {
  const module = await import("@/components/hero/HeroParticles");

  return { default: module.HeroParticles };
});

export function HeroSection() {
  const { allowHeroMotion } = useDeviceProfile();
  const headlineSegments = siteContent.headline.split(". ").filter(Boolean);
  const headlinePrimary =
    headlineSegments.at(0)?.replace(/\.$/, "") ?? siteContent.headline;
  const headlineSecondary = headlineSegments.slice(1).join(". ").trim();
  const ease = [0.22, 1, 0.36, 1] as const;
  const fadeUp = (delay = 0, y = 24) =>
    allowHeroMotion
      ? {
          animate: { opacity: 1, y: 0 },
          initial: { opacity: 0, y },
          transition: { delay, duration: 0.8, ease },
        }
      : {};
  const fadeScale = allowHeroMotion
    ? {
        animate: { opacity: 1, scale: 1, y: 0 },
        initial: { opacity: 0, scale: 0.985, y: 18 },
        transition: { delay: 0.08, duration: 0.86, ease },
      }
    : {};

  return (
    <section
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32"
      id="top"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,216,255,0.18),transparent_34%),linear-gradient(180deg,rgba(7,11,18,0.08),rgba(5,7,11,0.02))]" />
        <div className="absolute inset-x-[-8%] top-[-2rem] h-[28rem] bg-[radial-gradient(circle_at_50%_0%,rgba(126,183,255,0.2),transparent_48%)]" />
        <div className="absolute left-[-6%] top-24 h-56 w-56 rounded-full bg-cyan-200/12 blur-[100px]" />
        <div className="absolute right-[-2%] top-18 h-72 w-72 rounded-full bg-sky-100/10 blur-[120px]" />
        <div className="absolute inset-x-[10%] top-[14%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {allowHeroMotion ? (
          <Suspense fallback={null}>
            <HeroParticles />
          </Suspense>
        ) : null}
      </div>

      <Container className="grid gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)] lg:items-center lg:pb-18 xl:gap-12">
        <div className="relative z-10 max-w-2xl space-y-8">
          <motion.div
            className="surface inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs uppercase tracking-[0.32em] text-white/70"
            {...fadeUp(0, 18)}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-100" />
            {siteContent.availability}
          </motion.div>

          <div className="space-y-4">
            <motion.p
              className="text-sm uppercase tracking-[0.4em] text-white/45"
              {...fadeUp(0.05, 16)}
            >
              {siteContent.role}
            </motion.p>

            <div className="space-y-3">
              <motion.h1
                className="heading-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.45rem] lg:leading-[0.96]"
                {...fadeUp(0.08, 32)}
              >
                {headlinePrimary}.
              </motion.h1>

              {headlineSecondary ? (
                <motion.p
                  className="heading-balance font-display text-4xl italic leading-none text-cyan-50 sm:text-5xl lg:text-[3.9rem]"
                  {...fadeUp(0.14, 24)}
                >
                  {headlineSecondary}
                </motion.p>
              ) : null}
            </div>
          </div>

          <motion.p
            className="max-w-xl text-base leading-8 text-white/65 sm:text-lg"
            {...fadeUp(0.18)}
          >
            {siteContent.summary}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            {...fadeUp(0.24)}
          >
            <MagneticButton
              href="#projects"
              icon={<ArrowDownRight className="h-4 w-4" />}
            >
              Explore Projects
            </MagneticButton>
            <MagneticButton
              download
              href={siteContent.resumeHref}
              icon={<Download className="h-4 w-4" />}
              variant="secondary"
            >
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.a
            className="inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-cyan-100"
            href={`mailto:${siteContent.email}`}
            {...fadeUp(0.3, 18)}
          >
            <Mail className="h-4 w-4" />
            {siteContent.email}
          </motion.a>

          <motion.div className="grid gap-3 sm:grid-cols-3" {...fadeUp(0.34)}>
            {siteContent.heroStats.map((stat) => (
              <div
                className="surface rounded-[1.5rem] px-4 py-5"
                key={stat.label}
              >
                <p className="text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/45">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="surface-strong relative overflow-hidden rounded-[2.2rem] lg:justify-self-end lg:w-full lg:max-w-[29rem]"
          {...fadeScale}
        >
          <div className="noise-mask absolute inset-0 opacity-80" />

          <div className="relative p-5 pb-0 sm:p-6 sm:pb-0">
            <div className="absolute inset-x-6 top-4 h-32 rounded-full bg-cyan-100/10 blur-[96px]" />

            <div className="relative mx-auto max-w-[16.5rem] sm:max-w-[18.75rem]">
              <div className="relative aspect-[0.78] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0d141d] shadow-[0_28px_72px_rgba(0,0,0,0.34)]">
                <img
                  alt={siteContent.name}
                  className="h-full w-full object-cover object-top scale-[1.02]"
                  decoding="async"
                  fetchPriority="high"
                  loading="eager"
                  src={siteContent.photoSrc}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.74))]" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/48 px-3 py-2 text-[11px] uppercase tracking-[0.35em] text-white/72">
                  <MapPin className="h-3.5 w-3.5 text-cyan-100" />
                  {siteContent.location}
                </div>
              </div>
            </div>

            <div className="relative mt-5 px-1 pb-1 sm:mt-6">
              <p className="text-sm text-cyan-100/82">{siteContent.role}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-[2.05rem]">
                {siteContent.name}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                AI engineer focused on production-ready RAG systems, agentic
                workflows, and frontend experiences that make complex model
                behavior feel clear and fast to use.
              </p>
              <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] uppercase tracking-[0.32em] text-white/52">
                AI systems + product polish
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 p-5 sm:p-6">
            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                Current focus
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/64">
                {focusPoints.map((point) => (
                  <li className="flex gap-3" key={point}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-100/80" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
