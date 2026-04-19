'use client';

import { motion } from 'framer-motion';

interface AnimatedHeroTextProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** Animated hero text block: eyebrow label + h1 + paragraph. */
export function AnimatedHeroText({ eyebrow, title, subtitle }: AnimatedHeroTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
        {eyebrow}
      </span>
      <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 mb-6">
        {title}
      </h1>
      <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

interface AnimatedStormHeroTextProps {
  children: React.ReactNode;
}

/** Generic animated wrapper for hero text (use in storm-damage hero). */
export function AnimatedFadeUp({ children }: AnimatedStormHeroTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
}
