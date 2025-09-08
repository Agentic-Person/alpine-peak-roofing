import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Sun, Battery, Recycle, Award, TrendingUp, Shield, Calculator, CheckCircle2, Zap, TreePine, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sustainable Roofing Leadership Colorado | Energy Star LEED Expert | Alpine Peak Roofing',
  description: 'Colorado\'s sustainable roofing authority. Energy Star Partnership, LEED expertise, solar integration, eco-materials, carbon offset programs. Investment-grade green solutions.',
  keywords: 'sustainable roofing Colorado, Energy Star roofing, LEED roofing, solar roofing Colorado, green building Colorado, eco-friendly roofing, carbon offset roofing',
  openGraph: {
    title: 'Sustainable Roofing Leadership Colorado | Alpine Peak Roofing',
    description: 'Leading Colorado\'s sustainable roofing transformation with Energy Star Partnership and LEED expertise',
    type: 'article',
  },
};

export default function SustainabilityHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Leaf className="w-4 h-4" />
              Environmental Leadership
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sustainability Leadership Hub
              <span className="block text-green-600 text-2xl md:text-3xl mt-2">Colorado's Green Roofing Authority</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Leading Colorado's sustainable roofing transformation</strong> through Energy Star Partnership, LEED expertise, 
              and investment-grade environmental solutions. Premium performance meets environmental responsibility.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600" />
                Energy Star Partner
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                LEED Certified Projects
              </div>
              <div className="flex items-center gap-2">
                <TreePine className="w-4 h-4 text-green-600" />
                Carbon Neutral Operations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Leadership Stats */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Environmental Impact Leadership</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">2.5M</div>
              <div className="text-sm font-medium text-gray-900 mb-1">lbs CO2 Offset</div>
              <div className="text-xs text-gray-600">Annual carbon reduction from projects</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Energy Savings</div>
              <div className="text-xs text-gray-600">Average improvement in efficiency</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Solar Integrations</div>
              <div className="text-xs text-gray-600">Renewable energy installations</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Waste Diversion</div>
              <div className="text-xs text-gray-600">Materials kept from landfills</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Sustainability Pillars */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Four Pillars of Sustainable Excellence</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Energy Star Partnership */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Energy Star Partnership</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Official Energy Star Partner since 2019</strong> with proven expertise in energy-efficient roofing systems that reduce heating and cooling costs by 30-50%.</p>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Energy Star Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Qualified for federal tax credits up to $500</li>
                      <li>• Utility rebates ranging $0.15-$0.75 per sq ft</li>
                      <li>• 15-25% property value increase</li>
                      <li>• $1,200-$2,400 annual energy savings</li>
                    </ul>
                  </div>
                  
                  <Link href="/sustainability/energy-efficiency" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Learn More About Energy Star Benefits
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* LEED Expertise */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">LEED Project Leadership</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>LEED Accredited Professionals on staff</strong> with experience in Platinum and Gold certified projects across Colorado's luxury markets.</p>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">LEED Contributions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Energy & Atmosphere credits (up to 18 points)</li>
                      <li>• Materials & Resources credits (up to 14 points)</li>
                      <li>• Sustainable Sites credits (up to 7 points)</li>
                      <li>• Innovation credits for advanced systems</li>
                    </ul>
                  </div>
                  
                  <Link href="/case-studies" 
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    View LEED Project Case Studies
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Solar Integration */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-gray-900">Solar Integration Mastery</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Certified Tesla Solar Roof installer</strong> and traditional solar panel integration specialist with 500+ renewable energy installations completed.</p>
                  
                  <div className="bg-white p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Solar Solutions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Tesla Solar Roof tiles - $21-31 per sq ft</li>
                      <li>• Premium panel integration - $3-6 per sq ft</li>
                      <li>• Battery storage coordination - Tesla Powerwall</li>
                      <li>• 25-year production warranties standard</li>
                    </ul>
                  </div>
                  
                  <Link href="/sustainability/solar-integration" 
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                    Explore Solar Integration Options
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Carbon Neutral Operations */}
              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="w-6 h-6 text-teal-600" />
                  <h3 className="text-xl font-bold text-gray-900">Carbon Neutral Leadership</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>First carbon-neutral roofing contractor in Colorado</strong> through verified offset programs and renewable energy operations since 2021.</p>
                  
                  <div className="bg-white p-4 rounded-lg border border-teal-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Carbon Programs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Client project carbon offsets included</li>
                      <li>• Forest restoration partnerships</li>
                      <li>• Electric fleet transition program</li>
                      <li>• Renewable energy workshop operations</li>
                    </ul>
                  </div>
                  
                  <Link href="/sustainability/environmental-impact" 
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                    Learn About Our Carbon Program
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eco-Materials Excellence */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Recycle className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Eco-Materials Excellence</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Material selection drives 60% of a roof's environmental impact.</strong> Alpine Peak sources the world's most 
                sustainable roofing materials, prioritizing recycled content, renewable resources, and end-of-life recyclability.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recycled Content Materials */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recycled Content Leaders</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Metal Roofing Systems</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Steel Content:</span>
                        <span className="font-medium">85-95% recycled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aluminum Content:</span>
                        <span className="font-medium">90-95% recycled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End-of-Life:</span>
                        <span className="font-medium">100% recyclable</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-emerald-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Synthetic Systems</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Plastic Content:</span>
                        <span className="font-medium">75-85% recycled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rubber Content:</span>
                        <span className="font-medium">80-90% recycled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty:</span>
                        <span className="font-medium">50+ years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Renewable Resource Materials */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Renewable Resources</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Living Green Roofs</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>CO2 Absorption:</span>
                        <span className="font-medium">2 lbs/sq ft/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stormwater Retained:</span>
                        <span className="font-medium">70-90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Energy Reduction:</span>
                        <span className="font-medium">30-50%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Sustainable Wood Systems</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex justify-between">
                        <span>FSC Certified:</span>
                        <span className="font-medium">100% sourcing</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fire Treatment:</span>
                        <span className="font-medium">Non-toxic options</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbon Storage:</span>
                        <span className="font-medium">Long-term benefit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifecycle Assessment */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lifecycle Excellence</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Material Assessment</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Manufacturing footprint analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Transportation impact calculation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Installation efficiency optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>End-of-life disposal planning</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">25-30%</div>
                    <div className="text-xs text-blue-800">Lower lifecycle impact vs. conventional materials</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/sustainability/eco-materials" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Explore Eco-Materials Library
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Energy Efficiency Systems */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Energy Efficiency Systems</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>High-performance roofing systems reduce energy consumption by 30-60%</strong> through advanced insulation, 
                reflective surfaces, and intelligent ventilation design optimized for Colorado's mountain climates.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Cool Roofing Technology */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Cool Roofing Technology</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Reflective Performance</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">85%</div>
                          <div className="text-xs text-gray-600">Solar reflectance</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">90%</div>
                          <div className="text-xs text-gray-600">Thermal emittance</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Energy Savings</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 15-40% cooling cost reduction</li>
                        <li>• Peak demand reduction up to 15%</li>
                        <li>• Urban heat island mitigation</li>
                        <li>• Extended equipment lifespan</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Insulation Systems</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                      <span className="font-medium text-gray-900">Continuous Insulation</span>
                      <span className="text-sm text-purple-600">R-30 to R-60</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                      <span className="font-medium text-gray-900">Radiant Barriers</span>
                      <span className="text-sm text-purple-600">97% reflectivity</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                      <span className="font-medium text-gray-900">Thermal Bridging</span>
                      <span className="text-sm text-purple-600">Eliminated</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligent Ventilation */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Ventilation Design</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Balanced Airflow</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ridge and soffit ventilation optimization</li>
                        <li>• Powered ventilation for extreme conditions</li>
                        <li>• Moisture management integration</li>
                        <li>• Winter performance maintenance</li>
                      </ul>
                    </div>
                    
                    <div className="text-center p-4 bg-white rounded-lg border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">150°F</div>
                      <div className="text-xs text-emerald-800">Attic temperature reduction in summer</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Building Integration</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-amber-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Monitoring Systems</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Real-time energy performance tracking</li>
                        <li>• Temperature and humidity monitoring</li>
                        <li>• Automated ventilation controls</li>
                        <li>• Maintenance alert systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment ROI Calculator */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold">Sustainability Investment ROI</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Energy Savings Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Annual Energy Savings:</span>
                    <span className="font-bold">$1,800-$3,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Federal Tax Credits:</span>
                    <span className="font-bold">Up to $500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Utility Rebates:</span>
                    <span className="font-bold">$0.15-$0.75/sq ft</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>5-Year ROI:</span>
                      <span>185-240%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Property Value Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Energy Efficiency Premium:</span>
                    <span className="font-bold">15-25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Solar Integration Value:</span>
                    <span className="font-bold">$15K-$35K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Green Certification Premium:</span>
                    <span className="font-bold">8-12%</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total Value Add:</span>
                      <span>$45K-$85K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Environmental Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CO2 Reduction:</span>
                    <span className="font-bold">2-4 tons/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Equivalent Trees:</span>
                    <span className="font-bold">50-100 planted</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stormwater Managed:</span>
                    <span className="font-bold">8,000-15,000 gal</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>50-Year Impact:</span>
                      <span>Profound</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/investment-analysis" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Calculate Your Sustainability ROI
                <Calculator className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Lead Colorado's Sustainable Future?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join Colorado's environmental leadership with investment-grade sustainable roofing solutions. 
            Premium performance, environmental responsibility, and superior ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
              Schedule Sustainability Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/sustainability/solar-integration" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white border border-emerald-400 rounded-lg font-semibold hover:bg-emerald-400 transition-colors">
              Explore Solar Integration
            </Link>
          </div>
          <p className="text-sm text-emerald-200 mt-4">
            Energy Star Partner • LEED Certified • Carbon Neutral Operations
          </p>
        </div>
      </section>
    </div>
  );
}