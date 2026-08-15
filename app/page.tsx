/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Deep navy + gold accents, Playfair Display headlines, Source Sans 3 body
 * Magazine-style editorial layout with diagonal dividers and cinematic imagery
 *
 * SERVER COMPONENT — no "use client" — crawlable by Google / AI
 * Client animations extracted to components/home/islands/
 */
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { images } from "@/lib/images";

import HeroAnimations from "@/components/home/islands/HeroAnimations";
import TrustBar from "@/components/home/TrustBar";
import StatsBar from "@/components/home/islands/StatsBar";
import ServicesGrid from "@/components/home/islands/ServicesGrid";
import WhyChooseUs from "@/components/home/islands/WhyChooseUs";
import PortfolioPreview from "@/components/home/islands/PortfolioPreview";
import TestimonialsGrid from "@/components/home/islands/TestimonialsGrid";
import MaterialsGrid from "@/components/home/islands/MaterialsGrid";
import ServiceAreasGrid from "@/components/home/islands/ServiceAreasGrid";

export const metadata: Metadata = {
  title: "Alpine Peak Roofing | Colorado's Premier Mountain Roofing Specialists",
  description:
    "Expert roofing for Colorado's mountain communities — Aspen, Vail, Telluride, Breckenridge & more. Residential, commercial & emergency roofing. Licensed & insured since 1989. Free estimates.",
  alternates: {
    canonical: "https://alpinepeakroofing.com/",
  },
  openGraph: {
    title: "Alpine Peak Roofing | Colorado's Premier Mountain Roofing Specialists",
    description:
      "Expert craftsmanship meets mountain-grade durability. Serving Colorado's most prestigious mountain communities since 1989. Call (970) 456-1176.",
    url: "https://alpinepeakroofing.com/",
    siteName: "Alpine Peak Roofing",
    images: [
      {
        url: images.heroHome,
        width: 1920,
        height: 1080,
        alt: "Luxury mountain home with premium Alpine Peak roofing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpine Peak Roofing | Colorado's Premier Mountain Roofing Specialists",
    description:
      "Expert craftsmanship meets mountain-grade durability. Serving Colorado's most prestigious mountain communities since 1989.",
    images: [images.heroHome],
  },
};

const services = [
  {
    title: "Residential Roofing",
    description:
      "Complete roof replacement, repairs, and new construction for Colorado homes. From architectural shingles to premium metal roofing systems.",
    image: images.heroResidential,
  },
  {
    title: "Commercial Roofing",
    description:
      "Full-service commercial solutions including TPO, EPDM, modified bitumen, and standing seam metal for businesses across the Rockies.",
    image: images.heroCommercial,
  },
  {
    title: "Emergency Repairs",
    description:
      "24/7 storm damage response, emergency leak repair, and temporary weatherproofing. We're there when you need us most.",
    image: images.emergencyRepair,
  },
];

const serviceAreas = [
  { name: "Aspen", tagline: "Luxury mountain living at 7,908 ft", elevation: "7,908 ft", description: "World-class skiing, Victorian architecture, and celebrity estates. We protect Aspen's most prestigious properties.", image: images.townAspen },
  { name: "Vail", tagline: "Colorado's premier alpine village", elevation: "8,150 ft", description: "Bavarian-style village with the state's largest ski resort. Expert roofing for luxury chalets and lodges.", image: images.townVail },
  { name: "Telluride", tagline: "Historic mining town at 8,750 ft", elevation: "8,750 ft", description: "Box canyon setting with dramatic San Juan peaks. Preserving historic roofs and protecting modern mountain homes.", image: images.townTelluride },
  { name: "Crested Butte", tagline: "Wildflower capital of Colorado", elevation: "8,885 ft", description: "Colorful Victorian storefronts beneath Mt. Crested Butte. Roofing that matches the town's vibrant character.", image: images.townCrestedButte },
  { name: "Steamboat Springs", tagline: "Home of Champagne Powder", elevation: "6,732 ft", description: "Ranching heritage meets world-class skiing. Durable roofing built for Steamboat's legendary snowfall.", image: images.townSteamboat },
  { name: "Breckenridge", tagline: "Victorian charm at 9,600 ft", elevation: "9,600 ft", description: "Colorado's highest incorporated city with gold mining roots. Roofing engineered for extreme alpine conditions.", image: images.townBreckenridge },
  { name: "Winter Park", tagline: "Denver's mountain playground", elevation: "9,040 ft", description: "Gateway to the Continental Divide and Fraser Valley. Protecting homes from heavy snow loads and UV exposure.", image: images.townWinterPark },
  { name: "Durango", tagline: "Where the Old West lives on", elevation: "6,512 ft", description: "Historic narrow gauge railroad town near Mesa Verde. Roofing that honors Old West character with modern performance.", image: images.townDurango },
  { name: "Glenwood Springs", tagline: "World's largest hot springs", elevation: "5,761 ft", description: "Home of the iconic Hotel Colorado and Glenwood Canyon. Protecting properties in this natural wonderland.", image: images.townGlenwood },
  { name: "Frisco", tagline: "Gateway to Summit County", elevation: "9,097 ft", description: "Charming lakeside town on Dillon Reservoir. Hub for five ski resorts with roofing built for mountain living.", image: images.townFrisco },
  { name: "Silverthorne", tagline: "Summit County's outdoor hub", elevation: "8,790 ft", description: "Blue River fly fishing and Gore Range views. Premium roofing for mountain homes and commercial properties.", image: images.townSilverthorne },
  { name: "Central Mountains", tagline: "The heart of the Rockies", elevation: "Varies", description: "From mountain passes to alpine valleys, we serve the broader central mountain communities across Colorado.", image: images.townCentralMountains },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://alpinepeakroofing.com/#webpage",
  "url": "https://alpinepeakroofing.com/",
  "name": "Alpine Peak Roofing | Colorado's Premier Mountain Roofing Specialists",
  "description":
    "Expert roofing for Colorado's mountain communities — Aspen, Vail, Telluride & more. Residential, commercial & emergency roofing since 1989.",
  "isPartOf": { "@id": "https://alpinepeakroofing.com/#organization" },
  "about": { "@id": "https://alpinepeakroofing.com/#organization" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": images.heroHome,
    "width": 1920,
    "height": 1080,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alpinepeakroofing.com/",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        strategy="beforeInteractive"
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.heroHome}
            alt="Luxury mountain home with premium roofing in Colorado"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.12_0.03_260/0.4)]" />
        </div>

        <div className="relative container py-32 lg:py-40">
          <div className="max-w-3xl">
            {/* Static fallback visible to crawlers immediately; animations layer on top */}
            <noscript>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-1.5 mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                  Licensed &amp; Insured — Serving Colorado Since 1989
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Colorado&apos;s Premier <span className="text-gold">Roofing</span> Specialists
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                Expert craftsmanship meets mountain-grade durability. From Aspen to Telluride, we deliver roofing solutions built to withstand Colorado&apos;s most demanding conditions.
              </p>
            </noscript>
            <HeroAnimations />
          </div>
        </div>

        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <TrustBar />

      {/* ==================== STATS BAR ==================== */}
      <section className="bg-navy-dark py-12 relative z-10" aria-label="Company statistics">
        <div className="container">
          <StatsBar />
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="bg-navy py-24 relative" aria-labelledby="services-heading">
        <div className="container">
          <ServicesGrid services={services} />
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="relative py-24 overflow-hidden" aria-labelledby="why-us-heading">
        <div className="absolute inset-0">
          <Image src={images.inspection} alt="Professional roof inspection in Colorado mountains" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.95)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.7)]" />
        </div>
        <div className="relative container">
          <WhyChooseUs />
        </div>
      </section>

      {/* ==================== PORTFOLIO PREVIEW ==================== */}
      <section className="bg-navy-dark py-24" aria-labelledby="portfolio-heading">
        <div className="container">
          <PortfolioPreview />
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-navy py-24" aria-labelledby="testimonials-heading">
        <div className="container">
          <TestimonialsGrid />
        </div>
      </section>

      {/* ==================== MATERIALS SECTION ==================== */}
      <section className="relative py-24 overflow-hidden" aria-labelledby="materials-heading">
        <div className="absolute inset-0">
          <Image src={images.materialsDisplayBg} alt="Premium roofing materials display" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.03_260/0.88)] via-[oklch(0.12_0.03_260/0.82)] to-[oklch(0.10_0.03_260/0.92)]" />
        </div>
        <div className="relative container">
          <MaterialsGrid />
        </div>
      </section>

      {/* ==================== SERVICE AREAS ==================== */}
      <section className="bg-navy-dark py-24" aria-labelledby="service-areas-heading">
        <div className="container">
          <ServiceAreasGrid serviceAreas={serviceAreas} />
        </div>
      </section>
    </>
  );
}
