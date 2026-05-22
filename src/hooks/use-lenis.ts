import { useEffect } from 'react';
import Lenis from 'lenis';

import { ScrollTrigger } from '@/lib/motion';

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    lenis.on('scroll', ScrollTrigger.update);
    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [enabled]);
}
