"use client";
import { motion } from "framer-motion";
import { Award, Clock, ThumbsUp, Hammer } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const stats = [
  { number: "35+", label: "Years of Excellence", icon: Award },
  { number: "4,200+", label: "Projects Completed", icon: Hammer },
  { number: "100%", label: "Satisfaction Rate", icon: ThumbsUp },
  { number: "24/7", label: "Emergency Service", icon: Clock },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/10">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-center px-6"
        >
          <stat.icon size={24} className="text-gold mx-auto mb-3" />
          <div className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {stat.number}
          </div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/50" style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
