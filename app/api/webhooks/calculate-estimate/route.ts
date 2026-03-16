/**
 * POST /api/webhooks/calculate-estimate
 *
 * Accepts roof measurements + material selection + contact info.
 * Returns a full EstimateResult, persists to Supabase roof_estimates,
 * and fires lead notification emails (fire-and-forget).
 *
 * Response shape mirrors lib/api.ts → EstimateResponse.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEstimateCompleteEmail, sendLeadNotification } from '@/lib/email'
import { alertHotLead } from '@/lib/alerts'

// ---------------------------------------------------------------------------
// Supabase (server-side, service role so RLS doesn't block)
// ---------------------------------------------------------------------------
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
  }
  return createClient(url, serviceKey)
}

// ---------------------------------------------------------------------------
// Pricing tables (matches materials in lib/api.ts getMaterialPricing)
// ---------------------------------------------------------------------------
interface MaterialPricing {
  name: string
  pricePerSqft: number       // material only
  laborMultiplier: number    // applied to base labor rate
  wasteFactor: number
  warranty: string
  category: 'shingles' | 'metal'
}

const MATERIAL_PRICING: Record<string, MaterialPricing> = {
  'architectural-25': {
    name: '25-Year Architectural Shingles',
    pricePerSqft: 1.25,
    laborMultiplier: 1.0,
    wasteFactor: 0.10,
    warranty: '25 years',
    category: 'shingles',
  },
  'architectural-30': {
    name: '30-Year Architectural Shingles',
    pricePerSqft: 1.65,
    laborMultiplier: 1.0,
    wasteFactor: 0.10,
    warranty: '30 years',
    category: 'shingles',
  },
  'lifetime-premium': {
    name: 'Lifetime Premium Shingles',
    pricePerSqft: 2.25,
    laborMultiplier: 1.1,
    wasteFactor: 0.12,
    warranty: 'Lifetime',
    category: 'shingles',
  },
  'standing-seam-steel': {
    name: 'Standing Seam Steel',
    pricePerSqft: 3.75,
    laborMultiplier: 1.4,
    wasteFactor: 0.08,
    warranty: '40 years',
    category: 'metal',
  },
  'corrugated-metal': {
    name: 'Corrugated Metal Panels',
    pricePerSqft: 2.25,
    laborMultiplier: 1.2,
    wasteFactor: 0.10,
    warranty: '25 years',
    category: 'metal',
  },
}

// CO sales tax (state 2.9% + avg local ~2%) ≈ 4.9%
const SALES_TAX_RATE = 0.049

// Base labor rate per sq ft before multipliers
const BASE_LABOR_RATE = 2.25

// ---------------------------------------------------------------------------
// Core calculation logic
// ---------------------------------------------------------------------------
interface CostBreakdown {
  primary: number
  underlayment: number
  flashing: number
  ridgeVent: number
  accessories: number
  total: number
}

function buildCostBreakdown(baseAmount: number, splits: number[]): CostBreakdown {
  const [primary, underlayment, flashing, ridgeVent, accessories] = splits
  return {
    primary: Math.round(baseAmount * primary),
    underlayment: Math.round(baseAmount * underlayment),
    flashing: Math.round(baseAmount * flashing),
    ridgeVent: Math.round(baseAmount * ridgeVent),
    accessories: Math.round(baseAmount * accessories),
    total: Math.round(baseAmount),
  }
}

function computeEstimate(
  roofAreaSqFt: number,
  selectedMaterial: string,
  complexityMultiplier: number,
  municipality: string,
  urgency: string,
) {
  const mat = MATERIAL_PRICING[selectedMaterial] ?? MATERIAL_PRICING['architectural-30']

  // Material cost
  const adjustedArea = roofAreaSqFt * (1 + mat.wasteFactor)
  const rawMaterialCost = adjustedArea * mat.pricePerSqft * complexityMultiplier

  // Labor cost
  const rawLaborCost = roofAreaSqFt * BASE_LABOR_RATE * mat.laborMultiplier * complexityMultiplier

  // Additional fixed costs
  const permitFee = Math.max(250, roofAreaSqFt * 0.12)
  const disposalFee = roofAreaSqFt * 0.65
  const deliveryFee = Math.max(150, rawMaterialCost * 0.04)
  const additionalTotal = permitFee + disposalFee + deliveryFee

  // Urgency surcharge
  const urgencyMultipliers: Record<string, number> = {
    urgent: 0.12,
    soon: 0.05,
    planning: 0,
    comparing: 0,
  }
  const urgencySurcharge = Math.round(
    (rawMaterialCost + rawLaborCost) * (urgencyMultipliers[urgency] ?? 0)
  )

  const subtotal = Math.round(rawMaterialCost + rawLaborCost + additionalTotal + urgencySurcharge)
  const salesTax = Math.round(subtotal * SALES_TAX_RATE)
  const totalCost = subtotal + salesTax

  return {
    materialCosts: buildCostBreakdown(rawMaterialCost, [0.55, 0.12, 0.12, 0.10, 0.11]),
    laborCosts: buildCostBreakdown(rawLaborCost, [0.65, 0.15, 0.10, 0.07, 0.03]),
    additionalCosts: {
      primary: Math.round(permitFee),
      underlayment: 0,
      flashing: 0,
      ridgeVent: 0,
      accessories: Math.round(disposalFee + deliveryFee),
      total: Math.round(additionalTotal),
    } as CostBreakdown,
    urgencyAdjustment: urgencySurcharge,
    subtotal,
    salesTax,
    totalCost,
    costPerSqft: Math.round((totalCost / roofAreaSqFt) * 100) / 100,
    mat,
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      measurementId,
      measurements,
      selectedMaterial,
      contactInfo,
      municipality,
      urgency,
    } = body

    // --- validation ---
    if (!measurements?.roofAreaSqFt || !selectedMaterial || !contactInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: measurements, selectedMaterial, contactInfo' },
        { status: 400 }
      )
    }

    const calc = computeEstimate(
      measurements.roofAreaSqFt,
      selectedMaterial,
      measurements.features?.complexityMultiplier ?? 1.1,
      municipality ?? 'Colorado',
      urgency ?? 'planning',
    )

    const estimateId = `EST-${Date.now()}`
    const now = new Date().toISOString()
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    const estimateResult = {
      estimateId,
      measurementId: measurementId ?? `MEAS-${Date.now()}`,
      roofArea: measurements.roofAreaSqFt,
      selectedMaterial: {
        id: selectedMaterial,
        name: calc.mat.name,
        category: calc.mat.category,
        warranty: calc.mat.warranty,
      },
      materialCosts: calc.materialCosts,
      laborCosts: calc.laborCosts,
      additionalCosts: calc.additionalCosts,
      subtotal: calc.subtotal,
      salesTax: calc.salesTax,
      urgencyAdjustment: calc.urgencyAdjustment,
      totalCost: calc.totalCost,
      costPerSqft: calc.costPerSqft,
      region: 'Colorado',
      municipality: municipality ?? 'Colorado',
      urgency: urgency ?? 'planning',
      contactInfo,
      validUntil,
      createdAt: now,
    }

    // --- persist to Supabase (non-blocking on failure) ---
    try {
      const db = getSupabaseAdmin()
      await db.from('roof_estimates').insert({
        session_id: estimateId,
        address: measurements.address,
        property_type: 'residential',
        stories: 1,
        roof_area_sqft: measurements.roofAreaSqFt,
        roof_pitch: measurements.slope?.pitchRatio ?? null,
        roof_complexity: measurements.features?.complexityMultiplier > 1.2 ? 'complex' : 'standard',
        material_type: selectedMaterial,
        base_price_per_sqft: calc.mat.pricePerSqft,
        labor_cost: calc.laborCosts.total,
        material_cost: calc.materialCosts.total,
        additional_costs: calc.additionalCosts,
        subtotal: calc.subtotal,
        tax_amount: calc.salesTax,
        total_amount: calc.totalCost,
        status: 'pending',
        expires_at: validUntil,
      })
    } catch (dbErr) {
      console.warn('[calculate-estimate] Supabase insert failed (non-fatal):', dbErr)
    }

    // --- emails + alerts (fire-and-forget) ---
    if (contactInfo?.email) {
      const materialLabel = calc.mat.name

      sendEstimateCompleteEmail({
        email: contactInfo.email,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        address: measurements.address,
        materialType: selectedMaterial,
        materialLabel,
        roofArea: measurements.roofAreaSqFt,
        materialCost: calc.materialCosts.total,
        laborCost: calc.laborCosts.total,
        additionalCosts: {
          permits: calc.additionalCosts.primary,
          disposal: Math.round(calc.additionalCosts.accessories * 0.6),
          delivery: Math.round(calc.additionalCosts.accessories * 0.4),
        },
        subtotal: calc.subtotal,
        taxAmount: calc.salesTax,
        totalAmount: calc.totalCost,
        warrantyYears: parseInt(calc.mat.warranty) || 30,
        estimatedDurationDays: Math.ceil(measurements.roofAreaSqFt / 1500) + 1,
      }).catch(e => console.warn('[email] estimate complete failed:', e))

      sendLeadNotification({
        email: contactInfo.email,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        phone: contactInfo.phone,
        address: measurements.address,
        source: 'estimator_wizard',
        leadScore: 85,
        priority: 'high',
        estimateTotal: calc.totalCost,
        materialType: selectedMaterial,
      }).catch(e => console.warn('[email] lead notification failed:', e))

      alertHotLead({
        email: contactInfo.email,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        phone: contactInfo.phone,
        address: measurements.address,
        source: 'estimator_wizard',
        leadScore: 85,
        priority: 'high',
        estimateTotal: calc.totalCost,
        materialType: selectedMaterial,
      }).catch(e => console.warn('[alert] hot lead alert failed:', e))
    }

    return NextResponse.json({
      success: true,
      estimateId,
      estimate: estimateResult,
      breakdown: {
        materialCosts: calc.materialCosts,
        laborCosts: calc.laborCosts,
        additionalCosts: calc.additionalCosts,
      },
      createdAt: now,
    })
  } catch (err) {
    console.error('[calculate-estimate] unhandled error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error during estimate calculation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/webhooks/calculate-estimate',
    method: 'POST',
    body: {
      measurementId: 'string',
      measurements: 'RoofMeasurements object from /api/webhooks/roof-analysis',
      selectedMaterial: 'architectural-25 | architectural-30 | lifetime-premium | standing-seam-steel | corrugated-metal',
      contactInfo: '{ firstName, lastName, email, phone, projectTimeline }',
      municipality: 'string (optional)',
      urgency: 'urgent | soon | planning | comparing',
    },
  })
}
