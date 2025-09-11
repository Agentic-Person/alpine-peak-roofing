'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Shield, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BlogHero() {
  const scrollToFeatured = () => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="blog-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900"></div>
      
      {/* Mountain Silhouette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Award className="h-4 w-4 text-blue-400" />
            <span className="text-blue-200 text-sm font-medium">Colorado's Premier Roofing Experts</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Expert Roofing Insights for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Colorado Mountain Homes
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover professional roofing solutions, maintenance tips, and expert advice 
            tailored for Colorado's unique mountain climate challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={scrollToFeatured}
            >
              Explore Expert Articles
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm"
            >
              Get Free Estimate
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-white">25+</span>
              </div>
              <p className="text-slate-300">Years of Colorado Experience</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-white">5,000+</span>
              </div>
              <p className="text-slate-300">Roofs Protected</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-white">100%</span>
              </div>
              <p className="text-slate-300">Customer Satisfaction</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button 
            onClick={scrollToFeatured}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowDown className="h-6 w-6 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}