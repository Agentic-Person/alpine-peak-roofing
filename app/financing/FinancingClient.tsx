"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Financing page: Payment options, calculator, FAQ
 */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";
import { motion } from "framer-motion";
import {
  DollarSign, CheckCircle2, ChevronRight, Shield,
  CreditCard, Calendar, Percent, ChevronDown, ChevronUp,
  Calculator, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const plans = [
  {
    title: "Same-As-Cash",
    term: "12 Months",
    apr: "0% APR",
    highlight: true,
    features: [
      "No interest if paid within 12 months",
      "Low monthly payments",
      "No prepayment penalties",
      "Quick approval process",
    ],
  },
  {
    title: "Low Monthly",
    term: "60 Months",
    apr: "6.99% APR",
    highlight: false,
    features: [
      "Affordable monthly payments",
      "Fixed interest rate",
      "No prepayment penalties",
      "Up to $75,000 financing",
    ],
  },
  {
    title: "Extended Term",
    term: "120 Months",
    apr: "8.99% APR",
    highlight: false,
    features: [
      "Lowest monthly payments",
      "Fixed interest rate",
      "Ideal for large projects",
      "Up to $100,000 financing",
    ],
  },
];

const faqs = [
  {
    q: "What credit score do I need to qualify?",
    a: "We work with multiple lending partners to accommodate a wide range of credit profiles. Most homeowners with a credit score of 600 or above can qualify for financing. We also offer options for those with lower scores — contact us to discuss your situation.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most applications are approved within minutes. You'll receive a decision quickly, and once approved, we can begin scheduling your project right away.",
  },
  {
    q: "Can I pay off my loan early?",
    a: "Absolutely. All of our financing plans come with no prepayment penalties. You can pay off your balance at any time without any additional fees.",
  },
  {
    q: "Do you accept insurance claims?",
    a: "Yes, we work directly with all major insurance companies. Our team will help you navigate the claims process, document damage, and ensure you receive fair compensation for your roof repair or replacement.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, checks, all major credit cards, and financing through our lending partners. We're flexible and will work with you to find the best payment solution.",
  },
  {
    q: "Is there a down payment required?",
    a: "Down payment requirements vary by financing plan. Our Same-As-Cash option requires no down payment. Other plans may require a small down payment — your financing specialist will explain all options during your consultation.",
  },
];

export default function FinancingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanTerm, setLoanTerm] = useState(60);

  const monthlyPayment = (() => {
    const rate = loanTerm === 12 ? 0 : loanTerm === 60 ? 0.0699 : 0.0899;
    if (rate === 0) return loanAmount / loanTerm;
    const monthlyRate = rate / 12;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  })();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={images.materialsDisplay} alt="Financing options" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.80)] to-[oklch(0.12_0.03_260/0.5)]" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>Financing</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Flexible{" "}<span className="text-gold">Financing</span>{" "}Options
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              Don't let budget concerns delay protecting your home. We offer flexible financing to make premium roofing accessible.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* Financing Plans */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>Payment Plans</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Choose Your Plan
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              We've partnered with leading lenders to offer competitive financing options for every budget.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.title} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                className={`relative p-8 ${plan.highlight ? "bg-gold/10 border-2 border-gold" : "bg-white/5 border border-white/10"} hover:border-gold/50 transition-colors`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-dark text-xs font-bold px-4 py-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{plan.title}</h3>
                  <div className="text-3xl font-bold text-gold mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{plan.apr}</div>
                  <p className="text-sm text-white/40" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>{plan.term} term</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                      <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold tracking-wide transition-all ${
                    plan.highlight
                      ? "bg-gold hover:bg-gold-light text-navy-dark"
                      : "border border-gold/40 hover:border-gold text-gold"
                  }`}
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  APPLY NOW <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="bg-navy py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
              className="text-center mb-12">
              <div className="gold-line mx-auto mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>Estimate</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Payment Calculator
              </h2>
              <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                Get an estimate of your monthly payment based on project cost and term.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={1}
              className="bg-white/5 border border-white/10 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                      Project Cost: <span className="text-gold">${loanAmount.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min={5000}
                      max={100000}
                      step={1000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-[oklch(0.75_0.12_85)] h-2 bg-white/10 rounded-none appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/30 mt-1" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                      <span>$5,000</span>
                      <span>$100,000</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 font-medium" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>Loan Term</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[12, 60, 120].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`py-2 text-sm font-medium transition-all ${
                            loanTerm === term
                              ? "bg-gold text-navy-dark"
                              : "bg-white/5 text-white/60 border border-white/10 hover:border-gold/30"
                          }`}
                          style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                        >
                          {term} mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-white/5 p-8">
                  <Calculator size={24} className="text-gold mb-3" />
                  <p className="text-sm text-white/40 mb-1" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>Estimated Monthly Payment</p>
                  <div className="text-4xl font-bold text-gold mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    ${Math.round(monthlyPayment).toLocaleString()}
                  </div>
                  <p className="text-xs text-white/30" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                    {loanTerm === 12 ? "0% APR" : loanTerm === 60 ? "6.99% APR" : "8.99% APR"} for {loanTerm} months
                  </p>
                </div>
              </div>
              <p className="text-xs text-white/30 mt-6 text-center" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                * This calculator provides estimates only. Actual rates and terms may vary based on credit approval. Contact us for a personalized quote.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-navy-dark py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                className="bg-white/5 border border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium pr-4" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-white/40 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance CTA */}
      <section className="bg-navy py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white/5 border border-white/10 p-8 md:p-12">
            <Shield size={48} className="text-gold flex-shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Insurance Claims Assistance</h3>
              <p className="text-white/60" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
                We work directly with your insurance company to make the claims process as smooth as possible. Our team will document damage, prepare estimates, and advocate on your behalf.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-6 py-3 text-sm font-semibold tracking-wide transition-all flex-shrink-0" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
              LEARN MORE <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
