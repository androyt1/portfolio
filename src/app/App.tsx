import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { SiteFooter } from '@/components/footer/SiteFooter';
import { ScrollProgress } from '@/components/navigation/ScrollProgress';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { siteContent } from '@/data/portfolio';
import { useLenis } from '@/hooks/use-lenis';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { AboutSection } from '@/sections/AboutSection';
import { ContactSection } from '@/sections/ContactSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { SkillsSection } from '@/sections/SkillsSection';

export function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [showLoader, setShowLoader] = useState(!reducedMotion);

  useLenis(!reducedMotion);

  useEffect(() => {
    document.title = `${siteContent.role} | ${siteContent.name}`;

    if (reducedMotion) {
      return;
    }

    const timeout = window.setTimeout(() => setShowLoader(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[-2]">
        <div className="absolute left-[-15%] top-[-10%] h-[44rem] w-[44rem] rounded-full bg-cyan-300/10 blur-[140px]" />
        <div className="absolute bottom-[-12%] right-[-18%] h-[36rem] w-[36rem] rounded-full bg-indigo-200/10 blur-[140px]" />
      </div>

      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            className="surface-strong fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.45em] text-white/55">
                Loading Portfolio
              </p>
              <p className="font-display text-4xl text-white sm:text-5xl">
                Building the first impression.
              </p>
            </div>
            <div className="h-px w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
                transition={{
                  duration: 1.1,
                  ease: 'easeInOut',
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ScrollProgress />
      <SiteHeader />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
