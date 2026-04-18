/**
 * Commercial service detail page — dynamic route.
 * SERVER COMPONENT with generateStaticParams + generateMetadata.
 * Interactive sections (animations, GA4, FAQ accordion) delegated to ServiceDetailClient island.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { commercialServices, getServiceBySlug, getRelatedServices } from '@/lib/servicesData';
import { getTestimonialsByService } from '@/lib/testimonials';
import { locations } from '@/lib/locations';
import { ChevronLeft } from 'lucide-react';
import {
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
  ReviewSchema,
} from '@/components/SchemaMarkup';
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

export async function generateStaticParams() {
  return commercialServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.category !== 'commercial') return {};
  return {
    title: `${service.title} | Alpine Peak Roofing Colorado`,
    description: service.metaDescription,
    alternates: {
      canonical: `https://alpinepeakroofing.com/services/commercial/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Alpine Peak Roofing`,
      description: service.metaDescription,
      images: [{ url: service.heroImage, width: 1200, height: 630, alt: service.title }],
    },
  };
}

export default async function CommercialServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service || service.category !== 'commercial') {
    notFound();
  }

  const serviceTestimonials = getTestimonialsByService(slug);
  const relatedServices = getRelatedServices(service.relatedServices);
  const IconComponent = iconMap[service.icon] ?? Layers;

  return (
    <div className="bg-[#0a1628]">
      {/* Schema — server-rendered, always visible to crawlers */}
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        image={service.heroImage}
        url={`/services/commercial/${service.slug}`}
        category="Commercial Roofing"
      />
      <FAQSchema faqs={service.faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Commercial', url: '/services/commercial' },
          { name: service.title, url: `/services/commercial/${service.slug}` },
        ]}
      />
      {serviceTestimonials.length > 0 && (
        <ReviewSchema
          serviceName={service.title}
          serviceUrl={`/services/commercial/${service.slug}`}
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
          <Link
            href="/services/commercial"
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#d4b65c] text-sm font-medium mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Commercial Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Commercial
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
        category="commercial"
      />
    </div>
  );
}
