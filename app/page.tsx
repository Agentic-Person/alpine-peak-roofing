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
    <div className="min-h-screen bg-background-secondary">{/* Changed to light gray background */}

      {/* Hero Section - Classic Style with Real Image */}
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
                Call (303) 555-ROOF
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

      {/* Featured Projects Section */}
      <section className="py-16 bg-background-secondary text-center">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-text-primary">Featured Projects</h2>
          <div className="flex justify-around flex-wrap gap-6">
            <div className="bg-background-primary border border-border-primary rounded-lg p-6 flex-1 min-w-[300px] max-w-[450px] shadow-sm text-left">
              <div className="aspect-[16/10] rounded-lg mb-4 overflow-hidden">
                <SiteImage 
                  id="residential_victorian_after" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-text-primary">Victorian Home Roof Replacement</h4>
              <p className="text-text-secondary mb-4">Complete historic restoration with premium architectural shingles in Highlands Ranch. Perfect craftsmanship maintaining original character.</p>
              <Link href="/portfolio" className="text-interactive-primary font-semibold hover:underline">
                View Project Details →
              </Link>
            </div>
            <div className="bg-background-primary border border-border-primary rounded-lg p-6 flex-1 min-w-[300px] max-w-[450px] shadow-sm text-left">
              <div className="aspect-[16/10] rounded-lg mb-4 overflow-hidden">
                <SiteImage 
                  id="commercial_office_after" 
                  className="w-full h-full object-cover"
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
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-background-primary text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-text-primary">Our Philosophy</h2>
          <p className="text-lg leading-relaxed mb-6 text-text-secondary max-w-3xl mx-auto">
            At Alpine Peak Roofing, we believe that your roof is more than just protection—it's peace of mind. 
            Every project we undertake reflects our commitment to excellence, integrity, and lasting relationships with our clients.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-text-secondary max-w-3xl mx-auto">
            From emergency repairs to complete roof replacements, we approach each job with the same dedication to quality 
            and customer satisfaction that has made us Colorado's trusted roofing partner for over 25 years.
          </p>
          <Button size="lg" asChild>
            <Link href="/about">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
