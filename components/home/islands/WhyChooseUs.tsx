"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const whyItems = [
  { icon: Shield, title: "Fully Licensed & Insured", desc: "Complete peace of mind with comprehensive coverage and state licensing." },
  { icon: Award, title: "Manufacturer Certified", desc: "Factory-trained installers certified by GAF, Owens Corning, and CertainTeed." },
  { icon: Users, title: "Expert Team", desc: "Highly skilled craftsmen with an average of 15+ years of experience." },
  { icon: CheckCircle2, title: "Warranty Protection", desc: "Industry-leading warranties on both materials and workmanship." },
];

export default function WhyChooseUs() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={0}
      >
        <div className="gold-line mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
          Why Alpine Peak
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Built Different. <br />
          <span className="text-gold">Built to Last.</span>
        </h2>
        <p className="text-lg text-white/60 mb-8" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
          For over three decades, Alpine Peak Roofing has set the standard for roofing excellence in Colorado. Our commitment to quality craftsmanship, premium materials, and exceptional customer service has earned us the trust of thousands of homeowners and businesses across the Rocky Mountains.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all text-sm tracking-wide"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          LEARN OUR STORY <ArrowRight size={16} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {whyItems.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-gold/30 transition-colors"
          >
            <item.icon size={24} className="text-gold mb-3" />
            <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {item.title}
            </h3>
            <p className="text-sm text-white/50" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
