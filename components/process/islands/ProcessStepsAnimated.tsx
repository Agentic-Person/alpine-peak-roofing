"use client";
/*
 * Client island: animated process steps timeline
 * Used by app/process/page.tsx (server component)
 */
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Search, FileText, Ruler, HardHat } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const icons = [Phone, Search, FileText, Ruler, HardHat, CheckCircle2];

export interface ProcessStep {
  number: string;
  iconIndex: number;
  title: string;
  description: string;
  details: string[];
}

interface Props {
  steps: ProcessStep[];
}

export default function ProcessStepsAnimated({ steps }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      {steps.map((step, i) => {
        const Icon = icons[step.iconIndex];
        return (
          <motion.div
            key={step.number}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className={`relative flex gap-8 ${i < steps.length - 1 ? "pb-16" : ""}`}
          >
            {/* Timeline line */}
            <div className="hidden md:flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                <span className="text-gold font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{step.number}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-[2px] flex-1 bg-gradient-to-b from-gold/40 to-white/10 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="md:hidden flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold/10 border-2 border-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{step.number}</span>
                </div>
                <Icon size={20} className="text-gold" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Icon size={20} className="text-gold hidden md:block" />
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
              </div>
              <p className="text-white/60 mb-4 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {step.description}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
