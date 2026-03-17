/**
 * /admin/contacts — Unified CRM view
 *
 * Joins leads + roof_estimates by session_id to show full visitor journey:
 * chat lead → estimate submitted → pipeline value.
 *
 * Server-rendered. Service-role Supabase key for direct DB access.
 * Not publicly linked.
 */

import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { AdminContactsClient } from './AdminContactsClient'

export const metadata: Metadata = {
  title: 'Contacts — Alpine Peak Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ContactRow {
  /** Unique key for this contact (email preferred, else session_id, else lead_id) */
  key: string
  session_id: string | null
  lead_id: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  lead_score: number | null
  priority: string | null
  lead_status: string | null
  lead_source: string | null
  lead_created_at: string | null
  /** Has submitted an online estimate */
  has_estimate: boolean
  estimate_id: string | null
  estimate_total: number | null
  estimate_material: string | null
  estimate_status: string | null
  estimate_created_at: string | null
  /** Most recent activity across all touchpoints */
  last_activity_at: string
}

// ---------------------------------------------------------------------------
// DB helpers
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

interface LeadRecord {
  id: string
  session_id: string | null
  created_at: string
  source: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  lead_score: number | null
  priority: string | null
  status: string | null
}

interface EstimateRecord {
  id: string
  session_id: string | null
  lead_id: string | null
  created_at: string
  address: string | null
  material_type: string | null
  total_amount: number | null
  status: string | null
}

async function getLeads(): Promise<LeadRecord[]> {
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('leads')
    .select('id, session_id, created_at, source, first_name, last_name, email, phone, address, lead_score, priority, status')
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) {
    console.error('[admin/contacts] leads error:', error.message)
    return []
  }
  return (data ?? []) as LeadRecord[]
}

async function getEstimates(): Promise<EstimateRecord[]> {
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('roof_estimates')
    .select('id, session_id, lead_id, created_at, address, material_type, total_amount, status')
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) {
    console.error('[admin/contacts] estimates error:', error.message)
    return []
  }
  return (data ?? []) as EstimateRecord[]
}

// ---------------------------------------------------------------------------
// Merge logic
// ---------------------------------------------------------------------------
function mergeContacts(leads: LeadRecord[], estimates: EstimateRecord[]): ContactRow[] {
  // Build estimate lookup by session_id and lead_id
  const estBySession = new Map<string, EstimateRecord>()
  const estByLeadId = new Map<string, EstimateRecord>()

  for (const e of estimates) {
    if (e.session_id) estBySession.set(e.session_id, e)
    if (e.lead_id) estByLeadId.set(e.lead_id, e)
  }

  // Dedup leads by email (keep highest score), falling back to session_id
  const byEmail = new Map<string, LeadRecord>()
  const noEmail: LeadRecord[] = []

  for (const lead of leads) {
    if (lead.email) {
      const existing = byEmail.get(lead.email)
      if (!existing || (lead.lead_score ?? 0) > (existing.lead_score ?? 0)) {
        byEmail.set(lead.email, lead)
      }
    } else {
      noEmail.push(lead)
    }
  }

  const dedupedLeads = [...byEmail.values(), ...noEmail]

  const contacts: ContactRow[] = dedupedLeads.map((lead) => {
    // Try to match estimate by session_id, then lead_id
    const est =
      (lead.session_id ? estBySession.get(lead.session_id) : undefined) ??
      estByLeadId.get(lead.id) ??
      undefined

    const lastActivity = [lead.created_at, est?.created_at]
      .filter(Boolean)
      .sort()
      .pop() ?? lead.created_at

    return {
      key: lead.email ?? lead.session_id ?? lead.id,
      session_id: lead.session_id,
      lead_id: lead.id,
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      address: lead.address ?? est?.address ?? null,
      lead_score: lead.lead_score,
      priority: lead.priority,
      lead_status: lead.status,
      lead_source: lead.source,
      lead_created_at: lead.created_at,
      has_estimate: !!est,
      estimate_id: est?.id ?? null,
      estimate_total: est?.total_amount ?? null,
      estimate_material: est?.material_type ?? null,
      estimate_status: est?.status ?? null,
      estimate_created_at: est?.created_at ?? null,
      last_activity_at: lastActivity,
    }
  })

  // Also include estimates with NO matching lead (direct estimator visitors)
  const matchedEstIds = new Set(contacts.map((c) => c.estimate_id).filter(Boolean))
  for (const est of estimates) {
    if (matchedEstIds.has(est.id)) continue
    contacts.push({
      key: est.session_id ?? est.id,
      session_id: est.session_id,
      lead_id: est.lead_id,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      address: est.address,
      lead_score: null,
      priority: null,
      lead_status: null,
      lead_source: 'estimator',
      lead_created_at: null,
      has_estimate: true,
      estimate_id: est.id,
      estimate_total: est.total_amount,
      estimate_material: est.material_type,
      estimate_status: est.status,
      estimate_created_at: est.created_at,
      last_activity_at: est.created_at,
    })
  }

  // Sort by last activity desc
  contacts.sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())

  return contacts
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
function computeStats(contacts: ContactRow[]) {
  const total = contacts.length
  const withEstimate = contacts.filter((c) => c.has_estimate).length
  const hot = contacts.filter((c) => c.priority === 'high').length
  const pipelineTotal = contacts.reduce((s, c) => s + (c.estimate_total ?? 0), 0)
  const last7d = contacts.filter(
    (c) => Date.now() - new Date(c.last_activity_at).getTime() < 7 * 86400_000
  ).length
  return { total, withEstimate, hot, pipelineTotal, last7d }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function AdminContactsPage() {
  const [leads, estimates] = await Promise.all([getLeads(), getEstimates()])
  const contacts = mergeContacts(leads, estimates)
  const stats = computeStats(contacts)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-[#1a3a5c] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-0.5">Alpine Peak Roofing</p>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-sm text-gray-400 mt-0.5">Unified CRM — leads + estimates joined by session</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <Link href="/admin/leads" className="hover:text-white/80 transition-colors">Leads</Link>
            <Link href="/admin/estimates" className="hover:text-white/80 transition-colors">Estimates</Link>
            <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors">← Admin</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Contacts" value={stats.total.toString()} />
          <StatCard label="Active (7d)" value={stats.last7d.toString()} accent />
          <StatCard label="With Estimate" value={stats.withEstimate.toString()} accent={stats.withEstimate > 0} />
          <StatCard label="Hot Leads 🔥" value={stats.hot.toString()} accent={stats.hot > 0} />
          <StatCard label="Pipeline" value={fmtCurrency(stats.pipelineTotal)} accent={stats.pipelineTotal > 0} />
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg mb-2">No contacts yet</p>
            <p className="text-gray-500 text-sm">
              Contacts appear once visitors interact with chat or the estimator.
            </p>
          </div>
        ) : (
          <AdminContactsClient contacts={contacts} />
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

function fmtCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}
