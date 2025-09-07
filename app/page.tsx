import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  ArrowRight,
  Check,
  Phone,
  Star,
  Wrench,
  Home,
  Building,
  Zap,
  Award,
  Clock,
  Users,
  MapPin
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-yellow-400">Pinnacle of Protection</span>
                <br />
                Peak of Performance
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Professional roofing solutions for homes and businesses across the Denver metro area. 
                Licensed, insured, and trusted by thousands of satisfied customers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="px-8 bg-yellow-400 text-blue-900 hover:bg-yellow-300">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (303) 555-ROOF
                </Button>
                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link href="/estimator">
                    Get Free Instant Estimate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white/80">
                  <Home className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Professional Roofing Project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-white/5 opacity-20"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Roofing Services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Comprehensive roofing solutions for every need, backed by decades of experience
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Residential Roofing */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Residential Roofing</CardTitle>
                <CardDescription>
                  Complete home roofing solutions including repair, replacement, and new construction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Roof replacement & repair
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Shingle & metal roofing
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Gutters & downspouts
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Insurance claims help
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full group-hover:bg-blue-600 group-hover:text-white transition-colors" asChild>
                  <Link href="/services/residential">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Commercial Roofing */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Commercial Roofing</CardTitle>
                <CardDescription>
                  Professional commercial roofing services for businesses and property managers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    TPO & EPDM systems
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Built-up roofing
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Maintenance programs
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Emergency repairs
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full group-hover:bg-green-600 group-hover:text-white transition-colors" asChild>
                  <Link href="/services/commercial">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Repairs */}
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Emergency Repairs</CardTitle>
                <CardDescription>
                  24/7 emergency roofing services for storm damage and urgent repairs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    24/7 availability
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Storm damage repair
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Leak detection & repair
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Insurance coordination
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Alpine Peak Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Alpine Peak Roofing?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Trusted by thousands of homeowners and businesses across the Denver metro area
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-gray-600">Round-the-clock emergency services and customer support</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Instant Estimates</h3>
              <p className="mt-2 text-gray-600">Get accurate roof estimates in 30 seconds using satellite technology</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Licensed & Insured</h3>
              <p className="mt-2 text-gray-600">Fully licensed, bonded, and insured professionals</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">10-Year Warranty</h3>
              <p className="mt-2 text-gray-600">Comprehensive workmanship warranty on all installations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Projects
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              See our quality craftsmanship in action across the Denver metro area
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project placeholders - will be replaced with real portfolio data */}
            {[
              { title: 'Residential Shingle Roof', location: 'Denver, CO', type: 'Residential' },
              { title: 'Commercial TPO Installation', location: 'Lakewood, CO', type: 'Commercial' },
              { title: 'Storm Damage Repair', location: 'Aurora, CO', type: 'Emergency' },
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Home className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {project.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                text: "Alpine Peak did an amazing job on our roof replacement. Professional, on time, and the quality is outstanding. Highly recommended!",
                author: "Sarah Johnson",
                location: "Denver, CO",
                rating: 5
              },
              {
                text: "Fast response for our emergency leak repair. They had our roof fixed within hours and prevented major water damage.",
                author: "Mike Rodriguez",
                location: "Lakewood, CO", 
                rating: 5
              },
              {
                text: "Great communication throughout the entire process. The instant estimate tool was incredibly accurate and convenient.",
                author: "Jennifer Chen",
                location: "Aurora, CO",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.location}</div>
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
              Ready to Protect Your Property?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Get your free instant estimate today and join thousands of satisfied customers 
              across the Denver metro area.
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
