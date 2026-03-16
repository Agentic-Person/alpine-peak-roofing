/**
 * /estimates/[id] — Estimate Summary Page
 *
 * Server-rendered page that fetches the estimate from Supabase and displays a
 * branded, print-friendly summary. The "Download PDF" button triggers browser
 * print → Save as PDF (no external PDF library required).
 *
 * URL is stable — emailed to homeowners via /api/webhooks/generate-pdf.
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import EstimateView from './EstimateView'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface EstimateRecord {
  id: string
  session_id: string
  created_at: string
  address: string | null
  property_type: string | null
  roof_area_sqft: number | null
  roof_pitch: number | null
  roof_complexity: string | null
  material_type: string | null
  base_price_per_sqft: number | null
  labor_cost: number | null
  material_cost: number | null
  additional_costs: Record<string, unknown> | null
  subtotal: number | null
  tax_amount: number | null
  total_amount: number | null
  status: string | null
  expires_at: string | null
}

// ---------------------------------------------------------------------------
// Supabase server client (uses service role — no cookie auth needed)
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

async function getEstimate(id: string): Promise<EstimateRecord | null> {
  try {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('roof_estimates')
      .select('*')
      .eq('session_id', id)
      .maybeSingle()
    if (error || !data) return null
    return data as EstimateRecord
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const estimate = await getEstimate(id)
  if (!estimate) {
    return { title: 'Estimate Not Found — Alpine Peak Roofing' }
  }
  const total = estimate.total_amount
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(estimate.total_amount)
    : 'Your Roof Estimate'
  return {
    title: `${total} Roof Estimate — Alpine Peak Roofing`,
    description: `Your personalized roofing estimate from Alpine Peak Roofing${estimate.address ? ` for ${estimate.address}` : ''}.`,
    robots: { index: false, follow: false }, // private estimates — no indexing
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function EstimatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const estimate = await getEstimate(id)

  if (!estimate) {
    notFound()
  }

  return <EstimateView estimate={estimate} />
}
