# Roof Calculation Logic & Algorithms

## 🧮 Overview
This document defines the mathematical algorithms and business logic for converting Google Maps Building Insights data into accurate roof measurements and cost estimates.

## 📐 Core Measurement Algorithms

### 1. Roof Area Calculation
**Primary Algorithm: Shoelace Formula**
```typescript
// lib/calculations/area.ts
export function calculatePolygonArea(coordinates: Coordinate[]): number {
  let area = 0;
  const n = coordinates.length;
  
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += coordinates[i].x * coordinates[j].y;
    area -= coordinates[j].x * coordinates[i].y;
  }
  
  return Math.abs(area) / 2;
}

export function calculateRoofAreaSqft(roofPolygon: Coordinate[]): number {
  // Calculate area in square meters
  const areaSqMeters = calculatePolygonArea(roofPolygon);
  
  // Convert to square feet (1 sq meter = 10.764 sq feet)
  const areaSqFeet = areaSqMeters * 10.764;
  
  // Apply correction factor for measurement accuracy
  const correctionFactor = 1.02; // 2% adjustment for satellite distortion
  
  return Math.round(areaSqFeet * correctionFactor);
}
```

### 2. Roof Slope/Pitch Calculation
```typescript
// lib/calculations/slope.ts
export interface SlopeData {
  averagePitch: number;      // Average roof pitch (rise/run ratio)
  pitchDegrees: number;      // Pitch in degrees
  pitchRatio: string;        // Traditional ratio (e.g., "6/12")
  slopeCategory: 'low' | 'standard' | 'steep';
}

export function calculateRoofSlope(heightPoints: HeightPoint[]): SlopeData {
  let totalRise = 0;
  let totalRun = 0;
  let measurements = 0;
  
  // Calculate slope between adjacent height points
  for (let i = 0; i < heightPoints.length - 1; i++) {
    const point1 = heightPoints[i];
    const point2 = heightPoints[i + 1];
    
    const rise = Math.abs(point2.height - point1.height);
    const run = calculateDistance(point1.coordinates, point2.coordinates);
    
    if (run > 0) {
      totalRise += rise;
      totalRun += run;
      measurements++;
    }
  }
  
  if (measurements === 0) return getDefaultSlope();
  
  const averageRise = totalRise / measurements;
  const averageRun = totalRun / measurements;
  const pitch = averageRise / averageRun;
  
  return {
    averagePitch: pitch,
    pitchDegrees: Math.atan(pitch) * (180 / Math.PI),
    pitchRatio: convertToTraditionalPitch(pitch),
    slopeCategory: categorizePitch(pitch)
  };
}

function convertToTraditionalPitch(pitch: number): string {
  // Convert decimal pitch to traditional rise/run format
  const rise = Math.round(pitch * 12);
  return `${rise}/12`;
}

function categorizePitch(pitch: number): 'low' | 'standard' | 'steep' {
  if (pitch < 0.25) return 'low';        // Less than 3/12
  if (pitch > 0.75) return 'steep';      // Greater than 9/12
  return 'standard';                     // 3/12 to 9/12
}
```

### 3. Ridge and Valley Detection
```typescript
// lib/calculations/features.ts
export interface RoofFeatures {
  ridgeLength: number;       // Total ridge line length in feet
  valleyLength: number;      // Total valley length in feet
  hipsLength: number;        // Hip line length in feet
  rakeLength: number;        // Rake edge length in feet
  eaveLength: number;        // Eave edge length in feet
  complexity: number;        // Complexity multiplier (1.0 - 2.5)
}

export function analyzeRoofFeatures(roofPolygon: Coordinate[], heightData: HeightPoint[]): RoofFeatures {
  const features: RoofFeatures = {
    ridgeLength: 0,
    valleyLength: 0,
    hipsLength: 0,
    rakeLength: 0,
    eaveLength: 0,
    complexity: 1.0
  };
  
  // Detect ridge lines (highest elevation changes)
  features.ridgeLength = calculateRidgeLines(heightData);
  
  // Detect valleys (lowest elevation points between sections)
  features.valleyLength = calculateValleys(heightData);
  
  // Calculate perimeter edges
  const perimeterLength = calculatePerimeter(roofPolygon);
  features.eaveLength = perimeterLength * 0.6; // Estimate 60% are eaves
  features.rakeLength = perimeterLength * 0.4;  // Estimate 40% are rakes
  
  // Calculate complexity multiplier
  features.complexity = calculateComplexityMultiplier(features);
  
  return features;
}

function calculateComplexityMultiplier(features: RoofFeatures): number {
  let complexity = 1.0;
  
  // Add complexity for valleys (harder to install)
  if (features.valleyLength > 50) complexity += 0.3;
  if (features.valleyLength > 100) complexity += 0.2;
  
  // Add complexity for long ridge lines
  if (features.ridgeLength > 100) complexity += 0.2;
  
  // Cap at reasonable maximum
  return Math.min(complexity, 2.5);
}
```

