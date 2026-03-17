'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { LeadRow } from './page'

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------
function exportLeadsCSV(rows: LeadRow[]) {
  const headers = [
    'First Name', 'Last Name', 'Email', 'Phone', 'Address',
    'Source', 'Project Type', 'Timeline', 'Budget Range', 'Score', 'Priority', 'Status',
    'Created At',
  ]

  const escape = (val: string | number | null | undefined) => {
    if (val == null) return ''
    const s = String(val)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }

  const csvRows = rows.map((r) => [
    r.first_name, r.last_name, r.email, r.phone, r.address,
    r.source, r.project_type, r.timeline, r.budget_range,
    r.lead_score, r.priority, r.status,
    new Date(r.created_at).toLocaleDateString('en-US'),
  ].map(escape).join(','))

  const csv = [headers.join(','), ...csvRows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `alpine-peak-leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const PRIORITY_COLORS: Record<string, string> = {
  high:   'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low:    'bg-gray-500/20 text-gray-400 border-gray-500/30',
  normal: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

function fmt(dt: string) {
  return new Date(dt).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

export function AdminLeadsClient({ leads }: { leads: LeadRow[] }) {
  const [q, setQ] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [sortField, setSortField] = useState<'created_at' | 'lead_score'>('created_at')

  const sources = useMemo(() => {
    const s = new Set<string>()
    leads.forEach(l => { if (l.source) s.add(l.source) })
    return Array.from(s).sort()
  }, [leads])

  const filtered = useMemo(() => {
    let rows = [...leads]
    if (q) {
      const lq = q.toLowerCase()
      rows = rows.filter(r =>
        r.email?.toLowerCase().includes(lq) ||
        r.first_name?.toLowerCase().includes(lq) ||
        r.last_name?.toLowerCase().includes(lq) ||
        r.phone?.includes(lq) ||
        r.address?.toLowerCase().includes(lq)
      )
    }
    if (priorityFilter) rows = rows.filter(r => r.priority === priorityFilter)
    if (sourceFilter) rows = rows.filter(r => r.source === sourceFilter)
    rows.sort((a, b) => {
      if (sortField === 'lead_score') return (b.lead_score ?? 0) - (a.lead_score ?? 0)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    return rows
  }, [leads, q, priorityFilter, sourceFilter, sortField])

  const hotCount = filtered.filter(r => r.priority === 'high').length

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="search"
          placeholder="Search name, email, phone, address…"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 w-72 focus:outline-none focus:border-amber-500/50"
        />
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All Priorities</option>
          <option value="high">High / Hot</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </select>
        <select
          value={sourceFilter}
          onChange={e => setSourceFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All Sources</option>
          {sources.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={sortField}
          onChange={e => setSortField(e.target.value as 'created_at' | 'lead_score')}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
        >
          <option value="created_at">Sort: Newest</option>
          <option value="lead_score">Sort: Score</option>
        </select>
        <span className="ml-auto text-sm text-gray-400">
          {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
          {hotCount > 0 && <span className="ml-2 text-red-400 font-semibold">🔥 {hotCount} hot</span>}
        </span>

        <button
          onClick={() => exportLeadsCSV(filtered)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all font-medium"
          title="Export visible leads to CSV"
        >
          ⬇ Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No leads match your filters.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wide">
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Project</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Captured</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">
                      {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || <span className="text-gray-500 italic">Anonymous</span>}
                    </div>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="text-amber-400 hover:underline text-xs">
                        {lead.email}
                      </a>
                    )}
                    {lead.phone && <div className="text-xs text-gray-400">{lead.phone}</div>}
                    {lead.address && <div className="text-xs text-gray-500 truncate max-w-[200px]">{lead.address}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-white/5 border border-white/10 rounded px-2 py-0.5 text-gray-300">
                      {lead.source ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-xs">
                    <div>{lead.project_type ?? '—'}</div>
                    {lead.timeline && <div className="text-gray-500">{lead.timeline}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden"
                        title={`Score: ${lead.lead_score ?? 0}`}
                      >
                        <div
                          className={`h-full rounded-full ${(lead.lead_score ?? 0) >= 70 ? 'bg-red-400' : (lead.lead_score ?? 0) >= 40 ? 'bg-amber-400' : 'bg-gray-400'}`}
                          style={{ width: `${lead.lead_score ?? 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{lead.lead_score ?? 0}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_COLORS[lead.priority ?? 'low'] ?? PRIORITY_COLORS.low}`}>
                      {lead.priority ?? 'low'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400 capitalize">{lead.status ?? 'new'}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {fmt(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-600 text-right">
        {filtered.length} leads shown · <Link href="/admin" className="text-amber-400 hover:underline">← Admin Hub</Link>
      </div>
    </div>
  )
}
