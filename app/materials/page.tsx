/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Materials index page: listing of all roofing materials
 * Server Component — AEO/SEO optimized with ItemList JSON-LD schema
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { images } from "@/lib/images";
import { materials } from "@/lib/materials";
import MaterialsHeroAnimated from "@/components/materials/islands/MaterialsHeroAnimated";
import MaterialsGridAnimated from "@/components/materials/islands/MaterialsGridAnimated";

export const metadata: Metadata = {
  title: "Premium Roofing Materials | Alpine Peak Roofing — Colorado",
  description:
    "Explore Alpine Peak Roofing's full line of premium materials — architectural shingles, standing seam metal, natural slate, and cedar shake. Full specs, pricing, pros & cons, and Colorado-specific guidance.",
  alternates: {
    canonical: "https://alpinepeakroofing.com/materials",
  },
  openGraph: {
    title: "Premium Roofing Materials | Alpine Peak Roofing",
    description:
      "Compare roofing materials for Colorado homes — GAF Timberline shingles, standing seam metal, natural slate, and cedar shake. Expert recommendations for Colorado's climate.",
    url: "https://alpinepeakroofing.com/materials",
    type: "website",
  },
};

// ItemList JSON-LD — tells answer engines what materials are available
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Alpine Peak Roofing — Premium Roofing Materials",
  description:
    "Comprehensive list of roofing materials installed by Alpine Peak Roofing in Colorado, with pricing, warranties, and specifications.",
  url: "https://alpinepeakroofing.com/materials",
  numberOfItems: materials.length,
  itemListElement: materials.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    url: `https://alpinepeakroofing.com/materials/${m.slug}`,
    description: m.description,
  })),
};

export default function MaterialsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section
        aria-label="Materials hero"
        className="relative py-32 lg:py-40 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={images.materialsDisplayBg}
            alt="Roofing materials display"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <MaterialsHeroAnimated />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Materials Grid */}
      <section
        aria-labelledby="materials-grid-heading"
        className="bg-navy-dark py-24"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <h2
              id="materials-grid-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Our Materials
            </h2>
            <p
              className="text-lg text-white/60"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Each material below includes full specs, pricing, pros &amp; cons, warranty info, and Colorado-specific considerations.
            </p>
          </div>

          {/* Semantic list — crawlable even without JS */}
          <ul className="sr-only" aria-label="Available roofing materials">
            {materials.map((m) => (
              <li key={m.slug}>
                <a href={`/materials/${m.slug}`}>{m.name}</a> — {m.description}
              </li>
            ))}
          </ul>

          {/* Animated visual grid */}
          <MaterialsGridAnimated materials={materials} />
        </div>
      </section>

      {/* CTA */}
      <section
        aria-label="Material consultation CTA"
        className="bg-navy py-16 border-t border-white/10"
      >
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="gold-line mx-auto mb-4" />
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Not Sure Which Material Is Right for You?
            </h2>
            <p
              className="text-lg text-white/60 mb-8"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Our roofing experts will help you choose the best material for your home, budget, and Colorado climate conditions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              GET A FREE CONSULTATION <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
