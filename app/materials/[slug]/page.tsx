/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Individual material detail page — Server Component
 * AEO/SEO optimized: Product JSON-LD, BreadcrumbList, generateStaticParams
 */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  DollarSign,
  Layers,
  Clock,
  Shield,
  Wind,
  Flame,
} from "lucide-react";
import { getMaterialBySlug, materials } from "@/lib/materials";
import MaterialDetailClient from "@/components/materials/islands/MaterialDetailClient";
import BreadcrumbSchema from "@/components/seo/schemas/BreadcrumbSchema";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// ── Static params — pre-renders every material page at build time ─────────────

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};

  return {
    title: `${material.name} | Alpine Peak Roofing Colorado`,
    description: `${material.description} ${material.warranty} warranty. Installed price: $${material.installedPrice.low.toFixed(2)}–$${material.installedPrice.high.toFixed(2)}/sqft. Learn pros, cons, and Colorado-specific guidance.`,
    alternates: {
      canonical: `https://alpinepeakroofing.com/materials/${slug}`,
    },
    openGraph: {
      title: `${material.name} | Alpine Peak Roofing`,
      description: material.tagline,
      url: `https://alpinepeakroofing.com/materials/${slug}`,
      type: "website",
      images: [{ url: material.image, alt: material.name }],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  const otherMaterials = materials.filter((m) => m.slug !== material.slug);

  // Product JSON-LD schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.name,
    description: material.longDescription,
    image: material.image,
    category: "Roofing Material",
    material: material.shortName,
    brand: {
      "@type": "Brand",
      name: material.manufacturer,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: material.installedPrice.low.toFixed(2),
      highPrice: material.installedPrice.high.toFixed(2),
      offerCount: 1,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: material.installedPrice.avg.toFixed(2),
        priceCurrency: "USD",
        unitText: "per square foot installed",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Warranty",
        value: material.warranty,
      },
      {
        "@type": "PropertyValue",
        name: "Lifespan",
        value: material.lifespan,
      },
      {
        "@type": "PropertyValue",
        name: "Wind Rating",
        value: material.windRating,
      },
      {
        "@type": "PropertyValue",
        name: "Fire Rating",
        value: material.fireRating,
      },
      {
        "@type": "PropertyValue",
        name: "Impact Rating",
        value: material.impactRating,
      },
    ],
  };

  return (
    <article className="bg-navy-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <BreadcrumbSchema
        id="material-breadcrumb-schema"
        items={[
          { name: "Home", url: "https://alpinepeakroofing.com" },
          { name: "Materials", url: "https://alpinepeakroofing.com/materials" },
          { name: material.name, url: `https://alpinepeakroofing.com/materials/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section
        aria-label={`${material.shortName} hero`}
        className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={material.image}
            alt={material.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />
        </div>
        <div className="container relative z-10 pb-12 pt-32">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Materials", href: "/materials" },
              { name: material.name },
            ]}
          />
          <div className="flex items-center gap-3 mb-4">
            <span
              className="bg-gold/20 text-gold px-3 py-1 text-xs font-semibold tracking-wider"
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              {material.warranty} WARRANTY
            </span>
            <span
              className="bg-white/10 text-alpine-white/80 px-3 py-1 text-xs font-semibold tracking-wider"
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              {material.lifespan} LIFESPAN
            </span>
          </div>
          {/* Single h1 with material name */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-alpine-white mb-4 max-w-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {material.name}
          </h1>
          <p
            className="text-lg md:text-xl text-alpine-white/70 max-w-2xl"
            style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
          >
            {material.tagline}
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section
        aria-label="Material specifications"
        className="bg-navy border-y border-white/10"
      >
        <div className="container py-6">
          <dl className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              {
                icon: DollarSign,
                label: "Material Only",
                value: `$${material.materialPrice.low.toFixed(2)}–$${material.materialPrice.high.toFixed(2)}/sqft`,
              },
              {
                icon: Layers,
                label: "Installed",
                value: `$${material.installedPrice.low.toFixed(2)}–$${material.installedPrice.high.toFixed(2)}/sqft`,
              },
              { icon: Clock, label: "Lifespan", value: material.lifespan },
              { icon: Shield, label: "Warranty", value: material.warranty },
              {
                icon: Wind,
                label: "Wind Rating",
                value: material.windRating.split("(")[0].trim(),
              },
              {
                icon: Flame,
                label: "Fire Rating",
                value: material.fireRating.split("(")[0].trim(),
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon size={18} className="text-gold shrink-0" />
                <div>
                  <dt
                    className="text-[10px] uppercase tracking-wider text-alpine-white/40"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {stat.label}
                  </dt>
                  <dd
                    className="text-sm font-semibold text-alpine-white"
                    style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                  >
                    {stat.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Client island: animated content sections + interactive price calculator */}
      <MaterialDetailClient material={material} otherMaterials={otherMaterials} />
    </article>
  );
}

