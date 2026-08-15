"use client";
/*
 * Client island: hero entrance animations for /process
 */
import { motion } from "framer-motion";

export default function ProcessHeroAnimated() {
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
          Our Process
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        A Seamless{" "}<span className="text-gold">Experience</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        From your first call to the final inspection, every step is designed for transparency, quality, and your peace of mind.
      </motion.p>
    </>
  );
}
