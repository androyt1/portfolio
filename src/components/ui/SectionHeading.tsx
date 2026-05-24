import { motion } from 'framer-motion';

import { useTheme } from '@/components/theme/ThemeProvider';
import { useDeviceProfile } from '@/hooks/use-device-profile';
import { TextReveal } from '@/components/ui/TextReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  const { allowViewportMotion } = useDeviceProfile();
  const { resolvedTheme } = useTheme();
  const titleHiddenColor =
    resolvedTheme === 'dark' ? 'rgba(5, 7, 11, 0.98)' : 'rgba(244, 247, 251, 0.98)';
  const titleRevealColor =
    resolvedTheme === 'dark' ? 'rgba(246, 247, 251, 1)' : 'rgba(15, 23, 42, 1)';
  const descriptionRevealColor =
    resolvedTheme === 'dark' ? 'rgba(246, 247, 251, 0.62)' : 'rgba(51, 65, 85, 0.84)';

  if (!allowViewportMotion) {
    return (
      <div className="max-w-3xl space-y-4">
        <p className="text-secondary-muted text-xs uppercase tracking-[0.45em]">
          {eyebrow}
        </p>
        <h2 className="heading-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      <motion.p
        className="text-secondary-muted text-xs uppercase tracking-[0.45em]"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="heading-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 22 }}
        transition={{ duration: 0.8, delay: 0.06 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <TextReveal
          amount={0.6}
          delay={0.04}
          disabled={!allowViewportMotion}
          hiddenColor={titleHiddenColor}
          revealColor={titleRevealColor}
          stagger={0.02}
          text={title}
        />
      </motion.h2>
      <motion.p
        className="max-w-2xl text-base leading-7 text-white/62 sm:text-lg"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.8, delay: 0.12 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <TextReveal
          amount={0.7}
          delay={0.12}
          disabled={!allowViewportMotion}
          hiddenColor={titleHiddenColor}
          revealColor={descriptionRevealColor}
          stagger={0.012}
          text={description}
        />
      </motion.p>
    </div>
  );
}
