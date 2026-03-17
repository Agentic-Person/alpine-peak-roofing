/**
 * /admin/estimates — Internal admin dashboard
 *
 * Shows all submitted roof estimates from Supabase.
 * Server-rendered. Uses service role key for direct DB access.
 * Not publicly linked — security by obscurity for now.
 *
 * URL: /admin/estimates
 */

import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { AdminEstimatesClient } from './AdminEstimatesClient'

export const metadata: Metadata = {
  title: 'Estimates Dashboard — Alpine Peak Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0 // always fresh

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface EstimateRow {
  id: string
  session_id: string
  created_at: string
  address: string | null
  property_type: string | null
  roof_area_sqft: number | null
  roof_complexity: string | null
  material_type: string | null
  total_amount: number | null
  subtotal: number | null
  tax_amount: number | null
  status: string | null
  expires_at: string | null
}

// ---------------------------------------------------------------------------
// Supabase admin client
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

async function getEstimates(): Promise<EstimateRow[]> {
  try {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('roof_estimates')
      .select(
        'id, session_id, created_at, address, property_type, roof_area_sqft, roof_complexity, material_type, total_amount, subtotal, tax_amount, status, expires_at'
      )
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.error('[admin/estimates] Supabase error:', error.message)
      return []
    }
    return (data ?? []) as EstimateRow[]
  } catch (err) {
    console.error('[admin/estimates] Exception:', err)
    return []
  }
}

// ---------------------------------------------------------------------------
// Stats helpers
// ---------------------------------------------------------------------------
function computeStats(rows: EstimateRow[]) {
  const total = rows.length
  const totalRevenuePipeline = rows.reduce((sum, r) => sum + (r.total_amount ?? 0), 0)
  const avgEstimate = total > 0 ? totalRevenuePipeline / total : 0
  const active = rows.filter((r) => r.status !== 'expired' && r.expires_at && new Date(r.expires_at) > new Date()).length
  const last7Days = rows.filter((r) => {
    const d = new Date(r.created_at)
    return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  }).length
  return { total, totalRevenuePipeline, avgEstimate, active, last7Days }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function AdminEstimatesPage() {
  const estimates = await getEstimates()
  const stats = computeStats(estimates)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-[#1a3a5c] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-0.5">Alpine Peak Roofing</p>
            <h1 className="text-2xl font-bold">Estimates Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>Last updated: now</span>
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">← Site</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Estimates" value={stats.total.toString()} />
          <StatCard label="Last 7 Days" value={stats.last7Days.toString()} accent />
          <StatCard label="Active (not expired)" value={stats.active.toString()} />
          <StatCard label="Avg Estimate" value={fmt(stats.avgEstimate)} />
          <StatCard label="Pipeline Total" value={fmt(stats.totalRevenuePipeline)} accent />
        </div>

        {/* Table */}
        <AdminEstimatesClient estimates={estimates} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border px-5 py-4 ${accent ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'}`}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? 'text-amber-400' : 'text-white'}`}>{value}</p>
    </div>
  )
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}
