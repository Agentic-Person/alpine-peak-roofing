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
// Estimate summary email HTML (standalone — no template dependency)
// ---------------------------------------------------------------------------
function buildEstimateEmailHtml(estimate: Record<string, unknown>): string {
  const ci = estimate.contactInfo as Record<string, string> ?? {}
  const name = [ci.firstName, ci.lastName].filter(Boolean).join(' ') || 'Homeowner'
  const mat = (estimate.selectedMaterial as Record<string, string>)?.name ?? 'Selected Material'
  const total = fmt(Number(estimate.totalCost ?? 0))
  const area = Number(estimate.roofArea ?? 0).toLocaleString()
  const validUntil = estimate.validUntil
    ? new Date(estimate.validUntil as string).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '30 days'
  const estimateId = String(estimate.estimateId ?? '')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.alpinepeakroofing.com'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden">

        <!-- Header -->
        <tr><td style="background:#1a3a5c;padding:28px 32px">
          <h1 style="margin:0;color:#fff;font-size:22px">Alpine Peak Roofing</h1>
          <p style="margin:4px 0 0;color:#90b4d4;font-size:14px">Your Roof Estimate is Ready</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px">
          <p style="font-size:16px;color:#333">Hi ${name},</p>
          <p style="color:#555">Thanks for using our roof estimator. Here's a summary of your estimate:</p>

          <!-- Summary box -->
          <table width="100%" cellpadding="12" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;margin:20px 0">
            <tr>
              <td style="color:#64748b;font-size:13px">Material</td>
              <td style="text-align:right;color:#1e293b;font-weight:bold">${mat}</td>
            </tr>
            <tr style="border-top:1px solid #e2e8f0">
              <td style="color:#64748b;font-size:13px">Roof Area</td>
              <td style="text-align:right;color:#1e293b;font-weight:bold">${area} sq ft</td>
            </tr>
            <tr style="border-top:1px solid #e2e8f0;background:#1a3a5c;border-radius:4px">
              <td style="color:#fff;font-size:14px;font-weight:bold">Estimated Total</td>
              <td style="text-align:right;color:#fff;font-size:20px;font-weight:bold">${total}</td>
            </tr>
          </table>

          <p style="color:#64748b;font-size:13px;margin-top:8px">
            Estimate ID: <strong>${estimateId}</strong><br>
            Valid until: <strong>${validUntil}</strong>
          </p>

          <p style="color:#555;margin-top:20px">
            Ready to move forward or have questions? Call or text us directly:
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:20px 0">
            <tr>
              <td style="background:#e85d26;border-radius:6px;padding:12px 28px">
                <a href="tel:+19704561176" style="color:#fff;text-decoration:none;font-weight:bold;font-size:15px">
                  Call (970) 456-1176
                </a>
              </td>
            </tr>
          </table>

          <p style="color:#555;font-size:14px">
            Or <a href="${baseUrl}" style="color:#1a3a5c">visit our website</a> to learn more about our services.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0">
          <p style="margin:0;color:#94a3b8;font-size:12px">
            Alpine Peak Roofing · Serving Colorado's Front Range<br>
            Licensed, Bonded &amp; Insured · (970) 456-1176
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
