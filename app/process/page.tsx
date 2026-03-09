"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Process page: Step-by-step workflow from consultation to completion
 */
import Link from "next/link";
import { images } from "@/lib/images";
import { motion } from "framer-motion";
import {
  Phone, ClipboardCheck, FileText, Hammer, CheckCircle2,
  Shield, ChevronRight, ArrowRight, Search, Ruler, HardHat
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Initial Consultation",
    description: "It all starts with a conversation. Call us or fill out our online form to schedule your free consultation. We'll discuss your needs, timeline, and budget to understand exactly what you're looking for.",
    details: [
      "Free, no-obligation consultation",
      "Discuss your goals and concerns",
      "Preliminary timeline and budget discussion",
      "Answer all your questions",
    ],
  },
  {
    number: "02",
    icon: Search,
    title: "Comprehensive Inspection",
    description: "Our certified inspectors conduct a thorough evaluation of your existing roof using the latest technology, including drone imagery and moisture detection. We document every finding with photos and detailed notes.",
    details: [
      "Full roof and attic inspection",
      "Drone aerial photography",
      "Moisture and ventilation assessment",
      "Detailed photo documentation",
    ],
  },
  {
    number: "03",
    icon: FileText,
    title: "Detailed Proposal",
    description: "You'll receive a comprehensive, transparent proposal that outlines every aspect of your project — materials, labor, timeline, warranty, and pricing. No hidden fees, no surprises.",
    details: [
      "Itemized cost breakdown",
      "Material specifications and options",
      "Project timeline with milestones",
      "Warranty details and coverage",
    ],
  },
  {
    number: "04",
    icon: Ruler,
    title: "Material Selection",
    description: "Work with our design team to select the perfect materials for your project. We'll bring samples to your home and help you choose colors, textures, and styles that complement your architecture.",
    details: [
      "In-home material samples",
      "Color and style consultation",
      "Energy efficiency recommendations",
      "Manufacturer warranty comparison",
    ],
  },
  {
    number: "05",
    icon: HardHat,
    title: "Expert Installation",
    description: "Our factory-certified crews execute your project with precision and care. We protect your property, maintain a clean worksite, and keep you informed every step of the way.",
    details: [
      "Property protection setup",
      "Factory-certified installation crew",
      "Daily progress updates",
      "Clean worksite maintained throughout",
    ],
  },
  {
    number: "06",
    icon: CheckCircle2,
    title: "Final Inspection & Warranty",
    description: "We conduct a rigorous final inspection to ensure every detail meets our exacting standards. You'll receive your warranty documentation and a complete project file for your records.",
    details: [
      "Multi-point quality inspection",
      "Warranty registration and documentation",
      "Complete project photo file",
      "Ongoing maintenance recommendations",
    ],
  },
];

export default function Process() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.inspection} alt="Roof inspection process" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Process</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Seamless{" "}<span className="text-gold">Experience</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              From your first call to the final inspection, every step is designed for transparency, quality, and your peace of mind.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`relative flex gap-8 ${i < steps.length - 1 ? "pb-16" : ""}`}
              >
                {/* Timeline line */}
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-16 h-16 bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{step.number}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-gold/40 to-white/10 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="md:hidden flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{step.number}</span>
                    </div>
                    <step.icon size={20} className="text-gold" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon size={20} className="text-gold hidden md:block" />
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  </div>
                  <p className="text-white/60 mb-4 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {step.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-navy py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}>
              <Shield size={48} className="text-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-gold">Triple Guarantee</span>
              </h2>
              <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                We stand behind every project with three ironclad guarantees that protect your investment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Workmanship Guarantee", desc: "Our installation is backed by a comprehensive workmanship warranty. If anything related to our work fails, we fix it — no questions asked.", period: "10-Year" },
                { title: "Material Guarantee", desc: "We only use manufacturer-certified materials with full factory warranties. Your materials are protected for decades.", period: "25-50 Year" },
                { title: "Satisfaction Guarantee", desc: "If you're not completely satisfied with any aspect of our work, we'll make it right. Period. Your happiness is our bottom line.", period: "100%" },
              ].map((g, i) => (
                <motion.div key={g.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                  className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors">
                  <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{g.period}</div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{g.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-20">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Take the first step toward a better roof. Schedule your free consultation today.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              SCHEDULE FREE CONSULTATION <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
