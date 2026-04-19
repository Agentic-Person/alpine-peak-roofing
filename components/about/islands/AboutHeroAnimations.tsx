"use client";
import { motion } from "framer-motion";

export default function AboutHeroAnimations() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="gold-line mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          About Alpine Peak
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Three Decades of{" "}<span className="text-gold">Mountain-Grade</span>{" "}Excellence
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        Founded in 1989, Alpine Peak Roofing has grown from a small family operation to Colorado&apos;s most trusted roofing company.
      </motion.p>
    </>
  );
}
