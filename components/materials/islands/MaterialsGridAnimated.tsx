"use client";
/*
 * Client island: animated materials grid with hover effects
 * Used by app/materials/page.tsx (server component)
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, DollarSign, Clock } from "lucide-react";
import type { MaterialData } from "@/lib/materials";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

interface Props {
  materials: Pick<
    MaterialData,
    "slug" | "name" | "shortName" | "manufacturer" | "image" | "warranty" | "lifespan" | "installedPrice" | "description"
  >[];
}

export default function MaterialsGridAnimated({ materials }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {materials.map((m, i) => (
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
            className="group block bg-navy-dark border border-white/10 hover:border-gold/40 transition-all overflow-hidden h-full"
          >
            {/* Tall product image */}
            <div className="aspect-[3/4] overflow-hidden relative">
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260)] via-transparent to-transparent" />
              {/* Warranty badge */}
              <div className="absolute top-3 right-3 bg-gold/90 text-navy-dark px-3 py-1">
                <span
                  className="text-xs font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  {m.warranty}
                </span>
              </div>
              {/* Price overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-navy-dark/80 backdrop-blur-sm border border-white/10 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} className="text-gold" />
                    <span
                      className="text-sm font-bold text-gold"
                      style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                    >
                      ${m.installedPrice.low.toFixed(2)}–${m.installedPrice.high.toFixed(2)}
                    </span>
                    <span
                      className="text-[10px] text-white/40"
                      style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                    >
                      /sqft
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-white/40" />
                    <span
                      className="text-[10px] text-white/40"
                      style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                    >
                      {m.lifespan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card content */}
            <div className="p-5">
              <h3
                className="text-base font-bold text-white group-hover:text-gold transition-colors mb-1"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {m.shortName}
              </h3>
              <p
                className="text-xs text-gold/70 font-medium mb-2"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                {m.manufacturer}
              </p>
              <p
                className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                {m.description}
              </p>
              <span
                className="text-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all tracking-wide"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                VIEW FULL DETAILS <ChevronRight size={14} />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
