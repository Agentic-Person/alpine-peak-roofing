"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Heart, Target, CheckCircle2, Users } from "lucide-react";
import { images } from "@/lib/images";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

const values = [
  { icon: Shield, title: "Integrity", desc: "We do what's right, even when no one is watching. Honest assessments, fair pricing, and transparent communication." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards of craftsmanship. Every detail matters, every project is a reflection of our name." },
  { icon: Heart, title: "Community", desc: "We're not just contractors — we're your neighbors. We invest in the communities we serve and treat every home like our own." },
  { icon: Target, title: "Innovation", desc: "We stay ahead of the curve with the latest materials, techniques, and technology to deliver superior results." },
];

const certifications = [
  "GAF Master Elite Contractor",
  "Owens Corning Platinum Preferred",
  "CertainTeed SELECT ShingleMaster",
  "OSHA Safety Certified",
  "BBB A+ Accredited Business",
  "Colorado Roofing Association Member",
  "IKO Shield Pro Contractor",
  "HAAG Certified Inspector",
];

const milestones = [
  { year: "1989", title: "Foundation", color: "bg-blue-900/30 border-blue-500/30", heading: "Establishing Excellence", desc: "Alpine Peak Roofing was founded with a focus on residential roofing services in the Colorado mountains. Our commitment to quality and customer service quickly distinguished us in the competitive market. Within our first year, we completed over 100 successful projects and established partnerships with leading material manufacturers." },
  { year: "1995", title: "Commercial Expansion", color: "bg-green-900/30 border-green-500/30", heading: "Growing Our Expertise", desc: "Recognizing the need for specialized commercial roofing services, we expanded our capabilities to include flat roof systems, membrane installations, and large-scale commercial projects. This expansion included additional certifications and the development of our comprehensive maintenance program offerings." },
  { year: "2002", title: "Mountain Specialization", color: "bg-purple-900/30 border-purple-500/30", heading: "High-Altitude Expertise", desc: "We developed specialized expertise in high-altitude roofing challenges, expanding our service area to include premium mountain communities like Aspen, Vail, and Telluride. This specialization required advanced training in extreme weather roofing systems and luxury property requirements." },
  { year: "2008", title: "Industry Recognition", color: "bg-gold/10 border-gold/30", heading: "Excellence Acknowledged", desc: "Achieved GAF Master Elite status, placing us among the top 2% of roofing contractors nationwide. This recognition, combined with multiple manufacturer certifications and industry awards, solidified our reputation as Colorado's premier roofing contractor." },
  { year: "2015", title: "Emergency Services", color: "bg-red-900/30 border-red-500/30", heading: "24/7 Response Capability", desc: "Launched our comprehensive 24/7 emergency response program, providing immediate assistance for storm damage, emergency leaks, and urgent roofing issues. This service expansion included specialized equipment, emergency response protocols, and dedicated emergency response teams." },
  { year: "2024", title: "Digital Innovation", color: "bg-navy border-white/10", heading: "Technology Integration", desc: "Implemented advanced digital tools including drone inspections, 3D modeling, and AI-powered project management. These innovations enhance accuracy, improve customer communication, and streamline the entire roofing process from initial assessment through project completion." },
];

const teamMembers = [
  { name: "James Mitchell", role: "Founder & CEO", exp: "35+ years", bio: "Founded Alpine Peak in 1989 with a vision to bring premium roofing to Colorado's mountain communities. A Master Roofer and OSHA safety instructor, James established Alpine Peak with a vision of elevating industry standards across Colorado." },
  { name: "Sarah Donovan", role: "Director of Operations", exp: "20+ years", bio: "Oversees all project management and ensures every installation meets our exacting quality standards. PMP certified with expertise in high-altitude construction and quality management systems." },
  { name: "Marcus Rivera", role: "Lead Project Manager", exp: "18+ years", bio: "Master craftsman and GAF-certified installer who leads our most complex residential and commercial projects. Dedicated to exceptional customer experiences and industry-leading satisfaction ratings." },
];

const communityPrograms = [
  {
    title: "Veterans Support Program",
    desc: "We honor our veterans through special discounts, priority emergency services, and partnerships with veteran organizations. Our \"Roofs for Heroes\" program provides assistance to veterans in need of roofing repairs.",
    items: ["15% veteran discount on all services", "Priority emergency response", "Annual pro-bono veteran projects"],
  },
  {
    title: "Local Education Support",
    desc: "We support Colorado's educational institutions through scholarships, career education programs, and facility maintenance assistance. Our partnerships with local schools help develop the next generation of skilled construction professionals.",
    items: ["Annual trade scholarship program", "High school career presentations", "Technical training partnerships"],
  },
  {
    title: "Environmental Stewardship",
    desc: "Our commitment to Colorado's natural beauty includes sustainable business practices, material recycling programs, and support for environmental conservation initiatives throughout our mountain communities.",
    items: ["95% material recycling rate", "Energy-efficient business operations", "Colorado conservation partnerships"],
  },
];

export default function AboutAnimatedSections() {
  return (
    <>
      {/* Our Story */}
      <section className="bg-navy-dark py-24" id="our-story">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                From Humble Beginnings to Colorado&apos;s Premier Roofer
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                <p>Alpine Peak Roofing was founded in 1989 by a team of passionate craftsmen who believed that Colorado homeowners deserved better. Better materials, better workmanship, and better service than what was available at the time.</p>
                <p>Starting with a single truck and a commitment to excellence, we built our reputation one roof at a time. Word spread through the mountain communities — from Vail to Aspen, Telluride to Steamboat Springs — that Alpine Peak was the name to trust.</p>
                <p>Today, we&apos;re proud to be one of Colorado&apos;s largest and most respected roofing companies, with a team of over 50 certified professionals and thousands of completed projects across the state. But our values haven&apos;t changed: every project gets the same attention to detail and commitment to quality that built our reputation over three decades ago.</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="relative"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image src={images.aboutOffice} alt="Alpine Peak Roofing office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 hidden lg:block">
                <div className="text-4xl font-bold text-navy-dark" style={{ fontFamily: "'Playfair Display', serif" }}>35+</div>
                <div className="text-sm text-navy-dark/70 font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-24" id="our-values">
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
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Values</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Principles That Guide Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 text-center hover:border-gold/30 transition-colors"
              >
                <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-navy-dark py-24" id="certifications">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="relative"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image src={images.residentialWork} alt="Professional roofing work on Colorado home" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
            >
              <div className="gold-line mb-4" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Certifications &amp; Partnerships</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Industry-Leading Credentials
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Our certifications represent thousands of hours of training, rigorous quality standards, and a commitment to staying at the forefront of roofing technology. Direct partnerships with leading manufacturers ensure access to the latest roofing technologies and extended warranty protections.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span className="text-sm text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="bg-navy py-24" id="milestones">
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
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Journey</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Company Milestones &amp; Growth
            </h2>
            <p className="text-white/60 mt-4 text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Our journey from a small local contractor to Colorado&apos;s premier roofing company reflects our unwavering commitment to excellence, continuous innovation, and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`border p-8 ${m.color}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>{m.year}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{m.title}</h3>
                    <p className="text-gold text-xs font-semibold" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.heading}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-navy-dark py-24" id="team">
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
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Our Team</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet the Experts
            </h2>
            <p className="text-lg text-white/60" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Our leadership team brings decades of combined experience in roofing, construction management, and customer service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors"
              >
                <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mb-4">
                  <Users size={28} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
                <p className="text-gold text-sm font-medium mb-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.role}</p>
                <p className="text-white/40 text-xs mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.exp} experience</p>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Programs */}
      <section className="bg-navy py-24" id="community">
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
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Community Commitment</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Community &amp; Social Responsibility
            </h2>
            <p className="text-white/60 mt-4 text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              As a Colorado-based company, we&apos;re deeply committed to giving back to the communities we serve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {communityPrograms.map((prog, i) => (
              <motion.div
                key={prog.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{prog.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{prog.desc}</p>
                <ul className="space-y-2">
                  {prog.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-24">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <div className="gold-line mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Experience the Alpine Peak Difference
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Join thousands of satisfied Colorado homeowners and businesses who trust Alpine Peak Roofing for their most important investment. Contact us today to discover why we&apos;re Colorado&apos;s premier roofing contractor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark px-8 py-4 text-sm font-bold tracking-wide transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                GET YOUR FREE ESTIMATE
              </Link>
              <a
                href="tel:9704561176"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-gold/50 text-white hover:text-gold px-8 py-4 text-sm font-bold tracking-wide transition-all"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                (970) 456-1176
              </a>
            </div>
            <p className="mt-6 text-sm text-white/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Licensed &amp; Insured • GAF Master Elite • OSHA Safety Certified • BBB A+ • Available 24/7
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
