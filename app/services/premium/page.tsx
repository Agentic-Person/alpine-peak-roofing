import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Crown, Palette, TreePine, Building2, Landmark, Snowflake, Award, TrendingUp, Shield, Eye, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Premium Roofing Services Colorado | Luxury Mountain Roofing | Alpine Peak Roofing',
  description: 'Colorado\'s exclusive premium roofing services. Custom copper roofing, living green roofs, luxury resort roofing, historic restoration, snow management systems. Investment-grade quality.',
  keywords: 'premium roofing Colorado, luxury roofing Colorado, custom copper roofing, green roof systems, resort roofing, historic restoration roofing, snow management systems',
  openGraph: {
    title: 'Premium Roofing Services Colorado | Alpine Peak Roofing',
    description: 'Exclusive luxury roofing services for Colorado\'s premier properties and communities',
    type: 'article',
  },
};

export default function PremiumServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Crown className="w-4 h-4" />
              Exclusive Premium Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Service Portfolio
              <span className="block text-purple-600 text-2xl md:text-3xl mt-2">Investment-Grade Luxury Solutions</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Colorado's exclusive luxury roofing portfolio</strong> featuring master craftsmanship, premium materials, 
              and specialized expertise for the region's most discerning properties and architectural requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                Master Craftsman Guild
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                Investment-Grade Quality
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-600" />
                Exclusive Clientele
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Portfolio Stats */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Premium Portfolio Excellence</h2>
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">150+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Copper Installations</div>
              <div className="text-xs text-gray-600">Estate & commercial projects</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">75+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Green Roof Systems</div>
              <div className="text-xs text-gray-600">Sustainable luxury projects</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Resort Properties</div>
              <div className="text-xs text-gray-600">Commercial luxury systems</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">125+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Historic Restorations</div>
              <div className="text-xs text-gray-600">Preservation expertise</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Snow Systems</div>
              <div className="text-xs text-gray-600">Engineered protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Premium Services Overview */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">Five Pillars of Premium Excellence</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Custom Copper Roofing */}
              <div className="lg:col-span-2 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-gray-900">Custom Copper Roofing</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>The pinnacle of roofing artistry.</strong> Hand-crafted copper systems that develop beautiful patina while providing 70+ years of unmatched performance.</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-amber-200">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Lifespan:</span>
                          <span className="font-medium">70+ years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investment:</span>
                          <span className="font-medium">$18-28/sq ft</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Warranty:</span>
                          <span className="font-medium">50 years</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link href="/services/premium/copper-roofing" 
                          className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                      Explore Copper Excellence
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Living Green Roof Systems */}
              <div className="lg:col-span-2 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <TreePine className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">Living Green Roof Systems</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Sustainable luxury at its finest.</strong> Living ecosystems that provide insulation, stormwater management, and stunning outdoor spaces.</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Energy Savings:</span>
                          <span className="font-medium">30-50%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investment:</span>
                          <span className="font-medium">$15-50/sq ft</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Property Value:</span>
                          <span className="font-medium">+15-25%</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link href="/services/premium/green-roof-systems" 
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                      Discover Green Systems
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Luxury Resort Roofing */}
              <div className="lg:col-span-2 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Luxury Resort Roofing</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Commercial-grade luxury performance.</strong> Resort and hospitality roofing systems designed for beauty, durability, and minimal maintenance.</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Performance:</span>
                          <span className="font-medium">25-40 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance:</span>
                          <span className="font-medium">Minimal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Specialization:</span>
                          <span className="font-medium">High-traffic</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link href="/services/premium/resort-roofing" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      View Resort Portfolio
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Historic Restoration */}
              <div className="lg:col-span-1 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Landmark className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-900">Historic Restoration</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Preserving Colorado's architectural heritage.</strong> Authentic restoration with modern performance standards and regulatory compliance expertise.</p>
                    
                    <Link href="/services/premium/historic-restoration" 
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                      Restoration Expertise
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Snow Management Systems */}
              <div className="lg:col-span-1 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Snowflake className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-xl font-bold text-gray-900">Snow Management</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Engineered for extreme conditions.</strong> Comprehensive snow and ice management systems protecting structures and people in mountain environments.</p>
                    
                    <Link href="/services/premium/snow-management" 
                          className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium">
                      Snow Engineering
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Value Proposition */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Premium Investment Value</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Premium roofing services deliver exceptional long-term value</strong> through superior materials, 
                master craftsmanship, and extended performance guarantees that justify the investment premium.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quality Premium */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Premium Benefits</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Material Excellence</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Premium materials last 2-3x longer</li>
                      <li>• Superior weather resistance performance</li>
                      <li>• Enhanced aesthetic retention over time</li>
                      <li>• Exclusive warranty coverage included</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">65-85%</div>
                    <div className="text-xs text-blue-800">Lower lifecycle cost vs. standard materials</div>
                  </div>
                </div>
              </div>

              {/* Craftsmanship Value */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Master Craftsmanship Value</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Installation Excellence</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Master craftsman guild certification</li>
                      <li>• Specialized technique implementation</li>
                      <li>• Quality control exceeding standards</li>
                      <li>• Performance optimization methods</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">25-50%</div>
                    <div className="text-xs text-purple-800">Longer performance vs. standard installation</div>
                  </div>
                </div>
              </div>

              {/* Property Value Enhancement */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Enhancement</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Value Increase</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Luxury material property premium</li>
                      <li>• Architectural enhancement value</li>
                      <li>• Energy efficiency improvements</li>
                      <li>• Market differentiation advantages</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">15-35%</div>
                    <div className="text-xs text-green-800">Property value increase from premium roofing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Premium Service ROI Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Service Category</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-900">Initial Premium</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-900">Lifespan Extension</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-900">Property Value Add</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-900">25-Year ROI</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium">Custom Copper</td>
                      <td className="py-3 px-2 text-center">40-60%</td>
                      <td className="py-3 px-2 text-center">3x standard</td>
                      <td className="py-3 px-2 text-center">25-35%</td>
                      <td className="py-3 px-2 text-center font-bold text-green-600">285%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium">Living Green Roof</td>
                      <td className="py-3 px-2 text-center">50-80%</td>
                      <td className="py-3 px-2 text-center">2.5x standard</td>
                      <td className="py-3 px-2 text-center">20-30%</td>
                      <td className="py-3 px-2 text-center font-bold text-green-600">325%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium">Historic Restoration</td>
                      <td className="py-3 px-2 text-center">30-50%</td>
                      <td className="py-3 px-2 text-center">2x standard</td>
                      <td className="py-3 px-2 text-center">15-25%</td>
                      <td className="py-3 px-2 text-center font-bold text-green-600">240%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Snow Management</td>
                      <td className="py-3 px-2 text-center">25-35%</td>
                      <td className="py-3 px-2 text-center">Damage prevention</td>
                      <td className="py-3 px-2 text-center">10-15%</td>
                      <td className="py-3 px-2 text-center font-bold text-green-600">185%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance Standards */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Premium Quality Assurance</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Quality Standards */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Master Craftsman Standards</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Guild Certification Required</div>
                        <div className="text-sm text-gray-600">All premium work performed by master craftsmen with specialized material certification</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Enhanced Quality Control</div>
                        <div className="text-sm text-gray-600">Multi-stage inspection process with independent quality verification at each milestone</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Performance Documentation</div>
                        <div className="text-sm text-gray-600">Comprehensive documentation package including engineering calculations and warranties</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Lifetime Relationship</div>
                        <div className="text-sm text-gray-600">Ongoing maintenance partnership with priority service and performance monitoring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Warranties */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Warranty Coverage</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Material Warranties</h4>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Copper Systems:</span>
                          <span className="font-medium">50+ years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Green Roof Systems:</span>
                          <span className="font-medium">25-40 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Premium Synthetics:</span>
                          <span className="font-medium">30-50 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Historic Materials:</span>
                          <span className="font-medium">25-75 years</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Guarantees</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Weather resistance performance guarantee</li>
                        <li>• Energy efficiency performance verification</li>
                        <li>• Aesthetic retention standards</li>
                        <li>• Structural integrity assurance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Premium Excellence?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Experience Colorado's premier luxury roofing services. Master craftsmanship, premium materials, 
            and investment-grade quality that enhances property value for decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Schedule Premium Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/portfolio" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white border border-purple-400 rounded-lg font-semibold hover:bg-purple-400 transition-colors">
              View Premium Portfolio
            </Link>
          </div>
          <p className="text-sm text-purple-200 mt-4">
            Master Craftsman Guild • Investment-Grade Quality • Lifetime Performance
          </p>
        </div>
      </section>
    </div>
  );
}