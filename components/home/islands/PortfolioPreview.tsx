"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolioProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

export default function PortfolioPreview() {
  const featured = portfolioProjects.slice(0, 3);
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={0}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <div>
          <div className="gold-line mb-4" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured Projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all text-sm tracking-wide mt-4 md:mt-0"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          VIEW ALL PROJECTS <ArrowRight size={16} />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <Link href={`/projects/${project.id}`} className="group block relative overflow-hidden aspect-square">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260/0.95)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs uppercase tracking-[0.15em] text-gold block mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {project.roofType.split('—')[0].trim()}
                </span>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {project.location}
                </p>
              </div>
              <div className="absolute inset-0 bg-[#C9A84C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-[#C9A84C] text-[#0B1D3A] px-5 py-2.5 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Project <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
