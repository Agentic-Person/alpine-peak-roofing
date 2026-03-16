'use client'

/**
 * EstimateView — Client component
 *
 * Renders a branded, print-friendly estimate summary.
 * "Download PDF" triggers window.print() → user can Save as PDF.
 * Includes a "Schedule Consultation" CTA that links to Calendly.
 */

import { useState } from 'react'
import { CheckCircle, Printer, Calendar, Phone, MapPin, Clock, Shield, Star } from 'lucide-react'
import type { EstimateRecord } from './page'

const CALENDLY_URL = 'https://calendly.com/jimmy-agenticpersonnel/30min'
const PHONE = '(970) 456-1176'

const MATERIAL_LABELS: Record<string, string> = {
  'architectural-25': '25-Year Architectural Shingles',
  'architectural-30': '30-Year Architectural Shingles',
  'lifetime-premium': 'Lifetime Premium Shingles',
  'standing-seam-steel': 'Standing Seam Steel',
  'corrugated-metal': 'Corrugated Metal Panels',
}

const WARRANTY_MAP: Record<string, string> = {
  'architectural-25': '25 years',
  'architectural-30': '30 years',
  'lifetime-premium': 'Lifetime',
  'standing-seam-steel': '40 years',
  'corrugated-metal': '25 years',
}

