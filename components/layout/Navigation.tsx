'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  const navigationItems: never[] = []

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="border-b bg-gradient-to-b from-[#003399] to-[#0066CC] shadow-sm sticky top-0 z-50 border-blue-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo/APR-LOGO-solo.png"
              alt="Alpine Peak Roofing Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-white">Alpine Peak Roofing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            {/* AI Tools Link - Centered */}
            <Link
              href="/ai-tools"
              className={`text-sm font-medium transition-colors hover:text-[#00CC00] ${
                pathname.startsWith('/ai-tools')
                  ? 'text-[#FFCC00]'
                  : 'text-[#FFCC00]'
              }`}
            >
              AI Toolsets for Roofing Contractors
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden xl:flex items-center text-sm">
              <Phone className="h-4 w-4 text-white mr-2" />
              <a href="tel:9704468995" className="font-semibold text-white hover:text-yellow-300">
                (970) 446-8995
              </a>
            </div>
            <Button 
              className="bg-gradient-to-r from-[#9333EA] to-[#213FB0] text-white border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 px-8 py-3 text-lg font-semibold hover:shadow-lg"
              asChild
            >
              <Link href="#chatbot">Chat with our AI</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-white/10"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-[#003399] to-[#0066CC] border-t border-blue-800">
            <Link
              href="/ai-tools"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname.startsWith('/ai-tools')
                  ? 'text-[#FFCC00] bg-white/20'
                  : 'text-[#FFCC00] hover:text-[#00CC00] hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              AI Toolsets for Roofing Contractors
            </Link>
            
            {/* Mobile CTA */}
            <div className="px-3 py-2 space-y-3">
              <div className="flex items-center justify-between">
                <a
                  href="tel:9704468995"
                  className="flex items-center text-white hover:text-yellow-300 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (970) 446-8995
                </a>
                <ThemeToggle />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-[#9333EA] to-[#213FB0] text-white border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 px-8 py-3 text-lg font-semibold hover:shadow-lg"
                asChild
              >
                <Link href="#chatbot">
                  Chat with our AI
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