import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Mountain, 
  Snowflake, 
  Wind, 
  Sun, 
  Thermometer,
  Shield,
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vail Roofing Contractor | Alpine Peak Roofing | Luxury Resort Specialists',
  description: 'Premier Vail roofing contractor specializing in luxury resort properties, extreme weather solutions, and commercial systems. Serving Vail Valley with investment-grade quality and emergency response.',
  keywords: 'Vail roofing contractor, luxury roofing Vail, Beaver Creek roofing, resort roofing, commercial roofing Vail, extreme weather roofing, Eagle County roofing, Vail emergency roof repair',
  openGraph: {
    title: 'Premium Vail Roofing Services | Alpine Peak Roofing',
    description: 'Luxury resort roofing specialists serving Vail Valley\'s most exclusive properties with unmatched quality and mountain expertise.',
    images: ['/images/vail-resort-roof.jpg']
  }
}

export default function VailRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/vail-valley-backdrop.jpg"
            alt="Vail Valley Landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Resort Authority
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Vail's Trusted Resort Roofing Contractor
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Commercial & Residential Excellence in Colorado's Premier Resort Valley
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              Resort Emergency Services
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900">20+</div>
              <div className="text-gray-600">Years in Vail Valley</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">50+</div>
              <div className="text-gray-600">Resort Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <div className="text-gray-600">Eagle County Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">45 Min</div>
              <div className="text-gray-600">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Vail's Resort Roofing Environment
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Vail represents the gold standard of American ski resort excellence, where luxury hospitality 
                meets extreme mountain conditions in one of Colorado's most demanding roofing environments. 
                At 8,150 feet elevation in the heart of the Gore Range, Vail's unique combination of 
                world-class resort operations, luxury residential properties, and extreme weather patterns 
                requires roofing expertise that seamlessly integrates commercial-grade performance with 
                luxury residential aesthetics.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our two decades serving Vail Valley have established Alpine Peak Roofing as the trusted 
                choice for the resort's most critical roofing needs. From iconic lodge buildings housing 
                thousands of guests to exclusive Beaver Creek estates worth tens of millions, we understand 
                that Vail roofing projects demand not just technical excellence, but seamless coordination 
                with resort operations, minimal guest impact, and performance guarantees that protect both 
                property investments and business continuity.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The Gore Range's unique microclimate, combined with Vail's resort traffic patterns and 
                Eagle County's commercial building requirements, creates roofing challenges that extend 
                far beyond conventional mountain construction. Our deep relationships with resort 
                management, local authorities, and the luxury residential community ensure that every 
                project enhances both property performance and the exceptional Vail Valley experience 
                that drives the region's $2 billion annual economic impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-slate-600" />
                    Resort Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Seamless integration with resort schedules, guest experiences, and operational 
                    requirements for year-round hospitality excellence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-slate-600" />
                    Commercial Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Large-scale commercial roofing systems engineered for high-traffic environments 
                    and extreme mountain weather conditions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-slate-600" />
                    Luxury Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Premium residential services meeting the exacting standards of Vail's luxury 
                    homeowners and resort property investors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mastering Vail Valley's Extreme Weather Conditions
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Vail Valley's position at over 8,000 feet elevation, protected by the Gore Range and 
                Ten Mile Range, creates one of Colorado's most complex roofing environments. The valley's 
                famous chinook wind patterns can generate gusts exceeding 100 mph, while the combination 
                of lake-effect moisture from Vail Lake and high-altitude conditions produces both extreme 
                snowfall and intense UV exposure that demands specialized roofing engineering and material 
                selection approaches.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Gore Range's wind tunnel effect creates unique challenges for both commercial resort 
                properties and luxury residences, with wind-driven snow and ice formation patterns that 
                vary dramatically between the valley floor and mountainside locations. Summer conditions 
                bring intense thunderstorms with large hail, while winter presents extreme cold snaps 
                that can reach -20°F, creating thermal cycling stresses that can destroy improperly 
                engineered roofing systems.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our twenty years of Vail Valley experience has taught us that successful roofing in 
                this environment requires intimate knowledge of elevation-specific weather patterns, 
                from the valley floor at 8,150 feet to luxury properties approaching 9,000 feet elevation. 
                Every installation incorporates lessons learned from hundreds of local projects, ensuring 
                optimal performance across the full range of Vail Valley's challenging microclimates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">Temperature Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 mb-2">-20°F to 80°F</div>
                  <p className="text-gray-600 text-sm">
                    Extreme thermal cycling requires materials designed for 100-degree temperature swings
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">Chinook Winds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 mb-2">110+ MPH</div>
                  <p className="text-gray-600 text-sm">
                    Gore Range wind tunnels create extreme gusts requiring hurricane-rated systems
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">Annual Snowfall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 mb-2">350+ inches</div>
                  <p className="text-gray-600 text-sm">
                    Heavy snow loads and ice formation demand specialized structural engineering
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-slate-600" />
                  </div>
                  <CardTitle className="text-lg">UV Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 mb-2">45% Higher</div>
                  <p className="text-gray-600 text-sm">
                    High-altitude UV intensity accelerates material degradation without protection
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seasonal Challenges & Solutions</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Winter Operations (November - April)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Resort schedule coordination for minimal guest impact
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Snow load monitoring and management systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Ice dam prevention with heated systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Emergency storm response protocols
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Summer Construction (May - October)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Peak season scheduling around resort events
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Hail-resistant materials and impact protection
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      UV protection systems for extended lifespan
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Thermal expansion accommodation engineering
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vail-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Resort-Engineered Roofing Solutions
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Vail Valley's unique combination of resort operations, luxury residential properties, 
                and extreme mountain conditions demands roofing solutions that seamlessly integrate 
                commercial-grade performance with luxury aesthetics. Our twenty years serving Vail's 
                most critical properties has refined our approach to deliver systems that maintain 
                resort operations continuity while exceeding the performance expectations of luxury 
                property owners and commercial property managers.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                From massive resort lodge roofing systems hosting thousands of guests to exclusive 
                Beaver Creek estates worth tens of millions, our material selections and installation 
                techniques are specifically calibrated for Vail Valley's unique microclimate, resort 
                operational requirements, and luxury market standards. Every project incorporates 
                lessons learned from hundreds of local installations across both commercial and 
                residential applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Commercial Resort Systems</CardTitle>
                  <CardDescription>High-traffic, high-performance commercial roofing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our commercial resort roofing systems are engineered for the unique demands of 
                    hospitality operations, featuring minimal maintenance requirements, extreme weather 
                    resistance, and installation methods that minimize guest disruption during peak seasons.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      25+ year performance warranties
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Resort operations integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Off-season maintenance programs
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emergency repair response teams
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Luxury Residential Excellence</CardTitle>
                  <CardDescription>Premium homes worthy of Vail Valley</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our luxury residential roofing delivers the sophisticated aesthetics expected in 
                    Vail Valley's premium neighborhoods while incorporating commercial-grade performance 
                    standards that protect million-dollar property investments in extreme conditions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Custom architectural integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Premium material selections
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Property value enhancement focus
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Concierge maintenance services
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Snow Management Engineering</CardTitle>
                  <CardDescription>Advanced snow load and ice management systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Vail Valley's extreme snow conditions require sophisticated management systems that 
                    prevent ice dam formation, manage snow loads safely, and maintain clear egress paths 
                    for both resort guests and residential properties throughout winter months.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Heated cable systems with smart controls
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Snow guard placement optimization
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      Load monitoring and alert systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emergency snow removal protocols
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Green Building Leadership</CardTitle>
                  <CardDescription>Sustainable solutions for conscious luxury</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Vail Valley's environmental stewardship values demand roofing solutions that deliver 
                    both luxury performance and sustainability leadership, integrating renewable energy 
                    and eco-friendly materials without compromising resort operations or aesthetic excellence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Solar integration for resorts and homes
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Green roof systems available
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      LEED certification support
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Recycled content material priorities
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Vail Valley Investment?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Experience why Vail's premier resorts and luxury homeowners trust Alpine Peak Roofing 
                for their most critical roofing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-600 hover:bg-slate-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
                  View Resort Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eagle County Compliance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Eagle County Expertise & Regulatory Compliance
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Navigating Eagle County's complex regulatory environment for both commercial resort 
                properties and luxury residential construction requires deep expertise in commercial 
                building codes, resort operation requirements, and luxury residential standards. Our 
                twenty-year local presence has established relationships with every relevant regulatory 
                body and resort management team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Commercial Code Excellence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Eagle County Commercial Codes:</strong> Full compliance with commercial 
                      building requirements for resort properties
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Fire Safety Standards:</strong> Advanced fire-resistant systems for 
                      high-occupancy buildings
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Resort Coordination:</strong> Seamless integration with resort operations 
                      and management requirements
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Luxury Residential Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Architectural Review:</strong> Expertise with luxury subdivision 
                      architectural standards and approval processes
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Snow Load Engineering:</strong> Calculations meeting Eagle County's 
                      extreme snow load requirements (70+ PSF)
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Environmental Compliance:</strong> Sensitive habitat and watershed 
                      protection coordination
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              24/7 Vail Valley Emergency Response
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-8 w-8" />
                <span className="text-2xl font-bold">45-Minute Response Guarantee</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Resort and residential emergency services with dedicated Vail Valley response teams
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Resort Emergency Services</h3>
                  <p className="text-gray-600 text-sm">
                    Immediate response for resort properties with minimal guest impact protocols
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Snowflake className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Snow Load Emergencies</h3>
                  <p className="text-gray-600 text-sm">
                    Professional snow removal and structural assessment services available 24/7
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Valley-Wide Coverage</h3>
                  <p className="text-gray-600 text-sm">
                    Vail, Beaver Creek, Avon, and Edwards coverage with local equipment staging
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Vail Valley's Premier Roofing Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the resorts and luxury homeowners who trust Alpine Peak Roofing 
            to protect their most valuable investments in Colorado's premier resort valley.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-slate-600 hover:bg-slate-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
              Schedule Free Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Vail Valley & Beaver Creek
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              45-Min Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              20+ Years Valley Experience
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}