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
  Gem,
  Camera,
  TreePine
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Telluride Roofing Contractor | Alpine Peak Roofing | Historic Mining Town Specialists',
  description: 'Premier Telluride roofing contractor specializing in historic preservation, extreme high-altitude conditions, and luxury resort properties. Serving Telluride and Mountain Village with unmatched expertise and 24/7 emergency response.',
  keywords: 'Telluride roofing contractor, luxury roofing Telluride, Mountain Village roofing, historic preservation roofing, high-altitude roofing, extreme weather roofing, San Juan Mountains roofing, Telluride emergency roof repair',
  openGraph: {
    title: 'Premium Telluride Roofing Services | Alpine Peak Roofing',
    description: 'Historic preservation and luxury roofing specialists serving Telluride\'s unique architectural heritage and extreme mountain conditions.',
    images: ['/images/telluride-historic-roof.jpg']
  }
}

export default function TellurideRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-red-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/telluride-box-canyon-backdrop.jpg"
            alt="Telluride Box Canyon Landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Historic Preservation Masters
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Telluride's Historic Preservation Roofing Experts
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Authentic Character, Modern Performance at 8,750 Feet Elevation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900">
              Historic Emergency Response
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-900">12+</div>
              <div className="text-gray-600">Years in Telluride</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900">85+</div>
              <div className="text-gray-600">Historic Restorations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900">100%</div>
              <div className="text-gray-600">Landmark Commission Approved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900">2 Hours</div>
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
              Understanding Telluride's Historic Roofing Heritage
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Telluride stands as Colorado's most perfectly preserved Victorian mining town, where every 
                roofline tells the story of the Silver Boom era. Perched dramatically at 8,750 feet in a 
                glacial box canyon surrounded by 13,000-foot peaks, this National Historic Landmark District 
                presents unique roofing challenges that demand both authentic restoration expertise and 
                extreme high-altitude engineering capabilities that few contractors possess.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our twelve-year specialization in Telluride's historic architecture has established Alpine 
                Peak Roofing as the trusted guardian of the town's irreplaceable building heritage. From 
                authentically restoring original 1880s miners' cabins to engineering modern performance 
                into Victorian commercial buildings, we understand that every Telluride roof must honor 
                the past while protecting against the San Juan Mountains' extreme weather conditions.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The combination of Telluride's strict historic preservation requirements, extreme elevation 
                exposure, and the community's transformation into a world-class resort destination requires 
                roofing expertise that seamlessly bridges 19th-century craftsmanship with 21st-century 
                performance standards. Our deep collaboration with the Telluride Historic Preservation 
                Commission ensures that every project enhances both the property's authentic character 
                and its modern functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gem className="h-5 w-5 text-amber-600" />
                    Mining Era Authenticity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Preserving Telluride's 1880s mining town character with authentic materials 
                    and techniques while meeting modern performance requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-amber-600" />
                    National Historic Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Expert navigation of National Historic Landmark requirements and Telluride 
                    Historic Preservation Commission standards for all restoration projects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-amber-600" />
                    Box Canyon Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Specialized solutions for Telluride's unique box canyon microclimate and 
                    extreme wind patterns created by surrounding 13,000-foot peaks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Conquering Telluride's Extreme High-Altitude Conditions
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At 8,750 feet elevation in the heart of the San Juan Mountains, Telluride presents Colorado's 
                most challenging high-altitude roofing environment. The town's dramatic box canyon setting 
                creates unique weather phenomena, with wind patterns that can accelerate to over 140 mph 
                through the canyon effect, while extreme UV exposure at altitude and temperature swings 
                exceeding 120 degrees demand roofing systems engineered specifically for these punishing 
                conditions.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Telluride's position in the San Juan Mountains receives some of Colorado's heaviest snowfall, 
                often exceeding 400 inches annually, combined with the unique challenges of box canyon wind 
                acceleration and extreme solar radiation at high altitude. These conditions, particularly 
                when combined with the thermal mass and expansion characteristics of historic building 
                materials, require installation techniques and material selections that go far beyond 
                conventional mountain roofing approaches.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our twelve years of Telluride-specific experience has revealed how the town's unique 
                geography creates microclimates that vary dramatically even within the historic district. 
                Each installation must account for these localized conditions while respecting the authentic 
                architectural character that makes Telluride a treasured National Historic Landmark.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Extreme Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-900 mb-2">8,750 ft</div>
                  <p className="text-gray-600 text-sm">
                    High-altitude conditions require specialized materials and installation techniques
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Canyon Wind Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-900 mb-2">140+ MPH</div>
                  <p className="text-gray-600 text-sm">
                    Box canyon acceleration creates unique wind patterns requiring specialized engineering
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Heavy Snowfall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-900 mb-2">400+ inches</div>
                  <p className="text-gray-600 text-sm">
                    San Juan Mountain snowfall requires maximum structural load capacity
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">High-Altitude UV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-900 mb-2">50% Higher</div>
                  <p className="text-gray-600 text-sm">
                    Extreme UV exposure at altitude demands premium material protection
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Telluride Climate Adaptation Strategies</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-amber-900 mb-3">Historic Material Challenges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Victorian-era material thermal expansion management
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Authentic wood preservation at high altitude
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Period-appropriate metal weathering protection
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Historic masonry compatibility with modern systems
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-amber-900 mb-3">Modern Performance Integration</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Hidden insulation systems maintaining authentic appearance
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Concealed ice dam prevention technology
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Advanced ventilation without visual impact
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Hurricane-rated attachment systems for historic structures
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telluride-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Historic Preservation Roofing Mastery
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Telluride's status as a National Historic Landmark District demands roofing approaches that 
                honor the town's 1880s mining heritage while delivering 21st-century performance and 
                comfort. Our specialized expertise in historic preservation roofing has been refined through 
                over eighty-five successful restoration projects, establishing us as the trusted authority 
                for maintaining Telluride's authentic character while meeting modern living and safety 
                standards.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Every Telluride project begins with comprehensive historic research and materials analysis, 
                ensuring that our restoration work maintains complete historical accuracy while incorporating 
                hidden performance technologies. Our deep collaboration with the Telluride Historic 
                Preservation Commission, combined with our specialized knowledge of period-appropriate 
                construction techniques, guarantees that every installation enhances both authenticity 
                and functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Authentic Victorian Restoration</CardTitle>
                  <CardDescription>Period-accurate materials and techniques</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Victorian restoration capabilities maintain complete historical authenticity while 
                    secretly integrating modern performance systems that deliver contemporary comfort 
                    without compromising Telluride's irreplaceable architectural heritage.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Original slate sourcing and matching from Welsh quarries
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hand-forged hardware reproduction and restoration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Period-appropriate wood selection and preparation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic paint analysis and authentic color matching
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mining Era Metal Systems</CardTitle>
                  <CardDescription>Authentic copper and steel restoration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our specialized metal roofing capabilities honor Telluride's mining heritage with 
                    authentic copper and steel systems that maintain period appearance while delivering 
                    modern weather resistance against the San Juan Mountains' extreme conditions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Standing seam copper with period-appropriate soldering
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Terne-coated steel restoration and replacement
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic guttering system restoration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Traditional chimney cap and flashing work
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">High-Altitude Engineering</CardTitle>
                  <CardDescription>Extreme condition performance solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our engineering expertise addresses Telluride's unique 8,750-foot elevation challenges 
                    while maintaining complete visual authenticity, ensuring historic structures perform 
                    flawlessly against extreme weather conditions and dramatic temperature variations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hidden structural reinforcement for snow loads
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Concealed thermal expansion accommodation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Invisible wind resistance enhancement systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced ventilation without historic impact
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Preservation Commission Collaboration</CardTitle>
                  <CardDescription>Regulatory expertise and compliance mastery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our deep working relationship with the Telluride Historic Preservation Commission 
                    ensures seamless project approval and execution, combining regulatory expertise 
                    with authentic restoration capabilities to protect Telluride's irreplaceable heritage.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Pre-approved restoration methodology documentation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic tax credit coordination and support
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      National Register compliance certification
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Secretary of Interior Standards adherence
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Preserve Your Telluride Heritage Investment</h3>
              <p className="text-amber-100 mb-6 text-lg">
                Trust Colorado's historic preservation roofing specialists to protect your 
                irreplaceable Telluride property with authentic restoration excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Historic Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
                  View Restoration Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations & Compliance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Telluride Historic Preservation Standards
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                As a National Historic Landmark District, Telluride maintains some of Colorado's most 
                stringent preservation standards. Our twelve years of local specialization has established 
                us as the recognized authority for navigating complex historic preservation requirements 
                while delivering modern performance and comfort standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>National Historic Landmark Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Secretary of Interior Standards:</strong> Complete adherence to federal 
                      preservation guidelines for all restoration work
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>National Register Requirements:</strong> Documentation and compliance 
                      for National Register of Historic Places properties
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Historic Tax Credit Coordination:</strong> Federal and state tax credit 
                      application support and project documentation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Telluride Historic Preservation Commission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Design Review Approval:</strong> Expert navigation of local historic 
                      preservation review processes and requirements
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Material Authentication:</strong> Approved sourcing and specification 
                      of period-appropriate roofing materials
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Construction Standards:</strong> Compliance with local building codes 
                      while maintaining historic character
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
              Historic Property Emergency Protection
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-8 w-8" />
                <span className="text-2xl font-bold">2-Hour Historic Emergency Response</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Specialized emergency protection for Telluride's irreplaceable historic structures
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Historic Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Gem className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Historic Structure Protection</h3>
                  <p className="text-gray-600 text-sm">
                    Emergency weatherization and damage assessment for National Historic Landmark properties
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <TreePine className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Box Canyon Storm Response</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized equipment and techniques for Telluride's unique geographic challenges
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Camera className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Preservation Emergency Team</h3>
                  <p className="text-gray-600 text-sm">
                    Historic preservation specialists on 24/7 standby for landmark emergencies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Protect Your Telluride Historic Investment
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Experience Colorado's premier historic preservation roofing specialists, 
            trusted by Telluride's most important landmark properties.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-600">
              Historic Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-amber-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Telluride & Mountain Village
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              2-Hour Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Gem className="h-5 w-5" />
              Historic Preservation Masters
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}