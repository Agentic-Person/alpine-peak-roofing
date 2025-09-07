import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Target,
  Eye,
  Users,
  Award,
  Heart,
  Lightbulb,
  HardHat,
  CheckCircle,
  Star,
  Phone
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About Alpine Peak Roofing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Pinnacle of Protection, Peak of Performance
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <em>"Pinnacle of Protection, Peak of Performance"</em> is more than just a tagline for Alpine Peak Roofing; 
                it is the very essence of our brand. It is a promise to our customers, a commitment to our employees, 
                and a testament to the quality of our work.
              </p>
              <p className="mt-6 text-gray-600">
                Born from a passion for providing unparalleled protection and a desire to innovate, Alpine Peak Roofing 
                was founded on the principle that true quality lies in the intersection of craftsmanship and technology. 
                We don't just build roofs; we build shields.
              </p>
              <p className="mt-6 text-gray-600">
                At Alpine Peak Roofing, we understand that a roof is more than just a structure; it is a symbol of safety, 
                security, and peace of mind. It is the guardian of a family's most precious memories and a business's most 
                valuable assets. That is why we approach every project with the utmost care and attention to detail.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Shield className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Alpine Peak Team Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-7">
                  To safeguard our communities by delivering superior roofing solutions built on a foundation of 
                  integrity, innovation, and unparalleled craftsmanship. We are committed to providing our customers 
                  with the highest level of protection for their homes and businesses, while leveraging cutting-edge 
                  technology to enhance efficiency, transparency, and customer satisfaction.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-7">
                  To redefine the roofing industry by seamlessly integrating artificial intelligence and automation 
                  into every facet of our operations, from initial customer contact to final project completion. 
                  We envision a future where technology empowers our team to deliver faster, smarter, and more 
                  efficient roofing solutions, setting a new standard for quality and customer experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Integrity</h3>
              <p className="mt-2 text-gray-600">
                We conduct our business with the highest level of honesty and transparency, 
                building trust through open and ethical communication.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Quality</h3>
              <p className="mt-2 text-gray-600">
                We are committed to delivering the highest quality craftsmanship and materials, 
                ensuring every roof is a testament to our dedication to excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-600">
                We embrace change and continuously seek out new technologies and processes 
                to improve efficiency and deliver greater value to our customers.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto">
                <HardHat className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Safety</h3>
              <p className="mt-2 text-gray-600">
                We prioritize the safety of our employees and customers above all else, 
                adhering to the strictest safety standards and protocols on every job site.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Customer-Centricity</h3>
              <p className="mt-2 text-gray-600">
                We are dedicated to providing an exceptional customer experience, 
                listening to our customers' needs and exceeding their expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mx-auto">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Teamwork</h3>
              <p className="mt-2 text-gray-600">
                We foster a collaborative and supportive work environment, 
                recognizing that our collective strength is our greatest asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Experienced professionals dedicated to protecting your property
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Michael Chen",
                role: "Founder & Master Roofer",
                description: "25+ years of roofing experience with expertise in all residential and commercial systems."
              },
              {
                name: "Sarah Mitchell", 
                role: "Operations Director",
                description: "Oversees daily operations and ensures every project meets our high standards."
              },
              {
                name: "Marcus Rodriguez",
                role: "Senior Project Manager", 
                description: "Expert project coordinator with a focus on timeline management and quality control."
              },
              {
                name: "Jennifer Park",
                role: "Customer Experience Manager",
                description: "Dedicated to ensuring exceptional customer satisfaction throughout every project."
              },
              {
                name: "David Thompson",
                role: "Lead Estimator",
                description: "Certified estimator providing accurate, detailed quotes for all roofing projects."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Certifications & Awards
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Licensed & Bonded</h3>
              <p className="mt-2 text-sm text-gray-600">Colorado State License #12345</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Fully Insured</h3>
              <p className="mt-2 text-sm text-gray-600">$2M Liability Coverage</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">A+ BBB Rating</h3>
              <p className="mt-2 text-sm text-gray-600">Better Business Bureau</p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto">
                <HardHat className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">OSHA Certified</h3>
              <p className="mt-2 text-sm text-gray-600">Safety First Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Work with Alpine Peak?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Experience the pinnacle of protection and peak of performance for your roofing needs.
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