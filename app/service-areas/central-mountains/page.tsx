import { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://alpinepeakroofing.com'
const PAGE_URL = `${BASE_URL}/service-areas/central-mountains`

export const metadata: Metadata = {
  title: 'Central Mountains Colorado Roofing Service Area | Alpine Peak Roofing',
  description: 'Comprehensive roofing services across Colorado\'s Central Mountains region. Summit, Eagle, Pitkin Counties coverage from 8,000-12,000+ feet elevation. 25+ resort destinations served.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Central Mountains Colorado Regional Roofing Services',
    description: 'Complete roofing coverage across Colorado\'s premier mountain communities and resort destinations.',
    type: 'website',
    url: PAGE_URL,
  },
}

function CentralMountainsSchema() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE_URL}/service-areas` },
        { '@type': 'ListItem', position: 3, name: 'Central Mountains', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      name: 'Alpine Peak Roofing — Central Mountains Region',
      description: 'Comprehensive roofing services across Summit, Eagle, and Pitkin Counties in Colorado\'s Central Mountains.',
      url: PAGE_URL,
      telephone: '(970) 446-8995',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Summit County, CO' },
        { '@type': 'AdministrativeArea', name: 'Eagle County, CO' },
        { '@type': 'AdministrativeArea', name: 'Pitkin County, CO' },
      ],
      parentOrganization: {
        '@type': 'RoofingContractor',
        '@id': `${BASE_URL}/#organization`,
        name: 'Alpine Peak Roofing',
        url: BASE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Central Mountains Colorado Roofing Service Area',
      url: PAGE_URL,
      description: 'Regional roofing coverage for Summit, Eagle, and Pitkin Counties across 25+ Colorado mountain communities.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE_URL}/service-areas` },
          { '@type': 'ListItem', position: 3, name: 'Central Mountains', item: PAGE_URL },
        ],
      },
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  )
}

