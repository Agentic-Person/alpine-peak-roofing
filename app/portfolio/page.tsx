import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Home, 
  Building,
  Zap,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  Phone,
  Filter,
  Eye,
  Award,
  Clock
} from 'lucide-react'

export default function PortfolioPage() {
  // Mock project data - in a real app, this would come from a database
  const projects = [
    {
      id: 1,
      title: "Victorian Home Roof Replacement",
      location: "Denver, CO",
      category: "Residential",
      subCategory: "Shingle Roofing",
      material: "Architectural Shingles",
      duration: "3 days",
      season: "Fall 2024",
      description: "Complete tear-off and replacement of a historic Victorian home's roof with premium architectural shingles.",
      testimonial: "Alpine Peak did an incredible job restoring our 1890s Victorian home. The attention to detail was outstanding and they matched the original style perfectly.",
      customerName: "Sarah & Michael Johnson",
      rating: 5,
      beforeImage: "Victorian house before roofing",
      afterImage: "Beautiful Victorian house with new roof",
      features: ["Historic Preservation", "Premium Materials", "Custom Color Match", "Detailed Trim Work"]
    },
    {
      id: 2,
      title: "Office Complex TPO Installation",
      location: "Lakewood, CO", 
      category: "Commercial",
      subCategory: "TPO",
      material: "TPO Membrane",
      duration: "1 week",
      season: "Summer 2024",
      description: "New TPO membrane installation on a 15,000 sq ft office building with energy-efficient white membrane.",
      testimonial: "Professional installation with minimal disruption to our business operations. The energy savings are already noticeable.",
      customerName: "Denver Business Park",
      rating: 5,
      beforeImage: "Office building with old roof",
      afterImage: "Modern office building with white TPO roof",
      features: ["Energy Efficient", "Large Scale", "Business Continuity", "Warranty Included"]
    },
    {
      id: 3,
      title: "Hail Storm Damage Restoration",
      location: "Aurora, CO",
      category: "Storm Damage", 
      subCategory: "Emergency",
      material: "Impact-Resistant Shingles",
      duration: "2 days",
      season: "Spring 2024",
      description: "Emergency hail damage repair and complete roof replacement with impact-resistant materials.",
      testimonial: "They responded within hours of our call and had our roof completely restored in just two days. Insurance process was seamless.",
      customerName: "Mark & Lisa Rodriguez",
      rating: 5,
      beforeImage: "Hail damaged roof",
      afterImage: "Fully restored roof with impact-resistant shingles",
      features: ["Emergency Response", "Insurance Coordination", "Impact Resistant", "Quick Completion"]
    },
    {
      id: 4,
      title: "Standing Seam Metal Roof",
      location: "Boulder, CO",
      category: "Residential",
      subCategory: "Metal Roofing", 
      material: "Standing Seam Steel",
      duration: "4 days",
      season: "Fall 2024",
      description: "Premium standing seam metal roof installation on a contemporary mountain home.",
      testimonial: "The metal roof looks stunning and we love knowing it will last for decades. The team was professional and clean.",
      customerName: "Jennifer & David Chen",
      rating: 5,
      beforeImage: "Contemporary home before metal roof",
      afterImage: "Contemporary home with sleek metal roof",
      features: ["50+ Year Lifespan", "Energy Efficient", "Mountain Weather Resistant", "Modern Design"]
    },
    {
      id: 5,
      title: "Warehouse Built-Up Roofing",
      location: "Commerce City, CO",
      category: "Commercial",
      subCategory: "Built-Up Roofing",
      material: "Modified Bitumen",
      duration: "5 days", 
      season: "Summer 2024",
      description: "Complete built-up roofing system replacement on a 25,000 sq ft industrial warehouse.",
      testimonial: "Excellent work on our warehouse roof. They worked efficiently and the quality is top-notch.",
      customerName: "Rocky Mountain Industrial",
      rating: 5,
      beforeImage: "Industrial warehouse with deteriorated roof",
      afterImage: "Warehouse with new built-up roofing system",
      features: ["Industrial Grade", "Puncture Resistant", "Long-Term Durability", "Cost Effective"]
    },
    {
      id: 6,
      title: "Historic Church Restoration",
      location: "Westminster, CO",
      category: "Residential",
      subCategory: "Specialty",
      material: "Slate Tiles",
      duration: "2 weeks",
      season: "Spring 2024", 
      description: "Careful restoration of a 1920s church roof using traditional slate materials and techniques.",
      testimonial: "Their expertise in historic restoration is unmatched. The church looks exactly as it did 100 years ago.",
      customerName: "Westminster Community Church",
      rating: 5,
      beforeImage: "Historic church with damaged slate roof",
      afterImage: "Beautifully restored church with new slate roof",
      features: ["Historic Preservation", "Traditional Methods", "Authentic Materials", "Craftsmanship Excellence"]
    }
  ]

  const categories = [
    'All Projects',
    'Residential', 
    'Commercial',
    'Storm Damage',
    'Metal Roofing',
    'Shingle Roofing'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Portfolio
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Showcasing quality craftsmanship across the Denver metro area
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
            <span className="text-gray-900">Portfolio</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Filter Projects</h2>
            <div className="flex items-center text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm">{projects.length} Projects</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Before/After Images */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex">
                    {/* Before Image */}
                    <div className="w-1/2 flex items-center justify-center bg-red-50">
                      <div className="text-center text-gray-500">
                        <Home className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-xs">BEFORE</p>
                      </div>
                    </div>
                    {/* After Image */}
                    <div className="w-1/2 flex items-center justify-center bg-green-50">
                      <div className="text-center text-gray-500">
                        <Home className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-xs">AFTER</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.season}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Material:</span>
                      <br />
                      {project.material}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span>
                      <br />
                      {project.duration}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 2 && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        +{project.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Customer Testimonial */}
                  <blockquote className="text-sm text-gray-600 italic border-l-2 border-blue-200 pl-3 mb-3">
                    "{project.testimonial.substring(0, 80)}..."
                  </blockquote>
                  <p className="text-xs text-gray-500 mb-4">
                    - {project.customerName}
                  </p>

                  <Button className="w-full group-hover:bg-blue-700">
                    View Project Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              By the Numbers
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Our track record of excellence speaks for itself
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Serving the Denver Metro Area
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Quality roofing projects across Colorado's Front Range
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { city: 'Denver', projectCount: 125 },
              { city: 'Aurora', projectCount: 89 },
              { city: 'Lakewood', projectCount: 67 },
              { city: 'Thornton', projectCount: 54 },
              { city: 'Arvada', projectCount: 43 },
              { city: 'Westminster', projectCount: 38 },
              { city: 'Centennial', projectCount: 32 },
              { city: 'Boulder', projectCount: 29 }
            ].map((area) => (
              <div key={area.city} className="text-center p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                  <p className="font-medium text-gray-900">{area.city}</p>
                </div>
                <p className="text-sm text-gray-600">{area.projectCount} projects</p>
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
              Ready to Add Your Project to Our Portfolio?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Join hundreds of satisfied customers who have trusted Alpine Peak Roofing with their most important investment.
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