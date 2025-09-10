import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Steamboat Springs Resort & Ranch Roofing | Alpine Peak Roofing Colorado',
  description: 'Premier Steamboat Springs roofing contractors serving resort properties and working ranches. Champagne Powder climate specialists at 6,732 feet elevation with geothermal considerations.',
  keywords: 'steamboat springs roofing contractors, resort roofing steamboat springs, ranch roofing colorado, steamboat springs roofing company',
  openGraph: {
    title: 'Resort & Ranch Roofing Specialists in Steamboat Springs, Colorado',
    description: 'Serving Steamboat Springs\' unique combination of resort luxury and authentic ranch heritage.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/locations/steamboat-springs',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/locations/steamboat-springs'
  }
}

export default function SteamboatSpringsRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-green-600 hover:text-green-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/locations" className="text-green-600 hover:text-green-800">Locations</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Steamboat Springs</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Resort & Ranch Specialists
            <span className="block text-green-600">Steamboat Springs, Colorado</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Serving Steamboat Springs' unique blend of world-class resort amenities and authentic ranching heritage. 
            At 6,732 feet in the Yampa Valley, we deliver specialized roofing solutions for both luxury resorts 
            and working ranch operations.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">6,732</div>
              <div className="text-sm text-gray-600">Feet Elevation</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">165</div>
              <div className="text-sm text-gray-600">Ski Days/Year</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">30 Min</div>
              <div className="text-sm text-gray-600">Valley Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">334</div>
              <div className="text-sm text-gray-600">Inches Snow/Year</div>
            </div>
          </div>
        </header>

        {/* Resort & Ranch Authority */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Resort & Ranch Roofing Authority</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Dual Heritage Expertise</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Steamboat Springs uniquely combines world-class ski resort amenities with authentic 
                ranching traditions. Our roofing solutions honor both legacies, delivering resort-quality 
                craftsmanship for luxury properties while providing practical, durable systems for 
                working ranch operations.
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Champagne Powder Climate</h4>
                  <p className="text-green-800 text-sm">
                    Steamboat's legendary powder snow creates unique challenges with light, dry snow 
                    that can drift extensively and accumulate to extraordinary depths.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Geothermal Considerations</h4>
                  <p className="text-blue-800 text-sm">
                    Natural hot springs and geothermal activity create microclimates requiring 
                    specialized ventilation and moisture management solutions.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Valley Weather Patterns</h4>
                  <p className="text-purple-800 text-sm">
                    Yampa Valley's orientation creates distinct weather patterns with temperature 
                    inversions and unique wind flow characteristics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Yampa Valley Conditions</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Climate Characteristics</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Base elevation: 6,732 feet</li>
                    <li>• Ski area summit: 10,568 feet</li>
                    <li>• Continental climate with maritime influence</li>
                    <li>• Natural hot springs microclimate effects</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Snow Characteristics</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Annual snowfall: 334+ inches</li>
                    <li>• Famous "Champagne Powder" snow</li>
                    <li>• Deep base depths: 60-100+ inches</li>
                    <li>• Extended ski season: 165+ days</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Temperature Patterns</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Winter lows: -20°F to -10°F</li>
                    <li>• Summer highs: 82°F to 88°F</li>
                    <li>• Moderate temperature inversions</li>
                    <li>• Geothermal warming zones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Resort & Ranch Specialized Services</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎿</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Resort Property Systems</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Luxury ski resort facilities requiring hospitality-grade performance 
                and guest experience optimization during peak seasons.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Lodge and hotel roofing systems</li>
                <li>• Guest service facility upgrades</li>
                <li>• Gondola and lift building protection</li>
                <li>• Resort village commercial properties</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🐄</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Working Ranch Operations</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Practical, durable roofing solutions for cattle ranches, hay operations, 
                and agricultural facilities throughout the Yampa Valley.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Barn and stable roofing systems</li>
                <li>• Equipment storage facilities</li>
                <li>• Feed and grain storage protection</li>
                <li>• Ranch residence upgrades</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">♨️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Geothermal Integration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized systems that account for natural hot springs and geothermal 
                activity affecting local microclimates and building performance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Moisture management enhancement</li>
                <li>• Thermal bridging considerations</li>
                <li>• Specialized ventilation systems</li>
                <li>• Hot spring facility roofing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Signature Steamboat Projects</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resort Showcase</h3>
              
              <div className="space-y-8">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Steamboat Grand Resort</h4>
                  <p className="text-gray-700 mb-3">
                    Luxury slopeside hotel complex featuring advanced snow management systems 
                    and resort-grade weatherproofing for year-round operations.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Size:</span> 120,000 sq ft • 
                    <span className="font-medium ml-2">Rooms:</span> 327 luxury suites • 
                    <span className="font-medium ml-2">Completion:</span> 2023
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Catamount Ranch Estate</h4>
                  <p className="text-gray-700 mb-3">
                    15,000-acre working cattle ranch with 25+ building complex featuring 
                    traditional ranch architecture with modern performance systems.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Acreage:</span> 15,000+ acres • 
                    <span className="font-medium ml-2">Buildings:</span> 25+ structures • 
                    <span className="font-medium ml-2">Cattle:</span> 2,000+ head capacity
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Strawberry Park Hot Springs</h4>
                  <p className="text-gray-700 mb-3">
                    Historic natural hot springs facility requiring specialized moisture 
                    management and geothermal microclimate considerations.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Challenge:</span> High humidity • 
                    <span className="font-medium ml-2">Special:</span> Geothermal effects • 
                    <span className="font-medium ml-2">Era:</span> 1875 origins
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-green-50 to-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Client Success Stories</h3>
              
              <div className="space-y-6">
                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "Alpine Peak understood our resort's need for zero downtime during peak season. 
                    Their scheduling and execution were flawless - guests never knew we were working."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Resort General Manager</cite>
                </blockquote>

                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "They get ranching. Our barns needed practical solutions that work in all weather. 
                    Five years later, everything's performing exactly as promised."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Fourth-Generation Rancher</cite>
                </blockquote>

                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "The geothermal considerations were complex, but they engineered solutions that 
                    handle the unique moisture and temperature conditions perfectly."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Hot Springs Facility Owner</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Valley-Wide Service */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Yampa Valley Service Coverage</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive roofing services throughout the Steamboat Springs area and greater Yampa Valley.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Service Area Communities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">Core Area</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Steamboat Springs</li>
                    <li>• Steamboat Village</li>
                    <li>• Fish Creek Falls area</li>
                    <li>• Rabbit Ears Pass</li>
                  </ul>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">Valley Ranch Areas</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Catamount Ranch</li>
                    <li>• Stagecoach Reservoir</li>
                    <li>• Oak Creek Valley</li>
                    <li>• Yampa River ranches</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Response Times</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">City Limits</span>
                    <span className="text-yellow-300 text-lg font-bold">30 min</span>
                  </div>
                  <p className="text-sm opacity-80">Steamboat Springs city and immediate resort area</p>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Yampa Valley</span>
                    <span className="text-blue-300 text-lg font-bold">60 min</span>
                  </div>
                  <p className="text-sm opacity-80">Ranch properties and valley floor locations</p>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Remote Ranch Areas</span>
                    <span className="text-green-300 text-lg font-bold">90 min</span>
                  </div>
                  <p className="text-sm opacity-80">Backcountry and high-elevation ranch properties</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Considerations */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Seasonal Service Optimization</h2>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Spring Planning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Post-winter assessment and summer project preparation for both resort and ranch properties.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">☀️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Summer Construction</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Peak construction season with coordinated scheduling to minimize disruption to resort and ranch operations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍂</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fall Preparation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Winter weatherization and preventive maintenance before the ski season and harsh winter conditions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❄️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Winter Monitoring</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Emergency-only operations with rapid response capabilities for both resort emergencies and ranch needs.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Steamboat Springs Roofing Partner</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Whether you operate a luxury resort, manage a working ranch, or own property in the Yampa Valley, 
              trust our deep understanding of Steamboat's unique conditions and dual heritage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                Schedule Valley Assessment
              </Link>
              <Link 
                href="/investment-analysis" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Calculate ROI
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Resort & ranch consultation • Geothermal considerations • 30-minute valley response</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}