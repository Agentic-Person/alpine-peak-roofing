'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { X, Shield, Satellite, Zap, ChevronRight } from 'lucide-react'
import { useEstimateModal } from './EstimateModalContext'

const SLIDES = [
  {
    step: 1,
    label: 'Enter Your Address',
    desc: 'Type your address and we instantly lock onto your property using live satellite data. No guesswork — just your exact roof.',
    src: '/images/estimator/E1_v3_address_entry.webp',
    alt: 'Enter your address to start your satellite roof analysis',
  },
  {
    step: 2,
    label: 'Satellite Imagery',
    desc: 'We pull high-resolution satellite imagery of your exact roof so you can verify the correct property before analysis begins.',
    src: '/images/estimator/E2_v4_satellite_confirmation.webp',
    alt: 'High-resolution satellite view of your roof',
  },
  {
    step: 3,
    label: 'AI Roof Analysis',
    desc: 'Our AI measures every plane, pitch, and angle of your roof — detecting storm damage and calculating exact material quantities.',
    src: '/images/estimator/E3_v4_ai_analysis.webp',
    alt: 'AI-powered roof analysis measuring every plane and detecting damage',
  },
  {
    step: 4,
    label: 'Choose Your Materials',
    desc: 'Browse architectural shingles, standing seam metal, natural slate, and cedar — with live pricing updated in real time.',
    src: '/images/estimator/E4_v3_material_samples.jpg',
    alt: 'Choose from premium roofing materials: asphalt, metal, slate, cedar',
  },
  {
    step: 5,
    label: 'Estimate Delivered',
    desc: 'Your fully itemized estimate is ready — materials, labor, and timeline — instantly. No waiting, no sales pressure.',
    src: '/images/estimator/E5_v3_estimate_delivered.jpg',
    alt: 'Couple reviewing their instant roofing estimate on a laptop',
  },
]

export default function RoofEstimateModal() {
  const { isOpen, close } = useEstimateModal()
  const [current, setCurrent] = useState(0)
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-advance carousel
  const startCarousel = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 3500)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setCurrent(0)
      setSubmitted(false)
      setAddress('')
      startCarousel()
      // Focus trap — focus email input after short delay
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isOpen, startCarousel])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goTo = (idx: number) => {
    setCurrent(idx)
    startCarousel()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed || trimmed.length < 5) return
    setLoading(true)

    // Fire GA4 event
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // @ts-ignore
        window.gtag('event', 'estimate_address_entry', {
          event_category: 'lead',
          event_label: 'roof_estimate_modal',
        })
      }
    } catch {}

    setSubmitted(true)
    setLoading(false)

    // Open estimator with pre-filled address so user sees their roof immediately
    setTimeout(() => {
      window.open(`/estimator?address=${encodeURIComponent(trimmed)}`, '_blank', 'noopener,noreferrer')
      close()
    }, 900)
  }

  if (!isOpen) return null

  const slide = SLIDES[current]

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,15,35,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, #001F4D 0%, #002D5A 55%, #001526 100%)',
          border: '1px solid rgba(229,168,0,0.22)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(229,168,0,0.08)',
        }}
      >

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <X size={15} />
        </button>

        <div className="px-6 pt-8 pb-7">

          {/* Header */}
          <div className="text-center mb-6">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--amber-gold)', fontFamily: "'Lato', sans-serif", letterSpacing: '0.2em' }}
            >
              Powered by Satellite &amp; AI
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
            >
              Get Your Free Roof Estimate
            </h2>
            <p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            >
              Satellite measurements. AI analysis. Your estimate in under 60 seconds.
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            className="rounded-xl overflow-hidden mb-3"
            style={{ border: '1px solid rgba(229,168,0,0.15)' }}
          >
            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              {SLIDES.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: i === current ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
              {/* Step badge overlay */}
              <div
                className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{ background: 'var(--amber-gold)' }}
              >
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: '#1A2332',
                    textTransform: 'uppercase',
                  }}
                >
                  Step {slide.step} of {SLIDES.length}
                </span>
              </div>
            </div>

            {/* Step info */}
            <div
              className="px-5 py-4"
              style={{ background: 'rgba(0,20,50,0.6)' }}
            >
              <p
                className="font-bold text-base mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                {slide.label}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.60)', fontFamily: "'Lato', sans-serif" }}
              >
                {slide.desc}
              </p>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mb-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Step ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? 'var(--amber-gold)' : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'width 0.3s ease, background 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* ── Divider with trust badges ── */}
          <div
            className="flex items-center justify-center gap-5 py-4 mb-5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-1.5">
              <Satellite size={14} style={{ color: 'var(--amber-gold)' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: '0.04em' }}>
                Satellite Imaging
              </span>
            </div>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
            <div className="flex items-center gap-1.5">
              <Zap size={14} style={{ color: 'var(--amber-gold)' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: '0.04em' }}>
                AI-Powered
              </span>
            </div>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
            <div className="flex items-center gap-1.5">
              <Shield size={14} style={{ color: 'var(--amber-gold)' }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: '0.04em' }}>
                100% Free
              </span>
            </div>
          </div>

          {/* ── Address Entry ── */}
          {!submitted ? (
            <div>
              <p
                className="font-bold text-lg mb-1 text-center"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                See your roof from satellite — instantly.
              </p>
              <p
                className="text-sm text-center mb-4"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Lato', sans-serif" }}
              >
                Enter your address to view your roof and get a free estimate — no email required.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="123 Main St, Denver, CO 80202"
                    required
                    autoComplete="street-address"
                    className="w-full px-4 py-3.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: '#FFFFFF',
                      fontFamily: "'Lato', sans-serif",
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(229,168,0,0.6)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
                  />
                  <button
                    type="submit"
                    disabled={loading || address.trim().length < 5}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                    style={{
                      background: 'var(--amber-gold)',
                      color: '#1A2332',
                      fontFamily: "'Lato', sans-serif",
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 20px rgba(229,168,0,0.35)',
                      opacity: (loading || address.trim().length < 5) ? 0.7 : 1,
                      cursor: loading ? 'wait' : 'pointer',
                    }}
                  >
                    {loading ? 'Loading…' : (
                      <>
                        Analyze My Roof
                        <ChevronRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p
                className="text-center mt-3"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontFamily: "'Lato', sans-serif" }}
              >
                🔒 100% free. No email required to see your roof.
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                style={{ background: 'rgba(229,168,0,0.15)', border: '1px solid rgba(229,168,0,0.4)' }}
              >
                <span style={{ fontSize: '1.5rem' }}>✓</span>
              </div>
              <p
                className="font-bold text-lg mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}
              >
                Launching Your Analysis…
              </p>
              <p
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Lato', sans-serif" }}
              >
                Your satellite roof estimator is opening now.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
