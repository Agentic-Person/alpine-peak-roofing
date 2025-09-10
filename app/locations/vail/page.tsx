import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vail Resort Roofing Specialists | Alpine Peak Roofing Colorado',
  description: 'Premier Vail roofing contractors serving resort properties and luxury homes. Expert high-altitude roofing at 8,150 feet with 25+ years serving Vail Valley\'s elite properties.',
  keywords: 'vail roofing contractors, vail colorado roofing, resort roofing vail, luxury vail roofing company, high altitude roofing vail',
  openGraph: {
    title: 'Premier Resort Roofing Specialists in Vail, Colorado',
    description: 'Serving Vail\'s luxury resort properties with world-class roofing expertise and premium materials.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/locations/vail',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/locations/vail'
  }
}

export default function VailRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/locations" className="text-blue-600 hover:text-blue-800">Locations</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Vail</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            World-Class Resort Roofing
            <span className="block text-blue-600">Vail, Colorado</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Serving Vail's legendary resort properties and luxury residences with unmatched expertise. 
            At 8,150 feet elevation in the heart of the Vail Valley, we deliver roofing solutions 
            that meet the highest standards of the world's premier ski destination.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">8,150</div>
              <div className="text-sm text-gray-600">Feet Elevation</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">350+</div>
              <div className="text-sm text-gray-600">Resort Projects</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">90 Min</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">300+</div>
              <div className="text-sm text-gray-600">Inches Snow/Year</div>
            </div>
          </div>
        </header>

        {/* Vail Resort Authority */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Vail Resort Roofing Authority</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resort-Grade Standards</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Vail's reputation as America's premier ski destination demands roofing systems that 
                perform flawlessly under extreme conditions while maintaining the architectural elegance 
                expected by international guests and property owners.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Hospitality Excellence</h4>
                  <p className="text-blue-800 text-sm">
                    Resort properties require zero downtime during peak seasons. Our projects 
                    are meticulously scheduled and executed to avoid disrupting guest experiences.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Architectural Integration</h4>
                  <p className="text-green-800 text-sm">
                    From traditional Alpine chalets to contemporary mountain modern estates, 
                    our roofing solutions enhance each property's unique architectural character.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">International Standards</h4>
                  <p className="text-purple-800 text-sm">
                    Global property owners expect European-quality craftsmanship combined 
                    with American efficiency and innovation in every project.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Vail Valley Conditions</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">High-Altitude Performance</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Elevation: 8,150 feet base village</li>
                    <li>• Ski area summit: 11,570 feet</li>
                    <li>• Reduced atmospheric pressure effects</li>
                    <li>• Extreme UV exposure levels</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Snow Engineering</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Average snowfall: 300+ inches annually</li>
                    <li>• Ground snow load: 70-90 psf</li>
                    <li>• Champagne powder (low density)</li>
                    <li>• Complex drift patterns in bowls</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Weather Extremes</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Winter lows: -25°F to -15°F</li>
                    <li>• Summer highs: 75°F to 82°F</li>
                    <li>• Chinook wind events: 80+ mph</li>
                    <li>• Freeze-thaw cycles: 165+ annually</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resort Services */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Specialized Resort Services</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏂</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Resort Property Systems</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized roofing for lodges, hotels, and resort facilities requiring 
                maximum uptime and guest safety during peak seasons.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Large-span commercial applications</li>
                <li>• High-traffic area reinforcement</li>
                <li>• Snow management automation</li>
                <li>• Hospitality-grade noise control</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎿</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ski-In/Ski-Out Properties</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ultra-premium residences with direct slope access requiring specialized 
                snow load engineering and aesthetic perfection.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Extreme snow load calculations</li>
                <li>• Heated roof edge systems</li>
                <li>• Custom snow retention design</li>
                <li>• Slope-side weather protection</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⛷️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Alpine Village Integration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Seamless integration with Vail Village's European-inspired architecture 
                and strict design guidelines.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Bavarian architectural compatibility</li>
                <li>• Design review board compliance</li>
                <li>• Historic district preservation</li>
                <li>• Pedestrian area considerations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Signature Vail Projects</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resort Showcase</h3>
              
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Four Seasons Vail Residences</h4>
                  <p className="text-gray-700 mb-3">
                    Luxury condominium complex featuring premium metal roofing with integrated 
                    snow melting systems and resort-grade finishes.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Size:</span> 85,000 sq ft • 
                    <span className="font-medium ml-2">Units:</span> 72 luxury residences • 
                    <span className="font-medium ml-2">Completion:</span> 2023
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Blue Sky Basin Lodge</h4>
                  <p className="text-gray-700 mb-3">
                    On-mountain dining facility with extreme exposure requiring specialized 
                    wind-resistant systems and rapid snow shedding capability.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Elevation:</span> 11,200 ft • 
                    <span className="font-medium ml-2">Winds:</span> 120+ mph • 
                    <span className="font-medium ml-2">Snow Load:</span> 200+ psf
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Vail Village Penthouses</h4>
                  <p className="text-gray-700 mb-3">
                    Historic district luxury penthouses with custom copper roofing designed 
                    to complement traditional Alpine architecture.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Value:</span> $12-18M each • 
                    <span className="font-medium ml-2">Material:</span> Premium European copper • 
                    <span className="font-medium ml-2">Year:</span> 2022
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">Resort Uptime Achievement</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-gray-600">Peak Season Availability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">Zero</div>
                      <div className="text-sm text-gray-600">Guest Disruptions</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">Snow Load Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Maximum Recorded Load</span>
                      <span className="font-semibold text-blue-600">185 psf</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">System Rating</span>
                      <span className="font-semibold text-green-600">250+ psf</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Safety Factor</span>
                      <span className="font-semibold text-purple-600">1.35x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Scheduling */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Resort-Optimized Scheduling</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Strategic project timing that respects Vail's seasonal rhythms and guest experience priorities.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Spring (Apr-May)</h3>
              <p className="opacity-90 text-sm mb-3">Post-season assessment and preparation</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Winter damage evaluation</li>
                <li>• Emergency repairs</li>
                <li>• Summer project planning</li>
                <li>• Material pre-positioning</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Summer (Jun-Aug)</h3>
              <p className="opacity-90 text-sm mb-3">Primary construction season</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Major installations</li>
                <li>• Resort renovations</li>
                <li>• Preventive maintenance</li>
                <li>• System upgrades</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Fall (Sep-Nov)</h3>
              <p className="opacity-90 text-sm mb-3">Winter preparation phase</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Final inspections</li>
                <li>• Snow retention installation</li>
                <li>• Heating system activation</li>
                <li>• Emergency prep protocols</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Winter (Dec-Mar)</h3>
              <p className="opacity-90 text-sm mb-3">Emergency-only operations</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• 90-minute response time</li>
                <li>• Guest safety priority</li>
                <li>• Minimal disruption protocols</li>
                <li>• Spring planning sessions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Partner with Vail's Roofing Experts</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Whether you manage resort properties, own luxury residences, or develop premium real estate 
              in Vail Valley, trust our proven expertise to deliver world-class roofing solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Schedule Resort Consultation
              </Link>
              <Link 
                href="/guides/mountain-roofing-colorado" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                View Technical Guide
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Resort-grade assessment • Seasonal scheduling • 90-minute emergency response</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}