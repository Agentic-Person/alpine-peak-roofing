"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * About page: Company story, team, values, certifications
 */
import Link from "next/link";
import { images } from "@/lib/images";
import { motion } from "framer-motion";
import {
  Award, Shield, Users, Heart, Mountain, Target,
  CheckCircle2, ArrowRight, Star, ChevronRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const values = [
  { icon: Shield, title: "Integrity", desc: "We do what's right, even when no one is watching. Honest assessments, fair pricing, and transparent communication." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards of craftsmanship. Every detail matters, every project is a reflection of our name." },
  { icon: Heart, title: "Community", desc: "We're not just contractors — we're your neighbors. We invest in the communities we serve and treat every home like our own." },
  { icon: Target, title: "Innovation", desc: "We stay ahead of the curve with the latest materials, techniques, and technology to deliver superior results." },
];

const certifications = [
  "GAF Master Elite Contractor",
  "Owens Corning Platinum Preferred",
  "CertainTeed SELECT ShingleMaster",
  "OSHA Safety Certified",
  "BBB A+ Accredited Business",
  "Colorado Roofing Association Member",
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.teamPhoto} alt="Alpine Peak Roofing team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>About Alpine Peak</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Decades of{" "}<span className="text-gold">Mountain-Grade</span>{" "}Excellence
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Founded in 1989, Alpine Peak Roofing has grown from a small family operation to Colorado's most trusted roofing company.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                From Humble Beginnings to Colorado's Premier Roofer
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <p>Alpine Peak Roofing was founded in 1989 by a team of passionate craftsmen who believed that Colorado homeowners deserved better. Better materials, better workmanship, and better service than what was available at the time.</p>
                <p>Starting with a single truck and a commitment to excellence, we built our reputation one roof at a time. Word spread through the mountain communities — from Vail to Aspen, Telluride to Steamboat Springs — that Alpine Peak was the name to trust.</p>
                <p>Today, we're proud to be one of Colorado's largest and most respected roofing companies, with a team of over 50 certified professionals and thousands of completed projects across the state. But our values haven't changed: every project gets the same attention to detail and commitment to quality that built our reputation over three decades ago.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1}
              className="relative">
              <img src={images.aboutOffice} alt="Alpine Peak Roofing office" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 hidden lg:block">
                <div className="text-4xl font-bold text-navy-dark" style={{ fontFamily: "'Playfair Display', serif" }}>35+</div>
                <div className="text-sm text-navy-dark/70 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Values</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Principles That Guide Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 text-center hover:border-gold/30 transition-colors">
                <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
              className="relative">
              <img src={images.residentialWork} alt="Professional roofing work" className="w-full aspect-[4/3] object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Certifications</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Industry-Leading Credentials
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Our certifications aren't just badges — they represent thousands of hours of training, rigorous quality standards, and a commitment to staying at the forefront of roofing technology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span className="text-sm text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-navy py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Team</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet the Experts
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Our leadership team brings decades of combined experience in roofing, construction management, and customer service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "James Mitchell", role: "Founder & CEO", exp: "35+ years", bio: "Founded Alpine Peak in 1989 with a vision to bring premium roofing to Colorado's mountain communities." },
              { name: "Sarah Donovan", role: "Director of Operations", exp: "20+ years", bio: "Oversees all project management and ensures every installation meets our exacting quality standards." },
              { name: "Marcus Rivera", role: "Lead Project Manager", exp: "18+ years", bio: "Master craftsman and GAF-certified installer who leads our most complex residential and commercial projects." },
            ].map((member, i) => (
              <motion.div key={member.name} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors">
                <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mb-4">
                  <Users size={28} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
                <p className="text-gold text-sm font-medium mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.role}</p>
                <p className="text-white/40 text-xs mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.exp} experience</p>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
