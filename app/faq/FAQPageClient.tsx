'use client'

import React from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  importance: 'essential' | 'important' | 'specialized'
  relatedTerms?: string[]
}

const faqData: FAQItem[] = [
  // Company Expertise & Services
  {
    id: 'company-1',
    category: 'Company Expertise',
    question: 'What makes Alpine Peak Roofing different from other Colorado roofing contractors?',
    answer: 'Alpine Peak Roofing specializes exclusively in high-altitude, premium mountain roofing for Colorado\'s most exclusive communities including Aspen, Vail, Telluride, and Crested Butte. We combine decades of mountain-specific expertise with sustainable practices, investment-grade materials, and 24/7 emergency response. Our "Pinnacle of Protection, Peak of Performance" approach ensures your roof withstands extreme mountain weather while maintaining the highest aesthetic standards.',
    importance: 'essential',
    relatedTerms: ['high-altitude roofing', 'premium materials', 'mountain communities']
  },
  {
    id: 'company-2', 
    category: 'Company Expertise',
    question: 'Which Colorado mountain communities do you serve?',
    answer: 'We serve all major Colorado mountain communities including Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, Winter Park, Keystone, Breckenridge, Copper Mountain, and surrounding areas. Our expertise extends throughout the Front Range, Western Slope, and central mountain regions, with specialized knowledge of each area\'s unique weather patterns, building codes, and architectural requirements.',
    importance: 'essential',
    relatedTerms: ['service areas', 'mountain communities', 'Colorado roofing']
  },
  {
    id: 'company-3',
    category: 'Company Expertise', 
    question: 'Are you licensed and insured for work in Colorado mountain communities?',
    answer: 'Yes, Alpine Peak Roofing is fully licensed, bonded, and insured with comprehensive coverage specifically for high-altitude work. We maintain all required state and local licenses, carry extensive liability insurance, and are certified for historic preservation work. Our team is trained in mountain-specific safety protocols and OSHA compliance for extreme weather conditions.',
    importance: 'essential',
    relatedTerms: ['licensing', 'insurance', 'safety protocols']
  },

  // High-Altitude Roofing Challenges
  {
    id: 'altitude-1',
    category: 'High-Altitude Roofing',
    question: 'What are the biggest challenges of roofing at high altitude in Colorado?',
    answer: 'High-altitude roofing faces unique challenges including extreme temperature fluctuations (-30°F to 90°F), intense UV exposure (40% stronger than sea level), hurricane-force winds up to 200+ mph, snow loads exceeding 150 lbs/sq ft, and rapid weather changes. Materials must withstand freeze-thaw cycles, UV degradation, and extreme thermal expansion. Our specialized techniques and premium materials are engineered specifically for these harsh mountain conditions.',
    importance: 'essential',
    relatedTerms: ['extreme weather', 'snow load', 'UV exposure', 'temperature fluctuations']
  },
  {
    id: 'altitude-2',
    category: 'High-Altitude Roofing',
    question: 'How do you handle the extreme wind conditions in Colorado mountains?',
    answer: 'Mountain winds can exceed 200 mph during chinook events and winter storms. We use enhanced fastening systems with 40% more attachment points than standard installations, specialized wind-resistant materials, and aerodynamic design principles. Our installations include reinforced edge details, impact-resistant materials, and uplift-rated systems tested for extreme wind zones. Every project includes wind load calculations specific to local topography.',
    importance: 'important',
    relatedTerms: ['wind resistance', 'fastening systems', 'chinook winds']
  },
  {
    id: 'altitude-3',
    category: 'High-Altitude Roofing',
    question: 'What snow load considerations are important for mountain roofs?',
    answer: 'Colorado mountain roofs must handle snow loads from 50-200+ lbs/sq ft depending on elevation and location. We calculate loads based on local climate data, roof pitch, and snow drift patterns. Critical considerations include structural support, ice dam prevention, proper insulation, ventilation design, and emergency snow removal protocols. Our designs prevent ice damming while ensuring safe snow shedding patterns.',
    importance: 'essential',
    relatedTerms: ['snow load calculations', 'ice dam prevention', 'structural support']
  },

  // Weather & Climate Solutions  
  {
    id: 'weather-1',
    category: 'Weather & Climate',
    question: 'How do you protect against ice dams in Colorado mountain homes?',
    answer: 'Ice dam prevention requires a comprehensive approach: proper insulation (R-60+ in mountain climates), strategic ventilation systems, heated cables in critical areas, and specialized membrane systems. We install continuous ridge and soffit ventilation, vapor barriers, and thermal breaks. Our designs ensure consistent roof temperatures and proper snow shedding while maintaining energy efficiency standards.',
    importance: 'essential',
    relatedTerms: ['ice dam prevention', 'ventilation systems', 'insulation requirements']
  },
  {
    id: 'weather-2',
    category: 'Weather & Climate',
    question: 'What happens during hailstorms in the Colorado mountains?',
    answer: 'Mountain hailstorms can produce golf ball to tennis ball-sized hail with devastating impact. We use Class 4 impact-resistant materials as standard, install reinforced underlayments, and design systems to resist hail damage. Our emergency response team can deploy within 2-4 hours after severe weather, providing temporary protection while assessing damage and coordinating with insurance adjusters.',
    importance: 'important',
    relatedTerms: ['hail resistance', 'emergency response', 'impact resistant materials']
  },
  {
    id: 'weather-3',
    category: 'Weather & Climate',
    question: 'How do temperature extremes affect roofing materials in Colorado?',
    answer: 'Colorado mountain temperatures can swing 80-100°F in a single day, causing extreme thermal expansion and contraction. We select materials with superior thermal stability, use expansion joints, flexible fastening systems, and thermal breaks. Premium materials like copper, slate, and specialized synthetic products handle these extremes better than standard asphalt shingles, which can crack and fail in mountain conditions.',
    importance: 'important',
    relatedTerms: ['thermal expansion', 'temperature extremes', 'material selection']
  },

  // Materials & Installation
  {
    id: 'materials-1',
    category: 'Materials & Installation',
    question: 'What roofing materials work best in Colorado mountain climates?',
    answer: 'Premium materials excel in mountain conditions: Copper develops protective patina and lasts 100+ years; natural slate provides superior durability and freeze-thaw resistance; high-grade steel roofing offers wind resistance and snow shedding; synthetic slate and composite materials combine durability with lighter weight. We avoid standard asphalt shingles, which typically fail within 10-15 years in mountain conditions.',
    importance: 'essential',
    relatedTerms: ['copper roofing', 'slate roofing', 'premium materials', 'material longevity']
  },
  {
    id: 'materials-2',
    category: 'Materials & Installation',
    question: 'Why is copper roofing recommended for mountain homes?',
    answer: 'Copper is the gold standard for mountain roofing due to its exceptional durability (100+ year lifespan), natural antimicrobial properties, superior snow shedding, and beautiful patina development. It withstands extreme temperature cycles, resists UV damage, requires minimal maintenance, and adds significant property value. While the initial investment is higher, the lifecycle cost is often lower than replacement roofing systems.',
    importance: 'important',
    relatedTerms: ['copper benefits', 'patina development', 'lifecycle costs']
  },
  {
    id: 'materials-3',
    category: 'Materials & Installation',
    question: 'How long does installation take in mountain conditions?',
    answer: 'Mountain installations typically take 20-40% longer than standard projects due to weather windows, access challenges, and specialized techniques. A typical residential project takes 5-10 days depending on size and complexity, while commercial projects can take several weeks. We schedule around optimal weather conditions, maintain heated staging areas for materials, and use specialized equipment designed for high-altitude work.',
    importance: 'important',
    relatedTerms: ['installation timeline', 'weather windows', 'mountain logistics']
  },

  // Emergency Services
  {
    id: 'emergency-1',
    category: 'Emergency Services',
    question: 'What constitutes a roofing emergency in Colorado mountains?',
    answer: 'Mountain roofing emergencies include: severe storm damage with active leaks, structural damage from snow load or wind, ice dam flooding, heating system failures in winter, and damage threatening historic structures. Our 24/7 emergency team responds within 2-4 hours with temporary protection, structural assessment, and coordination with insurance adjusters. We maintain emergency supplies and equipment year-round.',
    importance: 'essential',
    relatedTerms: ['emergency response', 'storm damage', 'structural assessment']
  },
  {
    id: 'emergency-2',
    category: 'Emergency Services', 
    question: 'How quickly can you respond to emergencies in remote mountain locations?',
    answer: 'Response times vary by location and conditions: Aspen/Vail area (2-3 hours), Telluride/Crested Butte (3-4 hours), remote locations (4-8 hours depending on road conditions). We maintain strategically located emergency supplies, specialized mountain vehicles, and coordinate with local contractors when immediate temporary protection is needed. Severe weather may extend response times for safety reasons.',
    importance: 'important',
    relatedTerms: ['response times', 'remote locations', 'emergency logistics']
  },
  {
    id: 'emergency-3',
    category: 'Emergency Services',
    question: 'Do you work during Colorado winter months?',
    answer: 'Yes, we provide year-round service with specialized winter protocols. Emergency repairs are performed regardless of weather using heated work areas, specialized materials, and safety equipment. New installations are scheduled during optimal weather windows (typically April-October), though emergency situations may require winter work. We maintain heated material storage and use cold-weather installation techniques when necessary.',
    importance: 'important',
    relatedTerms: ['winter work', 'seasonal scheduling', 'cold weather techniques']
  },

  // Pricing & Investment
  {
    id: 'pricing-1',
    category: 'Pricing & Investment',
    question: 'What is the typical cost range for mountain roofing projects?',
    answer: 'Mountain roofing investments typically range from $25,000-$150,000+ for residential projects, depending on size, materials, and complexity. Premium copper installations may range $30-50 per sq ft, while high-grade synthetic materials range $15-25 per sq ft. Commercial projects vary widely based on scope. Mountain projects cost 20-40% more than standard installations due to specialized materials, logistics, and installation requirements.',
    importance: 'essential',
    relatedTerms: ['project costs', 'premium materials', 'mountain premium']
  },
  {
    id: 'pricing-2',
    category: 'Pricing & Investment',
    question: 'Why do mountain roofing projects cost more than standard installations?',
    answer: 'Mountain projects require specialized materials rated for extreme conditions, additional labor for enhanced installation techniques, logistical challenges in remote locations, weather-related delays, specialized equipment and safety gear, and compliance with strict building codes. The investment ensures superior performance in harsh conditions and often provides better lifecycle value than cheaper alternatives that fail prematurely.',
    importance: 'important',
    relatedTerms: ['cost factors', 'specialized requirements', 'lifecycle value']
  },
  {
    id: 'pricing-3',
    category: 'Pricing & Investment',
    question: 'Do you offer financing options for large mountain roofing projects?',
    answer: 'Yes, we offer comprehensive financing solutions including extended payment plans, seasonal payment structures accommodating rental income cycles, coordination with construction loans, and insurance claim assistance. We work with specialized lenders familiar with mountain property investments and can structure payments around your financial timeline. Many clients find tax advantages and property value increases offset the investment.',
    importance: 'important',
    relatedTerms: ['financing options', 'payment plans', 'insurance coordination']
  },

  // Sustainability & Environmental
  {
    id: 'sustainability-1',
    category: 'Sustainability',
    question: 'What sustainable roofing options do you offer for mountain homes?',
    answer: 'Our sustainable solutions include solar-ready installations with optimal panel integration, cool roofing systems reducing energy consumption, recycled and recyclable materials, rainwater harvesting systems, green roof components where appropriate, and energy-efficient ventilation systems. We prioritize materials with low environmental impact, long lifecycles, and end-of-life recyclability while maintaining performance in mountain conditions.',
    importance: 'important',
    relatedTerms: ['sustainable materials', 'solar integration', 'energy efficiency']
  },
  {
    id: 'sustainability-2', 
    category: 'Sustainability',
    question: 'How do you minimize environmental impact during mountain installations?',
    answer: 'We implement comprehensive environmental protection including erosion control on steep terrain, wildlife habitat protection, minimal vegetation disturbance, material waste recycling programs, fuel-efficient equipment, and restoration of disturbed areas. Our crews are trained in Leave No Trace principles and coordinate with environmental consultants when working near sensitive areas or water sources.',
    importance: 'important',
    relatedTerms: ['environmental protection', 'erosion control', 'habitat conservation']
  }
]

