"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Services page: Residential, Commercial, Emergency, Materials
 */
import Link from "next/link";
import { images } from "@/lib/images";
import { materials as materialsData } from "@/lib/materials";
import { motion } from "framer-motion";
import {
  Home, Building2, Wrench, Layers, Shield, CheckCircle2,
  ArrowRight, ChevronRight, Zap, Droplets, Wind, Sun,
  Thermometer, Leaf, DollarSign, Clock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const residentialServices = [
  { icon: Layers, title: "Complete Roof Replacement", desc: "Full tear-off and replacement with premium materials. We handle everything from permits to final inspection." },
  { icon: Wrench, title: "Roof Repairs", desc: "Expert repair services for leaks, missing shingles, flashing issues, and storm damage." },
  { icon: Shield, title: "New Construction", desc: "Custom roofing solutions for new home builds, working closely with builders and architects." },
  { icon: Droplets, title: "Gutter Systems", desc: "Seamless gutter installation, guards, and drainage solutions to protect your foundation." },
  { icon: Wind, title: "Ventilation", desc: "Proper attic ventilation systems to extend roof life and improve energy efficiency." },
  { icon: Sun, title: "Skylights & Solar", desc: "Skylight installation and solar panel integration with proper waterproofing." },
];

const commercialServices = [
  { icon: Layers, title: "TPO & PVC Systems", desc: "Single-ply membrane roofing for flat and low-slope commercial buildings." },
  { icon: Shield, title: "EPDM Rubber Roofing", desc: "Durable rubber membrane systems for warehouses, offices, and retail spaces." },
  { icon: Building2, title: "Modified Bitumen", desc: "Multi-layer asphalt systems for superior waterproofing and durability." },
  { icon: Thermometer, title: "Standing Seam Metal", desc: "Premium metal roofing for commercial properties requiring longevity and aesthetics." },
  { icon: Wrench, title: "Roof Coatings", desc: "Reflective coatings to extend roof life, improve energy efficiency, and reduce costs." },
  { icon: Leaf, title: "Green Roofing", desc: "Sustainable roofing solutions including cool roofs and vegetative systems." },
];



export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.heroResidential} alt="Residential roofing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Services</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Complete Roofing{" "}<span className="text-gold">Solutions</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              From residential repairs to large-scale commercial installations, we deliver expert craftsmanship for every project.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Residential */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Residential</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Residential Roofing Services
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Your home is your most valuable asset. We protect it with premium materials, expert installation, and comprehensive warranties. Whether you need a complete replacement or a simple repair, our residential team delivers exceptional results every time.
              </p>
              <div className="relative overflow-hidden mb-6">
                <img src={images.residentialWork} alt="Residential roofing work" className="w-full aspect-video object-cover" />
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                GET A FREE ESTIMATE <ChevronRight size={16} />
              </Link>
            </motion.div>
            <div className="grid gap-4">
              {residentialServices.map((s, i) => (
                <motion.div key={s.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                  className="bg-white/5 border border-white/10 p-6 flex gap-4 hover:border-gold/30 transition-colors">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <s.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                    <p className="text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="bg-navy py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 grid gap-4">
              {commercialServices.map((s, i) => (
                <motion.div key={s.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                  className="bg-white/5 border border-white/10 p-6 flex gap-4 hover:border-gold/30 transition-colors">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <s.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                    <p className="text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
              className="order-1 lg:order-2">
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Commercial</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Commercial Roofing Services
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Protect your business with commercial roofing solutions engineered for performance. We work with property managers, business owners, and general contractors to deliver projects on time and on budget.
              </p>
              <div className="relative overflow-hidden mb-6">
                <img src={images.commercialWork} alt="Commercial roofing work" className="w-full aspect-video object-cover" />
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                REQUEST COMMERCIAL QUOTE <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.emergencyRepair} alt="Emergency roof repair" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.95)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.6)]" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>24/7 Emergency Service</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Storm Damage?{" "}<span className="text-gold">We're Here.</span>
              </h2>
              <p className="text-lg text-white/60 mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Colorado's weather doesn't wait, and neither do we. Our emergency response team is available 24/7 to address storm damage, leaks, and urgent repairs. We'll have a crew on-site within hours, not days.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Rapid response within 2-4 hours",
                  "Emergency tarping and weatherproofing",
                  "Complete storm damage assessment",
                  "Insurance claim assistance",
                  "Temporary and permanent repair solutions",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="tel:9704468995" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                CALL EMERGENCY LINE: (970) 446-8995
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials — Redesigned with images, pricing, and click-through */}
      <section className="relative py-24 overflow-hidden">
        {/* Background image from user */}
        <div className="absolute inset-0">
          <img src={images.materialsDisplayBg} alt="Roofing materials" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.95)]" />
        </div>
        <div className="relative container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-3xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Primary Product Line</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Premium Roofing Materials
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              We only install materials that meet our rigorous standards for durability, beauty, and performance in Colorado's demanding climate. Click any material to explore full details, pricing, and specifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialsData.map((m, i) => (
              <motion.div key={m.slug} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                <Link
                  href={`/materials/${m.slug}`}
                  className="group block bg-navy-dark/80 backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all overflow-hidden h-full"
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
    </div>
  );
}
