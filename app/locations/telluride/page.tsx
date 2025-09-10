import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Historic Telluride Roofing Specialists | Alpine Peak Roofing Colorado',
  description: 'Expert Telluride roofing contractors specializing in Victorian mining heritage preservation. Historic district compliance at 8,750 feet with 25+ years serving Telluride\'s unique properties.',
  keywords: 'telluride roofing contractors, historic telluride roofing, victorian restoration telluride, telluride colorado roofing company, historic preservation roofing',
  openGraph: {
    title: 'Historic Preservation Roofing Specialists in Telluride, Colorado',
    description: 'Preserving Telluride\'s Victorian mining heritage with expert restoration and modern performance.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/locations/telluride',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/locations/telluride'
  }
}

export default function TellurideRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-red-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-amber-600 hover:text-amber-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/locations" className="text-amber-600 hover:text-amber-800">Locations</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Telluride</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Historic Preservation Masters
            <span className="block text-amber-600">Telluride, Colorado</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Preserving Telluride's legendary Victorian mining heritage while delivering modern performance. 
            At 8,750 feet in a dramatic box canyon setting, we specialize in historic restoration 
            and National Historic Landmark preservation projects.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-amber-600">8,750</div>
              <div className="text-sm text-gray-600">Feet Elevation</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-red-600">1878</div>
              <div className="text-sm text-gray-600">Mining Era Founded</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">2 Hr</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">150+</div>
              <div className="text-sm text-gray-600">Historic Buildings</div>
            </div>
          </div>
        </header>

        {/* Historic Heritage */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Victorian Mining Heritage Preservation</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">National Historic Landmark Status</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Telluride's entire historic district holds National Historic Landmark designation, 
                requiring meticulous adherence to preservation standards while addressing the 
                performance demands of extreme high-altitude conditions.
              </p>
              
              <div className="space-y-4">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <h4 className="font-semibold text-amber-900 mb-2">Victorian Architecture (1880s-1900s)</h4>
                  <p className="text-amber-800 text-sm">
                    Original mining-era structures with steep-pitched roofs, ornate detailing, 
                    and period-authentic materials requiring specialized restoration techniques.
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-semibent text-red-900 mb-2">National Park Service Standards</h4>
                  <p className="text-red-800 text-sm">
                    Strict compliance with Secretary of Interior Standards for Historic Preservation, 
                    including material authenticity and visual character maintenance.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Modern Performance Integration</h4>
                  <p className="text-purple-800 text-sm">
                    Innovative solutions that preserve historic character while achieving 
                    contemporary energy efficiency and structural performance standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-red-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Box Canyon Challenges</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Extreme Elevation</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Town elevation: 8,750 feet</li>
                    <li>• Surrounded by 13,000+ foot peaks</li>
                    <li>• Dramatic box canyon wind patterns</li>
                    <li>• Limited sunlight in winter months</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Weather Extremes</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Winter lows: -35°F to -25°F</li>
                    <li>• Summer highs: 70°F to 78°F</li>
                    <li>• Annual snowfall: 280-320 inches</li>
                    <li>• Wind gusts: 120+ mph in canyon</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Access Challenges</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Remote mountain location</li>
                    <li>• Single highway access route</li>
                    <li>• Seasonal weather closures</li>
                    <li>• Equipment transportation limits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restoration Services */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Historic Restoration Specialties</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Victorian Restoration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Period-authentic restoration of 1880s mining-era buildings using traditional 
                techniques and historically accurate materials.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Hand-split cedar shake restoration</li>
                <li>• Slate repair and replacement</li>
                <li>• Period-correct metal fabrication</li>
                <li>• Ornate trim and detail preservation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⛏️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mining Heritage Buildings</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized expertise in historic mining structures, mill buildings, 
                and industrial heritage preservation projects.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Corrugated metal heritage systems</li>
                <li>• Structural timber preservation</li>
                <li>• Industrial roof adaptations</li>
                <li>• Mining equipment integration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏔️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Modern Integration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Seamless integration of modern performance features while maintaining 
                historic character and National Historic Landmark compliance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Hidden insulation systems</li>
                <li>• Concealed snow melting</li>
                <li>• Invisible solar integration</li>
                <li>• Modern drainage behind historic facades</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Historic Projects */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Landmark Restoration Projects</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Signature Restorations</h3>
              
              <div className="space-y-8">
                <div className="border-l-4 border-amber-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Sheridan Opera House (1913)</h4>
                  <p className="text-gray-700 mb-3">
                    Complete restoration of historic opera house roof using period-authentic 
                    materials and modern structural reinforcement for extreme snow loads.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Era:</span> 1913 Construction • 
                    <span className="font-medium ml-2">Status:</span> National Historic Landmark • 
                    <span className="font-medium ml-2">Completion:</span> 2022
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Telluride Historic District Homes</h4>
                  <p className="text-gray-700 mb-3">
                    Comprehensive restoration program covering 25+ Victorian mining-era 
                    residences with period-correct materials and techniques.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Era:</span> 1880s-1900s • 
                    <span className="font-medium ml-2">Properties:</span> 25+ homes • 
                    <span className="font-medium ml-2">Period:</span> 2020-2024
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Liberty Bell Mine Structures</h4>
                  <p className="text-gray-700 mb-3">
                    Historic mining building preservation at 12,000+ feet elevation, 
                    requiring specialized high-altitude restoration techniques.
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Elevation:</span> 12,200 feet • 
                    <span className="font-medium ml-2">Challenge:</span> Extreme altitude • 
                    <span className="font-medium ml-2">Access:</span> Helicopter only
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-amber-50 to-red-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Preservation Recognition</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Awards & Recognition</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Colorado Preservation Inc. Award Winner (2023)</li>
                    <li>• National Trust for Historic Preservation Recognition</li>
                    <li>• San Miguel County Heritage Award</li>
                    <li>• Victorian Society of Colorado Commendation</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Certification & Training</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• National Park Service Preservation Standards</li>
                    <li>• Traditional Building Craft Certification</li>
                    <li>• Victorian Architecture Specialization</li>
                    <li>• Historic Tax Credit Project Experience</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Community Partnership</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Telluride Historical Museum Collaboration</li>
                    <li>• San Miguel County Planning Partnership</li>
                    <li>• Colorado State Historic Preservation Office</li>
                    <li>• Local Craftsmen Training Programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials & Techniques */}
        <section className="bg-gradient-to-r from-amber-600 to-red-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Authentic Materials & Traditional Techniques</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Preserving Telluride's architectural heritage through period-authentic materials and time-tested craftmanship.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Historical Materials</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-3">Victorian-Era Slate</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Welsh slate from original 1880s quarries</li>
                    <li>• Vermont slate color-matched to existing</li>
                    <li>• Hand-selected thickness variations</li>
                    <li>• Period-correct installation patterns</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-3">Cedar Shake Systems</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Hand-split Western Red Cedar</li>
                    <li>• Fire-retardant treatment compliance</li>
                    <li>• Traditional installation methods</li>
                    <li>• Authentic weather patterns</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Craftmanship Excellence</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-3">Traditional Techniques</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Hand-forged metal work reproduction</li>
                    <li>• Mortar analysis and matching</li>
                    <li>• Period-correct fastening methods</li>
                    <li>• Apprenticeship-based skill transfer</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-3">Modern Integration</h4>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Hidden structural reinforcement</li>
                    <li>• Concealed weatherization systems</li>
                    <li>• Invisible modern drainage</li>
                    <li>• Integrated snow management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Response */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Historic Property Emergency Response</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2-Hour Response</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rapid emergency response throughout the box canyon, with specialized equipment 
                pre-positioned for historic property protection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heritage Protection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specialized emergency procedures that prioritize historic material preservation 
                while providing immediate weather protection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Documentation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive damage documentation for insurance and historic preservation 
                authorities, ensuring proper restoration protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Preserve Your Historic Investment</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Trust Colorado's leading historic preservation specialists with your Telluride property. 
              Our expertise in Victorian architecture and National Historic Landmark requirements 
              ensures your restoration meets the highest standards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-lg"
              >
                Schedule Historic Assessment
              </Link>
              <Link 
                href="/guides/mountain-roofing-colorado" 
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
              >
                View Preservation Guide
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Historic preservation consultation • Period-authentic materials • National landmark compliance</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}