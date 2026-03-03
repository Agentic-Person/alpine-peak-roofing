import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import SiteImage, { HeroImage, PortfolioImagePair } from '@/components/SiteImage'
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
  MapPin
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-secondary">

      {/* Hero Section */}
      <HeroImage
        id="hero_home"
        className="h-[60vh]"
        overlay={true}
        overlayOpacity={0.4}
      >
        <div className="h-full flex flex-col justify-center items-center text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Pinnacle of Protection, Peak of Performance
            </h2>
            <p className="text-xl mb-8 leading-relaxed text-white">
              Professional roofing solutions for homes and businesses across the Denver metro area.
              Licensed, insured, and trusted by thousands of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-4 text-lg">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Call (970) 446-8995
              </Button>
            </div>
          </div>
        </div>
      </HeroImage>

      {/* Value Proposition Section */}
      <section className="py-16 bg-background-primary">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-around flex-wrap text-center">
            <div className="flex-1 min-w-[200px] max-w-[250px] mb-8 p-4">
              <div className="mb-4">
                <Shield className="h-16 w-16 mx-auto text-interactive-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Licensed & Insured</h3>
              <p className="text-text-secondary">Fully licensed and insured professionals protecting your investment.</p>
            </div>
            <div className="flex-1 min-w-[200px] max-w-[250px] mb-8 p-4">
              <div className="mb-4">
                <Award className="h-16 w-16 mx-auto text-interactive-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">25+ Years Experience</h3>
              <p className="text-text-secondary">Decades of roofing expertise serving the Denver metro area.</p>
            </div>
            <div className="flex-1 min-w-[200px] max-w-[250px] mb-8 p-4">
              <div className="mb-4">
                <Clock className="h-16 w-16 mx-auto text-interactive-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Emergency Service</h3>
              <p className="text-text-secondary">24/7 emergency repairs when you need us most.</p>
            </div>
            <div className="flex-1 min-w-[200px] max-w-[250px] mb-8 p-4">
              <div className="mb-4">
                <Star className="h-16 w-16 mx-auto text-interactive-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">5-Star Rated</h3>
              <p className="text-text-secondary">Trusted by thousands of satisfied customers across Colorado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-text-primary">Our Services</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From residential repairs to large commercial installations, we handle every roofing need with precision and care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background-primary border border-border-primary rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <Home className="h-12 w-12 mx-auto text-interactive-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Residential Roofing</h3>
              <p className="text-text-secondary mb-4">Complete roof replacement, repair, and maintenance for homes of all styles across the Denver metro.</p>
              <Link href="/services/residential" className="text-interactive-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
            <div className="bg-background-primary border border-border-primary rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <Building className="h-12 w-12 mx-auto text-interactive-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Commercial Roofing</h3>
              <p className="text-text-secondary mb-4">TPO, EPDM, and modified bitumen systems for flat and low-slope commercial roofs with minimal disruption.</p>
              <Link href="/services/commercial" className="text-interactive-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
            <div className="bg-background-primary border border-border-primary rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-12 w-12 mx-auto text-interactive-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Emergency Repairs</h3>
              <p className="text-text-secondary mb-4">24/7 storm damage response and emergency leak repairs to protect your property when it matters most.</p>
              <Link href="/services/emergency" className="text-interactive-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-background-primary text-center">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-text-primary">Featured Projects</h2>
          <div className="flex justify-around flex-wrap gap-6">
            <div className="bg-background-secondary border border-border-primary rounded-lg p-6 flex-1 min-w-[300px] max-w-[450px] shadow-sm text-left">
              <div className="relative aspect-[16/10] rounded-lg mb-4 overflow-hidden">
                <SiteImage
                  id="residential_victorian_after"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-text-primary">Victorian Home Roof Replacement</h4>
              <p className="text-text-secondary mb-4">Complete historic restoration with premium architectural shingles in Highlands Ranch. Perfect craftsmanship maintaining original character.</p>
              <Link href="/portfolio" className="text-interactive-primary font-semibold hover:underline">
                View Project Details →
              </Link>
            </div>
            <div className="bg-background-secondary border border-border-primary rounded-lg p-6 flex-1 min-w-[300px] max-w-[450px] shadow-sm text-left">
              <div className="relative aspect-[16/10] rounded-lg mb-4 overflow-hidden">
                <SiteImage
                  id="commercial_office_after"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-text-primary">Office Building TPO Installation</h4>
              <p className="text-text-secondary mb-4">Large-scale commercial project in downtown Denver. TPO membrane installation with 20-year warranty and enhanced energy efficiency.</p>
              <Link href="/portfolio" className="text-interactive-primary font-semibold hover:underline">
                View Project Details →
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-text-primary">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Alpine Peak did an incredible job on our roof replacement. Professional, on time, and the quality is outstanding. Highly recommended!",
                author: "Sarah Johnson",
                location: "Denver, CO",
                rating: 5
              },
              {
                text: "Fast response for our emergency leak repair. They had our roof fixed within hours and prevented major water damage to our home.",
                author: "Mike Rodriguez",
                location: "Lakewood, CO",
                rating: 5
              },
              {
                text: "Great communication throughout the entire process. Fair pricing, excellent workmanship, and they cleaned up perfectly when finished.",
                author: "Jennifer Chen",
                location: "Aurora, CO",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-background-primary border border-border-primary rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="font-semibold text-text-primary">{testimonial.author}</div>
                <div className="text-text-muted text-sm flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-background-primary text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-text-primary">Our Philosophy</h2>
          <p className="text-lg leading-relaxed mb-6 text-text-secondary max-w-3xl mx-auto">
            At Alpine Peak Roofing, we believe that your roof is more than just protection—it&apos;s peace of mind.
            Every project we undertake reflects our commitment to excellence, integrity, and lasting relationships with our clients.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-text-secondary max-w-3xl mx-auto">
            From emergency repairs to complete roof replacements, we approach each job with the same dedication to quality
            and customer satisfaction that has made us Colorado&apos;s trusted roofing partner for over 25 years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/estimator">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-background-secondary text-center">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-4 text-text-primary">Serving Colorado</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            From the Front Range to the mountains, we provide roofing services throughout Colorado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Denver', 'Aurora', 'Lakewood', 'Highlands Ranch', 'Littleton', 'Englewood', 'Vail', 'Aspen', 'Steamboat Springs', 'Telluride'].map((city) => (
              <span key={city} className="inline-flex items-center px-4 py-2 rounded-full bg-background-primary border border-border-primary text-text-secondary text-sm">
                <MapPin className="h-3 w-3 mr-1 text-interactive-primary" />
                {city}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/contact">
                Schedule a Free Inspection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
