/**
 * Residential roofing services listing page.
 * SERVER COMPONENT — static content is crawler-visible.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { residentialServices } from '@/lib/servicesData';
import { ChevronLeft, Phone, ArrowRight } from 'lucide-react';
import { BreadcrumbSchema, ServiceSchema } from '@/components/SchemaMarkup';
import { AnimatedServiceGrid } from '@/components/services/islands/AnimatedServiceGrid';
import { AnimatedFeatureList } from '@/components/services/islands/AnimatedFeatureList';
import type { FeatureItem } from '@/components/services/islands/AnimatedFeatureList';
import type { ServiceGridItem } from '@/components/services/islands/AnimatedServiceGrid';

export const metadata: Metadata = {
  title: 'Residential Roofing Services | Alpine Peak Roofing Colorado',
  description:
    'Premium residential roofing services across Colorado mountain communities. Complete roof replacement, repairs, new construction, gutters, ventilation, and skylights. Free estimates.',
  keywords:
    'residential roofing Colorado, roof replacement Denver, roof repair mountain communities, home roofing contractor',
  alternates: { canonical: 'https://alpinepeakroofing.com/services/residential' },
  openGraph: {
    title: 'Residential Roofing Services | Alpine Peak Roofing',
    description:
      'Complete residential roofing solutions for Colorado mountain homes — replacement, repair, new construction, and more.',
  },
};

const whyItems: FeatureItem[] = [
  {
    iconName: 'Shield',
    title: 'Licensed & Insured',
    desc: 'Fully licensed, bonded, and insured for residential roofing in all Colorado mountain communities.',
  },
  {
    iconName: 'Award',
    title: 'Certified Installers',
    desc: 'Factory-certified by leading manufacturers including GAF, CertainTeed, and major metal roofing brands.',
  },
  {
    iconName: 'Clock',
    title: '24/7 Emergency',
    desc: "Round-the-clock emergency response for active leaks and storm damage. We're always here when you need us.",
  },
  {
    iconName: 'Phone',
    title: 'Free Estimates',
    desc: 'Comprehensive roof inspections and detailed estimates at no cost. Transparent pricing with no hidden fees.',
  },
];

const serviceGridItems: ServiceGridItem[] = residentialServices.map((s) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  image: s.image,
  heroImage: s.heroImage,
  category: s.category,
}));

export default function ResidentialServices() {
  return (
    <main className="bg-[#0a1628]">
      {/* Schema */}
      <ServiceSchema
        name="Residential Roofing Services"
        description="Premium residential roofing services across Colorado mountain communities including complete replacements, repairs, new construction, gutters, and ventilation."
        image={residentialServices[0]?.heroImage ?? ''}
        url="/services/residential"
        category="Residential Roofing"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Residential', url: '/services/residential' },
        ]}
      />

      {/* Hero Section — static for SSR, animation island below */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={residentialServices[0]?.heroImage ?? ''}
            alt="Residential roofing services by Alpine Peak Roofing"
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
            Residential
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 mb-6">
            Residential Roofing
            <br />
            Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Your home is your most valuable asset. We protect it with premium materials, expert
            installation, and comprehensive warranties. Whether you need a complete replacement or a
            simple repair, our residential team delivers exceptional results every time.
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
              Complete Residential Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From emergency repairs to full roof replacements, we offer every residential roofing
              service your Colorado mountain home needs.
            </p>
          </div>
          <AnimatedServiceGrid services={serviceGridItems} basePath="/services/residential" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Why Alpine Peak
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">
              The Mountain Roofing Experts
            </h2>
          </div>
          <AnimatedFeatureList items={whyItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8953f] rounded-2xl p-12 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#0a1628] font-bold mb-4">
              Ready to Protect Your Home?
            </h2>
            <p className="text-[#0a1628]/80 max-w-2xl mx-auto mb-8">
              Contact us today for a free inspection and estimate. Our residential roofing experts
              will assess your needs and recommend the best solution for your mountain home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[#0a1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/90 transition-colors inline-flex items-center gap-2">
                  Schedule Free Assessment
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
