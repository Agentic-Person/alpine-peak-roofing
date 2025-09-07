import type { RoofMeasurements, EstimateResult, ContactInfo } from '../store/useEstimatorStore';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Error class for API responses
export class APIError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.message || `Request failed with status ${response.status}`,
      response.status,
      errorData.code
    );
  }

  return response.json();
}

// Roof analysis API call
export interface RoofAnalysisRequest {
  address: string;
}

export interface RoofAnalysisResponse {
  success: boolean;
  measurements?: RoofMeasurements;
  measurementId?: string;
  error?: string;
  processedAt?: string;
}

export async function analyzeRoof(address: string): Promise<RoofAnalysisResponse> {
  try {
    // For demo purposes, return mock data if in development
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            measurements: {
              address: address,
              coordinates: { lat: 38.8339, lng: -104.8214 },
              boundingBox: {},
              roofAreaSqFt: 2450,
              roofAreaSqMeters: 227.5,
              slope: {
                averagePitchDegrees: 22.5,
                averageAzimuthDegrees: 180,
                category: 'standard',
                pitchRatio: '6/12'
              },
              features: {
                segmentCount: 4,
                ridgeLengthFt: 120,
                valleyLengthFt: 35,
                eaveLength: 140,
                rakeLength: 85,
                complexityMultiplier: 1.15
              },
              imageryQuality: 'HIGH',
              confidenceScore: 0.92,
              sunshineQuantiles: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
              roofSegments: [],
              processedAt: new Date().toISOString(),
              validation: {
                isValid: true,
                warnings: [],
                errors: []
              }
            },
            measurementId: `MEAS-${Date.now()}`,
            processedAt: new Date().toISOString()
          });
        }, 2000); // Simulate API delay
      });
    }

    return await apiRequest<RoofAnalysisResponse>('/api/webhooks/roof-analysis', {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  } catch (error) {
    console.error('Roof analysis error:', error);
    if (error instanceof APIError) {
      return { success: false, error: error.message };
    }
    return { 
      success: false, 
      error: 'Unable to analyze roof. Please check your address and try again.' 
    };
  }
}

// Estimate calculation API call
export interface EstimateRequest {
  measurementId: string;
  measurements: RoofMeasurements;
  selectedMaterial: string;
  contactInfo: ContactInfo;
  municipality: string;
  urgency: string;
}

export interface EstimateResponse {
  success: boolean;
  estimateId?: string;
  estimate?: EstimateResult;
  breakdown?: {
    materialCosts: any;
    laborCosts: any;
    additionalCosts: any;
  };
  validation?: any;
  error?: string;
  createdAt?: string;
}

export async function calculateEstimate(request: EstimateRequest): Promise<EstimateResponse> {
  try {
    // For demo purposes, return mock data if in development
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          const totalCost = Math.round(request.measurements.roofAreaSqFt * (6.5 + Math.random() * 3));
          
          resolve({
            success: true,
            estimateId: `EST-${Date.now()}`,
            estimate: {
              estimateId: `EST-${Date.now()}`,
              measurementId: request.measurementId,
              roofArea: request.measurements.roofAreaSqFt,
              selectedMaterial: {
                id: request.selectedMaterial,
                name: getMaterialName(request.selectedMaterial),
                category: 'shingles',
                warranty: '30 years'
              },
              materialCosts: {
                primary: Math.round(totalCost * 0.45),
                underlayment: Math.round(totalCost * 0.08),
                flashing: Math.round(totalCost * 0.07),
                ridgeVent: Math.round(totalCost * 0.05),
                accessories: Math.round(totalCost * 0.05),
                total: Math.round(totalCost * 0.70)
              },
              laborCosts: {
                primary: Math.round(totalCost * 0.20),
                underlayment: Math.round(totalCost * 0.05),
                flashing: Math.round(totalCost * 0.03),
                ridgeVent: Math.round(totalCost * 0.02),
                accessories: 0,
                total: Math.round(totalCost * 0.30)
              },
              additionalCosts: {
                primary: 150,
                underlayment: 0,
                flashing: 0,
                ridgeVent: 0,
                accessories: 0,
                total: 150
              },
              subtotal: totalCost,
              salesTax: Math.round(totalCost * 0.029),
              urgencyAdjustment: 0,
              totalCost: Math.round(totalCost * 1.029),
              costPerSqft: Math.round((totalCost * 1.029) / request.measurements.roofAreaSqFt * 100) / 100,
              region: 'Colorado',
              municipality: request.municipality,
              urgency: request.urgency,
              contactInfo: request.contactInfo,
              validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              createdAt: new Date().toISOString()
            },
            createdAt: new Date().toISOString()
          });
        }, 1500); // Simulate API delay
      });
    }

    return await apiRequest<EstimateResponse>('/api/webhooks/calculate-estimate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error('Estimate calculation error:', error);
    if (error instanceof APIError) {
      return { success: false, error: error.message };
    }
    return { 
      success: false, 
      error: 'Unable to calculate estimate. Please try again.' 
    };
  }
}

// PDF generation API call
export interface PDFGenerationRequest {
  estimateId: string;
  estimateData: EstimateResult;
}

