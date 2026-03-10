'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getServiceBySlug, getRelatedServices } from '@/lib/servicesData';
import { ServiceSchema, FAQSchema, BreadcrumbSchema, ReviewSchema } from '@/components/SchemaMarkup';
import { getTestimonialsByService } from '@/lib/testimonials';
import { trackServiceView, trackEstimateRequest } from '@/lib/ga4';
import { locations } from '@/lib/locations';
import { MapPin } from 'lucide-react';
import {
  ArrowRight, ChevronLeft, Phone, CheckCircle, ChevronRight,
  Layers, Wrench, Shield, Droplets, Wind, Sun, Building2,
  Thermometer, Leaf, AlertTriangle, Snowflake, PaintBucket
} from 'lucide-react';
import { useEffect } from 'react';

const iconMap: Record<string, React.ElementType> = {
  Layers, Wrench, Shield, Droplets, Wind, Sun, Building2,
  Thermometer, Leaf, AlertTriangle, Snowflake, PaintBucket,
};

export default function CommercialServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  const serviceTestimonials = getTestimonialsByService(slug);

  useEffect(() => {
    if (service) {
      trackServiceView(service.title, service.category);
    }
  }, [service]);

  if (!service || service.category !== 'commercial') {
    return (
      <div className="bg-[#0a1628] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-3xl text-white font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/services/commercial">
            <button className="bg-[#c9a84c] text-[#0a1628] px-6 py-3 rounded-lg font-semibold">
              Back to Commercial Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Layers;
  const relatedServices = getRelatedServices(service.relatedServices);

  return (
    <div className="bg-[#0a1628]">
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        image={service.heroImage}
        url={`/services/commercial/${service.slug}`}
        category="Commercial Roofing"
      />
      <FAQSchema faqs={service.faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Commercial', url: '/services/commercial' },
        { name: service.title, url: `/services/commercial/${service.slug}` },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/75 to-[#0a1628]/30" />
        </div>
        <div className="container relative z-10 py-24">
          <Link href="/services/commercial" className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#d4b65c] text-sm font-medium mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Commercial Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-[#c9a84c]" />
              </div>
              <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Commercial</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
              {service.title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{service.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="font-['Playfair_Display'] text-3xl text-white font-bold mb-6">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-12">
                <h3 className="font-['Playfair_Display'] text-2xl text-white font-bold mb-6">What&apos;s Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#0f2035] rounded-lg p-4 border border-[#1a3050]">
                      <CheckCircle className="w-5 h-5 text-[#c9a84c] mt-0.5 shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="bg-[#0f2035] rounded-xl p-6 border border-[#1a3050] sticky top-24">
                <h3 className="font-['Playfair_Display'] text-xl text-white font-bold mb-4">Get Started Today</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Contact us for a free consultation and estimate. Our experts will assess your needs and recommend the best solution.
                </p>
                <div className="space-y-3">
                  <Link href="/contact">
                    <button className="w-full bg-[#c9a84c] text-[#0a1628] px-6 py-3 rounded-lg font-semibold hover:bg-[#d4b65c] transition-colors inline-flex items-center justify-center gap-2">
                      Free Estimate
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <a href="tel:9704468995" className="w-full border border-[#c9a84c] text-[#c9a84c] px-6 py-3 rounded-lg font-semibold hover:bg-[#c9a84c]/10 transition-colors inline-flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    (970) 446-8995
                  </a>
                </div>

                {service.materials && service.materials.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#1a3050]">
                    <h4 className="text-white font-semibold text-sm mb-3">Materials We Use</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.materials.map((mat, i) => (
                        <span key={i} className="bg-[#c9a84c]/10 text-[#c9a84c] text-xs px-3 py-1 rounded-full">{mat}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Our Process</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">How It Works</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#0a1628] font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  {i < service.process.length - 1 && (
                    <div className="w-px h-full bg-[#c9a84c]/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-white font-semibold text-lg mb-2">{step.step}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Benefits</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">Why Choose This Service</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0f2035] rounded-xl p-6 border border-[#1a3050]"
              >
                <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">FAQ</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-[#0a1628] rounded-xl border border-[#1a3050] overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-white font-semibold pr-4">{faq.question}</h3>
                  <ChevronRight className="w-5 h-5 text-[#c9a84c] shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Related Services</span>
              <h2 className="font-['Playfair_Display'] text-3xl text-white font-bold mt-3">You May Also Need</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/services/${related.category}/${related.slug}`}>
                    <div className="group bg-[#0f2035] rounded-xl overflow-hidden border border-[#1a3050] hover:border-[#c9a84c]/50 transition-all cursor-pointer">
                      <div className="h-40 overflow-hidden">
                        <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="p-5">
                        <span className="text-[#c9a84c] text-xs font-semibold tracking-wider uppercase">{related.category}</span>
                        <h3 className="text-white font-semibold mt-1 group-hover:text-[#c9a84c] transition-colors">{related.title}</h3>
                        <div className="flex items-center gap-1 text-[#c9a84c] text-sm mt-3 font-medium">
                          Learn More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Testimonials */}
      {serviceTestimonials.length > 0 && (
        <section className="py-16 bg-[#0f2035]">
          <div className="container">
            <ReviewSchema
              serviceName={service.title}
              serviceUrl={`/services/commercial/${service.slug}`}
              reviews={serviceTestimonials.map(t => ({
                name: t.name,
                location: t.location,
                rating: t.rating,
                date: t.date,
                text: t.text,
              }))}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Testimonials</span>
              <h2 className="font-['Playfair_Display'] text-3xl text-white font-bold mt-3">What Our Clients Say</h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Real reviews from Colorado businesses who chose Alpine Peak Roofing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTestimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0a1628] border border-[#1a3050] rounded-xl p-6 relative"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className={`w-5 h-5 ${si < testimonial.rating ? 'text-[#c9a84c]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="border-t border-[#1a3050] pt-4">
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{testimonial.location}</p>
                    {testimonial.projectType && (
                      <p className="text-[#c9a84c] text-xs mt-1">{testimonial.projectType}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Areas */}
      <section className="py-16 bg-[#0a1628]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Service Areas</span>
            <h2 className="font-['Playfair_Display'] text-3xl text-white font-bold mt-3">
              Available Across Colorado&apos;s Mountain Communities
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Our {service.title.toLowerCase()} services are available in all our mountain service areas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/locations/${loc.slug}`}>
                  <div className="group bg-[#0f2035] border border-[#1a3050] hover:border-[#c9a84c]/50 rounded-lg p-4 text-center transition-all cursor-pointer hover:bg-[#0f2035]/80">
                    <MapPin className="w-4 h-4 text-[#c9a84c] mx-auto mb-2" />
                    <span className="text-white text-sm font-medium group-hover:text-[#c9a84c] transition-colors block">{loc.name}</span>
                    <span className="text-gray-500 text-xs mt-1 block">{loc.elevation}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8953f] rounded-2xl p-12 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#0a1628] font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[#0a1628]/80 max-w-2xl mx-auto mb-8">
              Contact Alpine Peak Roofing today for a free consultation. Our experts will assess your needs
              and provide a detailed, transparent estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button
                  onClick={() => trackEstimateRequest('service_detail', 'commercial')}
                  className="bg-[#0a1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/90 transition-colors inline-flex items-center gap-2"
                >
                  Schedule Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a href="tel:9704468995" className="border-2 border-[#0a1628] text-[#0a1628] px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/10 transition-colors inline-flex items-center gap-2 justify-center">
                <Phone className="w-4 h-4" />
                Call (970) 446-8995
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
