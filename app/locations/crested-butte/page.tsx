import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Crested Butte Extreme Weather Roofing | Alpine Peak Roofing Colorado',
  description: 'Expert Crested Butte roofing specialists for extreme weather conditions. Record snowfall engineering at 8,885 feet with 500+ inches annually. Victorian heritage preservation.',
  keywords: 'crested butte roofing contractors, extreme weather roofing crested butte, heavy snow roofing colorado, crested butte colorado roofing company',
  openGraph: {
    title: 'Extreme Weather Roofing Specialists in Crested Butte, Colorado',
    description: 'Engineering roofing systems for Colorado\'s heaviest snowfall and most extreme mountain conditions.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/locations/crested-butte',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/locations/crested-butte'
  }
}

export default function CrestedButteRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/locations" className="text-blue-600 hover:text-blue-800">Locations</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Crested Butte</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Extreme Weather Specialists
            <span className="block text-blue-600">Crested Butte, Colorado</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Engineering roofing systems for Colorado's most extreme conditions. At 8,885 feet elevation 
            with record-breaking snowfall exceeding 500 inches annually, we deliver uncompromising 
            protection for Crested Butte's unique mountain environment.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">8,885</div>
              <div className="text-sm text-gray-600">Feet Elevation</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-600">Inches Snow/Year</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">90 Min</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">250+</div>
              <div className="text-sm text-gray-600">Freeze-Thaw/Year</div>
            </div>
          </div>
        </header>

        {/* Extreme Conditions */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Colorado's Most Extreme Roofing Environment</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Record-Breaking Snow Loads</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Crested Butte holds multiple Colorado snowfall records, with some seasons exceeding 
                600 inches. Our roofing systems are engineered for snow loads that would destroy 
                standard construction, requiring specialized structural design and materials.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Historic Snowfall Records</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    1978-79 season: 632 inches • 2018-19 season: 585 inches • 2010-11 season: 548 inches
                  </p>
                  <p className="text-blue-700 text-xs">
                    Ground snow loads exceed 200 psf in extreme years, requiring 300+ psf roof design capacity.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Champagne Powder Characteristics</h4>
                  <p className="text-purple-800 text-sm">
                    Low-density snow creates deep accumulations with complex loading patterns. 
                    Wind redistribution can create drifts exceeding 15 feet on lee slopes.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Extended Snow Season</h4>
                  <p className="text-green-800 text-sm">
                    Snow typically remains from October through June, with roof loads persisting 
                    for 8+ months annually. Summer construction window is extremely limited.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Extreme Environment Data</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Temperature Extremes</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Record low: -47°F (1979)</li>
                    <li>• Winter average low: -10°F to -20°F</li>
                    <li>• Daily temp swings: 50°F+</li>
                    <li>• Freeze-thaw cycles: 250+ annually</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Wind & Weather</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Chinook wind events: 100+ mph</li>
                    <li>• Katabatic drainage winds</li>
                    <li>• Sudden weather changes</li>
                    <li>• Extended whiteout conditions</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Construction Challenges</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• 90-day construction season</li>
                    <li>• Remote location logistics</li>
                    <li>• Equipment cold-weather limits</li>
                    <li>• Altitude performance impacts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Solutions */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Extreme Weather Engineering Solutions</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ultra-Heavy Snow Load Design</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Structural systems engineered for 300+ psf snow loads with advanced 
                drift modeling and progressive collapse prevention.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Reinforced structural framing systems</li>
                <li>• Computer-modeled snow drift analysis</li>
                <li>• Progressive collapse prevention design</li>
                <li>• Redundant load path engineering</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Active Snow Management</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Integrated heating systems and mechanical snow removal solutions 
                for critical load management during extreme accumulation events.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Roof-integrated heating cables</li>
                <li>• Automated snow load monitoring</li>
                <li>• Emergency snow removal protocols</li>
                <li>• Smart system weather integration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏔️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cold-Climate Materials</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Premium materials specifically tested and certified for extreme 
                cold performance and rapid thermal cycling.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Arctic-grade material specifications</li>
                <li>• Thermal cycling test certification</li>
                <li>• Impact resistance verification</li>
                <li>• Extended cold-weather warranties</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Extreme Condition Projects</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Record Snow Survivors</h3>
              
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Mt. Crested Butte Base Lodge</h4>
                  <p className="text-gray-700 mb-3">
                    45,000 sq ft ski area base facility designed for 400 psf snow loads 
                    with integrated heating systems and emergency snow removal access.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Load Rating:</span> 400 psf • 
                    <span className="font-medium ml-2">Heating:</span> 500kW system • 
                    <span className="font-medium ml-2">Completion:</span> 2021
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibent text-gray-900 mb-2">Gothic Road Private Residence</h4>
                  <p className="text-gray-700 mb-3">
                    Ultra-isolated mountain home at 9,500 feet elevation engineered 
                    for extreme exposure and 600+ inch seasonal accumulations.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Elevation:</span> 9,500 ft • 
                    <span className="font-medium ml-2">Max Snow:</span> 600+ inches • 
                    <span className="font-medium ml-2">Access:</span> Snowmobile only
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Victorian Historic District</h4>
                  <p className="text-gray-700 mb-3">
                    Preservation of 1880s mining-era buildings with hidden structural 
                    reinforcement to handle modern extreme snow loads.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Era:</span> 1880s-1900s • 
                    <span className="font-medium ml-2">Buildings:</span> 15+ structures • 
                    <span className="font-medium ml-2">Challenge:</span> Hidden reinforcement
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Extreme Performance Data</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">Snow Load Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">385</div>
                      <div className="text-sm text-gray-600">Max Recorded Load (psf)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">450</div>
                      <div className="text-sm text-gray-600">System Rating (psf)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">System Reliability</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Zero Failures</span>
                      <span className="font-semibold text-green-600">25+ years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Emergency Response</span>
                      <span className="font-semibold text-blue-600">90 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Seasonal Monitoring</span>
                      <span className="font-semibold text-purple-600">Oct - June</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Operations */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Extreme Weather Operations Protocol</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Year-round vigilance and rapid response capabilities for Colorado's most challenging roofing environment.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Summer (Jun-Aug)</h3>
              <p className="opacity-90 text-sm mb-3">Critical construction window</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• 24/7 construction operations</li>
                <li>• Pre-positioned equipment</li>
                <li>• Accelerated project schedules</li>
                <li>• Weather-dependent planning</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Fall (Sep-Nov)</h3>
              <p className="opacity-90 text-sm mb-3">Winter preparation phase</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Snow load system activation</li>
                <li>• Monitoring equipment installation</li>
                <li>• Emergency supply staging</li>
                <li>• Communication system testing</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Winter (Dec-Apr)</h3>
              <p className="opacity-90 text-sm mb-3">Active monitoring period</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Real-time snow load monitoring</li>
                <li>• 90-minute emergency response</li>
                <li>• Daily weather tracking</li>
                <li>• Proactive snow removal</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Spring (May)</h3>
              <p className="opacity-90 text-sm mb-3">Assessment and planning</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Comprehensive damage assessment</li>
                <li>• Summer project preparation</li>
                <li>• Material inventory and staging</li>
                <li>• Client consultation and planning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Extreme Weather Emergency Response</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">90-Minute Response</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rapid emergency response even during extreme weather conditions, 
                with specialized equipment and trained high-altitude crews.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Monitoring</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced weather monitoring and snow load sensors provide early 
                warning for extreme accumulation events and structural stress.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Specialized Equipment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cold-weather certified equipment and materials specifically 
                designed for sub-zero operations and extreme altitude conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Engineer for Extreme Conditions</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Don't leave your Crested Butte property vulnerable to Colorado's most extreme weather. 
              Our proven engineering solutions and specialized expertise ensure your roof can 
              handle anything nature delivers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Schedule Extreme Weather Assessment
              </Link>
              <Link 
                href="/guides/mountain-roofing-colorado" 
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
              >
                View Engineering Guide
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Extreme weather consultation • Snow load engineering • 90-minute emergency response</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}