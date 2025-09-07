import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building, 
  ArrowRight,
  Check,
  Phone,
  Shield,
  Clock,
  Award,
  Star,
  ChevronRight,
  Wrench,
  FileText,
  Users
} from 'lucide-react'

export default function CommercialRoofingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Commercial Roofing Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              Professional roofing solutions for businesses, property managers, and commercial facilities
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-yellow-400 text-green-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8" asChild>
                <Link href="/estimator">Get Free Commercial Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Commercial Roofing</span>
          </div>
        </div>
      </section>

      {/* Commercial Services Overview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Protect Your Business Investment
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A damaged or leaky roof can be a major disruption to your business, leading to costly downtime 
                and repairs. At Alpine Peak Roofing, we offer a full range of commercial roofing services to 
                help you protect your investment and keep your business running smoothly.
              </p>
              <p className="mt-6 text-gray-600">
                We understand the unique challenges of commercial roofing, from scheduling around business hours 
                to working with complex building requirements. Our experienced team specializes in flat roof systems, 
                preventative maintenance programs, and emergency repairs for commercial properties throughout the Denver area.
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Fully Licensed & Bonded</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">$2M Insurance Coverage</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Flexible Scheduling</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Property Manager Approved</span>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Building className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Commercial Building Roof</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Roofing Systems */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Commercial Roofing Systems
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Expert installation and maintenance of all commercial roofing systems
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* TPO & EPDM */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Building className="h-6 w-6 text-blue-600 mr-2" />
                  TPO & EPDM Systems
                </CardTitle>
                <CardDescription>Single-ply membrane roofing solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Energy-efficient and cost-effective single-ply roofing membranes perfect for flat 
                  and low-slope commercial buildings.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    TPO (Thermoplastic Olefin) installation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    EPDM (Rubber) membrane systems
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Energy-efficient white membranes
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Fully adhered and mechanically attached
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-blue-700" asChild>
                  <Link href="/services/commercial/tpo-epdm">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Built-Up Roofing */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Building className="h-6 w-6 text-green-600 mr-2" />
                  Built-Up Roofing (BUR)
                </CardTitle>
                <CardDescription>Multi-layer traditional roofing systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Time-tested multi-layer roofing systems providing excellent waterproofing 
                  and durability for commercial applications.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Multiple ply construction
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Hot asphalt application
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Gravel or cap sheet surfacing
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Excellent puncture resistance
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-green-700" asChild>
                  <Link href="/services/commercial/built-up-roofing">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Maintenance Programs */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Wrench className="h-6 w-6 text-orange-600 mr-2" />
                  Maintenance Programs
                </CardTitle>
                <CardDescription>Preventative care and inspection services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Proactive maintenance programs designed to extend roof life, prevent costly repairs, 
                  and maintain your warranty coverage.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Bi-annual roof inspections
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Preventative maintenance
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Detailed condition reports
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Priority emergency service
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-orange-700" asChild>
                  <Link href="/services/commercial/maintenance-programs">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* AI-Powered Inspections */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-6 w-6 text-purple-600 mr-2" />
                  AI-Powered Inspections
                </CardTitle>
                <CardDescription>Advanced drone and AI technology assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  State-of-the-art drone technology with AI-powered damage detection provides the most 
                  comprehensive roof assessments available.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    High-resolution drone imagery
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    AI damage detection software
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Detailed condition reports
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    No roof access required
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-purple-700" asChild>
                  <Link href="/ai-tools/intelligent-roofing-automations">
                    Learn More About AI Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commercial Advantages */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Businesses Choose Alpine Peak
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Commercial roofing expertise you can trust
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Flexible Scheduling</h3>
              <p className="mt-2 text-gray-600">Work around your business hours to minimize disruption</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">$2M Insurance</h3>
              <p className="mt-2 text-gray-600">Comprehensive liability and workers compensation coverage</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Licensed Professionals</h3>
              <p className="mt-2 text-gray-600">Certified commercial roofing contractors</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Property Manager Preferred</h3>
              <p className="mt-2 text-gray-600">Trusted by commercial property managers across Denver</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Industries We Serve
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'Retail Centers', 'Office Buildings', 'Warehouses', 'Manufacturing',
              'Restaurants', 'Hotels', 'Healthcare', 'Education',
              'Apartments', 'Industrial', 'Government', 'Non-Profit'
            ].map((industry) => (
              <div key={industry} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="font-medium text-gray-900">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-16 sm:py-24 bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Commercial Emergency Roofing
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100">
              Roof emergencies don't wait for business hours. Neither do we.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8">
                <Phone className="mr-2 h-5 w-5" />
                24/7 Emergency: (303) 555-ROOF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Protect Your Business?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
              Get your free commercial roofing estimate and discover why Denver businesses trust Alpine Peak.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-green-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8" asChild>
                <Link href="/estimator">Get Free Commercial Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}