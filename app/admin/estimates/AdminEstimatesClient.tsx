'use client'

/**
 * AdminEstimatesClient — interactive table with filter + sort
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { EstimateRow } from './page'

const MATERIAL_LABELS: Record<string, string> = {
  'architectural-25': '25-yr Arch',
  'architectural-30': '30-yr Arch',
  'lifetime-premium': 'Lifetime Premium',
  'standing-seam-steel': 'Standing Seam',
  'corrugated-metal': 'Corrugated Metal',
  'asphalt-shingles': 'Asphalt',
  'architectural-shingles': 'Arch Shingles',
  'metal-roofing': 'Metal',
  'tile-roofing': 'Tile',
  'slate': 'Slate',
}

function fmt(n: number | null | undefined) {
  if (n == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function fmtDateShort(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isExpired(row: EstimateRow) {
  if (!row.expires_at) return false
  return new Date(row.expires_at) < new Date()
}

type SortField = 'created_at' | 'total_amount' | 'roof_area_sqft'
type SortDir = 'asc' | 'desc'

export function AdminEstimatesClient({ estimates }: { estimates: EstimateRow[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all')
  const [materialFilter, setMaterialFilter] = useState('all')
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // Unique materials for filter
  const materials = useMemo(() => {
    const set = new Set(estimates.map((e) => e.material_type ?? 'unknown'))
    return Array.from(set).filter(Boolean)
  }, [estimates])

  const filtered = useMemo(() => {
    let rows = estimates

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        (r) =>
          r.address?.toLowerCase().includes(q) ||
          r.session_id?.toLowerCase().includes(q) ||
          r.id?.toLowerCase().includes(q)
      )
    }

    // Status
    if (statusFilter === 'active') {
      rows = rows.filter((r) => !isExpired(r))
    } else if (statusFilter === 'expired') {
      rows = rows.filter((r) => isExpired(r))
    }

    // Material
    if (materialFilter !== 'all') {
      rows = rows.filter((r) => r.material_type === materialFilter)
    }

    // Sort
    rows = [...rows].sort((a, b) => {
      const av = a[sortField] ?? 0
      const bv = b[sortField] ?? 0
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sortDir === 'asc' ? cmp : -cmp
    })

    return rows
  }, [estimates, search, statusFilter, materialFilter, sortField, sortDir])

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <span className="text-gray-600 ml-1">↕</span>
    return <span className="text-amber-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search address or estimate ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 w-72"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'expired')}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">All statuses</option>
          <option value="active">Active only</option>
          <option value="expired">Expired only</option>
        </select>
        <select
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
        >
          <option value="all">All materials</option>
          {materials.map((m) => (
            <option key={m} value={m}>
              {MATERIAL_LABELS[m] ?? m}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 self-center ml-auto">{filtered.length} estimates</span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center text-gray-500">
          No estimates found. Try adjusting your filters.
        </div>
      ) : (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:text-white select-none"
                    onClick={() => toggleSort('created_at')}
                  >
                    Date <SortIcon field="created_at" />
                  </th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Material</th>
                  <th
                    className="px-4 py-3 text-right cursor-pointer hover:text-white select-none"
                    onClick={() => toggleSort('roof_area_sqft')}
                  >
                    Area <SortIcon field="roof_area_sqft" />
                  </th>
                  <th
                    className="px-4 py-3 text-right cursor-pointer hover:text-white select-none"
                    onClick={() => toggleSort('total_amount')}
                  >
                    Total <SortIcon field="total_amount" />
                  </th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Expires</th>
                  <th className="px-4 py-3 text-center">Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const expired = isExpired(row)
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        i % 2 === 0 ? '' : 'bg-white/[0.02]'
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {fmtDate(row.created_at)}
                      </td>
                      <td className="px-4 py-3 text-white max-w-xs">
                        <div className="truncate" title={row.address ?? '—'}>
                          {row.address ?? <span className="text-gray-500">No address</span>}
                        </div>
                        <div className="text-xs text-gray-600 font-mono truncate">{row.session_id}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {MATERIAL_LABELS[row.material_type ?? ''] ?? row.material_type ?? '—'}
                        {row.roof_complexity && (
                          <span className="ml-1.5 text-xs text-gray-500 capitalize">({row.roof_complexity})</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 whitespace-nowrap">
                        {row.roof_area_sqft != null ? `${row.roof_area_sqft.toLocaleString()} sf` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold whitespace-nowrap">
                        <span className={row.total_amount && row.total_amount > 0 ? 'text-amber-400' : 'text-gray-500'}>
                          {fmt(row.total_amount)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            expired
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}
                        >
                          {expired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500 whitespace-nowrap">
                        {fmtDateShort(row.expires_at)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.session_id ? (
                          <Link
                            href={`/estimates/${row.session_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                          >
                            View →
                          </Link>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Totals footer */}
          <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing {filtered.length} of {estimates.length} estimates
            </span>
            <span className="font-medium text-amber-400">
              Filtered pipeline:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(filtered.reduce((sum, r) => sum + (r.total_amount ?? 0), 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
