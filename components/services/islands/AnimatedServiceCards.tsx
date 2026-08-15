'use client';

import { motion } from 'framer-motion';
import {
  Layers, Wrench, Shield, Droplets, Wind, Sun,
  Building2, Thermometer, Leaf,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export interface ServiceCardData {
  iconName: string;
  title: string;
  desc: string;
}

const iconMap: Record<string, React.ElementType> = {
  Layers, Wrench, Shield, Droplets, Wind, Sun, Building2, Thermometer, Leaf,
};

interface AnimatedServiceCardsProps {
  services: ServiceCardData[];
}

/** Animated staggered list of service feature cards (residential or commercial). */
export function AnimatedServiceCards({ services }: AnimatedServiceCardsProps) {
  return (
    <div className="grid gap-4">
      {services.map((s, i) => {
        const Icon = iconMap[s.iconName] ?? Layers;
        return (
          <motion.div
            key={s.title}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="bg-white/5 border border-white/10 p-6 flex gap-4 hover:border-gold/30 transition-colors"
          >
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-gold" />
            </div>
            <div>
              <h3
                className="text-base font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm text-white/50"
                style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
              >
                {s.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
