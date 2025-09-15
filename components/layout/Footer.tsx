import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, BookOpen, HelpCircle, Brain, Bot, MapPin, Mountain, Home, Building2, AlertTriangle, Calculator, Leaf, TrendingUp, Building, Users, Briefcase, Settings, FileText, MessageSquare, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#003399]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo/APR-LOGO-solo.png"
                alt="Alpine Peak Roofing Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-lg font-bold text-white">Alpine Peak Roofing</span>
            </div>
            <p className="text-white text-sm mb-4">
              Pinnacle of Protection, Peak of Performance
            </p>
            <div className="text-yellow-400 font-semibold">
              <Phone className="inline h-4 w-4 mr-1" />
              (970) 446-8995
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-blue-300" />
              Services
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <Link href="/services/residential" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Home className="h-3 w-3 mr-2 text-blue-300" />
                  Residential Roofing
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Building className="h-3 w-3 mr-2 text-blue-300" />
                  Commercial Roofing
                </Link>
              </li>
              <li>
                <Link href="/services/emergency" className="hover:text-yellow-300 transition-colors flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-2 text-red-400" />
                  Emergency Repairs
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Calculator className="h-3 w-3 mr-2 text-green-400" />
                  Free Estimates
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-400" />
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/investment-analysis" className="hover:text-yellow-300 transition-colors flex items-center">
                  <TrendingUp className="h-3 w-3 mr-2 text-yellow-400" />
                  ROI Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Building className="h-4 w-4 mr-2 text-blue-300" />
              Company
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <Link href="/about" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Users className="h-3 w-3 mr-2 text-blue-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Briefcase className="h-3 w-3 mr-2 text-blue-300" />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Settings className="h-3 w-3 mr-2 text-blue-300" />
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-yellow-300 transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-2 text-blue-300" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides/mountain-roofing-colorado" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-green-400" />
                  Mountain Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mail className="h-3 w-3 mr-2 text-blue-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Mountain className="h-4 w-4 mr-2 text-blue-300" />
              Service Areas
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <Link href="/locations/aspen" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Aspen
                </Link>
              </li>
              <li>
                <Link href="/locations/vail" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Vail
                </Link>
              </li>
              <li>
                <Link href="/locations/telluride" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Telluride
                </Link>
              </li>
              <li>
                <Link href="/locations/crested-butte" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Crested Butte
                </Link>
              </li>
              <li>
                <Link href="/locations/steamboat-springs" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Steamboat Springs
                </Link>
              </li>
              <li>
                <Link href="/locations/winter-park" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Winter Park
                </Link>
              </li>
              <li>
                <Link href="/service-areas/central-mountains" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mountain className="h-3 w-3 mr-2 text-blue-300" />
                  Central Mountains
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-blue-300" />
              Resources
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <Link href="/faq" className="hover:text-yellow-300 transition-colors flex items-center">
                  <HelpCircle className="h-3 w-3 mr-2 text-blue-300" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-yellow-300 transition-colors flex items-center">
                  <BookOpen className="h-3 w-3 mr-2 text-green-400" />
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Brain className="h-3 w-3 mr-2 text-purple-400" />
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/intelligent-roofing-automations" className="hover:text-yellow-300 transition-colors flex items-center">
                  <Bot className="h-3 w-3 mr-2 text-yellow-400" />
                  AI Tools
                </Link>
              </li>
              <li><Link href="/colors" className="hover:text-yellow-300 transition-colors">Color Guide</Link></li>
              <li className="text-yellow-400 font-medium">24/7 Emergency</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-white text-sm">
            © 2025 Alpine Peak Roofing. Licensed, Bonded & Insured. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-white mt-2 sm:mt-0">
            <Link href="/privacy" className="hover:text-yellow-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-yellow-300 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-yellow-300 transition-colors">Sitemap</Link>
            <span className="text-white/80">License #CO-ROOF-2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}