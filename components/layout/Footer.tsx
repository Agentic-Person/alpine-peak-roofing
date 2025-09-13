import React from 'react'
import Link from 'next/link'
import { Shield, Phone, BookOpen, HelpCircle, Brain, Bot, MapPin, Mountain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2b2b2a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Alpine Peak Roofing</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Pinnacle of Protection, Peak of Performance
            </p>
            <div className="text-yellow-400 font-semibold">
              <Phone className="inline h-4 w-4 mr-1" />
              (970) 446-8995
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services/residential" className="hover:text-white transition-colors">Residential Roofing</Link></li>
              <li><Link href="/services/commercial" className="hover:text-white transition-colors">Commercial Roofing</Link></li>
              <li><Link href="/services/emergency" className="hover:text-white transition-colors">Emergency Repairs</Link></li>
              <li><Link href="/estimator" className="hover:text-white transition-colors">Free Estimates</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/investment-analysis" className="hover:text-white transition-colors">ROI Analysis</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/process" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/guides/mountain-roofing-colorado" className="hover:text-white transition-colors">Mountain Guide</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Mountain className="h-4 w-4 mr-2 text-blue-400" />
              Service Areas
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/locations/aspen" className="hover:text-white transition-colors">Aspen</Link></li>
              <li><Link href="/locations/vail" className="hover:text-white transition-colors">Vail</Link></li>
              <li><Link href="/locations/telluride" className="hover:text-white transition-colors">Telluride</Link></li>
              <li><Link href="/locations/crested-butte" className="hover:text-white transition-colors">Crested Butte</Link></li>
              <li><Link href="/locations/steamboat-springs" className="hover:text-white transition-colors">Steamboat Springs</Link></li>
              <li><Link href="/locations/winter-park" className="hover:text-white transition-colors">Winter Park</Link></li>
              <li><Link href="/service-areas/central-mountains" className="hover:text-white transition-colors">Central Mountains</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors flex items-center">
                  <HelpCircle className="h-3 w-3 mr-2 text-blue-400" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-3 w-3 mr-2 text-green-400" />
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-white transition-colors flex items-center">
                  <Brain className="h-3 w-3 mr-2 text-purple-400" />
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/ai-tools/intelligent-roofing-automations" className="hover:text-white transition-colors flex items-center">
                  <Bot className="h-3 w-3 mr-2 text-yellow-400" />
                  AI Tools
                </Link>
              </li>
              <li><Link href="/colors" className="hover:text-white transition-colors">Color Guide</Link></li>
              <li className="text-yellow-400 font-medium">24/7 Emergency</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Alpine Peak Roofing. Licensed, Bonded & Insured. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400 mt-2 sm:mt-0">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
            <span className="text-gray-500">License #CO-ROOF-2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}