const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]

export function FAQPageClient() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.relatedTerms?.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200'
      case 'important': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'specialized': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-text-primary">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Expert answers to your mountain roofing questions. Our comprehensive FAQ covers everything from high-altitude challenges to premium material selection, helping you make informed decisions for your Colorado mountain property.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search questions, answers, or related terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border-primary rounded-lg focus:ring-2 focus:ring-interactive-primary focus:border-transparent text-text-primary bg-background-primary"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-interactive-primary text-white'
                    : 'bg-background-primary text-text-secondary border border-border-primary hover:bg-background-tertiary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing {filteredFAQ.length} of {faqData.length} questions
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">
                No questions match your search criteria. Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          ) : (
            filteredFAQ.map((item) => (
              <div
                key={item.id}
                className="bg-background-primary border border-border-primary rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-background-tertiary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getImportanceColor(item.importance)}`}>
                        {item.importance}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {item.question}
                    </h3>
                  </div>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-text-secondary flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text-secondary flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <div className="pt-4 border-t border-border-primary">
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {item.answer}
                      </p>
                      {item.relatedTerms && (
                        <div>
                          <p className="text-sm font-medium text-text-primary mb-2">Related Terms:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedTerms.map((term, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-background-secondary text-text-secondary text-xs rounded border border-border-primary"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-background-primary border border-border-primary rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">
            Didn't Find Your Answer?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Our mountain roofing specialists are here to help. Contact us for personalized answers about your specific project, location, or technical requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-interactive-primary text-white rounded-lg hover:bg-interactive-primary/90 transition-colors">
              Get Expert Consultation
            </button>
            <button className="px-6 py-3 border border-border-primary text-text-primary rounded-lg hover:bg-background-tertiary transition-colors">
              Call (303) 555-PEAK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}