/**
 * /admin/leads - Website leads dashboard
 *
 * Shows all captured leads from chat, estimator, and other website sources.
 * Server-rendered. Uses service role key for direct DB access.
 * Not publicly linked.
 */

import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { AdminLeadsClient } from './AdminLeadsClient'

export const metadata: Metadata = {
  title: 'Leads Dashboard - Alpine Peak Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface LeadRow {
  id: string
  created_at: string
  source: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  project_type: string | null
  timeline: string | null
  budget_range: string | null
  lead_score: number | null
  priority: string | null
  status: string | null
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

async function getLeads(): Promise<LeadRow[]> {
  try {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('leads')
      .select(
        'id, created_at, source, first_name, last_name, email, phone, address, project_type, timeline, budget_range, lead_score, priority, status'
      )
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) {
      console.error('[admin/leads] Supabase error:', error.message)
      // Try legacy schema fallback
      const { data: legacy, error: legacyErr } = await db
        .from('leads')
        .select('id, created_at, source, email, phone, lead_score, priority, status')
        .order('created_at', { ascending: false })
        .limit(500)
      if (legacyErr) return []
      return (legacy ?? []).map(r => ({
        ...r,
        first_name: null,
        last_name: null,
        address: null,
        project_type: null,
        timeline: null,
        budget_range: null,
        source: r.source ?? (r as Record<string, unknown>).lead_source ?? null,
      })) as LeadRow[]
    }
    return (data ?? []) as LeadRow[]
  } catch (err) {
    console.error('[admin/leads] Exception:', err)
    return []
  }
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
function computeStats(rows: LeadRow[]) {
  const total = rows.length
  const hot = rows.filter(r => r.priority === 'high').length
  const avgScore = total > 0
    ? Math.round(rows.reduce((s, r) => s + (r.lead_score ?? 0), 0) / total)
    : 0
  const last7d = rows.filter(r => Date.now() - new Date(r.created_at).getTime() < 7 * 86400_000).length
  const last24h = rows.filter(r => Date.now() - new Date(r.created_at).getTime() < 86400_000).length
  return { total, hot, avgScore, last7d, last24h }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function AdminLeadsPage() {
  const leads = await getLeads()
  const stats = computeStats(leads)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-[#1a3a5c] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-0.5">Alpine Peak Roofing</p>
            <h1 className="text-2xl font-bold">Leads Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors">← Admin</Link>
            <Link href="/" className="text-white/40 hover:text-white/60 transition-colors">Site →</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Leads" value={stats.total.toString()} />
          <StatCard label="Last 24h" value={stats.last24h.toString()} accent />
          <StatCard label="Last 7 Days" value={stats.last7d.toString()} />
          <StatCard label="Hot Leads 🔥" value={stats.hot.toString()} accent={stats.hot > 0} />
          <StatCard label="Avg Score" value={`${stats.avgScore}/100`} />
        </div>

        {leads.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg mb-2">No leads yet</p>
            <p className="text-gray-500 text-sm">
              Leads will appear here once visitors interact with the chat or estimator.
            </p>
          </div>
        ) : (
          <AdminLeadsClient leads={leads} />
        )}
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
