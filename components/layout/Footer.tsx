import React from 'react'
import Link from 'next/link'
import { Shield, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              (303) 555-ROOF
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
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Denver Metro Area</li>
              <li>Colorado</li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
              <li className="text-yellow-400">24/7 Emergency</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Alpine Peak Roofing. Licensed & Insured. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            License #12345 | Bonded & Insured
          </p>
        </div>
      </div>
    </footer>
  )
}