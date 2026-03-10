'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { residentialServices } from '@/lib/servicesData';
import { ArrowRight, ChevronLeft, Phone, Shield, Award, Clock } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';

export default function ResidentialServices() {
  return (
    <div className="bg-[#0a1628]">
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Residential', url: '/services/residential' }]} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={residentialServices[0].heroImage}
            alt="Residential roofing services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-24">
          <Link href="/services" className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#d4b65c] text-sm font-medium mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Residential</span>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-white font-bold mt-3 mb-6">
              Residential Roofing<br />Services
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Your home is your most valuable asset. We protect it with premium materials, expert installation,
              and comprehensive warranties. Whether you need a complete replacement or a simple repair, our
              residential team delivers exceptional results every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Our Services</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3 mb-4">
              Complete Residential Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From emergency repairs to full roof replacements, we offer every residential roofing service
              your Colorado mountain home needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residentialServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/services/residential/${service.slug}`}>
                  <div className="group relative bg-[#0f2035] rounded-xl overflow-hidden border border-[#1a3050] hover:border-[#c9a84c]/50 transition-all duration-500 cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2035] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl text-white font-bold mb-3 group-hover:text-[#c9a84c] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {service.tagline}
                      </p>
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0f2035]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#c9a84c] text-sm font-semibold tracking-[0.2em] uppercase">Why Alpine Peak</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold mt-3">
              The Mountain Roofing Experts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Licensed & Insured', desc: 'Fully licensed, bonded, and insured for residential roofing in all Colorado mountain communities.' },
              { icon: Award, title: 'Certified Installers', desc: 'Factory-certified by leading manufacturers including GAF, CertainTeed, and major metal roofing brands.' },
              { icon: Clock, title: '24/7 Emergency', desc: "Round-the-clock emergency response for active leaks and storm damage. We're always here when you need us." },
              { icon: Phone, title: 'Free Estimates', desc: 'Comprehensive roof inspections and detailed estimates at no cost. Transparent pricing with no hidden fees.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8953f] rounded-2xl p-12 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#0a1628] font-bold mb-4">
              Ready to Protect Your Home?
            </h2>
            <p className="text-[#0a1628]/80 max-w-2xl mx-auto mb-8">
              Contact us today for a free inspection and estimate. Our residential roofing experts will assess
              your needs and recommend the best solution for your mountain home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[#0a1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a1628]/90 transition-colors inline-flex items-center gap-2">
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