export interface PDFGenerationResponse {
  success: boolean;
  estimateId?: string;
  pdfGenerated?: boolean;
  pdfUrl?: string;
  emailSent?: boolean;
  emailAddress?: string;
  crmLeadCreated?: boolean;
  error?: string;
  completedAt?: string;
}

export async function generatePDF(request: PDFGenerationRequest): Promise<PDFGenerationResponse> {
  try {
    // For demo purposes, return mock data if in development
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            estimateId: request.estimateId,
            pdfGenerated: true,
            pdfUrl: `https://example.com/estimates/${request.estimateId}.pdf`,
            emailSent: true,
            emailAddress: request.estimateData.contactInfo.email,
            crmLeadCreated: true,
            completedAt: new Date().toISOString()
          });
        }, 3000); // Simulate PDF generation delay
      });
    }

    return await apiRequest<PDFGenerationResponse>('/api/webhooks/generate-pdf', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    if (error instanceof APIError) {
      return { success: false, error: error.message };
    }
    return { 
      success: false, 
      error: 'Unable to generate PDF. Please try again or contact support.' 
    };
  }
}

// Material pricing API call
export interface MaterialOption {
  id: string;
  name: string;
  category: 'shingles' | 'metal' | 'tile';
  pricePerSqft: number;
  laborMultiplier: number;
  wasteFactor: number;
  warranty: string;
  description: string;
  features: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface MaterialPricingResponse {
  success: boolean;
  materials?: MaterialOption[];
  estimates?: Record<string, number>;
  error?: string;
}

export async function getMaterialPricing(roofAreaSqFt: number): Promise<MaterialPricingResponse> {
  try {
    // For demo purposes, return mock data
    const materials: MaterialOption[] = [
      {
        id: 'architectural-25',
        name: '25-Year Architectural Shingles',
        category: 'shingles',
        pricePerSqft: 1.25,
        laborMultiplier: 1.0,
        wasteFactor: 0.10,
        warranty: '25 years',
        description: 'Standard architectural shingles with good durability',
        features: ['25-year warranty', 'Wind resistant', 'Multiple colors'],
        imageUrl: '/images/shingles-25yr.jpg'
      },
      {
        id: 'architectural-30',
        name: '30-Year Architectural Shingles',
        category: 'shingles',
        pricePerSqft: 1.65,
        laborMultiplier: 1.0,
        wasteFactor: 0.10,
        warranty: '30 years',
        description: 'Premium architectural shingles with enhanced weather protection',
        features: ['30-year warranty', 'Enhanced durability', 'Premium appearance'],
        imageUrl: '/images/shingles-30yr.jpg',
        popular: true
      },
      {
        id: 'lifetime-premium',
        name: 'Lifetime Premium Shingles',
        category: 'shingles',
        pricePerSqft: 2.25,
        laborMultiplier: 1.1,
        wasteFactor: 0.12,
        warranty: 'Lifetime',
        description: 'Top-tier shingles with maximum durability and wind resistance',
        features: ['Lifetime warranty', 'Maximum protection', 'Designer colors'],
        imageUrl: '/images/shingles-lifetime.jpg'
      },
      {
        id: 'standing-seam-steel',
        name: 'Standing Seam Steel',
        category: 'metal',
        pricePerSqft: 3.75,
        laborMultiplier: 1.4,
        wasteFactor: 0.08,
        warranty: '40 years',
        description: 'Durable steel roofing with concealed fasteners',
        features: ['40-year warranty', 'Energy efficient', 'Concealed fasteners'],
        imageUrl: '/images/metal-standing-seam.jpg'
      },
      {
        id: 'corrugated-metal',
        name: 'Corrugated Metal Panels',
        category: 'metal',
        pricePerSqft: 2.25,
        laborMultiplier: 1.2,
        wasteFactor: 0.10,
        warranty: '25 years',
        description: 'Cost-effective metal roofing with exposed fasteners',
        features: ['25-year warranty', 'Low maintenance', 'Energy efficient'],
        imageUrl: '/images/metal-corrugated.jpg'
      }
    ];

    // Calculate rough estimates for each material
    const estimates: Record<string, number> = {};
    materials.forEach(material => {
      const wasteAdjustedArea = roofAreaSqFt * (1 + material.wasteFactor);
      const materialCost = wasteAdjustedArea * material.pricePerSqft;
      const laborCost = roofAreaSqFt * 2.25 * material.laborMultiplier;
      const totalCost = materialCost + laborCost + (roofAreaSqFt * 1.5); // Additional costs
      estimates[material.id] = Math.round(totalCost);
    });

    return {
      success: true,
      materials,
      estimates
    };
  } catch (error) {
    console.error('Material pricing error:', error);
    return { 
      success: false, 
      error: 'Unable to load material pricing. Please try again.' 
    };
  }
}

// Helper function to get material name by ID
function getMaterialName(materialId: string): string {
  const materialNames: Record<string, string> = {
    'architectural-25': '25-Year Architectural Shingles',
    'architectural-30': '30-Year Architectural Shingles',
    'lifetime-premium': 'Lifetime Premium Shingles',
    'standing-seam-steel': 'Standing Seam Steel',
    'corrugated-metal': 'Corrugated Metal Panels'
  };
  
  return materialNames[materialId] || 'Unknown Material';
}

// Utility function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Utility function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}