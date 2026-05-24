import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { ResumeChatWidget } from '@/components/chat/ResumeChatWidget';
import { SiteFooter } from '@/components/footer/SiteFooter';
import { ScrollProgress } from '@/components/navigation/ScrollProgress';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { siteContent } from '@/data/portfolio';
import {
  DeviceProfileProvider,
  useDeviceProfileValue,
} from '@/hooks/use-device-profile';
import { useLenis } from '@/hooks/use-lenis';
import { AboutSection } from '@/sections/AboutSection';
import { ContactSection } from '@/sections/ContactSection';
import { CoreStackSection } from '@/sections/CoreStackSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { HeroSection } from '@/sections/HeroSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { SkillsSection } from '@/sections/SkillsSection';

export function App() {
  const deviceProfile = useDeviceProfileValue();
  const [hasLoaded, setHasLoaded] = useState(false);

  useLenis(deviceProfile.enableSmoothScroll);

  useEffect(() => {
    document.title = `${siteContent.role} | ${siteContent.name}`;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.effects = deviceProfile.enhancedEffects ? 'enhanced' : 'reduced';

    return () => root.removeAttribute('data-effects');
  }, [deviceProfile.enhancedEffects]);

  useEffect(() => {
    if (hasLoaded) {
      return;
    }

    if (!deviceProfile.allowPageLoader) {
      setHasLoaded(true);
      return;
    }

    const timeout = window.setTimeout(() => setHasLoaded(true), 820);
    return () => window.clearTimeout(timeout);
  }, [deviceProfile.allowPageLoader, hasLoaded]);

  const showLoader = !hasLoaded && deviceProfile.allowPageLoader;

  return (
    <ThemeProvider>
      <DeviceProfileProvider value={deviceProfile}>
        <>
          {deviceProfile.enhancedEffects ? (
            <div className="pointer-events-none fixed inset-0 z-[-2]">
              <div className="absolute left-[-12%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan-300/9 blur-[112px]" />
              <div className="absolute bottom-[-10%] right-[-14%] h-[28rem] w-[28rem] rounded-full bg-indigo-200/8 blur-[104px]" />
            </div>
          ) : null}

          <AnimatePresence initial={false}>
            {showLoader ? (
              <motion.div
                key="loader"
                className="surface-strong fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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

          {deviceProfile.allowScrollProgress ? <ScrollProgress /> : null}
          <SiteHeader />

          <main className="relative">
            <HeroSection />
            <CoreStackSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ServicesSection />
            <ContactSection />
          </main>

          <SiteFooter />
          <ResumeChatWidget />
        </>
      </DeviceProfileProvider>
    </ThemeProvider>
  );
}
