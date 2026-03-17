'use client'

/**
 * AdminContactsClient — interactive unified CRM table
 * Features: search, filter by stage (has estimate / lead only), sort, expandable detail row, CSV export
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { ContactRow } from './page'

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------
function exportContactsCSV(rows: ContactRow[]) {
  const headers = [
    'First Name', 'Last Name', 'Email', 'Phone', 'Address',
    'Stage', 'Lead Score', 'Priority', 'Lead Status', 'Lead Source',
    'Has Estimate', 'Estimate Total', 'Estimate Material', 'Estimate Status',
    'Estimate Date', 'Lead Created', 'Last Activity',
  ]

  const escape = (val: string | number | boolean | null | undefined) => {
    if (val == null) return ''
    const s = String(val)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }

  const csvRows = rows.map((c) => [
    c.first_name, c.last_name, c.email, c.phone, c.address,
    c.has_estimate && c.lead_id ? 'Lead + Estimate' : c.has_estimate ? 'Estimate Only' : 'Lead Only',
    c.lead_score, c.priority, c.lead_status, c.lead_source,
    c.has_estimate ? 'Yes' : 'No',
    c.estimate_total ?? '',
    c.estimate_material ?? '',
    c.estimate_status ?? '',
    c.estimate_created_at ? new Date(c.estimate_created_at).toLocaleDateString('en-US') : '',
    c.lead_created_at ? new Date(c.lead_created_at).toLocaleDateString('en-US') : '',
    new Date(c.last_activity_at).toLocaleDateString('en-US'),
  ].map(escape).join(','))

  const csv = [headers.join(','), ...csvRows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `alpine-peak-contacts-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------
function fmtDate(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function fmtDateTime(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function fmtCurrency(n: number | null | undefined) {
  if (n == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtName(c: ContactRow) {
  const name = [c.first_name, c.last_name].filter(Boolean).join(' ')
  return name || null
}

function initials(c: ContactRow) {
  const first = c.first_name?.[0] ?? ''
  const last = c.last_name?.[0] ?? ''
  if (first || last) return (first + last).toUpperCase()
  if (c.email) return c.email[0].toUpperCase()
  return '?'
}

const MATERIAL_LABELS: Record<string, string> = {
  'architectural-25': '25yr Arch',
  'architectural-30': '30yr Arch',
  'lifetime-premium': 'Lifetime',
  'standing-seam-steel': 'Standing Seam',
  'corrugated-metal': 'Corrugated',
  'asphalt-shingles': 'Asphalt',
  'architectural-shingles': 'Arch Shingles',
  'metal-roofing': 'Metal',
  'tile-roofing': 'Tile',
  'slate': 'Slate',
}

function matLabel(m: string | null) {
  if (!m) return '—'
  return MATERIAL_LABELS[m] ?? m
}

// ---------------------------------------------------------------------------
// Priority badge
// ---------------------------------------------------------------------------
function PriorityBadge({ priority }: { priority: string | null }) {
  if (!priority) return null
  const map: Record<string, string> = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${map[priority] ?? map.low}`}>
      {priority}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Score bar
// ---------------------------------------------------------------------------
function ScoreBar({ score }: { score: number | null }) {
  if (score == null) return <span className="text-gray-600 text-xs">—</span>
  const pct = Math.min(100, Math.max(0, score))
  const color = pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-gray-500'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-400">{score}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stage pill
// ---------------------------------------------------------------------------
function StagePill({ contact }: { contact: ContactRow }) {
  if (contact.has_estimate && contact.lead_id) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full border bg-green-500/20 text-green-400 border-green-500/30 font-medium">
        Lead + Estimate
      </span>
    )
  }
  if (contact.has_estimate) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30 font-medium">
        Estimate Only
      </span>
    )
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full border bg-white/10 text-gray-400 border-white/10 font-medium">
      Lead Only
    </span>
  )
}

// ---------------------------------------------------------------------------
// Expanded detail row
// ---------------------------------------------------------------------------
function ContactDetail({ contact }: { contact: ContactRow }) {
  return (
    <div className="bg-gray-900/60 border-t border-white/5 px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      {/* Lead info */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Lead Details</p>
        {contact.lead_id ? (
          <dl className="space-y-1.5">
            <DetailRow label="Lead ID" value={contact.lead_id.slice(0, 8) + '…'} />
            <DetailRow label="Source" value={contact.lead_source} />
            <DetailRow label="Status" value={contact.lead_status} />
            <DetailRow label="Session" value={contact.session_id ? contact.session_id.slice(0, 12) + '…' : null} />
            <DetailRow label="Created" value={fmtDate(contact.lead_created_at)} />
          </dl>
        ) : (
          <p className="text-gray-600 italic">No lead record</p>
        )}
      </div>

      {/* Estimate info */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Estimate Details</p>
        {contact.has_estimate && contact.estimate_id ? (
          <dl className="space-y-1.5">
            <DetailRow label="Total" value={fmtCurrency(contact.estimate_total)} highlight />
            <DetailRow label="Material" value={matLabel(contact.estimate_material)} />
            <DetailRow label="Status" value={contact.estimate_status} />
            <DetailRow label="Date" value={fmtDate(contact.estimate_created_at)} />
            <div className="pt-1">
              <Link
                href={`/estimates/${contact.estimate_id}`}
                target="_blank"
                className="text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors"
              >
                View estimate →
              </Link>
            </div>
          </dl>
        ) : (
          <p className="text-gray-600 italic">No estimate submitted</p>
        )}
      </div>

      {/* Contact info */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Contact Info</p>
        <dl className="space-y-1.5">
          <DetailRow label="Email" value={contact.email} />
          <DetailRow label="Phone" value={contact.phone} />
          <DetailRow label="Address" value={contact.address} />
          <DetailRow label="Score" value={contact.lead_score != null ? String(contact.lead_score) : null} />
          <DetailRow label="Priority" value={contact.priority} />
        </dl>
        <div className="flex gap-3 mt-3">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
              Email →
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
              Call →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, highlight }: { label: string; value: string | null | undefined; highlight?: boolean }) {
  if (!value) return null
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-gray-500 text-xs w-16 shrink-0">{label}</span>
      <span className={`text-xs ${highlight ? 'text-amber-400 font-semibold' : 'text-gray-300'} truncate`}>{value}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------
type SortKey = 'last_activity' | 'score' | 'pipeline'
type StageFilter = 'all' | 'estimate' | 'lead-only'

export function AdminContactsClient({ contacts }: { contacts: ContactRow[] }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState<StageFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('last_activity')
  const [expandedKey, setExpandedKey] = useState<string | null>(null)



  const filtered = useMemo(() => {
    let rows = contacts

    // Stage filter
    if (stageFilter === 'estimate') rows = rows.filter((c) => c.has_estimate)
    else if (stageFilter === 'lead-only') rows = rows.filter((c) => !c.has_estimate)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter((c) =>
        [c.first_name, c.last_name, c.email, c.phone, c.address, c.lead_source]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    }

    // Sort
    const sorted = [...rows]
    if (sortKey === 'score') {
      sorted.sort((a, b) => (b.lead_score ?? -1) - (a.lead_score ?? -1))
    } else if (sortKey === 'pipeline') {
      sorted.sort((a, b) => (b.estimate_total ?? 0) - (a.estimate_total ?? 0))
    } else {
      sorted.sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())
    }
    return sorted
  }, [contacts, search, stageFilter, sortKey])

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone, address…"
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-72"
        />

        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
          {(['all', 'estimate', 'lead-only'] as StageFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                stageFilter === s
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {s === 'all' ? 'All' : s === 'estimate' ? 'With Estimate' : 'Lead Only'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
          {([['last_activity', 'Recent'], ['score', 'Score'], ['pipeline', 'Pipeline']] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                sortKey === key
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-500 ml-auto">{filtered.length} contacts</span>

        <button
          onClick={() => exportContactsCSV(filtered)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all font-medium"
          title="Export visible contacts to CSV"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2.5rem_1fr_1fr_7rem_7rem_6rem_6rem] gap-4 px-4 py-3 border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider font-semibold">
          <div />
          <div>Contact</div>
          <div>Address</div>
          <div>Stage</div>
          <div>Score</div>
          <div>Pipeline</div>
          <div>Last Active</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-gray-500 text-sm">No contacts match your filters.</div>
        ) : (
          filtered.map((contact) => {
            const isExpanded = expandedKey === contact.key
            const name = fmtName(contact)
            return (
              <div key={contact.key}>
                {/* Main row */}
                <button
                  onClick={() => setExpandedKey(isExpanded ? null : contact.key)}
                  className="w-full grid grid-cols-[2.5rem_1fr_1fr_7rem_7rem_6rem_6rem] gap-4 px-4 py-3.5 border-b border-white/5 hover:bg-white/5 transition-colors text-left items-center"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#1a3a5c] border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                    {initials(contact)}
                  </div>

                  {/* Name + email */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {name ?? <span className="text-gray-500 italic">Unknown</span>}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{contact.email ?? contact.phone ?? contact.session_id?.slice(0, 12) + '…'}</p>
                  </div>

                  {/* Address */}
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 truncate">{contact.address ?? '—'}</p>
                  </div>

                  {/* Stage */}
                  <div>
                    <StagePill contact={contact} />
                  </div>

                  {/* Score */}
                  <div>
                    <ScoreBar score={contact.lead_score} />
                    {contact.priority && (
                      <div className="mt-1">
                        <PriorityBadge priority={contact.priority} />
                      </div>
                    )}
                  </div>

                  {/* Pipeline */}
                  <div>
                    <span className={`text-sm font-semibold ${contact.estimate_total ? 'text-amber-400' : 'text-gray-600'}`}>
                      {fmtCurrency(contact.estimate_total)}
                    </span>
                  </div>

                  {/* Last active */}
                  <div>
                    <span className="text-xs text-gray-400">{fmtDateTime(contact.last_activity_at)}</span>
                    <span className="text-gray-600 text-xs ml-1">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && <ContactDetail contact={contact} />}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
