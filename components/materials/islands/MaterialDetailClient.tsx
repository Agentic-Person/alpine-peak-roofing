"use client";
/*
 * Client island: interactive price calculator + animated content sections for material detail
 * Used by app/materials/[slug]/page.tsx (server component)
 */
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Shield,
  CheckCircle2,
  XCircle,
  Phone,
  Calculator,
  Star,
  Zap,
  Wrench,
  MapPin,
} from "lucide-react";
import type { MaterialData } from "@/lib/materials";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Price Calculator ──────────────────────────────────────────────────────────

function PriceCalculator({ material }: { material: MaterialData }) {
  const [sqft, setSqft] = useState(2000);
  const [pricingMode, setPricingMode] = useState<"installed" | "materialOnly">("installed");

  const priceData = pricingMode === "installed" ? material.installedPrice : material.materialPrice;

  const estimates = useMemo(
    () => ({
      low: sqft * priceData.low,
      avg: sqft * priceData.avg,
      high: sqft * priceData.high,
    }),
    [sqft, priceData],
  );

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const presets = [1500, 2000, 2500, 3000, 3500, 4000];

  return (
    <div className="bg-navy-light border border-white/10 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gold/20 flex items-center justify-center">
          <Calculator size={20} className="text-gold" />
        </div>
        <div>
          <h3
            className="text-xl font-bold text-alpine-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Estimate Calculator
          </h3>
          <p
            className="text-sm text-alpine-white/50"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            Ballpark pricing for Colorado installations
          </p>
        </div>
      </div>

      {/* Pricing Mode Toggle */}
      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gold mb-3 tracking-wide"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          PRICING VIEW
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setPricingMode("installed")}
            className={`px-4 py-3 text-sm font-medium transition-all text-center ${
              pricingMode === "installed"
                ? "bg-gold text-navy-dark"
                : "bg-white/5 text-alpine-white/70 hover:bg-white/10 border border-white/10"
            }`}
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            <span className="block text-xs opacity-70 mb-0.5">Material + Install</span>
            <span className="font-bold">
              ${material.installedPrice.low.toFixed(2)}–${material.installedPrice.high.toFixed(2)}/sqft
            </span>
          </button>
          <button
            onClick={() => setPricingMode("materialOnly")}
            className={`px-4 py-3 text-sm font-medium transition-all text-center ${
              pricingMode === "materialOnly"
                ? "bg-gold text-navy-dark"
                : "bg-white/5 text-alpine-white/70 hover:bg-white/10 border border-white/10"
            }`}
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            <span className="block text-xs opacity-70 mb-0.5">Material Only</span>
            <span className="font-bold">
              ${material.materialPrice.low.toFixed(2)}–${material.materialPrice.high.toFixed(2)}/sqft
            </span>
          </button>
        </div>
      </div>

      {/* Sqft Input */}
      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gold mb-3 tracking-wide"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          ROOF SIZE (SQUARE FEET)
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setSqft(p)}
              className={`px-3 py-2 text-sm font-medium transition-all ${
                sqft === p
                  ? "bg-gold text-navy-dark"
                  : "bg-white/5 text-alpine-white/70 hover:bg-white/10 border border-white/10"
              }`}
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              {p.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="range"
          min={500}
          max={6000}
          step={100}
          value={sqft}
          onChange={(e) => setSqft(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold"
        />
        <div
          className="flex justify-between text-xs text-alpine-white/40 mt-1"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          <span>500 sq ft</span>
          <span className="text-gold font-semibold">{sqft.toLocaleString()} sq ft</span>
          <span>6,000 sq ft</span>
        </div>
      </div>

      {/* Estimate Results */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/5 p-4 text-center border border-white/5">
          <p
            className="text-xs text-alpine-white/50 mb-1 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            Budget
          </p>
          <p
            className="text-lg md:text-xl font-bold text-alpine-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {formatPrice(estimates.low)}
          </p>
          <p
            className="text-xs text-alpine-white/40"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            ${priceData.low.toFixed(2)}/sqft
          </p>
        </div>
        <div className="bg-gold/10 p-4 text-center border border-gold/30">
          <p
            className="text-xs text-gold mb-1 uppercase tracking-wide font-semibold"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            Average
          </p>
          <p
            className="text-lg md:text-xl font-bold text-gold"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {formatPrice(estimates.avg)}
          </p>
          <p
            className="text-xs text-gold/70"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            ${priceData.avg.toFixed(2)}/sqft
          </p>
        </div>
        <div className="bg-white/5 p-4 text-center border border-white/5">
          <p
            className="text-xs text-alpine-white/50 mb-1 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            Premium
          </p>
          <p
            className="text-lg md:text-xl font-bold text-alpine-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {formatPrice(estimates.high)}
          </p>
          <p
            className="text-xs text-alpine-white/40"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            ${priceData.high.toFixed(2)}/sqft
          </p>
        </div>
      </div>

      <div className="bg-white/5 px-3 py-2 border border-white/5 mb-4 text-center">
        <p
          className="text-xs text-alpine-white/60"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          {pricingMode === "installed" ? (
            <>
              Showing <span className="text-gold font-semibold">material + installation</span> costs
            </>
          ) : (
            <>
              Showing <span className="text-gold font-semibold">material only</span> costs (labor not included)
            </>
          )}
        </p>
      </div>

      <div className="bg-white/5 p-4 border border-white/5 mb-6">
        <p
          className="text-xs text-alpine-white/50 italic"
          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
        >
          * These are ballpark estimates for Colorado installations. Actual pricing varies based on roof
          complexity, pitch, accessibility, removal of existing roof, and local market conditions. Get
          an accurate quote with our free estimate.
        </p>
      </div>

      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-4 text-sm font-semibold tracking-wide transition-all w-full hover:shadow-lg hover:shadow-gold/20"
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        GET YOUR FREE EXACT ESTIMATE
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

// ── Material Thumbnails ───────────────────────────────────────────────────────

interface ThumbProps {
  others: Pick<MaterialData, "slug" | "shortName" | "image">[];
}

function MaterialThumbnails({ others }: ThumbProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-[10px] uppercase tracking-wider text-alpine-white/40 shrink-0"
        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
      >
        Other Materials:
      </span>
      <div className="flex gap-2">
        {others.map((m) => (
          <Link
            key={m.slug}
            href={`/materials/${m.slug}`}
            className="group relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-white/10 hover:border-gold/50 transition-all shrink-0"
          >
            <Image
              src={m.image}
              alt={m.shortName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 128px, 160px"
            />
            <div className="absolute inset-0 bg-navy-dark/40 group-hover:bg-navy-dark/20 transition-all" />
            <div className="absolute bottom-0 left-0 right-0 bg-navy-dark/80 px-2 py-1">
              <p
                className="text-[10px] md:text-xs text-white text-center truncate font-medium"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                {m.shortName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

interface Props {
  material: MaterialData;
  otherMaterials: MaterialData[];
}

export default function MaterialDetailClient({ material, otherMaterials }: Props) {
  return (
    <>
      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column — Content */}
            <div className="lg:col-span-6 space-y-12">
              {/* Overview */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Overview
                </h2>
                <p
                  className="text-alpine-white/70 leading-relaxed text-lg mb-4"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  {material.longDescription}
                </p>
                <div className="bg-navy-light border border-white/10 p-5 mt-6">
                  <p
                    className="text-sm text-alpine-white/60 mb-1"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    MANUFACTURER
                  </p>
                  <p
                    className="text-gold font-semibold"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {material.manufacturer}
                  </p>
                  <p
                    className="text-sm text-alpine-white/60 mt-3 mb-1"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    IDEAL FOR
                  </p>
                  <p
                    className="text-alpine-white/80 text-sm"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {material.idealFor}
                  </p>
                  <p
                    className="text-sm text-alpine-white/60 mt-3 mb-1"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    COLOR OPTIONS
                  </p>
                  <p
                    className="text-alpine-white/80 text-sm"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {material.colorOptions}
                  </p>
                </div>
              </motion.div>

              {/* Pros & Cons */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Pros &amp; Cons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-navy-light border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                      <h3
                        className="text-lg font-bold text-alpine-white"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        Advantages
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {material.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-1 shrink-0" />
                          <span
                            className="text-sm text-alpine-white/70"
                            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                          >
                            {pro}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-navy-light border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle size={20} className="text-red-400" />
                      <h3
                        className="text-lg font-bold text-alpine-white"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        Considerations
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {material.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle size={14} className="text-red-400 mt-1 shrink-0" />
                          <span
                            className="text-sm text-alpine-white/70"
                            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                          >
                            {con}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Warranty Details */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Warranty Information
                </h2>
                <div className="bg-navy-light border border-gold/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} className="text-gold" />
                    <span
                      className="text-2xl font-bold text-gold"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {material.warranty} Warranty
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {material.warrantyDetails.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Shield size={14} className="text-gold/60 mt-1 shrink-0" />
                        <span
                          className="text-sm text-alpine-white/70"
                          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                        >
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Why Choose */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Is {material.shortName} Right for You?
                </h2>
                <p
                  className="text-alpine-white/60 mb-6"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  Choose {material.shortName.toLowerCase()} if:
                </p>
                <div className="space-y-3">
                  {material.whyChoose.map((reason, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-navy-light border border-white/5 p-4"
                    >
                      <Star size={16} className="text-gold mt-0.5 shrink-0" />
                      <span
                        className="text-sm text-alpine-white/80"
                        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                      >
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Maintenance */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Maintenance Tips
                </h2>
                <div className="space-y-3">
                  {material.maintenanceTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Wrench size={14} className="text-gold/60 mt-1 shrink-0" />
                      <span
                        className="text-sm text-alpine-white/70"
                        style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                      >
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Colorado Considerations */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Colorado-Specific Considerations
                </h2>
                <div className="bg-navy-light border border-gold/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={20} className="text-gold" />
                    <h3
                      className="text-lg font-bold text-alpine-white"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      What Colorado Homeowners Need to Know
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {material.coloradoConsiderations.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Zap size={14} className="text-gold/60 mt-1 shrink-0" />
                        <span
                          className="text-sm text-alpine-white/70"
                          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right Column — Sticky Sidebar */}
            <div className="lg:col-span-6 space-y-8">
              <div className="lg:sticky lg:top-24">
                <MaterialThumbnails others={otherMaterials} />
                <PriceCalculator material={material} />

                {/* Quick Contact */}
                <div className="bg-navy border border-white/10 p-6 mt-6">
                  <h3
                    className="text-lg font-bold text-alpine-white mb-3"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Questions About {material.shortName}?
                  </h3>
                  <p
                    className="text-sm text-alpine-white/60 mb-4"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    Our roofing experts can help you decide if {material.shortName.toLowerCase()} is
                    the right choice for your home.
                  </p>
                  <a
                    href="tel:9704561176"
                    className="flex items-center justify-center gap-2 border border-gold/40 hover:border-gold text-gold px-6 py-3 text-sm font-semibold tracking-wide transition-all w-full"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    <Phone size={16} />
                    (970) 456-1176
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Materials */}
      <section className="bg-navy py-16 border-t border-white/10">
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold text-alpine-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Explore Other Materials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherMaterials.map((m) => (
              <Link
                key={m.slug}
                href={`/materials/${m.slug}`}
                className="group bg-navy-dark border border-white/10 hover:border-gold/30 transition-all overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="text-lg font-bold text-alpine-white group-hover:text-gold transition-colors"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {m.shortName}
                    </h3>
                    <span
                      className="text-xs bg-gold/20 text-gold px-2 py-0.5"
                      style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                    >
                      {m.warranty}
                    </span>
                  </div>
                  <p
                    className="text-sm text-alpine-white/50 mb-3"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    From ${m.installedPrice.low.toFixed(2)}/sqft installed
                  </p>
                  <span
                    className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    LEARN MORE <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
