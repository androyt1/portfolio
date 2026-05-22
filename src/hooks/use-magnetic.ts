import { useCallback, useEffect, useRef } from 'react';

import { useDeviceProfile } from '@/hooks/use-device-profile';

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const { coarsePointer, lowPower, reducedMotion } = useDeviceProfile();
  const allowMagnetic = !coarsePointer && !lowPower && !reducedMotion;

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

  useEffect(() => {
    if (allowMagnetic || !ref.current) {
      return;
    }

    ref.current.style.transform = 'translate3d(0, 0, 0)';
  }, [allowMagnetic]);

  useEffect(
    () => () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!allowMagnetic || !ref.current) {
        return;
      }

      const bounds = ref.current.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      animate(x * 0.12, y * 0.12);
    },
    [allowMagnetic, animate],
  );

  const onPointerLeave = useCallback(() => {
    if (!allowMagnetic) {
      return;
    }

    animate(0, 0);
  }, [allowMagnetic, animate]);

  return { ref, onPointerLeave, onPointerMove };
}
