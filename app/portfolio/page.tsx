import React from 'react'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Star,
  Phone,
  ArrowRight,
  Clock,
} from 'lucide-react'
import SiteImage from '@/components/SiteImage'

const projects = [
  {
    id: 1,
    title: 'Victorian Home Roof Replacement',
    location: 'Denver, CO',
    category: 'Residential',
    material: 'Architectural Shingles',
    duration: '3 days',
    season: 'Fall 2024',
    description:
      'Complete tear-off and replacement of a historic Victorian home with premium architectural shingles, preserving original character.',
    testimonial:
      'Alpine Peak did an incredible job restoring our 1890s Victorian home. The attention to detail was outstanding.',
    customerName: 'Sarah & Michael Johnson',
    beforeId: 'residential_victorian_before',
    afterId: 'residential_victorian_after',
    features: ['Historic Preservation', 'Custom Color Match', 'Premium Materials'],
  },
  {
    id: 2,
    title: 'Office Complex TPO Installation',
    location: 'Lakewood, CO',
    category: 'Commercial',
    material: 'TPO Membrane',
    duration: '1 week',
    season: 'Summer 2024',
    description:
      'New TPO membrane installation on a 15,000 sq ft office building with energy-efficient white membrane and 20-year warranty.',
    testimonial:
      'Professional installation with minimal disruption to our business operations. The energy savings are already noticeable.',
    customerName: 'Denver Business Park',
    beforeId: 'commercial_office_before',
    afterId: 'commercial_office_after',
    features: ['Energy Efficient', 'Business Continuity', 'Warranty Included'],
  },
  {
    id: 3,
    title: 'Hail Storm Damage Restoration',
    location: 'Aurora, CO',
    category: 'Emergency',
    material: 'Impact-Resistant Shingles',
    duration: '2 days',
    season: 'Spring 2024',
    description:
      'Emergency hail damage repair and complete roof replacement with Class 4 impact-resistant materials for lasting protection.',
    testimonial:
      'They responded within hours and had our roof completely restored in just two days. Insurance process was seamless.',
    customerName: 'Mark & Lisa Rodriguez',
    beforeId: 'residential_ranch_before',
    afterId: 'residential_ranch_after',
    features: ['Emergency Response', 'Insurance Coordination', 'Impact Resistant'],
  },
  {
    id: 4,
    title: 'Standing Seam Metal Roof',
    location: 'Boulder, CO',
    category: 'Residential',
    material: 'Standing Seam Steel',
    duration: '4 days',
    season: 'Fall 2024',
    description:
      'Premium standing seam metal roof installation on a contemporary mountain home — built for Colorado\'s demanding climate.',
    testimonial:
      'The metal roof looks stunning and we love knowing it will last for decades. The team was professional and clean.',
    customerName: 'Jennifer & David Chen',
    beforeId: 'residential_modern_before',
    afterId: 'residential_modern_after',
    features: ['50+ Year Lifespan', 'Mountain Weather Resistant', 'Modern Design'],
  },
  {
    id: 5,
    title: 'Warehouse Built-Up Roofing',
    location: 'Commerce City, CO',
    category: 'Commercial',
    material: 'Modified Bitumen',
    duration: '5 days',
    season: 'Summer 2024',
    description:
      'Complete built-up roofing system replacement on a 25,000 sq ft industrial warehouse with puncture-resistant membrane.',
    testimonial:
      'Excellent work on our warehouse roof. They worked efficiently and the quality is top-notch.',
    customerName: 'Rocky Mountain Industrial',
    beforeId: 'commercial_warehouse_before',
    afterId: 'commercial_warehouse_after',
    features: ['Industrial Grade', 'Puncture Resistant', 'Long-Term Durability'],
  },
  {
    id: 6,
    title: 'Historic Church Restoration',
    location: 'Westminster, CO',
    category: 'Specialty',
    material: 'Slate Tiles',
    duration: '2 weeks',
    season: 'Spring 2024',
    description:
      'Careful restoration of a 1920s church roof using authentic slate materials and traditional hand-laid techniques.',
    testimonial:
      'Their expertise in historic restoration is unmatched. The church looks exactly as it did 100 years ago.',
    customerName: 'Westminster Community Church',
    beforeId: 'residential_colonial_before',
    afterId: 'residential_colonial_after',
    features: ['Historic Preservation', 'Authentic Materials', 'Craftsmanship Excellence'],
  },
]

