import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, Calculator, Cog, Scale, BookOpen, Download, CheckCircle2, AlertTriangle, Award, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Resource Library Colorado | Roofing Engineering | Alpine Peak Roofing',
  description: 'Comprehensive technical resource library for roofing professionals. Load calculations, material specifications, installation standards, code compliance guides for Colorado.',
  keywords: 'roofing technical resources, load calculations roofing, roofing material specifications, roofing installation standards, Colorado building codes roofing',
  openGraph: {
    title: 'Technical Resource Library Colorado | Alpine Peak Roofing',
    description: 'Professional technical resources for advanced roofing engineering and installation',
    type: 'article',
  },
};

export default function TechnicalResourceLibrary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Engineering Authority
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Technical Resource Library
              <span className="block text-blue-600 text-2xl md:text-3xl mt-2">Professional Engineering Resources</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Comprehensive technical library for roofing professionals and informed consumers.</strong> Engineering calculations, 
              material specifications, installation standards, and code compliance guides for Colorado's demanding mountain and metro environments.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                Professional Engineering
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Code Compliance Verified
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                Industry Best Practices
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Statistics */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technical Resource Authority</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">450+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Technical Documents</div>
              <div className="text-xs text-gray-600">Engineering specifications</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Load Calculators</div>
              <div className="text-xs text-gray-600">Snow, wind, seismic analysis</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Material Data Sheets</div>
              <div className="text-xs text-gray-600">Performance specifications</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-amber-600 mb-2">75+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Code References</div>
              <div className="text-xs text-gray-600">Colorado compliance guides</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Technical Resource Categories */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Professional Resource Categories</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Access Colorado's most comprehensive roofing technical library.</strong> Our resources serve structural engineers, 
                architects, contractors, and informed property owners requiring detailed technical specifications and compliance documentation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Load Calculation Guides */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Load Calculation Guides</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Snow Load Engineering</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Ground Snow Loads:</strong> Colorado elevation-based calculations</li>
                      <li>• <strong>Roof Snow Loads:</strong> Thermal factor and exposure adjustments</li>
                      <li>• <strong>Drift Load Analysis:</strong> Multi-level roof snow accumulation</li>
                      <li>• <strong>Sliding Snow:</strong> Upper roof discharge calculations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Wind Load Analysis</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Basic Wind Speeds:</strong> Colorado geographic variations</li>
                      <li>• <strong>Exposure Categories:</strong> Terrain roughness adjustments</li>
                      <li>• <strong>Uplift Calculations:</strong> Component and cladding forces</li>
                      <li>• <strong>MWFRS Design:</strong> Main Wind Force Resisting System</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Seismic Considerations</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Seismic Design Categories:</strong> Colorado risk mapping</li>
                      <li>• <strong>Component Anchorage:</strong> Rooftop equipment securing</li>
                      <li>• <strong>Flexible Connections:</strong> Inter-building movement joints</li>
                      <li>• <strong>Historic Upgrades:</strong> Seismic retrofit considerations</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/resources/technical/load-calculations" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4">
                  Access Load Calculators
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Material Specifications */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Material Specifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Data Sheets</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Wind Resistance:</strong> ASTM testing and certifications</li>
                      <li>• <strong>Impact Ratings:</strong> UL 2218 hail resistance classifications</li>
                      <li>• <strong>Fire Ratings:</strong> Class A, B, C performance data</li>
                      <li>• <strong>Thermal Properties:</strong> Expansion coefficients and limits</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Warranty Documentation</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Material Warranties:</strong> Manufacturer coverage terms</li>
                      <li>• <strong>Installation Warranties:</strong> Workmanship guarantees</li>
                      <li>• <strong>Performance Bonds:</strong> Weather resistance assurances</li>
                      <li>• <strong>Transfer Procedures:</strong> Warranty assignment protocols</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Compatibility Matrices</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Material Interactions:</strong> Chemical compatibility guides</li>
                      <li>• <strong>Thermal Compatibility:</strong> Expansion matching requirements</li>
                      <li>• <strong>Substrate Requirements:</strong> Deck preparation standards</li>
                      <li>• <strong>Accessory Integration:</strong> Component compatibility charts</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/resources/technical/material-specs" 
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-4">
                  View Material Library
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Standards */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Cog className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">Installation Standards & Best Practices</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Industry-leading installation standards developed for Colorado's extreme conditions.</strong> Our protocols exceed 
                manufacturer requirements and establish benchmarks for quality, safety, and long-term performance.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quality Standards */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Control Standards</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Material Handling</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Proper storage and staging protocols</li>
                      <li>• Weather protection requirements</li>
                      <li>• Damage inspection procedures</li>
                      <li>• Temperature acclimatization standards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Installation Verification</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Multi-point inspection checkpoints</li>
                      <li>• Digital documentation requirements</li>
                      <li>• Performance testing protocols</li>
                      <li>• Quality assurance sign-off procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Safety Protocols */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Safety Protocols</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Fall Protection Systems</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• OSHA compliance verification</li>
                      <li>• Personal protective equipment standards</li>
                      <li>• Guardrail and safety line requirements</li>
                      <li>• Emergency response procedures</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">High-Altitude Procedures</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Altitude acclimatization protocols</li>
                      <li>• Enhanced safety equipment requirements</li>
                      <li>• Weather monitoring and response</li>
                      <li>• Emergency evacuation planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Performance Testing */}
              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Testing</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-teal-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Water Testing</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Spray testing methodology</li>
                      <li>• Static water testing procedures</li>
                      <li>• Dynamic water testing for wind-driven rain</li>
                      <li>• Leak detection and remediation protocols</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-teal-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Structural Verification</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Fastener pull-out testing</li>
                      <li>• Seam integrity verification</li>
                      <li>• Thermal movement accommodation</li>
                      <li>• Long-term performance monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/resources/technical/installation-standards" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Download Installation Standards
                <Download className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Code Compliance */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Scale className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Code Compliance & Regulatory Guidance</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Navigate Colorado's complex building code landscape with confidence.</strong> Our compliance guides ensure 
                projects meet all state, county, and municipal requirements while optimizing permit approval timelines.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* State & Local Codes */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Colorado Building Codes</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-red-100">
                      <h4 className="font-semibold text-gray-900 mb-2">International Building Code (IBC)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Chapter 15:</strong> Roof assemblies and rooftop structures</li>
                        <li>• <strong>Section 1504:</strong> Performance requirements</li>
                        <li>• <strong>Section 1507:</strong> Requirements for roof coverings</li>
                        <li>• <strong>Colorado Amendments:</strong> State-specific modifications</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-red-100">
                      <h4 className="font-semibold text-gray-900 mb-2">International Residential Code (IRC)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Chapter 9:</strong> Roof assemblies</li>
                        <li>• <strong>Section R905:</strong> Requirements for roof coverings</li>
                        <li>• <strong>Section R806:</strong> Roof ventilation</li>
                        <li>• <strong>Local Amendments:</strong> Municipal modifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Specialty Code Requirements</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Historic Districts</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Material authenticity requirements</li>
                        <li>• Design review board procedures</li>
                        <li>• Performance vs. appearance balancing</li>
                        <li>• Tax credit compliance documentation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Wildfire Interface Zones</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Class A fire rating requirements</li>
                        <li>• Ember-resistant construction details</li>
                        <li>• Defensible space coordination</li>
                        <li>• Insurance compliance verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permitting & Inspection */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Permitting Process</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Required Documentation</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Structural Calculations:</strong> Load analysis and design</li>
                        <li>• <strong>Material Specifications:</strong> Performance data sheets</li>
                        <li>• <strong>Installation Details:</strong> Technical drawings</li>
                        <li>• <strong>Energy Compliance:</strong> Code compliance reports</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Inspection Requirements</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Structural Inspection:</strong> Framing and attachment</li>
                        <li>• <strong>Underlayment Inspection:</strong> Membrane installation</li>
                        <li>• <strong>Final Inspection:</strong> Complete system verification</li>
                        <li>• <strong>Special Inspections:</strong> Seismic and wind requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Verification</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Testing Requirements</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Wind uplift testing certification</li>
                        <li>• Fire resistance testing documentation</li>
                        <li>• Impact resistance verification</li>
                        <li>• Water penetration testing reports</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Ongoing Compliance</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Annual inspection requirements</li>
                        <li>• Maintenance record keeping</li>
                        <li>• Performance monitoring protocols</li>
                        <li>• Warranty compliance documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/resources/technical/code-compliance" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Access Code Compliance Guides
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Access */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-100 to-slate-200 rounded-2xl p-8 border">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">Professional Resource Access</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>Technical resources require professional verification.</strong> Detailed engineering calculations, 
                  material specifications, and installation standards are available to licensed professionals and qualified contractors.
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Licensed Professional Engineers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Registered Architects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Licensed General Contractors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Certified Roofing Contractors</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">Professional Login Required</div>
                  <div className="text-sm text-gray-600">Verify credentials for technical resource access</div>
                </div>
                
                <Link href="/contact" 
                      className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                  Request Professional Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Technical Expertise?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Access Colorado's most comprehensive roofing technical library or consult with our 
            engineering team for project-specific guidance and compliance verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Consult Engineering Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/resources/technical/load-calculations" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white border border-blue-400 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
              Access Calculators
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            450+ Technical Documents • Professional Engineering • Code Compliance Verified
          </p>
        </div>
      </section>
    </div>
  );
}