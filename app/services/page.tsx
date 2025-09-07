import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Home, 
  Building, 
  Zap,
  ArrowRight,
  Check,
  Phone,
  Wrench,
  Shield,
  Clock,
  Award,
  Hammer,
  Settings,
  AlertTriangle
} from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Roofing Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Comprehensive roofing solutions for every need across the Denver metro area
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            
            {/* Residential Roofing */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Home className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Residential Roofing</CardTitle>
                <CardDescription className="text-lg">
                  Complete home roofing solutions for homeowners across Denver
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Protect your most valuable investment with our comprehensive residential roofing services. 
                  From minor repairs to complete roof replacements, we handle every aspect of residential roofing.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Roof Replacement</h4>
                      <p className="text-sm text-gray-600">Complete tear-off and new installation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Roof Repair</h4>
                      <p className="text-sm text-gray-600">Leak repairs, shingle replacement, damage fixes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Shingle Installation</h4>
                      <p className="text-sm text-gray-600">Asphalt, architectural, and premium shingles</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Metal Roofing</h4>
                      <p className="text-sm text-gray-600">Standing seam, metal shingles, steel panels</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full group-hover:bg-blue-700" asChild>
                    <Link href="/services/residential">
                      View Residential Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/estimator">Get Free Estimate</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Commercial Roofing */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Building className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Commercial Roofing</CardTitle>
                <CardDescription className="text-lg">
                  Professional roofing solutions for businesses and property managers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Keep your business protected with our commercial roofing expertise. We specialize in 
                  flat roof systems, maintenance programs, and emergency repairs for commercial properties.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">TPO & EPDM Systems</h4>
                      <p className="text-sm text-gray-600">Single-ply membrane roofing systems</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Built-Up Roofing</h4>
                      <p className="text-sm text-gray-600">Multi-layer flat roof systems</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Maintenance Programs</h4>
                      <p className="text-sm text-gray-600">Preventative care and inspection services</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Roof Coatings</h4>
                      <p className="text-sm text-gray-600">Protective coatings and restoration</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full group-hover:bg-green-700" asChild>
                    <Link href="/services/commercial">
                      View Commercial Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/estimator">Get Free Estimate</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Repairs */}
            <Card className="group relative overflow-hidden border-2 hover:border-red-200 transition-all duration-300 hover:shadow-xl border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                  <Zap className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-800">Emergency Repairs</CardTitle>
                <CardDescription className="text-lg text-red-700">
                  24/7 emergency roofing services for urgent situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-700">
                  Don't let roof damage worsen! Our emergency repair team is available around the clock 
                  to handle storm damage, leaks, and other urgent roofing issues.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">24/7 Availability</h4>
                      <p className="text-sm text-red-600">Emergency response any time, day or night</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">Storm Damage</h4>
                      <p className="text-sm text-red-600">Hail, wind, and weather damage repair</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Wrench className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">Leak Repairs</h4>
                      <p className="text-sm text-red-600">Fast leak detection and emergency patching</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">Insurance Help</h4>
                      <p className="text-sm text-red-600">Insurance claim assistance and documentation</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (303) 555-ROOF Now
                  </Button>
                  <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100" asChild>
                    <Link href="/services/emergency">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Additional Services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Complete roofing solutions to protect and enhance your property
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Roof Inspections</h3>
              <p className="mt-2 text-gray-600">Professional roof assessments and condition reports</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Hammer className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Gutter Services</h3>
              <p className="mt-2 text-gray-600">Installation, repair, and maintenance of gutter systems</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Warranties</h3>
              <p className="mt-2 text-gray-600">Comprehensive material and workmanship warranties</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Insurance Claims</h3>
              <p className="mt-2 text-gray-600">Expert assistance with insurance claim processes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Service Area
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Proudly serving the Denver metro area and surrounding communities
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'Denver', 'Aurora', 'Lakewood', 'Thornton', 'Arvada', 'Westminster',
              'Centennial', 'Boulder', 'Broomfield', 'Commerce City', 'Northglenn',
              'Wheat Ridge', 'Englewood', 'Littleton', 'Greenwood Village', 'Parker'
            ].map((city) => (
              <div key={city} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="font-medium text-gray-900">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Get your free instant estimate today and experience the Alpine Peak difference.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8" asChild>
                <Link href="/estimator">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}