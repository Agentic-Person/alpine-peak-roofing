import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Luxury Aspen Roofing Contractors | Alpine Peak Roofing Colorado',
  description: 'Ultra-luxury roofing specialists for Aspen\'s most exclusive properties. Premium materials, elite craftsmanship, and 25+ years serving Aspen\'s luxury market at 7,908 feet elevation.',
  keywords: 'aspen roofing contractors, luxury aspen roofing, aspen roofing company, high end roofing aspen colorado, premium roofing aspen',
  openGraph: {
    title: 'Elite Luxury Roofing Contractors in Aspen, Colorado',
    description: 'Serving Aspen\'s most exclusive properties with unparalleled roofing expertise and luxury-grade materials.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/locations/aspen',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/locations/aspen'
  }
}

export default function AspenRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/locations" className="text-blue-600 hover:text-blue-800">Locations</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Aspen</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Elite Luxury Roofing
            <span className="block text-blue-600">Aspen, Colorado</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Serving Aspen's most exclusive properties with unparalleled roofing expertise. 
            At 7,908 feet elevation, we deliver ultra-luxury roofing solutions that meet 
            the exacting standards of the world's most discerning property owners.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">7,908</div>
              <div className="text-sm text-gray-600">Feet Elevation</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">200+</div>
              <div className="text-sm text-gray-600">Luxury Projects</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">2 Hr</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">$15M+</div>
              <div className="text-sm text-gray-600">Average Home Value</div>
            </div>
          </div>
        </header>

        {/* Aspen-Specific Challenges */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Aspen's Unique Roofing Environment</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ultra-Luxury Market Demands</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Aspen represents the pinnacle of luxury mountain living, where property values 
                average $15+ million and architectural excellence is non-negotiable. Our roofing 
                solutions must seamlessly integrate with world-class design while providing 
                uncompromising protection against extreme mountain conditions.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Architectural Heritage</h4>
                  <p className="text-blue-800 text-sm">
                    Victorian mining-era buildings require specialized restoration techniques 
                    while modern luxury estates demand cutting-edge performance materials.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Celebrity Clientele Standards</h4>
                  <p className="text-green-800 text-sm">
                    Discretion, perfection, and white-glove service are essential when 
                    working on properties owned by international celebrities and business leaders.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Aesthetic Excellence</h4>
                  <p className="text-purple-800 text-sm">
                    Every roofing element must contribute to the overall architectural vision, 
                    from hidden snow retention systems to seamlessly integrated solar arrays.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Aspen Climate Conditions</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Temperature Extremes</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Winter lows: -30°F to -20°F</li>
                    <li>• Summer highs: 80°F to 85°F</li>
                    <li>• Daily temperature swings: 45°F+</li>
                    <li>• Freeze-thaw cycles: 180+ per year</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Snow & Wind Loads</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Annual snowfall: 200-250 inches</li>
                    <li>• Ground snow load: 60-80 psf</li>
                    <li>• Wind gusts: 100+ mph during storms</li>
                    <li>• Sustained winds: 70+ mph</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">UV Exposure</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• 32% higher UV than sea level</li>
                    <li>• Extended exposure due to snow reflection</li>
                    <li>• Accelerated material degradation</li>
                    <li>• Premium UV protection essential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Exclusive Aspen Roofing Services</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ultra-Premium Materials</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Exclusive access to the world's finest roofing materials: hand-selected copper, 
                titanium-zinc systems, and custom-fabricated metal solutions.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Swiss copper with natural patina aging</li>
                <li>• German engineering standing seam systems</li>
                <li>• Custom color matching and fabrication</li>
                <li>• Lifetime material warranties</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-2xl font-semibent text-gray-900 mb-4">Historic Restoration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized expertise in Victorian-era mining structures and National Historic 
                Landmark properties throughout Aspen's historic district.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Period-authentic material sourcing</li>
                <li>• Historic preservation compliance</li>
                <li>• Custom millwork and fabrication</li>
                <li>• National Park Service standards</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Integrated Solar Luxury</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Seamlessly integrated solar solutions that maintain architectural integrity 
                while maximizing energy efficiency at high altitude.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Tesla Solar Roof certified installer</li>
                <li>• Hidden micro-inverter systems</li>
                <li>• High-altitude performance optimization</li>
                <li>• Net-zero energy achievement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Aspen Project Portfolio</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Signature Projects</h3>
              
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Red Mountain Estate</h4>
                  <p className="text-gray-700 mb-3">
                    35,000 sq ft luxury compound featuring custom copper roofing system with 
                    integrated snow melting and hidden solar array.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Value:</span> $45M • 
                    <span className="font-medium ml-2">Year:</span> 2023 • 
                    <span className="font-medium ml-2">Material:</span> Premium Copper
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aspen Core Victorian Restoration</h4>
                  <p className="text-gray-700 mb-3">
                    Complete restoration of 1885 mining-era mansion using period-authentic 
                    materials and modern performance enhancements.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Value:</span> $28M • 
                    <span className="font-medium ml-2">Year:</span> 2022 • 
                    <span className="font-medium ml-2">Status:</span> Historic Landmark
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Starwood Contemporary</h4>
                  <p className="text-gray-700 mb-3">
                    Ultra-modern 25,000 sq ft residence with Tesla Solar Roof integration 
                    and smart snow management systems.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Value:</span> $52M • 
                    <span className="font-medium ml-2">Year:</span> 2024 • 
                    <span className="font-medium ml-2">Energy:</span> Net-Zero
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Client Testimonials</h3>
              
              <div className="space-y-6">
                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "Alpine Peak delivered perfection on our $45M estate. Their attention to detail 
                    and discretion made the entire process seamless. The copper roof is a masterpiece."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Hollywood Executive, Red Mountain</cite>
                </blockquote>

                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "The historic restoration exceeded our expectations. They preserved the 
                    Victorian character while adding modern performance. Absolutely exceptional work."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Tech Entrepreneur, Historic Core</cite>
                </blockquote>

                <blockquote className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "Net-zero energy achievement with stunning aesthetics. Alpine Peak understands 
                    luxury sustainability like no other contractor in Colorado."
                  </p>
                  <cite className="text-sm font-medium text-gray-900">— Investment Fund Manager, Starwood</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">24/7 Aspen Emergency Response</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Protecting your investment with rapid emergency response throughout the Roaring Fork Valley.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-2xl font-semibold mb-4">2-Hour Guarantee</h3>
              <p className="opacity-90 mb-4">
                Emergency response within 2 hours anywhere in Aspen, including remote luxury estates 
                and historic district properties.
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• Storm damage assessment</li>
                <li>• Immediate temporary repairs</li>
                <li>• Insurance documentation</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-2xl font-semibold mb-4">Luxury Standards</h3>
              <p className="opacity-90 mb-4">
                White-glove emergency service that maintains the discretion and quality 
                standards expected by Aspen's elite clientele.
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• Discreet professional teams</li>
                <li>• Premium temporary materials</li>
                <li>• Concierge coordination</li>
                <li>• Property manager communication</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-2xl font-semibold mb-4">Seasonal Monitoring</h3>
              <p className="opacity-90 mb-4">
                Proactive seasonal inspections and snow load monitoring for properties 
                with extreme exposure or architectural complexity.
              </p>
              <ul className="text-sm opacity-80 space-y-1">
                <li>• Pre-season roof inspections</li>
                <li>• Snow load monitoring</li>
                <li>• Preventive maintenance</li>
                <li>• Weather alert system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Protect Your Aspen Investment</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Trust Colorado's most elite roofing specialists with your luxury property. 
              Schedule a confidential consultation to discuss your ultra-premium roofing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Schedule Private Consultation
              </Link>
              <Link 
                href="/investment-analysis" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                Luxury ROI Analysis
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Confidential consultation • Luxury-grade assessment • Lifetime performance warranty</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}