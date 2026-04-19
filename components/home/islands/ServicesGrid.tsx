"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon, Building2, Wrench, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

// Icon mapping keyed by service title — avoids passing functions across the server/client boundary
const ICON_MAP: Record<string, React.ElementType> = {
  "Residential Roofing": HomeIcon,
  "Commercial Roofing": Building2,
  "Emergency Repairs": Wrench,
};

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={0}
        className="max-w-2xl mb-16"
      >
        <div className="gold-line mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Our Expertise
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Comprehensive Roofing Solutions
        </h2>
        <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          From residential homes to commercial properties, we provide the full spectrum of roofing services with unmatched quality and professionalism.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <Link href="/services" className="group block relative overflow-hidden h-[420px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260/0.95)] via-[oklch(0.10_0.03_260/0.5)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {(() => { const Icon = ICON_MAP[service.title]; return Icon ? <Icon size={28} className="text-gold mb-3" /> : null; })()}
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
