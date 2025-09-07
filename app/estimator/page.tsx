'use client';

import { EstimatorWizard } from '@/agents/roof-estimator-agent/components/EstimatorWizard';
import { Suspense } from 'react';

export default function EstimatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-600">
                Alpine Peak Roofing
              </div>
              <div className="hidden md:block text-sm text-gray-600">
                Professional Roof Estimator
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>💍</span>
                <span>Licensed & Insured</span>
              </div>
              <a 
                href="tel:+17195550123" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                (719) 555-0123
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Free Roof Estimate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Using cutting-edge satellite imagery technology, get an instant, accurate estimate for your roof replacement project in under 30 seconds.
          </p>
        </div>

        <Suspense 
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <EstimatorWizard />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Alpine Peak Roofing</h3>
              <p className="text-gray-300 mb-4">
                Colorado's trusted roofing professionals. Licensed, bonded, and insured.
              </p>
              <div className="text-sm text-gray-400">
                License #12345 | Fully Insured
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div>📞 (719) 555-0123</div>
                <div>📧 info@alpinepeakroofing.com</div>
                <div>📍 Colorado Springs, CO</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Technology</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>🛰️ Satellite imagery analysis</div>
                <div>📏 Precise measurements</div>
                <div>💰 Instant cost calculations</div>
                <div>📄 Professional PDF estimates</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Alpine Peak Roofing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}