# Google Maps Integration Guide

## 🗺️ Overview
This document outlines the integration of Google Maps APIs for automated roof measurement and estimation. The system will use multiple Google Maps services to provide accurate, instant roof calculations.

## 🔑 Required Google Maps APIs

### 1. Building Insights API (Primary)
**Purpose:** Extract detailed building and roof information from satellite imagery
**Pricing:** $0.10 per successful request
**Usage Limits:** 1,000 requests per day (default)

**Key Features:**
- Roof geometry extraction from satellite imagery
- Solar panel potential analysis (includes roof area)
- Building height and orientation data
- Quality score for measurement confidence

**API Endpoint:**
```
POST https://solar.googleapis.com/v1/buildingInsights:findClosest
```

**Request Format:**
```json
{
  "location": {
    "latitude": 39.7392,
    "longitude": -104.9903
  },
  "requiredQuality": "HIGH"
}
```

### 2. Geocoding API
**Purpose:** Convert addresses to coordinates and validate locations
**Pricing:** $5.00 per 1000 requests
**Usage Limits:** 40,000 requests per month (free tier)

**Key Features:**
- Address to latitude/longitude conversion
- Address validation and formatting
- Component filtering (restrict to specific regions)
- Reverse geocoding for coordinate validation

**API Endpoint:**
```
GET https://maps.googleapis.com/maps/api/geocode/json
```

**Request Example:**
```
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
```

### 3. Static Maps API
**Purpose:** Generate visual reference images for estimates
**Pricing:** $2.00 per 1000 requests
**Usage Limits:** 25,000 requests per day (free tier)

**Key Features:**
- Satellite imagery of properties
- Custom markers and overlays
- Multiple image formats (PNG, JPG)
- Various zoom levels and sizes

**API Endpoint:**
```
GET https://maps.googleapis.com/maps/api/staticmap
```

**Request Example:**
```
https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=satellite&key=YOUR_API_KEY
```

### 4. Places API (Autocomplete)
**Purpose:** Provide address suggestions and validation
**Pricing:** $2.83 per 1000 requests (Autocomplete)
**Usage Limits:** Per-session billing available

**Key Features:**
- Real-time address suggestions
- Place details and verification
- Geographic bounds filtering
- Session-based pricing optimization

**API Endpoint:**
```
GET https://maps.googleapis.com/maps/api/place/autocomplete/json
```

## 🏗️ Implementation Architecture

### 1. Data Flow Overview
```
User Address Input
    ↓
Places API (Autocomplete)
    ↓
Geocoding API (Address → Coordinates)
    ↓
Building Insights API (Roof Analysis)
    ↓
Calculation Engine (Area, Slopes, etc.)
    ↓
Static Maps API (Visual Reference)
    ↓
PDF Generation with Images
```

### 2. Core Integration Components

#### Address Validation Service
```typescript
// lib/google-maps/geocoding.ts
export class GeocodingService {
  private apiKey: string;
  
  async validateAddress(address: string): Promise<AddressValidationResult> {
    // Geocode address and extract components
    // Validate service area (Colorado focus)
    // Return formatted address with coordinates
  }
  
  async getCoordinates(address: string): Promise<{lat: number, lng: number}> {
    // Convert address to precise coordinates
    // Handle multiple results and disambiguation
    // Cache results for performance
  }
}
```

#### Roof Analysis Service
```typescript
// lib/google-maps/building-insights.ts
export class RoofAnalysisService {
  private apiKey: string;
  
  async analyzeRoof(coordinates: {lat: number, lng: number}): Promise<RoofAnalysis> {
    // Call Building Insights API
    // Extract roof polygon data
    // Calculate areas and measurements
    // Determine roof complexity factors
  }
  
  async calculateRoofMetrics(roofData: any): Promise<RoofMetrics> {
    // Process raw API data into usable metrics
    // Calculate square footage
    // Determine slopes and angles
    // Identify ridge lines and valleys
  }
}
```

#### Visual Reference Service
```typescript
// lib/google-maps/static-maps.ts
export class StaticMapsService {
  private apiKey: string;
  
  async generateRoofImage(coordinates: {lat: number, lng: number}): Promise<string> {
    // Generate high-resolution satellite image
    // Add property boundary overlay
    // Include scale and orientation markers
    // Return image URL for PDF inclusion
  }
}
```

## 🔧 Configuration & Setup

### 1. Environment Variables
```env
# Google Maps API Configuration
GOOGLE_MAPS_API_KEY=your_api_key_here
GOOGLE_MAPS_BILLING_PROJECT_ID=your_project_id

# API Quotas and Limits
GEOCODING_RATE_LIMIT=100  # requests per minute
BUILDING_INSIGHTS_RATE_LIMIT=60  # requests per hour
STATIC_MAPS_CACHE_TTL=3600  # seconds

# Service Area Configuration
SERVICE_AREA_BOUNDS_NE_LAT=41.0
SERVICE_AREA_BOUNDS_NE_LNG=-102.0
SERVICE_AREA_BOUNDS_SW_LAT=37.0
SERVICE_AREA_BOUNDS_SW_LNG=-109.0
```

### 2. API Key Setup & Security
```typescript
// lib/config/google-maps.ts
export const googleMapsConfig = {
  apiKey: process.env.GOOGLE_MAPS_API_KEY!,
  
  // API-specific configurations
  geocoding: {
    components: 'country:US|administrative_area:CO', // Colorado focus
    region: 'us'
  },
  
  buildingInsights: {
    requiredQuality: 'HIGH',
    pixelSizeMeters: 0.5 // High resolution for accuracy
  },
  
  staticMaps: {
    size: '800x600',
    maptype: 'satellite',
    format: 'png',
    scale: 2 // High DPI for PDF quality
  }
};
```

