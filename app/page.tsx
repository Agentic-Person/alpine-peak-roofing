"use client";
/*
 * DESIGN: Mountain Modernism — Alpine Luxury Editorial
 * Deep navy + gold accents, Playfair Display headlines, Source Sans 3 body
 * Magazine-style editorial layout with diagonal dividers and cinematic imagery
 */
import Link from "next/link";
import { images } from "@/lib/images";
import { materials as materialsData } from "@/lib/materials";
import { portfolioProjects } from "@/lib/portfolioProjects";
import { motion } from "framer-motion";
import {
  ChevronRight, Shield, Award, Clock, Star, Phone,
  Home as HomeIcon, Building2, Wrench, CheckCircle2,
  ArrowRight, Users, ThumbsUp, Hammer
} from "lucide-react";

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

const services = [
  {
    title: "Residential Roofing",
    description: "Complete roof replacement, repairs, and new construction for Colorado homes. From architectural shingles to premium metal roofing systems.",
    icon: HomeIcon,
    image: images.heroResidential,
  },
  {
    title: "Commercial Roofing",
    description: "Full-service commercial solutions including TPO, EPDM, modified bitumen, and standing seam metal for businesses across the Rockies.",
    icon: Building2,
    image: images.heroCommercial,
  },
  {
    title: "Emergency Repairs",
    description: "24/7 storm damage response, emergency leak repair, and temporary weatherproofing. We're there when you need us most.",
    icon: Wrench,
    image: images.emergencyRepair,
  },
];

const testimonials = [
  {
    text: "Alpine Peak replaced our entire roof after a hailstorm. Their team was professional, fast, and the quality of work exceeded our expectations. The new roof looks incredible against the mountain backdrop.",
    author: "Sarah & Michael Thompson",
    location: "Vail, CO",
    rating: 5,
  },
  {
    text: "We've used Alpine Peak for three commercial properties now. Their attention to detail and project management is unmatched. They understand the unique challenges of mountain construction.",
    author: "Robert Chen",
    location: "Aspen, CO",
    rating: 5,
  },
  {
    text: "From the initial inspection to the final walkthrough, every step was explained clearly. The financing options made it easy, and the crew left our property spotless. Highly recommend.",
    author: "Jennifer & David Martinez",
    location: "Telluride, CO",
    rating: 5,
  },
];

const serviceAreas = [
  { name: "Aspen", tagline: "Luxury mountain living at 7,908 ft", elevation: "7,908 ft", description: "World-class skiing, Victorian architecture, and celebrity estates. We protect Aspen's most prestigious properties.", image: images.townAspen },
  { name: "Vail", tagline: "Colorado's premier alpine village", elevation: "8,150 ft", description: "Bavarian-style village with the state's largest ski resort. Expert roofing for luxury chalets and lodges.", image: images.townVail },
  { name: "Telluride", tagline: "Historic mining town at 8,750 ft", elevation: "8,750 ft", description: "Box canyon setting with dramatic San Juan peaks. Preserving historic roofs and protecting modern mountain homes.", image: images.townTelluride },
  { name: "Crested Butte", tagline: "Wildflower capital of Colorado", elevation: "8,885 ft", description: "Colorful Victorian storefronts beneath Mt. Crested Butte. Roofing that matches the town's vibrant character.", image: images.townCrestedButte },
  { name: "Steamboat Springs", tagline: "Home of Champagne Powder", elevation: "6,732 ft", description: "Ranching heritage meets world-class skiing. Durable roofing built for Steamboat's legendary snowfall.", image: images.townSteamboat },
  { name: "Breckenridge", tagline: "Victorian charm at 9,600 ft", elevation: "9,600 ft", description: "Colorado's highest incorporated city with gold mining roots. Roofing engineered for extreme alpine conditions.", image: images.townBreckenridge },
  { name: "Winter Park", tagline: "Denver's mountain playground", elevation: "9,040 ft", description: "Gateway to the Continental Divide and Fraser Valley. Protecting homes from heavy snow loads and UV exposure.", image: images.townWinterPark },
  { name: "Durango", tagline: "Where the Old West lives on", elevation: "6,512 ft", description: "Historic narrow gauge railroad town near Mesa Verde. Roofing that honors Old West character with modern performance.", image: images.townDurango },
  { name: "Glenwood Springs", tagline: "World's largest hot springs", elevation: "5,761 ft", description: "Home of the iconic Hotel Colorado and Glenwood Canyon. Protecting properties in this natural wonderland.", image: images.townGlenwood },
  { name: "Frisco", tagline: "Gateway to Summit County", elevation: "9,097 ft", description: "Charming lakeside town on Dillon Reservoir. Hub for five ski resorts with roofing built for mountain living.", image: images.townFrisco },
  { name: "Silverthorne", tagline: "Summit County's outdoor hub", elevation: "8,790 ft", description: "Blue River fly fishing and Gore Range views. Premium roofing for mountain homes and commercial properties.", image: images.townSilverthorne },
  { name: "Central Mountains", tagline: "The heart of the Rockies", elevation: "Varies", description: "From mountain passes to alpine valleys, we serve the broader central mountain communities across Colorado.", image: images.townCentralMountains },
];