export default function CentralMountainsServiceAreaPage() {
  return (
    <>
      <CentralMountainsSchema />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/service-areas" className="text-blue-600 hover:text-blue-800">Service Areas</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Central Mountains</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Central Mountains
            <span className="block text-blue-600">Regional Service Area</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Comprehensive roofing expertise across Colorado's Central Mountains region. From 8,000 to over 12,000 feet elevation, 
            we serve 25+ resort destinations across Summit, Eagle, and Pitkin Counties with unmatched high-altitude experience.
          </p>
          
          {/* Regional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">25+</div>
              <div className="text-sm text-gray-600">Communities Served</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Counties Covered</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-purple-600">12,000+</div>
              <div className="text-sm text-gray-600">Max Elevation (ft)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-orange-600">1,200+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
          </div>
        </header>

        {/* Service Area Map */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Comprehensive Regional Coverage</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Summit County</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">Major Communities</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Breckenridge (9,600 ft)</li>
                    <li>• Keystone (9,280 ft)</li>
                    <li>• Copper Mountain (9,712 ft)</li>
                    <li>• Frisco (9,075 ft)</li>
                    <li>• Silverthorne (8,790 ft)</li>
                  </ul>
                </div>
                <div className="text-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur">
                  <div className="text-2xl font-bold">250+</div>
                  <div className="text-xs opacity-80">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Eagle County</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">Major Communities</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Vail (8,150 ft)</li>
                    <li>• Beaver Creek (8,100 ft)</li>
                    <li>• Avon (7,450 ft)</li>
                    <li>• Eagle (6,600 ft)</li>
                    <li>• Minturn (7,817 ft)</li>
                  </ul>
                </div>
                <div className="text-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur">
                  <div className="text-2xl font-bold">400+</div>
                  <div className="text-xs opacity-80">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Pitkin County</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="font-semibold mb-2">Major Communities</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Aspen (7,908 ft)</li>
                    <li>• Snowmass Village (8,209 ft)</li>
                    <li>• Basalt (6,611 ft)</li>
                    <li>• Carbondale (6,181 ft)</li>
                    <li>• Woody Creek (7,200 ft)</li>
                  </ul>
                </div>
                <div className="text-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur">
                  <div className="text-2xl font-bold">350+</div>
                  <div className="text-xs opacity-80">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-100 to-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Extended Service Communities</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mountain Towns</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Dillon</li>
                  <li>Georgetown</li>
                  <li>Leadville</li>
                  <li>Glenwood Springs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Ski Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>A-Basin</li>
                  <li>Loveland</li>
                  <li>Winter Park</li>
                  <li>Mary Jane</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Valley Communities</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Edwards</li>
                  <li>Gypsum</li>
                  <li>New Castle</li>
                  <li>Silt</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Remote Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Gothic</li>
                  <li>Marble</li>
                  <li>Redstone</li>
                  <li>Crystal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Elevation Expertise */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Elevation-Specific Expertise</h2>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">L</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Lower Elevations</h3>
              <p className="text-gray-600 text-sm mb-3">6,000-8,000 feet</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Standard mountain conditions</li>
                <li>• Moderate snow loads</li>
                <li>• Valley wind patterns</li>
                <li>• Extended construction seasons</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">M</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mid Elevations</h3>
              <p className="text-gray-600 text-sm mb-3">8,000-10,000 feet</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Heavy snow accumulation</li>
                <li>• Increased UV exposure</li>
                <li>• Temperature extremes</li>
                <li>• Resort area conditions</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">H</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">High Elevations</h3>
              <p className="text-gray-600 text-sm mb-3">10,000-12,000 feet</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Extreme snow loads</li>
                <li>• Reduced air pressure</li>
                <li>• Severe wind exposure</li>
                <li>• Limited access windows</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold">X</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Extreme Elevations</h3>
              <p className="text-gray-600 text-sm mb-3">12,000+ feet</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Record snow conditions</li>
                <li>• Helicopter access only</li>
                <li>• Specialized equipment</li>
                <li>• Extreme weather protocols</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Response Times */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Regional Response Coverage</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Emergency Response Times</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Strategically positioned teams and equipment throughout the Central Mountains 
                ensure rapid emergency response regardless of elevation or weather conditions.
              </p>
              
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Priority Locations (30 minutes)</h4>
                  <p className="text-green-800 text-sm mb-2">
                    Major resort areas and high-density communities with permanent equipment staging.
                  </p>
                  <p className="text-green-700 text-xs">
                    Aspen, Vail, Breckenridge, Keystone, Steamboat Springs
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Standard Coverage (60 minutes)</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    Secondary communities and valley locations with regular patrol routes.
                  </p>
                  <p className="text-blue-700 text-xs">
                    Frisco, Avon, Silverthorne, Basalt, Eagle, Copper Mountain
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Extended Areas (90 minutes)</h4>
                  <p className="text-purple-800 text-sm mb-2">
                    Remote locations and extreme elevations requiring specialized access.
                  </p>
                  <p className="text-purple-700 text-xs">
                    Gothic, Marble, Crystal, Redstone, high-altitude private properties
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-600 to-blue-600 rounded-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Response Infrastructure</h3>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Equipment Staging</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• 5 permanent equipment caches</li>
                    <li>• Climate-controlled storage facilities</li>
                    <li>• Emergency material stockpiles</li>
                    <li>• Helicopter landing zone access</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Specialized Vehicles</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• High-altitude service trucks</li>
                    <li>• Snowcat access capability</li>
                    <li>• All-terrain emergency vehicles</li>
                    <li>• Helicopter partnership programs</li>
                  </ul>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                  <h4 className="text-lg font-semibold mb-2">Communication Systems</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Satellite communication backup</li>
                    <li>• Real-time GPS tracking</li>
                    <li>• Weather monitoring networks</li>
                    <li>• 24/7 dispatch coordination</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Operations */}
        <section className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-xl text-white p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Year-Round Regional Operations</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Coordinated seasonal operations across multiple elevation zones and weather microclimates.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Spring Operations</h3>
              <p className="opacity-90 text-sm mb-3">March - May: Assessment & Planning</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Winter damage assessments</li>
                <li>• Regional project coordination</li>
                <li>• Equipment deployment</li>
                <li>• Seasonal staff mobilization</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Summer Peak</h3>
              <p className="opacity-90 text-sm mb-3">June - August: Maximum Operations</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Multi-elevation projects</li>
                <li>• Resort facility upgrades</li>
                <li>• High-altitude installations</li>
                <li>• Weather window optimization</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Fall Preparation</h3>
              <p className="opacity-90 text-sm mb-3">September - November: Winterization</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• Pre-winter inspections</li>
                <li>• Emergency equipment staging</li>
                <li>• Preventive maintenance</li>
                <li>• Snow management system prep</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
              <h3 className="text-xl font-semibold mb-3">Winter Response</h3>
              <p className="opacity-90 text-sm mb-3">December - February: Emergency Only</p>
              <ul className="text-xs opacity-80 space-y-1">
                <li>• 24/7 emergency response</li>
                <li>• Snow load monitoring</li>
                <li>• Multi-county coordination</li>
                <li>• Resort priority protocols</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regional Specializations */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Regional Specializations</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Altitude Engineering</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Specialized engineering solutions for properties above 10,000 feet elevation, 
                including pressure adjustments and extreme weather resistance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resort Infrastructure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Commercial resort facilities requiring hospitality-grade performance, 
                seasonal scheduling, and guest experience optimization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Luxury Residences</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium residential properties requiring architectural excellence, 
                advanced performance features, and white-glove service standards.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Regional Teams */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Central Mountains Roofing Authority</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              From valley floor to mountain peak, across three counties and 25+ communities, 
              we deliver unmatched roofing expertise throughout Colorado's Central Mountains region.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Contact Regional Team
              </Link>
              <Link 
                href="/guides/mountain-roofing-colorado" 
                className="bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-lg"
              >
                View Technical Guide
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Multi-county coverage • Elevation specialists • 30-90 minute response times</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Summit County</h3>
                <p className="text-gray-600 text-sm">Breckenridge, Keystone, Copper Mountain, Frisco area</p>
                <p className="text-blue-600 font-medium text-sm mt-2">30-60 min response</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Eagle County</h3>
                <p className="text-gray-600 text-sm">Vail, Beaver Creek, Avon, Eagle area</p>
                <p className="text-green-600 font-medium text-sm mt-2">30-60 min response</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Pitkin County</h3>
                <p className="text-gray-600 text-sm">Aspen, Snowmass, Basalt, Carbondale area</p>
                <p className="text-purple-600 font-medium text-sm mt-2">30-90 min response</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links — Services */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Roofing Services in the Central Mountains
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/services/residential"
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 p-5 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Residential Roofing</h3>
                <p className="text-gray-600 text-sm">Full replacements, repairs &amp; new construction.</p>
              </Link>
              <Link
                href="/services/commercial"
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 p-5 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Commercial Roofing</h3>
                <p className="text-gray-600 text-sm">Resort &amp; commercial flat and metal systems.</p>
              </Link>
              <Link
                href="/services/storm-damage"
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 p-5 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Storm Damage</h3>
                <p className="text-gray-600 text-sm">24/7 emergency response across all three counties.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links — Materials */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Roofing Materials for High-Altitude Conditions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { slug: 'gaf-timberline', name: 'Architectural Shingles', note: 'Class 4 hail-rated' },
                { slug: 'standing-seam', name: 'Standing Seam Metal', note: 'Ideal for extreme snow loads' },
                { slug: 'natural-slate', name: 'Natural Slate', note: 'Century-long lifespan' },
                { slug: 'cedar-shake', name: 'Cedar Shake', note: 'Natural mountain aesthetic' },
              ].map((mat) => (
                <Link
                  key={mat.slug}
                  href={`/materials/${mat.slug}`}
                  className="block bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 p-4 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{mat.name}</h3>
                  <p className="text-gray-500 text-xs">{mat.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}