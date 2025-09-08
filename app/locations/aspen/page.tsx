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
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aspen Roofing Contractor | Alpine Peak Roofing | Ultra-Luxury Estate Specialists',
  description: 'Premier Aspen roofing contractor specializing in ultra-luxury estates, extreme weather solutions, and historic preservation. Serving Aspen and Snowmass Village with investment-grade quality and 24/7 emergency response.',
  keywords: 'Aspen roofing contractor, luxury roofing Aspen, Snowmass roofing, extreme weather roofing, historic restoration Aspen, copper roofing Aspen, high-altitude roofing, Aspen emergency roof repair',
  openGraph: {
    title: 'Premium Aspen Roofing Services | Alpine Peak Roofing',
    description: 'Ultra-luxury roofing specialists serving Aspen\'s most exclusive properties with unmatched quality and mountain expertise.',
    images: ['/images/aspen-luxury-roof.jpg']
  }
}

export default function AspenRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/aspen-mountain-backdrop.jpg"
            alt="Aspen Mountains Landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Ultra-Luxury Specialist
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Aspen's Premier Roofing Contractor
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Investment-Grade Quality for Colorado's Most Exclusive Mountain Community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Emergency 24/7 Response
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-900">15+</div>
              <div className="text-gray-600">Years in Aspen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">$2.5M+</div>
              <div className="text-gray-600">Estate Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">100%</div>
              <div className="text-gray-600">Historic Compliance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">1 Hour</div>
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
              Understanding Aspen's Unique Roofing Environment
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Aspen represents the pinnacle of Colorado mountain luxury, where ultra-high net worth individuals 
                have created one of the world's most exclusive resort communities. At 7,908 feet elevation, 
                nestled in the heart of the Elk Mountains, Aspen's roofing requirements demand both 
                uncompromising aesthetic excellence and extreme weather performance capabilities that few 
                contractors can deliver.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our fifteen-year presence in Aspen has established Alpine Peak Roofing as the trusted choice 
                for the community's most discerning property owners. From historic Victorian restorations 
                maintaining the town's authentic character to cutting-edge sustainable installations on 
                modern architectural masterpieces, we understand that every Aspen roof must meet the 
                highest standards of both form and function.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The Roaring Fork Valley's unique microclimate, combined with Aspen's strict architectural 
                guidelines and the community's investment-focused approach to property enhancement, requires 
                roofing expertise that extends far beyond conventional mountain construction. Our deep 
                understanding of local regulations, weather patterns, and luxury market expectations ensures 
                that every project enhances both the property's beauty and its substantial investment value.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-blue-600" />
                    Historic Character
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Preserving Aspen's authentic Victorian architecture while integrating modern performance 
                    standards for luxury living expectations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Ultra-Luxury Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Meeting the exacting quality expectations of the world's most sophisticated property 
                    owners with investment-grade materials and craftsmanship.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Resort Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Seamlessly coordinating with Aspen's resort infrastructure, seasonal schedules, and 
                    high-profile event calendar for minimal disruption.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mastering Aspen's Extreme Weather Challenges
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Aspen's position at nearly 8,000 feet elevation in the Elk Mountains creates one of Colorado's 
                most challenging roofing environments. The combination of extreme UV exposure, dramatic temperature 
                swings, hurricane-force winds, and record snowfall demands roofing systems engineered specifically 
                for these conditions. Our deep understanding of local weather patterns enables us to design and 
                install roof systems that not only survive but excel in Aspen's demanding climate.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Roaring Fork Valley experiences unique wind patterns, with chinook winds capable of exceeding 
                100 mph during winter months, while summer thunderstorms can deliver golf-ball-sized hail with 
                devastating impact. These extreme conditions, combined with Aspen's 300+ days of sunshine creating 
                intense UV degradation, require material selection and installation techniques that go far beyond 
                conventional mountain roofing approaches.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our fifteen years of Aspen-specific experience has taught us that successful roofing in this 
                environment requires not just understanding the weather, but anticipating its impacts on different 
                materials, architectural styles, and property exposures. Every installation incorporates lessons 
                learned from hundreds of local projects, ensuring optimal performance in Aspen's unique 
                microclimate conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Temperature Extremes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">-25°F to 85°F</div>
                  <p className="text-gray-600 text-sm">
                    Extreme thermal cycling requires materials engineered for 110-degree temperature ranges
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Wind Extremes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">120+ MPH</div>
                  <p className="text-gray-600 text-sm">
                    Chinook winds and mountain storms demand hurricane-rated attachment systems
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Snow Loads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">300+ inches</div>
                  <p className="text-gray-600 text-sm">
                    Annual snowfall requires structural engineering for massive load capacity
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">UV Intensity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">40% Higher</div>
                  <p className="text-gray-600 text-sm">
                    High-altitude UV exposure accelerates material degradation without proper protection
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seasonal Weather Patterns & Impacts</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Winter Challenges (December - March)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Snow load management up to 80 lbs per square foot
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Ice dam prevention with heated cable systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Emergency response for storm damage assessment
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Avalanche zone consideration for roof design
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Summer Conditions (June - September)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Intense UV protection with premium coatings
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Hail-resistant materials and impact testing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Thermal expansion accommodation in design
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Optimal construction weather window utilization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aspen-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Aspen-Engineered Roofing Solutions
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Aspen's unique combination of extreme weather, strict aesthetic standards, and ultra-luxury 
                expectations requires roofing solutions that are literally engineered for this specific 
                environment. Our fifteen years serving Aspen's most exclusive properties has refined our 
                approach to deliver systems that seamlessly integrate historic preservation requirements 
                with cutting-edge performance technologies, ensuring that every installation enhances both 
                the property's beauty and its substantial investment value.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                From authentic slate installations on Victorian estates to revolutionary copper systems 
                on contemporary masterpieces, our material selections and installation techniques are 
                specifically calibrated for Aspen's 7,908-foot elevation, extreme wind exposure, and 
                demanding aesthetic integration requirements. Every project incorporates lessons learned 
                from hundreds of local installations, delivering proven performance in the Roaring Fork 
                Valley's challenging microclimate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Custom Copper Systems</CardTitle>
                  <CardDescription>Investment-grade materials for luxury estates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our premium copper roofing systems are specifically engineered for Aspen's extreme 
                    conditions, featuring advanced soldering techniques that accommodate thermal expansion 
                    while maintaining weather-tight performance through temperature swings exceeding 100 degrees.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      50+ year performance warranty
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic district compliance certified
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Custom patina development programs
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hurricane-rated wind resistance (150+ mph)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Historic Preservation Mastery</CardTitle>
                  <CardDescription>Authentic restoration with modern performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our specialized historic restoration capabilities maintain Aspen's authentic Victorian 
                    character while secretly integrating modern performance technologies that ensure 
                    contemporary comfort and efficiency standards in these irreplaceable architectural treasures.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Victorian slate matching and restoration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hidden modern insulation integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Architectural review board approval
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic tax credit consultation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Extreme Weather Engineering</CardTitle>
                  <CardDescription>Hurricane-rated systems for mountain storms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our engineering approach accounts for Aspen's unique weather phenomena, including 
                    chinook wind events exceeding 120 mph, thermal cycling from -25°F to 85°F, and 
                    snow loads approaching 80 pounds per square foot during exceptional winter seasons.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Wind tunnel tested attachment systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Thermal cycling resistance verified
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Snow load calculations by structural engineer
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Ice dam prevention systems included
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Sustainability Integration</CardTitle>
                  <CardDescription>Environmental leadership for conscious luxury</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Aspen's environmental consciousness demands roofing solutions that deliver both 
                    luxury performance and sustainability leadership, integrating renewable energy 
                    systems and eco-friendly materials without compromising aesthetic excellence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Tesla Solar Roof certified installation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Living green roof systems available
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Recycled content materials prioritized
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Carbon offset programs available
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Aspen Investment?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Experience why Aspen's most exclusive properties trust Alpine Peak Roofing 
                for their most important investment protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Aspen Portfolio
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
              Aspen Regulatory Expertise & Compliance
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Navigating Aspen's complex regulatory environment requires deep expertise in historic 
                preservation standards, architectural review processes, and City of Aspen building codes. 
                Our fifteen-year local presence has established relationships with every relevant regulatory 
                body, ensuring smooth permit processes and full compliance with all applicable standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Historic Preservation Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Historic Landmark Commission:</strong> Expert navigation of historic 
                      district requirements for Victorian-era properties
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Architectural Standards:</strong> Compliance with strict material and 
                      color requirements for historic areas
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Tax Credit Coordination:</strong> Historic tax credit application 
                      support and documentation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>City Building Code Excellence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Snow Load Requirements:</strong> Engineering calculations meeting 
                      Aspen's 80 PSF snow load requirements
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wind Rating Compliance:</strong> Systems rated for 120+ mph wind 
                      events per local building code
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Fire Safety Standards:</strong> Wildfire-resistant materials and 
                      ember-resistant construction
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
              24/7 Aspen Emergency Response
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-8 w-8" />
                <span className="text-2xl font-bold">1-Hour Response Guarantee</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Storm damage assessment and emergency protection available 24/7, 365 days a year
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Storm Damage Assessment</h3>
                  <p className="text-gray-600 text-sm">
                    Professional damage evaluation and insurance coordination within 1 hour
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Snowflake className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Winter Emergency Coverage</h3>
                  <p className="text-gray-600 text-sm">
                    Ice dam removal, snow load management, and heated access available
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Local Response Team</h3>
                  <p className="text-gray-600 text-sm">
                    Dedicated Aspen/Snowmass response team with local equipment staging
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Aspen's Premier Roofing Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied Aspen property owners who trust Alpine Peak Roofing 
            to protect their most valuable investments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Free Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Aspen & Snowmass Village
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              1-Hour Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              15+ Years Local Experience
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}