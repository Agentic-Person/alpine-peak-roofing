'use client';

import { EstimatorWizard } from '@/agents/roof-estimator-agent/components/EstimatorWizard';
import SiteImage from '@/components/SiteImage';
import { Suspense } from 'react';

const HOW_IT_WORKS = [
  {
    step: 1,
    label: 'Enter Address',
    desc: 'Type your address and confirm your property location on the map.',
    imageId: 'estimator_address',
  },
  {
    step: 2,
    label: 'Satellite View',
    desc: 'We pull high-resolution satellite imagery of your exact roof.',
    imageId: 'estimator_satellite',
  },
  {
    step: 3,
    label: 'AI Analysis',
    desc: 'Our AI measures your roof, detects damage, and calculates materials.',
    imageId: 'estimator_analysis',
  },
  {
    step: 4,
    label: 'Choose Materials',
    desc: 'Select from shingles, metal, or premium options with live pricing.',
    imageId: 'estimator_materials',
  },
  {
    step: 5,
    label: 'Get Your Estimate',
    desc: 'Receive a detailed, itemized estimate instantly — no waiting, no pressure.',
    imageId: 'estimator_delivered',
  },
]

export default function EstimatorPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background-primary)' }}>

      {/* ── Page Header ── */}
      <div
        className="py-16 text-center"
        style={{ background: 'var(--sky-captain)' }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-3 font-bold"
          style={{ fontFamily: "'Lato', sans-serif", color: 'var(--amber-gold)', letterSpacing: '0.2em' }}
        >
          Powered by Satellite & AI
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
        >
          Instant Roof Estimate
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(255,255,255,0.70)', fontWeight: 300 }}
        >
          Accurate satellite measurements + AI analysis. Your detailed estimate in under 60 seconds — completely free.
        </p>
      </div>

      {/* ── How It Works — 5 visual steps ── */}
      <section className="py-14" style={{ background: 'var(--background-secondary)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <p
            className="text-center text-xs uppercase font-bold tracking-widest mb-10"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--azure)', letterSpacing: '0.2em' }}
          >
            How It Works
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center gap-3">
                {/* Image card */}
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{ aspectRatio: '4/3', boxShadow: '0 4px 20px rgba(0,64,128,0.14)' }}
                >
                  <SiteImage id={item.imageId} fill className="object-cover" />
                  {/* Step badge */}
                  <div
                    className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: 'var(--amber-gold)', color: 'var(--ink)', fontFamily: "'Lato', sans-serif" }}
                  >
                    {item.step}
                  </div>
                </div>
                <p
                  className="font-bold text-sm"
                  style={{ fontFamily: "'Lato', sans-serif", color: 'var(--ink)', letterSpacing: '0.02em' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif", color: 'var(--text-muted)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wizard ── */}
      <main className="container mx-auto px-4 py-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2"
                style={{ borderColor: 'var(--azure)' }}
              />
            </div>
          }
        >
          <EstimatorWizard />
        </Suspense>
      </main>

      {/* ── Footer ── */}
      <footer className="py-12 mt-8" style={{ background: 'var(--sky-deep)' }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                Alpine Peak Roofing
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: '0.875rem', fontFamily: "'Lato', sans-serif" }}>
                Denver metro&apos;s most trusted roofing professionals. Licensed, bonded, and insured since 1999.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: 'var(--amber-gold)', fontFamily: "'Lato', sans-serif" }}>
                Contact
              </h4>
              <div className="space-y-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Lato', sans-serif" }}>
                <div>(970) 446-8995</div>
                <div>info@alpinepeakroofing.com</div>
                <div>Denver Metro, CO</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: 'var(--amber-gold)', fontFamily: "'Lato', sans-serif" }}>
                Our Technology
              </h4>
              <div className="space-y-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Lato', sans-serif" }}>
                <div>Satellite imagery analysis</div>
                <div>AI-powered measurements</div>
                <div>Instant cost calculations</div>
                <div>Professional itemized estimates</div>
              </div>
            </div>
          </div>
          <div
            className="mt-8 pt-8 text-center text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.40)', fontFamily: "'Lato', sans-serif" }}
          >
            &copy; 2026 Alpine Peak Roofing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
