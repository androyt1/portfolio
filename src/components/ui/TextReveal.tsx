import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface TextRevealProps {
  amount?: number;
  className?: string;
  delay?: number;
  disabled?: boolean;
  hiddenColor: string;
  revealColor: string;
  stagger?: number;
  text: string;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

function renderAnimatedWords(
  text: string,
  hiddenColor: string,
  revealColor: string,
): ReactNode {
  const words = text.split(' ');

  return words.map((word, wordIndex) => (
    <span className="inline-block" key={`${word}-${wordIndex}`}>
      {Array.from(word).map((character, characterIndex) => (
        <motion.span
          className="inline-block"
          key={`${wordIndex}-${characterIndex}-${character}`}
          transition={{ duration: 0.48, ease: revealEase }}
          variants={{
            hidden: { color: hiddenColor },
            visible: { color: revealColor },
          }}
        >
          {character}
        </motion.span>
      ))}
      {wordIndex < words.length - 1 ? ' ' : null}
    </span>
  ));
}

export function TextReveal({
  amount = 0.65,
  className,
  delay = 0,
  disabled = false,
  hiddenColor,
  revealColor,
  stagger = 0.018,
  text,
}: TextRevealProps) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span aria-label={text} className={cn('block', className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        transition={{
          delayChildren: delay,
          staggerChildren: stagger,
        }}
        variants={{
          hidden: {},
          visible: {},
        }}
        viewport={{ amount, once: true }}
        whileInView="visible"
      >
        {renderAnimatedWords(text, hiddenColor, revealColor)}
      </motion.span>
    </span>
  );
}
