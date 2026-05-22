import { motion, useScroll, useSpring } from 'framer-motion';

import { useDeviceProfile } from '@/hooks/use-device-profile';

export function ScrollProgress() {
  const { allowScrollProgress } = useDeviceProfile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 180,
    mass: 0.2,
  });

  if (!allowScrollProgress) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-cyan-300 via-white to-cyan-300"
      style={{ scaleX }}
    />
  );
}
