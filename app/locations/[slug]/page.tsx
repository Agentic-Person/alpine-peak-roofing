"use client";
/*
 * LocationDetail.tsx — Alpine Peak Roofing
 * Design: Mountain Modernism — Alpine Luxury Editorial
 * Location detail page with climate data, services, projects, and emergency response
 */
import { useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Thermometer,
  Cloud,
  Wind,
  AlertCircle,
  ChevronRight,
  Phone,
  ArrowRight,
} from "lucide-react";

import { locations } from "@/lib/locations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LocationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const location = locations.find((l) => l.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl text-white mb-4">Location Not Found</h1>
          <Link href="/">
            <span className="text-[#C9A84C] hover:underline">Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/60 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end pb-12 px-4">
          <div className="max-w-6xl mx-auto w-full">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link href="/locations">
                <span className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#d4b65c] transition-colors text-sm tracking-wider uppercase font-semibold">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Service Areas
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-wider uppercase rounded">
                  Service Area
                </span>
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
                {location.tagline}
                <br />
                <span className="text-[#C9A84C]">{location.name}, Colorado</span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                {location.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-[#0B1D3A] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {location.stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded p-6 text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Environment Section */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              {location.environment.title}
            </h2>
            <p className="text-lg text-white/70 max-w-3xl">{location.environment.intro}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Challenges */}
            <div className="md:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-8"
              >
                {location.environment.challenges.map((challenge, i) => (
                  <motion.div key={i} variants={fadeUp} className="border-l-2 border-[#C9A84C] pl-6">
                    <h3 className="font-playfair text-2xl text-white mb-2">{challenge.title}</h3>
                    <p className="text-white/70 mb-4">{challenge.description}</p>
                    <ul className="space-y-2">
                      {challenge.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-white/60 text-sm">
                          <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border border-[#C9A84C]/30 rounded-lg p-6"
            >
              <h3 className="font-playfair text-2xl text-[#C9A84C] mb-6">
                {location.environment.sidebarTitle}
              </h3>
              <div className="space-y-6">
                {location.environment.sidebarData.map((section, i) => (
                  <div key={i}>
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                      {section.category}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-white/70 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-[#C9A84C] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              Specialized Services
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {location.services.map((service, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 transition-all rounded-lg p-8"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-playfair text-2xl text-white mb-3">{service.title}</h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/60 text-sm">
                      <span className="text-[#C9A84C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              Signature Projects
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            {location.projects.map((project, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-[#C9A84C]/40 transition-all"
              >
                <h3 className="font-playfair text-2xl text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-4">
                  {project.specs.map((spec, j) => (
                    <div key={j} className="text-sm">
                      <span className="text-[#C9A84C] font-semibold">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seasonal Operations */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              Seasonal Operations
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {location.seasonal.map((season, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <h3 className="font-playfair text-xl text-[#C9A84C] mb-3">{season.season}</h3>
                <h4 className="text-white font-semibold mb-4">{season.title}</h4>
                <ul className="space-y-2">
                  {season.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/60 text-sm">
                      <span className="text-[#C9A84C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              Emergency Response
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {location.emergency.map((emergency, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-lg p-8"
              >
                <div className="text-4xl mb-4">{emergency.icon}</div>
                <h3 className="font-playfair text-2xl text-white mb-2">{emergency.title}</h3>
                <p className="text-white/70 mb-4">{emergency.description}</p>
                <ul className="space-y-2">
                  {emergency.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/60 text-sm">
                      <span className="text-[#C9A84C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0B1D3A] to-[#1a2f4a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              {location.cta.headline}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              {location.cta.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {location.cta.buttons.map((button, i) => (
                <Link key={i} href={button.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors inline-flex items-center gap-2"
                  >
                    {button.text}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
