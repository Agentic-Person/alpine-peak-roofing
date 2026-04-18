'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface ServiceGridItem {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  heroImage: string;
  category: string;
}

interface AnimatedServiceGridProps {
  services: ServiceGridItem[];
  basePath: string; // e.g. /services/residential
}

/** Animated grid of service cards with images — residential and commercial listing pages. */
export function AnimatedServiceGrid({ services, basePath }: AnimatedServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`${basePath}/${service.slug}`}>
            <div className="group relative bg-[#0f2035] rounded-xl overflow-hidden border border-[#1a3050] hover:border-[#c9a84c]/50 transition-all duration-500 cursor-pointer h-full">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2035] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl text-white font-bold mb-3 group-hover:text-[#c9a84c] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.tagline}</p>
                <div className="flex items-center gap-2 text-[#c9a84c] text-sm font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
