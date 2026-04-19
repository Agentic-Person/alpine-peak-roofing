import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, BookOpen, HelpCircle, Brain, Bot, Mountain, Home, Building2, AlertTriangle, Calculator, Leaf, TrendingUp, Building, Users, Briefcase, Settings, FileText, Mail } from 'lucide-react'
import AnalyticsWidget from '@/components/analytics/AnalyticsWidget'

const serviceAreas = [
  { href: '/locations/aspen',            label: 'Aspen' },
  { href: '/locations/vail',             label: 'Vail' },
  { href: '/locations/telluride',        label: 'Telluride' },
  { href: '/locations/crested-butte',    label: 'Crested Butte' },
  { href: '/locations/steamboat-springs',label: 'Steamboat Springs' },
  { href: '/locations/winter-park',      label: 'Winter Park' },
  { href: '/locations/breckenridge',     label: 'Breckenridge' },
  { href: '/locations/frisco',           label: 'Frisco' },
  { href: '/locations/silverthorne',     label: 'Silverthorne' },
  { href: '/locations/glenwood-springs', label: 'Glenwood Springs' },
  { href: '/locations/durango',          label: 'Durango' },
  { href: '/locations/central-mountains',label: 'Central Mountains' },
]

export default function Footer() {
  return (
    <footer className="bg-[#004080]">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-4">

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-x-6 gap-y-6">

          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/logo/APR-LOGO-solo.webp"
                alt="Alpine Peak Roofing Logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="text-sm font-bold text-white">Alpine Peak Roofing</span>
            </div>
            <p className="text-white/70 text-xs mb-3 leading-snug">
              Pinnacle of Protection,<br />Peak of Performance
            </p>
            <a href="tel:9704561176" className="flex items-center gap-1 text-yellow-400 font-bold text-sm hover:text-yellow-300 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              (970) 456-1176
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-300" />
              Services
            </h3>
            <ul className="space-y-1.5 text-white/80 text-xs">
              <li><Link href="/services/residential" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Home className="h-3 w-3 text-blue-300 shrink-0" />Residential</Link></li>
              <li><Link href="/services/commercial" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Building className="h-3 w-3 text-blue-300 shrink-0" />Commercial</Link></li>
              <li><Link href="/services/emergency" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><AlertTriangle className="h-3 w-3 text-red-400 shrink-0" />Emergency</Link></li>
              <li><Link href="/estimator" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Calculator className="h-3 w-3 text-green-400 shrink-0" />Free Estimates</Link></li>
              <li><Link href="/sustainability" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Leaf className="h-3 w-3 text-green-400 shrink-0" />Sustainability</Link></li>
              <li><Link href="/investment-analysis" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-yellow-400 shrink-0" />ROI Analysis</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-blue-300" />
              Company
            </h3>
            <ul className="space-y-1.5 text-white/80 text-xs">
              <li><Link href="/about" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Users className="h-3 w-3 text-blue-300 shrink-0" />About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Briefcase className="h-3 w-3 text-blue-300 shrink-0" />Portfolio</Link></li>
              <li><Link href="/process" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Settings className="h-3 w-3 text-blue-300 shrink-0" />Our Process</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><FileText className="h-3 w-3 text-blue-300 shrink-0" />Blog</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Mail className="h-3 w-3 text-blue-300 shrink-0" />Contact</Link></li>
              <li><Link href="/financing" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-yellow-400 shrink-0" />Financing</Link></li>
              <li><Link href="/materials" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Settings className="h-3 w-3 text-blue-300 shrink-0" />Materials</Link></li>
            </ul>
          </div>

          {/* Service Areas — 2 columns of 6 */}
          <div className="col-span-2">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Mountain className="h-3.5 w-3.5 text-blue-300" />
              Service Areas
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-white/80 text-xs">
              {serviceAreas.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                    <Mountain className="h-3 w-3 text-blue-300 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-blue-300" />
              Resources
            </h3>
            <ul className="space-y-1.5 text-white/80 text-xs">
              <li><Link href="/faq" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><HelpCircle className="h-3 w-3 text-blue-300 shrink-0" />FAQ</Link></li>
              <li><Link href="/glossary" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><BookOpen className="h-3 w-3 text-green-400 shrink-0" />Glossary</Link></li>
              <li><Link href="/knowledge" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Brain className="h-3 w-3 text-purple-400 shrink-0" />Knowledge Hub</Link></li>
              <li><Link href="/ai-tools/intelligent-roofing-automations" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5"><Bot className="h-3 w-3 text-yellow-400 shrink-0" />AI Tools</Link></li>
              <li><Link href="/colors" className="hover:text-yellow-300 transition-colors">Color Guide</Link></li>
              <li className="text-yellow-400 font-semibold">24/7 Emergency</li>
            </ul>
          </div>
          {/* Live Stats */}
          <div>
            <AnalyticsWidget />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/70 text-xs">
            © 2025 Alpine Peak Roofing. Licensed, Bonded &amp; Insured. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <Link href="/privacy" className="hover:text-yellow-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-yellow-300 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-yellow-300 transition-colors">Sitemap</Link>
            <span>License #CO-ROOF-2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
