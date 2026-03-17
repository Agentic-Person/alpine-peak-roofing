/**
 * POST /api/webhooks/generate-pdf
 *
 * Called after the estimator wizard shows results.
 * When RESEND_API_KEY is set → emails a "download your estimate" to the homeowner.
 * Also upserts the lead into Supabase leads table so it appears in the CRM.
 *
 * PDF generation is mocked for now (returns a link to a simple static page).
 * Swap in an actual PDF lib (e.g. @react-pdf/renderer server component) when ready.
 *
 * Response shape mirrors lib/api.ts → PDFGenerationResponse.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing Supabase service role env vars')
  return createClient(url, serviceKey)
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.warn('[generate-pdf] RESEND_API_KEY not set — emails disabled'); return null }
  return new Resend(key)
}

function fmt(n: number) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

// ---------------------------------------------------------------------------
// Helpers for email HTML
// ---------------------------------------------------------------------------

/** Estimate install duration from roof area (email version — no complexity data) */
function getEmailTimeline(roofAreaSqFt: number): string {
  if (roofAreaSqFt < 1500) return '1 day'
  if (roofAreaSqFt < 2500) return '1–2 days'
  if (roofAreaSqFt < 3500) return '2–3 days'
  return '3–4 days'
}

interface MonthlyPayment { term: string; monthly: number }

/** Monthly payment estimates for 3 loan terms at 7.99% APR */
function getMonthlyPayments(total: number): MonthlyPayment[] {
  const rate = 0.0799 / 12
  return [60, 84, 120].map((n) => {
    const payment = (total * rate) / (1 - Math.pow(1 + rate, -n))
    return { term: `${n / 12} yr`, monthly: Math.ceil(payment) }
  })
}

