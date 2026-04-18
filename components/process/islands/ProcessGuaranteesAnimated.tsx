"use client";
/*
 * Client island: animated guarantee cards + CTA for /process
 */
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const guarantees = [
  {
    title: "Workmanship Guarantee",
    desc: "Our installation is backed by a comprehensive workmanship warranty. If anything related to our work fails, we fix it — no questions asked.",
    period: "10-Year",
  },
  {
    title: "Material Guarantee",
    desc: "We only use manufacturer-certified materials with full factory warranties. Your materials are protected for decades.",
    period: "25-50 Year",
  },
  {
    title: "Satisfaction Guarantee",
    desc: "If you're not completely satisfied with any aspect of our work, we'll make it right. Period. Your happiness is our bottom line.",
    period: "100%",
  },
];

export default function ProcessGuaranteesAnimated() {
  return (
    <>
      {/* Guarantee Section */}
      <section className="bg-navy py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <Shield size={48} className="text-gold mx-auto mb-6" />
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our <span className="text-gold">Triple Guarantee</span>
              </h2>
              <p
                className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                We stand behind every project with three ironclad guarantees that protect your investment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {guarantees.map((g, i) => (
                <motion.div
                  key={g.title}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors"
                >
                  <div
                    className="text-3xl font-bold text-gold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {g.period}
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {g.title}
                  </h3>
                  <p
                    className="text-sm text-white/50 leading-relaxed"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {g.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-dark py-20">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg text-white/60 mb-8 max-w-xl mx-auto"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Take the first step toward a better roof. Schedule your free consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              SCHEDULE FREE CONSULTATION <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
