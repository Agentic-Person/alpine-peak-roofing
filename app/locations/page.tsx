/*
 * /locations — Alpine Peak Roofing
 * Server Component — no "use client" directive.
 * Interactive animations are delegated to client islands.
 */
import { Metadata } from "next";
import { locations } from "@/lib/locations";
import { LocationsGrid } from "@/components/locations/islands/LocationsGrid";
import { LocationsWhySection } from "@/components/locations/islands/LocationsWhySection";
import { LocationsCTA } from "@/components/locations/islands/LocationsCTA";

const BASE_URL = "https://alpinepeakroofing.com";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Roofing Service Areas in Colorado | Alpine Peak Roofing",
  description:
    "Alpine Peak Roofing serves 12 Colorado mountain communities — Aspen, Vail, Telluride, Breckenridge and more. Expert high-altitude roofing from the Front Range to the Western Slope.",
  alternates: {
    canonical: `${BASE_URL}/locations`,
  },
  openGraph: {
    title: "Roofing Service Areas in Colorado | Alpine Peak Roofing",
    description:
      "From the Front Range to the Western Slope, Alpine Peak Roofing serves communities across the Colorado Rocky Mountains with specialized high-altitude expertise.",
    url: `${BASE_URL}/locations`,
    type: "website",
  },
};

// ─── schema.org ItemList ─────────────────────────────────────────────────────
function LocationsListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Alpine Peak Roofing — Colorado Service Areas",
    description:
      "All service areas served by Alpine Peak Roofing across Colorado's mountain communities.",
    url: `${BASE_URL}/locations`,
    numberOfItems: locations.length,
    itemListElement: locations.map((loc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${loc.name}, Colorado`,
      url: `${BASE_URL}/locations/${loc.slug}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function LocationsPage() {
  // Derive plain card objects — no client-side logic needed here
  const cards = locations.map((loc) => ({
    slug: loc.slug,
    name: loc.name,
    tagline: loc.tagline,
    elevation: loc.elevation,
    description: loc.description,
    image: loc.image,
  }));

  return (
    <>
      <LocationsListSchema />

      <div>
        {/* Hero Section — pure HTML, no framer-motion needed at SSR */}
        <section className="relative min-h-[50vh] flex items-center py-20 px-4 bg-gradient-to-br from-[#0B1D3A] via-[#1a2f4a] to-[#0B1D3A]">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-semibold block mb-4"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                Service Areas
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
                Serving All of Colorado
              </h1>
              <p
                className="text-lg text-white/70 max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                From the Front Range to the Western Slope, Alpine Peak Roofing serves
                communities across the Colorado Rocky Mountains. Each location presents
                unique roofing challenges that demand specialized expertise and proven
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Locations Grid — client island (framer-motion animations) */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <LocationsGrid cards={cards} />
          </div>
        </section>

        {/* Why Choose Alpine Peak — client island (staggered animations) */}
        <LocationsWhySection />

        {/* CTA Section — client island (animated entry) */}
        <LocationsCTA />
      </div>
    </>
  );
}
