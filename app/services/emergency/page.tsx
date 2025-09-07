import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Zap, 
  ArrowRight,
  Check,
  Phone,
  Clock,
  AlertTriangle,
  Shield,
  ChevronRight,
  Cloud,
  Wrench,
  FileText,
  Users,
  MapPin
} from 'lucide-react'

export default function EmergencyRoofingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Zap className="h-10 w-10 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              24/7 Emergency Roofing Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100">
              When disaster strikes, we respond immediately. Professional emergency roofing services across the Denver metro area.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-yellow-400 text-red-900 hover:bg-yellow-300 px-8 font-bold text-lg animate-pulse">
                <Phone className="mr-2 h-6 w-6" />
                CALL NOW: (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 px-8" asChild>
                <Link href="/contact">Request Emergency Service</Link>
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
            <span className="text-gray-900">Emergency Repairs</span>
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                When Every Minute Counts
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Roof emergencies don't wait for convenient times. Whether it's a storm-damaged roof, 
                a sudden leak, or structural damage, Alpine Peak Roofing provides immediate emergency 
                response 24 hours a day, 7 days a week.
              </p>
              <p className="mt-6 text-gray-600">
                Our emergency response team is equipped with the tools, materials, and expertise to 
                quickly secure your property, prevent further damage, and begin immediate repairs. 
                We understand that time is critical in emergency situations.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <Clock className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800">Immediate Response</h3>
                    <p className="text-red-700">Emergency crews dispatched within 1 hour of your call</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Property Protection</h3>
                    <p className="text-blue-700">Immediate tarping and boarding to prevent further damage</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">Insurance Assistance</h3>
                    <p className="text-green-700">Complete documentation and insurance claim support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-red-600">
                <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Emergency Response Team</p>
                <p className="text-sm">Ready 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Emergency Roofing Services
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Comprehensive emergency services to protect your property from further damage
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Storm Damage Repair */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Cloud className="h-6 w-6 text-red-600 mr-2" />
                  Storm Damage Repair
                </CardTitle>
                <CardDescription>Hail, wind, and severe weather damage restoration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Colorado weather can be unpredictable and severe. We specialize in rapid storm damage 
                  assessment and repair to get your roof restored quickly.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Hail damage assessment and repair
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Wind damage restoration
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Emergency tarping and boarding
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Insurance claim documentation
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Leak Detection & Repair */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Wrench className="h-6 w-6 text-blue-600 mr-2" />
                  Emergency Leak Repair
                </CardTitle>
                <CardDescription>Fast leak detection and immediate repair services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Water damage spreads quickly. Our emergency leak detection and repair services 
                  stop the problem at its source before it becomes a major issue.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced leak detection technology
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Immediate patching and sealing
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Interior damage prevention
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Permanent repair solutions
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Structural Damage */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
                  Structural Damage Assessment
                </CardTitle>
                <CardDescription>Safety-first approach to structural roof damage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  When roof damage compromises structural integrity, safety is our top priority. 
                  We provide immediate assessment and stabilization services.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Professional structural assessment
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Emergency stabilization
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Safety barrier installation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Repair planning and execution
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Insurance Claims Support */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-6 w-6 text-green-600 mr-2" />
                  Insurance Claims Support
                </CardTitle>
                <CardDescription>Expert assistance with insurance claim processes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Navigating insurance claims can be complex. We work directly with your insurance 
                  company to ensure proper documentation and fair settlement.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Comprehensive damage documentation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Insurance adjuster meetings
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Detailed repair estimates
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Claim advocacy and support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Response Process */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Emergency Response Process
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Fast, efficient, and thorough emergency response when you need it most
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Immediate Response",
                  description: "Call received and emergency crew dispatched within 1 hour",
                  icon: Phone,
                  color: "red"
                },
                {
                  step: "2", 
                  title: "Damage Assessment",
                  description: "Thorough inspection and safety evaluation of the damage",
                  icon: AlertTriangle,
                  color: "orange"
                },
                {
                  step: "3",
                  title: "Emergency Protection",
                  description: "Immediate tarping, boarding, and damage prevention measures",
                  icon: Shield,
                  color: "blue"
                },
                {
                  step: "4",
                  title: "Permanent Repairs",
                  description: "Complete restoration using quality materials and expert craftsmanship",
                  icon: Wrench,
                  color: "green"
                }
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-${step.color}-100 mx-auto mb-4`}>
                    <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-${step.color}-600 text-white text-sm font-bold`}>
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              24/7 Emergency Service Area
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Emergency roofing services available throughout the Denver metro area
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { city: 'Denver', available: true },
              { city: 'Aurora', available: true },
              { city: 'Lakewood', available: true },
              { city: 'Thornton', available: true },
              { city: 'Arvada', available: true },
              { city: 'Westminster', available: true },
              { city: 'Centennial', available: true },
              { city: 'Boulder', available: true },
              { city: 'Broomfield', available: true },
              { city: 'Commerce City', available: true },
              { city: 'Northglenn', available: true },
              { city: 'Wheat Ridge', available: true }
            ].map((location) => (
              <div key={location.city} className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-l-green-500">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-4 w-4 text-green-600 mr-1" />
                  <p className="font-medium text-gray-900">{location.city}</p>
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  24/7 Available
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-red-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don't Wait - Call Now!
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100">
              Emergency situations require immediate action. Our team is standing by 24/7 to respond to your roofing emergency.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-yellow-400 text-red-900 hover:bg-yellow-300 px-12 py-4 text-xl font-bold animate-pulse">
                <Phone className="mr-3 h-6 w-6" />
                EMERGENCY: (303) 555-ROOF
              </Button>
            </div>
            <p className="mt-4 text-red-100 text-sm">
              Available 24 hours a day, 7 days a week, 365 days a year
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}