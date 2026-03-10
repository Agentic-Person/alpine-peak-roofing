/**
 * Alpine Peak Roofing — Email HTML Templates
 * All templates use table-based layouts for maximum email client compatibility.
 */

const BRAND = {
  primary:    '#004080',   // sky-captain
  accent:     '#E5A800',   // amber-gold
  dark:       '#001F40',   // deep navy header
  text:       '#1A2332',   // ink
  muted:      '#6B7F96',
  bg:         '#F4F7FC',
  white:      '#FFFFFF',
  phone:      '(970) 456-1176',
  email:      'info@alpinepeakroofing.com',
  website:    'https://alpinepeakroofing.com',
  estimator:  'https://alpinepeakroofing.com/estimator',
  calendly:   'https://calendly.com/jimmy-agenticpersonnel/30min',
}

function baseLayout(content: string, preheader = ''): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Alpine Peak Roofing</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,${BRAND.dark} 0%,${BRAND.primary} 100%);padding:32px 40px;border-radius:12px 12px 0 0;" align="center">
          <div style="display:inline-block;background:rgba(229,168,0,0.12);border:1px solid rgba(229,168,0,0.35);padding:6px 16px;border-radius:20px;margin-bottom:16px;">
            <span style="color:${BRAND.accent};font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Pinnacle of Protection · Peak of Performance</span>
          </div>
          <div>
            <span style="color:${BRAND.white};font-size:26px;font-weight:800;letter-spacing:-0.02em;">Alpine Peak Roofing</span>
          </div>
          <div style="color:rgba(255,255,255,0.6);font-size:12px;margin-top:4px;">Denver Metro &amp; Surrounding Colorado</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${BRAND.white};padding:40px;border-radius:0 0 12px 12px;border:1px solid #E2EAF4;border-top:none;">
          ${content}

          <!-- Footer -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;padding-top:24px;border-top:1px solid #E2EAF4;">
            <tr><td align="center">
              <p style="color:${BRAND.muted};font-size:13px;margin:0 0 8px;">${BRAND.phone} &nbsp;·&nbsp; <a href="mailto:${BRAND.email}" style="color:${BRAND.muted};">${BRAND.email}</a></p>
              <p style="color:${BRAND.muted};font-size:11px;margin:0;">Alpine Peak Roofing · Licensed · Bonded · Insured · Denver Metro, CO<br>
              <a href="${BRAND.website}" style="color:${BRAND.primary};">alpinepeakroofing.com</a></p>
            </td></tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function ctaButton(text: string, href: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
    <tr><td align="center" style="background:${BRAND.accent};border-radius:8px;">
      <a href="${href}" style="display:inline-block;padding:14px 32px;color:${BRAND.text};font-size:14px;font-weight:800;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">${text}</a>
    </td></tr>
  </table>`
}

function divider(): string {
  return `<div style="height:1px;background:#E2EAF4;margin:28px 0;"></div>`
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 1: Modal email gate — welcome / estimator access
// ─────────────────────────────────────────────────────────────────────────────
export function estimateGateEmailHtml(email: string): string {
  const content = `
    <h1 style="color:${BRAND.text};font-size:24px;font-weight:800;margin:0 0 8px;">Your Free Satellite Roof Analysis is Ready</h1>
    <p style="color:${BRAND.muted};font-size:15px;margin:0 0 28px;">Thanks for requesting your free estimate. Here's exactly what happens next.</p>

    <!-- Steps -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${['Enter your address &amp; confirm your property on our satellite map.',
         'Our AI scans your roof — every plane, pitch, and angle — in seconds.',
         'Browse premium materials with live pricing and choose what fits your budget.',
         'Your fully itemized estimate is delivered instantly. No pressure. No obligation.']
        .map((step, i) => `
        <tr><td style="padding:10px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:36px;vertical-align:top;">
                <div style="width:28px;height:28px;background:${BRAND.primary};border-radius:50%;text-align:center;line-height:28px;color:white;font-size:13px;font-weight:700;">${i+1}</div>
              </td>
              <td style="padding-left:12px;vertical-align:middle;font-size:14px;color:${BRAND.text};">${step}</td>
            </tr>
          </table>
        </td></tr>`).join('')}
    </table>

    ${ctaButton('Analyze My Roof Now →', BRAND.estimator)}
    ${divider()}

    <!-- Trust signals -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="33%" align="center" style="padding:0 8px;">
          <div style="font-size:22px;">🛰️</div>
          <div style="font-size:12px;font-weight:700;color:${BRAND.text};margin:4px 0 2px;">Satellite Imaging</div>
          <div style="font-size:11px;color:${BRAND.muted};">Real roof data from above</div>
        </td>
        <td width="33%" align="center" style="padding:0 8px;">
          <div style="font-size:22px;">⚡</div>
          <div style="font-size:12px;font-weight:700;color:${BRAND.text};margin:4px 0 2px;">Under 60 Seconds</div>
          <div style="font-size:11px;color:${BRAND.muted};">Faster than any other method</div>
        </td>
        <td width="33%" align="center" style="padding:0 8px;">
          <div style="font-size:22px;">🏆</div>
          <div style="font-size:12px;font-weight:700;color:${BRAND.text};margin:4px 0 2px;">Completely Free</div>
          <div style="font-size:11px;color:${BRAND.muted};">No commitment required</div>
        </td>
      </tr>
    </table>

    ${divider()}
    <p style="color:${BRAND.muted};font-size:13px;text-align:center;margin:0;">
      Questions? Call us at <a href="tel:9704561176" style="color:${BRAND.primary};font-weight:700;">${BRAND.phone}</a> — we answer 7 days a week.
    </p>`

  return baseLayout(content, 'Your free satellite roof estimate tool is ready — click to launch your analysis.')
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 2: Full estimate complete — sent after wizard completion
// ─────────────────────────────────────────────────────────────────────────────
export interface EstimateEmailData {
  firstName?: string
  lastName?: string
  email: string
  address: string
  materialType: string
  materialLabel?: string
  roofArea: number
  materialCost: number
  laborCost: number
  additionalCosts: { permits: number; disposal: number; delivery: number }
  subtotal: number
  taxAmount: number
  totalAmount: number
  warrantyYears: number
  estimatedDurationDays: number
}

function currency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function costRow(label: string, amount: number, bold = false): string {
  return `
  <tr>
    <td style="padding:8px 16px;font-size:14px;color:${bold ? BRAND.text : BRAND.muted};${bold ? 'font-weight:700;' : ''}">${label}</td>
    <td align="right" style="padding:8px 16px;font-size:14px;color:${bold ? BRAND.text : BRAND.muted};${bold ? 'font-weight:700;' : ''}">${currency(amount)}</td>
  </tr>`
}

export function estimateCompleteEmailHtml(data: EstimateEmailData): string {
  const name = data.firstName ? `Hi ${data.firstName},` : 'Hi there,'
  const additionalTotal = data.additionalCosts.permits + data.additionalCosts.disposal + data.additionalCosts.delivery

  const materialLabel = data.materialLabel || data.materialType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  const content = `
    <h1 style="color:${BRAND.text};font-size:24px;font-weight:800;margin:0 0 8px;">Your Roof Estimate Is Ready</h1>
    <p style="color:${BRAND.muted};font-size:15px;margin:0 0 28px;">${name} Here's the full breakdown for your property at <strong style="color:${BRAND.text};">${data.address}</strong>.</p>

    <!-- Total highlight -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${BRAND.dark} 0%,${BRAND.primary} 100%);border-radius:10px;margin-bottom:28px;">
      <tr><td align="center" style="padding:28px;">
        <div style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">Estimated Project Total</div>
        <div style="color:${BRAND.accent};font-size:48px;font-weight:800;line-height:1;">${currency(data.totalAmount)}</div>
        <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:8px;">${data.roofArea.toLocaleString()} sq ft &nbsp;·&nbsp; ${materialLabel} &nbsp;·&nbsp; Valid 30 days</div>
      </td></tr>
    </table>

    <!-- Cost breakdown table -->
    <h3 style="color:${BRAND.text};font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">Cost Breakdown</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2EAF4;border-radius:8px;overflow:hidden;">
      ${costRow('Materials', data.materialCost)}
      ${costRow('Labor &amp; Installation', data.laborCost)}
      ${costRow('Permits', data.additionalCosts.permits)}
      ${costRow('Disposal &amp; Cleanup', data.additionalCosts.disposal)}
      ${costRow('Material Delivery', data.additionalCosts.delivery)}
      <tr><td colspan="2" style="height:1px;background:#E2EAF4;padding:0;"></td></tr>
      ${costRow('Subtotal', data.subtotal)}
      ${costRow('Sales Tax (7.65%)', data.taxAmount)}
      <tr style="background:#F4F7FC;">
        ${costRow('Total', data.totalAmount, true).replace('<tr>', '').replace('</tr>', '')}
      </tr>
    </table>

    ${divider()}

    <!-- Material + warranty -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" style="padding-right:12px;vertical-align:top;">
          <div style="background:#F4F7FC;border-radius:8px;padding:16px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:4px;">Selected Material</div>
            <div style="font-size:16px;font-weight:700;color:${BRAND.text};">${materialLabel}</div>
          </div>
        </td>
        <td width="50%" style="padding-left:12px;vertical-align:top;">
          <div style="background:#F4F7FC;border-radius:8px;padding:16px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:4px;">Warranty</div>
            <div style="font-size:16px;font-weight:700;color:${BRAND.text};">${data.warrantyYears} Years</div>
          </div>
        </td>
      </tr>
    </table>

    ${divider()}

    <!-- What happens next -->
    <h3 style="color:${BRAND.text};font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 16px;">What Happens Next</h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${[
        ['Review your estimate', 'Compare materials, costs, and timeline in this email.'],
        ['Schedule your consultation', 'Book a free in-person site visit with our team.'],
        ['Begin your project', 'Professional installation by our licensed Colorado crew.'],
      ].map(([title, desc], i) => `
        <tr><td style="padding:8px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:32px;vertical-align:top;padding-top:2px;">
                <div style="width:24px;height:24px;background:${BRAND.accent};border-radius:50%;text-align:center;line-height:24px;color:${BRAND.text};font-size:12px;font-weight:800;">${i+1}</div>
              </td>
              <td style="padding-left:12px;">
                <div style="font-size:14px;font-weight:700;color:${BRAND.text};">${title}</div>
                <div style="font-size:13px;color:${BRAND.muted};">${desc}</div>
              </td>
            </tr>
          </table>
        </td></tr>`).join('')}
    </table>

    ${ctaButton('Book Your Free Consultation →', BRAND.calendly)}

    <p style="color:${BRAND.muted};font-size:11px;text-align:center;margin:16px 0 0;">
      This estimate is valid for 30 days and may vary based on final site conditions. Alpine Peak Roofing is licensed, bonded, and insured.
    </p>`

  return baseLayout(content, `Your ${currency(data.totalAmount)} roofing estimate for ${data.address} — details inside.`)
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL 3: Internal team notification — new lead alert
// ─────────────────────────────────────────────────────────────────────────────
export interface LeadNotificationData {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  source?: string
  leadScore?: number
  priority?: string
  estimateTotal?: number
  materialType?: string
}

export function leadNotificationEmailHtml(data: LeadNotificationData): string {
  const name = [data.firstName, data.lastName].filter(Boolean).join(' ') || 'Unknown'
  const priorityColor = data.priority === 'high' ? '#16a34a' : data.priority === 'medium' ? '#d97706' : '#6b7280'
  const rows = [
    ['Name', name],
    ['Email', `<a href="mailto:${data.email}" style="color:${BRAND.primary};">${data.email}</a>`],
    ['Phone', data.phone ? `<a href="tel:${data.phone}" style="color:${BRAND.primary};">${data.phone}</a>` : '—'],
    ['Address', data.address || '—'],
    ['Source', data.source || 'website'],
    ['Lead Score', `${data.leadScore ?? 0}/100`],
    ['Priority', `<span style="color:${priorityColor};font-weight:700;text-transform:uppercase;">${data.priority || 'low'}</span>`],
    ...(data.estimateTotal ? [['Estimate Total', `<strong>${currency(data.estimateTotal)}</strong>`]] : []),
    ...(data.materialType ? [['Material', data.materialType.replace(/-/g, ' ')]] : []),
  ]

  const content = `
    <div style="background:${data.priority === 'high' ? '#fefce8' : '#f0f9ff'};border-left:4px solid ${priorityColor};padding:12px 16px;border-radius:4px;margin-bottom:24px;">
      <strong style="color:${priorityColor};font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">
        ${data.priority === 'high' ? '🔥 High Priority Lead' : '📋 New Lead Captured'}
      </strong>
    </div>
    <h2 style="color:${BRAND.text};font-size:20px;margin:0 0 20px;">New Lead: ${name}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2EAF4;border-radius:8px;overflow:hidden;">
      ${rows.map(([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? BRAND.white : '#F8FAFE'};">
          <td style="padding:10px 16px;font-size:13px;font-weight:700;color:${BRAND.muted};width:130px;">${label}</td>
          <td style="padding:10px 16px;font-size:13px;color:${BRAND.text};">${value}</td>
        </tr>`).join('')}
    </table>
    ${ctaButton('View All Leads in Supabase →', 'https://supabase.com/dashboard')}`

  return baseLayout(content, `New lead from ${name} — Score: ${data.leadScore ?? 0}/100`)
}
