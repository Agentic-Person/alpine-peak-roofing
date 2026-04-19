/**
 * Storm damage services page.
 * SERVER COMPONENT — static content server-rendered for AEO/SEO crawlers.
 * Animated sections delegated to StormDamageAnimatedSections island.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';
import { BreadcrumbSchema, ServiceSchema } from '@/components/SchemaMarkup';
import { StormDamageAnimatedSections } from '@/components/services/islands/StormDamageAnimations';

export const metadata: Metadata = {
  title: 'Storm Damage Roof Repair | Alpine Peak Roofing Colorado',
  description:
    "Colorado storm damage roofing specialists — 24/7 emergency response for hail, wind, and snow damage. Insurance claim experts. Call (970) 446-8995 for immediate help.",
  keywords:
    'storm damage roof repair Colorado, hail damage roofing, wind damage roof repair, emergency roof repair Denver, roof insurance claim',
  alternates: { canonical: 'https://alpinepeakroofing.com/services/storm-damage' },
  openGraph: {
    title: 'Storm Damage Roof Repair | Alpine Peak Roofing',
    description:
      '24/7 emergency response for storm damage. Hail, wind, and snow repair specialists with full insurance claim support across Colorado.',
  },
};

export default function StormDamage() {
  return (
    <main className="bg-[#0a1628]">
      {/* Schema */}
      <ServiceSchema
        name="Storm Damage Roof Repair"
        description="24/7 emergency storm damage roofing services in Colorado. Expert hail, wind, and snow damage repair with full insurance claim support."
        image="/images/services/service-storm-damage-hero.png"
        url="/services/storm-damage"
        category="Emergency Roofing"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Storm Damage', url: '/services/storm-damage' },
        ]}
      />

      {/* Hero Section — static server content */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/service-storm-damage-hero.png"
            alt="Storm damage roof repair — 24/7 emergency response across Colorado"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/80 to-[#0a1628]/40" />
        </div>
        <div className="container relative z-10 py-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#d4b65c] text-sm font-medium mb-6 transition-colors"
          >
            <span className="text-[#c9a84c]">&#8592;</span>
            Back to Services
          </Link>
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">24/7 Emergency Response Available</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 mb-6">
            Storm Damage?
            <br />
            We&apos;re Here to Help.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
            Colorado&apos;s mountain weather can strike without warning. If your roof has been
            damaged by hail, wind, snow, or ice, Alpine Peak Roofing provides immediate emergency
            response and expert permanent repairs — backed by full insurance claim support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:9704468995"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center gap-3 justify-center"
            >
              <Phone className="w-5 h-5" />
              Emergency: (970) 446-8995
            </a>
            <Link href="/contact">
              <button className="bg-[#c9a84c] text-[#0a1628] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#d4b65c] transition-colors inline-flex items-center gap-2">
                Schedule Inspection
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Animated sections: emergency steps, damage types, insurance process, CTA */}
      <StormDamageAnimatedSections />
    </main>
  );
}