const serviceAreas = [
  { city: 'Denver', count: 125 },
  { city: 'Aurora', count: 89 },
  { city: 'Lakewood', count: 67 },
  { city: 'Thornton', count: 54 },
  { city: 'Arvada', count: 43 },
  { city: 'Westminster', count: 38 },
  { city: 'Centennial', count: 32 },
  { city: 'Boulder', count: 29 },
]

const categoryColors: Record<string, string> = {
  Residential: 'var(--forest-mid)',
  Commercial:  'var(--cedar)',
  Emergency:   '#B91C1C',
  Specialty:   'var(--gold-dark)',
}

export default function PortfolioPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── Hero ── */}
      <section className="relative" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0">
          <SiteImage id="hero_portfolio" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,64,128,0.88) 0%, rgba(0,45,90,0.80) 100%)' }}
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
            Our Portfolio
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: 'var(--sandstone)',
              fontSize: '1.125rem',
              letterSpacing: '0.06em',
            }}
          >
            Showcasing quality craftsmanship across the Denver metro area
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div style={{ background: 'var(--forest-deep)', borderBottom: '3px solid var(--gold)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { stat: '1,200+', label: 'Projects Completed' },
              { stat: '98%', label: 'Customer Satisfaction' },
              { stat: '25+', label: 'Years Experience' },
              { stat: '24/7', label: 'Emergency Service' },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="text-center py-8 px-4"
                style={{ borderRight: '1px solid rgba(229,168,0,0.15)' }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '0.375rem',
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.65)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Projects Grid ── */}
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
              Featured Projects
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              Real before &amp; after transformations across the Front Range
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card-craftsman overflow-hidden group">

                {/* Before / After image split */}
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  {/* Before — left half */}
                  <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: '50%' }}>
                    <SiteImage id={project.beforeId} fill className="object-cover" />
                    <div
                      className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest"
                      style={{ background: 'rgba(0,0,0,0.65)', color: '#FCA5A5', fontFamily: "'Lato', sans-serif" }}
                    >
                      Before
                    </div>
                  </div>

                  {/* Gold divider line */}
                  <div
                    className="absolute top-0 h-full z-10"
                    style={{ left: '50%', width: 2, background: 'var(--gold)', transform: 'translateX(-50%)' }}
                  />

                  {/* After — right half */}
                  <div className="absolute right-0 top-0 h-full overflow-hidden" style={{ width: '50%' }}>
                    <SiteImage id={project.afterId} fill className="object-cover" />
                    <div
                      className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest"
                      style={{ background: 'rgba(0,0,0,0.65)', color: '#86EFAC', fontFamily: "'Lato', sans-serif" }}
                    >
                      After
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide"
                      style={{
                        background: categoryColors[project.category] ?? 'var(--forest-deep)',
                        color: 'var(--cream)',
                        fontFamily: "'Lato', sans-serif",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.1875rem',
                      fontWeight: 700,
                      color: 'var(--cedar)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 mb-3" style={{ color: 'var(--stone)', fontSize: '0.8rem' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {project.season}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {project.duration}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      color: 'var(--stone)',
                      lineHeight: 1.65,
                      marginBottom: '1rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background: 'var(--cream-dark)',
                          color: 'var(--cedar)',
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 600,
                          border: '1px solid var(--sandstone-light)',
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <blockquote
                    className="mb-1"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.8125rem',
                      color: 'var(--stone)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      borderLeft: '3px solid var(--gold)',
                      paddingLeft: '0.75rem',
                    }}
                  >
                    &ldquo;{project.testimonial}&rdquo;
                  </blockquote>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                      paddingLeft: '0.75rem',
                    }}
                  >
                    — {project.customerName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--cream-dark)' }}>
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
              Serving the Denver Metro Area
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              Quality roofing projects across Colorado&apos;s Front Range
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map(({ city, count }) => (
              <div
                key={city}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-primary)',
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                <MapPin size={12} style={{ color: 'var(--gold)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--cedar)' }}>{city}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{count} projects</span>
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
            Ready to Add Your Project to Our Portfolio?
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--sandstone)',
              maxWidth: 540,
              margin: '0 auto 2.5rem',
            }}
          >
            Join hundreds of satisfied Colorado homeowners who trust Alpine Peak Roofing with their most
            important investment.
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