function fmt(n: number | null | undefined) {
  if (n == null) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return 'N/A'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface CostSection {
  primary?: number
  underlayment?: number
  flashing?: number
  ridgeVent?: number
  accessories?: number
  total?: number
}

export default function EstimateView({ estimate }: { estimate: EstimateRecord }) {
  const [printing, setPrinting] = useState(false)

  const materialLabel = MATERIAL_LABELS[estimate.material_type ?? ''] ?? (estimate.material_type ?? 'Selected Material')
  const warranty = WARRANTY_MAP[estimate.material_type ?? ''] ?? 'N/A'
  const additionalCosts = estimate.additional_costs as Record<string, CostSection> | null
  const laborCosts = additionalCosts?.laborCosts as CostSection | null
  const materialCostsBreakdown = additionalCosts?.materialCosts as CostSection | null
  const addCosts = additionalCosts?.additionalCosts as CostSection | null

  const handlePrint = () => {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 100)
  }

  const isExpired = estimate.expires_at ? new Date(estimate.expires_at) < new Date() : false

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { background: white !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* ── Header ── */}
          <div className="bg-[#1a3a5c] text-white rounded-t-2xl p-8 print:rounded-none">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                  Alpine Peak Roofing
                </p>
                <h1 className="text-3xl font-bold font-serif">Roof Replacement Estimate</h1>
                {estimate.address && (
                  <div className="flex items-center gap-1.5 mt-2 text-white/70 text-sm">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{estimate.address}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60 uppercase tracking-wider">Estimate #</p>
                <p className="text-lg font-mono font-bold">{estimate.session_id}</p>
                <p className="text-xs text-white/60 mt-1">{fmtDate(estimate.created_at)}</p>
              </div>
            </div>

            {/* Status badge */}
            {isExpired ? (
              <div className="mt-4 inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 text-red-300 rounded-full px-3 py-1 text-xs font-medium">
                Estimate Expired
              </div>
            ) : (
              <div className="mt-4 inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full px-3 py-1 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Valid until {fmtDate(estimate.expires_at)}
              </div>
            )}
          </div>

          {/* ── Total Hero ── */}
          <div className="bg-amber-400 px-8 py-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-amber-900">Total Estimate</p>
              <p className="text-4xl font-bold text-[#1a3a5c]">{fmt(estimate.total_amount)}</p>
            </div>
            <div className="text-right text-amber-900 text-sm space-y-0.5">
              <p>Includes all labor, materials &amp; permits</p>
              <p>Colorado sales tax (4.9%) applied</p>
            </div>
          </div>

          {/* ── Project Details ── */}
          <div className="bg-white border border-gray-200 px-8 py-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">Project Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Roof Area</p>
                <p className="font-semibold text-gray-900">
                  {estimate.roof_area_sqft ? `${estimate.roof_area_sqft.toLocaleString()} sq ft` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Material</p>
                <p className="font-semibold text-gray-900">{materialLabel}</p>
              </div>
              <div>
                <p className="text-gray-500">Warranty</p>
                <p className="font-semibold text-gray-900">{warranty}</p>
              </div>
              <div>
                <p className="text-gray-500">Complexity</p>
                <p className="font-semibold text-gray-900 capitalize">{estimate.roof_complexity ?? 'Standard'}</p>
              </div>
              {estimate.roof_pitch && (
                <div>
                  <p className="text-gray-500">Roof Pitch</p>
                  <p className="font-semibold text-gray-900">{estimate.roof_pitch}:12</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Property Type</p>
                <p className="font-semibold text-gray-900 capitalize">{estimate.property_type ?? 'Residential'}</p>
              </div>
            </div>
          </div>

          {/* ── Cost Breakdown ── */}
          <div className="bg-white border border-gray-200 border-t-0 px-8 py-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">Cost Breakdown</h2>

            <div className="space-y-3 text-sm">
              {/* Materials */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Materials ({materialLabel})</span>
                <span className="font-semibold text-gray-900">
                  {materialCostsBreakdown?.total != null ? fmt(materialCostsBreakdown.total) : fmt(estimate.material_cost)}
                </span>
              </div>

              {/* Material sub-items */}
              {materialCostsBreakdown && (
                <>
                  {materialCostsBreakdown.underlayment ? (
                    <div className="flex justify-between items-center py-1 pl-4 text-gray-500">
                      <span>Underlayment</span>
                      <span>{fmt(materialCostsBreakdown.underlayment)}</span>
                    </div>
                  ) : null}
                  {materialCostsBreakdown.flashing ? (
                    <div className="flex justify-between items-center py-1 pl-4 text-gray-500">
                      <span>Flashing &amp; Trim</span>
                      <span>{fmt(materialCostsBreakdown.flashing)}</span>
                    </div>
                  ) : null}
                  {materialCostsBreakdown.ridgeVent ? (
                    <div className="flex justify-between items-center py-1 pl-4 text-gray-500">
                      <span>Ridge Vent System</span>
                      <span>{fmt(materialCostsBreakdown.ridgeVent)}</span>
                    </div>
                  ) : null}
                </>
              )}

              {/* Labor */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Labor &amp; Installation</span>
                <span className="font-semibold text-gray-900">
                  {laborCosts?.total != null ? fmt(laborCosts.total) : fmt(estimate.labor_cost)}
                </span>
              </div>

              {/* Permits / Disposal / Delivery */}
              {addCosts?.total ? (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Permits, Disposal &amp; Delivery</span>
                  <span className="font-semibold text-gray-900">{fmt(addCosts.total)}</span>
                </div>
              ) : null}

              {/* Subtotal */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-medium text-gray-900">{fmt(estimate.subtotal)}</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Colorado Sales Tax (4.9%)</span>
                <span className="text-gray-900">{fmt(estimate.tax_amount)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3 mt-2">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <span className="font-bold text-[#1a3a5c] text-xl">{fmt(estimate.total_amount)}</span>
              </div>

              {estimate.roof_area_sqft && estimate.total_amount ? (
                <p className="text-xs text-gray-400 text-right">
                  ≈ {fmt(estimate.total_amount / estimate.roof_area_sqft)}/sq ft installed
                </p>
              ) : null}
            </div>
          </div>

          {/* ── What's Included ── */}
          <div className="bg-white border border-gray-200 border-t-0 px-8 py-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">What&apos;s Included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                'Complete tear-off of existing roofing',
                'Installation of ice & water shield',
                'Synthetic underlayment throughout',
                'All flashing replaced (valleys, pipes, walls)',
                'Ridge vent system for proper airflow',
                'Haul-away and disposal of debris',
                'Building permit (where required)',
                'Final inspection walkthrough',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Why Alpine Peak ── */}
          <div className="bg-white border border-gray-200 border-t-0 px-8 py-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">Why Alpine Peak</h2>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1a3a5c]" />
                </div>
                <p className="font-semibold text-gray-900">Licensed &amp; Insured</p>
                <p className="text-gray-500 text-xs">Fully licensed, bonded, and insured in Colorado</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <p className="font-semibold text-gray-900">5-Star Rated</p>
                <p className="text-gray-500 text-xs">Consistently 5-star reviews from local homeowners</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Fast Turnaround</p>
                <p className="text-gray-500 text-xs">Most jobs completed in 1–3 days</p>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="no-print bg-[#1a3a5c] text-white rounded-b-2xl px-8 py-8">
            <h2 className="text-xl font-bold font-serif mb-2">Ready to move forward?</h2>
            <p className="text-white/70 text-sm mb-6">
              This estimate is valid for 30 days. Schedule a free consultation to lock in your price and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#1a3a5c] font-bold py-3 px-6 rounded-lg transition-colors text-sm"
              >
                <Calendar className="w-4 h-4" />
                Schedule Free Consultation
              </a>
              <a
                href={`tel:${PHONE.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
              <button
                onClick={handlePrint}
                disabled={printing}
                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm"
              >
                <Printer className="w-4 h-4" />
                {printing ? 'Opening Print...' : 'Save as PDF'}
              </button>
            </div>
          </div>

          {/* Print footer */}
          <div className="hidden print:block mt-8 text-center text-xs text-gray-400">
            <p>Alpine Peak Roofing · {PHONE} · alpinepeakroofing.com</p>
            <p>Licensed, Bonded &amp; Insured · Colorado</p>
            <p className="mt-1">Estimate #{estimate.session_id} · Generated {fmtDate(estimate.created_at)} · Valid until {fmtDate(estimate.expires_at)}</p>
          </div>

        </div>
      </div>
    </>
  )
}
