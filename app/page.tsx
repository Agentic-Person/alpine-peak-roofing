import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SiteImage, { HeroImage, PortfolioImagePair } from '@/components/SiteImage'
import {
  Shield,
  ArrowRight,
  Phone,
  Star,
  Home,
  Building,
  Zap,
  Award,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  ChevronRight,
  Hammer,
  Eye
} from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────────
   INLINE FONT IMPORT — loaded once at page level
   ────────────────────────────────────────────────────────────────────── */
const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Lato:wght@300;400;700;900&display=swap');
  `}</style>
)

/* ──────────────────────────────────────────────────────────────────────
   STAT CARD
   ────────────────────────────────────────────────────────────────────── */
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-xl"
      style={{ background: 'rgba(26,61,43,0.06)', border: '1px solid rgba(212,175,55,0.18)' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ background: 'var(--cedar)', color: 'var(--gold)' }}
      >
        <Icon size={20} />
      </div>
      <div
        className="text-3xl font-black mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest-deep)' }}
      >
        {value}
      </div>
      <div
        className="text-xs uppercase tracking-widest"
        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', letterSpacing: '0.12em' }}
      >
        {label}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   SERVICE FEATURE ROW (alternating left/right)
   ────────────────────────────────────────────────────────────────────── */
interface ServiceRowProps {
  title: string
  subtitle: string
  description: string
  features: string[]
  href: string
  imageId: string
  reverse?: boolean
  accentColor?: string
}

function ServiceRow({
  title, subtitle, description, features, href, imageId, reverse = false, accentColor = 'var(--cedar)'
}: ServiceRowProps) {
  const imageBlock = (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(26,61,43,0.18)]" style={{ aspectRatio: '4/3' }}>
      <SiteImage id={imageId} fill className="object-cover" />
      {/* Corner accent */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{ background: 'linear-gradient(to top, rgba(15,36,25,0.85) 0%, transparent 100%)' }}
      >
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
          style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.1em' }}
        >
          View Our Work <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center">
      <div
        className="text-xs uppercase tracking-widest font-bold mb-3"
        style={{ fontFamily: "'Lato', sans-serif", color: accentColor, letterSpacing: '0.16em' }}
      >
        {subtitle}
      </div>

      <h2
        className="text-4xl lg:text-5xl font-black mb-5 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
      >
        {title}
      </h2>

      <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />

      <p
        className="text-lg leading-relaxed mb-7"
        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', lineHeight: 1.8 }}
      >
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={16} style={{ color: 'var(--forest-mid)', marginTop: 3, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal-mid)', fontSize: '0.9rem' }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link href={href} className="service-row-cta self-start">
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  )

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${reverse ? 'lg:flex lg:flex-row-reverse' : ''}`}>
      {reverse ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
   ────────────────────────────────────────────────────────────────────── */
function TestimonialCard({ text, author, location, project }: {
  text: string; author: string; location: string; project?: string
}) {
  return (
    <div
      className="flex flex-col p-8 rounded-2xl"
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--sandstone-light)',
        boxShadow: '0 4px 24px rgba(107,58,31,0.08)',
      }}
    >
      <div className="flex gap-0.5 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
        ))}
      </div>
      <blockquote
        className="flex-1 text-base leading-relaxed mb-6 italic"
        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)' }}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      <div>
        <div
          className="font-bold text-sm"
          style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal)' }}
        >
          {author}
        </div>
        {project && (
          <div
            className="text-xs mt-0.5 font-semibold uppercase tracking-wide"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.08em' }}
          >
            {project}
          </div>
        )}
        <div
          className="flex items-center gap-1 text-xs mt-1"
          style={{ fontFamily: "'Lato', sans-serif", color: 'var(--text-muted)' }}
        >
          <MapPin size={10} />
          {location}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   HOMEPAGE
   ────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: 'var(--cream)' }}>
      <GoogleFonts />

      {/* ══════════════════════════════════════════════════════════════
          HERO — full-bleed with deep forest overlay
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <HeroImage id="hero_home" fill className="object-cover" />
        </div>

        {/* Deep gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,36,25,0.93) 0%, rgba(26,61,43,0.82) 50%, rgba(107,58,31,0.60) 100%)'
          }}
        />

        {/* Decorative gold diagonal stripe */}
        <div
          className="absolute right-0 top-0 bottom-0 hidden xl:block"
          style={{
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)',
            right: '12%',
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.35)',
                color: 'var(--gold)',
                letterSpacing: '0.14em',
                fontFamily: "'Lato', sans-serif",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--gold)' }}
              />
              Denver&apos;s Premier Roofing Specialists
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-none mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.05,
              }}
            >
              Pinnacle of{' '}
              <em
                className="not-italic"
                style={{ color: 'var(--gold)' }}
              >
                Protection.
              </em>
              <br />
              Peak of{' '}
              <em className="italic" style={{ color: 'var(--sandstone)' }}>
                Performance.
              </em>
            </h1>

            {/* Subheadline */}
            <p
              className="text-xl leading-relaxed mb-10 max-w-xl"
              style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.80)', fontWeight: 300 }}
            >
              Licensed, insured, and trusted by thousands of Colorado homeowners.
              Expert craftsmanship from consultation to final inspection.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/estimator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  background: 'var(--gold)',
                  color: 'var(--charcoal)',
                  letterSpacing: '0.1em',
                  boxShadow: '0 8px 24px rgba(212,175,55,0.45)',
                }}
              >
                Free Satellite Estimate <ArrowRight size={15} />
              </Link>
              <a
                href="tel:9704468995"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid rgba(250,247,242,0.45)',
                  letterSpacing: '0.1em',
                }}
              >
                <Phone size={15} /> (970) 446-8995
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST STRIP — 4 stats on cream
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream)' }} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="25+" label="Years of Experience" icon={Award} />
            <StatCard value="1,200+" label="Projects Completed" icon={Hammer} />
            <StatCard value="24/7" label="Emergency Service" icon={Clock} />
            <StatCard value="5★" label="Google Rating" icon={Star} />
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--sandstone), transparent)' }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — alternating left/right layout
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Section heading */}
          <div className="text-center mb-20">
            <p
              className="text-xs uppercase font-bold tracking-widest mb-3"
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.2em' }}
            >
              What We Do Best
            </p>
            <h2
              className="text-5xl font-black mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
            >
              Our Services
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ background: 'var(--gold)' }} />
          </div>

          <div className="space-y-28">
            {/* 1 — Residential */}
            <ServiceRow
              title="Residential Roofing"
              subtitle="Homes & Estates"
              description="Your home deserves the finest protection. We handle complete roof replacements, targeted repairs, and seasonal maintenance for homes of every style across the Denver metro — from craftsman bungalows to modern mountain retreats."
              features={[
                'Architectural & premium shingle installation',
                'Full structural assessment with drone imaging',
                'Storm damage & hail repair specialists',
                'Lifetime transferable warranty available',
                'Insurance claim guidance from day one',
              ]}
              href="/services/residential"
              imageId="residential_victorian_after"
              reverse={false}
              accentColor="var(--cedar)"
            />

            {/* 2 — Commercial */}
            <ServiceRow
              title="Commercial Roofing"
              subtitle="Business & Industry"
              description="Minimize downtime and protect your investment with our commercial roofing systems. TPO, EPDM, and modified bitumen installations for flat and low-slope roofs — completed efficiently to keep your business running."
              features={[
                'TPO, EPDM & modified bitumen systems',
                'Flat & low-slope specialty installation',
                'Scheduled maintenance programs',
                '20-year commercial warranty',
                'Minimal business disruption protocols',
              ]}
              href="/services/commercial"
              imageId="commercial_office_after"
              reverse={true}
              accentColor="var(--forest-mid)"
            />

            {/* 3 — Emergency */}
            <ServiceRow
              title="Emergency Repairs"
              subtitle="24/7 Storm Response"
              description="When disaster strikes, every minute counts. Our rapid-response team is on call around the clock to stop leaks, secure your structure, and begin repairs before additional damage occurs — protecting your home and your peace of mind."
              features={[
                '2-hour emergency response guarantee',
                'Temporary protective covering installed immediately',
                'Insurance adjuster coordination',
                'Full documentation for claims',
                'Complete repair follow-through',
              ]}
              href="/services/emergency"
              imageId="hero_home"
              reverse={false}
              accentColor="var(--gold-dark)"
            />
          </div>

          <div className="text-center mt-20">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'transparent',
                color: 'var(--forest-deep)',
                border: '2px solid var(--forest-deep)',
                letterSpacing: '0.1em',
              }}
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BEFORE / AFTER SHOWCASE — dark forest section
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--forest-deep)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase font-bold tracking-widest mb-3"
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              Our Portfolio
            </p>
            <h2
              className="text-5xl font-black mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
            >
              Before & After
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ background: 'var(--gold)' }} />
            <p
              className="mt-6 text-lg max-w-xl mx-auto"
              style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.65)', fontWeight: 300 }}
            >
              Real projects. Real results. See what a complete Alpine Peak transformation looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project card 1 */}
            {[
              {
                title: 'Victorian Home — Highlands Ranch',
                material: 'Premium Architectural Shingles',
                area: '2,800 sq ft',
                id: 'residential_victorian_after'
              },
              {
                title: 'Commercial Office — Denver CBD',
                material: 'TPO Membrane System',
                area: '8,400 sq ft',
                id: 'commercial_office_after'
              }
            ].map((project, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                {/* Before / After image pair */}
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <SiteImage id={project.id} fill className="object-cover" />
                  {/* Before/after label */}
                  <div
                    className="absolute inset-0 flex"
                    style={{ pointerEvents: 'none' }}
                  >
                    <div
                      className="flex-1 flex items-start p-4"
                      style={{ background: 'linear-gradient(to bottom right, rgba(107,58,31,0.7), transparent)' }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          background: 'rgba(107,58,31,0.85)',
                          color: '#fff',
                          letterSpacing: '0.12em'
                        }}
                      >
                        Before
                      </span>
                    </div>
                    <div
                      className="flex-1 flex items-start justify-end p-4"
                      style={{ background: 'linear-gradient(to bottom left, rgba(26,61,43,0.7), transparent)' }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          background: 'rgba(26,61,43,0.85)',
                          color: 'var(--gold)',
                          letterSpacing: '0.12em'
                        }}
                      >
                        After
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'Lato', sans-serif", color: 'var(--sandstone)', letterSpacing: '0.1em' }}
                    >
                      {project.material}
                    </span>
                    <span style={{ color: 'rgba(212,175,55,0.4)' }}>·</span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.5)' }}
                    >
                      {project.area}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'var(--gold)',
                color: 'var(--charcoal)',
                letterSpacing: '0.1em',
                boxShadow: '0 8px 24px rgba(212,175,55,0.35)',
              }}
            >
              View Full Portfolio <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AI ESTIMATOR TEASER — sandstone section
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--sandstone-light)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p
                className="text-xs uppercase font-bold tracking-widest mb-3"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--cedar)', letterSpacing: '0.2em' }}
              >
                Powered by AI
              </p>
              <h2
                className="text-5xl font-black mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
              >
                Your Roof Estimate <em className="italic" style={{ color: 'var(--forest-mid)' }}>in 30 Seconds</em>
              </h2>
              <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', lineHeight: 1.8 }}
              >
                Enter your address and our satellite imagery AI maps your exact roof dimensions, pitch,
                and complexity — giving you an accurate estimate before we even set foot on your property.
              </p>

              {/* Steps preview */}
              <div className="space-y-3 mb-10">
                {[
                  { n: '01', label: 'Enter your address' },
                  { n: '02', label: 'AI maps your roof via satellite' },
                  { n: '03', label: 'Select your materials' },
                  { n: '04', label: 'Receive itemized estimate' },
                  { n: '05', label: 'Schedule free site visit' },
                ].map(step => (
                  <div key={step.n} className="flex items-center gap-4">
                    <span
                      className="text-xs font-black"
                      style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold-dark)', minWidth: 24 }}
                    >
                      {step.n}
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'var(--border-primary)' }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal-mid)' }}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/estimator"
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  background: 'var(--forest-deep)',
                  color: 'var(--cream)',
                  letterSpacing: '0.1em',
                  boxShadow: '0 8px 24px rgba(26,61,43,0.3)',
                }}
              >
                Get My Free Estimate <ArrowRight size={14} />
              </Link>
            </div>

            {/* Estimator UI mockup card */}
            <div
              className="rounded-2xl p-8 shadow-[0_20px_60px_rgba(26,61,43,0.2)]"
              style={{
                background: 'var(--forest-deep)',
                border: '2px solid rgba(212,175,55,0.3)',
              }}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: n === 2 ? 'var(--gold)' : n < 2 ? 'var(--forest-mid)' : 'rgba(250,247,242,0.1)',
                        color: n === 2 ? 'var(--charcoal)' : n < 2 ? 'var(--gold)' : 'rgba(250,247,242,0.4)',
                        fontFamily: "'Lato', sans-serif",
                        border: n === 2 ? 'none' : '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      {n < 2 ? '✓' : n}
                    </div>
                    {n < 5 && (
                      <div
                        className="h-0.5"
                        style={{
                          width: '100%',
                          background: n < 2 ? 'var(--gold)' : 'rgba(212,175,55,0.15)',
                          position: 'absolute',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Mock content */}
              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '2px solid rgba(212,175,55,0.4)' }}
                >
                  <Eye size={22} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
                >
                  Property Analysis Complete
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.6)', fontSize: '0.85rem' }}>
                  Satellite imagery analyzed — 92% confidence
                </p>
              </div>

              {/* Mock stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Area', value: '2,450 sq ft' },
                  { label: 'Roof Pitch', value: '6/12' },
                  { label: 'Ridge Lines', value: '120 ft' },
                  { label: 'Complexity', value: 'Moderate' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.5)', letterSpacing: '0.08em' }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', fontSize: '1rem' }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS — cream section
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase font-bold tracking-widest mb-3"
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.2em' }}
            >
              Customer Stories
            </p>
            <h2
              className="text-5xl font-black mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
            >
              What Colorado Homeowners Say
            </h2>
            <div className="w-16 h-0.5 mx-auto" style={{ background: 'var(--gold)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              text="Alpine Peak did an incredible job on our roof replacement. Professional, on time, and the quality is outstanding. Best contractor experience I've ever had."
              author="Sarah Johnson"
              location="Denver, CO"
              project="Full Roof Replacement"
            />
            <TestimonialCard
              text="Fast response for our emergency leak repair. They had our roof fixed within hours and prevented major water damage to our home. Truly life savers."
              author="Mike Rodriguez"
              location="Lakewood, CO"
              project="Emergency Storm Repair"
            />
            <TestimonialCard
              text="Great communication throughout the entire process. Fair pricing, excellent workmanship, and they cleaned up perfectly when finished. Couldn't be happier."
              author="Jennifer Chen"
              location="Aurora, CO"
              project="Commercial TPO System"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PHILOSOPHY — cedar / dark section with left-right split
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cedar)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p
                className="text-xs uppercase font-bold tracking-widest mb-3"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.2em' }}
              >
                Our Philosophy
              </p>
              <h2
                className="text-5xl font-black mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                Built on Trust,<br />
                <em className="italic" style={{ color: 'var(--gold)' }}>Sealed with Craft</em>
              </h2>
              <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--gold)' }} />
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.80)', lineHeight: 1.85 }}
              >
                At Alpine Peak Roofing, we believe your roof is more than protection — it&apos;s peace of mind.
                Every shingle, every seam, every seal is a commitment to the families we serve.
              </p>
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.65)', lineHeight: 1.85 }}
              >
                25 years of Colorado roofing has taught us one thing: the pinnacle of this craft is the moment
                a homeowner walks inside knowing their family is protected for decades to come.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    background: 'var(--gold)',
                    color: 'var(--charcoal)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Our Story <ArrowRight size={14} />
                </Link>
                <Link
                  href="/process"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    background: 'transparent',
                    color: 'rgba(250,247,242,0.85)',
                    border: '2px solid rgba(250,247,242,0.3)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Our Process <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: value pillars */}
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Integrity First', desc: 'Transparent quotes, no hidden fees, no pressure — ever.' },
                { icon: Award, title: 'Unmatched Quality', desc: 'Premium materials and meticulous craftsmanship on every project.' },
                { icon: Users, title: 'Community Rooted', desc: 'Colorado-based, family-owned, and proud of the communities we serve.' },
                { icon: Clock, title: 'Always Available', desc: 'Emergency response 24/7, 365 days a year — because roofs don\'t wait.' },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 p-5 rounded-xl"
                  style={{ background: 'rgba(250,247,242,0.07)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.15)' }}
                  >
                    <pillar.icon size={18} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <div
                      className="font-bold mb-1"
                      style={{ fontFamily: "'Lato', sans-serif", color: '#FFFFFF', fontSize: '0.95rem' }}
                    >
                      {pillar.title}
                    </div>
                    <div
                      style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.60)', fontSize: '0.875rem', lineHeight: 1.6 }}
                    >
                      {pillar.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICE AREAS — cream section
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream-dark)' }} className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p
            className="text-xs uppercase font-bold tracking-widest mb-3"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.2em' }}
          >
            We Come to You
          </p>
          <h2
            className="text-4xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
          >
            Serving All of Colorado
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-8" style={{ background: 'var(--gold)' }} />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              'Denver', 'Aurora', 'Lakewood', 'Highlands Ranch', 'Littleton',
              'Englewood', 'Vail', 'Aspen', 'Steamboat Springs', 'Telluride',
              'Crested Butte', 'Winter Park'
            ].map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  background: '#FFFFFF',
                  border: '1px solid var(--sandstone-light)',
                  color: 'var(--charcoal-mid)',
                  boxShadow: '0 2px 8px rgba(107,58,31,0.06)',
                }}
              >
                <MapPin size={11} style={{ color: 'var(--cedar)' }} />
                {city}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
            style={{
              fontFamily: "'Lato', sans-serif",
              background: 'var(--forest-deep)',
              color: 'var(--cream)',
              letterSpacing: '0.1em',
              boxShadow: '0 8px 24px rgba(26,61,43,0.25)',
            }}
          >
            Schedule Free Inspection <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: 'var(--charcoal)', borderTop: '3px solid var(--gold)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2
            className="text-4xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
          >
            Ready to Protect What Matters Most?
          </h2>
          <p
            className="text-lg mb-10"
            style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.65)', fontWeight: 300 }}
          >
            Start with a free satellite estimate — no commitment, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'var(--gold)',
                color: 'var(--charcoal)',
                letterSpacing: '0.1em',
                boxShadow: '0 8px 24px rgba(212,175,55,0.4)',
              }}
            >
              Free Satellite Estimate <ArrowRight size={14} />
            </Link>
            <a
              href="tel:9704468995"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid rgba(250,247,242,0.3)',
                letterSpacing: '0.1em',
              }}
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
