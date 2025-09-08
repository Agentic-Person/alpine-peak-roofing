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
  Flame,
  Waves,
  Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Steamboat Springs Roofing Contractor | Alpine Peak Roofing | Resort & Ranch Specialists',
  description: 'Premier Steamboat Springs roofing contractor specializing in resort properties, ranch estates, and champagne powder snow conditions. Serving Steamboat Springs and Routt County with unmatched mountain expertise and emergency response.',
  keywords: 'Steamboat Springs roofing contractor, resort roofing Steamboat, ranch roofing Colorado, heavy snow roofing, Routt County roofing, champagne powder roofing, hot springs roofing, Steamboat emergency roof repair',
  openGraph: {
    title: 'Premium Steamboat Springs Roofing Services | Alpine Peak Roofing',
    description: 'Resort and ranch roofing specialists serving Steamboat Springs\' unique mountain environment with champagne powder snow expertise.',
    images: ['/images/steamboat-springs-resort-roof.jpg']
  }
}

export default function SteamboatSpringsRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/steamboat-springs-mountain-vista.jpg"
            alt="Steamboat Springs Mountain Vista"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Resort & Ranch Authority
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Steamboat Springs' Premier Mountain Roofing
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Champagne Powder Expertise for Resort Luxury and Ranch Heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
              Champagne Powder Emergency
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-900">18+</div>
              <div className="text-gray-600">Years in Steamboat</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900">350+</div>
              <div className="text-gray-600">Inches Champagne Powder</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900">100%</div>
              <div className="text-gray-600">Resort Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900">30 Min</div>
              <div className="text-gray-600">Valley Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Steamboat's Unique Mountain Resort Environment
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Steamboat Springs represents Colorado's perfect blend of authentic ranching heritage 
                and world-class resort sophistication, where the famous "Champagne Powder" creates 
                one of the most unique roofing environments in the Rocky Mountains. At 6,900 feet 
                elevation in the Yampa Valley, this legendary ski town receives over 350 inches of 
                the lightest, driest snow on earth, combined with the thermal effects of natural 
                hot springs that create distinctive microclimate conditions requiring specialized 
                roofing expertise.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our eighteen years serving Steamboat Springs has established Alpine Peak Roofing as 
                the trusted authority for both the community's luxury resort properties and traditional 
                ranch estates. From engineering solutions for massive resort complexes to preserving 
                historic ranching structures, we understand that Steamboat roofing must balance 
                cutting-edge performance with respect for both Western heritage and contemporary 
                resort luxury expectations.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The Yampa Valley's distinctive geography creates weather patterns unlike anywhere 
                else in Colorado. Continental storm systems interact with local topography and 
                geothermal effects to produce the legendary Champagne Powder, while temperature 
                inversions and wind patterns create unique challenges for roofing systems. Our 
                specialized expertise in these conditions ensures that every installation performs 
                optimally in Steamboat's one-of-a-kind mountain environment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-green-600" />
                    Champagne Powder Mastery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Specialized solutions for Steamboat's famous light, dry snow that requires 
                    unique engineering approaches different from typical mountain conditions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                    Resort Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Expert coordination with resort operations, luxury hospitality standards, and 
                    seasonal guest experience requirements for minimal disruption.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5 text-green-600" />
                    Ranch Heritage Preservation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Maintaining authentic Western ranching character while integrating modern 
                    performance for both historic and contemporary ranch properties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mastering Steamboat's Champagne Powder Environment
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Steamboat Springs' legendary "Champagne Powder" creates roofing challenges that exist 
                nowhere else in Colorado. This ultra-light, dry snow falls in massive quantities - 
                often exceeding 350 inches annually - but its unique characteristics require entirely 
                different engineering approaches than conventional mountain snow. The powder's low 
                density can be deceptive, as rapid temperature changes can transform light snow into 
                heavy loads virtually overnight, while wind patterns in the Yampa Valley create 
                complex drift and accumulation patterns.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The thermal effects of Steamboat's famous hot springs create unique microclimate 
                conditions throughout the valley, with temperature inversions and localized warming 
                zones that can dramatically affect snow behavior and building performance. These 
                geothermal influences, combined with the valley's distinctive wind patterns and 
                elevation effects, require roofing solutions calibrated specifically for Steamboat's 
                one-of-a-kind environment.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our eighteen years of Steamboat-specific experience has revealed the critical importance 
                of understanding how Champagne Powder behaves differently from conventional snow. From 
                specialized ventilation systems that prevent ice dams in powder conditions to load 
                calculations that account for rapid snow metamorphosis, every installation incorporates 
                lessons learned from hundreds of Yampa Valley projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Champagne Powder</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 mb-2">350+ inches</div>
                  <p className="text-gray-600 text-sm">
                    Ultra-light dry snow requiring specialized engineering approaches
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Geothermal Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 mb-2">Hot Springs</div>
                  <p className="text-gray-600 text-sm">
                    Natural thermal influences create unique microclimate conditions
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Valley Winds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 mb-2">Complex</div>
                  <p className="text-gray-600 text-sm">
                    Yampa Valley topography creates unique wind and drift patterns
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Temperature Swings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 mb-2">Extreme</div>
                  <p className="text-gray-600 text-sm">
                    Rapid weather changes require adaptable roofing systems
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Steamboat Climate Adaptation Solutions</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-green-900 mb-3">Champagne Powder Engineering</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Light snow load calculations with rapid densification factors
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Specialized ventilation for powder snow conditions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Advanced ice dam prevention in light snow environments
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Wind pattern analysis for drift prediction and management
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-green-900 mb-3">Geothermal Adaptation Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Thermal zone-specific material selection
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Inversion layer accommodation in design
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Hot springs humidity resistance systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Rapid temperature change accommodation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steamboat-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Resort & Ranch Roofing Excellence for Steamboat Springs
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Steamboat Springs demands roofing solutions that seamlessly integrate world-class 
                resort luxury with authentic Western ranching heritage, all while performing flawlessly 
                in the unique Champagne Powder environment. Our eighteen years of local specialization 
                has refined our approach to deliver systems that enhance both architectural beauty and 
                extreme weather performance, whether protecting a luxury resort complex or preserving 
                a historic ranch homestead.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                From cutting-edge materials that complement contemporary resort architecture to 
                traditional techniques that honor Western ranching heritage, our installations are 
                specifically calibrated for the Yampa Valley's unique climate conditions and cultural 
                character. Every project incorporates our deep understanding of how Champagne Powder 
                and geothermal effects interact with different roofing systems and building types.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Resort-Grade Luxury Systems</CardTitle>
                  <CardDescription>World-class hospitality standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our resort-grade systems meet the exacting standards of Steamboat's luxury 
                    hospitality industry, delivering both stunning visual impact and uncompromising 
                    performance that protects significant resort investments while enhancing 
                    guest experiences.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Luxury resort aesthetic integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hospitality-grade sound attenuation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Minimal guest disruption installation protocols
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Resort operations coordination expertise
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Champagne Powder Engineering</CardTitle>
                  <CardDescription>Specialized light snow solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Champagne Powder engineering expertise addresses the unique challenges of 
                    Steamboat's ultra-light snow, including rapid metamorphosis potential, 
                    specialized ventilation requirements, and load calculations that account for 
                    powder-specific behavior patterns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Light snow engineering with densification factors
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Powder-specific ventilation systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced drift management solutions
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Rapid temperature change accommodation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ranch Heritage Preservation</CardTitle>
                  <CardDescription>Authentic Western character maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our ranch heritage expertise honors Steamboat's authentic Western ranching 
                    traditions while integrating modern performance systems that deliver contemporary 
                    comfort and efficiency without compromising historic architectural character.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic ranch building restoration expertise
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Traditional Western material sourcing
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Authentic architectural detail preservation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hidden modern performance integration
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Geothermal Climate Solutions</CardTitle>
                  <CardDescription">Hot springs environment expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our geothermal expertise addresses the unique effects of Steamboat's natural 
                    hot springs environment, including humidity considerations, temperature inversion 
                    impacts, and the interaction between thermal zones and roofing system performance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Humidity-resistant material systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Temperature inversion accommodation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Thermal zone-specific ventilation
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Geothermal effect mitigation strategies
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Experience Steamboat's Premier Roofing Excellence</h3>
              <p className="text-green-100 mb-6 text-lg">
                Trust the Yampa Valley's roofing specialists to protect your resort or ranch investment 
                with Champagne Powder expertise and Western heritage authenticity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Resort/Ranch Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  View Steamboat Portfolio
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
              Steamboat Springs & Routt County Compliance Excellence
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Steamboat Springs' unique combination of resort hospitality standards, ranch preservation 
                requirements, and mountain building codes requires comprehensive regulatory expertise. 
                Our eighteen years of local experience ensures smooth permit processes and complete 
                compliance with all applicable standards for both resort and ranch properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Routt County Building Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Snow Load Engineering:</strong> Calculations specific to Champagne 
                      Powder conditions and rapid densification scenarios
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wind Rating Compliance:</strong> Systems designed for Yampa Valley 
                      wind patterns and mountain storm events
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wildfire Protection:</strong> WUI zone compliance with fire-resistant 
                      materials and ember protection systems
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resort & Ranch Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Resort Hospitality Standards:</strong> Luxury accommodation requirements 
                      and guest experience protection protocols
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Historic Ranch Preservation:</strong> Western heritage character 
                      maintenance and traditional architecture compliance
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Commercial Building Codes:</strong> Large structure requirements for 
                      resort complexes and commercial ranch operations
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
              Yampa Valley Emergency Response Network
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Flame className="h-8 w-8" />
                <span className="text-2xl font-bold">30-Minute Valley Response Guarantee</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Resort-priority emergency services for all Steamboat Springs properties
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Resort Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Resort Priority Response</h3>
                  <p className="text-gray-600 text-sm">
                    Immediate emergency services for hospitality properties with guest protection protocols
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Waves className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Champagne Powder Expertise</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized equipment and techniques for light snow emergency situations
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mountain className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Ranch Property Support</h3>
                  <p className="text-gray-600 text-small">
                    Emergency services for remote ranch locations throughout Routt County
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Steamboat's Premier Mountain Roofing
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join Steamboat's most exclusive resorts and historic ranches who trust Alpine Peak Roofing 
            for Champagne Powder expertise and Western heritage authenticity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Resort/Ranch Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Steamboat Springs & Routt County
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              30-Minute Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Snowflake className="h-5 w-5" />
              Champagne Powder Specialists
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}