export default function Home() {
  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.heroHome}
            alt="Luxury mountain home with premium roofing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.92)] via-[oklch(0.12_0.03_260/0.75)] to-[oklch(0.12_0.03_260/0.4)]" />
        </div>

        <div className="relative container py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-1.5 mb-6"
            >
              <Shield size={14} className="text-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Licensed &amp; Insured — Serving Colorado Since 1989
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Colorado&apos;s Premier{" "}
              <span className="text-gold">Roofing</span>{" "}
              Specialists
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Expert craftsmanship meets mountain-grade durability. From Aspen to Telluride, we deliver roofing solutions built to withstand Colorado&apos;s most demanding conditions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all hover:shadow-lg hover:shadow-gold/20"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                GET YOUR FREE ESTIMATE
                <ChevronRight size={16} />
              </Link>
              <a
                href="tel:9704468995"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-gold/50 text-white hover:text-gold px-8 py-4 text-sm font-bold tracking-wide transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={16} />
                (970) 446-8995
              </a>
            </motion.div>
          </div>
        </div>

        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L1440 30V80H0Z" fill="oklch(0.12 0.03 260)" />
          </svg>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="bg-navy-dark py-12 relative z-10">
        <div className="container">
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
                <div className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.number}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="bg-navy py-24 relative">
        <div className="container">
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
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260/0.95)] via-[oklch(0.10_0.03_260/0.5)] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <service.icon size={28} className="text-gold mb-3" />
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
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.inspection} alt="Professional roof inspection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.03_260/0.95)] via-[oklch(0.12_0.03_260/0.85)] to-[oklch(0.12_0.03_260/0.7)]" />
        </div>
        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Why Alpine Peak
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Built Different. <br />
                <span className="text-gold">Built to Last.</span>
              </h2>
              <p className="text-lg text-white/60 mb-8" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                For over three decades, Alpine Peak Roofing has set the standard for roofing excellence in Colorado. Our commitment to quality craftsmanship, premium materials, and exceptional customer service has earned us the trust of thousands of homeowners and businesses across the Rocky Mountains.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all text-sm tracking-wide"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                LEARN OUR STORY <ArrowRight size={16} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Fully Licensed & Insured", desc: "Complete peace of mind with comprehensive coverage and state licensing." },
                { icon: Award, title: "Manufacturer Certified", desc: "Factory-trained installers certified by GAF, Owens Corning, and CertainTeed." },
                { icon: Users, title: "Expert Team", desc: "Highly skilled craftsmen with an average of 15+ years of experience." },
                { icon: CheckCircle2, title: "Warranty Protection", desc: "Industry-leading warranties on both materials and workmanship." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-gold/30 transition-colors"
                >
                  <item.icon size={24} className="text-gold mb-3" />
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PORTFOLIO PREVIEW ==================== */}
      <section className="bg-navy-dark py-24">
        <div className="container">
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
            {portfolioProjects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Link href={`/projects/${project.id}`} className="group block relative overflow-hidden aspect-square">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-navy py-24">
        <div className="container">
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
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 relative"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/70 mb-6 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t.author}
                  </p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t.location}
                  </p>
                </div>
                <div className="absolute top-6 right-6 text-6xl text-gold/10 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MATERIALS SECTION ==================== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.materialsDisplayBg} alt="Premium roofing materials display" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.03_260/0.88)] via-[oklch(0.12_0.03_260/0.82)] to-[oklch(0.10_0.03_260/0.92)]" />
        </div>
        <div className="relative container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="gold-line mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Premium Materials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Only the Finest Materials
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              We partner with the industry&apos;s leading manufacturers to ensure every roof we install meets the highest standards of durability, beauty, and performance. Our material selection is specifically curated for Colorado&apos;s extreme weather conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {materialsData.map((m, i) => (
              <motion.div
                key={m.slug}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Link
                  href={`/materials/${m.slug}`}
                  className="group block bg-navy-dark/70 backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260)] via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 bg-gold/90 text-navy-dark px-2 py-0.5">
                      <span className="text-[10px] font-bold tracking-wide" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.warranty}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {m.shortName}
                    </h3>
                    <p className="text-[11px] text-white/40 mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      From ${m.installedPrice.low.toFixed(2)}/sqft installed
                    </p>
                    <span className="text-gold text-[10px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all tracking-wider" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      LEARN MORE <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all text-sm tracking-wide"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              VIEW ALL SERVICES &amp; MATERIALS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SERVICE AREAS ==================== */}
      <section className="bg-navy-dark py-24">
        <div className="container">
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
                      <img
                        src={area.image}
                        alt={area.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
        </div>
      </section>
    </div>
  );
}
