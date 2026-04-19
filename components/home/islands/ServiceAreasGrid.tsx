"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

interface ServiceArea {
  name: string;
  tagline: string;
  elevation: string;
  description: string;
  image: string;
}

const slugMap: Record<string, string> = {
  "Aspen": "aspen",
  "Vail": "vail",
  "Telluride": "telluride",
  "Crested Butte": "crested-butte",
  "Steamboat Springs": "steamboat-springs",
  "Winter Park": "winter-park",
  "Glenwood Springs": "glenwood-springs",
  "Frisco": "frisco",
  "Silverthorne": "silverthorne",
  "Central Mountains": "central-mountains",
  "Breckenridge": "breckenridge",
  "Durango": "durango",
};

interface ServiceAreasGridProps {
  serviceAreas: ServiceArea[];
}

export default function ServiceAreasGrid({ serviceAreas }: ServiceAreasGridProps) {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={0}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="gold-line mx-auto mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Where We Serve
        </span>
        <Link href="/locations" className="group">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-gold transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
            Service Areas
          </h2>
        </Link>
        <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          From the Front Range to the Western Slope, Alpine Peak Roofing serves communities across the Colorado Rocky Mountains.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {serviceAreas.map((area, i) => {
          const slug = slugMap[area.name];
          return (
            <Link key={area.name} href={`/locations/${slug}`}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group bg-white/5 border border-white/10 hover:border-gold/40 transition-all overflow-hidden cursor-pointer h-full"
              >
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260/0.85)] via-[oklch(0.10_0.03_260/0.3)] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {area.name}
                    </h3>
                    <p className="text-gold text-xs font-semibold tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {area.tagline}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      Elevation
                    </span>
                    <span className="text-white text-xs font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {area.elevation}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {area.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
