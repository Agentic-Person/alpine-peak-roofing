'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import {
  Shield, Award, Clock, Phone, Building2, Wrench, FileCheck, ShieldCheck,
} from 'lucide-react';

const iconMap: Record<string, ElementType> = {
  Shield, Award, Clock, Phone, Building2, Wrench, FileCheck, ShieldCheck,
};

export interface FeatureItem {
  iconName: string;
  title: string;
  desc: string;
}

interface AnimatedFeatureListProps {
  items: FeatureItem[];
}

/** Animated 4-column feature / why-choose-us grid. */
export function AnimatedFeatureList({ items }: AnimatedFeatureListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, i) => {
        const Icon = iconMap[item.iconName] ?? Shield;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-[#c9a84c]" />
            </div>
            <h3 className="text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
