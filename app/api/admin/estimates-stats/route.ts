/**
 * GET /api/admin/estimates-stats
 *
 * Returns aggregate stats on submitted roof estimates.
 * Used by internal monitoring / cron checks.
 * Protected by a simple admin secret token.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

export async function GET(request: NextRequest) {
  // Simple token check — caller must include ?token=... matching ADMIN_SECRET
  const adminSecret = process.env.ADMIN_SECRET
  const tokenParam = request.nextUrl.searchParams.get('token')

  if (adminSecret && tokenParam !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = getSupabaseAdmin()

    const { data, error, count } = await db
      .from('roof_estimates')
      .select('total_amount, created_at, expires_at', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const rows = data ?? []
    const now = new Date()

    const total = count ?? rows.length
    const totalPipeline = rows.reduce((s, r) => s + (r.total_amount ?? 0), 0)
    const avgEstimate = total > 0 ? totalPipeline / total : 0
    const activeCount = rows.filter(
      (r) => r.expires_at && new Date(r.expires_at) > now
    ).length

    const last7DaysCutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last7Days = rows.filter((r) => new Date(r.created_at) > last7DaysCutoff).length

    const last24hCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last24h = rows.filter((r) => new Date(r.created_at) > last24hCutoff).length

    const last7DaysPipeline = rows
      .filter((r) => new Date(r.created_at) > last7DaysCutoff)
      .reduce((s, r) => s + (r.total_amount ?? 0), 0)

    return NextResponse.json({
      ok: true,
      estimates: {
        total,
        active: activeCount,
        last24h,
        last7Days,
        totalPipeline: Math.round(totalPipeline),
        avgEstimate: Math.round(avgEstimate),
        last7DaysPipeline: Math.round(last7DaysPipeline),
      },
      generatedAt: now.toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
