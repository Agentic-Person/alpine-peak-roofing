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
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Star,
  Shield,
  Building2,
  TreePine,
  Gem
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Central Mountains Roofing Services | Alpine Peak Roofing | Summit & Eagle Counties',
  description: 'Premier roofing services across Colorado\'s Central Mountains including Aspen, Vail, Breckenridge, Keystone, Copper Mountain, and Winter Park. Specialized expertise in high-altitude extreme weather conditions.',
  keywords: 'Central Mountains roofing, Summit County roofing, Eagle County roofing, high-altitude roofing, ski resort roofing, mountain roofing Colorado, extreme weather roofing',
  openGraph: {
    title: 'Central Mountains Roofing Excellence | Alpine Peak Roofing',
    description: 'Colorado\'s premier high-altitude roofing specialists serving the Central Mountains with unmatched expertise and emergency response.',
    images: ['/images/central-mountains-panorama.jpg']
  }
}

export default function CentralMountainsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/central-mountains-fourteen-peaks.jpg"
            alt="Central Mountains Fourteeners"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              High-Altitude Specialists
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Central Mountains Roofing Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Summit, Eagle, and Pitkin Counties | 8,000-12,000+ Feet Elevation Expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              Regional Emergency Response
            </Button>
          </div>
        </div>
      </section>

      {/* Service Area Stats */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900">25+</div>
              <div className="text-gray-600">Communities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">12,000+ ft</div>
              <div className="text-gray-600">Maximum Elevation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-gray-600">Inches Annual Snow</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <div className="text-gray-600">Resort Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-gray-600">Emergency Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Colorado's Premier High-Altitude Roofing Service Network
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Central Mountains region represents Colorado's most challenging and prestigious 
                roofing environment, where elevations from 8,000 to over 12,000 feet create extreme 
                weather conditions that demand specialized expertise. From the luxury resort communities 
                of Aspen and Vail to the world-class ski destinations of Summit County, this region 
                requires roofing solutions that seamlessly integrate extreme weather performance with 
                the highest aesthetic and quality standards.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our comprehensive Central Mountains service network leverages over two decades of 
                high-altitude specialization to serve the region's diverse communities with unmatched 
                expertise. Whether protecting a historic Victorian mining cabin in Telluride, 
                engineering a luxury resort complex in Vail, or delivering emergency services to 
                Summit County ski areas, our regionally-distributed teams ensure rapid response 
                and optimal performance across this vast mountain territory.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The Central Mountains' unique geography creates microclimates and weather patterns 
                that vary dramatically from valley to valley, requiring localized expertise that 
                goes far beyond conventional mountain roofing approaches. Our region-wide presence 
                combines this local knowledge with standardized quality systems, delivering consistent 
                excellence whether serving Aspen's ultra-luxury market or Winter Park's extreme 
                Continental Divide conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Communities Served */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Central Mountains Communities We Serve
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Gem className="h-5 w-5 text-amber-600" />
                      Aspen
                    </CardTitle>
                    <Badge variant="outline">Ultra-Luxury</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Historic preservation specialists for Colorado's most exclusive mountain community. 
                    Victorian mining heritage meets ultra-luxury performance at 7,908 feet.
                  </p>
                  <Link href="/locations/aspen">
                    <Button variant="outline" size="sm" className="w-full">
                      Aspen Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-slate-600" />
                      Vail
                    </CardTitle>
                    <Badge variant="outline">Resort Authority</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Premier resort roofing specialists serving Vail Valley's luxury hospitality 
                    industry and residential communities with unmatched resort expertise.
                  </p>
                  <Link href="/locations/vail">
                    <Button variant="outline" size="sm" className="w-full">
                      Vail Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Gem className="h-5 w-5 text-amber-600" />
                      Telluride
                    </CardTitle>
                    <Badge variant="outline">Historic Masters</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    National Historic Landmark preservation experts serving Telluride's authentic 
                    Victorian mining town character at 8,750 feet elevation.
                  </p>
                  <Link href="/locations/telluride">
                    <Button variant="outline" size="sm" className="w-full">
                      Telluride Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Snowflake className="h-5 w-5 text-purple-600" />
                      Crested Butte
                    </CardTitle>
                    <Badge variant="outline">Extreme Weather</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Extreme high-altitude specialists for Colorado's most challenging weather 
                    conditions. 500+ inches annual snowfall engineering at 8,885 feet.
                  </p>
                  <Link href="/locations/crested-butte">
                    <Button variant="outline" size="sm" className="w-full">
                      Crested Butte Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Mountain className="h-5 w-5 text-blue-600" />
                      Winter Park
                    </CardTitle>
                    <Badge variant="outline">Continental Divide</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Continental Divide specialists serving Mary Jane extreme conditions and 
                    Fraser Valley communities at 9,000+ feet elevation.
                  </p>
                  <Link href="/locations/winter-park">
                    <Button variant="outline" size="sm" className="w-full">
                      Winter Park Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TreePine className="h-5 w-5 text-green-600" />
                      Steamboat Springs
                    </CardTitle>
                    <Badge variant="outline">Champagne Powder</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Resort and ranch specialists for Steamboat's unique Champagne Powder environment. 
                    Yampa Valley expertise with geothermal considerations.
                  </p>
                  <Link href="/locations/steamboat-springs">
                    <Button variant="outline" size="sm" className="w-full">
                      Steamboat Services <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Additional Summit County Communities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-slate-900">Breckenridge</strong>
                  <div className="text-sm text-gray-600">Historic Mining + Modern Resort</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-slate-900">Keystone</strong>
                  <div className="text-sm text-gray-600">Alpine Resort Excellence</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-slate-900">Copper Mountain</strong>
                  <div className="text-sm text-gray-600">High-Altitude Ski Village</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-slate-900">Silverthorne</strong>
                  <div className="text-sm text-gray-600">Summit County Services Hub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Specializations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Central Mountains Specialized Services
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">High-Altitude Engineering</CardTitle>
                  <CardDescription>8,000-12,000+ foot elevation expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our high-altitude engineering capabilities are specifically developed for the 
                    Central Mountains' extreme elevation conditions, incorporating advanced materials 
                    science, structural engineering, and weather resistance technologies that perform 
                    optimally in thin air and extreme UV exposure.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Extreme UV protection systems (50-60% higher intensity)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Thermal cycling accommodation (120+ degree ranges)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Wind resistance engineering (150+ mph events)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Snow load capacity (100+ PSF structural design)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Resort & Hospitality Excellence</CardTitle>
                  <CardDescription>Luxury accommodation industry standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our resort and hospitality roofing expertise serves Colorado's premier ski 
                    destinations with specialized knowledge of guest experience protection, seasonal 
                    operations coordination, and luxury accommodation standards that exceed 
                    conventional commercial roofing approaches.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Luxury hospitality aesthetic integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Minimal guest disruption installation protocols
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Seasonal operations coordination expertise
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Sound attenuation for guest comfort
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Historic Preservation Mastery</CardTitle>
                  <CardDescription>Victorian mining heritage conservation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our historic preservation capabilities honor the Central Mountains' rich mining 
                    heritage while integrating modern performance systems. From authentic Victorian 
                    restorations to National Historic Landmark compliance, we maintain architectural 
                    character while delivering contemporary protection and comfort.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Victorian-era material sourcing and matching
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      National Historic Landmark compliance
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hidden modern performance integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic tax credit coordination support
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Emergency Response Network</CardTitle>
                  <CardDescription>Regional 24/7 emergency coverage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Central Mountains emergency response network provides rapid deployment 
                    capabilities across the region's vast territory with specialized equipment 
                    and expertise configured for high-altitude emergency situations and extreme 
                    weather event response.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Regional equipment staging and rapid deployment
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      High-altitude specialized emergency equipment
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Resort priority response protocols
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Extreme weather event rapid assessment
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Emergency Response */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Central Mountains Emergency Response Network
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-8 w-8" />
                <span className="text-2xl font-bold">Regional 24/7 Emergency Coverage</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Rapid deployment across Summit, Eagle, and Pitkin Counties with specialized high-altitude equipment
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Regional Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mountain className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">High-Altitude Response</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized equipment and expertise for 8,000-12,000+ foot elevation emergencies
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Resort Priority Service</h3>
                  <p className="text-gray-600 text-sm">
                    Priority emergency response for hospitality properties and guest protection
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Snowflake className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Extreme Weather Specialists</h3>
                  <p className="text-gray-600 text-sm">
                    Regional deployment for major storm events and emergency damage assessment
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
            Experience Central Mountains Roofing Excellence
          </h2>
          <p className="text-xl text-slate-100 mb-8 max-w-3xl mx-auto">
            Trust Colorado's premier high-altitude roofing specialists to protect your Central Mountains 
            property with unmatched expertise, regional coverage, and 24/7 emergency response.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-slate-600 hover:bg-slate-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-600">
              Regional Service Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Summit, Eagle & Pitkin Counties
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              24/7 Regional Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              8,000-12,000+ Foot Elevation Specialists
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}