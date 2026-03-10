/**
 * Alpine Peak Roofing — Email Sending via Resend
 *
 * Setup: Add RESEND_API_KEY=re_xxxx to .env.local
 * Domain: Verify alpinepeakroofing.com at resend.com/domains
 */

import { Resend } from 'resend'
import {
  estimateGateEmailHtml,
  estimateCompleteEmailHtml,
  leadNotificationEmailHtml,
  type EstimateEmailData,
  type LeadNotificationData,
} from './templates'

const TEAM_EMAIL     = 'jimmy@alpinepeakroofing.com'
const FROM_ESTIMATES = 'Alpine Peak Roofing <estimates@alpinepeakroofing.com>'
const FROM_ALERTS    = 'Alpine Peak Roofing Leads <leads@alpinepeakroofing.com>'

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — emails are disabled')
    return null
  }
  return new Resend(key)
}

// ─────────────────────────────────────────────────────────────────────────────
// Send welcome email when a lead enters their email in the estimate modal gate
// ─────────────────────────────────────────────────────────────────────────────
export async function sendEstimateGateEmail(email: string): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  try {
    const { error } = await resend.emails.send({
      from: FROM_ESTIMATES,
      to: email,
      subject: 'Your Free Satellite Roof Analysis is Ready — Alpine Peak Roofing',
      html: estimateGateEmailHtml(email),
    })
    if (error) {
      console.error('[email] sendEstimateGateEmail error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] sendEstimateGateEmail exception:', err)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Send full estimate email after wizard completion
// ─────────────────────────────────────────────────────────────────────────────
export async function sendEstimateCompleteEmail(data: EstimateEmailData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const name = data.firstName ? `${data.firstName} ${data.lastName || ''}`.trim() : 'Homeowner'

  try {
    const { error } = await resend.emails.send({
      from: FROM_ESTIMATES,
      to: data.email,
      subject: `Your Roof Estimate — ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(data.totalAmount)} — Alpine Peak Roofing`,
      html: estimateCompleteEmailHtml(data),
      // Reply-to so homeowner can just hit reply
      replyTo: TEAM_EMAIL,
    })
    if (error) {
      console.error('[email] sendEstimateCompleteEmail error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] sendEstimateCompleteEmail exception:', err)
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Send internal lead notification to the Alpine Peak team
// ─────────────────────────────────────────────────────────────────────────────
export async function sendLeadNotification(data: LeadNotificationData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const name = [data.firstName, data.lastName].filter(Boolean).join(' ') || data.email
  const priorityTag = data.priority === 'high' ? '🔥 HIGH PRIORITY — ' : ''

  try {
    const { error } = await resend.emails.send({
      from: FROM_ALERTS,
      to: TEAM_EMAIL,
      subject: `${priorityTag}New Lead: ${name} — Score ${data.leadScore ?? 0}/100`,
      html: leadNotificationEmailHtml(data),
    })
    if (error) {
      console.error('[email] sendLeadNotification error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] sendLeadNotification exception:', err)
    return false
  }
}
