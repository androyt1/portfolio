import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, MapPin, Sparkles } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { siteContent } from '@/data/portfolio';

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
  const [headlinePrimary, headlineSecondary] = siteContent.headline.split('. ');

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32" id="top">
      <Container className="grid gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:items-center lg:pb-18 xl:gap-12">
        <div className="relative z-10 max-w-2xl space-y-8">
          <motion.div
            className="surface inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs uppercase tracking-[0.32em] text-white/70"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-100" />
            {siteContent.availability}
          </motion.div>

          <div className="space-y-4">
            <motion.p
              className="text-sm uppercase tracking-[0.4em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {siteContent.role}
            </motion.p>

            <div className="space-y-3">
              <motion.h1
                className="heading-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.45rem] lg:leading-[0.96]"
                initial={{ opacity: 0, y: 34 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {headlinePrimary}.
              </motion.h1>

              {headlineSecondary ? (
                <motion.p
                  className="heading-balance font-display text-4xl italic leading-none text-cyan-50 sm:text-5xl lg:text-[3.9rem]"
                  initial={{ opacity: 0, y: 28 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.08,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {headlineSecondary}
                </motion.p>
              ) : null}
            </div>
          </div>

          <motion.p
            className="max-w-xl text-base leading-8 text-white/65 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.85, delay: 0.14 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {siteContent.summary}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 0.26 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Mail className="h-4 w-4" />
            {siteContent.email}
          </motion.a>

          <motion.div
            className="grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
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
          className="surface-strong relative overflow-hidden rounded-[2.2rem]"
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
        >
          <div className="noise-mask absolute inset-0 opacity-80" />

          <div className="relative overflow-hidden border-b border-white/10">
            <div className="relative aspect-[0.92] overflow-hidden">
              <img
                alt={siteContent.name}
                className="h-full w-full object-cover object-top"
                src={siteContent.photoSrc}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.04),rgba(5,7,11,0.82))]" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/28 px-3 py-2 text-[11px] uppercase tracking-[0.35em] text-white/68 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-cyan-100" />
                {siteContent.location}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-sm text-cyan-100/76">{siteContent.role}</p>
                <h2 className="mt-2 text-3xl font-semibold text-white sm:text-[2.1rem]">
                  {siteContent.name}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/68">
                  Frontend engineer focused on product polish, scalable systems, and
                  AI-enhanced experiences that still feel clear and fast to use.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-6">
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
