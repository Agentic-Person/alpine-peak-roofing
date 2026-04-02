import { EstimatorWizard } from '@/agents/roof-estimator-agent/components/EstimatorWizard';
import EstimatorCarousel from '@/components/estimator/EstimatorCarousel';
import { AddressAutoAnalyzer } from '@/components/estimator/AddressAutoAnalyzer';
import { Suspense } from 'react';

const CALENDLY_URL = 'https://calendly.com/jimmy-agenticpersonnel/30min'

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
          className="text-lg max-w-2xl mx-auto mb-8"
          style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(255,255,255,0.70)', fontWeight: 300 }}
        >
          Accurate satellite measurements + AI analysis. Your detailed estimate in under 60 seconds — completely free.
        </p>

        {/* ── Analyze My Roof CTA ── */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--amber-gold)',
            color: 'var(--ink)',
            fontFamily: "'Lato', sans-serif",
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 20px rgba(229,168,0,0.4)',
          }}
        >
          Analyze My Roof — Book Free Consult
        </a>
      </div>

      {/* ── How It Works — Auto-playing Carousel ── */}
      <EstimatorCarousel />

      {/* ── Auto-analyze if address is in URL ── */}
      <Suspense fallback={null}>
        <AddressAutoAnalyzer />
      </Suspense>

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
                Colorado&apos;s most trusted roofing professionals. Licensed, bonded, and insured since 1989.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider" style={{ color: 'var(--amber-gold)', fontFamily: "'Lato', sans-serif" }}>
                Contact
              </h4>
              <div className="space-y-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Lato', sans-serif" }}>
                <div>(970) 456-1176</div>
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
