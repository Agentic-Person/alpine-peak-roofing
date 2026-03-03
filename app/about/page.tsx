import React from 'react'
import Link from 'next/link'
import {
  Shield,
  Target,
  Eye,
  Users,
  Award,
  Heart,
  Lightbulb,
  HardHat,
  CheckCircle,
  Star,
  Phone,
  ArrowRight,
} from 'lucide-react'
import SiteImage from '@/components/SiteImage'

const coreValues = [
  {
    icon: CheckCircle,
    label: 'Integrity',
    desc: 'We conduct our business with the highest level of honesty and transparency, building trust through open and ethical communication.',
  },
  {
    icon: Award,
    label: 'Quality',
    desc: 'We are committed to delivering the highest quality craftsmanship and materials, ensuring every roof is a testament to our dedication to excellence.',
  },
  {
    icon: Lightbulb,
    label: 'Innovation',
    desc: 'We embrace change and continuously seek out new technologies and processes to improve efficiency and deliver greater value to our customers.',
  },
  {
    icon: HardHat,
    label: 'Safety',
    desc: "We prioritize the safety of our employees and customers above all else, adhering to the strictest safety standards and protocols on every job site.",
  },
  {
    icon: Heart,
    label: 'Customer-Centricity',
    desc: "We are dedicated to providing an exceptional customer experience, listening to our customers' needs and exceeding their expectations.",
  },
  {
    icon: Users,
    label: 'Teamwork',
    desc: 'We foster a collaborative and supportive work environment, recognizing that our collective strength is our greatest asset.',
  },
]

const teamMembers = [
  {
    name: 'Alexandra Pierce',
    role: 'CEO & Founder',
    imageId: 'team_founder',
    desc: '20+ years building Colorado\'s most trusted roofing company from the ground up — one roof at a time.',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Lead Foreman',
    imageId: 'team_foreman',
    desc: '15 years on the tools. Marcus runs every job site with the precision of a master craftsman.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Project Coordinator',
    imageId: 'team_project_manager',
    desc: 'Keeps every project on schedule and every homeowner informed — from permit to final walkthrough.',
  },
  {
    name: 'David Chen',
    role: 'Senior Technician',
    imageId: 'team_safety',
    desc: 'Specializes in complex roofing systems, flashing details, and the installations others turn down.',
  },
  {
    name: 'Jennifer Park',
    role: 'Sales & Estimating',
    imageId: 'team_customer_service',
    desc: 'Combines deep technical knowledge with a commitment to transparent, pressure-free pricing.',
  },
]

const certifications = [
  { icon: Award,   title: 'Licensed & Bonded', sub: 'Colorado State License' },
  { icon: Shield,  title: 'Fully Insured',     sub: '$2M Liability Coverage' },
  { icon: Star,    title: 'A+ BBB Rating',     sub: 'Better Business Bureau' },
  { icon: HardHat, title: 'OSHA Certified',    sub: 'Safety First Standards' },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── Hero ── */}
      <section className="relative" style={{ minHeight: '52vh' }}>
        <div className="absolute inset-0">
          <SiteImage id="hero_about" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,64,128,0.90) 0%, rgba(0,64,128,0.72) 100%)' }}
          />
        </div>
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: '52vh', paddingTop: '5rem', paddingBottom: '5rem' }}
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
            About Alpine Peak Roofing
          </h1>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              color: 'var(--sandstone)',
              fontSize: '1.125rem',
              letterSpacing: '0.08em',
              fontStyle: 'italic',
            }}
          >
            Pinnacle of Protection, Peak of Performance
          </p>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--cream)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <hr className="divider-gold-left" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--cedar)',
                  marginBottom: '1.5rem',
                }}
              >
                Our Story
              </h2>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '1.0625rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.85,
                  marginBottom: '1.25rem',
                }}
              >
                <em>"Pinnacle of Protection, Peak of Performance"</em> is more than a tagline for Alpine Peak
                Roofing — it is the very essence of our brand. A promise to our customers, a commitment to our
                employees, and a testament to the quality of our work.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.85,
                  marginBottom: '1.25rem',
                }}
              >
                Born from a passion for providing unparalleled protection and a desire to innovate, Alpine Peak
                Roofing was founded on the principle that true quality lies in the intersection of craftsmanship
                and technology. We don&apos;t just build roofs; we build shields.
              </p>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.85,
                }}
              >
                We understand that a roof is more than a structure — it is a symbol of safety, security, and peace
                of mind. The guardian of a family&apos;s most precious memories. That is why we approach every
                project with the utmost care and attention to detail.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
              <SiteImage id="crew_action" fill className="object-cover" />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{ background: 'linear-gradient(to top, rgba(0,64,128,0.88), transparent)' }}
              >
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    color: 'var(--gold)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Colorado&apos;s Premier Roofing Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--cream-dark)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--cedar)',
              }}
            >
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To safeguard our communities by delivering superior roofing solutions built on a foundation of integrity, innovation, and unparalleled craftsmanship. We are committed to providing the highest level of protection for homes and businesses, while leveraging cutting-edge technology to enhance efficiency, transparency, and customer satisfaction.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To redefine the roofing industry by seamlessly integrating artificial intelligence and automation into every facet of our operations — from initial customer contact to final project completion. We envision a future where technology empowers our team to deliver faster, smarter, and more efficient roofing solutions.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-craftsman p-8">
                <div
                  className="flex items-center justify-center rounded-xl mb-6"
                  style={{ width: 56, height: 56, background: 'var(--forest-deep)' }}
                >
                  <Icon size={26} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--cedar)',
                    marginBottom: '1rem',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '1rem', color: 'var(--stone)', lineHeight: 1.8 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
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
              Our Core Values
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontSize: '1.0625rem' }}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="card-craftsman p-7">
                <div
                  className="flex items-center justify-center rounded-lg mb-5"
                  style={{ width: 48, height: 48, background: 'var(--forest-deep)' }}
                >
                  <Icon size={22} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.0625rem',
                    color: 'var(--cedar)',
                    marginBottom: '0.625rem',
                  }}
                >
                  {label}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9375rem', color: 'var(--stone)', lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--forest-deep)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--cream)',
                marginBottom: '0.75rem',
              }}
            >
              Meet Our Team
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", color: 'var(--sandstone)', fontSize: '1.0625rem' }}>
              Experienced professionals dedicated to protecting your property
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(229,168,0,0.2)',
                }}
              >
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <SiteImage id={member.imageId} fill className="object-cover object-top" />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,45,90,0.85) 0%, transparent 55%)' }}
                  />
                </div>
                <div className="p-5">
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--cream)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--gold)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {member.role}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.68)',
                      lineHeight: 1.65,
                    }}
                  >
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--cream-dark)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <hr className="divider-gold" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--cedar)',
              }}
            >
              Certifications &amp; Awards
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="text-center">
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
                    marginBottom: '0.25rem',
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.875rem', color: 'var(--stone)' }}>
                  {sub}
                </p>
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
            Ready to Work with Alpine Peak?
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
            Experience the pinnacle of protection and peak of performance for your roofing needs.
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
