import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { coreStack } from '@/data/portfolio';
import { useDeviceProfile } from '@/hooks/use-device-profile';

interface StackCardProps {
  eyebrow: string;
  label: string;
  summary: string;
}

function StackCard({
  eyebrow,
  label,
  summary,
}: StackCardProps) {
  return (
    <article className="surface-strong relative flex min-h-[14rem] w-[15.5rem] shrink-0 flex-col justify-between overflow-hidden rounded-[1.9rem] p-6 sm:w-[16.25rem] lg:w-[17.5rem]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_55%)]" />
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-cyan-100/10 blur-3xl" />

      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-100/74">
          {eyebrow}
        </p>
        <h3 className="mt-5 text-[1.95rem] font-semibold tracking-tight text-white">
          {label}
        </h3>
        <p className="mt-4 max-w-[15rem] text-sm leading-7 text-white/62">
          {summary}
        </p>
      </div>

      <div className="relative mt-8 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-100/45 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/38">
          Stack
        </span>
      </div>
    </article>
  );
}

export function CoreStackSection() {
  const { allowViewportMotion, coarsePointer, lowPower, smallViewport } =
    useDeviceProfile();
  const enablePinnedScroll =
    allowViewportMotion && !coarsePointer && !lowPower && !smallViewport;
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
    target: sectionRef,
  });
  const trackX = useTransform(scrollYProgress, (value) => -scrollDistance * value);

  useEffect(() => {
    if (!enablePinnedScroll) {
      setScrollDistance(0);
      setSectionHeight(0);
      return;
    }

    const measure = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const nextScrollDistance = Math.max(trackWidth - viewportWidth, 0);
      const viewportHeight = window.innerHeight;

      setScrollDistance(nextScrollDistance);
      setSectionHeight(
        Math.max(viewportHeight * 1.7, nextScrollDistance + viewportHeight * 1.05),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    window.addEventListener('resize', measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [enablePinnedScroll]);

  if (!enablePinnedScroll) {
    return (
      <SectionShell className="pt-6 sm:pt-8">
        <Container className="space-y-8">
          <SectionHeading
            description="The stack sits here as a dedicated product layer instead of crowding the hero. On smaller or constrained devices, it falls back to a simpler horizontal rail."
            eyebrow="Core Stack"
            title="The tools behind the work, from interface systems to AI orchestration."
          />

          <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-3 pr-5">
              {coreStack.map((item) => (
                <StackCard
                  eyebrow={item.eyebrow}
                  key={item.label}
                  label={item.label}
                  summary={item.summary}
                />
              ))}
            </div>
          </div>
        </Container>
      </SectionShell>
    );
  }

  return (
    <section
      className="relative"
      ref={sectionRef}
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div className="sticky top-24 overflow-hidden py-10 sm:top-28 sm:py-12">
        <Container className="space-y-8">
          <SectionHeading
            description="Scroll vertically and the stack moves across like a product rail, so the tooling reads as part of the story instead of a cramped badge list."
            eyebrow="Core Stack"
            title="The tools behind the work, from interface systems to AI orchestration."
          />

          <div className="overflow-hidden" ref={viewportRef}>
            <motion.div
              className="flex gap-4 pr-[24vw] will-change-transform"
              ref={trackRef}
              style={{ x: trackX }}
            >
              {coreStack.map((item) => (
                <StackCard
                  eyebrow={item.eyebrow}
                  key={item.label}
                  label={item.label}
                  summary={item.summary}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.32em] text-white/34">
            <span>Frontend + AI stack</span>
            <span>Scroll to move across</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
