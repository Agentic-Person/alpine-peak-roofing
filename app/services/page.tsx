/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Services page: Residential, Commercial, Emergency, Materials
 * SERVER COMPONENT — static content is crawler-visible for SEO/AEO.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/lib/images';
import { ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { ServicesOverviewSchema, BreadcrumbSchema } from '@/components/SchemaMarkup';
import { AnimatedServiceCards } from '@/components/services/islands/AnimatedServiceCards';
import { AnimatedMaterialsGrid } from '@/components/services/islands/AnimatedMaterialsGrid';
import { ServicesHeroText } from '@/components/services/islands/ServicesHeroAnimations';
import type { ServiceCardData } from '@/components/services/islands/AnimatedServiceCards';

export const metadata: Metadata = {
  title: 'Roofing Services | Alpine Peak Roofing — Denver, Colorado',
  description:
    'Complete residential and commercial roofing services across Denver metro and Colorado mountain communities. Expert installation, repairs, and emergency response backed by 35+ years of mountain roofing expertise.',
  keywords:
    'roofing services Denver, roof installation Colorado, commercial roofing, residential roofing, emergency roof repair, mountain roofing specialists',
  alternates: { canonical: 'https://alpinepeakroofing.com/services' },
  openGraph: {
    title: 'Expert Roofing Services | Alpine Peak Roofing',
    description:
      'From residential roof replacement to commercial systems and emergency repairs — comprehensive roofing solutions backed by mountain expertise.',
  },
};

const residentialServiceCards: ServiceCardData[] = [
  { iconName: 'Layers', title: 'Complete Roof Replacement', desc: 'Full tear-off and replacement with premium materials. We handle everything from permits to final inspection.' },
  { iconName: 'Wrench', title: 'Roof Repairs', desc: 'Expert repair services for leaks, missing shingles, flashing issues, and storm damage.' },
  { iconName: 'Shield', title: 'New Construction', desc: 'Custom roofing solutions for new home builds, working closely with builders and architects.' },
  { iconName: 'Droplets', title: 'Gutter Systems', desc: 'Seamless gutter installation, guards, and drainage solutions to protect your foundation.' },
  { iconName: 'Wind', title: 'Ventilation', desc: 'Proper attic ventilation systems to extend roof life and improve energy efficiency.' },
  { iconName: 'Sun', title: 'Skylights & Solar', desc: 'Skylight installation and solar panel integration with proper waterproofing.' },
];

const commercialServiceCards: ServiceCardData[] = [
  { iconName: 'Layers', title: 'TPO & PVC Systems', desc: 'Single-ply membrane roofing for flat and low-slope commercial buildings.' },
  { iconName: 'Shield', title: 'EPDM Rubber Roofing', desc: 'Durable rubber membrane systems for warehouses, offices, and retail spaces.' },
  { iconName: 'Building2', title: 'Modified Bitumen', desc: 'Multi-layer asphalt systems for superior waterproofing and durability.' },
  { iconName: 'Thermometer', title: 'Standing Seam Metal', desc: 'Premium metal roofing for commercial properties requiring longevity and aesthetics.' },
  { iconName: 'Wrench', title: 'Roof Coatings', desc: 'Reflective coatings to extend roof life, improve energy efficiency, and reduce costs.' },
  { iconName: 'Leaf', title: 'Green Roofing', desc: 'Sustainable roofing solutions including cool roofs and vegetative systems.' },
];

export default function Services() {
  return (
    <main>
      <ServicesOverviewSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]} />

      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.heroResidential}
            alt="Alpine Peak Roofing services — residential and commercial roofing in Denver, CO"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <ServicesHeroText />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Residential */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column — static, server-rendered */}
            <div>
              <div className="gold-line mb-4" />
              <span
                className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                Residential
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Residential Roofing Services
              </h2>
              <p
                className="text-white/60 mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                Your home is your most valuable asset. We protect it with premium materials, expert
                installation, and comprehensive warranties. Whether you need a complete replacement or
                a simple repair, our residential team delivers exceptional results every time.
              </p>
              <div className="relative overflow-hidden mb-6">
                <Image
                  src={images.residentialWork}
                  alt="Residential roofing work by Alpine Peak Roofing"
                  width={800}
                  height={450}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                GET A FREE ESTIMATE <ChevronRight size={16} />
              </Link>
            </div>
            {/* Right column — animated cards */}
            <AnimatedServiceCards services={residentialServiceCards} />
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="bg-navy py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column — animated cards */}
            <div className="order-2 lg:order-1">
              <AnimatedServiceCards services={commercialServiceCards} />
            </div>
            {/* Right column — static */}
            <div className="order-1 lg:order-2">
              <div className="gold-line mb-4" />
              <span
                className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                Commercial
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Commercial Roofing Services
              </h2>
              <p
                className="text-white/60 mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                Protect your business with commercial roofing solutions engineered for performance. We
                work with property managers, business owners, and general contractors to deliver
                projects on time and on budget.
              </p>
              <div className="relative overflow-hidden mb-6">
                <Image
                  src={images.commercialWork}
                  alt="Commercial roofing work by Alpine Peak Roofing"
                  width={800}
                  height={450}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full aspect-video object-cover"
                />
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                REQUEST COMMERCIAL QUOTE <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.emergencyRepair}
            alt="24/7 emergency roof repair service"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.95)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.6)]" />
        </div>
        <div className="relative container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-gold" />
              <span
                className="text-xs uppercase tracking-[0.2em] text-gold font-semibold"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                24/7 Emergency Service
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Storm Damage?{' '}
              <span className="text-gold">We&apos;re Here.</span>
            </h2>
            <p
              className="text-lg text-white/60 mb-8"
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              Colorado&apos;s weather doesn&apos;t wait, and neither do we. Our emergency response
              team is available 24/7 to address storm damage, leaks, and urgent repairs. We&apos;ll
              have a crew on-site within hours, not days.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rapid response within 2-4 hours',
                'Emergency tarping and weatherproofing',
                'Complete storm damage assessment',
                'Insurance claim assistance',
                'Temporary and permanent repair solutions',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-white/70"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="tel:9704561176"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all"
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              CALL EMERGENCY LINE: (970) 456-1176
            </a>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.materialsDisplayBg}
            alt="Premium roofing materials display"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.95)]" />
        </div>
        <div className="relative container">
          {/* Static header — crawler-visible */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3"
              style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
            >
              Our Primary Product Line
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Premium Roofing Materials
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              We only install materials that meet our rigorous standards for durability, beauty, and
              performance in Colorado&apos;s demanding climate. Click any material to explore full
              details, pricing, and specifications.
            </p>
          </div>
          {/* Animated grid */}
          <AnimatedMaterialsGrid />
        </div>
      </section>
    </main>
  );
}
