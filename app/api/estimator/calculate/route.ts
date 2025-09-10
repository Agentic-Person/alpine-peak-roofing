import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { n8nClient } from '@/lib/n8n/client'

interface EstimateRequest {
  sessionId?: string
  leadId?: string
  address: string
  propertyType?: string
  materialType: string
  materialGrade?: string
  roofArea?: number
  stories?: number
  roofComplexity?: string
  specialRequirements?: string
}

interface PricingData {
  basePrice: number
  laborMultiplier: number
  complexityMultiplier: number
  materialMultiplier: number
}

// Base pricing data (per sq ft)
const MATERIAL_PRICING: Record<string, PricingData> = {
  'asphalt-shingles': {
    basePrice: 3.50,
    laborMultiplier: 1.0,
    complexityMultiplier: 1.0,
    materialMultiplier: 1.0
  },
  'architectural-shingles': {
    basePrice: 4.25,
    laborMultiplier: 1.1,
    complexityMultiplier: 1.0,
    materialMultiplier: 1.2
  },
  'metal-roofing': {
    basePrice: 8.50,
    laborMultiplier: 1.3,
    complexityMultiplier: 1.2,
    materialMultiplier: 1.5
  },
  'tile-roofing': {
    basePrice: 12.00,
    laborMultiplier: 1.5,
    complexityMultiplier: 1.4,
    materialMultiplier: 1.8
  },
  'slate': {
    basePrice: 18.00,
    laborMultiplier: 1.8,
    complexityMultiplier: 1.6,
    materialMultiplier: 2.2
  }
}

const COMPLEXITY_MULTIPLIERS = {
  'simple': 1.0,
  'standard': 1.2,
  'complex': 1.5,
  'very-complex': 1.8
}

function calculateEstimate(data: EstimateRequest & { roofArea: number }) {
  const pricing = MATERIAL_PRICING[data.materialType] || MATERIAL_PRICING['asphalt-shingles']
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[data.roofComplexity as keyof typeof COMPLEXITY_MULTIPLIERS] || 1.2
  const storiesMultiplier = Math.max(1.0, (data.stories || 1) * 0.1 + 0.9)

  // Base calculations
  const basePricePerSqft = pricing.basePrice
  const materialCostPerSqft = basePricePerSqft * pricing.materialMultiplier
  const laborCostPerSqft = basePricePerSqft * pricing.laborMultiplier

  // Apply multipliers
  const adjustedMaterialCost = materialCostPerSqft * complexityMultiplier * storiesMultiplier
  const adjustedLaborCost = laborCostPerSqft * complexityMultiplier * storiesMultiplier

  const totalMaterialCost = adjustedMaterialCost * data.roofArea
  const totalLaborCost = adjustedLaborCost * data.roofArea

  // Additional costs
  const permitCost = Math.max(250, data.roofArea * 0.15)
  const disposalCost = data.roofArea * 0.75
  const materialDeliveryCost = Math.max(150, totalMaterialCost * 0.05)

  const subtotal = totalMaterialCost + totalLaborCost + permitCost + disposalCost + materialDeliveryCost
  const taxRate = 0.0765 // Example tax rate for Denver area
  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount

  return {
    roofArea: data.roofArea,
    basePricePerSqft,
    materialCost: totalMaterialCost,
    laborCost: totalLaborCost,
    additionalCosts: {
      permits: permitCost,
      disposal: disposalCost,
      delivery: materialDeliveryCost
    },
    subtotal,
    taxAmount,
    totalAmount: total,
    estimatedDurationDays: Math.ceil(data.roofArea / 1500) + (data.stories || 1),
    warrantyYears: data.materialType === 'slate' ? 50 : data.materialType === 'metal-roofing' ? 30 : 25
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as EstimateRequest

    if (!body.address || !body.materialType) {
      return NextResponse.json(
        { error: 'Missing required fields: address, materialType' },
        { status: 400 }
      )
    }

    // For now, use provided roof area or estimate based on property type
    let roofArea = body.roofArea
    if (!roofArea) {
      // Default estimates based on property type
      const defaultAreas = {
        'single-family': 2000,
        'townhouse': 1500,
        'condo': 1200,
        'commercial': 5000,
        'multi-family': 3500
      }
      roofArea = defaultAreas[body.propertyType as keyof typeof defaultAreas] || 2000
    }

    // Calculate the estimate
    const estimate = calculateEstimate({ ...body, roofArea })

    // Save to database
    const { data: savedEstimate, error } = await supabase
      .from('roof_estimates')
      .insert({
        lead_id: body.leadId,
        session_id: body.sessionId,
        address: body.address,
        property_type: body.propertyType || 'residential',
        stories: body.stories || 1,
        roof_area_sqft: roofArea,
        roof_complexity: body.roofComplexity || 'standard',
        material_type: body.materialType,
        material_grade: body.materialGrade,
        base_price_per_sqft: estimate.basePricePerSqft,
        labor_cost: estimate.laborCost,
        material_cost: estimate.materialCost,
        additional_costs: estimate.additionalCosts,
        subtotal: estimate.subtotal,
        tax_amount: estimate.taxAmount,
        total_amount: estimate.totalAmount,
        estimated_duration_days: estimate.estimatedDurationDays,
        warranty_years: estimate.warrantyYears,
        special_requirements: body.specialRequirements,
        status: 'draft',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    // Trigger n8n roof estimation workflow for PDF generation and follow-up
    try {
      await n8nClient.generateRoofEstimate(body.address, {
        estimateId: savedEstimate?.id,
        ...estimate,
        timestamp: new Date().toISOString()
      })
    } catch (n8nError) {
      console.error('n8n roof estimation workflow failed:', n8nError)
    }

    return NextResponse.json({
      success: true,
      data: {
        estimateId: savedEstimate?.id,
        ...estimate,
        expiresAt: savedEstimate?.expires_at
      }
    })

  } catch (error) {
    console.error('Roof estimate calculation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to calculate roof estimate',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Roof estimator endpoint is active',
    methods: ['POST'],
    requiredFields: ['address', 'materialType'],
    optionalFields: [
      'sessionId', 'leadId', 'propertyType', 'materialGrade',
      'roofArea', 'stories', 'roofComplexity', 'specialRequirements'
    ],
    supportedMaterials: Object.keys(MATERIAL_PRICING)
  })
}