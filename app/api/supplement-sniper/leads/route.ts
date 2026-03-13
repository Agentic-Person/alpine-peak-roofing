import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role key for server-side inserts (bypasses RLS for reliable writes)
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing Supabase service role env vars')
  return createClient(url, serviceKey)
}

interface SupplementSniperLeadBody {
  name: string
  email: string
  company?: string
  claimsPerMonth: string
  phone?: string
}

async function sendSendGridEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw new Error('SENDGRID_API_KEY not configured')

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: {
        email: 'noreply@alpinepeakroofing.com',
        name: 'Supplement Sniper | Alpine Peak Roofing',
      },
      subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`SendGrid ${res.status}: ${body}`)
  }
}

export async function POST(request: NextRequest) {
  let body: SupplementSniperLeadBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Validate required fields
  if (!body.name || !body.email || !body.claimsPerMonth) {
    return NextResponse.json(
      { error: 'Missing required fields: name, email, claimsPerMonth' },
      { status: 400 }
    )
  }

  // ── Save to Supabase ────────────────────────────────────────────────────
  try {
    const supabase = getAdminClient()
    const { error: dbError } = await supabase
      .from('supplement_sniper_leads')
      .insert({
        name: body.name,
        email: body.email,
        company: body.company ?? null,
        claims_per_month: body.claimsPerMonth,
        phone: body.phone ?? null,
        source: 'supplement-sniper-landing',
      })

    if (dbError) {
      console.error('[supplement-sniper/leads] Supabase error:', dbError.message)
    }
  } catch (err) {
    console.error('[supplement-sniper/leads] Supabase exception:', err)
  }

  // ── Send emails (graceful failure) ──────────────────────────────────────
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#001155;color:#ffffff;padding:40px;border-radius:12px;">
      <div style="text-align:center;margin-bottom:28px;">
        <h1 style="color:#E5A800;font-size:26px;margin:0;">You're on the Supplement Sniper Waitlist!</h1>
      </div>
      <p style="color:#c0d0ff;font-size:16px;line-height:1.7;">Hi ${body.name},</p>
      <p style="color:#c0d0ff;font-size:16px;line-height:1.7;">
        You are officially on the waitlist for <strong style="color:#ffffff;">Supplement Sniper</strong> — Alpine Peak Roofing's AI-powered supplement detection platform.
      </p>
      <div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:20px;margin:24px 0;">
        <h3 style="color:#E5A800;margin-top:0;">What happens next:</h3>
        <ul style="color:#c0d0ff;line-height:1.9;padding-left:20px;margin:0;">
          <li>You will be among the first notified when we open access</li>
          <li>Founding members lock in the lowest rate before public launch</li>
          <li>We will reach out to schedule your onboarding demo</li>
        </ul>
      </div>
      <p style="color:#c0d0ff;font-size:16px;line-height:1.7;">
        Average recovery per claim: <strong style="color:#E5A800;">$3,000 - $5,000+</strong>. We cannot wait to show you what it does.
      </p>
      <p style="color:#c0d0ff;font-size:16px;line-height:1.7;">
        Questions? Reply to this email or visit
        <a href="https://alpinepeakroofing.com/contact" style="color:#5599FF;">alpinepeakroofing.com/contact</a>.
      </p>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:32px 0;" />
      <p style="color:#5577bb;font-size:12px;text-align:center;margin:0;">
        Alpine Peak Roofing &middot; Supplement Sniper Platform &middot;
        <a href="https://alpinepeakroofing.com" style="color:#5599FF;">alpinepeakroofing.com</a>
      </p>
    </div>
  `

  const confirmationText =
    `Hi ${body.name},

You are on the Supplement Sniper waitlist!

` +
    `We will reach out when access opens. Founding members get the lowest rate guaranteed.

` +
    `Average recovery: $3,000 - $5,000+ per claim.

Alpine Peak Roofing`

  const notificationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
      <h2 style="color:#004080;margin-top:0;">New Supplement Sniper Lead</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:10px 12px;font-weight:bold;color:#555;width:150px;border-bottom:1px solid #eee;">Name</td><td style="padding:10px 12px;color:#111;border-bottom:1px solid #eee;">${body.name}</td></tr>
        <tr style="background:#f7f9ff;"><td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Email</td><td style="padding:10px 12px;border-bottom:1px solid #eee;"><a href="mailto:${body.email}" style="color:#0077CC;">${body.email}</a></td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Company</td><td style="padding:10px 12px;color:#111;border-bottom:1px solid #eee;">${body.company ?? 'Not provided'}</td></tr>
        <tr style="background:#f7f9ff;"><td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Claims / Month</td><td style="padding:10px 12px;color:#111;border-bottom:1px solid #eee;"><strong>${body.claimsPerMonth}</strong></td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Phone</td><td style="padding:10px 12px;color:#111;border-bottom:1px solid #eee;">${body.phone ?? 'Not provided'}</td></tr>
        <tr style="background:#f7f9ff;"><td style="padding:10px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Source</td><td style="padding:10px 12px;color:#111;border-bottom:1px solid #eee;">supplement-sniper-landing</td></tr>
        <tr><td style="padding:10px 12px;font-weight:bold;color:#555;">Submitted</td><td style="padding:10px 12px;color:#111;">${submittedAt} CT</td></tr>
      </table>
    </div>
  `

  const notificationText =
    `New Supplement Sniper Lead

` +
    `Name: ${body.name}
Email: ${body.email}
Company: ${body.company ?? 'Not provided'}
` +
    `Claims/Month: ${body.claimsPerMonth}
Phone: ${body.phone ?? 'Not provided'}
` +
    `Submitted: ${submittedAt} CT`

  try {
    await Promise.all([
      sendSendGridEmail(
        body.email,
        "You're on the Supplement Sniper waitlist",
        confirmationHtml,
        confirmationText
      ),
      sendSendGridEmail(
        'jimmy@alpinepeakroofing.com',
        `New Supplement Sniper Lead: ${body.name} (${body.claimsPerMonth} claims/mo)`,
        notificationHtml,
        notificationText
      ),
    ])
  } catch (emailErr) {
    console.error('[supplement-sniper/leads] Email error:', emailErr)
    // Graceful failure — lead already saved, do not throw
  }

  return NextResponse.json({ success: true })
}
