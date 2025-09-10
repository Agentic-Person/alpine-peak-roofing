import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ClipboardCheck, 
  Search, 
  FileText, 
  Calendar, 
  Truck, 
  CheckCircle, 
  Phone, 
  Shield,
  Target,
  Camera,
  Settings,
  Award,
  Clock,
  Users,
  Star,
  MapPin,
  Wrench,
  Building,
  Gauge,
  ThumbsUp,
  AlertCircle,
  BadgeCheck,
  Zap,
  Home,
  TrendingUp,
  Globe,
  HeadphonesIcon
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Alpine Peak Roofing Process - Step-by-Step Colorado Roofing Installation & Repair Methodology',
  description: 'Discover Alpine Peak Roofing\'s comprehensive 8-step process for residential and commercial roofing projects in Colorado. From initial consultation to final inspection, ensuring quality at every stage.',
  keywords: 'roofing process Colorado, roof installation steps, roofing methodology Denver, quality assurance roofing, project management roofing, Colorado roofing contractors process',
  openGraph: {
    title: 'Our Proven Roofing Process | Quality Assurance from Start to Finish',
    description: 'Detailed look at Alpine Peak Roofing\'s systematic approach to roofing projects, ensuring superior results and customer satisfaction across Colorado.',
  }
}

export default function ProcessComprehensivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Our Proven Roofing Process
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-blue-100">
              Alpine Peak Roofing's systematic 8-step methodology ensures exceptional results on every project. 
              From initial consultation through final inspection, our comprehensive process combines expert 
              craftsmanship, premium materials, and meticulous attention to detail to deliver roofing solutions 
              that exceed expectations and withstand Colorado's challenging climate.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Start Your Project: (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Quality at Every Step
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our systematic approach ensures consistent, superior results while providing complete transparency 
              and clear communication throughout your roofing project. Each step is designed with quality 
              checkpoints and customer approval processes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600 text-sm">Comprehensive property evaluation and needs analysis</p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600 text-sm">Detailed project planning and material specification</p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Execution</h3>
              <p className="text-gray-600 text-sm">Expert installation with continuous quality monitoring</p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completion</h3>
              <p className="text-gray-600 text-sm">Final inspection and customer satisfaction verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            
            {/* Step 1: Initial Consultation */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mr-4">
                    <span className="text-xl font-bold text-blue-600">01</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Initial Consultation & Assessment</h3>
                    <p className="text-blue-600 font-medium">Setting the Foundation for Success</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Every successful roofing project begins with thorough understanding of your needs, property 
                  characteristics, and specific challenges. Our comprehensive consultation process involves 
                  detailed property assessment, needs analysis, and educational discussion about roofing 
                  options suitable for Colorado's climate.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Property Evaluation</h4>
                      <p className="text-sm text-gray-600">Complete exterior inspection, structural assessment, and existing roof condition analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Needs Discovery</h4>
                      <p className="text-sm text-gray-600">Understanding your goals, timeline, budget considerations, and specific requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Education & Options</h4>
                      <p className="text-sm text-gray-600">Detailed explanation of material options, benefits, and recommendations for your situation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Initial Documentation</h4>
                      <p className="text-sm text-gray-600">Photographic documentation and preliminary measurements for accurate planning</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">What to Expect</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-blue-800">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span><strong>Duration:</strong> 45-90 minutes on-site consultation</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span><strong>Team:</strong> Senior estimator and project consultant</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <Camera className="h-4 w-4 text-blue-600 mr-2" />
                    <span><strong>Documentation:</strong> Comprehensive photo and measurement record</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-800">
                    <FileText className="h-4 w-4 text-blue-600 mr-2" />
                    <span><strong>Deliverables:</strong> Detailed consultation report and recommendations</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">Free Consultation Includes:</p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Complete roof and structural assessment</li>
                    <li>• Material recommendations and samples</li>
                    <li>• Preliminary cost estimates</li>
                    <li>• Timeline and process overview</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Detailed Inspection */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 bg-green-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-green-900 mb-4">Advanced Inspection Technology</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-green-900 mb-2">Drone Inspection Services</h5>
                    <p className="text-sm text-green-800">
                      High-resolution aerial photography and thermal imaging for comprehensive roof assessment 
                      without safety risks or property damage from traditional inspection methods.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-green-900 mb-2">Moisture Detection Technology</h5>
                    <p className="text-sm text-green-800">
                      Advanced infrared scanning to identify hidden moisture infiltration, insulation issues, 
                      and potential structural concerns not visible during standard inspections.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-green-900 mb-2">Structural Engineering Assessment</h5>
                    <p className="text-sm text-green-800">
                      Professional evaluation of load-bearing capacity, especially critical for Colorado's 
                      heavy snow loads and wind resistance requirements in mountain regions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mr-4">
                    <span className="text-xl font-bold text-green-600">02</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Comprehensive Technical Inspection</h3>
                    <p className="text-green-600 font-medium">Advanced Assessment & Documentation</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our detailed technical inspection goes beyond surface-level assessment to provide complete 
                  understanding of your roof's condition, structural integrity, and performance capabilities. 
                  Using advanced technology and expert analysis, we create a comprehensive baseline for 
                  project planning and execution.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Structural Analysis</h4>
                      <p className="text-sm text-gray-600">Complete evaluation of roof deck, support structures, and load-bearing capacity</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Weather Resistance Assessment</h4>
                      <p className="text-sm text-gray-600">Analysis of current weatherproofing and identification of vulnerability points</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Ventilation Evaluation</h4>
                      <p className="text-sm text-gray-600">Airflow assessment and insulation performance for energy efficiency optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Detailed Measurements</h4>
                      <p className="text-sm text-gray-600">Precise calculations for material requirements and waste minimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Project Design & Planning */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mr-4">
                    <span className="text-xl font-bold text-purple-600">03</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Custom Project Design & Planning</h3>
                    <p className="text-purple-600 font-medium">Tailored Solutions for Your Property</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Based on our comprehensive assessment, we develop a customized project plan that addresses 
                  your specific needs, property characteristics, and Colorado climate requirements. Our design 
                  process balances performance, aesthetics, budget considerations, and long-term value.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Material Selection Strategy</h4>
                      <p className="text-sm text-gray-600">Climate-optimized material recommendations with performance and aesthetic considerations</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Installation Methodology</h4>
                      <p className="text-sm text-gray-600">Step-by-step installation plan adapted for your property's unique requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Timeline Development</h4>
                      <p className="text-sm text-gray-600">Realistic project schedule considering weather windows and material availability</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Cost Analysis</h4>
                      <p className="text-sm text-gray-600">Detailed breakdown of materials, labor, and additional services with transparent pricing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-purple-900 mb-4">Design Process Elements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-purple-800">
                      <Target className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Performance optimization</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <Star className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Aesthetic enhancement</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <Shield className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Weather protection</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Energy efficiency</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-purple-800">
                      <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Optimal scheduling</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <Gauge className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Value engineering</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <BadgeCheck className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Code compliance</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-800">
                      <Globe className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Environmental impact</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-purple-900 font-medium">Deliverables Include:</p>
                  <ul className="text-sm text-purple-800 mt-2 space-y-1">
                    <li>• Detailed material specifications</li>
                    <li>• Installation methodology document</li>
                    <li>• Project timeline with milestones</li>
                    <li>• Comprehensive cost breakdown</li>
                    <li>• Warranty and maintenance plan</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4: Permitting & Preparation */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 bg-orange-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-orange-900 mb-4">Comprehensive Preparation</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-1">Permit Management</h5>
                      <p className="text-sm text-orange-800">Complete handling of all required permits and inspections across different municipalities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-1">Material Procurement</h5>
                      <p className="text-sm text-orange-800">Quality-verified materials ordered with delivery coordination to minimize project delays</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-1">Team Assignment</h5>
                      <p className="text-sm text-orange-800">Certified crew assignment based on project complexity and specialized requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-1">Safety Planning</h5>
                      <p className="text-sm text-orange-800">Comprehensive safety protocol development and site-specific hazard mitigation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mr-4">
                    <span className="text-xl font-bold text-orange-600">04</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Permitting & Project Preparation</h3>
                    <p className="text-orange-600 font-medium">Complete Administrative & Logistical Setup</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Before any physical work begins, we handle all administrative requirements, material procurement, 
                  and logistical preparation. This comprehensive approach ensures smooth project execution without 
                  delays or complications once installation begins.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Municipal Compliance</h4>
                      <p className="text-sm text-gray-600">All required permits obtained and inspection schedules coordinated</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Insurance Coordination</h4>
                      <p className="text-sm text-gray-600">Claims processing support and documentation for insurance-covered projects</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Site Preparation</h4>
                      <p className="text-sm text-gray-600">Property protection measures and workspace organization for efficient execution</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Weather Monitoring</h4>
                      <p className="text-sm text-gray-600">Colorado weather tracking and contingency planning for optimal installation conditions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Professional Installation */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mr-4">
                    <span className="text-xl font-bold text-red-600">05</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Expert Installation & Execution</h3>
                    <p className="text-red-600 font-medium">Precision Craftsmanship & Quality Control</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our certified installation teams execute your roofing project with meticulous attention to detail, 
                  following manufacturer specifications and industry best practices. Continuous quality monitoring 
                  and safety protocols ensure superior results and complete protection throughout the installation process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Systematic Installation</h4>
                      <p className="text-sm text-gray-600">Step-by-step execution following proven methodology and manufacturer guidelines</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Continuous Quality Checks</h4>
                      <p className="text-sm text-gray-600">Multiple inspection points throughout installation to ensure specification compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Property Protection</h4>
                      <p className="text-sm text-gray-600">Comprehensive measures to protect landscaping, vehicles, and adjacent structures</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Daily Progress Updates</h4>
                      <p className="text-sm text-gray-600">Regular communication on progress, any discoveries, and next-day activities</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-red-900 mb-4">Installation Excellence Standards</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-red-900 mb-2">Safety First Protocol</h5>
                    <p className="text-sm text-red-800">
                      OSHA-compliant safety measures, fall protection systems, and continuous safety monitoring 
                      to protect both our team and your property.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-red-900 mb-2">Weather-Adaptive Execution</h5>
                    <p className="text-sm text-red-800">
                      Colorado-specific installation techniques adapted for high altitude, wind resistance, 
                      and extreme temperature variations.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-red-900 mb-2">Precision Installation</h5>
                    <p className="text-sm text-red-800">
                      Manufacturer-certified techniques ensuring optimal performance, longevity, and warranty compliance 
                      for all installed systems.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-red-900 font-medium">Real-Time Monitoring:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-red-800">
                    <div>• Photo documentation</div>
                    <div>• Quality checkpoints</div>
                    <div>• Progress tracking</div>
                    <div>• Issue resolution</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6: Quality Assurance */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 bg-yellow-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-yellow-900 mb-4">Multi-Level Quality Assurance</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h5 className="font-semibold text-yellow-900 mb-2">Installation Team Review</h5>
                    <p className="text-sm text-yellow-800">
                      Crew foreman conducts comprehensive review of all installation elements, checking 
                      alignment, fastening, and weatherproofing integrity.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h5 className="font-semibold text-yellow-900 mb-2">Project Manager Inspection</h5>
                    <p className="text-sm text-yellow-800">
                      Independent review by project management team using detailed checklist and quality standards 
                      specific to your project type and materials.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h5 className="font-semibold text-yellow-900 mb-2">Customer Walkthrough</h5>
                    <p className="text-sm text-yellow-800">
                      Guided inspection with homeowner to review completed work, explain maintenance requirements, 
                      and address any questions or concerns.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h5 className="font-semibold text-yellow-900 mb-2">Final Documentation</h5>
                    <p className="text-sm text-yellow-800">
                      Complete photographic record, warranty documentation, and maintenance guide preparation 
                      for ongoing roof care and protection.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mr-4">
                    <span className="text-xl font-bold text-yellow-600">06</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Comprehensive Quality Assurance</h3>
                    <p className="text-yellow-600 font-medium">Multi-Point Inspection & Verification</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our rigorous quality assurance process involves multiple inspection levels to ensure every 
                  aspect of your roofing project meets our exacting standards. This systematic approach 
                  identifies and addresses any issues before project completion, guaranteeing satisfaction 
                  and long-term performance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Installation Verification</h4>
                      <p className="text-sm text-gray-600">Complete verification of all installation elements against project specifications</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Weather Seal Testing</h4>
                      <p className="text-sm text-gray-600">Comprehensive testing of all seals, flashing, and penetration points</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Aesthetic Review</h4>
                      <p className="text-sm text-gray-600">Visual inspection for uniformity, alignment, and overall appearance</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Performance Validation</h4>
                      <p className="text-sm text-gray-600">Functional testing of ventilation, drainage, and other performance elements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7: Site Cleanup */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 mr-4">
                    <span className="text-xl font-bold text-teal-600">07</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Complete Site Restoration</h3>
                    <p className="text-teal-600 font-medium">Professional Cleanup & Property Care</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Your property should look better after our work than before we arrived. Our comprehensive 
                  cleanup process ensures complete debris removal, property restoration, and meticulous 
                  attention to details that protect your landscaping and maintain your property's appearance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Debris Removal</h4>
                      <p className="text-sm text-gray-600">All roofing materials, nails, and construction debris properly disposed of</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Magnetic Nail Sweep</h4>
                      <p className="text-sm text-gray-600">Comprehensive magnetic cleanup to remove all metal debris from property</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Landscape Protection</h4>
                      <p className="text-sm text-gray-600">Careful restoration of protected areas and repair of any inadvertent damage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Driveway & Walkway Cleaning</h4>
                      <p className="text-sm text-gray-600">Pressure washing and complete restoration of all paved surfaces</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-teal-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-teal-900 mb-4">Cleanup Standards</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-teal-600 mr-2" />
                      <h5 className="font-semibold text-teal-900">Zero-Debris Guarantee</h5>
                    </div>
                    <p className="text-sm text-teal-800">
                      We guarantee complete removal of all project-related debris, including the smallest 
                      nails and material fragments.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-teal-600 mr-2" />
                      <h5 className="font-semibold text-teal-900">Environmental Responsibility</h5>
                    </div>
                    <p className="text-sm text-teal-800">
                      All materials are properly recycled or disposed of according to environmental 
                      regulations and sustainable practices.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <ThumbsUp className="h-5 w-5 text-teal-600 mr-2" />
                      <h5 className="font-semibold text-teal-900">Property Enhancement</h5>
                    </div>
                    <p className="text-sm text-teal-800">
                      Your property should look better after completion, with enhanced curb appeal 
                      and pristine condition.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-teal-900 font-medium">Final Cleanup Includes:</p>
                  <ul className="text-sm text-teal-800 mt-2 space-y-1">
                    <li>• Complete debris removal and disposal</li>
                    <li>• Magnetic nail sweep of entire property</li>
                    <li>• Driveway and walkway cleaning</li>
                    <li>• Landscape restoration and protection</li>
                    <li>• Final property inspection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 8: Final Inspection & Handover */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 bg-indigo-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-indigo-900 mb-4">Comprehensive Documentation Package</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-indigo-900 mb-1">Warranty Documentation</h5>
                      <p className="text-sm text-indigo-800">Complete warranty information for materials and workmanship with registration details</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Camera className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-indigo-900 mb-1">Photo Documentation</h5>
                      <p className="text-sm text-indigo-800">Before, during, and after photography for insurance and reference purposes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Settings className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-indigo-900 mb-1">Maintenance Guide</h5>
                      <p className="text-sm text-indigo-800">Customized maintenance schedule and care instructions for your specific roofing system</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <HeadphonesIcon className="h-5 w-5 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-indigo-900 mb-1">Ongoing Support</h5>
                      <p className="text-sm text-indigo-800">Contact information and support process for future questions or service needs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mr-4">
                    <span className="text-xl font-bold text-indigo-600">08</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Final Inspection & Project Handover</h3>
                    <p className="text-indigo-600 font-medium">Complete Documentation & Customer Satisfaction</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  The completion of your roofing project includes comprehensive final inspection, complete 
                  documentation handover, and establishment of ongoing support relationship. We ensure you're 
                  fully satisfied with the results and equipped with all necessary information for long-term 
                  roof care and maintenance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Final Walkthrough</h4>
                      <p className="text-sm text-gray-600">Comprehensive review of completed work with detailed explanation of all elements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer Education</h4>
                      <p className="text-sm text-gray-600">Training on proper maintenance practices and warning signs to monitor</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Satisfaction Verification</h4>
                      <p className="text-sm text-gray-600">Formal satisfaction confirmation and resolution of any remaining concerns</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Future Support Setup</h4>
                      <p className="text-sm text-gray-600">Establishment of ongoing support relationship and maintenance scheduling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Our Process Makes the Difference
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Our systematic approach eliminates surprises, ensures consistent quality, and provides 
              complete transparency throughout your roofing project. The result is superior performance, 
              customer satisfaction, and long-term value for your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">Risk Mitigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">
                  Our systematic approach identifies and addresses potential issues before they become 
                  problems, reducing project risks and ensuring successful outcomes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Early problem identification</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Weather contingency planning</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Quality control checkpoints</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-900">Consistent Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  Standardized processes ensure every project meets the same high standards regardless 
                  of size, complexity, or team composition.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Uniform quality standards</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Documented best practices</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Continuous improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-900">Customer Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 mb-4">
                  Complete transparency and regular communication provide peace of mind and confidence 
                  throughout your roofing project.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Clear expectations setting</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>Regular progress updates</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                    <span>No surprise issues</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Experience Our Proven Process
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
              Ready to experience the Alpine Peak difference? Our systematic approach ensures your 
              roofing project exceeds expectations from start to finish. Contact us today to begin 
              with our comprehensive consultation process.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Start Your Project: (303) 555-ROOF
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8" asChild>
                <Link href="/estimator">Schedule Free Consultation</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              Licensed (#12345) • Bonded & Insured • GAF Master Elite • 24/7 Emergency Service
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}