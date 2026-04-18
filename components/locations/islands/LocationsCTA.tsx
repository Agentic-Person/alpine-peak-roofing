"use client";
/**
 * LocationsCTA — client island for the animated CTA section
 * on the /locations index page.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export function LocationsCTA() {
  return (
    <section className="py-20 px-4 bg-[#0B1D3A]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-playfair text-4xl md:text-5xl text-white"
          >
            Ready to Protect Your Property?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Contact Alpine Peak Roofing today for a free consultation. Our local experts will assess your property&apos;s unique needs and deliver a customized roofing solution.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/contact">
              <button className="px-8 py-4 bg-[#C9A84C] text-[#0B1D3A] font-semibold rounded hover:bg-[#d4b65c] transition-colors inline-flex items-center gap-2">
                Schedule Free Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-[#C9A84C] text-[#C9A84C] font-semibold rounded hover:bg-[#C9A84C]/10 transition-colors">
                Call (970) 456-1176
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
