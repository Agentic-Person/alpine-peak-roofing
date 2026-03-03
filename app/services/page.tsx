import React from 'react'
import Link from 'next/link'
import {
  Home,
  Building,
  Zap,
  ArrowRight,
  Check,
  Phone,
  Wrench,
  Shield,
  Clock,
  Award,
  Hammer,
  Settings,
  AlertTriangle,
  MapPin,
} from 'lucide-react'
import SiteImage from '@/components/SiteImage'

const mainServices = [
  {
    href:    '/services/residential',
    icon:    Home,
    title:   'Residential Roofing',
    imageId: 'service_residential',
    tagline: 'Complete home roofing solutions for homeowners across Denver',
    desc:    'Protect your most valuable investment with our comprehensive residential roofing services. From minor repairs to complete roof replacements, we handle every aspect with meticulous care.',
    items: [
      { label: 'Roof Replacement',    sub: 'Complete tear-off and new installation' },
      { label: 'Roof Repair',         sub: 'Leak repairs, shingle replacement, damage fixes' },
      { label: 'Shingle Installation',sub: 'Asphalt, architectural, and premium shingles' },
      { label: 'Metal Roofing',       sub: 'Standing seam, metal shingles, steel panels' },
    ],
    ctaLabel: 'View Residential Services',
    accent:   'var(--forest-mid)',
  },
  {
    href:    '/services/commercial',
    icon:    Building,
    title:   'Commercial Roofing',
    imageId: 'service_commercial',
    tagline: 'Professional roofing for businesses and property managers',
    desc:    'Keep your business protected with our commercial roofing expertise. We specialize in flat roof systems, maintenance programs, and emergency repairs for commercial properties of every scale.',
    items: [
      { label: 'TPO & EPDM Systems',  sub: 'Single-ply membrane roofing systems' },
      { label: 'Built-Up Roofing',    sub: 'Multi-layer flat roof systems' },
      { label: 'Maintenance Programs',sub: 'Preventative care and inspection services' },
      { label: 'Roof Coatings',       sub: 'Protective coatings and restoration' },
    ],
    ctaLabel: 'View Commercial Services',
    accent:   'var(--cedar)',
  },
  {
    href:    '/services/emergency',
    icon:    Zap,
    title:   'Emergency Repairs',
    imageId: 'service_emergency',
    tagline: '24/7 emergency roofing — fast response when it matters most',
    desc:    "Don't let roof damage worsen! Our emergency repair team is available around the clock to handle storm damage, active leaks, and other urgent roofing situations — protecting your home right now.",
    items: [
      { label: '24/7 Availability',  sub: 'Emergency response any time, day or night', icon: Clock },
      { label: 'Storm Damage',       sub: 'Hail, wind, and weather damage repair',     icon: AlertTriangle },
      { label: 'Leak Repairs',       sub: 'Fast leak detection and emergency patching', icon: Wrench },
      { label: 'Insurance Help',     sub: 'Insurance claim assistance and documentation', icon: Shield },
    ],
    ctaLabel: 'Emergency Service',
    accent:   '#B91C1C',
    isEmergency: true,
  },
]

const additionalServices = [
  { icon: Settings,      label: 'Roof Inspections',   desc: 'Professional assessments and detailed condition reports' },
  { icon: Hammer,        label: 'Gutter Services',     desc: 'Installation, repair, and maintenance of gutter systems' },
  { icon: Shield,        label: 'Warranties',          desc: 'Comprehensive material and workmanship warranties' },
  { icon: Award,         label: 'Insurance Claims',    desc: 'Expert assistance navigating the insurance claim process' },
]