## 💰 Pricing Calculation Engine

### 1. Material Pricing Structure
```typescript
// lib/calculations/pricing.ts
export interface MaterialPricing {
  id: string;
  name: string;
  category: 'shingles' | 'metal' | 'tile' | 'accessory';
  pricePerSqft: number;
  laborMultiplier: number;
  wasteFactor: number;
  warranty: string;
  description: string;
}

export const MATERIAL_CATALOG: MaterialPricing[] = [
  // Shingle Options
  {
    id: 'architectural-25',
    name: '25-Year Architectural Shingles',
    category: 'shingles',
    pricePerSqft: 1.25,
    laborMultiplier: 1.0,
    wasteFactor: 0.10,
    warranty: '25 years',
    description: 'Standard architectural shingles with good durability'
  },
  {
    id: 'architectural-30',
    name: '30-Year Architectural Shingles',
    category: 'shingles',
    pricePerSqft: 1.65,
    laborMultiplier: 1.0,
    wasteFactor: 0.10,
    warranty: '30 years',
    description: 'Premium architectural shingles with enhanced weather protection'
  },
  {
    id: 'lifetime-premium',
    name: 'Lifetime Premium Shingles',
    category: 'shingles',
    pricePerSqft: 2.25,
    laborMultiplier: 1.1,
    wasteFactor: 0.12,
    warranty: 'Lifetime',
    description: 'Top-tier shingles with maximum durability and wind resistance'
  },
  
  // Metal Roofing Options
  {
    id: 'standing-seam-steel',
    name: 'Standing Seam Steel',
    category: 'metal',
    pricePerSqft: 3.75,
    laborMultiplier: 1.4,
    wasteFactor: 0.08,
    warranty: '40 years',
    description: 'Durable steel roofing with concealed fasteners'
  },
  {
    id: 'corrugated-metal',
    name: 'Corrugated Metal Panels',
    category: 'metal',
    pricePerSqft: 2.25,
    laborMultiplier: 1.2,
    wasteFactor: 0.10,
    warranty: '25 years',
    description: 'Cost-effective metal roofing with exposed fasteners'
  }
];
```