### 3. Rate Limiting & Caching
```typescript
// lib/google-maps/rate-limiter.ts
export class APIRateLimiter {
  private quotas: Map<string, number> = new Map();
  
  async checkQuota(apiName: string): Promise<boolean> {
    // Check current usage against limits
    // Implement exponential backoff
    // Queue requests if approaching limits
  }
  
  async cacheResult(key: string, data: any, ttl: number): Promise<void> {
    // Cache API responses to reduce costs
    // Implement cache invalidation strategies
    // Handle cache warming for common addresses
  }
}
```

## 📊 Data Processing & Calculations

### 1. Roof Area Calculation
```typescript
// lib/calculations/roof-area.ts
export function calculateRoofArea(roofPolygon: Coordinate[]): number {
  // Use shoelace formula for polygon area
  // Convert from square meters to square feet
  // Apply correction factors for image distortion
  // Validate against reasonable size limits
}

export function calculateRoofSlope(heightData: number[]): number {
  // Analyze height variations across roof
  // Calculate average slope/pitch
  // Identify steep vs low-slope sections
  // Return slope for material calculations
}
```

### 2. Complexity Analysis
```typescript
// lib/calculations/roof-complexity.ts
export function analyzeRoofComplexity(roofData: any): ComplexityScore {
  // Count roof sections and intersections
  // Identify valleys, ridges, and dormers
  // Calculate complexity multiplier for pricing
  // Flag roofs requiring manual review
}

export function detectRoofFeatures(roofPolygon: any): RoofFeatures {
  // Identify chimneys, vents, skylights
  // Calculate trim and flashing requirements
  // Estimate accessibility challenges
  // Account for obstacles in material calculations
}
```

## 🚨 Error Handling & Validation

### 1. API Error Management
```typescript
// lib/google-maps/error-handler.ts
export class GoogleMapsErrorHandler {
  async handleAPIError(error: any, apiName: string): Promise<ErrorResponse> {
    switch (error.status) {
      case 'ZERO_RESULTS':
        return { 
          success: false, 
          message: 'Address not found or outside service area',
          fallback: 'manual_entry'
        };
      
      case 'OVER_QUERY_LIMIT':
        return {
          success: false,
          message: 'Service temporarily unavailable',
          fallback: 'retry_later'
        };
      
      case 'REQUEST_DENIED':
        return {
          success: false,
          message: 'API access denied',
          fallback: 'contact_support'
        };
    }
  }
}
```

### 2. Data Validation
```typescript
// lib/validation/roof-data.ts
export function validateRoofMeasurements(measurements: RoofMeasurements): ValidationResult {
  // Check area against reasonable bounds (100-10000 sqft)
  // Validate slope calculations
  // Ensure measurement confidence score meets threshold
  // Flag edge cases for manual review
}

export function validateServiceArea(coordinates: Coordinates): boolean {
  // Check if address is within Colorado service area
  // Handle border cases and nearby states
  // Provide alternative service recommendations
}
```

## 🔄 Integration with n8n Workflows

### 1. Roof Measurement Workflow
```json
{
  "name": "roof-measurement-processor",
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "roof-analysis"
      }
    },
    {
      "name": "Geocode Address",
      "type": "http-request",
      "parameters": {
        "method": "GET",
        "url": "https://maps.googleapis.com/maps/api/geocode/json",
        "authentication": "headerAuth",
        "headerAuth": {
          "name": "key",
          "value": "={{$env.GOOGLE_MAPS_API_KEY}}"
        }
      }
    },
    {
      "name": "Building Insights API",
      "type": "http-request",
      "parameters": {
        "method": "POST",
        "url": "https://solar.googleapis.com/v1/buildingInsights:findClosest",
        "body": {
          "location": {
            "latitude": "={{$json.lat}}",
            "longitude": "={{$json.lng}}"
          },
          "requiredQuality": "HIGH"
        }
      }
    },
    {
      "name": "Calculate Measurements",
      "type": "function",
      "parameters": {
        "functionCode": "// Process roof polygon data and calculate metrics"
      }
    }
  ]
}
```

### 2. Static Map Generation Workflow
```json
{
  "name": "generate-roof-image",
  "nodes": [
    {
      "name": "Static Maps Request",
      "type": "http-request",
      "parameters": {
        "method": "GET",
        "url": "https://maps.googleapis.com/maps/api/staticmap",
        "qs": {
          "center": "={{$json.lat}},{{$json.lng}}",
          "zoom": "19",
          "size": "800x600",
          "maptype": "satellite",
          "key": "={{$env.GOOGLE_MAPS_API_KEY}}"
        }
      }
    },
    {
      "name": "Upload to Storage",
      "type": "aws-s3",
      "parameters": {
        "operation": "upload",
        "bucket": "apr-roof-images",
        "key": "={{$json.address_hash}}.png"
      }
    }
  ]
}
```

## 💰 Cost Optimization Strategies

### 1. Caching Strategy
- Cache geocoding results for 24 hours
- Store building insights data for 7 days
- Implement smart cache warming for popular areas
- Use Redis for high-performance caching

### 2. Request Optimization
- Batch multiple addresses when possible
- Use session-based pricing for Places API
- Implement request deduplication
- Queue and batch non-urgent requests

### 3. Quota Management
- Monitor daily usage across all APIs
- Implement circuit breakers at quota thresholds
- Provide fallback manual entry options
- Set up billing alerts and notifications

---

**Document Version:** 1.0  
**Last Updated:** September 7, 2025  
**Next Review:** Before API implementation begins