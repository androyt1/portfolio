import { motion } from 'framer-motion';

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
  return (
    <div className="max-w-3xl space-y-4">
      <motion.p
        className="text-xs uppercase tracking-[0.45em] text-cyan-100/70"
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
        transition={{ duration: 0.8, delay: 0.08 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="max-w-2xl text-base leading-7 text-white/62 sm:text-lg"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.8, delay: 0.14 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
