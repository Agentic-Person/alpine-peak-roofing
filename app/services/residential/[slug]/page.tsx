/**
 * Residential service detail page — dynamic route.
 * SERVER COMPONENT with generateStaticParams + generateMetadata.
 * Interactive sections (animations, GA4, FAQ accordion) delegated to ServiceDetailClient island.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { residentialServices, getServiceBySlug, getRelatedServices } from '@/lib/servicesData';
import { getTestimonialsByService } from '@/lib/testimonials';
import { locations } from '@/lib/locations';
import {
  ServiceSchema,
  FAQSchema,
  ReviewSchema,
} from '@/components/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/schemas/BreadcrumbSchema';
import ServiceOfferSchema, {
  type ServiceOfferItem,
} from '@/components/seo/schemas/ServiceOfferSchema';
import { materials } from '@/lib/materials';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ServiceDetailClient } from '@/components/services/islands/ServiceDetailClient';
import {
  Layers, Wrench, Shield, Droplets, Wind, Sun, Building2,
  Thermometer, Leaf, AlertTriangle, Snowflake, PaintBucket,
} from 'lucide-react';
import type { ElementType } from 'react';

const iconMap: Record<string, ElementType> = {
  Layers, Wrench, Shield, Droplets, Wind, Sun, Building2,
  Thermometer, Leaf, AlertTriangle, Snowflake, PaintBucket,
};

/**
 * Per-slug pricing config for the Service/Offer schema. `minPrice`/`maxPrice`
 * are USD values in the given `unitText`. `materialSlugs` pulls live installed
 * pricing from `lib/materials.ts` so schema stays in sync with published copy.
 */
interface ResidentialPricingConfig {
  serviceType: string;
  unitText?: string;
  priceRange?: string;
  minPrice?: number;
  maxPrice?: number;
  materialSlugs?: string[];
}

const RESIDENTIAL_PRICING: Record<string, ResidentialPricingConfig> = {
  'complete-roof-replacement': {
    serviceType: 'Residential Roof Replacement',
    unitText: 'sqft',
    priceRange: '$$$',
    materialSlugs: ['gaf-timberline', 'standing-seam', 'natural-slate', 'cedar-shake'],
  },
  'roof-repairs': {
    serviceType: 'Residential Roof Repair',
    unitText: 'project',
    priceRange: '$$',
    minPrice: 450,
    maxPrice: 6500,
  },
  'new-construction': {
    serviceType: 'New Construction Roofing',
    unitText: 'sqft',
    priceRange: '$$$',
    minPrice: 6,
    maxPrice: 22,
  },
  'gutter-systems': {
    serviceType: 'Gutter Installation & Protection',
    unitText: 'linear foot',
    priceRange: '$$',
    minPrice: 12,
    maxPrice: 45,
  },
  'ventilation': {
    serviceType: 'Attic & Roof Ventilation',
    unitText: 'project',
    priceRange: '$$',
    minPrice: 850,
    maxPrice: 3800,
  },
  'skylights-solar': {
    serviceType: 'Skylight & Solar Integration',
    unitText: 'unit',
    priceRange: '$$$',
    minPrice: 1500,
    maxPrice: 8500,
  },
};

function buildResidentialOffers(slug: string): {
  offers?: ServiceOfferItem[];
  minPrice?: number;
  maxPrice?: number;
  config?: ResidentialPricingConfig;
} {
  const config = RESIDENTIAL_PRICING[slug];
  if (!config) return {};

  if (config.materialSlugs && config.materialSlugs.length > 0) {
    const offers: ServiceOfferItem[] = config.materialSlugs
      .map((materialSlug) => materials.find((m) => m.slug === materialSlug))
      .filter((m): m is (typeof materials)[number] => Boolean(m))
      .map((m) => ({
        name: `${m.shortName} Installed`,
        description: `${m.name} — fully installed pricing including tear-off, underlayment, flashing, and cleanup.`,
        minPrice: m.installedPrice.low,
        maxPrice: m.installedPrice.high,
        unitText: 'sqft',
      }));
    if (offers.length > 0) {
      return { offers, config };
    }
  }

  return {
    minPrice: config.minPrice,
    maxPrice: config.maxPrice,
    config,
  };
}

export async function generateStaticParams() {
  return residentialServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.category !== 'residential') return {};
  return {
    title: `${service.title} | Alpine Peak Roofing Colorado`,
    description: service.metaDescription,
    alternates: {
      canonical: `https://alpinepeakroofing.com/services/residential/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Alpine Peak Roofing`,
      description: service.metaDescription,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.title }],
    },
  };
}

export default async function ResidentialServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service || service.category !== 'residential') {
    notFound();
  }

  const serviceTestimonials = getTestimonialsByService(slug);
  const relatedServices = getRelatedServices(service.relatedServices);
  const IconComponent = iconMap[service.icon] ?? Layers;
  const canonicalUrl = `https://alpinepeakroofing.com/services/residential/${service.slug}`;
  const pricing = buildResidentialOffers(slug);

  return (
    <div className="bg-[#0a1628]">
      {/* Schema — server-rendered, always visible to crawlers */}
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        image={service.heroImage}
        url={`/services/residential/${service.slug}`}
        category="Residential Roofing"
      />
      <FAQSchema faqs={service.faqs} />
      <BreadcrumbSchema
        id="residential-service-breadcrumb-schema"
        items={[
          { name: 'Home', url: 'https://alpinepeakroofing.com' },
          { name: 'Services', url: 'https://alpinepeakroofing.com/services' },
          { name: 'Residential', url: 'https://alpinepeakroofing.com/services/residential' },
          { name: service.title, url: `https://alpinepeakroofing.com/services/residential/${service.slug}` },
        ]}
      />
      {pricing.config && (
        <ServiceOfferSchema
          id={`residential-service-offer-${service.slug}`}
          name={service.title}
          description={service.metaDescription}
          serviceType={pricing.config.serviceType}
          url={canonicalUrl}
          priceRange={pricing.config.priceRange}
          minPrice={pricing.minPrice}
          maxPrice={pricing.maxPrice}
          unitText={pricing.config.unitText}
          offers={pricing.offers}
        />
      )}
      {serviceTestimonials.length > 0 && (
        <ReviewSchema
          serviceName={service.title}
          serviceUrl={`/services/residential/${service.slug}`}
          reviews={serviceTestimonials.map((t) => ({
            name: t.name,
            location: t.location,
            rating: t.rating,
            date: t.date,
            text: t.text,
          }))}
        />
      )}

      {/* Hero — server-rendered static content */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/75 to-[#0a1628]/30" />
        </div>
        <div className="container relative z-10 py-24">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
              { name: 'Residential', href: '/services/residential' },
              { name: service.title },
            ]}
          />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Residential
            </span>
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
            {service.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      {/* All interactive / animated sections delegated to client island */}
      <ServiceDetailClient
        service={service}
        serviceTestimonials={serviceTestimonials}
        relatedServices={relatedServices}
        locations={locations}
        category="residential"
      />
    </div>
  );
}
