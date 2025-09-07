import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bot, 
  FileText, 
  Calculator, 
  Users, 
  Shield, 
  ArrowRight,
  Check
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Alpine Peak Roofing</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#automation" className="text-gray-600 hover:text-blue-600 transition-colors">Automation</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">Live Demo</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-blue-600">Pinnacle of Protection</span>
              <br />
              Peak of Performance
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Experience the future of roofing with our AI-powered automation platform. 
              From intelligent chatbots to instant estimates, we showcase cutting-edge 
              technology that transforms how roofing companies operate.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="px-8">
                See Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="h-96 w-96 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Four Revolutionary Automation Features
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Discover how AI and automation can transform your roofing business operations
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* AI Chatbot */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI-Powered Chatbot</CardTitle>
                <CardDescription>
                  Intelligent customer engagement with 24/7 lead qualification and appointment scheduling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Natural conversation flow
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Lead scoring & qualification
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    CRM integration
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Emergency routing
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  Try Chatbot
                </Button>
              </CardContent>
            </Card>

            {/* Automated Blogging */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Automated Blogging</CardTitle>
                <CardDescription>
                  SEO-optimized content generation with industry trends and local optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Biweekly content creation
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    SEO optimization
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Social media distribution
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Industry trend analysis
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  View Blog System
                </Button>
              </CardContent>
            </Card>

            {/* Roof Estimator */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Calculator className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Instant Roof Estimator</CardTitle>
                <CardDescription>
                  Google Maps integration for accurate measurements and instant pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Satellite measurements
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Material selection
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Instant pricing
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    PDF generation
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  Try Estimator
                </Button>
              </CardContent>
            </Card>

            {/* CRM & Lead Generation */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Lead Generation & CRM</CardTitle>
                <CardDescription>
                  Complete lead management with automated follow-ups and pipeline tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Multi-channel capture
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Automated follow-ups
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Pipeline management
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Analytics dashboard
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  View CRM
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powered by Modern Technology
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Built with cutting-edge tools and frameworks for maximum performance and scalability
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: 'Next.js 14', icon: '⚡' },
              { name: 'n8n Automation', icon: '🔄' },
              { name: 'OpenAI GPT-4', icon: '🤖' },
              { name: 'Google Maps API', icon: '🗺️' },
              { name: 'Supabase', icon: '💾' },
              { name: 'TypeScript', icon: '📝' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Vercel Hosting', icon: '🚀' }
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium text-gray-900">{tech.name}</div>
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
              Ready to Transform Your Roofing Business?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              See how our automation platform can increase your leads by 150+ monthly 
              while reducing operational costs by 60%.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Alpine Peak Roofing</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 Alpine Peak Roofing. Demonstration website showcasing automation capabilities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