### 2. Cost Calculation Algorithm
```typescript
// lib/calculations/estimate.ts
export interface EstimateBreakdown {
  roofArea: number;
  materialCosts: MaterialCostBreakdown;
  laborCosts: LaborCostBreakdown;
  additionalCosts: AdditionalCosts;
  totalCost: number;
  costPerSqft: number;
}

export function calculateRoofEstimate(
  measurements: RoofMeasurements,
  selectedMaterials: string[],
  laborRates: RegionalRates
): EstimateBreakdown {
  
  const { area, features, slope } = measurements;
  
  // Calculate base material costs
  const materialCosts = calculateMaterialCosts(area, selectedMaterials, features);
  
  // Calculate labor costs with regional adjustments
  const laborCosts = calculateLaborCosts(area, slope, features, laborRates);
  
  // Calculate additional costs (permits, disposal, etc.)
  const additionalCosts = calculateAdditionalCosts(area, laborRates.region);
  
  const totalCost = materialCosts.total + laborCosts.total + additionalCosts.total;
  
  return {
    roofArea: area,
    materialCosts,
    laborCosts,
    additionalCosts,
    totalCost: Math.round(totalCost),
    costPerSqft: Math.round((totalCost / area) * 100) / 100
  };
}

function calculateMaterialCosts(
  area: number,
  materialIds: string[],
  features: RoofFeatures
): MaterialCostBreakdown {
  
  let totalMaterialCost = 0;
  const breakdown: MaterialCostBreakdown = {
    primary: 0,
    underlayment: 0,
    flashing: 0,
    ridgeVent: 0,
    accessories: 0,
    total: 0
  };
  
  // Primary roofing material
  const primaryMaterial = MATERIAL_CATALOG.find(m => m.id === materialIds[0]);
  if (primaryMaterial) {
    const wasteAdjustedArea = area * (1 + primaryMaterial.wasteFactor);
    const complexityAdjustedArea = wasteAdjustedArea * features.complexity;
    breakdown.primary = complexityAdjustedArea * primaryMaterial.pricePerSqft;
  }
  
  // Underlayment (required for all roofs)
  breakdown.underlayment = area * 0.45; // $0.45 per sqft for synthetic underlayment
  
  // Flashing and trim materials
  const totalLinearFeet = features.ridgeLength + features.valleyLength + features.rakeLength;
  breakdown.flashing = totalLinearFeet * 3.25; // $3.25 per linear foot
  
  // Ridge ventilation
  breakdown.ridgeVent = features.ridgeLength * 2.75; // $2.75 per linear foot
  
  // Additional accessories (gutters, drip edge, etc.)
  breakdown.accessories = features.eaveLength * 4.50; // $4.50 per linear foot
  
  breakdown.total = breakdown.primary + breakdown.underlayment + 
                   breakdown.flashing + breakdown.ridgeVent + breakdown.accessories;
  
  return breakdown;
}

function calculateLaborCosts(
  area: number,
  slope: SlopeData,
  features: RoofFeatures,
  rates: RegionalRates
): LaborCostBreakdown {
  
  const baseRate = rates.baseLaborRate; // Base rate per sqft
  let laborMultiplier = 1.0;
  
  // Adjust for roof slope difficulty
  switch (slope.slopeCategory) {
    case 'low':
      laborMultiplier *= 1.1; // Low slope requires special handling
      break;
    case 'steep':
      laborMultiplier *= 1.3; // Steep roofs are more dangerous/difficult
      break;
    default:
      laborMultiplier *= 1.0;
  }
  
  // Adjust for complexity
  laborMultiplier *= features.complexity;
  
  const breakdown: LaborCostBreakdown = {
    installation: area * baseRate * laborMultiplier,
    tearOff: area * rates.tearOffRate,
    disposal: area * rates.disposalRate,
    permits: rates.permitFee,
    total: 0
  };
  
  breakdown.total = breakdown.installation + breakdown.tearOff + 
                   breakdown.disposal + breakdown.permits;
  
  return breakdown;
}
```

### 3. Regional Pricing Adjustments
```typescript
// lib/calculations/regional.ts
export interface RegionalRates {
  region: string;
  baseLaborRate: number;
  tearOffRate: number;
  disposalRate: number;
  permitFee: number;
  salesTax: number;
  adjustmentFactor: number;
}

export const COLORADO_RATES: RegionalRates = {
  region: 'Colorado',
  baseLaborRate: 2.25,     // $2.25 per sqft for installation
  tearOffRate: 0.75,       // $0.75 per sqft for removal
  disposalRate: 0.35,      // $0.35 per sqft for disposal
  permitFee: 125,          // $125 flat fee for permits
  salesTax: 0.029,         // 2.9% state sales tax (varies by municipality)
  adjustmentFactor: 1.0    // Base factor for Colorado
};

// Municipality-specific adjustments
export const MUNICIPAL_ADJUSTMENTS: Record<string, number> = {
  'Denver': 1.15,
  'Boulder': 1.25,
  'Fort Collins': 1.10,
  'Colorado Springs': 1.05,
  'Aurora': 1.12,
  'Westminster': 1.18
};

export function getRegionalRates(city: string, state: string): RegionalRates {
  if (state !== 'CO') {
    throw new Error('Currently only serving Colorado');
  }
  
  const baseRates = { ...COLORADO_RATES };
  const adjustment = MUNICIPAL_ADJUSTMENTS[city] || 1.0;
  
  // Apply municipal adjustment to labor rates
  baseRates.baseLaborRate *= adjustment;
  baseRates.tearOffRate *= adjustment;
  
  return baseRates;
}
```

## 🎯 Accuracy Validation & Quality Control

