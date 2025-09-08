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
  TreePine,
  Train,
  Zap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Winter Park Roofing Contractor | Alpine Peak Roofing | Mary Jane & Fraser Valley Specialists',
  description: 'Premier Winter Park roofing contractor specializing in Continental Divide conditions, Mary Jane extreme weather, and Fraser Valley properties. Serving Winter Park, Fraser, and Grand County with unmatched mountain expertise.',
  keywords: 'Winter Park roofing contractor, Mary Jane roofing, Fraser roofing, Continental Divide roofing, Grand County roofing, extreme weather roofing, high-altitude roofing, Winter Park emergency roof repair',
  openGraph: {
    title: 'Premium Winter Park Roofing Services | Alpine Peak Roofing',
    description: 'Continental Divide roofing specialists serving Winter Park\'s extreme weather environment with Mary Jane mountain expertise.',
    images: ['/images/winter-park-mary-jane-roof.jpg']
  }
}

export default function WinterParkRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-800/80 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/winter-park-continental-divide.jpg"
            alt="Winter Park Continental Divide"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Train className="h-8 w-8" />
            <Badge variant="outline" className="text-white border-white">
              Continental Divide Specialists
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Winter Park's Continental Divide Roofing Experts
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-medium">
            Mary Jane Mountain Conditions & Fraser Valley Excellence at 9,000+ Feet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Continental Divide Emergency
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-900">14+</div>
              <div className="text-gray-600">Years in Winter Park</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">400+</div>
              <div className="text-gray-600">Inches Annual Snow</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">100%</div>
              <div className="text-gray-600">Continental Divide Rated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">45 Min</div>
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
              Understanding Winter Park's Continental Divide Environment
            </h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Winter Park stands as Colorado's gateway to the Continental Divide, where elevation 
                above 9,000 feet creates some of the most challenging roofing conditions in North 
                America. Located in the heart of the Fraser Valley with direct exposure to Continental 
                Divide weather patterns, this legendary ski destination receives over 400 inches of 
                annual snowfall while enduring extreme wind events, temperature swings exceeding 100 
                degrees, and the unique weather phenomena that occur along the spine of the continent.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our fourteen years specializing in Winter Park's extreme high-altitude conditions has 
                established Alpine Peak Roofing as the valley's trusted authority for conquering 
                Continental Divide weather patterns. From engineering solutions for Mary Jane's 
                legendary snow conditions to protecting Fraser Valley homes from chinook wind events, 
                we understand that Winter Park roofing demands both extreme performance engineering 
                and deep knowledge of how Continental Divide topography affects local weather systems.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                The Fraser Valley's unique position creates a perfect storm of extreme weather conditions: 
                massive snow accumulations from Pacific storms, dramatic temperature changes from continental 
                air masses, and wind patterns that can exceed hurricane force when channeled through mountain 
                passes. Our specialized expertise in these conditions ensures that every installation performs 
                optimally in one of Colorado's most demanding mountain environments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-blue-600" />
                    Continental Divide Exposure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Direct exposure to Continental Divide weather systems creates unique challenges 
                    requiring specialized engineering for extreme altitude and weather conditions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Snowflake className="h-5 w-5 text-blue-600" />
                    Mary Jane Extreme Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Engineering solutions for Mary Jane's legendary snow conditions and extreme 
                    weather patterns that challenge conventional mountain roofing approaches.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-blue-600" />
                    Fraser Valley Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Seamless integration with Fraser Valley's mountain community character while 
                    delivering uncompromising performance against extreme weather conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Climate Challenges */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Conquering Continental Divide Weather Extremes
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Winter Park's position at over 9,000 feet elevation along the Continental Divide creates 
                weather conditions that exceed the extremes found anywhere else in Colorado. The valley 
                receives the full force of Pacific storm systems while simultaneously experiencing 
                continental air mass effects, creating a perfect storm of challenging conditions: 
                snow accumulations exceeding 400 inches annually, wind events that can reach 150+ mph, 
                and temperature swings that can exceed 100 degrees in 24-hour periods.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Continental Divide's unique topography creates weather phenomena found nowhere else 
                on earth. Orographic lift effects can produce 6+ feet of snow in single storm events, 
                while chinook winds racing down the eastern slope can create temperature changes of 
                70+ degrees in hours, subjecting roofing materials to thermal shock that destroys 
                conventional systems. These extreme conditions, combined with the valley's high-altitude 
                exposure, demand roofing solutions engineered specifically for Continental Divide conditions.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our fourteen years of Winter Park specialization has revealed the critical importance 
                of understanding how Continental Divide weather patterns interact with Fraser Valley 
                topography. From the wind-scoured ridges above Mary Jane to the snow accumulation zones 
                in town, each microclimate presents unique challenges that require specialized material 
                selection and installation techniques developed through extensive high-altitude testing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Mountain className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Continental Divide Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">9,000+ ft</div>
                  <p className="text-gray-600 text-sm">
                    Extreme high-altitude exposure to Continental Divide weather systems
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Snowflake className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Mary Jane Snowfall</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">400+ inches</div>
                  <p className="text-gray-600 text-sm">
                    Legendary snow conditions requiring maximum structural engineering
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Wind className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Chinook Wind Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">150+ MPH</div>
                  <p className="text-gray-600 text-sm">
                    Extreme wind events require hurricane-rated attachment systems
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Temperature Extremes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 mb-2">100°F Range</div>
                  <p className="text-gray-600 text-sm">
                    Extreme thermal cycling demands specialized material engineering
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Continental Divide Weather Solutions</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Extreme Weather Engineering</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Continental Divide wind pattern analysis and mitigation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Mary Jane snow load engineering (100+ PSF capacity)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Extreme thermal cycling accommodation systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      High-altitude UV protection and material selection
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-blue-900 mb-3">Fraser Valley Adaptations</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Valley-specific microclimate considerations
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Chinook wind damage prevention systems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Advanced ice dam prevention for extreme conditions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Emergency snow removal access systems
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winter Park-Specific Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Continental Divide Roofing Engineering Excellence
            </h2>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Winter Park's Continental Divide location demands roofing systems engineered specifically 
                for the most extreme high-altitude conditions in Colorado. Our fourteen years of local 
                specialization has refined our approach to deliver solutions that not only survive the 
                Fraser Valley's punishing weather but maintain peak performance year after year. Every 
                installation incorporates hard-won knowledge of how Continental Divide weather patterns 
                interact with different materials, building orientations, and elevation exposures.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                From specialized snow load engineering that accounts for Mary Jane's legendary accumulations 
                to wind-resistant systems designed for chinook events, our material selections and 
                installation techniques are calibrated specifically for Winter Park's unique position 
                along the spine of the continent. Every project delivers proven performance in Colorado's 
                most challenging mountain environment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Continental Divide Engineering</CardTitle>
                  <CardDescription>Extreme high-altitude performance systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Continental Divide engineering systems are designed specifically for Winter 
                    Park's extreme elevation exposure, incorporating advanced structural engineering, 
                    thermal performance, and weather resistance that exceed conventional mountain 
                    roofing standards by significant margins.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      9,000+ foot elevation performance optimization
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Continental weather pattern resistance
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Extreme UV protection for high-altitude exposure
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced thermal cycling accommodation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mary Jane Snow Load Systems</CardTitle>
                  <CardDescription>Legendary snow condition engineering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Mary Jane snow load engineering addresses the unique challenges of Winter 
                    Park's legendary snow conditions, with structural systems designed to handle 
                    over 100 pounds per square foot while maintaining architectural integrity 
                    and performance throughout extreme loading cycles.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      400+ inch annual snowfall engineering
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Maximum structural load capacity (100+ PSF)
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced snow retention and shedding systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emergency access and snow removal protocols
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Chinook Wind Resistance</CardTitle>
                  <CardDescription>Hurricane-force wind protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our chinook wind resistance systems are engineered for Winter Park's extreme 
                    wind events, with attachment and structural systems rated for 150+ mph winds 
                    and specialized design features that accommodate the unique characteristics 
                    of Continental Divide wind patterns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      150+ mph wind event resistance
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hurricane-rated attachment systems
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Continental Divide wind pattern analysis
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
                  <CardTitle className="text-xl">Fraser Valley Integration</CardTitle>
                  <CardDescription>Community character and performance harmony</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Our Fraser Valley integration expertise ensures that every installation enhances 
                    Winter Park's mountain community character while delivering uncompromising 
                    performance against Continental Divide weather extremes, maintaining both 
                    aesthetic appeal and functional excellence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Mountain community aesthetic integration
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Valley-specific microclimate adaptations
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Ski area proximity considerations
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Seasonal access and logistics planning
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Conquer Continental Divide Conditions</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Experience Colorado's Continental Divide roofing specialists, engineered specifically 
                for Winter Park's extreme high-altitude and weather conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Continental Divide Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Mary Jane Portfolio
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
              Winter Park & Grand County Building Excellence
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Winter Park's extreme Continental Divide location requires compliance with some of 
                Colorado's most stringent high-altitude building codes. Our fourteen years of local 
                expertise ensures smooth permit processes and complete compliance with all applicable 
                standards for extreme weather and high-altitude construction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Grand County Extreme Weather Codes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Continental Divide Snow Loads:</strong> Engineering requirements for 
                      100+ PSF snow loads in extreme accumulation zones
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>High-Altitude Wind Standards:</strong> Systems rated for 150+ mph 
                      chinook wind events with specialized attachment requirements
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Extreme Temperature Compliance:</strong> Materials and systems tested 
                      for 100+ degree temperature swing accommodation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>High-Altitude Construction Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>9,000+ Foot Elevation Requirements:</strong> Specialized materials and 
                      installation techniques for extreme high-altitude exposure
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Continental Divide Weather Standards:</strong> Systems designed for 
                      unique weather patterns along the Continental Divide
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Wildfire Protection Requirements:</strong> WUI zone compliance with 
                      fire-resistant materials for high-risk areas
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
              Continental Divide Emergency Response
            </h2>
            
            <div className="bg-red-600 text-white rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-8 w-8" />
                <span className="text-2xl font-bold">45-Minute Fraser Valley Response</span>
              </div>
              <p className="text-red-100 text-lg mb-4">
                High-altitude emergency services for Continental Divide extreme weather events
              </p>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Continental Emergency: (303) 555-PEAK
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Mountain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">High-Altitude Emergency</h3>
                  <p className="text-gray-600 text-sm">
                    Specialized equipment and expertise for 9,000+ foot elevation emergency situations
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Wind className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Chinook Wind Response</h3>
                  <p className="text-gray-600 text-sm">
                    Immediate damage assessment and emergency protection for extreme wind events
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <TreePine className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Mary Jane Snow Emergency</h3>
                  <p className="text-gray-600 text-sm">
                    Emergency snow removal and structural assessment for extreme accumulations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Master Winter Park's Continental Divide Conditions
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Trust Colorado's Continental Divide roofing specialists to protect your property 
            against the Fraser Valley's most extreme weather conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Phone className="mr-2 h-5 w-5" />
              (303) 555-PEAK
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Continental Divide Consultation
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Serving Winter Park & Fraser Valley
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              45-Minute Emergency Response
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Continental Divide Specialists
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}