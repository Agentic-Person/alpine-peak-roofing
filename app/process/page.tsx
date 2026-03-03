import React from 'react'
import Link from 'next/link'
import {
  Users,
  Search,
  FileText,
  Calendar,
  Hammer,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  Star,
  MapPin,
} from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────────────── */
interface ProcessStep {
  step: number
  title: string
  subtitle: string
  duration: string
  description: string
  details: string[]
  aiNote: string
  Icon: React.ElementType
  imageBg: string   // CSS gradient for placeholder panel
}

/* ──────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────── */
const steps: ProcessStep[] = [
  {
    step: 1,
    title: 'Initial Consultation',
    subtitle: 'Free Assessment & Discussion',
    duration: '1–2 Hours',
    description:
      'We begin with a comprehensive on-site consultation to understand your roofing needs, assess current conditions, and discuss your goals and budget — completely free, completely transparent.',
    details: [
      'Free on-site inspection and assessment',
      'Discussion of roofing needs and concerns',
      'Budget and timeline planning',
      'Initial project scope definition',
      'All your questions answered',
    ],
    aiNote: 'Our AI chatbot can schedule consultations 24/7 and provide preliminary pricing before we even arrive.',
    Icon: Users,
    imageBg: 'linear-gradient(135deg, #1A3D2B 0%, #2E6B4A 100%)',
  },
  {
    step: 2,
    title: 'Detailed Assessment',
    subtitle: 'AI-Powered Drone Inspection',
    duration: '2–3 Hours',
    description:
      'Using advanced drone technology and AI-powered damage detection, we conduct the most thorough roof inspection in the industry — identifying issues invisible to the naked eye.',
    details: [
      'High-resolution drone imagery capture',
      'AI-powered damage detection & analysis',
      'Structural integrity evaluation',
      'Material condition assessment',
      'Hidden damage identification',
    ],
    aiNote: 'AI algorithms trained on 50,000+ roofs detect micro-fractures and sub-surface damage missed by standard inspections.',
    Icon: Search,
    imageBg: 'linear-gradient(135deg, #2E6B4A 0%, #4A9B6E 100%)',
  },
  {
    step: 3,
    title: 'Detailed Proposal',
    subtitle: 'Comprehensive Quote & Planning',
    duration: '24–48 Hours',
    description:
      'We provide a detailed, fully transparent proposal with material options, timeline, and line-item pricing. No hidden fees. No surprise charges. No pressure.',
    details: [
      'Itemized scope of work breakdown',
      'Material selection and specifications',
      'Transparent line-item pricing',
      'Project timeline and milestones',
      'Warranty and guarantee details',
    ],
    aiNote: 'Automated estimation systems generate accurate proposals in hours instead of the industry-standard days.',
    Icon: FileText,
    imageBg: 'linear-gradient(135deg, #6B3A1F 0%, #9B5A35 100%)',
  },
  {
    step: 4,
    title: 'Project Planning',
    subtitle: 'Permits, Materials & Scheduling',
    duration: '3–7 Days',
    description:
      'Once approved, we manage every logistical detail — permits, material ordering, crew scheduling, and weather planning — so you don\'t have to lift a finger.',
    details: [
      'Building permit acquisition and filing',
      'Material ordering and delivery scheduling',
      'Project timeline coordination',
      'Weather contingency planning',
      'Property protection preparation',
    ],
    aiNote: 'Intelligent scheduling systems optimize crew deployment and material delivery for maximum efficiency.',
    Icon: Calendar,
    imageBg: 'linear-gradient(135deg, #4A2010 0%, #6B3A1F 100%)',
  },
  {
    step: 5,
    title: 'Professional Installation',
    subtitle: 'Expert Craftsmanship & Safety',
    duration: '1–5 Days',
    description:
      'Our experienced crews execute the installation with meticulous precision — daily safety briefings, quality checkpoints at every phase, real-time progress updates, and thorough daily cleanup.',
    details: [
      'Daily safety briefings and protocols',
      'Systematic removal and installation process',
      'Quality checkpoints at each phase',
      'Real-time progress communication',
      'Thorough daily cleanup',
    ],
    aiNote: 'Project management software tracks progress in real-time, sending you milestone notifications throughout.',
    Icon: Hammer,
    imageBg: 'linear-gradient(135deg, #1A3D2B 0%, #0F2419 100%)',
  },
  {
    step: 6,
    title: 'Final Inspection & Completion',
    subtitle: 'Quality Assurance & Warranty',
    duration: '1–2 Hours',
    description:
      'A comprehensive final inspection, complete property cleanup, a full walkthrough with you, and all documentation including warranty registration. Your roof — and your peace of mind — are fully secured.',
    details: [
      'Comprehensive quality inspection',
      'Complete property cleanup and debris removal',
      'Final walkthrough with homeowner',
      'Warranty registration and documentation',
      'Maintenance schedule and guidelines',
    ],
    aiNote: 'Digital warranty registration and AI-triggered maintenance reminders protect your investment long-term.',
    Icon: CheckCircle,
    imageBg: 'linear-gradient(135deg, #D4AF37 0%, #A88B20 100%)',
  },
]

