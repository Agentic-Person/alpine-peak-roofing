"use client";
/**
 * LocationsGrid — client island for /locations index page
 * Handles framer-motion entrance animations on the location cards.
 * All data is passed as props (serialised from the server component).
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LocationCard {
  slug: string;
  name: string;
  tagline: string;
  elevation: string;
  description: string;
  image: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export function LocationsGrid({ cards }: { cards: LocationCard[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cards.map((location, i) => (
        <motion.div
          key={location.slug}
          custom={i}
          variants={fadeUp}
          className="group"
        >
          <Link href={`/locations/${location.slug}`}>
            <div className="bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 transition-all overflow-hidden rounded-lg h-full flex flex-col cursor-pointer">
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <Image
                  src={location.image}
                  alt={`${location.name} roofing services`}
                  width={800}
                  height={800}
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
  );
}
