import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Search,
  FileText,
  Calendar,
  Hammer,
  CheckCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  MapPin,
  Shield,
  Clock,
  Award,
  Wrench,
  Eye,
  Clipboard,
  Settings,
  Star
} from 'lucide-react'

export default function ProcessPage() {
  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      subtitle: "Free Assessment & Discussion",
      duration: "1-2 hours",
      description: "We begin with a comprehensive consultation to understand your needs, assess your current roof condition, and discuss your goals and budget.",
      details: [
        "Free on-site inspection and assessment",
        "Discussion of your roofing needs and concerns", 
        "Budget and timeline planning",
        "Initial project scope definition",
        "Answer all your questions"
      ],
      aiIntegration: "Our AI chatbot can schedule consultations 24/7, and our instant estimator provides preliminary pricing",
      icon: Users,
      color: "blue"
    },
    {
      step: 2,
      title: "Detailed Assessment", 
      subtitle: "AI-Powered Inspection & Analysis",
      duration: "2-3 hours",
      description: "Using advanced drone technology and AI-powered damage detection, we conduct the most thorough roof inspection available in the industry.",
      details: [
        "High-resolution drone imagery capture",
        "AI-powered damage detection and analysis",
        "Structural integrity evaluation",
        "Material condition assessment",
        "Hidden damage identification"
      ],
      aiIntegration: "State-of-the-art AI technology detects issues invisible to the naked eye, ensuring nothing is missed",
      icon: Search,
      color: "green"
    },
    {
      step: 3,
      title: "Detailed Proposal",
      subtitle: "Comprehensive Quote & Planning", 
      duration: "24-48 hours",
      description: "We provide a detailed, transparent proposal with material options, timeline, and pricing. No hidden fees, no surprises.",
      details: [
        "Detailed scope of work breakdown",
        "Material selection and specifications",
        "Transparent pricing with line items",
        "Project timeline and milestones", 
        "Warranty and guarantee information"
      ],
      aiIntegration: "Our automated systems generate accurate estimates and proposals, reducing wait times for customers",
      icon: FileText,
      color: "orange"
    },
    {
      step: 4,
      title: "Project Planning",
      subtitle: "Permits, Materials & Scheduling",
      duration: "3-7 days", 
      description: "Once approved, we handle all the logistics - permits, material ordering, scheduling, and coordination to ensure a smooth installation.",
      details: [
        "Building permit acquisition and filing",
        "Material ordering and delivery scheduling",
        "Project timeline coordination",
        "Weather contingency planning",
        "Property protection preparation"
      ],
      aiIntegration: "Intelligent scheduling systems optimize crew deployment and material delivery for maximum efficiency",
      icon: Calendar,
      color: "purple"
    },
    {
      step: 5,
      title: "Professional Installation",
      subtitle: "Expert Craftsmanship & Safety",
      duration: "1-5 days",
      description: "Our experienced crews perform the installation with meticulous attention to quality, safety, and minimizing disruption to your daily life.",
      details: [
        "Daily safety briefings and protocols",
        "Systematic removal and installation process",
        "Quality checkpoints at each phase",
        "Real-time progress communication", 
        "Thorough daily cleanup"
      ],
      aiIntegration: "Project management software tracks progress in real-time, keeping you informed every step of the way",
      icon: Hammer,
      color: "red"
    },
    {
      step: 6,
      title: "Final Inspection & Completion",
      subtitle: "Quality Assurance & Warranty",
      duration: "1-2 hours",
      description: "We conduct a thorough final inspection, complete cleanup, and provide you with all documentation and warranty information.",
      details: [
        "Comprehensive quality inspection",
        "Complete property cleanup and debris removal", 
        "Final walkthrough with homeowner",
        "Warranty registration and documentation",
        "Maintenance schedule and guidelines"
      ],
      aiIntegration: "Digital warranty registration and maintenance reminders ensure long-term protection and care",
      icon: CheckCircle,
      color: "green"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Roofing Process
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              A systematic approach to delivering exceptional roofing solutions with transparency, quality, and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Our Process</span>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transparent & Professional Process
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              At Alpine Peak Roofing, we believe that a transparent and well-defined process is the key to a successful roofing project. 
              We have developed a streamlined process that is designed to keep you informed and involved every step of the way.
            </p>
          </div>

          {/* Process Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Step Process</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Transparent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Communication</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">AI</div>
              <div className="text-gray-600">Enhanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Step-by-Step Process
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              From initial consultation to final inspection, here's exactly what to expect
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>

            {processSteps.map((step, index) => (
              <div key={step.step} className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}>
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" style={{ [index % 2 === 0 ? 'right' : 'left']: '-2rem' }}></div>
                
                <Card className={`group hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-${step.color}-100 mr-4`}>
                          <step.icon className={`h-6 w-6 text-${step.color}-600`} />
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full bg-${step.color}-600 text-white mr-3`}>
                              Step {step.step}
                            </span>
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{step.duration}</span>
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-blue-600">
                            {step.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* What We Do */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Clipboard className="h-4 w-4 mr-2" />
                          What We Do
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* AI Integration */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          AI Enhancement
                        </h4>
                        <p className="text-sm text-blue-800">
                          {step.aiIntegration}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Checkpoints */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Quality Checkpoints
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              We maintain the highest standards through systematic quality controls at every phase
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Installation Inspection</h3>
              <p className="text-gray-600 text-sm">Verify all materials and conditions before work begins</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Wrench className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation Monitoring</h3>
              <p className="text-gray-600 text-sm">Continuous quality checks during installation process</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Quality Review</h3>
              <p className="text-gray-600 text-sm">Comprehensive inspection before project completion</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Approval</h3>
              <p className="text-gray-600 text-sm">Final walkthrough and customer satisfaction confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Promise */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Always Informed, Never Surprised
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Communication is at the heart of our process. From project start to completion, 
                you'll always know what's happening, when it's happening, and what to expect next.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Phone className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Communication</h3>
                    <p className="text-gray-600">Our AI chatbot provides instant answers anytime</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-Time Updates</h3>
                    <p className="text-gray-600">Daily progress reports and milestone notifications</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="h-6 w-6 text-orange-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparent Pricing</h3>
                    <p className="text-gray-600">No hidden fees or surprise charges ever</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Customer Communication</p>
                <p className="text-sm">Always Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Customers Say About Our Process
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                text: "The entire process was transparent from start to finish. I always knew what was happening and when. The AI inspection was incredibly detailed!",
                author: "Sarah Johnson",
                location: "Denver, CO",
                project: "Residential Roof Replacement"
              },
              {
                text: "Alpine Peak's systematic approach gave us confidence. Every step was explained clearly and executed perfectly. Best roofing experience ever!",
                author: "Mike Rodriguez", 
                location: "Lakewood, CO",
                project: "Emergency Storm Repair"
              },
              {
                text: "The communication was outstanding. The project manager kept us informed daily, and the instant estimator made the initial process so easy.",
                author: "Jennifer Chen",
                location: "Aurora, CO",
                project: "Commercial TPO Installation"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {testimonial.location}
                    </div>
                    <div className="text-blue-600 text-sm font-medium mt-1">
                      {testimonial.project}
                    </div>
                  </div>
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
              Ready to Experience Our Process?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Start with a free consultation and see why Denver homeowners trust our systematic approach to roofing excellence.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8" asChild>
                <Link href="/estimator">
                  Start with Free Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}