/* ──────────────────────────────────────────────────────────────────────
   IMAGE PANEL — placeholder with gradient + icon
   ────────────────────────────────────────────────────────────────────── */
function ImagePanel({ step, bg }: { step: ProcessStep; bg: string }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(26,61,43,0.22)]"
      style={{ aspectRatio: '4/3', background: bg }}
    >
      {/* Big ghost step number */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '11rem',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.07)',
          lineHeight: 1,
        }}
      >
        {String(step.step).padStart(2, '0')}
      </div>

      {/* Icon centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <step.Icon size={36} color="rgba(255,255,255,0.9)" />
        </div>
        <span
          className="text-xs uppercase font-bold tracking-widest"
          style={{
            fontFamily: "'Lato', sans-serif",
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.18em',
          }}
        >
          {step.duration}
        </span>
      </div>

      {/* Bottom tag */}
      <div
        className="absolute bottom-5 left-5 right-5 flex items-center justify-between"
      >
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded"
          style={{
            fontFamily: "'Lato', sans-serif",
            background: 'rgba(212,175,55,0.25)',
            color: 'var(--gold-light)',
            letterSpacing: '0.12em',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          Step {step.step} of 6
        </span>
        <Clock size={14} color="rgba(255,255,255,0.4)" />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   STEP ROW — alternating layout
   ────────────────────────────────────────────────────────────────────── */
function StepRow({ step, reverse }: { step: ProcessStep; reverse: boolean }) {
  const textContent = (
    <div className="flex flex-col justify-center">
      {/* Step number & subtitle */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
          style={{
            fontFamily: "'Lato', sans-serif",
            background: 'var(--forest-deep)',
            color: 'var(--gold)',
            letterSpacing: '0.12em',
          }}
        >
          Step {step.step}
        </span>
        <div className="flex items-center gap-1.5">
          <Clock size={12} style={{ color: 'var(--stone-light)' }} />
          <span
            className="text-xs"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone-light)', fontWeight: 600 }}
          >
            {step.duration}
          </span>
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-4xl lg:text-5xl font-black mb-2 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
      >
        {step.title}
      </h2>

      <p
        className="text-sm font-bold uppercase tracking-widest mb-4"
        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.14em' }}
      >
        {step.subtitle}
      </p>

      <div className="w-10 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />

      {/* Description */}
      <p
        className="text-lg leading-relaxed mb-7"
        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', lineHeight: 1.8 }}
      >
        {step.description}
      </p>

      {/* Feature list */}
      <ul className="space-y-2.5 mb-8">
        {step.details.map((d, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={15} style={{ color: 'var(--forest-mid)', marginTop: 3, flexShrink: 0 }} />
            <span
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal-mid)', fontSize: '0.9rem' }}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* AI note */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          background: 'rgba(26,61,43,0.06)',
          border: '1px solid rgba(46,107,74,0.2)',
        }}
      >
        <Zap size={16} style={{ color: 'var(--forest-mid)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.12em' }}
          >
            AI Enhancement
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)' }}
          >
            {step.aiNote}
          </p>
        </div>
      </div>
    </div>
  )

  const imageContent = <ImagePanel step={step} bg={step.imageBg} />

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {reverse
        ? <>{textContent}{imageContent}</>
        : <>{imageContent}{textContent}</>
      }
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────────────── */
export default function ProcessPage() {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: 'var(--cream)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Lato:wght@300;400;700;900&display=swap');
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'var(--forest-deep)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'var(--gold)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute left-0 bottom-0 w-64 h-64 rounded-full opacity-8 pointer-events-none"
          style={{ background: 'var(--cedar)', transform: 'translate(-40%, 40%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-xs">
            <Link href="/" style={{ color: 'rgba(250,247,242,0.5)', fontFamily: "'Lato', sans-serif" }}>Home</Link>
            <ChevronRight size={12} style={{ color: 'rgba(250,247,242,0.3)' }} />
            <span style={{ color: 'var(--gold)', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Our Process</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p
                className="text-xs uppercase font-bold tracking-widest mb-4"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.2em' }}
              >
                How We Work
              </p>
              <h1
                className="font-black leading-none mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.08,
                }}
              >
                Our Roofing<br />
                <em className="italic" style={{ color: 'var(--gold)' }}>Process</em>
              </h1>
              <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />
              <p
                className="text-xl leading-relaxed max-w-lg"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: 'rgba(250,247,242,0.70)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                A systematic, transparent 6-step approach to delivering exceptional roofing — on time, on budget, and to the highest standard in Colorado.
              </p>
            </div>

            {/* Right: stats strip */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '6',     label: 'Clear Steps',       icon: CheckCircle },
                { value: '100%',  label: 'Transparent',       icon: Shield },
                { value: '24/7',  label: 'Communication',     icon: Phone },
                { value: 'AI',    label: 'Enhanced Process',   icon: Zap },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center p-6 rounded-2xl"
                  style={{
                    background: 'rgba(250,247,242,0.07)',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <stat.icon size={20} style={{ color: 'var(--gold)', marginBottom: 8 }} />
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest"
                    style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.50)', letterSpacing: '0.12em' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          INTRO STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-12 text-center"
        style={{ background: 'var(--cream-dark)', borderBottom: '1px solid var(--border-primary)' }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p
            className="text-xl leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', fontWeight: 300, lineHeight: 1.85 }}
          >
            At Alpine Peak Roofing, transparency isn&apos;t just a value — it&apos;s built into every step.
            From the first phone call to final warranty registration, you&apos;ll always know exactly what&apos;s happening, why, and what comes next.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STEP ROWS — alternating left/right
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-8">
        {steps.map((step, index) => (
          <div
            key={step.step}
            style={{
              background: index % 2 === 0 ? 'var(--cream)' : 'var(--cream-dark)',
              padding: '5rem 0',
            }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <StepRow step={step} reverse={index % 2 === 1} />
            </div>

            {/* Connector arrow between steps */}
            {index < steps.length - 1 && (
              <div className="flex justify-center mt-12">
                <div
                  className="flex flex-col items-center gap-1"
                  style={{ color: 'rgba(212,175,55,0.4)' }}
                >
                  <div className="w-0.5 h-8" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
                  <ChevronRight
                    size={16}
                    style={{ transform: 'rotate(90deg)', color: 'var(--gold)' }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          QUALITY CHECKPOINTS
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--forest-deep)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase font-bold tracking-widest mb-3"
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              Built-In Excellence
            </p>
            <h2
              className="text-4xl font-black mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
            >
              Quality Checkpoints
            </h2>
            <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: 'var(--gold)' }} />
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.60)', fontWeight: 300 }}
            >
              We maintain the highest standards through systematic controls at every phase of your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Shield,       title: 'Pre-Installation',         desc: 'All materials and conditions verified before work begins' },
              { Icon: Hammer,       title: 'Mid-Installation',         desc: 'Continuous quality monitoring throughout the process' },
              { Icon: CheckCircle,  title: 'Post-Installation Review', desc: 'Comprehensive inspection before project sign-off' },
              { Icon: Star,         title: 'Customer Walkthrough',     desc: 'Final approval and satisfaction confirmation with you' },
            ].map((cp, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-7 rounded-2xl"
                style={{
                  background: 'rgba(250,247,242,0.06)',
                  border: '1px solid rgba(212,175,55,0.18)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'rgba(212,175,55,0.15)' }}
                >
                  <cp.Icon size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "'Lato', sans-serif", color: '#FFFFFF' }}
                >
                  {cp.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.55)' }}
                >
                  {cp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          COMMUNICATION PROMISE — left/right split
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--sandstone-light)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs uppercase font-bold tracking-widest mb-3"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--cedar)', letterSpacing: '0.2em' }}
              >
                Our Promise
              </p>
              <h2
                className="text-4xl font-black mb-5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
              >
                Always Informed,<br />
                <em className="italic" style={{ color: 'var(--forest-mid)' }}>Never Surprised</em>
              </h2>
              <div className="w-10 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)', lineHeight: 1.85 }}
              >
                Communication is the cornerstone of our process. From project start to completion,
                you&apos;ll always know what&apos;s happening, when it&apos;s happening, and what to expect next.
              </p>

              <div className="space-y-4">
                {[
                  { Icon: Phone,  title: '24/7 Communication',  desc: 'Our AI chatbot provides instant answers anytime, day or night.' },
                  { Icon: Zap,    title: 'Real-Time Updates',    desc: 'Daily progress reports and milestone notifications sent directly to you.' },
                  { Icon: Shield, title: 'Transparent Pricing',  desc: 'No hidden fees, no surprise charges — ever. Your quote is your price.' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{ background: '#FFFFFF', border: '1px solid var(--border-primary)', boxShadow: '0 2px 12px rgba(107,58,31,0.07)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--forest-deep)', color: 'var(--gold)' }}
                    >
                      <item.Icon size={17} />
                    </div>
                    <div>
                      <h3
                        className="font-bold mb-1"
                        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal)', fontSize: '0.925rem' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div
              className="rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(26,61,43,0.18)]"
              style={{
                background: 'var(--forest-deep)',
                padding: '2.5rem',
                border: '2px solid rgba(212,175,55,0.2)',
              }}
            >
              <h3
                className="text-2xl font-black mb-6 text-center"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                What to Expect
              </h3>

              {/* Timeline indicator */}
              <div className="relative">
                <div
                  className="absolute left-4 top-0 bottom-0 w-0.5"
                  style={{ background: 'rgba(212,175,55,0.25)' }}
                />
                <div className="space-y-0">
                  {[
                    { day: 'Day 1',    event: 'Free consultation scheduled via AI or phone' },
                    { day: 'Day 2–3',  event: 'Drone inspection and AI analysis complete' },
                    { day: 'Day 4–5',  event: 'Detailed proposal delivered to your inbox' },
                    { day: 'Day 6–12', event: 'Permits filed, materials ordered, crew scheduled' },
                    { day: 'Week 2+',  event: 'Professional installation begins' },
                    { day: 'Final',    event: 'Walkthrough, warranty registered, project complete' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6 pb-6 relative pl-10">
                      {/* Dot */}
                      <div
                        className="absolute left-3 top-1 w-2.5 h-2.5 rounded-full"
                        style={{
                          background: i === 5 ? 'var(--gold)' : 'var(--forest-light)',
                          border: '2px solid var(--forest-deep)',
                          zIndex: 1,
                        }}
                      />
                      <div>
                        <div
                          className="text-xs font-bold uppercase tracking-widest mb-0.5"
                          style={{ fontFamily: "'Lato', sans-serif", color: 'var(--gold)', letterSpacing: '0.1em' }}
                        >
                          {item.day}
                        </div>
                        <div
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.65)' }}
                        >
                          {item.event}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS — cream
          ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--cream)' }} className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase font-bold tracking-widest mb-3"
              style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.2em' }}
            >
              Customer Feedback
            </p>
            <h2
              className="text-4xl font-black"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--charcoal)' }}
            >
              What Customers Say About Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The entire process was transparent from start to finish. I always knew what was happening and when. The AI inspection was incredibly detailed — they found damage I had no idea existed.",
                author: "Sarah Johnson", location: "Denver, CO", project: "Residential Roof Replacement"
              },
              {
                text: "Alpine Peak's systematic approach gave us complete confidence. Every step was explained clearly and executed perfectly. Best roofing experience I've ever had — and I've hired 3 other companies.",
                author: "Mike Rodriguez", location: "Lakewood, CO", project: "Emergency Storm Repair"
              },
              {
                text: "The communication was outstanding. Daily progress reports, instant chatbot answers at 11pm when I had questions — they treated my project like it was their own home. Remarkable service.",
                author: "Jennifer Chen", location: "Aurora, CO", project: "Commercial TPO Installation"
              }
            ].map((t, i) => (
              <div
                key={i}
                className="flex flex-col p-8 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--sandstone-light)',
                  boxShadow: '0 4px 24px rgba(107,58,31,0.08)',
                }}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={15} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
                  ))}
                </div>
                <blockquote
                  className="flex-1 text-base leading-relaxed mb-6 italic"
                  style={{ fontFamily: "'Lato', sans-serif", color: 'var(--stone)' }}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div>
                  <div
                    className="font-bold"
                    style={{ fontFamily: "'Lato', sans-serif", color: 'var(--charcoal)', fontSize: '0.9rem' }}
                  >
                    {t.author}
                  </div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "'Lato', sans-serif", color: 'var(--forest-mid)', letterSpacing: '0.08em' }}
                  >
                    {t.project}
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs mt-1"
                    style={{ fontFamily: "'Lato', sans-serif", color: 'var(--text-muted)' }}
                  >
                    <MapPin size={10} />
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: 'var(--charcoal)', borderTop: '3px solid var(--gold)' }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2
            className="text-4xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
          >
            Ready to Experience Our Process?
          </h2>
          <p
            className="text-xl mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Lato', sans-serif", color: 'rgba(250,247,242,0.60)', fontWeight: 300 }}
          >
            Start with a free consultation and discover why Denver homeowners trust our systematic approach to roofing excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9704468995"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'var(--gold)',
                color: 'var(--charcoal)',
                letterSpacing: '0.1em',
                boxShadow: '0 8px 24px rgba(212,175,55,0.4)',
              }}
            >
              <Phone size={15} /> Call (970) 446-8995
            </a>
            <Link
              href="/estimator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid rgba(250,247,242,0.3)',
                letterSpacing: '0.1em',
              }}
            >
              Get Free Estimate <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
