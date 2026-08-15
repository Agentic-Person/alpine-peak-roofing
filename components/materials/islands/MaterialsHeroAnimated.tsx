"use client";
/*
 * Client island: hero entrance animations for /materials
 */
import { motion } from "framer-motion";

export default function MaterialsHeroAnimated() {
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
          Our Primary Product Line
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Premium Roofing{" "}<span className="text-gold">Materials</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        We only install materials that meet our rigorous standards for durability, beauty, and performance in Colorado&apos;s demanding climate. Click any material to explore full details, pricing, and specifications.
      </motion.p>
    </>
  );
}
