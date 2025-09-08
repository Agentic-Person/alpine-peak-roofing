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
  Flower2,
  TreePine,
  Zap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Crested Butte Roofing Contractor | Alpine Peak Roofing | Extreme Weather Specialists',
  description: 'Premier Crested Butte roofing contractor specializing in extreme high-altitude conditions, heavy snow loads, and Victorian mining heritage. Serving Crested Butte and Mt. Crested Butte with unmatched mountain expertise and emergency response.',
  keywords: 'Crested Butte roofing contractor, Mt. Crested Butte roofing, high-altitude roofing, extreme snow load roofing, Gunnison County roofing, Victorian restoration Crested Butte, wildflower country roofing, Crested Butte emergency roof repair',
  openGraph: {
    title: 'Premium Crested Butte Roofing Services | Alpine Peak Roofing',
    description: 'Extreme weather roofing specialists serving Crested Butte\'s unique high-altitude environment with Victorian heritage preservation expertise.',
    images: ['/images/crested-butte-wildflower-roof.jpg']
  }
}

export default function CrestedButteRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/crested-butte-wildflower-meadow.jpg"
            alt="Crested Butte Wildflower Meadows"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flower2 className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Wildflower Country Specialists
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Crested Butte's Extreme Weather Roofing Experts
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Victorian Heritage Meets Extreme High-Altitude Performance at 8,885 Feet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
              High-Altitude Emergency Response
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-900">10+</div>
              <div className="text-gray-600">Years in Crested Butte</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-900">500+</div>
              <div className="text-gray-600">Inches Annual Snow</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-900">100%</div>
              <div className="text-gray-600">Extreme Weather Rated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-900">90 Min</div>
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
              Understanding Crested Butte's Extreme Mountain Environment
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Crested Butte stands as Colorado's most isolated and weather-challenged ski town, where 
                extreme high-altitude conditions at 8,885 feet create one of North America's most demanding 
                roofing environments. Known as the "Wildflower Capital of Colorado," this Victorian mining 
                town receives over 500 inches of annual snowfall while enduring temperature extremes, 
                hurricane-force winds, and UV exposure that tests every roofing system to its absolute limits.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our ten years specializing in Crested Butte's extreme conditions has established Alpine 
                Peak Roofing as the community's trusted authority for conquering the Elk Mountains' 
                most challenging weather patterns. From preserving authentic Victorian mining structures 
                to engineering modern homes capable of withstanding 100+ pound snow loads, we understand 
                that Crested Butte roofing demands both extreme performance engineering and respect for 
                the town's treasured mining heritage.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Located in a pristine high-alpine valley surrounded by 12,000+ foot peaks, Crested Butte's 
                unique geography creates microclimate conditions that vary dramatically throughout the valley. 
                Our specialized expertise in these localized weather patterns, combined with deep knowledge 
                of the town's Victorian architectural character, ensures that every roofing system delivers 
                both authentic beauty and uncompromising protection against nature's most extreme forces.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-purple-600" />
                    Extreme Snow Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Engineering solutions for Colorado's heaviest snowfall, with systems designed 
                    to handle over 500 inches annually and snow loads exceeding 100 pounds per square foot.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flower2 className="h-5 w-5 text-purple-600" />
                    Victorian Mining Heritage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Preserving Crested Butte's authentic 1880s mining town character while integrating 
                    modern performance systems capable of extreme weather protection.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-purple-600" />
                    High-Alpine Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Specialized solutions for 8,885-foot elevation challenges including extreme UV, 
                    dramatic temperature swings, and high-altitude weather phenomena.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Conquering Colorado's Most Extreme Weather Conditions
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Crested Butte's reputation as Colorado's most snow-laden community is well-earned, with 
                annual snowfall regularly exceeding 500 inches and record seasons approaching 700 inches. 
                The town's position at 8,885 feet elevation in a high-alpine valley creates a perfect 
                storm of extreme weather conditions: massive snow loads, hurricane-force winds channeled 
                through mountain passes, temperature swings exceeding 130 degrees, and intense UV radiation 
                that accelerates material degradation at unprecedented rates.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Elk Mountains' unique topography creates weather phenomena found nowhere else in Colorado. 
                Orographic lift effects can dump 5+ feet of snow in 24 hours, while chinook wind events 
                can create temperature changes of 60+ degrees in minutes, subjecting roofing materials to 
                thermal shock cycles that destroy conventional systems. These extreme conditions, combined 
                with Crested Butte's isolated location requiring specialized logistics, demand roofing 
                solutions engineered specifically for this unforgiving environment.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our decade of Crested Butte-specific experience has revealed the critical importance of 
                understanding localized microclimates throughout the valley. From the wind-scoured ridges 
                of Mt. Crested Butte to the snow-accumulation zones of the historic town, each location 
                presents unique challenges that require specialized material selection and installation 
                techniques developed through years of high-altitude performance testing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Extreme Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 mb-2">8,885 ft</div>
                  <p className="text-gray-600 text-sm">
                    High-altitude conditions require specialized engineering and material selection
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Record Snowfall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 mb-2">500+ inches</div>
                  <p className="text-gray-600 text-sm">
                    Colorado's heaviest snowfall requires maximum structural load engineering
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Mountain Winds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 mb-2">130+ MPH</div>
                  <p className="text-gray-600 text-sm">
                    Extreme wind events require specialized attachment and reinforcement systems
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">UV Intensity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 mb-2">60% Higher</div>
                  <p className="text-gray-600 text-sm">
                    Extreme high-altitude UV exposure demands premium material protection systems
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Crested Butte Weather Phenomena & Solutions</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-purple-900 mb-3">Extreme Winter Challenges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Snow load engineering for 100+ lbs per square foot
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Advanced ice dam prevention systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Emergency snow removal and roof access protocols
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Heated gutter and downspout systems
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-purple-900 mb-3">High-Altitude Performance Solutions</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      UV-resistant premium coatings and materials
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Thermal shock resistant installation techniques
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Wind uplift rated for 150+ mph events
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      High-altitude ventilation optimization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crested Butte-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Extreme Weather Roofing Systems for Crested Butte
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Crested Butte's extreme weather conditions demand roofing systems engineered specifically 
                for this unique high-alpine environment. Our decade of local specialization has refined 
                our approach to deliver solutions that not only survive Colorado's most challenging weather 
                but maintain their performance and appearance year after year. From Victorian mining cabin 
                restorations to modern mountain homes, every installation incorporates hard-won knowledge 
                of how different materials and systems perform in Crested Butte's demanding conditions.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our material selection and installation techniques are calibrated specifically for the 
                Elk Mountains' unique challenges: massive snow loads, extreme thermal cycling, hurricane-force 
                winds, and intense UV exposure that can destroy conventional systems in a single season. 
                Every project incorporates lessons learned from hundreds of high-altitude installations, 
                ensuring optimal performance in Colorado's most challenging mountain environment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Extreme Snow Load Engineering</CardTitle>
                  <CardDescription>Maximum capacity structural solutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our snow load engineering systems are designed for Crested Butte's record-breaking 
                    snowfall, with structural capacity exceeding 120 pounds per square foot and 
                    specialized attachment systems that maintain integrity under extreme loading conditions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Engineered for 500+ inch annual snowfall
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Reinforced deck systems for maximum load capacity
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced ice dam prevention technology
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emergency snow removal access systems
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">High-Altitude Material Systems</CardTitle>
                  <CardDescription>Engineered for extreme mountain conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our high-altitude material systems are specifically selected and tested for Crested 
                    Butte's punishing conditions, incorporating UV-resistant technologies, thermal shock 
                    resistance, and wind uplift ratings that exceed conventional mountain standards.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      UV-resistant premium material selections
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Thermal shock resistant installation systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Wind uplift rated to 160+ mph
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Extended warranties for high-altitude performance
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Victorian Heritage Preservation</CardTitle>
                  <CardDescription>Authentic restoration with modern performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Victorian restoration expertise honors Crested Butte's authentic mining town 
                    character while integrating hidden performance technologies that deliver modern 
                    protection against the Elk Mountains' extreme weather conditions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Period-appropriate material sourcing and matching
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hidden insulation and ventilation integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Historic character compliance certification
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Modern performance without visual impact
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Emergency Response Systems</CardTitle>
                  <CardDescription>Rapid response for extreme weather events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our specialized emergency response capabilities are designed for Crested Butte's 
                    isolated location and extreme weather events, with equipment and expertise 
                    specifically configured for high-altitude emergency roofing situations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      High-altitude emergency equipment staging
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      90-minute response guarantee in valley
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Specialized snow removal and ice dam clearing
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      24/7 availability throughout ski season
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Conquer Crested Butte's Extreme Weather</h3>
              <p className="text-purple-100 mb-6 text-lg">
                Experience Colorado's premier extreme weather roofing specialists, engineered 
                specifically for the Elk Mountains' most challenging conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Extreme Weather Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  View High-Altitude Portfolio
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
              Crested Butte Building Standards & High-Altitude Compliance
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Crested Butte's unique combination of historic preservation requirements and extreme 
                weather building codes requires specialized expertise in both Victorian-era restoration 
                and high-altitude construction standards. Our deep knowledge of local regulations 
                ensures smooth permit processes and complete compliance with all applicable standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Gunnison County Building Codes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Extreme Snow Load Requirements:</strong> Engineering calculations for 
                      90+ PSF snow loads in high-accumulation areas
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>High-Altitude Wind Standards:</strong> Systems rated for 130+ mph 
                      wind events with uplift resistance verification
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wildfire Protection Requirements:</strong> Class A fire-rated materials 
                      and ember-resistant construction standards
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historic Preservation Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Victorian Character Maintenance:</strong> Authentic material selection 
                      and period-appropriate installation techniques
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Historic District Compliance:</strong> Design review approval and 
                      architectural compatibility verification
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Mining Heritage Preservation:</strong> Specialized techniques for 
                      1880s era building conservation
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
              Extreme Weather Emergency Response
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-8 w-8" />
                <span className="text-2xl font-bold">90-Minute High-Altitude Response</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                Specialized equipment and expertise for Crested Butte's extreme weather emergencies
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Extreme Weather Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Snowflake className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Heavy Snow Emergency</h3>
                  <p className="text-gray-600 text-sm">
                    Emergency snow removal, ice dam clearing, and structural assessment services
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Wind className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">High-Wind Storm Response</h3>
                  <p className="text-gray-600 text-sm">
                    Immediate damage assessment and emergency protection for extreme wind events
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <TreePine className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">High-Altitude Response Team</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized high-altitude equipment and techniques for mountain emergency situations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Conquer Crested Butte's Extreme Conditions
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Trust Colorado's extreme weather roofing specialists to protect your property 
            against the Elk Mountains' most challenging conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Extreme Weather Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-purple-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Crested Butte & Mt. Crested Butte
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              90-Minute Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Snowflake className="h-5 w-5" />
              Extreme Weather Specialists
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}