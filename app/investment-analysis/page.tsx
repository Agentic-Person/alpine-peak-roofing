'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ROI Calculator Component
function ROICalculator() {
  const [inputs, setInputs] = useState({
    homeValue: 1500000,
    roofSize: 3500,
    currentAge: 15,
    premiumUpgrade: 75000,
    energySavingsPercent: 35,
    maintenanceReduction: 60
  })
  
  const [results, setResults] = useState({
    energySavings: 0,
    maintenanceSavings: 0,
    propertyValueIncrease: 0,
    totalSavings: 0,
    roi: 0,
    paybackPeriod: 0
  })

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    const annualEnergyBill = Math.round(inputs.homeValue * 0.012) // ~1.2% of home value
    const annualEnergySavings = Math.round(annualEnergyBill * (inputs.energySavingsPercent / 100))
    
    const annualMaintenanceCost = inputs.roofSize * 0.75 // $0.75 per sq ft annually
    const annualMaintenanceSavings = Math.round(annualMaintenanceCost * (inputs.maintenanceReduction / 100))
    
    const propertyValueIncrease = Math.round(inputs.homeValue * 0.08) // 8% average increase
    const totalAnnualSavings = annualEnergySavings + annualMaintenanceSavings
    const thirtyYearSavings = totalAnnualSavings * 30
    const totalReturn = thirtyYearSavings + propertyValueIncrease
    
    const roi = Math.round(((totalReturn - inputs.premiumUpgrade) / inputs.premiumUpgrade) * 100)
    const paybackPeriod = Math.round(inputs.premiumUpgrade / totalAnnualSavings * 10) / 10

    setResults({
      energySavings: annualEnergySavings,
      maintenanceSavings: annualMaintenanceSavings,
      propertyValueIncrease,
      totalSavings: thirtyYearSavings,
      roi,
      paybackPeriod
    })
  }

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Premium Roofing ROI Calculator</h2>
      
      {/* Input Controls */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Value</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.homeValue}
                onChange={(e) => handleInputChange('homeValue', parseInt(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roof Size (sq ft)</label>
            <input
              type="number"
              value={inputs.roofSize}
              onChange={(e) => handleInputChange('roofSize', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Roof Age (years)</label>
            <input
              type="number"
              value={inputs.currentAge}
              onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Investment</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Premium System Cost</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.premiumUpgrade}
                onChange={(e) => handleInputChange('premiumUpgrade', parseInt(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Efficiency Improvement (%): {inputs.energySavingsPercent}%
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={inputs.energySavingsPercent}
              onChange={(e) => handleInputChange('energySavingsPercent', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Reduction (%): {inputs.maintenanceReduction}%
            </label>
            <input
              type="range"
              min="30"
              max="85"
              value={inputs.maintenanceReduction}
              onChange={(e) => handleInputChange('maintenanceReduction', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Your Investment Returns</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">${results.energySavings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Annual Energy Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">${results.maintenanceSavings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Annual Maintenance Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">${results.propertyValueIncrease.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Property Value Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">${results.totalSavings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">30-Year Total Savings</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Return on Investment</h4>
            <div className="text-5xl font-bold text-green-600 mb-2">{results.roi}%</div>
            <div className="text-sm text-gray-600">Over 30 years</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Payback Period</h4>
            <div className="text-5xl font-bold text-blue-600 mb-2">{results.paybackPeriod}</div>
            <div className="text-sm text-gray-600">Years to break even</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvestmentAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Investment Analysis</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Premium Roofing
            <span className="block text-blue-600">Investment Analysis</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the financial benefits of investing in premium mountain roofing systems. 
            Calculate your return on investment and understand the long-term value proposition 
            of quality craftsmanship and superior materials.
          </p>
        </header>

        {/* ROI Calculator */}
        <div className="mb-16">
          <ROICalculator />
        </div>

        {/* Investment Overview */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Understanding Premium Roofing Investment</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Premium Materials Matter</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                In Colorado's extreme mountain conditions, the difference between premium and standard 
                roofing materials becomes dramatically apparent over time. While the initial investment 
                is higher, premium systems deliver superior long-term value through enhanced durability, 
                energy efficiency, and reduced maintenance requirements.
              </p>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                  <h4 className="text-xl font-semibold text-blue-900 mb-3">Longevity Advantage</h4>
                  <p className="text-blue-800 mb-4">
                    Premium mountain roofing systems typically last 50+ years compared to 15-20 years 
                    for standard materials in high-altitude conditions.
                  </p>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Standing seam metal: 50-70 years</li>
                    <li>• Premium synthetic slate: 50+ years</li>
                    <li>• Copper systems: 100+ years</li>
                    <li>• Standard asphalt: 12-18 years at altitude</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <h4 className="text-xl font-semibold text-green-900 mb-3">Energy Efficiency</h4>
                  <p className="text-green-800 mb-4">
                    Premium materials and installation techniques deliver significant energy savings 
                    through superior insulation, air sealing, and reflective properties.
                  </p>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• 35-45% reduction in heating costs</li>
                    <li>• 20-30% cooling cost savings</li>
                    <li>• Enhanced thermal performance</li>
                    <li>• Reduced carbon footprint</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cost Comparison Analysis</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Initial Investment (3,500 sq ft home)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Standard Asphalt System</span>
                      <span className="font-semibold">$28,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Premium Metal System</span>
                      <span className="font-semibold">$65,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Ultra-Premium Copper</span>
                      <span className="font-semibold">$125,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">30-Year Total Cost of Ownership</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Standard (2 replacements)</span>
                      <span className="font-semibold text-red-600">$84,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Premium Metal</span>
                      <span className="font-semibold text-green-600">$65,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Ultra-Premium Copper</span>
                      <span className="font-semibold text-blue-600">$125,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-900 mb-1">Premium Metal Advantage</div>
                    <div className="text-3xl font-bold text-green-600">$19,000</div>
                    <div className="text-sm text-green-700">30-year savings vs standard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Options */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexible Financing Solutions</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We understand that premium roofing represents a significant investment. Our financing 
              programs make it easy to access the benefits of superior roofing systems while 
              managing cash flow effectively.
            </p>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">12-Month 0% APR</h3>
                <p className="text-gray-600 mb-4">
                  No interest charges for qualified buyers. Perfect for clients who prefer 
                  to pay over time without additional costs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• No down payment required</li>
                  <li>• Quick approval process</li>
                  <li>• Fixed monthly payments</li>
                  <li>• Early payoff without penalty</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Extended Term Financing</h3>
                <p className="text-gray-600 mb-4">
                  Lower monthly payments with terms up to 20 years. Competitive rates 
                  for qualified applicants.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Terms from 5-20 years</li>
                  <li>• Rates starting at 6.99% APR</li>
                  <li>• Online application process</li>
                  <li>• Same-day approval available</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-green-50 border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Solar + Roofing Package</h3>
                <p className="text-green-700 mb-4">
                  Combine roofing and solar installation for maximum energy savings 
                  and financing advantages.
                </p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 30% Federal Solar Tax Credit</li>
                  <li>• Colorado state incentives</li>
                  <li>• Net metering benefits</li>
                  <li>• Integrated project management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-xl text-white p-8">
            <h2 className="text-3xl font-bold mb-6">Tax Benefits & Incentives</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Take advantage of federal, state, and local incentives that can significantly 
              reduce your net investment in premium roofing systems.
            </p>

            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-xl font-semibold mb-3">Federal Tax Credits</h3>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Solar installation: 30% of system cost</li>
                  <li>• Energy-efficient materials: up to $500</li>
                  <li>• Energy Star qualified products eligible</li>
                  <li>• Geothermal systems: 30% credit</li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-xl font-semibold mb-3">Colorado State Incentives</h3>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Renewable energy tax credits</li>
                  <li>• Property tax exemptions</li>
                  <li>• Utility rebate programs</li>
                  <li>• Net metering policies</li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <h3 className="text-xl font-semibold mb-3">Local Utility Programs</h3>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>• Energy efficiency rebates: up to $5,000</li>
                  <li>• Demand response programs</li>
                  <li>• Time-of-use rate advantages</li>
                  <li>• Grid-tied system benefits</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur">
              <h3 className="text-xl font-bold mb-2">Maximum Incentive Potential</h3>
              <div className="text-4xl font-bold text-yellow-300">$45,000+</div>
              <div className="text-sm text-blue-100 mt-1">Combined savings on premium system</div>
            </div>
          </div>
        </section>

        {/* Property Value Impact */}
        <section className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Property Value Enhancement</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Value Increase</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium roofing systems typically increase property value by 8-12% immediately 
                upon completion, with luxury mountain properties seeing the highest gains.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Differentiation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium roofing creates significant competitive advantage in luxury markets, 
                with properties selling 25% faster than comparable homes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibent text-gray-900 mb-3">Long-term Appreciation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Quality roofing systems maintain property values over decades, while 
                standard systems require costly replacements that impact equity.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Market Value Analysis</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">$1.5M</div>
                <div className="text-sm text-gray-600 mb-2">Average Home Value</div>
                <div className="text-xs text-gray-500">Mountain luxury market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$120K</div>
                <div className="text-sm text-gray-600 mb-2">Value Increase</div>
                <div className="text-xs text-gray-500">With premium roofing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">25%</div>
                <div className="text-sm text-gray-600 mb-2">Faster Sales</div>
                <div className="text-xs text-gray-500">Market advantage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">15%</div>
                <div className="text-sm text-gray-600 mb-2">Premium Achieved</div>
                <div className="text-xs text-gray-500">Above market price</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Maximize Your Roofing Investment?</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Let our experts help you design a premium roofing solution that delivers exceptional 
              returns on your investment. Schedule a comprehensive assessment to explore your options 
              and discover the financial benefits of choosing Alpine Peak Roofing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Schedule Investment Consultation
              </Link>
              <Link 
                href="/guides/mountain-roofing-colorado" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                View Technical Guide
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Free consultation • Custom ROI analysis • Financing pre-approval available</p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <aside className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/sustainability" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  Sustainability Benefits
                </h3>
                <p className="text-sm text-gray-600">
                  Environmental and financial advantages
                </p>
              </div>
            </Link>
            <Link href="/process" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  Our Process
                </h3>
                <p className="text-sm text-gray-600">
                  Step-by-step premium installation
                </p>
              </div>
            </Link>
            <Link href="/faq" className="group">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-semibent text-gray-900 group-hover:text-blue-600 mb-2">
                  Investment FAQ
                </h3>
                <p className="text-sm text-gray-600">
                  Common questions about roofing ROI
                </p>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}