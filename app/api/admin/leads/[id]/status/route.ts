/**
 * PATCH /api/admin/leads/[id]/status
 *
 * Updates the status field on a lead record.
 * Valid statuses: new | contacted | qualified | won | lost
 *
 * Body: { status: string }
 * Protected by optional ADMIN_SECRET env var.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const VALID_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'] as const
type LeadStatus = (typeof VALID_STATUSES)[number]

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Optional auth check
  const adminSecret = process.env.ADMIN_SECRET
  if (adminSecret) {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') ?? request.nextUrl.searchParams.get('token')
    if (token !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Missing lead id' }, { status: 400 })
  }

  let body: { status?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { status } = body
  if (!status || !VALID_STATUSES.includes(status as LeadStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    )
  }

  try {
    const db = getSupabaseAdmin()
    const { data, error } = await db
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select('id, status')
      .single()

    if (error) {
      console.error('[leads/status] Supabase error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, lead: data })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
