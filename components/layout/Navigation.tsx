'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Bot,
  ArrowRight,
  Calculator,
  MessageSquare,
  Zap
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/',         label: 'Home' },
    { href: '/about',    label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio',label: 'Portfolio' },
    { href: '/locations',label: 'Locations' },
    { href: '/financing',label: 'Financing' },
    { href: '/process',  label: 'Our Process' },
    { href: '/blog',     label: 'Blog' },
    { href: '/contact',  label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@300;400;700;900&display=swap');
      `}</style>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'shadow-[0_4px_24px_rgba(0,64,128,0.35)]'
            : 'shadow-none'
        }`}
        style={{ background: 'var(--forest-deep)' }}
      >
        {/* Top accent bar */}
        <div style={{ background: 'var(--cedar)', height: '3px' }} />

        {/* Utility bar */}
        <div
          className="hidden lg:block border-b"
          style={{
            background: 'rgba(0,45,90,0.6)',
            borderColor: 'rgba(229,168,0,0.15)'
          }}
        >
          <div className="mx-auto max-w-7xl px-6 flex justify-between items-center py-1.5">
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
              The Rocky Mountains&apos; Premier Roofing Specialist — Serving Colorado Since 1989
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:9704468995"
                className="flex items-center gap-1.5 font-bold text-xs tracking-wide transition-colors"
                style={{ color: 'var(--gold)', letterSpacing: '0.06em' }}
              >
                <Phone size={11} />
                (970) 446-8995
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div
                className="relative rounded"
                style={{ width: 36, height: 36, background: 'rgba(229,168,0,0.12)', border: '1px solid rgba(229,168,0,0.3)' }}
              >
                <Image
                  src="/images/logo/APR-LOGO-solo.png"
                  alt="Alpine Peak Roofing"
                  fill
                  className="object-contain p-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div>
                <span
                  className="block font-display font-bold leading-tight"
                  style={{ color: 'var(--cream)', fontFamily: "'Playfair Display', serif", fontSize: '1rem' }}
                >
                  Alpine Peak
                </span>
                <span
                  className="block font-body"
                  style={{ color: 'var(--sandstone)', fontFamily: "'Lato', sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Roofing
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-craftsman px-3 py-2 rounded transition-colors ${
                    isActive(item.href) ? 'active' : ''
                  }`}
                  style={{
                    color: isActive(item.href) ? 'var(--gold)' : 'rgba(255,255,255,0.80)',
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* AI Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`nav-link-craftsman flex items-center gap-1 px-3 py-2 rounded transition-colors ${
                    pathname.startsWith('/ai-tools') || pathname.startsWith('/ai-chat')
                      ? 'active' : ''
                  }`}
                  style={{
                    color: pathname.startsWith('/ai') ? 'var(--gold)' : 'rgba(255,255,255,0.80)',
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Bot size={12} />
                  AI Tools
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-2 w-60 rounded-lg overflow-hidden transition-all duration-200 ${
                    isDropdownOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: '0 16px 40px rgba(0,64,128,0.25)',
                  }}
                >
                  <div style={{ padding: '0.375rem' }}>
                    {[
                      { href: '/ai-tools',     icon: Zap,          label: 'AI Platform', sub: 'Automated roofing tools' },
                      { href: '/estimator',    icon: Calculator,    label: 'Instant Estimator', sub: 'Satellite roof analysis' },
                      { href: '/ai-chat',      icon: MessageSquare, label: 'Chat with AI', sub: '24/7 expert assistant' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors group"
                        style={{ color: 'var(--charcoal)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = 'var(--cream-dark)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent'
                        }}
                      >
                        <div
                          className="rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                          style={{
                            width: 28, height: 28,
                            background: 'var(--forest-deep)',
                            color: 'var(--gold)',
                          }}
                        >
                          <item.icon size={13} />
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "'Lato', sans-serif",
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: 'var(--cedar)',
                            }}
                          >
                            {item.label}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {item.sub}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/estimator"
                className="btn-gold text-xs"
                style={{ fontFamily: "'Lato', sans-serif", padding: '0.5rem 1.25rem' }}
              >
                Free Estimate
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded"
              style={{ color: 'var(--cream)', background: 'rgba(229,168,0,0.1)' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              background: 'var(--background-dark)',
              borderColor: 'rgba(229,168,0,0.2)',
            }}
          >
            {/* Phone — mobile */}
            <div
              className="flex items-center gap-2 px-5 py-3 border-b"
              style={{ borderColor: 'rgba(229,168,0,0.15)' }}
            >
              <Phone size={14} style={{ color: 'var(--gold)' }} />
              <a
                href="tel:9704468995"
                style={{ color: 'var(--gold)', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: '0.875rem' }}
              >
                (970) 446-8995
              </a>
            </div>

            <nav className="px-3 py-2 space-y-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-3 rounded-md transition-colors"
                  style={{
                    color: isActive(item.href) ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                    background: isActive(item.href) ? 'rgba(229,168,0,0.08)' : 'transparent',
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/ai-tools"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-md transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <Bot size={14} style={{ color: 'var(--gold)' }} />
                AI Tools
              </Link>
            </nav>

            <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(229,168,0,0.15)' }}>
              <Link
                href="/estimator"
                onClick={() => setIsOpen(false)}
                className="btn-gold w-full justify-center"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Get Free Estimate
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
