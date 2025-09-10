import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Phone, 
  Mail,
  MapPin,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  Send,
  FileText,
  AlertTriangle,
  Home,
  Building,
  Star,
  Award,
  Calendar,
  Users,
  Bot,
  MessageSquare
} from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Alpine Peak Roofing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Get in touch for your free estimate, emergency service, or any questions about our roofing services
            </p>
            
            {/* Emergency Banner */}
            <div className="mt-8 p-4 bg-red-600 rounded-lg">
              <div className="flex items-center justify-center text-white">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span className="font-bold">EMERGENCY SERVICE:</span>
                <span className="ml-2 text-yellow-400 font-bold">(303) 555-ROOF</span>
                <span className="ml-2">- Available 24/7</span>
              </div>
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
            <span className="text-gray-900">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Emergency Contact */}
            <Card className="border-2 border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-red-800">Emergency Service</CardTitle>
                <CardDescription className="text-red-700">
                  24/7 Emergency Response
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <a href="tel:3035557663" className="text-2xl font-bold text-red-600 hover:text-red-700">
                    (303) 555-ROOF
                  </a>
                </div>
                <p className="text-red-700 text-sm mb-4">
                  Storm damage, leaks, structural issues - we respond immediately
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>

            {/* General Contact */}
            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">General Inquiries</CardTitle>
                <CardDescription>
                  Business hours and general questions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <a href="tel:3035557663" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                    (303) 555-ROOF
                  </a>
                </div>
                <div className="text-gray-600 text-sm mb-4 space-y-1">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Fri: 7am-7pm
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Sat-Sun: 8am-5pm
                  </div>
                </div>
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Main Line
                </Button>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Email Us</CardTitle>
                <CardDescription>
                  Detailed project inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <a href="mailto:info@alpinepeakroofing.com" className="text-lg font-semibold text-green-600 hover:text-green-700">
                    info@alpinepeakroofing.com
                  </a>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Send photos, project details, or questions for detailed responses
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Assistant Section */}
          <div className="mb-16">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 mx-auto mb-4">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-800">AI Chat Assistant</CardTitle>
                <CardDescription className="text-purple-700 text-lg">
                  Get instant answers about roofing, pricing, and scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-purple-700 mb-6 text-lg">
                  Our AI assistant can help you with instant estimates, answer common roofing questions, 
                  schedule appointments, and provide 24/7 support. Try asking about materials, 
                  costs, timelines, or emergency services!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-purple-600">Instant Quotes</div>
                    <div className="text-gray-600">Quick price estimates</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-purple-600">Material Info</div>
                    <div className="text-gray-600">Shingle types & options</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-purple-600">Scheduling</div>
                    <div className="text-gray-600">Book inspections</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="font-semibold text-purple-600">24/7 Support</div>
                    <div className="text-gray-600">Always available</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 mb-6 border border-purple-200">
                  <div className="text-left text-gray-700">
                    <div className="font-semibold mb-2 text-purple-600">Try asking:</div>
                    <div className="space-y-1 text-sm">
                      <div>• "How much does a roof replacement cost?"</div>
                      <div>• "What roofing materials do you recommend for Denver?"</div>
                      <div>• "Can you schedule an inspection this week?"</div>
                      <div>• "Do you handle insurance claims?"</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chat Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Forms Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Request Estimate Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <FileText className="h-6 w-6 text-blue-600 mr-2" />
                  Request Free Estimate
                </CardTitle>
                <CardDescription>
                  Get a detailed quote for your roofing project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <Input placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <Input placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <Input type="email" placeholder="john.doe@email.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <Input type="tel" placeholder="(303) 555-1234" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                    <Input placeholder="123 Main St, Denver, CO 80202" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select project type</option>
                      <option value="residential-replacement">Residential - Full Replacement</option>
                      <option value="residential-repair">Residential - Repair</option>
                      <option value="commercial-new">Commercial - New Installation</option>
                      <option value="commercial-replacement">Commercial - Replacement</option>
                      <option value="emergency">Emergency Repair</option>
                      <option value="inspection">Inspection Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      rows={4}
                      placeholder="Describe your roofing needs, any issues you've noticed, preferred materials, timeline, etc."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="insurance" className="mr-2" />
                    <label htmlFor="insurance" className="text-sm text-gray-600">
                      This may be an insurance claim
                    </label>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Request Free Estimate
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Or get an instant estimate with our{" "}
                    <Link href="/estimator" className="text-blue-600 hover:underline">
                      AI-powered estimator tool
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* General Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Mail className="h-6 w-6 text-green-600 mr-2" />
                  General Contact
                </CardTitle>
                <CardDescription>
                  Questions, consultations, or other inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <Input placeholder="Jane" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <Input placeholder="Smith" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <Input type="email" placeholder="jane.smith@email.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input type="tel" placeholder="(303) 555-1234" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">Select subject</option>
                      <option value="general-question">General Question</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="warranty">Warranty Question</option>
                      <option value="maintenance">Maintenance Program</option>
                      <option value="feedback">Feedback/Review</option>
                      <option value="partnership">Business Partnership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                      rows={6}
                      placeholder="How can we help you? Please provide as much detail as possible."
                      required
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Visit Our Office
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Stop by to discuss your project in person or meet with our team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Office Details */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                    Alpine Peak Roofing Headquarters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">
                      1234 Mountain View Drive<br />
                      Denver, CO 80202
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>7:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between font-semibold text-red-600">
                        <span>Emergency Service:</span>
                        <span>24/7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">What to Expect</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <Shield className="h-4 w-4 text-green-500 mr-2" />
                        Free consultations and estimates
                      </li>
                      <li className="flex items-center">
                        <Home className="h-4 w-4 text-green-500 mr-2" />
                        Material samples and displays
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 text-green-500 mr-2" />
                        Licensing and insurance documentation
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-green-500 mr-2" />
                        Portfolio of completed projects
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Office Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm">1234 Mountain View Drive, Denver, CO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Service Area
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Proudly serving the Denver metro area and surrounding communities
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { city: 'Denver', zip: '80202', popular: true },
              { city: 'Aurora', zip: '80011', popular: true },
              { city: 'Lakewood', zip: '80215', popular: true },
              { city: 'Thornton', zip: '80229', popular: false },
              { city: 'Arvada', zip: '80002', popular: true },
              { city: 'Westminster', zip: '80031', popular: false },
              { city: 'Centennial', zip: '80112', popular: false },
              { city: 'Boulder', zip: '80301', popular: true },
              { city: 'Broomfield', zip: '80020', popular: false },
              { city: 'Commerce City', zip: '80022', popular: false },
              { city: 'Northglenn', zip: '80233', popular: false },
              { city: 'Wheat Ridge', zip: '80033', popular: false },
              { city: 'Englewood', zip: '80110', popular: false },
              { city: 'Littleton', zip: '80120', popular: false },
              { city: 'Greenwood Village', zip: '80111', popular: false },
              { city: 'Parker', zip: '80134', popular: false }
            ].map((area) => (
              <div key={area.city} className={`text-center p-4 bg-white rounded-lg shadow-sm border ${area.popular ? 'border-blue-200 bg-blue-50' : ''}`}>
                <div className="flex items-center justify-center mb-2">
                  <MapPin className={`h-4 w-4 mr-1 ${area.popular ? 'text-blue-600' : 'text-gray-500'}`} />
                  <p className={`font-medium ${area.popular ? 'text-blue-900' : 'text-gray-900'}`}>
                    {area.city}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{area.zip}</p>
                {area.popular && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't see your area listed?{" "}
              <a href="tel:3035557663" className="text-blue-600 hover:underline font-medium">
                Call us at (303) 555-ROOF
              </a>{" "}
              - we may still be able to help!
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Claims Help */}
      <section className="py-16 sm:py-24 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Insurance Claims Assistance
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              We work directly with your insurance company to ensure fair settlements and proper documentation
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Documentation</h3>
                <p className="mt-2 text-blue-100 text-sm">Complete damage assessment and photo documentation</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Adjuster Meetings</h3>
                <p className="mt-2 text-blue-100 text-sm">We meet with your insurance adjuster on your behalf</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Claim Advocacy</h3>
                <p className="mt-2 text-blue-100 text-sm">We advocate for fair settlements and proper repairs</p>
              </div>
            </div>
            
            <div className="mt-10">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="mr-2 h-5 w-5" />
                Insurance Claim Help: (303) 555-ROOF
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}