const serviceAreas = [
  'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada', 'Westminster',
  'Centennial', 'Boulder', 'Broomfield', 'Commerce City', 'Northglenn',
  'Wheat Ridge', 'Englewood', 'Littleton', 'Greenwood Village', 'Parker',
]

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── Hero ── */}
      <section className="relative" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0">
          <SiteImage id="hero_services" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(26,61,43,0.88) 0%, rgba(15,36,25,0.80) 100%)' }}
          />
        </div>
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: '50vh', paddingTop: '5rem', paddingBottom: '5rem' }}
        >
          <hr className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: 'var(--cream)',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Our Roofing Services
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: 'var(--sandstone)',
              fontSize: '1.125rem',
              letterSpacing: '0.06em',
            }}
          >
            Comprehensive roofing solutions for every need across the Denver metro area
          </p>
        </div>
      </section>

      {/* ── Main Services ── */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--cream)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--cedar)',
                marginBottom: '0.75rem',
              }}
            >
              What We Do
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              From single-family homes to large commercial properties — built to last
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.map((svc) => (
              <div
                key={svc.href}
                className="card-craftsman overflow-hidden flex flex-col"
                style={svc.isEmergency ? { borderTop: `3px solid #B91C1C` } : {}}
              >
                {/* Service image */}
                <div className="relative flex-shrink-0" style={{ aspectRatio: '16/9' }}>
                  <SiteImage id={svc.imageId} fill className="object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(15,36,25,0.7) 0%, transparent 55%)` }}
                  />
                  {/* Icon badge */}
                  <div
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded"
                    style={{ background: svc.accent, color: 'var(--cream)' }}
                  >
                    <svc.icon size={14} />
                    <span
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {svc.title}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-7 flex flex-col flex-1">
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9375rem',
                      color: 'var(--stone)',
                      lineHeight: 1.7,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {svc.desc}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {svc.items.map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <Check
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: 'var(--forest-mid)' }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "'Lato', sans-serif",
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              color: 'var(--cedar)',
                            }}
                          >
                            {item.label}
                          </div>
                          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8125rem', color: 'var(--stone)' }}>
                            {item.sub}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2">
                    {svc.isEmergency ? (
                      <a
                        href="tel:9704468995"
                        className="btn-primary w-full justify-center"
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          background: '#B91C1C',
                          borderColor: '#B91C1C',
                        }}
                      >
                        <Phone size={14} />
                        (970) 446-8995
                      </a>
                    ) : (
                      <Link
                        href={svc.href}
                        className="btn-forest w-full justify-center"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {svc.ctaLabel}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                    <Link
                      href="/estimator"
                      className="btn-outline-cream w-full justify-center"
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        color: 'var(--cedar)',
                        borderColor: 'var(--border-primary)',
                      }}
                    >
                      Get Free Estimate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional Services ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--cream-dark)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-14">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--cedar)',
                marginBottom: '0.75rem',
              }}
            >
              Additional Services
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              Complete roofing solutions to protect and enhance your property
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center">
                <div
                  className="flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ width: 64, height: 64, background: 'var(--forest-deep)' }}
                >
                  <Icon size={26} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--cedar)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {label}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.875rem', color: 'var(--stone)', lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--cream)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-12">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--cedar)',
                marginBottom: '0.75rem',
              }}
            >
              Service Area
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              Proudly serving the Denver metro area and surrounding communities
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((city) => (
              <div
                key={city}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full"
                style={{
                  background: 'var(--cream-dark)',
                  border: '1px solid var(--border-primary)',
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--cedar)',
                }}
              >
                <MapPin size={11} style={{ color: 'var(--gold)' }} />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 lg:py-24"
        style={{ background: 'var(--charcoal)', borderTop: '3px solid var(--gold)' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '1rem',
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--sandstone)',
              maxWidth: 520,
              margin: '0 auto 2.5rem',
            }}
          >
            Get your free instant estimate today and experience the Alpine Peak difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:9704468995"
              className="btn-gold"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Phone size={15} />
              (970) 446-8995
            </a>
            <Link
              href="/estimator"
              className="btn-outline-cream"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Get Free Estimate
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
