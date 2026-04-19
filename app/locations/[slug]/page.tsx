/*
 * /locations/[slug] — Alpine Peak Roofing
 * Server Component — no "use client" directive.
 * Pre-renders all 12 location pages at build time via generateStaticParams.
 */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
import { locations } from "@/lib/locations";

const BASE_URL = "https://alpinepeakroofing.com";

// ─── Static Params ───────────────────────────────────────────────────────────
export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};

  const title = `Roofing Services in ${location.name}, CO | Alpine Peak Roofing`;
  const description = `Expert roofing contractors in ${location.name}, Colorado (${location.elevation}). ${location.description.slice(0, 120)}…`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/locations/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/locations/${slug}`,
      type: "website",
      images: [
        {
          url: location.image,
          width: 1920,
          height: 1080,
          alt: `${location.name} roofing services`,
        },
      ],
    },
  };
}

// ─── Schema helpers ──────────────────────────────────────────────────────────
function LocationPageSchema({
  slug,
  name,
  description,
  image,
  elevation,
  region,
}: {
  slug: string;
  name: string;
  description: string;
  image: string;
  elevation: string;
  region: string;
}) {
  const pageUrl = `${BASE_URL}/locations/${slug}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${pageUrl}#business`,
    name: `Alpine Peak Roofing — ${name}`,
    description,
    image,
    url: pageUrl,
    telephone: "(970) 446-8995",
    email: "info@alpinepeakroofing.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${name}, CO`,
    },
    parentOrganization: {
      "@type": "RoofingContractor",
      "@id": `${BASE_URL}/#organization`,
      name: "Alpine Peak Roofing",
      url: BASE_URL,
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Elevation",
      value: elevation,
    },
    priceRange: "$$-$$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${name}, Colorado`,
    description: `${name} is a mountain community in the ${region} region of Colorado at ${elevation} elevation.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "CO",
      addressCountry: "US",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Elevation",
      value: elevation,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${BASE_URL}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${name}, CO`,
        item: pageUrl,
      },
    ],
  };

  const schemas = [localBusiness, placeSchema, breadcrumb];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);

  if (!location) notFound();

  return (
    <>
      <LocationPageSchema
        slug={location.slug}
        name={location.name}
        description={location.description}
        image={location.image}
        elevation={location.elevation}
        region={location.region}
      />

      <article>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <Image
              src={location.image}
              alt={`${location.name} roofing services — Alpine Peak Roofing`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/60 to-transparent" />
          </div>
          <div className="relative h-full flex flex-col justify-end pb-12 px-4">
            <div className="max-w-6xl mx-auto w-full">
              {/* Breadcrumb nav */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <Link href="/locations">
                  <span className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#d4b65c] transition-colors text-sm tracking-wider uppercase font-semibold">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Service Areas
                  </span>
                </Link>
              </nav>

              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-wider uppercase rounded">
                  Service Area
                </span>
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
                {location.name} Roofing Services
                <br />
                <span className="text-[#C9A84C]">{location.name}, Colorado</span>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                {location.description}
              </p>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="bg-[#0B1D3A] py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {location.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded p-6 text-center"
                >
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Environment Section */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
                {location.environment.title}
              </h2>
              <p className="text-lg text-white/70 max-w-3xl">
                {location.environment.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: Challenges */}
              <div className="md:col-span-2 space-y-8">
                {location.environment.challenges.map((challenge, i) => (
                  <div key={i} className="border-l-2 border-[#C9A84C] pl-6">
                    <h3 className="font-playfair text-2xl text-white mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-white/70 mb-4">{challenge.description}</p>
                    <ul className="space-y-2">
                      {challenge.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-white/60 text-sm"
                        >
                          <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right: Climate Sidebar */}
              <div className="bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border border-[#C9A84C]/30 rounded-lg p-6">
                <h3 className="font-playfair text-2xl text-[#C9A84C] mb-6">
                  {location.environment.sidebarTitle}
                </h3>
                <div className="space-y-6">
                  {location.environment.sidebarData.map((section, i) => (
                    <div key={i}>
                      <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                        {section.category}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li
                            key={j}
                            className="text-white/70 text-sm leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-[#C9A84C] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-12">
              Specialized Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {location.services.map((service, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 transition-all rounded-lg p-8"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="font-playfair text-2xl text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-white/60 text-sm"
                      >
                        <span className="text-[#C9A84C] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services in [City] — internal linking to /services/* */}
        <section className="py-16 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-8">
              Services in {location.name}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/services/residential"
                className="group bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 rounded-lg p-6 flex items-center gap-4 transition-all"
              >
                <div>
                  <h3 className="text-white font-semibold mb-1">Residential Roofing</h3>
                  <p className="text-white/50 text-sm">
                    Full replacement, repairs &amp; new construction for {location.name} homes.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C9A84C] ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services/commercial"
                className="group bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 rounded-lg p-6 flex items-center gap-4 transition-all"
              >
                <div>
                  <h3 className="text-white font-semibold mb-1">Commercial Roofing</h3>
                  <p className="text-white/50 text-sm">
                    TPO, PVC, EPDM &amp; metal systems for {location.name} businesses.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C9A84C] ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services/storm-damage"
                className="group bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 rounded-lg p-6 flex items-center gap-4 transition-all"
              >
                <div>
                  <h3 className="text-white font-semibold mb-1">Storm Damage</h3>
                  <p className="text-white/50 text-sm">
                    24/7 emergency response &amp; insurance assistance in {location.name}.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C9A84C] ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Materials We Install — internal linking to /materials/[slug] */}
        <section className="py-16 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-8">
              Materials We Install in {location.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { slug: "gaf-timberline", name: "Architectural Shingles", detail: "Class 4 impact rated, 130 mph wind" },
                { slug: "standing-seam", name: "Standing Seam Metal", detail: "Ideal for heavy snow loads" },
                { slug: "natural-slate", name: "Natural Slate", detail: "Century-long lifespan" },
                { slug: "cedar-shake", name: "Cedar Shake", detail: "Natural mountain aesthetic" },
              ].map((mat) => (
                <Link
                  key={mat.slug}
                  href={`/materials/${mat.slug}`}
                  className="group bg-white/5 border border-white/10 hover:border-[#C9A84C]/40 rounded-lg p-5 transition-all"
                >
                  <h3 className="text-white font-semibold mb-1 group-hover:text-[#C9A84C] transition-colors">
                    {mat.name}
                  </h3>
                  <p className="text-white/50 text-sm">{mat.detail}</p>
                  <span className="inline-flex items-center gap-1 text-[#C9A84C] text-xs mt-3 font-semibold">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Projects */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-12">
              Signature Projects
            </h2>
            <div className="space-y-8">
              {location.projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-[#C9A84C]/40 transition-all"
                >
                  <h3 className="font-playfair text-2xl text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.specs.map((spec, j) => (
                      <div key={j} className="text-sm">
                        <span className="text-[#C9A84C] font-semibold">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Operations */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-12">
              Seasonal Operations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {location.seasonal.map((season, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <h3 className="font-playfair text-xl text-[#C9A84C] mb-3">
                    {season.season}
                  </h3>
                  <h4 className="text-white font-semibold mb-4">{season.title}</h4>
                  <ul className="space-y-2">
                    {season.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-white/60 text-sm"
                      >
                        <span className="text-[#C9A84C] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section className="py-20 px-4 bg-[#0B1D3A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-12">
              Emergency Response
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {location.emergency.map((emergency, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg p-8"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {emergency.icon}
                  </div>
                  <h3 className="font-playfair text-2xl text-white mb-2">
                    {emergency.title}
                  </h3>
                  <p className="text-white/70 mb-4">{emergency.description}</p>
                  <ul className="space-y-2">
                    {emergency.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-white/60 text-sm"
                      >
                        <span className="text-[#C9A84C] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#0B1D3A] to-[#1a2f4a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              {location.cta.headline}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              {location.cta.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {location.cta.buttons.map((button, i) => (
                <Link key={i} href={button.link}>
                  <button className="px-8 py-4 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors inline-flex items-center gap-2">
                    {button.text}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
