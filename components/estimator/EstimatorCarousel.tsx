'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const SLIDES = [
  {
    step: 1,
    label: 'Enter Your Address',
    desc: 'Type your address and confirm your property location on the map. Our system instantly recognizes your property.',
    src: '/images/estimator/E1_v3_address_entry.webp',
    alt: 'Entering your address into the Alpine Peak AI roof estimator',
  },
  {
    step: 2,
    label: 'Satellite View',
    desc: 'We pull high-resolution satellite imagery of your exact roof so you can confirm the correct property.',
    src: '/images/estimator/E2_v4_satellite_confirmation.webp',
    alt: 'Satellite aerial view of your roof for AI measurement and analysis',
  },
  {
    step: 3,
    label: 'AI Analysis',
    desc: 'Our AI measures every plane of your roof, detects hail or storm damage, and calculates exact material quantities.',
    src: '/images/estimator/E3_v4_ai_analysis.webp',
    alt: 'AI-powered roof analysis detecting damage, measurements, and material needs',
  },
  {
    step: 4,
    label: 'Choose Your Materials',
    desc: 'Browse architectural shingles, standing seam metal, natural slate, and cedar shake — with live pricing updated in real time.',
    src: '/images/estimator/E4_v3_material_samples.webp',
    alt: 'Premium roofing material samples: asphalt, metal, slate, and cedar options',
  },
  {
    step: 5,
    label: 'Estimate Delivered',
    desc: 'Your fully itemized estimate is ready — materials, labor, and timeline — instantly on your device. No waiting, no pressure.',
    src: '/images/estimator/E5_v3_estimate_delivered.webp',
    alt: 'Homeowners reviewing their instant roofing estimate on a laptop',
  },
  {
    step: 6,
    label: 'Your Brand New Roof',
    desc: 'Alpine Peak Roofing delivers the pinnacle of protection — quality craftsmanship that stands for decades.',
    src: '/images/estimator/timber_home_brown_roof.webp',
    alt: 'Beautiful completed roof by Alpine Peak Roofing — timber home with premium roofing',
  },
]

export default function EstimatorCarousel() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Intersection Observer — fade in + start carousel when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-advance every 4.5 seconds once visible
  useEffect(() => {
    if (!isVisible) return
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isVisible])

  const goTo = (idx: number) => {
    setCurrent(idx)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4500)
  }

  const slide = SLIDES[current]

  return (
    <div
      ref={sectionRef}
      className="py-16"
      style={{
        background: 'var(--background-secondary)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
      }}
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Section label */}
        <p
          className="text-center text-xs uppercase font-bold tracking-widest mb-10"
          style={{ fontFamily: "var(--font-lato), system-ui, sans-serif", color: 'var(--azure)', letterSpacing: '0.2em' }}
        >
          How It Works
        </p>

        {/* Step badge + title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ background: 'var(--amber-gold)' }}>
            <span style={{
              fontFamily: "var(--font-lato), system-ui, sans-serif",
              fontWeight: 900,
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'var(--ink)',
              textTransform: 'uppercase',
            }}>
              Step {slide.step} of {SLIDES.length}
            </span>
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: 'var(--ink)' }}
          >
            {slide.label}
          </h3>
        </div>

        {/* Image frame — all slides stacked, fade between them */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-6"
          style={{ aspectRatio: '16/9', boxShadow: '0 12px 48px rgba(0,64,128,0.16)' }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.65s ease',
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
        </div>

        {/* Description */}
        <p
          className="text-center text-base mb-8 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-lato), system-ui, sans-serif",
            color: 'var(--text-muted)',
            lineHeight: 1.75,
          }}
        >
          {slide.desc}
        </p>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                width: i === current ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: i === current ? 'var(--amber-gold)' : 'rgba(0,64,128,0.18)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
