"use client"
/*
 * ProjectDetail.tsx — Alpine Peak Roofing
 * Design: Mountain Modernism — Alpine Luxury Editorial
 * Full blog-style project case study page with story, specs, blueprints, and testimonial
 */
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Home,
  BedDouble,
  Bath,
  Mountain,
  Clock,
  ChevronRight,
  CheckCircle2,
  Quote,
  ArrowRight,
} from "lucide-react";

import { portfolioProjects } from "@/lib/portfolioProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as unknown as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = portfolioProjects.find((p) => p.id === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl text-white mb-4">Project Not Found</h1>
          <Link href="/portfolio">
            <span className="text-[#C9A84C] hover:underline">Back to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get other projects for navigation (exclude current)
  const otherProjects = portfolioProjects.filter((p) => p.id !== project.id);
  // Get next and previous projects
  const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const prevProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/60 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end pb-16 px-4">
          <div className="max-w-6xl mx-auto w-full">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link href="/portfolio">
                <span className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#d4b65c] transition-colors text-sm tracking-wider uppercase font-semibold">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portfolio
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-wider uppercase rounded">
                  {project.category}
                </span>
                <span className="text-white/60 text-sm">{project.year}</span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-3">
                {project.title}
              </h1>
              <p className="text-xl text-white/80 font-light italic max-w-2xl">
                {project.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-[#0a1628] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {[
              { icon: MapPin, label: "Location", value: project.location },
              { icon: Calendar, label: "Completed", value: String(project.year) },
              { icon: Ruler, label: "Roof Area", value: `${project.sqft.toLocaleString()} sq ft` },
              { icon: Home, label: "Home Size", value: `${project.homeSqft.toLocaleString()} sq ft` },
              { icon: BedDouble, label: "Bedrooms", value: String(project.bedrooms) },
              { icon: Bath, label: "Bathrooms", value: String(project.bathrooms) },
              { icon: Mountain, label: "Elevation", value: project.elevation },
              { icon: Clock, label: "Duration", value: project.duration },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <stat.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-1" />
                <p className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
                <p className="text-white text-sm font-medium">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-[#0B1D3A]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Main Content - 3 cols */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-12"
            >
              {/* Overview */}
              <motion.div variants={fadeUp}>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-4" />
                <h2 className="font-playfair text-3xl text-white mb-6">Project Overview</h2>
                <p className="text-white/70 leading-relaxed text-lg">{project.overview}</p>
              </motion.div>

              {/* The Story */}
              <motion.div variants={fadeUp}>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-4" />
                <h2 className="font-playfair text-3xl text-white mb-6">The Story</h2>
                <p className="text-white/70 leading-relaxed text-lg">{project.story}</p>
              </motion.div>

              {/* Blueprint / Design Section */}
              <motion.div variants={fadeUp}>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-4" />
                <h2 className="font-playfair text-3xl text-white mb-6">Architectural Design</h2>
                <div className="relative rounded-lg overflow-hidden border border-white/10 mb-4">
                  <img
                    src={project.blueprintImage}
                    alt={project.blueprintCaption}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm italic">{project.blueprintCaption}</p>
                  </div>
                </div>
              </motion.div>

              {/* Interior Highlight */}
              <motion.div variants={fadeUp}>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-4" />
                <h2 className="font-playfair text-3xl text-white mb-6">Interior Highlights</h2>
                <p className="text-white/70 leading-relaxed text-lg">{project.interiorHighlight}</p>
              </motion.div>
            </motion.div>

            {/* Sidebar - 2 cols */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Project Specs Card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6"
              >
                <h3 className="font-playfair text-xl text-white mb-4">Project Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Clients</span>
                    <span className="text-white text-sm">{project.clients}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Architect</span>
                    <span className="text-white text-sm text-right max-w-[60%]">{project.architect}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Roof Material</span>
                    <span className="text-white text-sm text-right max-w-[60%]">{project.roofType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Roof Area</span>
                    <span className="text-white text-sm">{project.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Home Size</span>
                    <span className="text-white text-sm">{project.homeSqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50 text-sm">Duration</span>
                    <span className="text-white text-sm">{project.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50 text-sm">Elevation</span>
                    <span className="text-white text-sm">{project.elevation}</span>
                  </div>
                </div>
              </motion.div>

              {/* Roofing Details Card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6"
              >
                <h3 className="font-playfair text-xl text-white mb-4">Roofing Details</h3>
                <p className="text-white/70 text-sm leading-relaxed">{project.roofingDetails}</p>
              </motion.div>

              {/* Design Features */}
              <motion.div
                variants={fadeUp}
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6"
              >
                <h3 className="font-playfair text-xl text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.designFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenges Card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6"
              >
                <h3 className="font-playfair text-xl text-white mb-4">Challenges & Solutions</h3>
                <p className="text-white/70 text-sm leading-relaxed">{project.challenges}</p>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                variants={fadeUp}
                className="bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border border-[#C9A84C]/30 rounded-lg p-6 text-center"
              >
                <h3 className="font-playfair text-xl text-white mb-2">
                  Ready for Your Project?
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Let's discuss how we can bring your vision to life.
                </p>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-6 py-3 rounded font-semibold text-sm hover:bg-[#d4b65c] transition-colors">
                    Get a Free Estimate
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="w-10 h-10 text-[#C9A84C]/40 mx-auto mb-6" />
            <blockquote className="font-playfair text-2xl md:text-3xl text-white italic leading-relaxed mb-6">
              "{project.testimonial}"
            </blockquote>
            <p className="text-[#C9A84C] font-medium tracking-wider uppercase text-sm">
              — {project.testimonialAuthor}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation to Other Projects */}
      <section className="py-16 bg-[#0B1D3A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="w-12 h-0.5 bg-[#C9A84C] mb-3" />
              <h2 className="font-playfair text-3xl text-white">More Projects</h2>
            </div>
            <Link href="/portfolio">
              <span className="text-[#C9A84C] hover:text-[#d4b65c] transition-colors text-sm tracking-wider uppercase font-semibold flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Prev / Next Navigation */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Link href={`/projects/${prevProject.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative h-48 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={prevProject.image}
                  alt={prevProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D3A]/90 to-transparent flex items-center p-6">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider flex items-center gap-1 mb-2">
                      <ArrowLeft className="w-3 h-3" /> Previous Project
                    </p>
                    <h3 className="font-playfair text-xl text-white">{prevProject.title}</h3>
                    <p className="text-white/60 text-sm">{prevProject.location}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
            <Link href={`/projects/${nextProject.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative h-48 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={nextProject.image}
                  alt={nextProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0B1D3A]/90 to-transparent flex items-end justify-end p-6">
                  <div className="text-right">
                    <p className="text-white/50 text-xs uppercase tracking-wider flex items-center justify-end gap-1 mb-2">
                      Next Project <ArrowRight className="w-3 h-3" />
                    </p>
                    <h3 className="font-playfair text-xl text-white">{nextProject.title}</h3>
                    <p className="text-white/60 text-sm">{nextProject.location}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Quick Grid of Other Projects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherProjects.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div>
                      <h4 className="text-white text-sm font-medium">{p.title}</h4>
                      <p className="text-white/60 text-xs">{p.location}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
