/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * About page: Company story, team, values, certifications, milestones, community
 *
 * SERVER COMPONENT — crawlable by Google / AI / AEO
 * Client animations extracted to components/about/islands/
 */
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { images } from "@/lib/images";
import AboutHeroAnimations from "@/components/about/islands/AboutHeroAnimations";
import AboutAnimatedSections from "@/components/about/islands/AboutAnimatedSections";

export const metadata: Metadata = {
  title: "About Alpine Peak Roofing | Colorado Mountain Roofing Specialists Since 1989",
  description:
    "Learn about Alpine Peak Roofing's 35+ years of Colorado mountain roofing expertise. GAF Master Elite contractor, OSHA certified, serving Aspen, Vail, Telluride and communities across the Rockies.",
  alternates: {
    canonical: "https://alpinepeakroofing.com/about",
  },
  keywords:
    "Alpine Peak Roofing company, Colorado roofing contractors, mountain roofing specialists, GAF Master Elite Colorado, licensed roofers Colorado, roofing company history Denver",
  openGraph: {
    title: "About Alpine Peak Roofing | Colorado Mountain Roofing Specialists Since 1989",
    description:
      "Discover why Alpine Peak Roofing is Colorado's trusted choice for residential and commercial roofing. 35+ years of expert craftsmanship, mountain climate specialization, and unmatched customer service.",
    url: "https://alpinepeakroofing.com/about",
    siteName: "Alpine Peak Roofing",
    images: [
      {
        url: images.teamPhoto,
        width: 1920,
        height: 1080,
        alt: "Alpine Peak Roofing team — Colorado mountain roofing specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Alpine Peak Roofing | Colorado Mountain Roofing Specialists",
    description:
      "35+ years of Colorado mountain roofing expertise. GAF Master Elite, OSHA certified, serving Aspen, Vail, Telluride and the Rockies.",
    images: [images.teamPhoto],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://alpinepeakroofing.com/about#webpage",
  "url": "https://alpinepeakroofing.com/about",
  "name": "About Alpine Peak Roofing | Colorado Mountain Roofing Specialists Since 1989",
  "description":
    "Learn about Alpine Peak Roofing's 35+ years of Colorado mountain roofing expertise, industry certifications, and commitment to protecting Colorado properties.",
  "isPartOf": { "@id": "https://alpinepeakroofing.com/#organization" },
  "about": { "@id": "https://alpinepeakroofing.com/#organization" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": images.teamPhoto,
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
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://alpinepeakroofing.com/about",
      },
    ],
  },
  "mainEntity": {
    "@id": "https://alpinepeakroofing.com/#organization",
  },
};

export default function About() {
  return (
    <>
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        strategy="beforeInteractive"
      />

      {/* ==================== HERO ==================== */}
      <section className="relative py-32 lg:py-40 overflow-hidden" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0">
          <Image
            src={images.teamPhoto}
            alt="Alpine Peak Roofing team — Colorado's premier mountain roofing specialists"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            {/* Static fallback for crawlers */}
            <noscript>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                About Alpine Peak
              </span>
              <h1 id="about-hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Three Decades of Mountain-Grade Excellence
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                Founded in 1989, Alpine Peak Roofing has grown from a small family operation to Colorado&apos;s most trusted roofing company.
              </p>
            </noscript>
            <AboutHeroAnimations />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* All remaining sections are in a single client island to share animation variants */}
      <AboutAnimatedSections />
    </>
  );
}
