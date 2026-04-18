"use client";
/**
 * LocationsWhySection — client island for the animated "Why Choose Alpine Peak"
 * section on the /locations index page.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const WHY_ITEMS = [
  "Local expertise in your specific mountain community",
  "Understanding of unique elevation and climate challenges",
  "Proven track record with properties in your area",
  "24/7 emergency response within your region",
  "Specialized equipment for high-altitude conditions",
  "Commitment to your community's character and values",
];

export function LocationsWhySection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#0B1D3A] to-[#1a2f4a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
              Why Choose Alpine Peak for Your Location?
            </h2>
            <div className="space-y-4">
              {WHY_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-lg p-8"
          >
            <h3 className="font-playfair text-2xl text-[#C9A84C] mb-6">
              Regional Coverage
            </h3>
            <p className="text-white/70 mb-6">
              Alpine Peak Roofing serves 12 major Colorado mountain communities, each with specialized expertise tailored to local conditions, market demands, and architectural heritage.
            </p>
            <div className="space-y-3 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-2">Central Rockies</h4>
                <p className="text-white/60 text-sm">Aspen, Vail, Telluride, Crested Butte, Breckenridge, Winter Park</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Summit County</h4>
                <p className="text-white/60 text-sm">Frisco, Silverthorne, Central Mountains</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Western Slope &amp; South</h4>
                <p className="text-white/60 text-sm">Glenwood Springs, Durango</p>
              </div>
            </div>
            <Link href="/contact">
              <button className="w-full px-6 py-3 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors">
                Get Local Consultation
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
