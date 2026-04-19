"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const }
  })
};

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

export default function TestimonialsGrid() {
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
    </>
  );
}
