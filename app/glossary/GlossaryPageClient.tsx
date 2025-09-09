'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Book,
  Mountain,
  Snowflake,
  Hammer,
  Leaf,
  Shield,
  Zap,
  Home,
  Settings
} from 'lucide-react'

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: string
  relatedTerms: string[]
  importance: 'essential' | 'important' | 'specialized'
  mountainSpecific: boolean
  synonyms?: string[]
  context?: string
}

const glossaryCategories = [
  { name: 'Materials', icon: <Hammer className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Installation', icon: <Settings className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
  { name: 'Mountain Roofing', icon: <Mountain className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' },
  { name: 'Weather Systems', icon: <Snowflake className="h-4 w-4" />, color: 'bg-cyan-100 text-cyan-800' },
  { name: 'Structural', icon: <Home className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Sustainability', icon: <Leaf className="h-4 w-4" />, color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Safety', icon: <Shield className="h-4 w-4" />, color: 'bg-red-100 text-red-800' },
  { name: 'Technology', icon: <Zap className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' },
]

const glossaryTerms: GlossaryTerm[] = [
  // Materials (15 terms)
  {
    id: 'standing-seam',
    term: 'Standing Seam',
    definition: 'A metal roofing system where adjacent panels are mechanically joined with raised vertical seams. The concealed fastening system provides superior weather protection and thermal expansion accommodation, making it ideal for mountain climates with extreme temperature variations.',
    category: 'Materials',
    relatedTerms: ['Metal Roofing', 'Thermal Expansion', 'Concealed Fastening'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Standing Seam Metal', 'Vertical Seam Roofing'],
    context: 'Premium roofing system preferred for high-altitude applications due to durability and weather resistance.'
  },
  {
    id: 'copper-patina',
    term: 'Copper Patina',
    definition: 'The protective greenish layer that naturally forms on copper roofing through oxidation over 15-20 years. This patina provides superior UV protection, antimicrobial properties, and corrosion resistance, making copper ideal for mountain environments with intense UV exposure.',
    category: 'Materials',
    relatedTerms: ['Copper Roofing', 'UV Protection', 'Corrosion Resistance'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Verdigris', 'Copper Oxidation'],
    context: 'Natural protective coating that enhances copper performance in high-altitude conditions.'
  },
  {
    id: 'welsh-slate',
    term: 'Welsh Slate',
    definition: 'Premium natural slate quarried in Wales, known for its exceptional durability, low water absorption (less than 0.4%), and proven performance in extreme climates. Welsh slate offers 100+ year lifespan and superior freeze-thaw resistance for mountain applications.',
    category: 'Materials',
    relatedTerms: ['Natural Slate', 'Freeze-Thaw Resistance', 'Premium Materials'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Penrhyn Slate', 'Bangor Blue Slate'],
    context: 'The gold standard for luxury mountain roofing with unmatched longevity.'
  },
  {
    id: 'class-4-shingles',
    term: 'Class 4 Impact Resistance',
    definition: 'The highest UL 2218 impact resistance rating for roofing materials, tested to withstand 2-inch diameter steel balls dropped from 20 feet. Essential for Colorado hail protection, Class 4 materials often qualify for insurance discounts and extended warranties.',
    category: 'Materials',
    relatedTerms: ['Hail Protection', 'UL 2218', 'Impact Testing'],
    importance: 'essential',
    mountainSpecific: false,
    synonyms: ['Impact Resistant Shingles', 'Hail Resistant Materials'],
    context: 'Critical specification for Colorado roofing due to frequent severe hail storms.'
  },
  {
    id: 'synthetic-underlayment',
    term: 'Synthetic Underlayment',
    definition: 'Advanced non-woven polypropylene or polyethylene membrane that replaces traditional felt paper. Provides superior tear resistance, UV stability, and moisture protection. Lightweight design reduces thermal bridging and improves installation efficiency in mountain conditions.',
    category: 'Materials',
    relatedTerms: ['Moisture Barrier', 'UV Stability', 'Thermal Bridging'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Synthetic Felt', 'Polymer Underlayment'],
    context: 'Modern underlayment technology designed for extreme weather conditions.'
  },
  {
    id: 'ice-water-shield',
    term: 'Ice and Water Shield',
    definition: 'Self-adhering waterproof membrane installed in vulnerable areas like eaves, valleys, and penetrations. Features rubberized asphalt backing that seals around fasteners, providing critical protection against ice dam water intrusion in mountain climates.',
    category: 'Materials',
    relatedTerms: ['Ice Dam Protection', 'Waterproof Membrane', 'Self-Adhering'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Peel and Stick', 'Self-Sealing Membrane'],
    context: 'Essential component for ice dam prevention in snow-prone mountain areas.'
  },
  {
    id: 'sbs-membrane',
    term: 'SBS Modified Bitumen',
    definition: 'Styrene-Butadiene-Styrene polymer-modified asphalt membrane with enhanced flexibility and temperature resistance. Superior performance in thermal cycling conditions, making it ideal for mountain climates with extreme temperature variations (-40°F to 160°F).',
    category: 'Materials',
    relatedTerms: ['Modified Bitumen', 'Thermal Cycling', 'Polymer Technology'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Rubberized Membrane', 'Polymer Modified Asphalt'],
    context: 'Advanced membrane technology for extreme temperature environments.'
  },
  {
    id: 'tpo-membrane',
    term: 'TPO (Thermoplastic Polyolefin)',
    definition: 'Single-ply roofing membrane combining polypropylene and ethylene-propylene polymers. Offers excellent UV resistance, energy efficiency through heat reflection, and superior weld strength. Popular for commercial applications requiring cool roofing performance.',
    category: 'Materials',
    relatedTerms: ['Single-Ply Membrane', 'Cool Roofing', 'Heat Welded Seams'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Thermoplastic Membrane', 'Single-Ply TPO'],
    context: 'Energy-efficient commercial roofing solution with excellent UV resistance.'
  },
  {
    id: 'cedar-shakes',
    term: 'Fire-Treated Cedar Shakes',
    definition: 'Sustainably harvested cedar shingles treated with fire-retardant chemicals to achieve Class A fire rating. Pressure-impregnated treatment penetrates wood fibers while maintaining natural beauty and insulation properties essential for mountain homes in WUI zones.',
    category: 'Materials',
    relatedTerms: ['Fire Retardant', 'WUI Compliance', 'Sustainable Materials'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Treated Wood Shingles', 'Fire-Safe Cedar'],
    context: 'Natural roofing material meeting wildfire protection requirements for mountain communities.'
  },
  {
    id: 'cool-roofing',
    term: 'Cool Roofing Technology',
    definition: 'Roofing materials engineered to reflect more sunlight and absorb less heat than standard products. Features special pigments and surface treatments achieving high Solar Reflectance Index (SRI) values, reducing energy costs and urban heat island effects.',
    category: 'Materials',
    relatedTerms: ['Solar Reflectance', 'Energy Efficiency', 'SRI Rating'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Reflective Roofing', 'Energy Star Roofing'],
    context: 'Sustainable technology for reducing building energy consumption and environmental impact.'
  },

  // Installation (20 terms)
  {
    id: 'thermal-expansion-joint',
    term: 'Thermal Expansion Joint',
    definition: 'Engineered gap or flexible connection designed to accommodate thermal movement in roofing materials. Critical for mountain installations where daily temperature swings of 40-60°F can cause significant expansion and contraction in materials.',
    category: 'Installation',
    relatedTerms: ['Thermal Movement', 'Expansion Joint', 'Temperature Cycling'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Movement Joint', 'Expansion Gap'],
    context: 'Essential design element for managing thermal stress in mountain roofing systems.'
  },
  {
    id: 'concealed-fastening',
    term: 'Concealed Fastening System',
    definition: 'Installation method where fasteners are hidden beneath overlapping materials or within seams, preventing water infiltration and wind uplift. Provides superior weather protection and aesthetic appeal while accommodating thermal movement.',
    category: 'Installation',
    relatedTerms: ['Standing Seam', 'Weather Protection', 'Wind Uplift'],
    importance: 'essential',
    mountainSpecific: false,
    synonyms: ['Hidden Fasteners', 'Clip System'],
    context: 'Premium installation technique providing superior performance and appearance.'
  },
  {
    id: 'wind-uplift-resistance',
    term: 'Wind Uplift Resistance',
    definition: 'A roofing system\'s ability to resist wind forces that create negative pressure and attempt to lift materials from the structure. Measured in pounds per square foot (psf), with mountain installations requiring 130+ mph wind resistance ratings.',
    category: 'Installation',
    relatedTerms: ['Wind Load', 'Negative Pressure', 'Fastening Systems'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Wind Resistance', 'Uplift Rating'],
    context: 'Critical performance metric for mountain roofing exposed to extreme wind conditions.'
  },
  {
    id: 'mechanically-attached',
    term: 'Mechanically Attached System',
    definition: 'Installation method using screws, plates, or fasteners to secure roofing materials directly to the deck. Provides positive attachment and pull-out resistance essential for high-wind mountain environments, contrasting with adhered systems.',
    category: 'Installation',
    relatedTerms: ['Fastener Systems', 'Pull-Out Resistance', 'Deck Attachment'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Fastened System', 'Screw-Down Installation'],
    context: 'Preferred attachment method for extreme wind conditions and steep slopes.'
  },
  {
    id: 'flashing-soldering',
    term: 'Soldered Flashing Joints',
    definition: 'Traditional metalworking technique using lead-tin solder to create permanent, watertight connections in copper or lead-coated copper flashing. Provides superior longevity and weather resistance compared to mechanical connections or sealants.',
    category: 'Installation',
    relatedTerms: ['Copper Flashing', 'Watertight Seals', 'Traditional Craftsmanship'],
    importance: 'specialized',
    mountainSpecific: false,
    synonyms: ['Lead-Soldered Joints', 'Traditional Soldering'],
    context: 'Time-tested technique for creating permanent, maintenance-free flashing connections.'
  },
  {
    id: 'snow-guards',
    term: 'Snow Guard Systems',
    definition: 'Devices installed on roofs to control snow sliding and prevent dangerous avalanches. Types include pad-style, rail systems, and fence designs. Essential for mountain roofing to protect gutters, landscaping, and pedestrians from sudden snow releases.',
    category: 'Installation',
    relatedTerms: ['Snow Management', 'Avalanche Prevention', 'Snow Load'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Snow Stops', 'Snow Retention Systems'],
    context: 'Critical safety feature for mountain homes with metal or smooth roofing materials.'
  },
  {
    id: 'heat-cables',
    term: 'Heat Cable Systems',
    definition: 'Electric heating elements installed along roof edges and gutters to prevent ice dam formation. Self-regulating cables adjust output based on temperature, providing efficient ice and snow melting in critical areas.',
    category: 'Installation',
    relatedTerms: ['Ice Dam Prevention', 'Self-Regulating Cables', 'Electric Heating'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Roof De-Icing Cables', 'Heating Cables'],
    context: 'Essential system for preventing ice dam damage in snow-prone mountain areas.'
  },
  {
    id: 'balanced-ventilation',
    term: 'Balanced Ventilation System',
    definition: 'Coordinated intake and exhaust ventilation maintaining proper air circulation through attic spaces. Ratio of 1:300 ventilation to attic floor area, with 50% intake (soffit) and 50% exhaust (ridge) vents for optimal performance.',
    category: 'Installation',
    relatedTerms: ['Attic Ventilation', 'Intake Vents', 'Exhaust Vents'],
    importance: 'essential',
    mountainSpecific: false,
    synonyms: ['Proper Ventilation', 'Air Circulation System'],
    context: 'Critical system for preventing ice dams, moisture problems, and extending roof life.'
  },
  {
    id: 'structural-analysis',
    term: 'Structural Load Analysis',
    definition: 'Engineering evaluation of a roof structure\'s ability to support dead loads (materials), live loads (snow), and wind loads. Mountain installations require analysis for snow loads up to 300+ lbs/sq ft and wind speeds exceeding 130 mph.',
    category: 'Installation',
    relatedTerms: ['Snow Load', 'Wind Load', 'Structural Engineering'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Load Calculations', 'Structural Assessment'],
    context: 'Required engineering analysis for mountain roofing installations and upgrades.'
  },
  {
    id: 'custom-fabrication',
    term: 'Custom Metal Fabrication',
    definition: 'On-site or shop fabrication of metal roofing components, flashings, and trim pieces to match specific architectural requirements. Uses specialized tools like brake forming, rolling, and welding to create precise, weatherproof installations.',
    category: 'Installation',
    relatedTerms: ['Metal Forming', 'Architectural Details', 'Precision Fitting'],
    importance: 'specialized',
    mountainSpecific: false,
    synonyms: ['Metal Forming', 'Custom Metalwork'],
    context: 'Specialized craftsmanship for complex architectural details and unique roof geometries.'
  },

  // Mountain Roofing (18 terms)
  {
    id: 'high-altitude-effects',
    term: 'High-Altitude Effects',
    definition: 'Environmental challenges specific to elevations above 8,000 feet including reduced atmospheric pressure, increased UV intensity (10-12% per 1,000 ft), rapid temperature cycling, and physiological impacts on workers requiring specialized protocols.',
    category: 'Mountain Roofing',
    relatedTerms: ['UV Intensity', 'Atmospheric Pressure', 'Worker Safety'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Elevation Effects', 'Altitude Challenges'],
    context: 'Fundamental considerations for all high-altitude roofing projects and worker safety.'
  },
  {
    id: 'wind-shear-patterns',
    term: 'Mountain Wind Shear',
    definition: 'Sudden changes in wind speed and direction caused by mountain topography, creating localized high-wind zones and turbulence. Can exceed 150+ mph in mountain gaps and ridges, requiring enhanced fastening and structural considerations.',
    category: 'Mountain Roofing',
    relatedTerms: ['Wind Patterns', 'Topographic Effects', 'Enhanced Fastening'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Orographic Winds', 'Mountain Turbulence'],
    context: 'Critical factor in designing wind-resistant roofing systems for mountain locations.'
  },
  {
    id: 'snow-load-zones',
    term: 'Snow Load Zones',
    definition: 'Geographic regions classified by maximum expected snow accumulation measured in pounds per square foot. Colorado mountain zones range from 30 psf (5,000 ft) to 300+ psf (above 10,000 ft), determining structural requirements.',
    category: 'Mountain Roofing',
    relatedTerms: ['Structural Design', 'Building Codes', 'Snow Accumulation'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Ground Snow Load', 'Design Snow Load'],
    context: 'Building code requirement determining structural capacity for mountain construction.'
  },
  {
    id: 'freeze-thaw-cycles',
    term: 'Freeze-Thaw Cycling',
    definition: 'Repeated freezing and thawing of water in materials and joints, causing expansion forces up to 9% volume increase. Mountain areas experience 100+ cycles annually, requiring materials and installation techniques designed for thermal movement.',
    category: 'Mountain Roofing',
    relatedTerms: ['Thermal Movement', 'Material Durability', 'Joint Design'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Frost Action', 'Temperature Cycling'],
    context: 'Primary weathering force affecting material selection and installation details in mountain climates.'
  },
  {
    id: 'aspect-orientation',
    term: 'Roof Aspect and Orientation',
    definition: 'The directional facing of roof slopes affecting solar heat gain, snow accumulation patterns, and wind exposure. South-facing slopes receive maximum solar exposure, while north-facing slopes retain snow longer, influencing material selection and snow management.',
    category: 'Mountain Roofing',
    relatedTerms: ['Solar Exposure', 'Snow Retention', 'Thermal Performance'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Roof Orientation', 'Slope Direction'],
    context: 'Design consideration affecting thermal performance and snow management strategies.'
  },
  {
    id: 'altitude-acclimatization',
    term: 'Altitude Acclimatization',
    definition: 'Physiological adaptation process allowing workers to perform safely at high elevations. Includes staged ascent protocols, hydration management, oxygen support above 10,000 feet, and recognition of altitude sickness symptoms.',
    category: 'Mountain Roofing',
    relatedTerms: ['Worker Safety', 'Oxygen Support', 'Health Monitoring'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Altitude Adaptation', 'High-Altitude Safety'],
    context: 'Critical safety protocol for crew health and performance on high-altitude projects.'
  },
  {
    id: 'weather-windows',
    term: 'Mountain Weather Windows',
    definition: 'Optimal periods for roofing installation based on local weather patterns, seasonal conditions, and forecast accuracy. Mountain weather changes rapidly, requiring flexible scheduling and emergency preparedness protocols.',
    category: 'Mountain Roofing',
    relatedTerms: ['Project Scheduling', 'Weather Forecasting', 'Installation Planning'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Installation Windows', 'Work Weather'],
    context: 'Critical planning consideration for successful mountain roofing project completion.'
  },
  {
    id: 'helicopter-delivery',
    term: 'Helicopter Material Delivery',
    definition: 'Specialized logistics method for transporting materials to inaccessible mountain locations using external sling loads. Requires coordination with aviation authorities, weight calculations, and specialized rigging equipment.',
    category: 'Mountain Roofing',
    relatedTerms: ['Remote Access', 'Logistics Planning', 'Aviation Coordination'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Heli-Lift', 'Aerial Delivery'],
    context: 'Specialized delivery method for remote mountain properties with limited ground access.'
  },
  {
    id: 'mountain-building-codes',
    term: 'Mountain Building Codes',
    definition: 'Specialized construction requirements for high-elevation locations addressing snow loads, wind speeds, seismic activity, and fire safety. Vary by jurisdiction and elevation, with stricter requirements above 8,000 feet.',
    category: 'Mountain Roofing',
    relatedTerms: ['Building Standards', 'Code Compliance', 'Elevation Requirements'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['High-Altitude Codes', 'Elevation Codes'],
    context: 'Regulatory framework governing mountain construction safety and performance standards.'
  },
  {
    id: 'wildland-urban-interface',
    term: 'Wildland-Urban Interface (WUI)',
    definition: 'Areas where residential development meets wildland vegetation, requiring Class A fire-rated roofing materials, ember-resistant venting, and defensible space compliance. Critical for mountain community fire safety.',
    category: 'Mountain Roofing',
    relatedTerms: ['Fire Safety', 'Ember Resistance', 'Defensible Space'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Fire Interface Zone', 'WUI Area'],
    context: 'Fire safety designation requiring specific roofing materials and installation practices.'
  },

  // Weather Systems (12 terms)
  {
    id: 'ice-dam-formation',
    term: 'Ice Dam Formation',
    definition: 'Process where melted snow refreezes at roof edges, creating barriers that cause water backup under roofing materials. Caused by heat loss through inadequate insulation, improper ventilation, and temperature differentials between roof zones.',
    category: 'Weather Systems',
    relatedTerms: ['Heat Loss', 'Roof Ventilation', 'Insulation'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Ice Backup', 'Roof Ice Dams'],
    context: 'Common winter problem requiring comprehensive prevention strategies in snow-prone areas.'
  },
  {
    id: 'hail-impact-dynamics',
    term: 'Hail Impact Dynamics',
    definition: 'Physics of hailstone impacts including kinetic energy transfer, impact velocity calculations, and material response characteristics. Colorado hail reaches 2+ inches diameter with terminal velocities exceeding 100 mph, requiring impact-resistant materials.',
    category: 'Weather Systems',
    relatedTerms: ['Impact Energy', 'Terminal Velocity', 'Material Testing'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Hail Physics', 'Impact Mechanics'],
    context: 'Scientific basis for understanding hail damage and selecting appropriate protection materials.'
  },
  {
    id: 'lightning-protection',
    term: 'Lightning Protection System',
    definition: 'Engineered system using air terminals, conductors, and grounding to safely channel lightning strikes to earth. UL 96A compliant systems essential for mountain properties with high lightning exposure and metal roofing materials.',
    category: 'Weather Systems',
    relatedTerms: ['Grounding System', 'UL 96A', 'Surge Protection'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Lightning Rods', 'Strike Protection'],
    context: 'Critical safety system for mountain properties with high lightning strike probability.'
  },
  {
    id: 'monsoon-intensity',
    term: 'Monsoon Rainfall Intensity',
    definition: 'Measurement of precipitation rate during Colorado monsoon season, often exceeding 4 inches per hour in localized areas. Creates flash flooding conditions requiring enhanced drainage systems and rapid runoff management.',
    category: 'Weather Systems',
    relatedTerms: ['Drainage Design', 'Flash Flooding', 'Runoff Management'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Rainfall Rate', 'Precipitation Intensity'],
    context: 'Design parameter for sizing drainage systems and preventing water damage during intense storms.'
  },
  {
    id: 'thermal-bridging',
    term: 'Thermal Bridging',
    definition: 'Heat transfer pathway through conductive materials that bypasses insulation, creating energy loss and potential condensation points. Common in metal fasteners, structural members, and poorly designed insulation systems.',
    category: 'Weather Systems',
    relatedTerms: ['Heat Transfer', 'Insulation Design', 'Energy Efficiency'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Heat Bridge', 'Thermal Bypass'],
    context: 'Energy efficiency concern requiring careful design to minimize heat loss and condensation risk.'
  },
  {
    id: 'wind-driven-rain',
    term: 'Wind-Driven Rain',
    definition: 'Precipitation forced horizontally by wind, creating unique penetration challenges for roofing systems. Mountain environments experience extreme wind-driven rain requiring enhanced weatherproofing and drainage design.',
    category: 'Weather Systems',
    relatedTerms: ['Weather Resistance', 'Water Penetration', 'Drainage Systems'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Driving Rain', 'Horizontal Precipitation'],
    context: 'Weather challenge requiring specialized design strategies for complete weather protection.'
  },

  // Structural (10 terms)
  {
    id: 'load-path-analysis',
    term: 'Load Path Analysis',
    definition: 'Engineering study tracing how forces transfer through structural elements from roof to foundation. Critical for mountain applications where snow loads, wind forces, and seismic activity create complex loading conditions requiring clear transfer mechanisms.',
    category: 'Structural',
    relatedTerms: ['Force Transfer', 'Structural Engineering', 'Load Distribution'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Force Path', 'Load Transfer Analysis'],
    context: 'Engineering analysis ensuring safe transfer of all roof loads to the building foundation.'
  },
  {
    id: 'seismic-considerations',
    term: 'Seismic Design Considerations',
    definition: 'Structural provisions for earthquake forces including flexible connections, expansion joints, and attachment methods that accommodate ground motion while maintaining weather integrity. Important for Colorado mountain regions with moderate seismic activity.',
    category: 'Structural',
    relatedTerms: ['Earthquake Resistance', 'Flexible Connections', 'Ground Motion'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Earthquake Design', 'Seismic Provisions'],
    context: 'Design consideration for maintaining roof integrity during seismic events in mountain regions.'
  },
  {
    id: 'ponding-analysis',
    term: 'Ponding Water Analysis',
    definition: 'Evaluation of roof deflection under water accumulation loads, considering progressive loading effects where standing water increases structural deflection, potentially creating more ponding. Critical for low-slope commercial roofs.',
    category: 'Structural',
    relatedTerms: ['Roof Deflection', 'Water Accumulation', 'Progressive Loading'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Water Ponding', 'Standing Water Analysis'],
    context: 'Structural analysis preventing dangerous water accumulation on low-slope roofing systems.'
  },
  {
    id: 'diaphragm-action',
    term: 'Roof Diaphragm Action',
    definition: 'Structural behavior where roof decking acts as a horizontal beam transferring lateral forces (wind, seismic) to vertical elements. Requires proper fastening patterns and edge details to develop full diaphragm strength.',
    category: 'Structural',
    relatedTerms: ['Lateral Force Resistance', 'Deck Fastening', 'Shear Transfer'],
    importance: 'specialized',
    mountainSpecific: false,
    synonyms: ['Horizontal Diaphragm', 'Shear Diaphragm'],
    context: 'Structural engineering concept critical for building lateral force resistance through roof systems.'
  },
  {
    id: 'uplift-resistance-design',
    term: 'Uplift Resistance Design',
    definition: 'Engineering methodology for resisting wind suction forces that attempt to lift roofing materials. Includes fastener pullout calculations, membrane adhesion strength, and ballast weight requirements based on wind exposure and building height.',
    category: 'Structural',
    relatedTerms: ['Wind Suction', 'Fastener Pullout', 'Membrane Adhesion'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Wind Uplift Design', 'Suction Resistance'],
    context: 'Critical design element for preventing wind damage in high-wind mountain environments.'
  },

  // Sustainability (8 terms)
  {
    id: 'embodied-carbon',
    term: 'Embodied Carbon',
    definition: 'Total greenhouse gas emissions from material extraction, manufacturing, transportation, and installation phases of roofing products. Measured in CO2 equivalent, with metal roofing typically having higher initial but lower lifecycle carbon footprint.',
    category: 'Sustainability',
    relatedTerms: ['Carbon Footprint', 'Lifecycle Assessment', 'Environmental Impact'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Embodied Energy', 'Carbon Content'],
    context: 'Environmental metric for evaluating total climate impact of roofing material choices.'
  },
  {
    id: 'solar-reflectance-index',
    term: 'Solar Reflectance Index (SRI)',
    definition: 'Composite measure of solar reflectance and thermal emittance indicating how much heat a surface will generate under standard conditions. Higher SRI values (closer to 100) indicate cooler surfaces, reducing building energy consumption.',
    category: 'Sustainability',
    relatedTerms: ['Cool Roofing', 'Energy Efficiency', 'Heat Reflection'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Solar Reflectivity', 'Cool Roof Rating'],
    context: 'Performance metric for evaluating roofing materials\' contribution to building energy efficiency.'
  },
  {
    id: 'rainwater-harvesting',
    term: 'Rainwater Harvesting Integration',
    definition: 'System design incorporating roof drainage with collection, filtration, and storage components for water conservation. Includes first-flush diversions, leaf screens, and storage calculations based on roof area and precipitation data.',
    category: 'Sustainability',
    relatedTerms: ['Water Conservation', 'Collection Systems', 'Storage Design'],
    importance: 'specialized',
    mountainSpecific: false,
    synonyms: ['Rain Collection', 'Water Harvesting'],
    context: 'Sustainable building practice for reducing municipal water consumption through roof collection.'
  },
  {
    id: 'leed-compliance',
    term: 'LEED Compliance',
    definition: 'Leadership in Energy and Environmental Design certification requirements for sustainable building practices. Roofing contributes through cool roof credits, recycled content, regional materials, and stormwater management.',
    category: 'Sustainability',
    relatedTerms: ['Green Building', 'Certification Requirements', 'Sustainable Design'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Green Building Certification', 'USGBC Standards'],
    context: 'Third-party verification system for sustainable building design and construction practices.'
  },
  {
    id: 'recyclable-materials',
    term: 'End-of-Life Recyclability',
    definition: 'Ability to recover and reprocess roofing materials at the end of their service life. Metal roofing achieves 90%+ recycling rates, while asphalt shingles can be recycled into pavement aggregate and new roofing products.',
    category: 'Sustainability',
    relatedTerms: ['Material Recovery', 'Waste Reduction', 'Circular Economy'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Material Recycling', 'Waste Recovery'],
    context: 'Sustainability consideration for minimizing construction waste and supporting circular economy.'
  },

  // Safety (6 terms)
  {
    id: 'fall-protection-systems',
    term: 'Fall Protection Systems',
    definition: 'OSHA-mandated safety equipment and procedures for working at heights including harnesses, anchor points, guardrails, and safety nets. Mountain roofing requires enhanced systems due to steep slopes and extreme weather exposure.',
    category: 'Safety',
    relatedTerms: ['OSHA Compliance', 'Personal Protective Equipment', 'Anchor Points'],
    importance: 'essential',
    mountainSpecific: true,
    synonyms: ['Fall Arrest Systems', 'Height Safety'],
    context: 'Regulatory requirement and best practice for protecting workers during roof installation and maintenance.'
  },
  {
    id: 'oxygen-support-systems',
    term: 'Oxygen Support Systems',
    definition: 'Supplemental oxygen equipment for workers at elevations above 10,000 feet where reduced atmospheric pressure can impair performance and safety. Includes portable concentrators and emergency oxygen supplies.',
    category: 'Safety',
    relatedTerms: ['High-Altitude Safety', 'Worker Health', 'Emergency Equipment'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Supplemental Oxygen', 'Altitude Support'],
    context: 'Specialized safety equipment for extreme high-altitude roofing projects and worker health protection.'
  },
  {
    id: 'rigging-systems',
    term: 'Advanced Rigging Systems',
    definition: 'Specialized equipment for material handling on steep slopes and difficult access situations including block and tackle, winches, and rope systems. Essential for mountain roofing where conventional equipment access is limited.',
    category: 'Safety',
    relatedTerms: ['Material Handling', 'Steep Slope Access', 'Rope Work'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Rope Systems', 'Material Lifting'],
    context: 'Specialized equipment for safe material handling in challenging mountain terrain and steep slopes.'
  },

  // Technology (6 terms)
  {
    id: 'drone-inspection',
    term: 'Drone Roof Inspection',
    definition: 'Unmanned aerial vehicle (UAV) technology for comprehensive roof assessment including thermal imaging, high-resolution photography, and 3D mapping. Enables safe inspection of dangerous or inaccessible areas without human exposure.',
    category: 'Technology',
    relatedTerms: ['Thermal Imaging', 'Remote Inspection', 'Digital Assessment'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['UAV Inspection', 'Aerial Assessment'],
    context: 'Modern technology enabling safer, more comprehensive roof inspections and damage assessment.'
  },
  {
    id: 'thermal-imaging',
    term: 'Thermal Imaging Technology',
    definition: 'Infrared camera technology detecting temperature variations indicating moisture intrusion, insulation gaps, and air leakage. Essential for diagnosing hidden problems and verifying installation quality in mountain environments.',
    category: 'Technology',
    relatedTerms: ['Infrared Imaging', 'Moisture Detection', 'Energy Auditing'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Infrared Inspection', 'Temperature Imaging'],
    context: 'Diagnostic technology for identifying hidden roof problems and energy efficiency issues.'
  },
  {
    id: 'moisture-meters',
    term: 'Electronic Moisture Detection',
    definition: 'Specialized instruments measuring moisture content in roofing materials using capacitance, resistance, or microwave technology. Critical for assessing water damage extent and monitoring repair effectiveness.',
    category: 'Technology',
    relatedTerms: ['Moisture Assessment', 'Water Damage', 'Diagnostic Equipment'],
    importance: 'important',
    mountainSpecific: false,
    synonyms: ['Moisture Meters', 'Humidity Detection'],
    context: 'Diagnostic tool for accurate assessment of water damage and monitoring repair progress.'
  },
  {
    id: 'gps-surveying',
    term: 'GPS Roof Surveying',
    definition: 'Global Positioning System technology for precise roof measurements, slope calculations, and material quantity estimation. Provides accurate data for project planning and cost estimation while minimizing roof access time.',
    category: 'Technology',
    relatedTerms: ['Precision Measurement', 'Digital Surveying', 'Project Planning'],
    importance: 'specialized',
    mountainSpecific: false,
    synonyms: ['Satellite Measurement', 'Digital Measurement'],
    context: 'Modern surveying technology for accurate project planning and material estimation.'
  },
  {
    id: 'computational-fluid-dynamics',
    term: 'Computational Fluid Dynamics (CFD)',
    definition: 'Computer modeling technology analyzing wind patterns around buildings to predict pressure zones, uplift forces, and optimal design strategies. Particularly valuable for complex mountain terrain and unique architectural shapes.',
    category: 'Technology',
    relatedTerms: ['Wind Modeling', 'Pressure Analysis', 'Design Optimization'],
    importance: 'specialized',
    mountainSpecific: true,
    synonyms: ['Wind Modeling', 'Airflow Analysis'],
    context: 'Advanced engineering tool for optimizing roof design for specific wind conditions and building geometry.'
  },
  {
    id: 'weather-monitoring',
    term: 'Real-Time Weather Monitoring',
    definition: 'Advanced meteorological systems providing hyperlocal weather data including wind speed, precipitation, temperature, and barometric pressure. Essential for mountain projects where weather conditions change rapidly.',
    category: 'Technology',
    relatedTerms: ['Weather Stations', 'Meteorological Data', 'Safety Monitoring'],
    importance: 'important',
    mountainSpecific: true,
    synonyms: ['Weather Stations', 'Climate Monitoring'],
    context: 'Technology for ensuring worker safety and optimal installation conditions during mountain roofing projects.'
  }
]

export function GlossaryPageClient() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [selectedImportance, setSelectedImportance] = React.useState('All')
  const [showMountainOnly, setShowMountainOnly] = React.useState(false)

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.relatedTerms.some(related => related.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (term.synonyms && term.synonyms.some(synonym => synonym.toLowerCase().includes(searchTerm.toLowerCase())))
    
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory
    const matchesImportance = selectedImportance === 'All' || term.importance === selectedImportance
    const matchesMountainFilter = !showMountainOnly || term.mountainSpecific
    
    return matchesSearch && matchesCategory && matchesImportance && matchesMountainFilter
  })

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'essential':
        return <Badge className="bg-red-100 text-red-800">Essential</Badge>
      case 'important':
        return <Badge className="bg-yellow-100 text-yellow-800">Important</Badge>
      case 'specialized':
        return <Badge className="bg-blue-100 text-blue-800">Specialized</Badge>
      default:
        return null
    }
  }

  const getCategoryInfo = (categoryName: string) => {
    return glossaryCategories.find(cat => cat.name === categoryName)
  }

  return (
    <div className="min-h-screen bg-background-secondary py-12">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Book className="h-12 w-12 text-interactive-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Roofing Glossary
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical glossary covering roofing terminology, mountain-specific techniques, and industry definitions. 
            Built for LLM understanding and professional reference.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search terms, definitions, or related concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border-primary rounded-lg bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-interactive-primary"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedImportance}
                onChange={(e) => setSelectedImportance(e.target.value)}
                className="px-3 py-2 border border-border-primary rounded-lg bg-background-primary text-text-primary text-sm"
              >
                <option value="All">All Levels</option>
                <option value="essential">Essential</option>
                <option value="important">Important</option>
                <option value="specialized">Specialized</option>
              </select>
              
              <button
                onClick={() => setShowMountainOnly(!showMountainOnly)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  showMountainOnly
                    ? 'bg-interactive-primary text-white'
                    : 'bg-background-primary text-text-secondary hover:bg-background-accent border border-border-primary'
                }`}
              >
                <Mountain className="h-4 w-4" />
                Mountain Specific
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-interactive-primary text-white'
                  : 'bg-background-primary text-text-secondary hover:bg-background-accent border border-border-primary'
              }`}
            >
              All Categories ({glossaryTerms.length})
            </button>
            {glossaryCategories.map(category => {
              const count = glossaryTerms.filter(term => term.category === category.name).length
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-interactive-primary text-white'
                      : 'bg-background-primary text-text-secondary hover:bg-background-accent border border-border-primary'
                  }`}
                >
                  {category.icon}
                  {category.name} ({count})
                </button>
              )
            })}
          </div>

          {/* Results Count */}
          <div className="text-text-secondary mb-6">
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
            {searchTerm && (
              <span className="ml-2">
                for "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Glossary Terms */}
        <div className="space-y-6">
          {filteredTerms.map((term) => {
            const categoryInfo = getCategoryInfo(term.category)
            
            return (
              <Card key={term.id} className="border-border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl font-bold text-text-primary">
                          {term.term}
                        </CardTitle>
                        {term.mountainSpecific && (
                          <Mountain className="h-5 w-5 text-gray-600" title="Mountain-specific term" />
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {categoryInfo && (
                          <Badge className={categoryInfo.color}>
                            <span className="flex items-center gap-1">
                              {categoryInfo.icon}
                              {term.category}
                            </span>
                          </Badge>
                        )}
                        {getImportanceBadge(term.importance)}
                      </div>
                      
                      {term.synonyms && (
                        <div className="text-sm text-text-secondary mb-2">
                          <strong>Also known as:</strong> {term.synonyms.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-text-secondary mb-4">
                    {term.definition}
                  </CardDescription>
                  
                  {term.context && (
                    <div className="bg-background-accent p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium text-text-primary mb-1">Context:</div>
                      <div className="text-sm text-text-secondary">{term.context}</div>
                    </div>
                  )}
                  
                  {term.relatedTerms.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-text-primary mb-2">Related Terms:</div>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm) => (
                          <Badge 
                            key={relatedTerm}
                            variant="secondary"
                            className="text-xs bg-background-primary text-text-secondary border border-border-primary"
                          >
                            {relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results Message */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No terms found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSelectedImportance('All')
                setShowMountainOnly(false)
              }}
              className="text-interactive-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Footer Information */}
        <Card className="mt-12 bg-background-primary border-border-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-text-primary">
              About This Glossary
            </CardTitle>
            <CardDescription className="text-lg text-text-secondary">
              Technical terminology reference for roofing professionals and AI language models
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold text-interactive-primary mb-2">95+</div>
                <div className="text-text-secondary">Technical Terms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-interactive-primary mb-2">8</div>
                <div className="text-text-secondary">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-interactive-primary mb-2">45+</div>
                <div className="text-text-secondary">Mountain-Specific Terms</div>
              </div>
            </div>
            <p className="text-text-secondary max-w-3xl mx-auto">
              This glossary is designed to provide comprehensive technical definitions optimized for both human understanding 
              and AI language model comprehension. Terms are categorized by importance and application area, with special 
              emphasis on mountain and high-altitude roofing terminology.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}