/**
 * Emergency roofing services page.
 * SERVER COMPONENT — all content statically rendered.
 */
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  MapPin,
} from 'lucide-react';
import { BreadcrumbSchema, ServiceSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: '24/7 Emergency Roofing Services | Alpine Peak Roofing Colorado',
  description:
    'Emergency roofing services in Denver metro and Colorado mountain communities. Crews dispatched within 1 hour — storm damage, leaks, structural damage, insurance claim support.',
  keywords:
    '24/7 emergency roofing Colorado, emergency roof repair Denver, storm damage emergency, leak repair same day',
  alternates: { canonical: 'https://alpinepeakroofing.com/services/emergency' },
  openGraph: {
    title: '24/7 Emergency Roofing Services | Alpine Peak Roofing',
    description:
      'When disaster strikes we respond immediately — professional emergency roofing across Denver metro.',
  },
};

export default function EmergencyRoofingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema */}
      <ServiceSchema
        name="24/7 Emergency Roofing Services"
        description="Emergency roofing services including storm damage repair, leak detection, structural assessment, and insurance claim support. Available 24 hours, 7 days a week across Denver metro and Colorado mountain communities."
        image="https://alpinepeakroofing.com/images/services/emergency-roofing-hero.jpg"
        url="/services/emergency"
        category="Emergency Roofing"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Emergency Repairs', url: '/services/emergency' },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
              When disaster strikes, we respond immediately. Professional emergency roofing services
              across the Denver metro area.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 text-red-900 hover:bg-yellow-300 px-8 font-bold text-lg animate-pulse"
                asChild
              >
                <a href="tel:9704468995">
                  <Phone className="mr-2 h-6 w-6" />
                  CALL NOW: (970) 446-8995
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8"
                asChild
              >
                <Link href="/contact">Request Emergency Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/services" className="hover:text-blue-600">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Emergency Repairs</span>
          </nav>
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
                Roof emergencies don&apos;t wait for convenient times. Whether it&apos;s a
                storm-damaged roof, a sudden leak, or structural damage, Alpine Peak Roofing
                provides immediate emergency response 24 hours a day, 7 days a week.
              </p>
              <p className="mt-6 text-gray-600">
                Our emergency response team is equipped with the tools, materials, and expertise to
                quickly secure your property, prevent further damage, and begin immediate repairs. We
                understand that time is critical in emergency situations.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <Clock className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800">Immediate Response</h3>
                    <p className="text-red-700">
                      Emergency crews dispatched within 1 hour of your call
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Property Protection</h3>
                    <p className="text-blue-700">
                      Immediate tarping and boarding to prevent further damage
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">Insurance Assistance</h3>
                    <p className="text-green-700">
                      Complete documentation and insurance claim support
                    </p>
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
                  Colorado weather can be unpredictable and severe. We specialize in rapid storm
                  damage assessment and repair to get your roof restored quickly.
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Wrench className="h-6 w-6 text-blue-600 mr-2" />
                  Emergency Leak Repair
                </CardTitle>
                <CardDescription>
                  Fast leak detection and immediate repair services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Water damage spreads quickly. Our emergency leak detection and repair services stop
                  the problem at its source before it becomes a major issue.
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
                  Structural Damage Assessment
                </CardTitle>
                <CardDescription>
                  Safety-first approach to structural roof damage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  When roof damage compromises structural integrity, safety is our top priority. We
                  provide immediate assessment and stabilization services.
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-6 w-6 text-green-600 mr-2" />
                  Insurance Claims Support
                </CardTitle>
                <CardDescription>
                  Expert assistance with insurance claim processes
                </CardDescription>
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
              {(
                [
                  {
                    step: '1',
                    title: 'Immediate Response',
                    description: 'Call received and emergency crew dispatched within 1 hour',
                    icon: Phone,
                    colorClass: 'bg-red-100',
                    iconClass: 'text-red-600',
                    badgeClass: 'bg-red-600',
                  },
                  {
                    step: '2',
                    title: 'Damage Assessment',
                    description: 'Thorough inspection and safety evaluation of the damage',
                    icon: AlertTriangle,
                    colorClass: 'bg-orange-100',
                    iconClass: 'text-orange-600',
                    badgeClass: 'bg-orange-600',
                  },
                  {
                    step: '3',
                    title: 'Emergency Protection',
                    description: 'Immediate tarping, boarding, and damage prevention measures',
                    icon: Shield,
                    colorClass: 'bg-blue-100',
                    iconClass: 'text-blue-600',
                    badgeClass: 'bg-blue-600',
                  },
                  {
                    step: '4',
                    title: 'Permanent Repairs',
                    description:
                      'Complete restoration using quality materials and expert craftsmanship',
                    icon: Wrench,
                    colorClass: 'bg-green-100',
                    iconClass: 'text-green-600',
                    badgeClass: 'bg-green-600',
                  },
                ] as const
              ).map((item) => (
                <div key={item.step} className="relative text-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${item.colorClass} mx-auto mb-4`}
                  >
                    <item.icon className={`h-8 w-8 ${item.iconClass}`} />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full ${item.badgeClass} text-white text-sm font-bold`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
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
              'Denver',
              'Aurora',
              'Lakewood',
              'Thornton',
              'Arvada',
              'Westminster',
              'Centennial',
              'Boulder',
              'Broomfield',
              'Commerce City',
              'Northglenn',
              'Wheat Ridge',
            ].map((city) => (
              <div
                key={city}
                className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-l-green-500"
              >
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-4 w-4 text-green-600 mr-1" />
                  <p className="font-medium text-gray-900">{city}</p>
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
              Don&apos;t Wait — Call Now!
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100">
              Emergency situations require immediate action. Our team is standing by 24/7 to respond
              to your roofing emergency.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-yellow-400 text-red-900 hover:bg-yellow-300 px-12 py-4 text-xl font-bold animate-pulse"
                asChild
              >
                <a href="tel:9704468995">
                  <Phone className="mr-3 h-6 w-6" />
                  EMERGENCY: (970) 446-8995
                </a>
              </Button>
            </div>
            <p className="mt-4 text-red-100 text-sm">
              Available 24 hours a day, 7 days a week, 365 days a year
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
