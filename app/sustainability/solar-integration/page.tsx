import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sun, Battery, Zap, TrendingUp, Shield, Calculator, CheckCircle2, Home, Wrench, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solar Roofing Integration Colorado | Tesla Solar Roof | Alpine Peak Roofing',
  description: 'Colorado\'s premier solar roofing integration specialist. Tesla Solar Roof certified installer, traditional panel integration, battery storage coordination. Premium solar solutions.',
  keywords: 'solar roofing Colorado, Tesla Solar Roof Colorado, solar panel roofing, solar integration Colorado, renewable energy roofing, battery storage roofing',
  openGraph: {
    title: 'Solar Roofing Integration Colorado | Alpine Peak Roofing',
    description: 'Leading Colorado\'s solar roofing transformation with Tesla certification and premium integration expertise',
    type: 'article',
  },
};

export default function SolarIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sun className="w-4 h-4" />
              Solar Integration Expertise
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Solar Roofing Integration
              <span className="block text-amber-600 text-2xl md:text-3xl mt-2">Tesla Certified • Premium Performance</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Colorado's certified Tesla Solar Roof installer</strong> with 500+ renewable energy integrations completed. 
              Premium solar solutions that enhance property value while delivering decades of clean energy production.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                Tesla Certified Installer
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                25-Year Production Warranty
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                Premium Integration Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Performance Metrics */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Solar Integration Performance</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Solar Installations</div>
              <div className="text-xs text-gray-600">Tesla Solar Roof & traditional panels</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Energy Independence</div>
              <div className="text-xs text-gray-600">Average household coverage</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">$2,400</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Annual Savings</div>
              <div className="text-xs text-gray-600">Average utility bill reduction</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">25</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Year Warranty</div>
              <div className="text-xs text-gray-600">Production guarantee standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Tesla Solar Roof Excellence */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Sun className="w-8 h-8 text-amber-600" />
              <h2 className="text-3xl font-bold text-gray-900">Tesla Solar Roof Excellence</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Certified Tesla Solar Roof installer since 2020</strong> with specialized expertise in Colorado's challenging mountain conditions. 
                Tesla Solar Roof tiles integrate seamlessly with traditional roofing materials while generating clean energy for decades.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tesla Solar Roof Tiles */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tesla Solar Roof Tiles</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">Power Output:</div>
                        <div className="text-gray-600">71.67 watts per tile</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Efficiency:</div>
                        <div className="text-gray-600">22.8% solar efficiency</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Dimensions:</div>
                        <div className="text-gray-600">15" x 45" per tile</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Weight:</div>
                        <div className="text-gray-600">13 lbs per sq ft</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Durability Features</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Tempered glass construction - 3x stronger than standard tiles</li>
                      <li>• Class A fire rating with superior wind resistance</li>
                      <li>• Impact resistance: Hail up to 1.75" diameter</li>
                      <li>• Temperature range: -40°F to 185°F operation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Investment Analysis */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Cost Structure</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Solar Tiles:</span>
                        <span className="font-medium">$21-28 per sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Non-Solar Tiles:</span>
                        <span className="font-medium">$11-14 per sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Installation:</span>
                        <span className="font-medium">$6-9 per sq ft</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Investment:</span>
                          <span>$38-51 per sq ft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Return on Investment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Energy Savings:</span>
                        <span className="font-medium">$1,800-$3,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Federal Tax Credit:</span>
                        <span className="font-medium">30% of system cost</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payback Period:</span>
                        <span className="font-medium">8-12 years</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold text-green-600">
                          <span>25-Year Savings:</span>
                          <span>$65K-$95K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tesla Powerwall Integration */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Battery className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Tesla Powerwall Integration</h3>
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Energy Storage</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 13.5 kWh usable capacity per unit</li>
                    <li>• 5 kW continuous power output</li>
                    <li>• 7 kW peak power for motor starting</li>
                    <li>• 90% round-trip efficiency</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Backup Power</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Automatic outage detection</li>
                    <li>• Seamless transition under 1 second</li>
                    <li>• 2-3 day backup power typical home</li>
                    <li>• Solar recharging during outages</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Management</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Time-of-use optimization</li>
                    <li>• Storm watch preparation</li>
                    <li>• Mobile app monitoring</li>
                    <li>• Grid services participation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Panel Integration */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Premium Panel Integration</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>When Tesla Solar Roof isn't the optimal solution</strong>, our premium panel integration provides maximum energy 
                production with superior roof protection and aesthetic integration for Colorado's diverse architectural styles.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Panel Systems */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Panel Options</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">High-Efficiency Monocrystalline</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Efficiency:</div>
                          <div className="font-medium">20-22%</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Power Output:</div>
                          <div className="font-medium">350-400W</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Warranty:</div>
                          <div className="font-medium">25 years</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Cost:</div>
                          <div className="font-medium">$3-5/sq ft</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Bifacial Panel Systems</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Front and rear energy capture</li>
                        <li>• 15-30% additional energy from reflection</li>
                        <li>• Ideal for snow-reflective environments</li>
                        <li>• Premium aesthetics with glass-glass construction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mounting Excellence</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Roof Integration Methods</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Ballasted Systems:</strong> No roof penetration for flat roofs</li>
                        <li>• <strong>Flashed Penetrations:</strong> Waterproof attachment for sloped roofs</li>
                        <li>• <strong>Integrated Mounting:</strong> Built into new roof construction</li>
                        <li>• <strong>Building-Integrated PV:</strong> Panels replace roofing materials</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation Excellence */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Installation Excellence</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Quality Standards</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• NABCEP certified installation crews</li>
                        <li>• Engineered mounting calculations</li>
                        <li>• Code compliance in all jurisdictions</li>
                        <li>• 25-year installation warranty</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Mountain Specialization</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• High-wind mounting systems (120+ mph)</li>
                        <li>• Snow load optimization and management</li>
                        <li>• UV-resistant materials for high altitude</li>
                        <li>• Extreme temperature performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">System Monitoring</h3>
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Tracking</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Real-time production monitoring</li>
                      <li>• Individual panel performance tracking</li>
                      <li>• Automated maintenance alerts</li>
                      <li>• Historical performance analysis</li>
                      <li>• Mobile app integration for homeowners</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 text-center p-3 bg-amber-100 rounded-lg">
                    <div className="text-lg font-bold text-amber-800">99.5% Uptime</div>
                    <div className="text-xs text-amber-700">Guaranteed system availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing and Incentives */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold">Solar Investment Incentives</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Federal Incentives</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Federal Tax Credit (ITC):</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Available Through:</span>
                    <span className="font-bold">2032</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Battery Storage:</span>
                    <span className="font-bold">Included</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$15K-$25K</div>
                      <div className="text-sm opacity-80">Typical federal savings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Colorado Incentives</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>State Tax Credit:</span>
                    <span className="font-bold">$500 max</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Net Metering:</span>
                    <span className="font-bold">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Utility Rebates:</span>
                    <span className="font-bold">Varies</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$2K-$5K</div>
                      <div className="text-sm opacity-80">Additional state savings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Financing Options</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Solar Loans:</span>
                    <span className="font-bold">2.99-6.99% APR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Lease Options:</span>
                    <span className="font-bold">$0 down</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Power Purchase:</span>
                    <span className="font-bold">$0.08-0.12/kWh</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$125-$200</div>
                      <div className="text-sm opacity-80">Typical monthly payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/estimator" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Calculate Your Solar Investment
                <Calculator className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Solar-Powered Independence?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Experience premium solar integration with Colorado's Tesla-certified specialists. 
            Investment-grade quality, maximum energy production, and lifetime performance warranties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Schedule Solar Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/estimator" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white border border-amber-400 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              Get Solar Quote
            </Link>
          </div>
          <p className="text-sm text-amber-200 mt-4">
            Tesla Certified • 500+ Solar Installations • 25-Year Warranty
          </p>
        </div>
      </section>
    </div>
  );
}