import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CloudSnow, Sun, Wind, Droplets, AlertTriangle, Shield, Eye, Thermometer, Snowflake, Zap, Phone, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Weather Intelligence Center Colorado | Extreme Weather Roofing | Alpine Peak Roofing',
  description: 'Colorado\'s weather intelligence center for roofing. Seasonal impact analysis, extreme weather preparedness, emergency response. Expert storm damage assessment.',
  keywords: 'Colorado weather roofing, extreme weather roofing, storm damage roofing, hail damage Colorado, wind damage roofing, snow load roofing, weather preparedness',
  openGraph: {
    title: 'Weather Intelligence Center Colorado | Alpine Peak Roofing',
    description: 'Advanced weather intelligence and emergency preparedness for Colorado roofing systems',
    type: 'article',
  },
};

export default function WeatherIntelligenceCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CloudSnow className="w-4 h-4" />
              Weather Intelligence Authority
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Weather Intelligence Center
              <span className="block text-blue-600 text-2xl md:text-3xl mt-2">Extreme Weather Expertise & Emergency Response</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              <strong>Colorado's advanced weather intelligence and emergency response center</strong> providing seasonal impact analysis, 
              extreme weather preparedness, and rapid storm damage assessment for mountain and metro properties.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                24/7 Emergency Response
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                Advanced Weather Monitoring
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Proactive Protection Systems
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Response Stats */}
      <section className="py-12 px-4 bg-white/70 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Weather Response Excellence</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-red-600 mb-2">2,500+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Emergency Responses</div>
              <div className="text-xs text-gray-600">Storm damage assessments</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">4 Hours</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Average Response Time</div>
              <div className="text-xs text-gray-600">Emergency storm calls</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Damage Prevention</div>
              <div className="text-xs text-gray-600">Proactive system effectiveness</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,200+</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Weather Systems</div>
              <div className="text-xs text-gray-600">Snow & ice management installed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Seasonal Intelligence */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Eye className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Seasonal Weather Intelligence</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Colorado's extreme seasonal variations demand specialized roofing intelligence.</strong> Our weather monitoring and 
                response systems provide year-round protection through advanced forecasting, proactive maintenance, and rapid emergency response.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Spring Intelligence */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Spring Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Critical Spring Factors</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Snow Melt Impacts:</strong> Rapid temperature swings cause ice dam formation</li>
                      <li>• <strong>Thermal Shock:</strong> 60-80°F daily temperature variations stress materials</li>
                      <li>• <strong>Moisture Intrusion:</strong> Freeze-thaw cycles create leak pathways</li>
                      <li>• <strong>Drainage Overload:</strong> Heavy melt overwhelms gutters and downspouts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Spring Preparedness Actions</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Post-winter comprehensive roof inspection</li>
                      <li>• Ice dam damage assessment and repair</li>
                      <li>• Gutter cleaning and flow verification</li>
                      <li>• Sealant inspection and preventive maintenance</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/weather-impacts/spring" 
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-4">
                  Spring Weather Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Summer Intelligence */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-gray-900">Summer Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Critical Summer Factors</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>UV Degradation:</strong> 35-40% higher UV at mountain elevations</li>
                      <li>• <strong>Hail Threats:</strong> Colorado leads nation in hail damage claims</li>
                      <li>• <strong>Thermal Expansion:</strong> Materials expand/contract with temperature</li>
                      <li>• <strong>Thunderstorm Intensity:</strong> Severe micro-bursts and wind shear</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Summer Protection Strategies</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Hail-resistant material upgrades and assessments</li>
                      <li>• UV protection coating applications</li>
                      <li>• Thermal expansion joint maintenance</li>
                      <li>• Storm damage rapid response protocols</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/weather-impacts/summer" 
                      className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium mt-4">
                  Summer Weather Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Fall Intelligence */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wind className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Fall Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Critical Fall Factors</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Chinook Winds:</strong> 100+ mph gusts damage unprotected systems</li>
                      <li>• <strong>Temperature Drops:</strong> Sudden freezes stress materials</li>
                      <li>• <strong>Debris Accumulation:</strong> Leaves and organic matter clog drainage</li>
                      <li>• <strong>Early Snow:</strong> Unexpected loads stress unprepared structures</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Fall Preparation Protocols</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Winter readiness comprehensive inspections</li>
                      <li>• Heat cable system testing and repairs</li>
                      <li>• Gutter cleaning and debris removal</li>
                      <li>• Snow guard inspection and adjustment</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/weather-impacts/fall" 
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mt-4">
                  Fall Weather Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Winter Intelligence */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Winter Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Critical Winter Factors</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Snow Loads:</strong> 40-100+ psf structural loads in mountains</li>
                      <li>• <strong>Ice Dam Formation:</strong> Heat loss creates dangerous ice buildup</li>
                      <li>• <strong>Extreme Cold:</strong> -40°F temperatures cause material brittleness</li>
                      <li>• <strong>Access Limitations:</strong> Weather restricts emergency repairs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Winter Management Systems</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Snow load monitoring and removal protocols</li>
                      <li>• Heat cable activation and performance tracking</li>
                      <li>• Ice dam prevention and emergency response</li>
                      <li>• Emergency repair material staging</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/weather-impacts/winter" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4">
                  Winter Weather Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Extreme Weather Response */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Extreme Weather Event Response</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Colorado experiences some of the nation's most severe weather events.</strong> Our specialized response protocols 
                and emergency systems provide rapid assessment, damage mitigation, and restoration services when extreme weather strikes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Hail Damage Response */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl border">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-900">Hail Damage Response</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Rapid Assessment Protocol</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• On-site within 4-6 hours of storm passage</li>
                      <li>• Comprehensive damage documentation</li>
                      <li>• Emergency temporary protection installation</li>
                      <li>• Insurance coordination and claim support</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xl font-bold text-red-600">$8.5B</div>
                    <div className="text-xs text-red-700">Annual Colorado hail damage</div>
                  </div>
                </div>
              </div>

              {/* Wind Damage Assessment */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wind className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Wind Damage Assessment</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Specialized Evaluation</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• High-wind damage pattern analysis</li>
                      <li>• Structural integrity assessment</li>
                      <li>• Progressive failure risk evaluation</li>
                      <li>• Immediate stabilization measures</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xl font-bold text-blue-600">150+ mph</div>
                    <div className="text-xs text-blue-700">Recorded mountain wind gusts</div>
                  </div>
                </div>
              </div>

              {/* Snow Load Management */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-900">Snow Load Management</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-indigo-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Load Monitoring Systems</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Real-time snow load measurement</li>
                      <li>• Automated alert systems for overload</li>
                      <li>• Professional removal coordination</li>
                      <li>• Structural damage prevention protocols</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xl font-bold text-indigo-600">100+ psf</div>
                    <div className="text-xs text-indigo-700">Maximum mountain snow loads</div>
                  </div>
                </div>
              </div>

              {/* Flash Flood Impact */}
              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-bold text-gray-900">Flash Flood Impact</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-teal-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Water Damage Mitigation</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Rapid water extraction and drying</li>
                      <li>• Structural moisture assessment</li>
                      <li>• Mold prevention protocols</li>
                      <li>• Insurance documentation support</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="text-xl font-bold text-teal-600">6 inches</div>
                    <div className="text-xs text-teal-700">Hourly rainfall record Colorado</div>
                  </div>
                </div>
              </div>

              {/* Wildfire Ember Protection */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-900">Wildfire Protection</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Ember-Resistant Systems</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Class A fire-rated material selection</li>
                      <li>• Ember penetration point sealing</li>
                      <li>• Defensible space coordination</li>
                      <li>• Post-fire damage assessment</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xl font-bold text-orange-600">2,000°F</div>
                    <div className="text-xs text-orange-700">Wildfire ember temperature</div>
                  </div>
                </div>
              </div>

              {/* Emergency Coordination */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">24/7 Emergency Response</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Coordinated Response</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Direct hotline: (303) ROOF-911</li>
                      <li>• GPS-tracked rapid response teams</li>
                      <li>• Emergency material staging locations</li>
                      <li>• Multi-trade damage restoration</li>
                    </ul>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xl font-bold text-purple-600">4 hours</div>
                    <div className="text-xs text-purple-700">Average emergency response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proactive Weather Systems */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900">Proactive Weather Protection Systems</h2>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                <strong>Prevention is superior to reaction in Colorado's extreme weather.</strong> Our proactive systems prevent 95% of weather-related 
                damage through engineered solutions, advanced monitoring, and automated response protocols.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Snow Management Systems */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Engineered Snow Management</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Heat Cable Systems</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Self-regulating cables prevent ice dams</li>
                      <li>• Smart controls optimize energy usage</li>
                      <li>• Roof edge and gutter integration</li>
                      <li>• 15-year performance warranty</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Snow Guard Systems</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Prevent dangerous snow avalanches</li>
                      <li>• Custom engineered for roof geometry</li>
                      <li>• Tested for 200+ psf snow loads</li>
                      <li>• Minimal aesthetic impact design</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Storm Monitoring */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Advanced Storm Monitoring</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Weather Station Integration</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Real-time wind speed monitoring</li>
                      <li>• Hail size and impact detection</li>
                      <li>• Temperature and humidity tracking</li>
                      <li>• Automated alert system activation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Machine learning damage prediction</li>
                      <li>• Historical pattern analysis</li>
                      <li>• Proactive maintenance scheduling</li>
                      <li>• Risk assessment reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Preparedness */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Preparedness</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Response Protocols</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Pre-staged emergency materials</li>
                      <li>• Rapid response team deployment</li>
                      <li>• Temporary protection systems</li>
                      <li>• Insurance claim coordination</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Client Communication</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Automated weather alerts</li>
                      <li>• Pre-storm preparation checklists</li>
                      <li>• Post-storm damage reporting</li>
                      <li>• Priority service scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Protection ROI */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weather Protection Investment Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-green-600 mb-2">$8,500</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Average Storm Damage</div>
                  <div className="text-xs text-gray-600">Without protective systems</div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$2,200</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Protection System Cost</div>
                  <div className="text-xs text-gray-600">Comprehensive weather protection</div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-purple-600 mb-2">385%</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">First-Storm ROI</div>
                  <div className="text-xs text-gray-600">Single storm damage prevention</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Emergency CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-3xl font-bold">24/7 Storm Emergency Response</h2>
          </div>
          <p className="text-xl mb-8 text-red-100">
            When severe weather strikes, Alpine Peak Roofing responds immediately. 
            Professional storm damage assessment, emergency protection, and rapid restoration services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:303-ROOF-911" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Hotline: (303) ROOF-911
            </Link>
            <Link href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-500 text-white border border-red-400 rounded-lg font-semibold hover:bg-red-400 transition-colors">
              Schedule Storm Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <p className="text-sm text-red-200 mt-4">
            Average 4-Hour Response Time • 2,500+ Storm Responses • 95% Damage Prevention Rate
          </p>
        </div>
      </section>
    </div>
  );
}