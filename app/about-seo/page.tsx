import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Star,
  CheckCircle,
  Building,
  Calendar,
  Target,
  Heart,
  Handshake,
  Mountain,
  BadgeCheck,
  Clock,
  ThumbsUp,
  FileText,
  Zap,
  Settings,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Alpine Peak Roofing - Colorado Mountain Roofing Specialists | Company History & Expertise',
  description: 'Learn about Alpine Peak Roofing\'s 15+ years of Colorado roofing expertise, mountain climate specialization, industry certifications, and commitment to protecting Denver metro properties.',
  keywords: 'Alpine Peak Roofing company, Colorado roofing contractors, Denver roofing specialists, mountain roofing expertise, licensed roofers Colorado, roofing company history',
  openGraph: {
    title: 'Colorado\'s Premier Mountain Roofing Specialists | Alpine Peak Roofing',
    description: 'Discover why Alpine Peak Roofing is Colorado\'s trusted choice for residential and commercial roofing solutions. Expert craftsmanship, mountain climate specialization, and unmatched customer service.',
  }
}

export default function AboutComprehensivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Colorado's Premier Mountain Roofing Specialists
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-blue-100">
              Since 2010, Alpine Peak Roofing has been the trusted choice for homeowners and businesses 
              across Colorado, delivering exceptional roofing solutions engineered for mountain climate challenges. 
              Our commitment to excellence, safety, and customer satisfaction has made us the state's leading 
              roofing contractor with over 15 years of specialized expertise.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Get Free Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                "Pinnacle of Protection, Peak of Performance"
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Alpine Peak Roofing was founded with a singular mission: to provide Colorado property owners 
                with roofing solutions that withstand the unique challenges of our mountain environment. 
                From the intense UV exposure at high altitudes to the extreme temperature fluctuations 
                and heavy snow loads, we understand that Colorado roofing requires specialized expertise 
                that goes far beyond standard construction practices.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our company name reflects our core philosophy – we strive to be the pinnacle of protection 
                for your property while delivering peak performance in every aspect of our service. 
                This commitment has driven us to become one of Colorado's most trusted and respected 
                roofing contractors, with thousands of satisfied customers across the Front Range and 
                mountain communities.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5,000+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Service</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Core Values</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Protection First</h4>
                    <p className="text-gray-600 text-sm">Every decision prioritizes the long-term protection of your property investment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Uncompromising Quality</h4>
                    <p className="text-gray-600 text-sm">Premium materials and expert craftsmanship in every project</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer-Centric Service</h4>
                    <p className="text-gray-600 text-sm">Your satisfaction and peace of mind guide every interaction</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mountain className="h-6 w-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mountain Expertise</h4>
                    <p className="text-gray-600 text-sm">Specialized knowledge of Colorado's unique climate challenges</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Handshake className="h-6 w-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Integrity & Transparency</h4>
                    <p className="text-gray-600 text-sm">Honest communication and ethical business practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Leadership & Expertise
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our leadership team combines decades of roofing industry experience with deep knowledge 
              of Colorado's unique construction challenges. This expertise drives our commitment to 
              innovation, quality, and exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Founder & CEO</CardTitle>
                <CardDescription>Industry Pioneer & Colorado Native</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  With over 20 years in the roofing industry and a lifelong connection to Colorado, 
                  our founder brings unparalleled expertise in mountain climate roofing challenges. 
                  A certified Master Roofer and OSHA safety instructor, they established Alpine Peak 
                  with a vision of elevating industry standards across Colorado.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <BadgeCheck className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Master Roofer Certification</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BadgeCheck className="h-4 w-4 text-blue-600 mr-2" />
                    <span>OSHA Safety Instructor</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BadgeCheck className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Colorado Native (30+ years)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Settings className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">Operations Director</CardTitle>
                <CardDescription>Project Management & Quality Assurance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Leading our operations team with 15+ years of construction management experience, 
                  our Operations Director ensures every project meets Alpine Peak's exacting standards. 
                  Their expertise in high-altitude construction and project coordination guarantees 
                  seamless execution from start to finish.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-green-600 mr-2" />
                    <span>PMP Certified Project Manager</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-green-600 mr-2" />
                    <span>High-Altitude Construction Specialist</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-green-600 mr-2" />
                    <span>Quality Management Systems</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                  <ThumbsUp className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Customer Success Manager</CardTitle>
                <CardDescription>Service Excellence & Customer Relations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Dedicated to ensuring exceptional customer experiences, our Customer Success Manager 
                  brings 12+ years of service industry leadership. Their commitment to communication, 
                  problem-solving, and customer satisfaction has been instrumental in achieving our 
                  industry-leading satisfaction ratings.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Customer Service Excellence</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Conflict Resolution Specialist</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Industry Relations Manager</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Company Milestones & Growth
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our journey from a small local contractor to Colorado's premier roofing company reflects 
              our unwavering commitment to excellence, continuous innovation, and customer satisfaction.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-blue-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <Calendar className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900">2010 - Foundation</h3>
                    <p className="text-blue-700">Establishing Excellence</p>
                  </div>
                </div>
                <p className="text-blue-800">
                  Alpine Peak Roofing was founded with a focus on residential roofing services in the Denver metro area. 
                  Our commitment to quality and customer service quickly distinguished us in the competitive Colorado market. 
                  Within our first year, we completed over 100 successful projects and established partnerships with 
                  leading material manufacturers.
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-900">2013 - Commercial Expansion</h3>
                    <p className="text-green-700">Growing Our Expertise</p>
                  </div>
                </div>
                <p className="text-green-800">
                  Recognizing the need for specialized commercial roofing services, we expanded our capabilities to include 
                  flat roof systems, membrane installations, and large-scale commercial projects. This expansion included 
                  additional certifications and the development of our comprehensive maintenance program offerings.
                </p>
              </div>

              <div className="bg-purple-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <Mountain className="h-8 w-8 text-purple-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-purple-900">2016 - Mountain Specialization</h3>
                    <p className="text-purple-700">High-Altitude Expertise</p>
                  </div>
                </div>
                <p className="text-purple-800">
                  We developed specialized expertise in high-altitude roofing challenges, expanding our service area to include 
                  premium mountain communities like Aspen, Vail, and Telluride. This specialization required advanced training 
                  in extreme weather roofing systems and luxury property requirements.
                </p>
              </div>

              <div className="bg-orange-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-orange-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-orange-900">2019 - Industry Recognition</h3>
                    <p className="text-orange-700">Excellence Acknowledged</p>
                  </div>
                </div>
                <p className="text-orange-800">
                  Achieved GAF Master Elite status, placing us among the top 2% of roofing contractors nationwide. 
                  This recognition, combined with multiple manufacturer certifications and industry awards, 
                  solidified our reputation as Colorado's premier roofing contractor.
                </p>
              </div>

              <div className="bg-red-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-red-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-900">2021 - Emergency Services</h3>
                    <p className="text-red-700">24/7 Response Capability</p>
                  </div>
                </div>
                <p className="text-red-800">
                  Launched our comprehensive 24/7 emergency response program, providing immediate assistance for storm damage, 
                  emergency leaks, and urgent roofing issues. This service expansion included specialized equipment, 
                  emergency response protocols, and dedicated emergency response teams.
                </p>
              </div>

              <div className="bg-yellow-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <Globe className="h-8 w-8 text-yellow-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-900">2024 - Digital Innovation</h3>
                    <p className="text-yellow-700">Technology Integration</p>
                  </div>
                </div>
                <p className="text-yellow-800">
                  Implemented advanced digital tools including drone inspections, 3D modeling, and AI-powered project management. 
                  These innovations enhance accuracy, improve customer communication, and streamline the entire roofing process 
                  from initial assessment through project completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and Partnerships */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Industry Certifications & Strategic Partnerships
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our comprehensive certifications and strategic manufacturer partnerships ensure access to the 
              latest roofing technologies, premium materials, and extended warranty protections for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">GAF Master Elite Contractor</h4>
                    <p className="text-sm text-gray-600">Top 2% of roofing contractors nationwide - premium warranty provider</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">CertainTeed SELECT ShingleMaster</h4>
                    <p className="text-sm text-gray-600">Elite installation certification with extended warranty coverage</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Owens Corning Platinum Preferred</h4>
                    <p className="text-sm text-gray-600">Excellence in installation quality and customer service</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-red-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">IKO Shield Pro Contractor</h4>
                    <p className="text-sm text-gray-600">Specialized in premium roofing system installations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-orange-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">OSHA 30-Hour Safety Certification</h4>
                    <p className="text-sm text-gray-600">Comprehensive workplace safety and hazard recognition training</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-6 w-6 text-yellow-600 mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Colorado Licensed Contractor</h4>
                    <p className="text-sm text-gray-600">License #12345 - Fully bonded and insured for your protection</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Partnerships</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Material Suppliers</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Direct partnerships with leading manufacturers ensure access to the latest roofing technologies 
                    and premium materials designed for Colorado's challenging climate conditions.
                  </p>
                  <div className="text-sm text-gray-500">
                    GAF • CertainTeed • Owens Corning • IKO • Malarkey • Atlas
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Insurance Industry Partners</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Established relationships with major insurance providers streamline the claims process 
                    and ensure proper documentation for storm damage and emergency repairs.
                  </p>
                  <div className="text-sm text-gray-500">
                    State Farm • Allstate • USAA • Farmers • Progressive
                  </div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technology Integration</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Advanced technology partnerships enable precision measurements, detailed documentation, 
                    and enhanced project management capabilities.
                  </p>
                  <div className="text-sm text-gray-500">
                    EagleView • CompanyCam • Acculynx • JobNimbus
                  </div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Associations</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Active membership in industry organizations ensures ongoing education, adherence to 
                    best practices, and access to the latest industry developments.
                  </p>
                  <div className="text-sm text-gray-500">
                    NRCA • CRCA • BBB A+ Rating • HAAG Certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Community Commitment & Social Responsibility
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              As a Colorado-based company, we're deeply committed to giving back to the communities we serve. 
              Our social responsibility initiatives reflect our values and strengthen the bonds with our neighbors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">Veterans Support Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">
                  We honor our veterans through special discounts, priority emergency services, and partnerships 
                  with veteran organizations. Our "Roofs for Heroes" program provides assistance to veterans 
                  in need of roofing repairs or replacement.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>15% veteran discount on all services</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Priority emergency response</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Annual pro-bono veteran projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-900">Local Education Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  We support Colorado's educational institutions through scholarships, career education programs, 
                  and facility maintenance assistance. Our partnerships with local schools help develop the 
                  next generation of skilled construction professionals.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Annual trade scholarship program</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>High school career presentations</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Technical training partnerships</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                  <Mountain className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-900">Environmental Stewardship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 mb-4">
                  Our commitment to Colorado's natural beauty includes sustainable business practices, 
                  material recycling programs, and support for environmental conservation initiatives 
                  throughout our mountain communities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>95% material recycling rate</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Energy-efficient business operations</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Colorado conservation partnerships</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              The trust and satisfaction of our customers is the foundation of our success. 
              Here's what Colorado property owners are saying about their Alpine Peak experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-4">
                  "Alpine Peak exceeded every expectation. Their expertise with our mountain home's unique challenges 
                  was evident from day one. The team was professional, the materials top-quality, and the craftsmanship 
                  exceptional. Two years later, our roof still looks perfect despite harsh winters."
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Sarah & Michael Chen</p>
                  <p className="text-sm text-gray-600">Aspen Homeowners</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-4">
                  "When a severe hailstorm damaged our commercial property, Alpine Peak responded within hours. 
                  Their emergency team secured the building, worked directly with our insurance, and completed 
                  the restoration ahead of schedule. Outstanding service when we needed it most."
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Jennifer Martinez</p>
                  <p className="text-sm text-gray-600">Property Manager, Denver</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-4">
                  "The attention to detail and customer service was remarkable. Alpine Peak educated us throughout 
                  the process, provided regular updates, and delivered exactly what they promised. The new roof 
                  transformed our home's appearance and energy efficiency. Highly recommended!"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">Robert & Linda Thompson</p>
                  <p className="text-sm text-gray-600">Residential Customers, Lakewood</p>
                </div>
              </CardContent>
            </Card>
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
              Join thousands of satisfied customers who trust Alpine Peak Roofing for their most important 
              investment. Contact us today to discover why we're Colorado's premier roofing contractor.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8" asChild>
                <Link href="/estimator">Get Your Free Estimate</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              Licensed (#12345) • Bonded & Insured • GAF Master Elite • Available 24/7
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}