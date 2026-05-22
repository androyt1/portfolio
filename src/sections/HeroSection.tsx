import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, MapPin, Sparkles } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { siteContent } from '@/data/portfolio';
import { useDeviceProfile } from '@/hooks/use-device-profile';

const heroStack = [
  'React',
  'TypeScript',
  'Next.js',
  'OpenAI',
  'Tailwind',
  'Storybook',
  'Supabase',
  'AWS',
] as const;

const focusPoints = [
  'Enterprise-grade frontend architecture',
  'AI-native product workflows with retrieval and multimodal inputs',
  'Performance tuning, design systems, and production delivery quality',
] as const;

export function HeroSection() {
  const { allowHeroMotion } = useDeviceProfile();
  const [headlinePrimary, headlineSecondary] = siteContent.headline.split('. ');
  const ease = [0.22, 1, 0.36, 1] as const;
  const ambientFloatA = allowHeroMotion
    ? {
        animate: {
          opacity: [0.2, 0.34, 0.2],
          scale: [1, 1.08, 1],
          x: [0, 42, 0],
          y: [0, -18, 0],
        },
        transition: {
          duration: 18,
          ease: 'easeInOut' as const,
          repeat: Number.POSITIVE_INFINITY,
        },
      }
    : {};
  const ambientFloatB = allowHeroMotion
    ? {
        animate: {
          opacity: [0.16, 0.28, 0.16],
          scale: [1.02, 0.96, 1.02],
          x: [0, -36, 0],
          y: [0, 24, 0],
        },
        transition: {
          duration: 22,
          ease: 'easeInOut' as const,
          repeat: Number.POSITIVE_INFINITY,
        },
      }
    : {};
  const ambientLine = allowHeroMotion
    ? {
        animate: {
          opacity: [0.12, 0.3, 0.12],
          x: [-18, 26, -18],
        },
        transition: {
          duration: 16,
          ease: 'easeInOut' as const,
          repeat: Number.POSITIVE_INFINITY,
        },
      }
    : {};
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
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32" id="top">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(130,190,255,0.14),transparent_46%)]" />
        <motion.div
          className="absolute left-[-4%] top-24 h-52 w-52 rounded-full bg-cyan-200/14 blur-[110px]"
          {...ambientFloatA}
        />
        <motion.div
          className="absolute right-[2%] top-[11%] h-72 w-72 rounded-full bg-blue-100/10 blur-[130px]"
          {...ambientFloatB}
        />
        <motion.div
          className="absolute inset-x-[12%] top-[20%] hidden h-px bg-gradient-to-r from-transparent via-white/16 to-transparent lg:block"
          {...ambientLine}
        />
        <motion.div
          className="absolute left-[8%] top-[14%] hidden h-56 w-56 rounded-full border border-white/[0.06] lg:block"
          animate={allowHeroMotion ? { rotate: [0, 10, 0], scale: [1, 1.02, 1] } : undefined}
          transition={
            allowHeroMotion
              ? {
                  duration: 24,
                  ease: 'easeInOut',
                  repeat: Number.POSITIVE_INFINITY,
                }
              : undefined
          }
        />
      </div>

      <Container className="grid gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.74fr)] lg:items-center lg:pb-18 xl:gap-12">
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
            <MagneticButton href="#projects" icon={<ArrowDownRight className="h-4 w-4" />}>
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

          <motion.div
            className="grid gap-3 sm:grid-cols-3"
            {...fadeUp(0.34)}
          >
            {siteContent.heroStats.map((stat) => (
              <div className="surface rounded-[1.5rem] px-4 py-5" key={stat.label}>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/45">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="surface-strong relative overflow-hidden rounded-[2.2rem] lg:justify-self-end lg:w-full lg:max-w-[31rem]"
          {...fadeScale}
        >
          <div className="noise-mask absolute inset-0 opacity-80" />

          <div className="relative p-5 pb-0 sm:p-6 sm:pb-0">
            <div className="absolute inset-x-6 top-4 h-32 rounded-full bg-cyan-100/10 blur-[96px]" />

            <div className="relative mx-auto max-w-[18.5rem] sm:max-w-[20.75rem]">
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
                Frontend engineer focused on product polish, scalable systems, and
                AI-enhanced experiences that still feel clear and fast to use.
              </p>
              <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] uppercase tracking-[0.32em] text-white/52">
                Product polish + performance
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/8 p-5 sm:p-6">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
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

              <div className="rounded-[1.55rem] border border-white/10 bg-black/22 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                  Core stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {heroStack.map((item) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