// ---------------------------------------------------------------------------
// Estimate summary email HTML (standalone — no template dependency)
// ---------------------------------------------------------------------------
function buildEstimateEmailHtml(estimate: Record<string, unknown>): string {
  const ci = estimate.contactInfo as Record<string, string> ?? {}
  const name = [ci.firstName, ci.lastName].filter(Boolean).join(' ') || 'Homeowner'
  const mat = (estimate.selectedMaterial as Record<string, string>)?.name ?? 'Selected Material'
  const warranty = (estimate.selectedMaterial as Record<string, string>)?.warranty ?? ''
  const totalCostNum = Number(estimate.totalCost ?? 0)
  const total = fmt(totalCostNum)
  const area = Number(estimate.roofArea ?? 0)
  const areaDisplay = area ? area.toLocaleString() : 'N/A'
  const validUntil = estimate.validUntil
    ? new Date(estimate.validUntil as string).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '30 days'
  const estimateId = String(estimate.estimateId ?? '')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.alpinepeakroofing.com'
  const estimateUrl = `${baseUrl}/estimates/${estimateId}`

  // Cost breakdown
  const mc = estimate.materialCosts as Record<string, number> | null
  const lc = estimate.laborCosts as Record<string, number> | null
  const ac = estimate.additionalCosts as Record<string, number> | null
  const materialTotal = mc?.total ?? Number(estimate.materialCost ?? 0)
  const laborTotal = lc?.total ?? Number(estimate.laborCost ?? 0)
  const addTotal = ac?.total ?? 0
  const subtotal = Number(estimate.subtotal ?? 0)
  const salesTax = Number(estimate.salesTax ?? 0)
  const urgencyAdj = Number(estimate.urgencyAdjustment ?? 0)

  // Timeline
  const installDuration = getEmailTimeline(area)

  // Financing
  const payments = totalCostNum > 0 ? getMonthlyPayments(totalCostNum) : []

  // Cost row helper
  const row = (label: string, amount: number, bold = false, dark = false) => {
    const bg = dark ? 'background:#1a3a5c;' : ''
    const color = dark ? 'color:#fff;' : 'color:#1e293b;'
    const colorLabel = dark ? 'color:#fff;' : 'color:#64748b;'
    const weight = bold || dark ? 'font-weight:bold;' : ''
    return `
    <tr>
      <td style="${bg}${colorLabel}${weight}padding:10px 14px;font-size:13px;border-top:1px solid #e2e8f0">${label}</td>
      <td style="${bg}${color}${weight}padding:10px 14px;font-size:${dark ? '16' : '13'}px;text-align:right;border-top:1px solid #e2e8f0">${fmt(amount)}</td>
    </tr>`
  }

  const subRow = (label: string, amount: number) => `
    <tr>
      <td style="color:#94a3b8;padding:6px 14px 6px 28px;font-size:12px;border-top:1px solid #f1f5f9">${label}</td>
      <td style="color:#94a3b8;padding:6px 14px;font-size:12px;text-align:right;border-top:1px solid #f1f5f9">${fmt(amount)}</td>
    </tr>`

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

  <!-- ── Header ── -->
  <tr><td style="background:#1a3a5c;padding:28px 32px">
    <p style="margin:0 0 4px;color:#f59e0b;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold">Alpine Peak Roofing</p>
    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold">Your Roof Estimate is Ready</h1>
    <p style="margin:6px 0 0;color:#90b4d4;font-size:14px">Hi ${name} — here's your personalized estimate below.</p>
  </td></tr>

  <!-- ── Total Hero ── -->
  <tr><td style="background:#f59e0b;padding:20px 32px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="margin:0;color:#78350f;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">Total Estimate</p>
          <p style="margin:4px 0 0;color:#1a3a5c;font-size:36px;font-weight:bold;line-height:1">${total}</p>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <p style="margin:0;color:#92400e;font-size:12px;line-height:1.7">
            Includes all labor, materials &amp; permits<br>
            Colorado sales tax (4.9%) applied<br>
            <strong>Valid until ${validUntil}</strong>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ── Project Details ── -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">Project Details</p>
    <table width="100%" cellpadding="10" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:13px">
      <tr>
        <td style="color:#64748b;width:50%">Material</td>
        <td style="color:#1e293b;font-weight:bold;text-align:right">${mat}</td>
      </tr>
      <tr style="border-top:1px solid #e2e8f0">
        <td style="color:#64748b">Roof Area</td>
        <td style="color:#1e293b;font-weight:bold;text-align:right">${areaDisplay} sq ft</td>
      </tr>
      ${warranty ? `<tr style="border-top:1px solid #e2e8f0">
        <td style="color:#64748b">Warranty</td>
        <td style="color:#1e293b;font-weight:bold;text-align:right">${warranty}</td>
      </tr>` : ''}
      <tr style="border-top:1px solid #e2e8f0">
        <td style="color:#64748b">Estimate ID</td>
        <td style="color:#1e293b;font-weight:bold;text-align:right;font-family:monospace;font-size:12px">${estimateId}</td>
      </tr>
    </table>
  </td></tr>

  <!-- ── Cost Breakdown ── -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">Cost Breakdown</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;font-size:13px">
      ${row('Materials (' + mat + ')', materialTotal, true)}
      ${mc?.underlayment ? subRow('Underlayment', mc.underlayment) : ''}
      ${mc?.flashing ? subRow('Flashing &amp; Trim', mc.flashing) : ''}
      ${mc?.ridgeVent ? subRow('Ridge Vent System', mc.ridgeVent) : ''}
      ${row('Labor &amp; Installation', laborTotal, true)}
      ${addTotal ? row('Permits, Disposal &amp; Delivery', addTotal, true) : ''}
      ${urgencyAdj ? row('Urgency Adjustment', urgencyAdj, false) : ''}
      ${row('Subtotal', subtotal, false)}
      ${row('Colorado Sales Tax (4.9%)', salesTax, false)}
      ${row('Total', totalCostNum, false, true)}
    </table>
    ${area ? `<p style="margin:6px 0 0;color:#94a3b8;font-size:11px;text-align:right">≈ ${fmt(totalCostNum / area)}/sq ft installed</p>` : ''}
  </td></tr>

  <!-- ── What's Included ── -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">What's Included</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:14px;font-size:13px">
      <tr><td>
        <table width="100%" cellpadding="4" cellspacing="0">
          ${[
            'Complete tear-off of existing roofing',
            'Ice &amp; water shield installation',
            'Synthetic underlayment throughout',
            'All flashing replaced (valleys, pipes, walls)',
            'Ridge vent system for proper airflow',
            'Haul-away and disposal of debris',
            'Building permit (where required)',
            'Final inspection walkthrough',
          ].map((item, i) => `
          <tr>
            <td style="width:24px;vertical-align:top;color:#16a34a;font-size:14px">✓</td>
            <td style="color:#166534;padding-bottom:${i < 7 ? '4' : '0'}px">${item}</td>
          </tr>`).join('')}
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── Project Timeline ── -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">Estimated Project Timeline</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
      <tr>
        ${[
          { day: 'Day 1', icon: '📋', desc: 'Permit pulled &amp; materials ordered' },
          { day: 'Day 2', icon: '🚛', desc: 'Materials delivered to site' },
          { day: 'Days 2+', icon: '🔨', desc: `Tear-off &amp; installation (${installDuration})` },
          { day: 'Final Day', icon: '✅', desc: 'Inspection, cleanup &amp; walkthrough' },
        ].map(({ day, icon, desc }) => `
        <td style="width:25%;text-align:center;padding:16px 8px;vertical-align:top;border-right:1px solid #e2e8f0">
          <div style="font-size:20px;margin-bottom:6px">${icon}</div>
          <p style="margin:0 0 4px;font-size:12px;font-weight:bold;color:#1a3a5c">${day}</p>
          <p style="margin:0;font-size:11px;color:#64748b;line-height:1.4">${desc}</p>
        </td>`).join('')}
      </tr>
    </table>
    ${area ? `<p style="margin:8px 0 0;color:#94a3b8;font-size:11px;text-align:center">Based on your ${area.toLocaleString()} sq ft roof — most installs complete in <strong>${installDuration}</strong>.</p>` : ''}
  </td></tr>

  <!-- ── Financing Options ── -->
  ${payments.length > 0 ? `
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold">Financing Options</p>
    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px">Estimated monthly payments at ~7.99% APR — rates vary by lender and credit.</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        ${payments.map(({ term, monthly }) => `
        <td style="width:33.3%;padding:4px">
          <table width="100%" cellpadding="12" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;text-align:center">
            <tr><td>
              <p style="margin:0;font-size:22px;font-weight:bold;color:#1a3a5c">$${monthly.toLocaleString()}</p>
              <p style="margin:2px 0 0;font-size:11px;color:#92400e;font-weight:bold">/ month</p>
              <p style="margin:4px 0 0;font-size:11px;color:#b45309">${term} term</p>
            </td></tr>
          </table>
        </td>`).join('')}
      </tr>
    </table>
    <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;text-align:center">Ask us about financing — approvals in minutes. Call <a href="tel:+19704561176" style="color:#1a3a5c">(970) 456-1176</a></p>
  </td></tr>` : ''}

  <!-- ── View Full Estimate CTA ── -->
  <tr><td style="padding:24px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px">
      <tr>
        <td style="vertical-align:middle">
          <p style="margin:0;font-size:13px;color:#1e293b;font-weight:bold">View Your Full Estimate Online</p>
          <p style="margin:4px 0 0;font-size:12px;color:#64748b">Print-ready version with all details — share with your family or insurance company.</p>
        </td>
        <td style="text-align:right;vertical-align:middle;padding-left:16px">
          <a href="${estimateUrl}" style="display:inline-block;background:#1a3a5c;color:#fff;text-decoration:none;font-size:13px;font-weight:bold;padding:10px 20px;border-radius:6px;white-space:nowrap">View Estimate →</a>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ── Primary CTA ── -->
  <tr><td style="padding:24px 32px">
    <p style="font-size:15px;color:#1e293b;font-weight:bold;margin:0 0 8px">Ready to move forward?</p>
    <p style="color:#555;font-size:13px;margin:0 0 20px">This estimate is valid for 30 days. Lock in your price today.</p>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:12px">
          <a href="https://calendly.com/jimmy-agenticpersonnel/30min" style="display:inline-block;background:#f59e0b;color:#1a3a5c;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:6px">📅 Schedule Free Consultation</a>
        </td>
        <td>
          <a href="tel:+19704561176" style="display:inline-block;background:#1a3a5c;color:#fff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:6px">📞 Call (970) 456-1176</a>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ── Footer ── -->
  <tr><td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0">
    <p style="margin:0;color:#94a3b8;font-size:12px">
      Alpine Peak Roofing · Serving Colorado's Front Range<br>
      Licensed, Bonded &amp; Insured · (970) 456-1176 · <a href="${baseUrl}" style="color:#64748b">alpinepeakroofing.com</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Upsert lead into Supabase (no-throw)
// ---------------------------------------------------------------------------
async function upsertLead(
  estimate: Record<string, unknown>
): Promise<{ leadId: string | null }> {
  try {
    const db = getSupabaseAdmin()
    const ci = estimate.contactInfo as Record<string, string> ?? {}
    const mat = (estimate.selectedMaterial as Record<string, string>)?.name ?? ''

    const { data, error } = await db
      .from('leads')
      .upsert(
        {
          email: ci.email,
          first_name: ci.firstName,
          last_name: ci.lastName,
          phone: ci.phone,
          address: estimate.municipality ?? null,
          source: 'estimator_wizard',
          status: 'new',
          notes: `Roof estimate ${estimate.estimateId}: ${mat} — $${Number(estimate.totalCost ?? 0).toLocaleString()}`,
          lead_score: 85,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (error) {
      console.warn('[generate-pdf] lead upsert error:', error)
      return { leadId: null }
    }
    return { leadId: (data as { id: string })?.id ?? null }
  } catch (err) {
    console.warn('[generate-pdf] lead upsert exception:', err)
    return { leadId: null }
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const { estimateId, estimateData } = await req.json() as {
      estimateId?: string
      estimateData?: Record<string, unknown>
    }

    if (!estimateData) {
      return NextResponse.json(
        { success: false, error: 'estimateData is required' },
        { status: 400 }
      )
    }

    const resolvedEstimateId = estimateId ?? String(estimateData.estimateId ?? `EST-${Date.now()}`)
    const ci = estimateData.contactInfo as Record<string, string> ?? {}
    const recipientEmail = ci.email

    // Construct a stable "PDF URL" that could eventually be a real generation endpoint
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.alpinepeakroofing.com'
    const pdfUrl = `${baseUrl}/estimates/${resolvedEstimateId}`

    // 1. Upsert lead in CRM
    const { leadId } = await upsertLead(estimateData)

    // 2. Send estimate email
    let emailSent = false
    if (recipientEmail) {
      const resend = getResend()
      if (resend) {
        try {
          const { error } = await resend.emails.send({
            from: 'Alpine Peak Roofing <estimates@alpinepeakroofing.com>',
            to: recipientEmail,
            subject: `Your Roof Estimate from Alpine Peak Roofing — ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(estimateData.totalCost ?? 0))}`,
            html: buildEstimateEmailHtml(estimateData),
            replyTo: 'jimmy@alpinepeakroofing.com',
          })
          emailSent = !error
          if (error) console.warn('[generate-pdf] resend error:', error)
        } catch (emailErr) {
          console.warn('[generate-pdf] email exception:', emailErr)
        }
      }
    }

    return NextResponse.json({
      success: true,
      estimateId: resolvedEstimateId,
      pdfGenerated: true,   // treated as "ready" even if just a link for now
      pdfUrl,
      emailSent,
      emailAddress: recipientEmail ?? null,
      crmLeadCreated: leadId !== null,
      leadId,
      completedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[generate-pdf] unhandled error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error during PDF generation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/webhooks/generate-pdf',
    method: 'POST',
    body: {
      estimateId: 'string (optional — defaults to estimateData.estimateId)',
      estimateData: 'EstimateResult object from /api/webhooks/calculate-estimate',
    },
    notes: 'Sends estimate summary email via Resend, upserts lead in Supabase CRM. PDF link points to /estimates/:id (static for now).',
  })
}
