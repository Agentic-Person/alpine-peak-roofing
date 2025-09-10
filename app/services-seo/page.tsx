import React from 'react'
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
  AlertTriangle,
  Star,
  TrendingUp,
  MapPin,
  Users,
  Calendar,
  FileText,
  Truck,
  HardHat,
  Gauge,
  Target,
  BadgeCheck,
  ChevronRight,
  Factory,
  Camera,
  Snowflake,
  Wind,
  Sun,
  Cloud
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Comprehensive Roofing Services - Alpine Peak Roofing Denver Colorado',
  description: 'Complete roofing solutions for residential, commercial, and emergency needs. Expert installation, repair, and maintenance across Denver metro area. Licensed, insured, and specialized in mountain climate challenges.',
  keywords: 'roofing services Denver, roof installation Colorado, commercial roofing, residential roofing, emergency roof repair, mountain roofing specialists, licensed roofers Denver metro',
  openGraph: {
    title: 'Expert Roofing Services Across Denver Metro Area | Alpine Peak Roofing',
    description: 'From residential roof replacement to commercial systems and emergency repairs - comprehensive roofing solutions backed by mountain expertise and premium materials.',
  }
}

export default function ServicesComprehensivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - SEO Optimized */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Complete Roofing Services in Denver Metro Area
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-blue-100">
              Alpine Peak Roofing delivers comprehensive roofing solutions across residential, commercial, 
              and emergency sectors. Our mountain climate expertise ensures superior protection for your 
              property investment throughout Colorado's challenging weather conditions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Free Comprehensive Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Overview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Full-Spectrum Roofing Solutions
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              From single-family homes to large commercial complexes, our comprehensive service portfolio 
              addresses every roofing need with specialized expertise in Colorado's mountain climate challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="group relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Home className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Residential Roofing Excellence</CardTitle>
                <CardDescription className="text-lg">
                  Protecting homes across Denver metro with premium materials and craftsmanship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Asphalt Shingles
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Metal Roofing
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Tile Installation
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Cedar Shakes
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Slate Systems
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Synthetic Options
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Building className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Commercial Roofing Systems</CardTitle>
                <CardDescription className="text-lg">
                  Advanced flat roof and membrane systems for business properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      TPO Systems
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      EPDM Membrane
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Built-Up Roofing
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Modified Bitumen
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Roof Coatings
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Green Roofing
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-red-200 transition-all duration-300 hover:shadow-xl border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                  <Zap className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-800">Emergency Response Services</CardTitle>
                <CardDescription className="text-lg text-red-700">
                  24/7 emergency roofing services for urgent storm damage and leaks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-red-500 mr-2" />
                      24/7 Response
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      Storm Damage
                    </div>
                    <div className="flex items-center">
                      <Wrench className="h-4 w-4 text-red-500 mr-2" />
                      Leak Repairs
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-red-500 mr-2" />
                      Tarping Services
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-red-500 mr-2" />
                      Insurance Claims
                    </div>
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 text-red-500 mr-2" />
                      Damage Assessment
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Residential Services */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Residential Roofing Specialties
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Every home deserves superior protection. Our residential roofing services combine premium materials, 
              expert craftsmanship, and specialized knowledge of Colorado's challenging climate conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Complete Roof Replacement Systems</h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive roof replacement process begins with thorough inspection and assessment, 
                  followed by complete tear-off, structural evaluation, and installation of premium roofing systems 
                  designed for Colorado's mountain climate challenges.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Structural Assessment</h4>
                      <p className="text-sm text-gray-600">Complete deck and framework evaluation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Premium Underlayment</h4>
                      <p className="text-sm text-gray-600">High-performance moisture barriers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Ventilation Systems</h4>
                      <p className="text-sm text-gray-600">Optimized airflow for energy efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Warranty Protection</h4>
                      <p className="text-sm text-gray-600">Comprehensive material and labor coverage</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Precision Roof Repair Services</h3>
                <p className="text-gray-600 mb-4">
                  From minor leak repairs to extensive storm damage restoration, our precision repair services 
                  address specific issues while maintaining the integrity of your entire roofing system. 
                  We use advanced diagnostic techniques to identify root causes and implement lasting solutions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Emergency leak detection and repair</span>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Flashing replacement and sealing</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Storm damage assessment and restoration</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Gutter and downspout integration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Premium Material Installation</h3>
                <p className="text-gray-600 mb-4">
                  We exclusively install premium roofing materials from industry-leading manufacturers, 
                  ensuring optimal performance in Colorado's diverse climate conditions. Our material 
                  selection process considers longevity, energy efficiency, and aesthetic appeal.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Architectural Asphalt Shingles</h4>
                    <p className="text-sm text-blue-800">
                      Premium dimensional shingles with enhanced wind resistance (up to 130 mph) and extended warranties. 
                      Available in multiple color profiles to complement any architectural style.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Standing Seam Metal Roofing</h4>
                    <p className="text-sm text-green-800">
                      Energy-efficient metal systems with superior snow shedding capabilities and 50+ year lifespan. 
                      Ideal for mountain properties facing extreme weather conditions.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Luxury Slate and Tile Systems</h4>
                    <p className="text-sm text-purple-800">
                      Natural and synthetic slate options providing unmatched durability and aesthetic appeal. 
                      Specialized installation techniques for high-elevation properties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Roofing Solutions */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Commercial Roofing Expertise
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Protecting business investments with advanced commercial roofing systems designed for Colorado's 
              climate challenges. From office complexes to industrial facilities, we deliver durable solutions 
              that minimize maintenance costs and maximize operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
            <Card className="bg-white border-2 hover:border-blue-200 transition-all duration-300">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                  <Factory className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Single-Ply Membrane Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced TPO and EPDM membrane systems providing superior weather resistance 
                  and energy efficiency for flat and low-slope commercial roofs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Energy Star certified materials
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Heat-welded seam technology
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    20-year system warranties
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-green-200 transition-all duration-300">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Snowflake className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Modified Bitumen Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Multi-layer roofing systems combining the waterproofing qualities of built-up roofing 
                  with the flexibility to handle Colorado's temperature extremes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Superior freeze-thaw resistance
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Self-adhered installation options
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Excellent puncture resistance
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 hover:border-purple-200 transition-all duration-300">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Protective Coating Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced roof coating applications that extend roof life, improve energy efficiency, 
                  and provide seamless protection against weather infiltration.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Silicone and acrylic options
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    UV and thermal protection
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Seamless membrane creation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Commercial Maintenance Programs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-4">Preventative Maintenance Plans</h4>
                <p className="text-gray-600 mb-4">
                  Comprehensive maintenance programs designed to maximize roof system performance, 
                  prevent costly emergency repairs, and ensure compliance with warranty requirements.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Bi-annual comprehensive inspections</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Detailed condition reporting with photography</span>
                  </div>
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Minor repair and maintenance services</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Performance monitoring and optimization</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-green-900 mb-4">Emergency Response Protocol</h4>
                <p className="text-gray-600 mb-4">
                  24/7 emergency response for commercial properties with priority service, 
                  temporary protection measures, and rapid permanent repair solutions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3" />
                    <span>2-hour emergency response guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-3" />
                    <span>Temporary weatherization services</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-green-600 mr-3" />
                    <span>Dedicated commercial project managers</span>
                  </div>
                  <div className="flex items-center">
                    <BadgeCheck className="h-5 w-5 text-green-600 mr-3" />
                    <span>Insurance claim assistance and documentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Specialized Roofing Solutions
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Beyond traditional roofing services, we offer specialized solutions that address unique 
              challenges in Colorado's mountain environment, from extreme weather protection to 
              energy efficiency optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Wind className="h-8 w-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-semibold text-blue-900">Mountain Climate Roofing</h3>
                </div>
                <p className="text-blue-800 mb-6">
                  Specialized roofing systems engineered for high-altitude environments, extreme temperature 
                  variations, heavy snow loads, and high-velocity winds common in Colorado's mountain regions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      Snow load engineering
                    </div>
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      Ice dam prevention systems
                    </div>
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      High-wind resistant installation
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      UV protection enhancement
                    </div>
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      Thermal expansion accommodation
                    </div>
                    <div className="flex items-center text-sm text-blue-800">
                      <Check className="h-4 w-4 text-blue-600 mr-2" />
                      Altitude-specific material selection
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Sun className="h-8 w-8 text-green-600 mr-4" />
                  <h3 className="text-2xl font-semibold text-green-900">Energy Efficiency Systems</h3>
                </div>
                <p className="text-green-800 mb-6">
                  Advanced roofing technologies that reduce energy consumption, lower utility costs, 
                  and contribute to sustainable building practices through innovative material science and design.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-green-800">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                    <span>Cool roof technology for summer energy savings</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Sun className="h-4 w-4 text-green-600 mr-2" />
                    <span>Solar panel integration and mounting systems</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <Settings className="h-4 w-4 text-green-600 mr-2" />
                    <span>Advanced ventilation and insulation coordination</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <BadgeCheck className="h-4 w-4 text-green-600 mr-2" />
                    <span>Energy Star certified material installation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-purple-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <HardHat className="h-8 w-8 text-purple-600 mr-4" />
                  <h3 className="text-2xl font-semibold text-purple-900">Historic Restoration Services</h3>
                </div>
                <p className="text-purple-800 mb-6">
                  Specialized restoration services for historic properties, combining traditional craftsmanship 
                  with modern performance standards while preserving architectural integrity and historical significance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-purple-800">
                    <Award className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Period-appropriate material sourcing</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-800">
                    <Hammer className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Traditional installation techniques</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-800">
                    <FileText className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Historic preservation compliance</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-800">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Code compliance modernization</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Truck className="h-8 w-8 text-yellow-600 mr-4" />
                  <h3 className="text-2xl font-semibold text-yellow-900">Project Management Excellence</h3>
                </div>
                <p className="text-yellow-800 mb-6">
                  Comprehensive project management services ensuring seamless coordination from initial 
                  assessment through final inspection, with transparent communication and quality assurance at every stage.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-yellow-800">
                    <Users className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Dedicated project manager assignment</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-800">
                    <Calendar className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Detailed timeline and milestone tracking</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-800">
                    <Phone className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Regular progress updates and communication</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-800">
                    <BadgeCheck className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Quality assurance and final inspection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas and Coverage */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Service Coverage
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Serving communities across Colorado's Front Range and mountain regions with specialized 
              expertise in diverse elevation zones, climate conditions, and local building requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  <CardTitle className="text-xl">Denver Metro Area</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete roofing services throughout the Denver metropolitan area, including suburban 
                  communities and urban developments with specialized urban roofing challenges.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Denver</div>
                  <div>Aurora</div>
                  <div>Lakewood</div>
                  <div>Thornton</div>
                  <div>Arvada</div>
                  <div>Westminster</div>
                  <div>Centennial</div>
                  <div>Broomfield</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Snowflake className="h-6 w-6 text-purple-600 mr-3" />
                  <CardTitle className="text-xl">Mountain Communities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Specialized high-altitude roofing services for mountain communities, ski resorts, 
                  and luxury properties with extreme weather resistance requirements.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Aspen</div>
                  <div>Vail</div>
                  <div>Telluride</div>
                  <div>Crested Butte</div>
                  <div>Steamboat Springs</div>
                  <div>Winter Park</div>
                  <div>Keystone</div>
                  <div>Breckenridge</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-green-600 mr-3" />
                  <CardTitle className="text-xl">Commercial Districts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Commercial and industrial roofing services across Colorado's business districts, 
                  including office complexes, retail centers, and manufacturing facilities.
                </p>
                <div className="space-y-2 text-sm">
                  <div>Downtown Denver Business District</div>
                  <div>Denver Tech Center</div>
                  <div>Boulder Technology Corridor</div>
                  <div>Commerce City Industrial</div>
                  <div>Westminster Business Parks</div>
                  <div>Greenwood Village Corporate</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Assurance and Certifications */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Quality Assurance and Industry Leadership
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our commitment to excellence is demonstrated through industry certifications, premium material 
              partnerships, and comprehensive quality assurance processes that ensure superior results on every project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Industry Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-blue-900">GAF Master Elite Certification</h4>
                    <p className="text-sm text-blue-700">Top 2% of roofing contractors nationwide</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-blue-900">CertainTeed SELECT ShingleMaster</h4>
                    <p className="text-sm text-blue-700">Premium installation certification</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Owens Corning Platinum Preferred</h4>
                    <p className="text-sm text-blue-700">Excellence in installation and service</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-blue-900">OSHA Safety Certification</h4>
                    <p className="text-sm text-blue-700">Comprehensive safety training and compliance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Quality Standards</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-green-900">Premium Material Standards</h4>
                    <p className="text-sm text-green-700">Exclusive use of manufacturer-certified materials</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-green-900">Multi-Point Inspection Process</h4>
                    <p className="text-sm text-green-700">Comprehensive quality checkpoints throughout installation</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-green-900">Weather-Specific Installation</h4>
                    <p className="text-sm text-green-700">Installation protocols adapted for Colorado climate</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-green-900">Performance Guarantee</h4>
                    <p className="text-sm text-green-700">Comprehensive warranty coverage and performance assurance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Experience the Alpine Peak Difference
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
              From comprehensive residential solutions to advanced commercial systems, our full spectrum 
              of roofing services delivers unmatched protection for your Colorado property investment. 
              Contact us today for your free comprehensive assessment and estimate.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8" asChild>
                <Link href="/estimator">Get Comprehensive Free Estimate</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              Licensed, Bonded & Insured | Available 24/7 for Emergency Services | Serving Colorado Since 2010
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}