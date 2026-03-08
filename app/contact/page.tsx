"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Contact page: Form, phone, email, map, service areas
 */
import { useState } from "react";
import { images } from "@/lib/images";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Phone, Mail, MapPin, Clock, ChevronRight, Send,
  CheckCircle2, MessageSquare
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch within 24 hours.");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.heroHome} alt="Contact Alpine Peak Roofing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Contact Us</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let's Start Your{" "}<span className="text-gold">Project</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Get your free, no-obligation estimate. We respond to every inquiry within 24 hours.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
              className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Request Your Free Estimate
              </h2>

              {submitted ? (
                <div className="bg-white/5 border border-gold/30 p-12 text-center">
                  <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Thank You!</h3>
                  <p className="text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    We've received your request and will be in touch within 24 hours. For immediate assistance, call us at (970) 446-8995.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-white/30"
                        placeholder="John Smith"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-white/30"
                        placeholder="john@example.com"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-white/30"
                        placeholder="(970) 555-0123"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Service Needed</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors appearance-none"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        <option value="" className="bg-navy">Select a service...</option>
                        <option value="residential-replacement" className="bg-navy">Residential Roof Replacement</option>
                        <option value="residential-repair" className="bg-navy">Residential Roof Repair</option>
                        <option value="commercial" className="bg-navy">Commercial Roofing</option>
                        <option value="emergency" className="bg-navy">Emergency Repair</option>
                        <option value="inspection" className="bg-navy">Roof Inspection</option>
                        <option value="gutters" className="bg-navy">Gutters & Drainage</option>
                        <option value="other" className="bg-navy">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Project Details</label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-none placeholder:text-white/30"
                      placeholder="Tell us about your project — type of roof, approximate size, any specific concerns..."
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20 w-full md:w-auto justify-center"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <Send size={16} />
                    SUBMIT REQUEST
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1}
              className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Get In Touch</h3>
                <div className="space-y-4">
                  <a href="tel:9704468995" className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors group">
                    <Phone size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <p className="text-sm font-medium text-white group-hover:text-gold transition-colors">(970) 446-8995</p>
                      <p className="text-xs text-white/40">Call or text anytime</p>
                    </div>
                  </a>
                  <a href="mailto:info@alpinepeakroofing.com" className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors group">
                    <Mail size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <p className="text-sm font-medium text-white group-hover:text-gold transition-colors">info@alpinepeakroofing.com</p>
                      <p className="text-xs text-white/40">We respond within 24 hours</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-white/60">
                    <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <p className="text-sm font-medium text-white">Serving All of Colorado</p>
                      <p className="text-xs text-white/40">Aspen, Vail, Telluride, and beyond</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-white/60">
                    <Clock size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <p className="text-sm font-medium text-white">Business Hours</p>
                      <p className="text-xs text-white/40">Mon–Fri: 7am–6pm</p>
                      <p className="text-xs text-white/40">Sat: 8am–2pm</p>
                      <p className="text-xs text-white/40">24/7 Emergency Service</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/30 p-6">
                <MessageSquare size={24} className="text-gold mb-3" />
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Prefer to Talk?</h3>
                <p className="text-sm text-white/60 mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Our team is standing by to answer your questions and schedule your free inspection.
                </p>
                <a href="tel:9704468995" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all w-full justify-center" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <Phone size={16} />
                  CALL NOW
                </a>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>What to Expect</h3>
                <ul className="space-y-2">
                  {[
                    "Response within 24 hours",
                    "Free, no-obligation estimate",
                    "Transparent pricing — no hidden fees",
                    "Flexible scheduling to fit your needs",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
