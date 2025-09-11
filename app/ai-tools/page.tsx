import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bot, 
  FileText,
  Calculator,
  Users,
  ArrowRight,
  Check,
  Phone,
  ChevronRight,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Eye,
  Award,
  Rocket
} from 'lucide-react'

export default function IntelligentRoofingAutomationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Intelligent Roofing Automations
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-purple-100">
              See How We Deliver Superior Service Through Innovation
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-purple-200">
              Alpine Peak Roofing leverages four revolutionary AI-powered automation features to deliver 
              faster, smarter, and more efficient roofing solutions than any competitor in the market.
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
            <span className="text-gray-900">AI Tools</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900">Intelligent Roofing Automations</span>
          </div>
        </div>
      </section>

      {/* ROI Overview */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Numbers Don't Lie
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Our AI automation platform delivers measurable results that transform roofing business operations
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600 text-sm">Qualified leads monthly</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600 text-sm">Lead qualification accuracy</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
              <div className="text-gray-600 text-sm">Operational cost reduction</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm">Estimate accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            
            {/* AI-Powered Chatbot System */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mr-4">
                    <Bot className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🤖 AI-Powered Chatbot System</h3>
                    <p className="text-blue-600 font-semibold">24/7 Customer Engagement & Lead Qualification</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Our intelligent chatbot operates around the clock, engaging with visitors, qualifying leads, 
                  and scheduling appointments with human-like conversation flow. It understands roofing terminology, 
                  emergency situations, and customer needs with remarkable accuracy.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">150+</div>
                    <div className="text-blue-800 text-sm">Qualified leads monthly</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-blue-800 text-sm">Lead qualification accuracy</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    24/7 availability with instant responses
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Natural conversation flow and roofing expertise
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Automatic lead scoring and CRM integration
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Emergency routing and priority scheduling
                  </li>
                </ul>

                <Button className="mr-4" asChild>
                  <Link href="/chatbot-demo">Try Live Demo</Link>
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Chat Now
                </Button>
              </div>

              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-blue-700">
                  <Bot className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-semibold">AI Chatbot Interface</p>
                  <p className="text-sm">Interactive Demo Available</p>
                </div>
              </div>
            </div>

            {/* Automated Blog Content System */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-green-700">
                  <FileText className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Content Generation System</p>
                  <p className="text-sm">SEO-Optimized Blog Posts</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mr-4">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">📝 Automated Blog Content System</h3>
                    <p className="text-green-600 font-semibold">SEO-Optimized Content Generation</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Our content automation system generates high-quality, SEO-optimized blog posts about roofing topics, 
                  local Denver weather patterns, and industry trends. Each post is designed to rank well and drive 
                  organic traffic to generate qualified leads.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$11.72</div>
                    <div className="text-green-800 text-sm">Cost per blog post</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">5+</div>
                    <div className="text-green-800 text-sm">Leads per post average</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    2-3 posts published weekly automatically
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Local Denver SEO optimization
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Industry trend analysis and integration
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Social media distribution automation
                  </li>
                </ul>

                <Button className="mr-4" asChild>
                  <Link href="/blog">View Generated Content</Link>
                </Button>
                <Button variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  SEO Performance
                </Button>
              </div>
            </div>

            {/* Instant Roof Estimator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mr-4">
                    <Calculator className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🏠 Instant Roof Estimator</h3>
                    <p className="text-orange-600 font-semibold">AI-Powered Satellite Measurement Technology</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Revolutionary technology that provides accurate roof estimates in just 30 seconds using Google Maps 
                  satellite imagery, AI measurement algorithms, and real-time material pricing. Customers get instant 
                  gratification while we capture high-quality leads.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">30</div>
                    <div className="text-orange-800 text-sm">Seconds for estimate</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">95%</div>
                    <div className="text-orange-800 text-sm">Accuracy rate</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Satellite imagery analysis and measurement
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Real-time material pricing integration
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Multiple material options and pricing tiers
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    PDF generation and email delivery
                  </li>
                </ul>

                <Button className="mr-4" asChild>
                  <Link href="/estimator">Try Estimator Now</Link>
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Sample Report
                </Button>
              </div>

              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-orange-700">
                  <Calculator className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Instant Estimator Tool</p>
                  <p className="text-sm">30-Second Estimates</p>
                </div>
              </div>
            </div>

            {/* Lead Generation & CRM System */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-purple-700">
                  <Users className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-semibold">CRM Dashboard</p>
                  <p className="text-sm">Lead Management System</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mr-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🎯 Lead Generation & CRM System</h3>
                    <p className="text-purple-600 font-semibold">Automated Pipeline Management</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Complete lead management system with intelligent scoring, automated follow-ups, and pipeline tracking. 
                  Every interaction is captured, analyzed, and acted upon to maximize conversion rates and customer satisfaction.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">30%</div>
                    <div className="text-purple-800 text-sm">Conversion rate</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">15</div>
                    <div className="text-purple-800 text-sm">Minute response time</div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Multi-channel lead capture and integration
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Intelligent lead scoring and prioritization
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Automated follow-up sequences and reminders
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Real-time analytics and performance dashboards
                  </li>
                </ul>

                <Button className="mr-4">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Dashboard Demo
                </Button>
                <Button variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Lead Scoring Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Calculate Your ROI
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              See how these automation tools can transform your roofing business
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Business Impact Calculator</CardTitle>
              <CardDescription>
                Estimate the potential impact of our AI automation platform on your roofing business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Side */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Metrics</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Leads</label>
                    <input type="number" placeholder="50" className="w-full p-3 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
                    <input type="number" placeholder="15" className="w-full p-3 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Job Value ($)</label>
                    <input type="number" placeholder="8000" className="w-full p-3 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Marketing Spend ($)</label>
                    <input type="number" placeholder="5000" className="w-full p-3 border border-gray-300 rounded-md" />
                  </div>
                </div>

                {/* Results Side */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected with AI Automation</h3>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Monthly Leads</span>
                      <span className="text-xl font-bold text-green-600">150+</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">+200% increase with AI chatbot</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                      <span className="text-xl font-bold text-blue-600">30%</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">Improved with instant estimates</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Monthly Revenue</span>
                      <span className="text-xl font-bold text-purple-600">$360K+</span>
                    </div>
                    <p className="text-xs text-purple-700 mt-1">3x revenue increase potential</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Marketing ROI</span>
                      <span className="text-xl font-bold text-orange-600">7200%</span>
                    </div>
                    <p className="text-xs text-orange-700 mt-1">Reduced cost per lead</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Detailed ROI Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Inquiry Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Interested in These Tools for Your Roofing Business?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Transform your roofing business with our proven AI automation platform. 
              Join industry leaders who are already seeing 3x revenue growth.
            </p>
            
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Proven Results</h3>
                <p className="mt-2 text-blue-100 text-sm">150+ leads monthly, 85% accuracy rates</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Quick Implementation</h3>
                <p className="mt-2 text-blue-100 text-sm">Full setup and training in 2-4 weeks</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Ongoing Support</h3>
                <p className="mt-2 text-blue-100 text-sm">Dedicated support and optimization team</p>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Request Demo
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Get Pricing
                </Button>
              </div>
            </div>

            <div className="mt-8 text-blue-100 text-sm">
              <p>🏆 Used by 200+ roofing contractors nationwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}