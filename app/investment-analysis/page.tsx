import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, TrendingUp, Shield, DollarSign, Home, BarChart3, CheckCircle2, AlertCircle, Award, PiggyBank } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Roofing Investment Analysis Colorado | ROI Calculator | Alpine Peak Roofing',
  description: 'Comprehensive roofing investment analysis and ROI calculator. Premium roofing value proposition, lifecycle cost analysis, insurance benefits, property value impact.',
  keywords: 'roofing investment analysis, roofing ROI calculator, roofing cost benefit analysis, premium roofing value, roofing property value, roofing insurance benefits',
  openGraph: {
    title: 'Roofing Investment Analysis Colorado | Alpine Peak Roofing',
    description: 'Comprehensive investment analysis tools for premium roofing decisions in Colorado',
    type: 'article',
  },
};

export default function InvestmentAnalysisHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" />
              Investment Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Investment Analysis Hub
              <span className="block text-green-600 text-2xl md:text-3xl mt-2">Premium Roofing Value Calculator</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Comprehensive investment analysis tools</strong> that justify premium roofing decisions through data-driven ROI calculations, 
              lifecycle cost analysis, and property value enhancement projections for Colorado's luxury markets.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Advanced ROI Modeling
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Insurance Benefit Analysis
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-green-600" />
                Property Value Impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Metrics */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Investment Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">285%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">25-Year ROI</div>
              <div className="text-xs text-gray-600">Premium copper systems</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Property Value Increase</div>
              <div className="text-xs text-gray-600">Luxury material premium</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">$2,400</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Annual Energy Savings</div>
              <div className="text-xs text-gray-600">High-performance systems</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">65%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Insurance Claim Reduction</div>
              <div className="text-xs text-gray-600">Impact-resistant materials</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Investment Calculators Overview */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Comprehensive Investment Calculators</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Make informed premium roofing decisions with data-driven analysis.</strong> Our suite of investment calculators 
                provides comprehensive financial modeling to justify premium material selection and demonstrate long-term value creation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* ROI Calculator */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">ROI Calculator</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Comprehensive return on investment analysis comparing premium materials against standard options over 25-50 year horizons.</p>
                  
                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Energy Savings:</span>
                        <span className="font-medium text-green-600">$1,800-3,200/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance Reduction:</span>
                        <span className="font-medium text-green-600">$850-1,500/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance Benefits:</span>
                        <span className="font-medium text-green-600">$200-600/year</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/investment-analysis/roi-calculator" 
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Calculate Your ROI
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Lifecycle Cost Analyzer */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Lifecycle Cost Analyzer</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Total cost of ownership analysis including initial investment, maintenance, energy, and replacement costs over system lifespan.</p>
                  
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Standard System:</span>
                        <span className="font-medium text-red-600">$185K lifetime</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium System:</span>
                        <span className="font-medium text-green-600">$125K lifetime</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Savings:</span>
                        <span className="font-medium text-green-600">$60K over 50 years</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/investment-analysis/lifecycle-analysis" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Analyze Lifecycle Costs
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Insurance Impact Calculator */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Insurance Impact Calculator</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Quantifies insurance premium reductions and claim avoidance benefits from impact-resistant and wind-rated premium materials.</p>
                  
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Premium Reduction:</span>
                        <span className="font-medium text-purple-600">15-35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Savings:</span>
                        <span className="font-medium text-purple-600">$400-1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Claim Avoidance:</span>
                        <span className="font-medium text-purple-600">65-85%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/investment-analysis/insurance-impact" 
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                    Calculate Insurance Benefits
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Property Value Estimator */}
              <div className="lg:col-span-1 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-gray-900">Property Value Estimator</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p>Calculates immediate and long-term property value enhancement from premium roofing investments in Colorado's luxury markets.</p>
                    
                    <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                      <div className="text-2xl font-bold text-amber-600">$65K-$125K</div>
                      <div className="text-xs text-amber-700">Typical value increase luxury homes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Energy Efficiency ROI */}
              <div className="lg:col-span-1 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                  <div className="flex items-center gap-3 mb-4">
                    <PiggyBank className="w-6 h-6 text-teal-600" />
                    <h3 className="text-xl font-bold text-gray-900">Energy Efficiency ROI</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p>Models energy savings from cool roofing, enhanced insulation, and solar integration over system lifespan.</p>
                    
                    <div className="text-center p-3 bg-white rounded-lg border border-teal-200">
                      <div className="text-2xl font-bold text-teal-600">$125K</div>
                      <div className="text-xs text-teal-700">50-year energy savings potential</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Investment Analysis */}
              <div className="lg:col-span-2 xl:col-span-1">
                <div className="h-full p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">Total Investment Analysis</h3>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p>Comprehensive financial model combining all value factors: ROI, property value, energy savings, insurance benefits, and maintenance reduction.</p>
                    
                    <div className="text-center p-3 bg-white rounded-lg border border-indigo-200">
                      <div className="text-2xl font-bold text-indigo-600">385%</div>
                      <div className="text-xs text-indigo-700">Total return premium systems</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium vs Standard Comparison */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Premium vs. Standard Investment Comparison</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Premium roofing systems consistently outperform standard materials</strong> across all financial metrics. 
                While initial investment is 40-60% higher, total lifecycle value exceeds standard systems by 185-325%.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-2 font-semibold text-gray-900">Investment Factor</th>
                    <th className="text-center py-4 px-2 font-semibold text-gray-900">Standard System</th>
                    <th className="text-center py-4 px-2 font-semibold text-gray-900">Premium System</th>
                    <th className="text-center py-4 px-2 font-semibold text-green-600">Premium Advantage</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">Initial Investment</td>
                    <td className="py-3 px-2 text-center">$12-18/sq ft</td>
                    <td className="py-3 px-2 text-center">$18-28/sq ft</td>
                    <td className="py-3 px-2 text-center text-red-600">40-60% higher</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">System Lifespan</td>
                    <td className="py-3 px-2 text-center">20-25 years</td>
                    <td className="py-3 px-2 text-center">50-70+ years</td>
                    <td className="py-3 px-2 text-center font-bold text-green-600">2.5-3x longer</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">Annual Maintenance</td>
                    <td className="py-3 px-2 text-center">$850-1,500</td>
                    <td className="py-3 px-2 text-center">$200-450</td>
                    <td className="py-3 px-2 text-center font-bold text-green-600">65-75% lower</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">Energy Performance</td>
                    <td className="py-3 px-2 text-center">Standard</td>
                    <td className="py-3 px-2 text-center">30-50% better</td>
                    <td className="py-3 px-2 text-center font-bold text-green-600">$1,800-3,200/year</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">Insurance Impact</td>
                    <td className="py-3 px-2 text-center">Standard rates</td>
                    <td className="py-3 px-2 text-center">15-35% reduction</td>
                    <td className="py-3 px-2 text-center font-bold text-green-600">$400-1,200/year</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium">Property Value Impact</td>
                    <td className="py-3 px-2 text-center">Minimal</td>
                    <td className="py-3 px-2 text-center">15-35% increase</td>
                    <td className="py-3 px-2 text-center font-bold text-green-600">$45K-125K</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-4 px-2 font-bold text-gray-900">50-Year Total Value</td>
                    <td className="py-4 px-2 text-center font-bold text-red-600">$185K</td>
                    <td className="py-4 px-2 text-center font-bold text-green-600">$325K+</td>
                    <td className="py-4 px-2 text-center font-bold text-green-600">+$140K advantage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Investment Insights */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Payback Period</div>
                    <div className="text-sm text-gray-600">Premium systems typically pay for themselves within 8-12 years through energy savings and maintenance reduction</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Risk Mitigation</div>
                    <div className="text-sm text-gray-600">Premium materials reduce weather damage risk by 65-85%, avoiding costly emergency repairs and insurance claims</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Market Position</div>
                    <div className="text-sm text-gray-600">Premium roofing creates significant market differentiation and resale advantages in luxury property segments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Decision Framework */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <DollarSign className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Investment Decision Framework</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Optimal roofing investment decisions require evaluating multiple financial factors</strong> beyond initial cost. 
                Our framework helps prioritize investments based on property type, climate exposure, and financial objectives.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Investment Priority Matrix */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Priority Matrix</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">High Priority Investments</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Luxury estates ($2M+):</strong> Premium materials essential for market positioning</li>
                      <li>• <strong>High-exposure locations:</strong> Wind/hail zones require impact-resistant systems</li>
                      <li>• <strong>Long-term ownership:</strong> 10+ year horizons favor premium materials</li>
                      <li>• <strong>Energy-focused clients:</strong> Sustainability and efficiency priorities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Moderate Priority Investments</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Executive homes ($750K-$2M):</strong> Selective premium upgrades</li>
                      <li>• <strong>Commercial properties:</strong> Performance-focused material selection</li>
                      <li>• <strong>Investment properties:</strong> Balance performance and cost</li>
                      <li>• <strong>Historic properties:</strong> Authentic materials with modern performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Financial Optimization Strategies */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Optimization Strategies</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Cash Flow Optimization</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Finance premium materials to preserve cash</li>
                      <li>• Coordinate with solar installations for combined financing</li>
                      <li>• Time installations for tax benefit optimization</li>
                      <li>• Bundle multiple properties for volume pricing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Risk Management</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Prioritize high-risk exposure areas first</li>
                      <li>• Invest in systems preventing emergency repairs</li>
                      <li>• Consider extended warranties for additional protection</li>
                      <li>• Plan phased upgrades for large properties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Warning Flags */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900">Investment Warning Flags</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Avoid Premium Investment When:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Property sale planned within 3-5 years</li>
                    <li>• Budget constraints prevent proper installation</li>
                    <li>• Structural issues require resolution first</li>
                    <li>• Local market doesn't support premium values</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Red Flags for Standard Materials:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• High-risk hail or wind exposure areas</li>
                    <li>• Luxury market properties requiring differentiation</li>
                    <li>• Energy efficiency critical for comfort/cost</li>
                    <li>• Maintenance access difficult or expensive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Calculator CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Calculate Your Roofing Investment Value</h2>
          <p className="text-xl mb-8 text-green-100">
            Use our comprehensive investment analysis tools to quantify the financial benefits 
            of premium roofing systems for your specific property and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/investment-analysis/roi-calculator" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Start ROI Analysis
              <Calculator className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white border border-green-400 rounded-lg font-semibold hover:bg-green-400 transition-colors">
              Schedule Investment Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <p className="text-sm text-green-200 mt-4">
            Advanced Financial Modeling • Data-Driven Decisions • Premium Value Validation
          </p>
        </div>
      </section>
    </div>
  );
}