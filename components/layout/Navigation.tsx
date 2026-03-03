'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import {
  ArrowRight,
  Phone,
  Menu,
  X,
  ChevronDown,
  Bot
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/process', label: 'Our Process' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-background-inverse border-b-4 border-interactive-primary sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Logo Section - Centered */}
        <div className="text-center py-4">
          <Link href="/" className="inline-flex flex-col items-center space-y-1">
            <Image
              src="/images/logo/APR-LOGO-solo.png"
              alt="Alpine Peak Roofing Logo"
              width={48}
              height={48}
              className="h-12 w-12"
              onError={(e) => {
                // Fallback: hide image if not found
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <h1 className="text-2xl font-bold text-text-inverse">Alpine Peak Roofing</h1>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:block pb-3">
          <ul className="flex justify-center items-center space-x-6">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-interactive-primary ${
                    isActive(item.href)
                      ? 'text-interactive-primary'
                      : 'text-text-inverse'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* AI Tools Dropdown */}
            <li className="relative group">
              <button
                className={`text-sm font-medium uppercase tracking-wide transition-colors flex items-center ${
                  pathname.startsWith('/ai-tools') || pathname.startsWith('/ai-chat')
                    ? 'text-interactive-primary'
                    : 'text-text-inverse hover:text-interactive-primary'
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Bot className="mr-1 h-3 w-3" />
                AI Tools
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>

              <div
                className={`absolute left-0 mt-2 w-64 bg-background-primary rounded-lg shadow-lg border border-border-primary transition-all duration-200 z-50 ${
                  isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  href="/ai-tools"
                  className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors rounded-t-lg"
                >
                  <Bot className="h-4 w-4 mr-2 text-interactive-primary" />
                  AI Platform Overview
                </Link>
                <Link
                  href="/ai-tools/solutions"
                  className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-interactive-primary" />
                  All AI Solutions
                </Link>
                <Link
                  href="/estimator"
                  className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-interactive-primary" />
                  Instant Roof Estimator
                </Link>
                <Link
                  href="/ai-chat"
                  className="flex items-center px-4 py-3 text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors rounded-b-lg"
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-interactive-primary" />
                  Chat with AI
                </Link>
              </div>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex justify-center items-center space-x-6 pb-3">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-interactive-primary mr-2" />
            <a href="tel:9704468995" className="font-semibold text-interactive-primary hover:text-interactive-primary-hover">
              (970) 446-8995
            </a>
          </div>
          <ThemeToggle />
          <Button asChild>
            <Link href="/estimator">Free Estimate</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex justify-end px-4 pb-3">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-text-inverse hover:text-interactive-primary hover:bg-background-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background-primary border-t border-border-primary">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-interactive-primary bg-background-secondary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/ai-tools"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname.startsWith('/ai-tools')
                  ? 'text-interactive-primary bg-background-secondary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Tools
            </Link>

            {/* Mobile CTA */}
            <div className="px-3 py-2 space-y-3 border-t border-border-primary mt-2 pt-4">
              <a
                href="tel:9704468995"
                className="flex items-center text-interactive-primary hover:text-interactive-primary-hover font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                (970) 446-8995
              </a>
              <ThemeToggle />
              <Button className="w-full" asChild>
                <Link href="/estimator">
                  Get Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
