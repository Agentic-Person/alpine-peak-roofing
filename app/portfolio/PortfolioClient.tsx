"use client"
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Portfolio page: 12 showcase projects in 3-col x 4-row grid, clickable to detail pages
 * Kept: Before/After section, lightbox for quick preview
 */
import { useState } from "react";
import Link from "next/link";
import { images } from "@/lib/images";
import { portfolioProjects } from "@/lib/portfolioProjects";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, X, ChevronLeft, MapPin, Ruler, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const categories = ["All", "Residential", "Metal", "Slate"];

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.gallery1} alt="Portfolio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Portfolio</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Finest{" "}<span className="text-gold">Work</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Browse our collection of 12 showcase projects across Colorado's most beautiful mountain communities. Click any project to explore the full story.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          {/* Category filters */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-medium tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-gold text-navy-dark"
                    : "bg-white/5 text-white/60 hover:text-gold border border-white/10 hover:border-gold/30"
                }`}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project grid — 3 columns, 4 rows */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  variants={fadeUp}
                  layout
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="group block relative overflow-hidden aspect-square w-full cursor-pointer">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Always-visible bottom bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.06_0.03_260/0.95)] via-[oklch(0.08_0.03_260/0.7)] to-transparent p-5">
                        <span className="text-xs uppercase tracking-[0.15em] text-gold block mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {project.roofType.split("—")[0].trim()}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/50 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Ruler className="w-3 h-3" />
                            {project.sqft.toLocaleString()} sq ft
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {project.year}
                          </span>
                        </div>
                      </div>
                      {/* Hover overlay with "View Project" */}
                      <div className="absolute inset-0 bg-[#C9A84C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-[#C9A84C] text-[#0B1D3A] px-6 py-3 font-semibold text-sm tracking-wider uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Project <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="bg-navy py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Transformations</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Before &amp; After
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              See the dramatic difference a new roof makes. These transformations showcase the quality of our craftsmanship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1}
              className="relative">
              <img src={images.portfolioBefore} alt="Before" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Before
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={2}
              className="relative">
              <img src={images.portfolioAfter} alt="After" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute top-4 left-4 bg-gold/90 text-navy-dark text-xs font-bold px-3 py-1 uppercase tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                After
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-20 text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Start Your Project?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Every project in our portfolio started with a conversation. Let's start yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 bg-gold text-navy-dark px-8 py-4 font-semibold text-sm tracking-wider uppercase hover:bg-[#d4b65c] transition-colors">
                  Get a Free Estimate <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <a href="tel:+19705551234" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 font-semibold text-sm tracking-wider uppercase hover:border-gold/50 hover:text-gold transition-colors">
                Call Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
