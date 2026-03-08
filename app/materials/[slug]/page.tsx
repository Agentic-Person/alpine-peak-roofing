"use client";
import Link from "next/link";
import { getMaterialBySlug, materials } from "@/lib/materials";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Shield,
  Clock,
  Wind,
  Flame,
  DollarSign,
  CheckCircle2,
  XCircle,
  Phone,
  Calculator,
  Star,
  Zap,
  Mountain,
  Wrench,
  MapPin,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MaterialThumbnails({ currentSlug }: { currentSlug: string }) {
  const others = materials.filter((m) => m.slug !== currentSlug);
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] uppercase tracking-wider text-alpine-white/40 shrink-0" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        Other Materials:
      </span>
      <div className="flex gap-2">
        {others.map((m) => (
          <Link
            key={m.slug}
            href={`/materials/${m.slug}`}
            className="group relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-white/10 hover:border-gold/50 transition-all shrink-0"
          >
            <img
              src={m.image}
              alt={m.shortName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-navy-dark/40 group-hover:bg-navy-dark/20 transition-all" />
            <div className="absolute bottom-0 left-0 right-0 bg-navy-dark/80 px-2 py-1">
              <p className="text-[10px] md:text-xs text-white text-center truncate font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {m.shortName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PriceCalculator({ material }: { material: NonNullable<ReturnType<typeof getMaterialBySlug>> }) {
  const [sqft, setSqft] = useState(2000);
  const [pricingMode, setPricingMode] = useState<"installed" | "materialOnly">("installed");

  const priceData = pricingMode === "installed" ? material.installedPrice : material.materialPrice;

  const estimates = useMemo(() => {
    return {
      low: sqft * priceData.low,
      avg: sqft * priceData.avg,
      high: sqft * priceData.high,
    };
  }, [sqft, priceData]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

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
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Estimate Calculator
          </h3>
          <p className="text-sm text-alpine-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Ballpark pricing for Colorado installations
          </p>
        </div>
      </div>

      {/* Pricing Mode Toggle */}
      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gold mb-3 tracking-wide"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
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
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <span className="block text-xs opacity-70 mb-0.5">Material + Install</span>
            <span className="font-bold">${material.installedPrice.low.toFixed(2)}–${material.installedPrice.high.toFixed(2)}/sqft</span>
          </button>
          <button
            onClick={() => setPricingMode("materialOnly")}
            className={`px-4 py-3 text-sm font-medium transition-all text-center ${
              pricingMode === "materialOnly"
                ? "bg-gold text-navy-dark"
                : "bg-white/5 text-alpine-white/70 hover:bg-white/10 border border-white/10"
            }`}
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <span className="block text-xs opacity-70 mb-0.5">Material Only</span>
            <span className="font-bold">${material.materialPrice.low.toFixed(2)}–${material.materialPrice.high.toFixed(2)}/sqft</span>
          </button>
        </div>
      </div>

      {/* Sqft Input */}
      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gold mb-3 tracking-wide"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
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
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
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
        <div className="flex justify-between text-xs text-alpine-white/40 mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          <span>500 sq ft</span>
          <span className="text-gold font-semibold">{sqft.toLocaleString()} sq ft</span>
          <span>6,000 sq ft</span>
        </div>
      </div>

      {/* Estimate Results */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/5 p-4 text-center border border-white/5">
          <p className="text-xs text-alpine-white/50 mb-1 uppercase tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Budget</p>
          <p className="text-lg md:text-xl font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formatPrice(estimates.low)}
          </p>
          <p className="text-xs text-alpine-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            ${priceData.low.toFixed(2)}/sqft
          </p>
        </div>
        <div className="bg-gold/10 p-4 text-center border border-gold/30">
          <p className="text-xs text-gold mb-1 uppercase tracking-wide font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Average</p>
          <p className="text-lg md:text-xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formatPrice(estimates.avg)}
          </p>
          <p className="text-xs text-gold/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            ${priceData.avg.toFixed(2)}/sqft
          </p>
        </div>
        <div className="bg-white/5 p-4 text-center border border-white/5">
          <p className="text-xs text-alpine-white/50 mb-1 uppercase tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Premium</p>
          <p className="text-lg md:text-xl font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formatPrice(estimates.high)}
          </p>
          <p className="text-xs text-alpine-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            ${priceData.high.toFixed(2)}/sqft
          </p>
        </div>
      </div>

      {/* Mode indicator */}
      <div className="bg-white/5 px-3 py-2 border border-white/5 mb-4 text-center">
        <p className="text-xs text-alpine-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          {pricingMode === "installed" ? (
            <>Showing <span className="text-gold font-semibold">material + installation</span> costs</>
          ) : (
            <>Showing <span className="text-gold font-semibold">material only</span> costs (labor not included)</>
          )}
        </p>
      </div>

      <div className="bg-white/5 p-4 border border-white/5 mb-6">
        <p className="text-xs text-alpine-white/50 italic" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          * These are ballpark estimates for Colorado installations. Actual pricing varies based on roof complexity, pitch, accessibility, removal of existing roof, and local market conditions. Get an accurate quote with our free estimate.
        </p>
      </div>

      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-4 text-sm font-semibold tracking-wide transition-all w-full hover:shadow-lg hover:shadow-gold/20"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        GET YOUR FREE EXACT ESTIMATE
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

export default function MaterialDetail({ params }: { params: { slug: string } }) {
  const material = getMaterialBySlug(params.slug || "");

  if (!material) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-navy-dark">
        <div className="text-center px-4">
          <Mountain size={48} className="text-gold mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-alpine-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Material Not Found
          </h1>
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <ArrowLeft size={16} />
            BACK TO MATERIALS
          </Link>
        </div>
      </div>
    );
  }

  const otherMaterials = materials.filter((m) => m.slug !== material.slug);

  return (
    <div className="bg-navy-dark">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={material.image}
            alt={material.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />
        </div>
        <div className="container relative z-10 pb-12 pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm mb-6 transition-colors"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <ArrowLeft size={16} />
              BACK TO MATERIALS
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold/20 text-gold px-3 py-1 text-xs font-semibold tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {material.warranty} WARRANTY
              </span>
              <span className="bg-white/10 text-alpine-white/80 px-3 py-1 text-xs font-semibold tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {material.lifespan} LIFESPAN
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-alpine-white mb-4 max-w-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {material.name}
            </h1>
            <p
              className="text-lg md:text-xl text-alpine-white/70 max-w-2xl"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {material.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-navy border-y border-white/10">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { icon: DollarSign, label: "Material Only", value: `$${material.materialPrice.low.toFixed(2)}–$${material.materialPrice.high.toFixed(2)}/sqft` },
              { icon: Layers, label: "Installed", value: `$${material.installedPrice.low.toFixed(2)}–$${material.installedPrice.high.toFixed(2)}/sqft` },
              { icon: Clock, label: "Lifespan", value: material.lifespan },
              { icon: Shield, label: "Warranty", value: material.warranty },
              { icon: Wind, label: "Wind Rating", value: material.windRating.split("(")[0].trim() },
              { icon: Flame, label: "Fire Rating", value: material.fireRating.split("(")[0].trim() },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <stat.icon size={18} className="text-gold shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-alpine-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold text-alpine-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content — wider calculator layout: 55/45 split */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Content (55%) */}
            <div className="lg:col-span-6 space-y-12">
              {/* Overview */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Overview
                </h2>
                <p className="text-alpine-white/70 leading-relaxed text-lg mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {material.longDescription}
                </p>
                <div className="bg-navy-light border border-white/10 p-5 mt-6">
                  <p className="text-sm text-alpine-white/60 mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    MANUFACTURER
                  </p>
                  <p className="text-gold font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {material.manufacturer}
                  </p>
                  <p className="text-sm text-alpine-white/60 mt-3 mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    IDEAL FOR
                  </p>
                  <p className="text-alpine-white/80 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {material.idealFor}
                  </p>
                  <p className="text-sm text-alpine-white/60 mt-3 mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    COLOR OPTIONS
                  </p>
                  <p className="text-alpine-white/80 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {material.colorOptions}
                  </p>
                </div>
              </motion.div>

              {/* Pros & Cons */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="gold-line mb-4" />
                <h2
                  className="text-2xl md:text-3xl font-bold text-alpine-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Pros &amp; Cons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-navy-light border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                      <h3 className="text-lg font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Advantages
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {material.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-1 shrink-0" />
                          <span className="text-sm text-alpine-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                            {pro}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-navy-light border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle size={20} className="text-red-400" />
                      <h3 className="text-lg font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Considerations
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {material.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle size={14} className="text-red-400 mt-1 shrink-0" />
                          <span className="text-sm text-alpine-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
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
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Warranty Information
                </h2>
                <div className="bg-navy-light border border-gold/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} className="text-gold" />
                    <span className="text-2xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {material.warranty} Warranty
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {material.warrantyDetails.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Shield size={14} className="text-gold/60 mt-1 shrink-0" />
                        <span className="text-sm text-alpine-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
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
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Is {material.shortName} Right for You?
                </h2>
                <p className="text-alpine-white/60 mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Choose {material.shortName.toLowerCase()} if:
                </p>
                <div className="space-y-3">
                  {material.whyChoose.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3 bg-navy-light border border-white/5 p-4">
                      <Star size={16} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-alpine-white/80" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
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
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Maintenance Tips
                </h2>
                <div className="space-y-3">
                  {material.maintenanceTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Wrench size={14} className="text-gold/60 mt-1 shrink-0" />
                      <span className="text-sm text-alpine-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
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
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Colorado-Specific Considerations
                </h2>
                <div className="bg-navy-light border border-gold/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={20} className="text-gold" />
                    <h3 className="text-lg font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      What Colorado Homeowners Need to Know
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {material.coloradoConsiderations.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Zap size={14} className="text-gold/60 mt-1 shrink-0" />
                        <span className="text-sm text-alpine-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar (45%) — wider calculator */}
            <div className="lg:col-span-6 space-y-8">
              <div className="lg:sticky lg:top-24">
                {/* Thumbnail quick-links to other materials */}
                <MaterialThumbnails currentSlug={material.slug} />

                {/* Price Calculator */}
                <PriceCalculator material={material} />

                {/* Quick Contact */}
                <div className="bg-navy border border-white/10 p-6 mt-6">
                  <h3 className="text-lg font-bold text-alpine-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Questions About {material.shortName}?
                  </h3>
                  <p className="text-sm text-alpine-white/60 mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Our roofing experts can help you decide if {material.shortName.toLowerCase()} is the right choice for your home.
                  </p>
                  <a
                    href="tel:9704468995"
                    className="flex items-center justify-center gap-2 border border-gold/40 hover:border-gold text-gold px-6 py-3 text-sm font-semibold tracking-wide transition-all w-full"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <Phone size={16} />
                    (970) 446-8995
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
            <h2 className="text-2xl md:text-3xl font-bold text-alpine-white" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-alpine-white group-hover:text-gold transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {m.shortName}
                    </h3>
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {m.warranty}
                    </span>
                  </div>
                  <p className="text-sm text-alpine-white/50 mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    From ${m.installedPrice.low.toFixed(2)}/sqft installed
                  </p>
                  <span className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    LEARN MORE <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
