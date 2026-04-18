'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, AlertTriangle, CheckCircle, PhoneCall, Camera, Shield, FileText } from 'lucide-react';

interface EmergencyStep {
  iconName: string;
  title: string;
  desc: string;
}

const iconMap: Record<string, React.ElementType> = {
  PhoneCall, Camera, Shield, FileText,
};

const emergencySteps: EmergencyStep[] = [
  { iconName: 'PhoneCall', title: 'Call Us Immediately', desc: "Contact our 24/7 emergency line at (970) 446-8995. We'll dispatch a crew as quickly as conditions allow." },
  { iconName: 'Camera', title: 'Document the Damage', desc: 'If safe to do so, take photos of visible damage from the ground. Do NOT go on your roof. Document any interior water damage as well.' },
  { iconName: 'Shield', title: 'Protect Your Property', desc: 'Move valuables away from leak areas. Place buckets under active drips. If you have tarps, cover exposed furniture — but leave the roof to us.' },
  { iconName: 'FileText', title: 'Contact Your Insurance', desc: "File a claim with your homeowner's insurance. We'll work directly with your adjuster to ensure fair coverage of all damage." },
];

const damageTypes = [
  {
    title: 'Hail Damage',
    desc: "Colorado's Front Range and mountain communities experience frequent hailstorms that can devastate roofing materials. Hail damage may not be immediately visible but can compromise your roof's integrity, leading to leaks months later. Our inspectors are trained to identify hail impact damage on all roofing materials.",
    signs: ['Dented or bruised shingles', 'Cracked or split shingles', 'Granule loss exposing asphalt', 'Dented metal panels, gutters, or flashing', 'Cracked skylights or vent covers'],
  },
  {
    title: 'Wind Damage',
    desc: 'Mountain winds regularly exceed 60-80 mph during storms, with gusts over 100 mph not uncommon at higher elevations. Wind damage can lift, tear, or completely remove roofing materials, exposing your home to water infiltration.',
    signs: ['Missing or displaced shingles', 'Lifted or peeled roofing edges', 'Exposed underlayment or deck', 'Damaged ridge caps and hip shingles', 'Debris impact from fallen branches'],
  },
  {
    title: 'Snow & Ice Damage',
    desc: 'Heavy snow accumulation and ice dam formation are among the most common causes of roof damage in Colorado mountain communities. Ice dams form when heat escaping through the roof melts snow, which refreezes at the eaves and forces water under roofing materials.',
    signs: ['Ice dams along eaves and gutters', 'Icicle formation at roof edges', 'Water stains on interior ceilings', 'Sagging or bowed roof sections', 'Damaged or detached gutters'],
  },
];

const insuranceSteps = [
  { step: '1', title: 'Free Storm Damage Inspection', desc: 'We thoroughly inspect your roof and document all damage with detailed photos and measurements.' },
  { step: '2', title: 'Insurance Claim Filing', desc: 'We help you file your claim with complete documentation that supports full coverage.' },
  { step: '3', title: 'Adjuster Meeting', desc: 'We meet with your insurance adjuster on-site to walk through all identified damage.' },
  { step: '4', title: 'Scope Agreement', desc: 'We work with your insurance to agree on a comprehensive repair scope that addresses all damage.' },
  { step: '5', title: 'Professional Repair', desc: 'Once approved, we complete repairs using premium materials and expert craftsmanship.' },
  { step: '6', title: 'Final Documentation', desc: 'You receive complete documentation of repairs for your records and future insurance reference.' },
];

const insuranceItems = [
  'Comprehensive damage documentation with photos and measurements',
  'Direct communication with your insurance adjuster',
  'Supplemental claims for damage missed in initial assessment',
  'Detailed scope of work matching insurance requirements',
  'No out-of-pocket costs beyond your deductible on approved claims',
  'Assistance with temporary living expenses if needed',
];

/** All animated sections for the storm-damage page. */
export function StormDamageAnimatedSections() {
  return (
    <>
      {/* What To Do */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Immediate Steps
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3 mb-4">
              What To Do After Storm Damage
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Stay calm and follow these steps to protect your property and ensure a smooth repair
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencySteps.map((step, i) => {
              const Icon = iconMap[step.iconName] ?? Shield;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="bg-[#0f2035] rounded-xl p-6 border border-[#1a3050] h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0a1628] font-bold text-lg">
                        {i + 1}
                      </div>
                      <Icon className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Types of Storm Damage */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
              Damage Types
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3 mb-4">
              Common Storm Damage in Colorado
            </h2>
          </div>

          <div className="space-y-8">
            {damageTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a1628] rounded-xl p-8 border border-[#1a3050]"
              >
                <h3 className="font-['Playfair_Display'] text-2xl text-white font-bold mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">{type.desc}</p>
                <div>
                  <h4 className="text-[#c9a84c] font-semibold mb-3">Signs to Look For:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {type.signs.map((sign, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                        <span className="text-gray-300 text-sm">{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Process */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">
                Insurance Support
              </span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3 mb-6">
                We Handle the Insurance Process
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Navigating insurance claims after storm damage can be overwhelming. Alpine Peak
                Roofing has extensive experience working with all major insurance carriers in
                Colorado. We handle the documentation, meet with adjusters, and advocate for fair
                coverage of all damage.
              </p>
              <div className="space-y-4">
                {insuranceItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c9a84c] mt-0.5 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#0f2035] rounded-xl p-8 border border-[#1a3050]"
            >
              <h3 className="font-['Playfair_Display'] text-2xl text-white font-bold mb-6">
                Our Insurance Claim Process
              </h3>
              <div className="space-y-6">
                {insuranceSteps.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0a1628] font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-2xl p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mb-4">
              Need Emergency Roof Repair?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Don&apos;t wait — water damage gets worse every minute. Call our 24/7 emergency line
              now and we&apos;ll dispatch a crew to protect your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9704468995"
                className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-3 justify-center"
              >
                <Phone className="w-5 h-5" />
                Call (970) 446-8995
              </a>
              <Link href="/contact">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                  Schedule Free Inspection
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
