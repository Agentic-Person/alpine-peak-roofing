'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  ArrowRight,
  Check,
  Phone,
  Star,
  Wrench,
  Home,
  Building,
  Zap,
  Award,
  Clock,
  Users,
  MapPin,
  Bot,
  FileText,
  Calculator
} from 'lucide-react'

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    '/images/heroes/hero-roofers-001.png',
    '/images/heroes/hero-roofers-002.png',
    '/images/heroes/hero-roofers-003.png',
    '/images/heroes/hero-roofers-004.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div className="min-h-screen bg-white dark:bg-[#003399]">

      {/* Hero Section */}
      <section className="relative py-24 sm:py-36 bg-gradient-to-b from-[#0066CC] to-[#003399] text-white overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                <span className="text-yellow-400">The Labor Equation</span>
                <br />
                Solved.
              </h1>
              <p className="mt-6 text-2xl leading-10 text-blue-100">
                Agentic workflows solve the toughest equation in roofing—cutting admin costs so you can pay for the best on the roof.
              </p>
              <div className="mt-8 flex justify-start">
                <Button 
                  className="bg-gradient-to-r from-[#9333EA] to-[#213FB0] text-white border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 px-8 py-3 text-lg font-semibold hover:shadow-lg"
                  onClick={() => {
                    const chatWidget = document.querySelector('[aria-label*="Chat"]') || document.querySelector('[data-testid*="chat"]');
                    if (chatWidget) {
                      (chatWidget as HTMLElement).click();
                    }
                  }}
                >
                  Chat with our AI
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Hero Image Slideshow */}
              <div className="aspect-[4/3] rounded-lg shadow-2xl overflow-hidden relative border-2 border-white backdrop-blur-sm bg-white/5">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Alpine Peak Roofing Professional Project ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
                
                {/* Slideshow indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-yellow-400 scale-110'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-white/5 opacity-20"></div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-[#003399] to-[#0066CC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#FFCC00' }}>
              Intelligent Automations for Roofing Contractors
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white font-bold">
              Utilize Agentic workflows to streamline admin, freeing up capital so you can pay your roofing crews what they deserve.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
            {/* AI-Powered Chatbot System */}
            <Link href="/ai-tools" className="block">
              <Card className="group relative overflow-hidden bg-white/85 backdrop-blur-sm border border-white/30 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-3 hover:bg-white/95 h-[690px] transform hover:rotate-x-2 hover:rotate-y-1 perspective-1000 cursor-pointer
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/8 before:via-transparent before:to-purple-500/8 before:opacity-60 hover:before:opacity-100 before:transition-opacity before:duration-500
                after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000">
              {/* Holographic border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Image at top */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg overflow-hidden">
                <Image
                  src="/images/ai-tools/chatbot-card.png"
                  alt="AI Chatbot Interface showing conversational flow and automation"
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center">
                  <Bot className="h-6 w-6 text-blue-600 mr-2" />
                  AI-Powered Chatbot System
                </CardTitle>
                <CardDescription className="text-blue-600 font-semibold">
                  24/7 Customer Engagement & Lead Qualification
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-6">
                <p className="text-black text-sm mb-4">
                  Our intelligent chatbot operates around the clock, engaging with visitors, qualifying leads, 
                  and scheduling appointments with human-like conversation flow.
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-blue-600">15+</div>
                    <div className="text-blue-800 text-xs">Qualified leads monthly</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-blue-600">85%</div>
                    <div className="text-blue-800 text-xs">Lead qualification accuracy</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-black mb-4">
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    24/7 availability with instant responses
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Natural conversation flow and roofing expertise
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Automatic lead scoring and CRM integration
                  </li>
                </ul>
                
                <div className="mt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg border-2 border-yellow-400 hover:border-yellow-300 transition-colors duration-200 pointer-events-none">
                    Learn More
                  </button>
                </div>
              </CardContent>
              </Card>
            </Link>

            {/* Automated Blog Content System */}
            <Link href="/ai-tools" className="block">
              <Card className="group relative overflow-hidden bg-white/85 backdrop-blur-sm border border-white/30 shadow-xl shadow-green-500/10 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-3 hover:bg-white/95 h-[690px] transform hover:rotate-x-2 hover:rotate-y-1 perspective-1000 cursor-pointer
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/8 before:via-transparent before:to-blue-500/8 before:opacity-60 hover:before:opacity-100 before:transition-opacity before:duration-500
                after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000">
              {/* Holographic border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Image at top */}
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg overflow-hidden">
                <Image
                  src="/images/ai-tools/autoblog-card.png"
                  alt="Automated Blog Content Generation System with SEO optimization"
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center">
                  <FileText className="h-6 w-6 text-green-600 mr-2" />
                  Automated Blog Content System
                </CardTitle>
                <CardDescription className="text-green-600 font-semibold">
                  SEO-Optimized Content Generation
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-6">
                <p className="text-black text-sm mb-4">
                  Our content automation system generates high-quality, SEO-optimized blog posts about roofing topics, 
                  local Denver weather patterns, and industry trends.
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-green-600">$0.72</div>
                    <div className="text-green-800 text-xs">Cost per blog post</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-green-600">5+</div>
                    <div className="text-green-800 text-xs">Leads per week average</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-black mb-4">
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    2-3 posts published weekly automatically
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Local Denver SEO optimization
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Industry trend analysis and integration
                  </li>
                </ul>
                
                <div className="mt-4">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg border-2 border-yellow-400 hover:border-yellow-300 transition-colors duration-200 pointer-events-none">
                    Learn More
                  </button>
                </div>
              </CardContent>
              </Card>
            </Link>

            {/* Instant Roof Estimator */}
            <Link href="/ai-tools" className="block">
              <Card className="group relative overflow-hidden bg-white/85 backdrop-blur-sm border border-white/30 shadow-xl shadow-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-3 hover:bg-white/95 h-[690px] transform hover:rotate-x-2 hover:rotate-y-1 perspective-1000 cursor-pointer
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/8 before:via-transparent before:to-red-500/8 before:opacity-60 hover:before:opacity-100 before:transition-opacity before:duration-500
                after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000">
              {/* Holographic border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Image at top */}
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg overflow-hidden">
                <Image
                  src="/images/ai-tools/roofestimator-card.png"
                  alt="Instant Roof Estimator with satellite imagery and AI measurement technology"
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center">
                  <Calculator className="h-6 w-6 text-orange-600 mr-2" />
                  Instant Roof Estimator
                </CardTitle>
                <CardDescription className="text-orange-600 font-semibold">
                  AI-Powered Satellite Measurement Technology
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-6">
                <p className="text-black text-sm mb-4">
                  Revolutionary technology that provides accurate roof estimates in just 3 minutes using Google Maps 
                  satellite imagery, AI measurement algorithms, and real-time material pricing.
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-orange-600">3</div>
                    <div className="text-orange-800 text-xs">Minutes for estimate</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-orange-600">95%</div>
                    <div className="text-orange-800 text-xs">Accuracy rate</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-black mb-4">
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Satellite imagery analysis and measurement
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Real-time material pricing integration
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-3 w-3 text-green-500" />
                    Multiple material options and pricing tiers
                  </li>
                </ul>
                
                <div className="mt-4">
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg border-2 border-yellow-400 hover:border-yellow-300 transition-colors duration-200 pointer-events-none">
                    Learn More
                  </button>
                </div>
              </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>


      {/* Customer Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0066CC] to-[#003399]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                text: "Alpine Peak did an amazing job on our roof replacement. Professional, on time, and the quality is outstanding. Highly recommended!",
                author: "Sarah Johnson",
                location: "Denver, CO",
                rating: 5
              },
              {
                text: "Fast response for our emergency leak repair. They had our roof fixed within hours and prevented major water damage.",
                author: "Mike Rodriguez",
                location: "Lakewood, CO", 
                rating: 5
              },
              {
                text: "Great communication throughout the entire process. The instant estimate tool was incredibly accurate and convenient.",
                author: "Jennifer Chen",
                location: "Aurora, CO",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
