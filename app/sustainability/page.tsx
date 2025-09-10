import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sustainable Mountain Roofing Leadership | Alpine Peak Roofing Colorado',
  description: 'Environmental leadership in Colorado mountain roofing. Energy-efficient materials, carbon footprint reduction, LEED certification, and sustainable practices for luxury mountain properties.',
  keywords: 'sustainable roofing colorado, green building mountain roofing, LEED roofing, energy efficient roofing, eco friendly roofing colorado, carbon neutral roofing',
  openGraph: {
    title: 'Sustainable Mountain Roofing Leadership',
    description: 'Leading Colorado\'s transition to environmentally responsible mountain roofing practices.',
    type: 'article',
    url: 'https://alpinepeakroofing.com/sustainability',
  },
  alternates: {
    canonical: 'https://alpinepeakroofing.com/sustainability'
  }
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-green-600 hover:text-green-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Sustainability</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Environmental Leadership in
            <span className="block text-green-600">Mountain Roofing</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Pioneering sustainable roofing practices in Colorado's pristine mountain environment. 
            Protecting your investment while preserving the natural beauty that makes mountain living extraordinary.
          </p>
          
          {/* Certification Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-600">★</span>
              </div>
              <div className="font-semibold text-gray-900">ENERGY STAR</div>
              <div className="text-sm text-gray-600">Certified Partner</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">L</span>
              </div>
              <div className="font-semibold text-gray-900">LEED</div>
              <div className="text-sm text-gray-600">Accredited Professional</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-purple-600">🌱</span>
              </div>
              <div className="font-semibold text-gray-900">USGBC</div>
              <div className="text-sm text-gray-600">Member Organization</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-orange-600">C</span>
              </div>
              <div className="font-semibold text-gray-900">Carbon Trust</div>
              <div className="text-sm text-gray-600">Verified Reducer</div>
            </div>
          </div>
        </header>

        {/* Sustainability Metrics Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Environmental Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">Tons CO₂ Reduced</div>
              <div className="text-xs text-gray-500 mt-1">Since 2020</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Waste Diverted</div>
              <div className="text-xs text-gray-500 mt-1">From Landfills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-600">LEED Projects</div>
              <div className="text-xs text-gray-500 mt-1">Certified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">$4.2M</div>
              <div className="text-sm text-gray-600">Energy Savings</div>
              <div className="text-xs text-gray-500 mt-1">For Clients</div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-16">
          {/* Section 1: Sustainable Material Leadership */}
          <section className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Sustainable Material Leadership</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We've revolutionized mountain roofing through exclusive partnerships with the world's most 
                innovative sustainable material manufacturers. Our carefully curated selection prioritizes 
                environmental responsibility without compromising the performance demands of high-altitude conditions.
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Recycled Content Integration</h3>
                  <p className="text-gray-700 mb-4">
                    Our premium metal roofing systems contain 85-95% recycled content, primarily post-consumer 
                    materials. Steel roofing manufactured from recycled automobiles, aluminum systems from 
                    reclaimed aircraft components, and copper sourcing from decommissioned electrical infrastructure.
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Steel: 95% recycled content (post-consumer automobiles)</li>
                    <li>• Aluminum: 90% recycled content (aerospace industry)</li>
                    <li>• Copper: 85% recycled content (electrical infrastructure)</li>
                    <li>• Synthetic materials: 60% post-consumer plastic bottles</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Carbon-Negative Materials</h3>
                  <p className="text-gray-700 mb-4">
                    Breakthrough materials that actively remove CO₂ from the atmosphere during their lifespan. 
                    Our partnership with innovative manufacturers brings carbon-sequestering technologies to 
                    mountain roofing applications.
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Bio-based insulation that captures 2.3 tons CO₂ per 1,000 sq ft</li>
                    <li>• Algae-based coatings with active carbon absorption</li>
                    <li>• Hemp-fiber composite shingles with carbon-negative lifecycle</li>
                    <li>• Mycelium-based underlayment materials</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Material Lifecycle Impact</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Energy Efficiency</span>
                    <span className="text-green-600 font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Compared to standard materials</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Recycled Content</span>
                    <span className="text-blue-600 font-bold">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Average across all materials</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">End-of-Life Recyclability</span>
                    <span className="text-purple-600 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Materials recoverable after use</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Carbon Footprint Reduction</span>
                    <span className="text-orange-600 font-bold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Lifecycle CO₂ reduction vs conventional</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Energy Efficiency Excellence */}
          <section className="bg-white rounded-xl shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Energy Efficiency Excellence</h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❄️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cool Roof Technology</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Advanced reflective coatings reduce surface temperatures by up to 50°F, dramatically 
                  decreasing cooling loads in mountain properties.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏔️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Thermal Bridge Elimination</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Continuous insulation systems eliminate thermal bridging, reducing heat loss by 35% 
                  in mountain climate conditions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Solar Integration</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Seamless integration of photovoltaic systems and solar thermal collectors maximizes 
                  renewable energy generation at high altitude.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Energy Performance Achievements</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Heating Load Reductions</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Advanced Insulation Systems</span>
                      <span className="font-semibold text-green-600">-40%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Air Sealing Excellence</span>
                      <span className="font-semibold text-green-600">-25%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Thermal Bridge Mitigation</span>
                      <span className="font-semibold text-green-600">-35%</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Reduction</span>
                      <span className="font-bold text-green-600 text-lg">-65%</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Renewable Energy Integration</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Solar Panel Efficiency (High Altitude)</span>
                      <span className="font-semibold text-blue-600">+18%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Solar Thermal Performance</span>
                      <span className="font-semibold text-blue-600">+22%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Annual Energy Offset</span>
                      <span className="font-semibold text-blue-600">85-120%</span>
                    </li>
                    <li className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Net-Zero Achievement Rate</span>
                      <span className="font-bold text-blue-600 text-lg">92%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Waste Reduction & Circular Economy */}
          <section className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Circular Economy Leadership</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-3">Zero-Waste Job Sites</h3>
                  <p className="text-green-800 mb-4">
                    Our revolutionary waste management protocol has achieved 89% waste diversion from landfills 
                    across 500+ mountain roofing projects.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">89%</div>
                      <div className="text-xs text-green-700">Diverted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">73%</div>
                      <div className="text-xs text-blue-700">Recycled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">16%</div>
                      <div className="text-xs text-purple-700">Reused</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">Material Recovery Programs</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Metal reclamation: 98% recovery rate, $2.3M material value recovered</li>
                    <li>• Insulation reprocessing: 85% of removed insulation recycled into new products</li>
                    <li>• Membrane recycling: Partnership with manufacturers for closed-loop programs</li>
                    <li>• Wood preservation: Historic lumber salvaged for restoration projects</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sustainable Supply Chain</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our comprehensive supply chain analysis ensures environmental responsibility at every stage, 
                from raw material extraction through end-of-life recycling.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Sourcing Priority</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Regional Materials</h4>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          <li>• Colorado quarried stone: 60% of applications</li>
                          <li>• Local timber: FSC-certified mountain forests</li>
                          <li>• Regional metal fabrication: &lt;500 mile radius</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Transportation Impact</h4>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          <li>• 45% reduction in shipping emissions</li>
                          <li>• Carbon-neutral delivery programs</li>
                          <li>• Electric vehicle fleet transition</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Manufacturer Partnerships</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Exclusive relationships with industry-leading manufacturers who share our commitment 
                    to environmental stewardship and innovation.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sustainability Criteria</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Carbon neutrality commitments</li>
                        <li>• Renewable energy use ≥80%</li>
                        <li>• Waste reduction programs</li>
                        <li>• Third-party sustainability audits</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation Investment</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• R&D spending ≥5% of revenue</li>
                        <li>• Bio-based material development</li>
                        <li>• Circular economy initiatives</li>
                        <li>• Life cycle assessment programs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Environmental Stewardship */}
          <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Colorado Mountain Environmental Stewardship</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Protecting the pristine beauty and ecological integrity of Colorado's mountain environment 
                is our fundamental responsibility and driving mission.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-2xl font-semibold mb-4">Wildlife Protection</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Seasonal construction scheduling around migration patterns</li>
                  <li>• Noise reduction protocols in sensitive habitats</li>
                  <li>• Bird-safe building design integration</li>
                  <li>• Habitat restoration project contributions</li>
                  <li>• Partnership with Colorado Parks and Wildlife</li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-2xl font-semibold mb-4">Water Resource Protection</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Zero-discharge stormwater management</li>
                  <li>• Advanced erosion control systems</li>
                  <li>• Rainwater harvesting system integration</li>
                  <li>• Snowmelt management optimization</li>
                  <li>• Watershed-sensitive material selection</li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-2xl font-semibold mb-4">Forest Stewardship</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• FSC-certified timber exclusive use</li>
                  <li>• Beetle-killed wood utilization programs</li>
                  <li>• Reforestation project partnerships</li>
                  <li>• Fire-resistant landscaping promotion</li>
                  <li>• Carbon sequestration forest investments</li>
                </ul>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-center mb-8">Environmental Impact Commitments</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">Carbon</div>
                  <div className="text-4xl font-bold text-green-300 mb-2">Neutral</div>
                  <div className="text-sm opacity-80">Operations by 2025</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Zero</div>
                  <div className="text-4xl font-bold text-blue-300 mb-2">Waste</div>
                  <div className="text-sm opacity-80">To landfills by 2026</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-4xl font-bold text-purple-300 mb-2">Renewable</div>
                  <div className="text-sm opacity-80">Energy by 2025</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">$1M</div>
                  <div className="text-4xl font-bold text-yellow-300 mb-2">Annual</div>
                  <div className="text-sm opacity-80">Conservation investment</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Client Benefits & ROI */}
          <section className="bg-white rounded-xl shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Sustainable Roofing Investment Returns</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Financial Benefits</h3>
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">Energy Cost Savings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-green-600">$2,340</div>
                        <div className="text-green-700">Average Annual Savings</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">$70,200</div>
                        <div className="text-green-700">30-Year Total Savings</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Property Value Enhancement</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>• 8-12% increase in property value (sustainable homes)</li>
                      <li>• 25% faster resale times in luxury markets</li>
                      <li>• Premium buyer appeal in eco-conscious demographics</li>
                      <li>• LEED certification market differentiation</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-purple-900 mb-3">Tax Incentives & Rebates</h4>
                    <ul className="space-y-2 text-purple-800 text-sm">
                      <li>• Federal Solar ITC: 30% of system cost</li>
                      <li>• Colorado renewable energy credits</li>
                      <li>• Utility rebate programs: up to $5,000</li>
                      <li>• Property tax exemptions for renewable systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Performance Advantages</h3>
                <div className="space-y-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-900 mb-4">Extended Lifespan</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-orange-800">Sustainable Materials</span>
                        <span className="font-bold text-orange-600">50+ years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-800">Standard Materials</span>
                        <span className="font-bold text-gray-600">20-25 years</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-semibold text-orange-900">Lifespan Extension</span>
                        <span className="font-bold text-orange-600 text-lg">+100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4">Reduced Maintenance Costs</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-red-800">Traditional Roofing</span>
                        <span className="font-bold text-red-600">$850/year</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-800">Sustainable Systems</span>
                        <span className="font-bold text-green-600">$320/year</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-semibold text-red-900">Annual Savings</span>
                        <span className="font-bold text-green-600 text-lg">$530</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-teal-900 mb-3">Insurance Benefits</h4>
                    <ul className="space-y-2 text-teal-800 text-sm">
                      <li>• 15-25% premium reductions for green building features</li>
                      <li>• Enhanced coverage for sustainable improvements</li>
                      <li>• Reduced claim frequency and severity</li>
                      <li>• Access to specialized green insurance products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Lead the Sustainable Revolution?</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join Colorado's most environmentally conscious property owners in creating a sustainable 
                mountain community legacy. Every sustainable roofing project moves us closer to carbon neutrality 
                while delivering superior performance and long-term value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
                >
                  Schedule Sustainability Consultation
                </Link>
                <Link 
                  href="/investment-analysis" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Calculate Your ROI
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-gray-600">
                <p>Carbon-neutral consultation • LEED-certified assessment • 50-year performance warranty</p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Resources */}
        <aside className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sustainability Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/mountain-roofing-colorado" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                  Mountain Roofing Guide
                </h3>
                <p className="text-sm text-gray-600">
                  Technical expertise for high-altitude applications
                </p>
              </div>
            </Link>
            <Link href="/investment-analysis" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                  Investment Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Calculate your sustainable roofing ROI
                </p>
              </div>
            </Link>
            <Link href="/faq" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
                  Sustainability FAQ
                </h3>
                <p className="text-sm text-gray-600">
                  Common questions about green roofing
                </p>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}