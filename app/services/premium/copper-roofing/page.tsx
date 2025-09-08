import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Palette, Shield, TrendingUp, Award, Eye, CheckCircle2, Clock, Wrench, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Copper Roofing Colorado | Premium Copper Installation | Alpine Peak Roofing',
  description: 'Colorado\'s premier custom copper roofing specialist. Standing seam copper, soldered systems, patina development. 70+ year lifespan, investment-grade quality for luxury estates.',
  keywords: 'copper roofing Colorado, custom copper roofing, standing seam copper, luxury copper roofing, copper roof installation Colorado, premium copper roofing',
  openGraph: {
    title: 'Custom Copper Roofing Colorado | Alpine Peak Roofing',
    description: 'Master craftsmen creating Colorado\'s finest copper roofing systems with 70+ year performance',
    type: 'article',
  },
};

export default function CopperRoofingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-copper-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Palette className="w-4 h-4" />
              Master Craftsmanship
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Custom Copper Roofing
              <span className="block text-amber-600 text-2xl md:text-3xl mt-2">The Pinnacle of Roofing Artistry</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Colorado's premier copper roofing specialists</strong> with 150+ luxury installations. Hand-crafted standing seam 
              and soldered systems that develop stunning patina while delivering 70+ years of unmatched performance and beauty.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                Master Craftsman Certified
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                70+ Year Lifespan
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                50-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copper Excellence Metrics */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Copper Roofing Excellence</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">150+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Copper Installations</div>
              <div className="text-xs text-gray-600">Luxury estate & commercial projects</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">70+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Year Lifespan</div>
              <div className="text-xs text-gray-600">Proven mountain performance</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">285%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">25-Year ROI</div>
              <div className="text-xs text-gray-600">Investment value return</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Property Value Increase</div>
              <div className="text-xs text-gray-600">Luxury market enhancement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Copper Roofing Mastery */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-8 h-8 text-amber-600" />
              <h2 className="text-3xl font-bold text-gray-900">Copper Roofing Mastery</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Copper roofing represents the absolute pinnacle of roofing artistry and longevity.</strong> Our master craftsmen 
                create hand-formed copper systems that not only protect your investment for 70+ years but develop breathtaking patina 
                that becomes more beautiful with age.
              </p>
              
              <p className="mb-6">
                With 150+ luxury copper installations across Colorado's most prestigious properties, Alpine Peak Roofing has earned 
                recognition as the state's premier copper roofing specialist, serving discerning clients who demand nothing less than perfection.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Standing Seam Copper */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standing Seam Copper Systems</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">System Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">Panel Width:</div>
                        <div className="text-gray-600">12", 16", 18", 20"</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Copper Gauge:</div>
                        <div className="text-gray-600">16 oz, 20 oz standard</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Seam Height:</div>
                        <div className="text-gray-600">1.5" or 2" profiles</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Thermal Movement:</div>
                        <div className="text-gray-600">Fully accommodated</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Features</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Double-lock seams for ultimate weather resistance</li>
                      <li>• Concealed fastening system eliminates penetrations</li>
                      <li>• Thermal expansion joints prevent stress concentration</li>
                      <li>• Custom-formed accessories for perfect integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Soldered Copper Systems */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Soldered Copper Systems</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Traditional Craftsmanship</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Hand-soldered seams</strong> create the ultimate in watertight performance while showcasing traditional European craftsmanship techniques.</p>
                      <p><strong>Flat-seam construction</strong> allows for complex geometries and custom architectural details impossible with mechanical seaming.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Applications</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Historic restoration projects requiring authenticity</li>
                      <li>• Complex architectural forms and curved surfaces</li>
                      <li>• Bay windows and dormer integrations</li>
                      <li>• Ornamental details and decorative elements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Patina Development */}
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-bold text-gray-900">Living Beauty: Patina Development</h3>
              </div>
              <div className="grid lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="w-12 h-12 bg-amber-400 rounded-full mx-auto mb-3"></div>
                  <div className="font-semibold text-gray-900">New Installation</div>
                  <div className="text-xs text-gray-600">Bright copper shine</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full mx-auto mb-3"></div>
                  <div className="font-semibold text-gray-900">6-18 Months</div>
                  <div className="text-xs text-gray-600">Rich bronze tones</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="w-12 h-12 bg-amber-800 rounded-full mx-auto mb-3"></div>
                  <div className="font-semibold text-gray-900">2-5 Years</div>
                  <div className="text-xs text-gray-600">Deep chocolate brown</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-teal-100 text-center">
                  <div className="w-12 h-12 bg-teal-600 rounded-full mx-auto mb-3"></div>
                  <div className="font-semibold text-gray-900">10+ Years</div>
                  <div className="text-xs text-gray-600">Classic verdigris green</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-4 text-center">
                <strong>Colorado's unique high-altitude environment accelerates patina development</strong>, creating stunning visual transformation 
                typically 20-30% faster than sea-level locations.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Excellence */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Master Craftsman Installation</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Copper roofing installation is an art form that demands master-level expertise.</strong> Our certified craftsmen 
                undergo extensive training in traditional European techniques combined with modern engineering standards to ensure 
                both aesthetic perfection and structural performance.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Craftsmanship Standards */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Craftsmanship Standards</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Master Craftsman Certification</div>
                        <div className="text-sm text-gray-600">5+ years specialized copper training with European guild standards</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Hand-Formed Precision</div>
                        <div className="text-sm text-gray-600">Custom-formed details and accessories crafted on-site for perfect fit</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Quality Control Process</div>
                        <div className="text-sm text-gray-600">Multi-stage inspection with independent verification at each phase</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Traditional Tool Mastery</div>
                        <div className="text-sm text-gray-600">Specialized copper-working tools for authentic craftsmanship results</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation Process */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Installation Process</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-amber-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Phase 1: Substrate Preparation</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Structural assessment and reinforcement if needed</li>
                        <li>• Premium underlayment installation</li>
                        <li>• Thermal barrier application for expansion control</li>
                        <li>• Precision measurement and layout</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-amber-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Phase 2: Copper Installation</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Custom panel fabrication and forming</li>
                        <li>• Seam creation using specialized tools</li>
                        <li>• Thermal expansion joint integration</li>
                        <li>• Accessory installation and weatherproofing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-amber-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Phase 3: Quality Assurance</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Comprehensive water testing protocols</li>
                        <li>• Seam integrity verification</li>
                        <li>• Thermal movement testing</li>
                        <li>• Final inspection and documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Analysis */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold">Copper Roofing Investment Analysis</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Initial Investment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Standing Seam Copper:</span>
                    <span className="font-bold">$18-25/sq ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Soldered Systems:</span>
                    <span className="font-bold">$22-28/sq ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Complex Details:</span>
                    <span className="font-bold">$35-45/sq ft</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$65K-$125K</div>
                      <div className="text-sm opacity-80">Typical luxury home investment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Lifecycle Value</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>System Lifespan:</span>
                    <span className="font-bold">70+ years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maintenance Cost:</span>
                    <span className="font-bold">Minimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Replacement Avoidance:</span>
                    <span className="font-bold">2-3 roof cycles</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">$185K</div>
                      <div className="text-sm opacity-80">Replacement cost savings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Property Enhancement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Property Value Increase:</span>
                    <span className="font-bold">25-35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Market Differentiation:</span>
                    <span className="font-bold">Premium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resale Advantage:</span>
                    <span className="font-bold">Significant</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">285%</div>
                      <div className="text-sm opacity-80">25-year ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-green-100 mb-4">
                <strong>Copper roofing typically pays for itself within 12-15 years</strong> through energy savings, 
                maintenance reduction, and property value enhancement.
              </p>
              <Link href="/investment-analysis" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Calculate Your Copper ROI
                <TrendingUp className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Timeless Copper Excellence?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Experience the pinnacle of roofing artistry with Colorado's master copper craftsmen. 
            70+ year performance, stunning patina development, and investment-grade quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Schedule Copper Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/portfolio" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white border border-amber-400 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              View Copper Portfolio
            </Link>
          </div>
          <p className="text-sm text-amber-200 mt-4">
            150+ Copper Installations • Master Craftsman Guild • 50-Year Warranty
          </p>
        </div>
      </section>
    </div>
  );
}