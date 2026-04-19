"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ChevronRight, Phone } from "lucide-react";

export default function HeroAnimations() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-1.5 mb-6"
      >
        <Shield size={14} className="text-gold" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Licensed &amp; Insured — Serving Colorado Since 1989
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Colorado&apos;s Premier{" "}
        <span className="text-gold">Roofing</span>{" "}
        Specialists
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        Expert craftsmanship meets mountain-grade durability. From Aspen to Telluride, we deliver roofing solutions built to withstand Colorado&apos;s most demanding conditions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          GET YOUR FREE ESTIMATE
          <ChevronRight size={16} />
        </Link>
        <a
          href="tel:9704561176"
          className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-gold/50 text-white hover:text-gold px-8 py-4 text-sm font-bold tracking-wide transition-all"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <Phone size={16} />
          (970) 456-1176
        </a>
      </motion.div>
    </>
  );
}
