/**
 * GET /api/admin/leads-stats
 *
 * Returns aggregate stats on captured website leads.
 * Used by monitoring cron / Telegram daily briefing.
 * Protected by optional ?token=ADMIN_SECRET
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
  const adminSecret = process.env.ADMIN_SECRET
  const tokenParam = request.nextUrl.searchParams.get('token')
  if (adminSecret && tokenParam !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = getSupabaseAdmin()

    // Try new schema first
    let rows: Array<{ created_at: string; lead_score: number | null; priority: string | null; source: string | null }> = []

    const { data, error } = await db
      .from('leads')
      .select('created_at, lead_score, priority, source')
      .order('created_at', { ascending: false })

    if (error) {
      // Try legacy schema
      const { data: legacy } = await db
        .from('leads')
        .select('created_at, lead_score, priority')
        .order('created_at', { ascending: false })
      rows = (legacy ?? []).map(r => ({ ...r, source: null }))
    } else {
      rows = data ?? []
    }

    const now = new Date()
    const last7dCutoff = new Date(now.getTime() - 7 * 86400_000)
    const last24hCutoff = new Date(now.getTime() - 86400_000)

    const total = rows.length
    const last7d = rows.filter(r => new Date(r.created_at) > last7dCutoff).length
    const last24h = rows.filter(r => new Date(r.created_at) > last24hCutoff).length
    const hot = rows.filter(r => r.priority === 'high').length
    const avgScore = total > 0
      ? Math.round(rows.reduce((s, r) => s + (r.lead_score ?? 0), 0) / total)
      : 0

    return NextResponse.json({
      ok: true,
      leads: { total, last24h, last7d, hot, avgScore },
      generatedAt: now.toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
