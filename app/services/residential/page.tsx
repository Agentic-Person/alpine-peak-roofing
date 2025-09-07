import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Home, 
  ArrowRight,
  Check,
  Phone,
  Shield,
  Clock,
  Award,
  Star,
  ChevronRight
} from 'lucide-react'

export default function ResidentialRoofingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Residential Roofing Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Protecting Denver homes with quality craftsmanship and premium materials
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/services" className="hover:text-blue-600">Services</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Residential Roofing</span>
          </div>
        </div>
      </section>

      {/* Residential Services Overview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Home Deserves the Best Protection
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Your home is your sanctuary, and your roof is its first line of defense. At Alpine Peak Roofing, 
                we specialize in providing high-quality residential roofing services designed to protect your home 
                and family from Colorado's challenging weather conditions.
              </p>
              <p className="mt-6 text-gray-600">
                Whether you need a complete roof replacement, minor repair, or routine inspection, our experienced 
                team will work with you to find a solution that fits your needs and budget. We offer a wide range 
                of premium roofing materials and stand behind our work with comprehensive warranties.
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Licensed & Insured</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">10-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">24/7 Emergency Service</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">A+ BBB Rating</span>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Home className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Beautiful Residential Roof</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Residential Roofing Services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Comprehensive solutions for every residential roofing need
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Roof Replacement */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Home className="h-6 w-6 text-blue-600 mr-2" />
                  Roof Replacement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete tear-off and new roof installation using premium materials and proven techniques.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Full structural assessment
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Premium material selection
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Professional installation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Comprehensive cleanup
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-blue-700" asChild>
                  <Link href="/services/residential/roof-replacement">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Roof Repair */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Home className="h-6 w-6 text-green-600 mr-2" />
                  Roof Repair
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expert repair services for leaks, storm damage, and general wear and tear.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Leak detection and repair
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Storm damage restoration
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Shingle replacement
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Emergency patching
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-green-700" asChild>
                  <Link href="/services/residential/roof-repair">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Shingle Installation */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Home className="h-6 w-6 text-orange-600 mr-2" />
                  Shingle Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Professional installation of asphalt, architectural, and premium shingle systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Asphalt shingles
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Architectural shingles
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Designer shingles
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Impact-resistant options
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-orange-700" asChild>
                  <Link href="/services/residential/shingle-installation">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Metal Roofing */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Home className="h-6 w-6 text-purple-600 mr-2" />
                  Metal Roofing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Durable and energy-efficient metal roofing systems with exceptional longevity.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Standing seam systems
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Metal shingles
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Steel and aluminum panels
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Energy-efficient coatings
                  </li>
                </ul>
                <Button className="w-full group-hover:bg-purple-700" asChild>
                  <Link href="/services/residential/metal-roofing">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Material Options */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Premium Roofing Materials
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              We work with industry-leading manufacturers to provide the best materials for Colorado's climate
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Asphalt Shingles",
                description: "Cost-effective and reliable with various style options",
                warranty: "20-30 years",
                features: ["Weather-resistant", "Wide color selection", "Easy maintenance"]
              },
              {
                name: "Architectural Shingles", 
                description: "Enhanced curb appeal with dimensional design",
                warranty: "30-50 years",
                features: ["Dimensional look", "Superior protection", "Color variety"]
              },
              {
                name: "Metal Roofing",
                description: "Long-lasting, energy-efficient, and environmentally friendly",
                warranty: "40-70 years", 
                features: ["Energy efficient", "Recyclable", "Low maintenance"]
              }
            ].map((material, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{material.name}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-900">Warranty: </span>
                    <span className="text-sm text-blue-600 font-semibold">{material.warranty}</span>
                  </div>
                  <ul className="space-y-2">
                    {material.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Protect Your Home?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Get your free instant estimate and discover why Denver homeowners trust Alpine Peak Roofing.
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