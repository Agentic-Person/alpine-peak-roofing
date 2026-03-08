"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Materials index page: listing of all roofing materials
 */
import Link from "next/link";
import { images } from "@/lib/images";
import { materials } from "@/lib/materials";
import { motion } from "framer-motion";
import { ChevronRight, DollarSign, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

export default function MaterialsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.materialsDisplayBg} alt="Roofing materials" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Primary Product Line</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Premium Roofing{" "}<span className="text-gold">Materials</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              We only install materials that meet our rigorous standards for durability, beauty, and performance in Colorado's demanding climate. Click any material to explore full details, pricing, and specifications.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-3xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore Our Materials
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Each material below includes full specs, pricing, pros &amp; cons, warranty info, and Colorado-specific considerations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((m, i) => (
              <motion.div key={m.slug} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                <Link
                  href={`/materials/${m.slug}`}
                  className="group block bg-navy-dark border border-white/10 hover:border-gold/40 transition-all overflow-hidden h-full"
                >
                  {/* Tall product image */}
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260)] via-transparent to-transparent" />
                    {/* Warranty badge */}
                    <div className="absolute top-3 right-3 bg-gold/90 text-navy-dark px-3 py-1">
                      <span className="text-xs font-bold tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.warranty}</span>
                    </div>
                    {/* Price overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-navy-dark/80 backdrop-blur-sm border border-white/10 px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-gold" />
                          <span className="text-sm font-bold text-gold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                            ${m.installedPrice.low.toFixed(2)}–${m.installedPrice.high.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>/sqft</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-white/40" />
                          <span className="text-[10px] text-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.lifespan}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {m.shortName}
                    </h3>
                    <p className="text-xs text-gold/70 font-medium mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {m.manufacturer}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {m.description}
                    </p>
                    <span className="text-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      VIEW FULL DETAILS <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 border-t border-white/10">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="max-w-2xl mx-auto">
            <div className="gold-line mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Not Sure Which Material Is Right for You?
            </h2>
            <p className="text-lg text-white/60 mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Our roofing experts will help you choose the best material for your home, budget, and Colorado climate conditions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              GET A FREE CONSULTATION <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
