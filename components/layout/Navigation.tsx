'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { 
  Shield, 
  ArrowRight,
  Phone,
  Menu,
  X
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/process', label: 'Our Process' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="border-b bg-white dark:bg-[#003399] shadow-sm sticky top-0 z-50 dark:border-[#0066CC]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600 dark:text-[#33CCFF]" />
            <span className="text-xl font-bold text-gray-900 dark:text-[#C7E1FC]">Alpine Peak Roofing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-[#33CCFF] ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-[#33CCFF]'
                    : 'text-gray-700 dark:text-[#DDDDDD]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* AI Tools Link */}
            <Link
              href="/ai-tools/intelligent-roofing-automations"
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-[#33CCFF] ${
                pathname.startsWith('/ai-tools')
                  ? 'text-blue-600 dark:text-[#33CCFF]'
                  : 'text-gray-700 dark:text-[#DDDDDD]'
              }`}
            >
              AI Tools
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden xl:flex items-center text-sm">
              <Phone className="h-4 w-4 text-blue-600 mr-2" />
              <a href="tel:3035557663" className="font-semibold text-blue-600 hover:text-blue-700">
                (303) 555-ROOF
              </a>
            </div>
            <Button asChild>
              <Link href="/estimator">Free Estimate</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-brand-navy border-t dark:border-brand-blue/20">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-brand-sky bg-blue-50 dark:bg-brand-blue/30'
                    : 'text-gray-700 dark:text-text-body hover:text-gray-900 dark:hover:text-text-off-white hover:bg-gray-50 dark:hover:bg-brand-blue/20'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/ai-tools/intelligent-roofing-automations"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname.startsWith('/ai-tools')
                  ? 'text-blue-600 dark:text-brand-sky bg-blue-50 dark:bg-brand-blue/30'
                  : 'text-gray-700 dark:text-text-body hover:text-gray-900 dark:hover:text-text-off-white hover:bg-gray-50 dark:hover:bg-brand-blue/20'
              }`}
              onClick={() => setIsOpen(false)}
            >
              AI Tools
            </Link>
            
            {/* Mobile CTA */}
            <div className="px-3 py-2 space-y-3">
              <div className="flex items-center justify-between">
                <a
                  href="tel:3035557663"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (303) 555-ROOF
                </a>
                <ThemeToggle />
              </div>
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