'use client';

import { motion } from 'framer-motion';

/** Animates the eyebrow label + H1 + subtitle in the services hero. */
export function ServicesHeroText() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="gold-line mb-4" />
        <span
          className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          Our Services
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Complete Roofing{' '}
        <span className="text-gold">Solutions</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        From residential repairs to large-scale commercial installations, we deliver expert
        craftsmanship for every project.
      </motion.p>
    </>
  );
}
