/**
 * Commercial roofing services listing page.
 * SERVER COMPONENT — static content is crawler-visible.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { commercialServices } from '@/lib/servicesData';
import { ChevronLeft, Phone, ArrowRight } from 'lucide-react';
import { BreadcrumbSchema, ServiceSchema } from '@/components/SchemaMarkup';
import ServiceOfferSchema, {
  type ServiceOfferItem,
} from '@/components/seo/schemas/ServiceOfferSchema';
import { AnimatedServiceGrid } from '@/components/services/islands/AnimatedServiceGrid';
import { AnimatedFeatureList } from '@/components/services/islands/AnimatedFeatureList';
import type { FeatureItem } from '@/components/services/islands/AnimatedFeatureList';
import type { ServiceGridItem } from '@/components/services/islands/AnimatedServiceGrid';

export const metadata: Metadata = {
  title: 'Commercial Roofing Services | Alpine Peak Roofing Colorado',
  description:
    'Advanced commercial roofing solutions for Colorado properties. TPO, EPDM, modified bitumen, standing seam metal, coatings, and maintenance programs. NDL warranties available.',
  keywords:
    'commercial roofing Colorado, flat roof Denver, TPO EPDM roofing, commercial roof maintenance, mountain commercial roofing',
  alternates: { canonical: 'https://alpinepeakroofing.com/services/commercial' },
  openGraph: {
    title: 'Commercial Roofing Services | Alpine Peak Roofing',
    description:
      'From boutique mountain resorts to retail centers — advanced commercial roofing solutions engineered for Colorado.',
  },
};

const expertiseItems: FeatureItem[] = [
  {
    iconName: 'Building2',
    title: 'All Building Types',
    desc: "Resorts, retail, restaurants, offices, municipal buildings, and multi-family properties throughout Colorado's mountains.",
  },
  {
    iconName: 'Wrench',
    title: 'All Roof Systems',
    desc: "TPO, EPDM, PVC, metal, modified bitumen, built-up, and coating systems. We're certified in every major commercial system.",
  },
  {
    iconName: 'FileCheck',
    title: 'Code Compliance',
    desc: 'Full compliance with Colorado building codes, energy codes, and local mountain community regulations.',
  },
  {
    iconName: 'ShieldCheck',
    title: 'NDL Warranties',
    desc: 'As manufacturer-certified installers, we offer No Dollar Limit warranties on qualifying commercial installations.',
  },
];

const serviceGridItems: ServiceGridItem[] = commercialServices.map((s) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  image: s.image,
  heroImage: s.heroImage,
  category: s.category,
}));

/**
 * Commercial offers are intentionally priced by tier (`priceRange`) rather
 * than hard USD values. Commercial roof projects vary by building footprint,
 * existing-system condition, and roof-deck access, so only tier hints make it
 * into the Service/Offer schema — never a fabricated number.
 */
const commercialOffers: ServiceOfferItem[] = [
  {
    name: 'Flat Roof Systems',
    description: 'TPO, EPDM, PVC, and modified bitumen single-ply systems with NDL warranties available.',
    unitText: 'project',
  },
  {
    name: 'Commercial Metal Roofing',
    description: 'Standing-seam and structural metal systems engineered for mountain snow and wind loads.',
    unitText: 'project',
  },
  {
    name: 'Preventive Maintenance Programs',
    description: 'Biannual inspections, cleaning, and priority repairs under fixed-fee service agreements.',
    unitText: 'year',
  },
  {
    name: 'Roof Coating Systems',
    description: 'Silicone, acrylic, and polyurethane coatings that restore and extend existing commercial roofs.',
    unitText: 'project',
  },
  {
    name: 'Snow & Ice Management',
    description: 'Heat-trace systems, snow retention, and winter rapid-response clearing for flat commercial roofs.',
    unitText: 'project',
  },
  {
    name: 'Emergency Commercial Repairs',
    description: '24/7 emergency leak response, temporary dry-in, and permanent repair for commercial properties.',
    unitText: 'response',
  },
];

export default function CommercialServices() {
  return (
    <main className="bg-[#0a1628]">
      {/* Schema */}
      <ServiceSchema
        name="Commercial Roofing Services"
        description="Advanced commercial roofing solutions for Colorado mountain properties — TPO, EPDM, modified bitumen, standing seam metal, coatings, and preventive maintenance programs."
        image={commercialServices[1]?.heroImage ?? commercialServices[0]?.heroImage ?? ''}
        url="/services/commercial"
        category="Commercial Roofing"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Commercial', url: '/services/commercial' },
        ]}
      />
      <ServiceOfferSchema
        id="commercial-services-offer"
        name="Commercial Roofing Services"
        description="Commercial roofing solutions for Colorado mountain resorts, retail centers, and municipal properties — TPO, EPDM, modified bitumen, metal, coatings, maintenance, and emergency response."
        serviceType="Commercial Roofing Contractor"
        url="https://alpinepeakroofing.com/services/commercial"
        priceRange="$$$ – $$$$$"
        offers={commercialOffers}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={commercialServices[1]?.heroImage ?? commercialServices[0]?.heroImage ?? ''}
            alt="Commercial roofing services by Alpine Peak Roofing"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#d4b65c] text-sm font-medium mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
            Commercial
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 mb-6">
            Commercial Roofing
            <br />
            Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            From boutique mountain resorts to retail centers and municipal buildings, Alpine Peak
            Roofing delivers commercial roofing solutions engineered for Colorado&apos;s demanding
            high-altitude environment. We protect your business investment with premium systems and
            proactive maintenance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Our Services
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3 mb-4">
              Complete Commercial Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive commercial roofing services from installation to maintenance, emergency
              response to seasonal snow management.
            </p>
          </div>
          <AnimatedServiceGrid services={serviceGridItems} basePath="/services/commercial" />
        </div>
      </section>

      {/* Commercial Expertise */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Our Expertise
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">
              Built for Commercial Scale
            </h2>
          </div>
          <AnimatedFeatureList items={expertiseItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8953f] rounded-2xl p-12 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#0a1628] font-bold mb-4">
              Protect Your Commercial Investment
            </h2>
            <p className="text-[#0a1628]/80 max-w-2xl mx-auto mb-8">
              Contact us for a comprehensive commercial roof assessment. We&apos;ll evaluate your
              current system and recommend solutions that maximize performance and minimize long-term
              costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[#0a1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/90 transition-colors inline-flex items-center gap-2">
                  Request Commercial Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a
                href="tel:9704468995"
                className="border-2 border-[#0a1628] text-[#0a1628] px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/10 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <Phone className="w-4 h-4" />
                Call (970) 446-8995
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
