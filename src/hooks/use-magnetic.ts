import { useCallback, useMemo, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
    [],
  );

  const animate = useCallback(
    (x: number, y: number) => {
      if (!ref.current) {
        return;
      }

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        if (!ref.current) {
          return;
        }

        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!finePointer || reducedMotion || !ref.current) {
        return;
      }

      const bounds = ref.current.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      animate(x * 0.12, y * 0.12);
    },
    [animate, finePointer, reducedMotion],
  );

  const onPointerLeave = useCallback(() => {
    animate(0, 0);
  }, [animate]);

  return { ref, onPointerLeave, onPointerMove };
}