### 1. Measurement Validation
```typescript
// lib/validation/measurements.ts
export interface ValidationResult {
  isValid: boolean;
  confidence: number;      // 0-1 confidence score
  warnings: string[];
  errors: string[];
}

export function validateMeasurements(measurements: RoofMeasurements): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    confidence: 1.0,
    warnings: [],
    errors: []
  };
  
  // Validate roof area is reasonable
  if (measurements.area < 500) {
    result.warnings.push('Roof area seems small - please verify address');
    result.confidence *= 0.9;
  }
  
  if (measurements.area > 8000) {
    result.warnings.push('Large roof detected - estimate may need manual review');
    result.confidence *= 0.95;
  }
  
  // Validate slope calculations
  if (measurements.slope.averagePitch === 0) {
    result.errors.push('Unable to determine roof slope - manual review required');
    result.isValid = false;
  }
  
  // Check for unreasonable complexity
  if (measurements.features.complexity > 2.0) {
    result.warnings.push('Complex roof structure detected - consider professional site visit');
    result.confidence *= 0.85;
  }
  
  return result;
}
```

### 2. Cost Validation
```typescript
// lib/validation/pricing.ts
export function validateEstimate(estimate: EstimateBreakdown): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    confidence: 1.0,
    warnings: [],
    errors: []
  };
  
  // Check cost per sqft is reasonable
  if (estimate.costPerSqft < 4.00) {
    result.warnings.push('Estimate seems low - may not include all necessary components');
    result.confidence *= 0.8;
  }
  
  if (estimate.costPerSqft > 25.00) {
    result.warnings.push('High-end estimate - customer may want multiple quotes');
    result.confidence *= 0.9;
  }
  
  // Validate material cost ratios
  const materialRatio = estimate.materialCosts.total / estimate.totalCost;
  if (materialRatio < 0.3 || materialRatio > 0.7) {
    result.warnings.push('Unusual material to labor ratio - verify calculations');
    result.confidence *= 0.85;
  }
  
  return result;
}
```

## 🔄 Integration Points

### 1. n8n Calculation Workflow
```json
{
  "name": "roof-calculation-engine",
  "nodes": [
    {
      "name": "Receive Measurement Data",
      "type": "webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "calculate-estimate"
      }
    },
    {
      "name": "Validate Input Data",
      "type": "function",
      "parameters": {
        "functionCode": "return validateMeasurements($input.all());"
      }
    },
    {
      "name": "Calculate Material Costs",
      "type": "function",
      "parameters": {
        "functionCode": "return calculateMaterialCosts($json.area, $json.materials, $json.features);"
      }
    },
    {
      "name": "Calculate Labor Costs",
      "type": "function",
      "parameters": {
        "functionCode": "return calculateLaborCosts($json.area, $json.slope, $json.features, $json.rates);"
      }
    },
    {
      "name": "Generate Final Estimate",
      "type": "function",
      "parameters": {
        "functionCode": "return generateEstimateBreakdown($input.all());"
      }
    },
    {
      "name": "Store Estimate",
      "type": "supabase",
      "parameters": {
        "operation": "insert",
        "table": "roof_estimates"
      }
    }
  ]
}
```

### 2. Database Schema for Calculations
```sql
-- Roof estimates storage
CREATE TABLE roof_estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  coordinates POINT NOT NULL,
  
  -- Measurement data
  roof_area_sqft DECIMAL(8,2) NOT NULL,
  roof_slope_pitch DECIMAL(4,2),
  ridge_length_ft DECIMAL(7,2),
  valley_length_ft DECIMAL(7,2),
  complexity_factor DECIMAL(3,2),
  
  -- Cost breakdown
  material_costs JSONB,
  labor_costs JSONB,
  additional_costs JSONB,
  total_cost DECIMAL(10,2),
  cost_per_sqft DECIMAL(5,2),
  
  -- Validation
  confidence_score DECIMAL(3,2),
  validation_warnings TEXT[],
  requires_manual_review BOOLEAN DEFAULT false,
  
  -- Metadata
  selected_materials TEXT[],
  regional_rates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days'
);

-- Create indexes for performance
CREATE INDEX idx_roof_estimates_address ON roof_estimates USING gin(address gin_trgm_ops);
CREATE INDEX idx_roof_estimates_coordinates ON roof_estimates USING gist(coordinates);
CREATE INDEX idx_roof_estimates_created_at ON roof_estimates(created_at);
```

---

**Document Version:** 1.0  
**Last Updated:** September 7, 2025  
**Next Review:** After measurement algorithm testing