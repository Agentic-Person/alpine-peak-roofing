"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { materials as materialsData } from "@/lib/materials";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

export default function MaterialsGrid() {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={0}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="gold-line mx-auto mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
          Premium Materials
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Only the Finest Materials
        </h2>
        <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
          We partner with the industry&apos;s leading manufacturers to ensure every roof we install meets the highest standards of durability, beauty, and performance. Our material selection is specifically curated for Colorado&apos;s extreme weather conditions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {materialsData.map((m, i) => (
          <motion.div
            key={m.slug}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <Link
              href={`/materials/${m.slug}`}
              className="group block bg-navy-dark/70 backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260)] via-transparent to-transparent" />
                <div className="absolute top-2 right-2 bg-gold/90 text-navy-dark px-2 py-0.5">
                  <span className="text-[10px] font-bold tracking-wide" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>{m.warranty}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {m.shortName}
                </h3>
                <p className="text-[11px] text-white/40 mb-2" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                  From ${m.installedPrice.low.toFixed(2)}/sqft installed
                </p>
                <span className="text-gold text-[10px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all tracking-wider" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                  LEARN MORE <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all text-sm tracking-wide"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          VIEW ALL SERVICES &amp; MATERIALS <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
