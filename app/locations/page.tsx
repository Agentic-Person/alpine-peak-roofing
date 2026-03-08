"use client";
/*
 * Locations.tsx — Alpine Peak Roofing
 * Design: Mountain Modernism — Alpine Luxury Editorial
 * Locations index page showing all 12 service areas in a grid
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { locations } from "@/lib/locations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function Locations() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center py-20 px-4 bg-gradient-to-br from-[#0B1D3A] via-[#1a2f4a] to-[#0B1D3A]">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-semibold block mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Service Areas
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
              Serving All of Colorado
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              From the Front Range to the Western Slope, Alpine Peak Roofing serves communities across the Colorado Rocky Mountains. Each location presents unique roofing challenges that demand specialized expertise and proven solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {locations.map((location, i) => (
              <motion.div
                key={location.id}
                custom={i}
                variants={fadeUp}
                className="group"
              >
                <Link href={`/locations/${location.slug}`}>
                  <div className="bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 transition-all overflow-hidden rounded-lg h-full flex flex-col cursor-pointer">
                    {/* Image */}
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {location.name}
                        </h3>
                        <p className="text-[#C9A84C] text-sm font-semibold tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {location.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          Elevation
                        </span>
                        <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {location.elevation}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {location.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#C9A84C] font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Alpine Peak */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0B1D3A] to-[#1a2f4a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
                Why Choose Alpine Peak for Your Location?
              </h2>
              <div className="space-y-4">
                {[
                  "Local expertise in your specific mountain community",
                  "Understanding of unique elevation and climate challenges",
                  "Proven track record with properties in your area",
                  "24/7 emergency response within your region",
                  "Specialized equipment for high-altitude conditions",
                  "Commitment to your community's character and values",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-lg p-8"
            >
              <h3 className="font-playfair text-2xl text-[#C9A84C] mb-6">
                Regional Coverage
              </h3>
              <p className="text-white/70 mb-6">
                Alpine Peak Roofing serves 12 major Colorado mountain communities, each with specialized expertise tailored to local conditions, market demands, and architectural heritage.
              </p>
              <div className="space-y-3 mb-8">
                <div>
                  <h4 className="text-white font-semibold mb-2">Central Rockies</h4>
                  <p className="text-white/60 text-sm">Aspen, Vail, Telluride, Crested Butte, Breckenridge, Winter Park</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Summit County</h4>
                  <p className="text-white/60 text-sm">Frisco, Silverthorne, Central Mountains</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Western Slope & South</h4>
                  <p className="text-white/60 text-sm">Glenwood Springs, Durango</p>
                </div>
              </div>
              <Link href="/contact">
                <button className="w-full px-6 py-3 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors">
                  Get Local Consultation
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#0B1D3A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-playfair text-4xl md:text-5xl text-white"
            >
              Ready to Protect Your Property?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Contact Alpine Peak Roofing today for a free consultation. Our local experts will assess your property's unique needs and deliver a customized roofing solution.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors inline-flex items-center gap-2">
                  Schedule Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border-2 border-[#C9A84C] text-[#C9A84C] font-semibold rounded hover:bg-[#C9A84C]/10 transition-colors">
                  Call (970) 456-1176
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
