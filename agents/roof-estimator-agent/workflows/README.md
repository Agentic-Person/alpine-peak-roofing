# Roof Estimator n8n Workflows

## 🔄 Overview
This directory contains three core n8n workflows that power the Alpine Peak Roofing roof estimator system. These workflows integrate Google Maps APIs, Supabase database, and PDF generation to provide instant, accurate roof estimates.

## 📁 Workflow Files

### 1. `roof-measurement-processor.json`
**Purpose:** Processes address inputs and generates roof measurements using Google Maps APIs

**Trigger:** HTTP POST to `/webhook/roof-analysis`

**Key Functions:**
- Address validation and geocoding
- Google Building Insights API integration
- Roof area, slope, and complexity calculations
- Measurement validation and quality scoring
- Data storage in Supabase

**Input Format:**
```json
{
  "address": "123 Main Street, Colorado Springs, CO 80903"
}
```

**Output Format:**
```json
{
  "success": true,
  "measurements": {
    "roofAreaSqFt": 2450,
    "slope": {
      "averagePitchDegrees": 22.5,
      "category": "standard",
      "pitchRatio": "6/12"
    },
    "features": {
      "ridgeLengthFt": 120,
      "valleyLengthFt": 35,
      "complexityMultiplier": 1.15
    },
    "confidenceScore": 0.92
  },
  "measurementId": "MEAS-1694123456789"
}
```

### 2. `estimate-calculator.json`
**Purpose:** Calculates detailed cost estimates based on measurements and material selections

**Trigger:** HTTP POST to `/webhook/calculate-estimate`

**Key Functions:**
- Material pricing retrieval from database
- Regional labor rate adjustments
- Detailed cost breakdown calculation
- Municipal pricing multipliers
- Urgency-based pricing adjustments
- PDF generation trigger

**Input Format:**
```json
{
  "measurementId": "MEAS-1694123456789",
  "selectedMaterial": "architectural-30",
  "measurements": { /* measurement data */ },
  "contactInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(719) 555-0123"
  },
  "municipality": "Colorado Springs",
  "urgency": "soon"
}
```

**Output Format:**
```json
{
  "success": true,
  "estimateId": "EST-1694123456789",
  "estimate": {
    "totalCost": 18500,
    "costPerSqft": 7.55,
    "materialCosts": { /* detailed breakdown */ },
    "laborCosts": { /* detailed breakdown */ },
    "validUntil": "2025-10-07T00:00:00.000Z"
  }
}
```

### 3. `pdf-generator-email.json`
**Purpose:** Generates professional PDF estimates and delivers them via email

**Trigger:** HTTP POST to `/webhook/generate-pdf`

**Key Functions:**
- Property satellite image generation
- Professional HTML/PDF template creation
- PDF file generation and cloud storage
- Email delivery with PDF attachment
- CRM lead creation
- Database status updates

**Input Format:**
```json
{
  "estimateId": "EST-1694123456789",
  "estimateData": { /* complete estimate data */ }
}
```

**Output Format:**
```json
{
  "success": true,
  "estimateId": "EST-1694123456789",
  "pdfGenerated": true,
  "pdfUrl": "https://storage.com/estimates/EST-1694123456789.pdf",
  "emailSent": true,
  "emailAddress": "customer@example.com",
  "crmLeadCreated": true
}
```

## 🔧 Required Credentials & Environment Variables

### Google Maps API Credentials
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
**Required APIs:**
- Building Insights API
- Geocoding API
- Static Maps API
- Places API

### Database Credentials (Supabase)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### PDF Generation Service
```
HTMLCSS_API_KEY=your_htmlcsstoimage_api_key
```
**Service:** HTMLCSStoImage API for PDF conversion

### Cloud Storage (AWS S3)
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=alpine-peak-estimates
AWS_REGION=us-west-2
```

### Email Service (SMTP)
```
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### n8n Configuration
```
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com
```

## 📊 Database Schema Requirements

### Required Supabase Tables

#### `roof_measurements`
```sql
CREATE TABLE roof_measurements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  roof_area_sqft DECIMAL(8,2) NOT NULL,
  roof_segments JSONB,
  slope_data JSONB,
  features_data JSONB,
  confidence_score DECIMAL(3,2),
  imagery_quality TEXT,
  validation_result JSONB,
  raw_building_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `material_pricing`
```sql
CREATE TABLE material_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_per_sqft DECIMAL(5,2) NOT NULL,
  labor_multiplier DECIMAL(3,2) DEFAULT 1.0,
  waste_factor DECIMAL(3,2) DEFAULT 0.10,
  warranty TEXT,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `regional_rates`
```sql
CREATE TABLE regional_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state TEXT NOT NULL,
  base_labor_rate DECIMAL(4,2) NOT NULL,
  tear_off_rate DECIMAL(4,2) NOT NULL,
  disposal_rate DECIMAL(4,2) NOT NULL,
  permit_fee DECIMAL(6,2) NOT NULL,
  sales_tax DECIMAL(4,3) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `roof_estimates`
```sql
CREATE TABLE roof_estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id TEXT UNIQUE NOT NULL,
  measurement_id TEXT,
  roof_area_sqft DECIMAL(8,2) NOT NULL,
  selected_material JSONB,
  material_costs JSONB,
  labor_costs JSONB,
  additional_costs JSONB,
  total_cost DECIMAL(10,2) NOT NULL,
  cost_per_sqft DECIMAL(5,2) NOT NULL,
  contact_info JSONB,
  region TEXT,
  municipality TEXT,
  urgency TEXT,
  validation_result JSONB,
  pdf_url TEXT,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'generated',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment Instructions

### 1. Import Workflows into n8n
1. Open n8n web interface
2. Go to Workflows
3. Import each JSON file
4. Configure credentials for each workflow

### 2. Set Up Credentials
1. **Google Maps API:** Add API key with required permissions
2. **Supabase:** Add connection with service role key
3. **AWS S3:** Configure bucket access for PDF storage
4. **SMTP:** Set up email delivery service
5. **HTMLCSStoImage:** Add API key for PDF generation

### 3. Configure Environment Variables
Set all required environment variables in n8n settings or deployment environment.

### 4. Database Setup
1. Create Supabase project
2. Run table creation scripts
3. Populate material_pricing and regional_rates tables
4. Set up Row Level Security policies

### 5. Test Workflows
1. Start with roof-measurement-processor
2. Test with sample Colorado addresses
3. Verify database storage
4. Test estimate-calculator with measurement data
5. Confirm PDF generation and email delivery

## 🔄 Workflow Integration

### Frontend to n8n Integration
```typescript
// Example integration from Next.js frontend
export async function analyzeRoof(address: string) {
  const response = await fetch('/api/webhooks/roof-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address })
  });
  
  return response.json();
}

export async function calculateEstimate(estimateRequest: EstimateRequest) {
  const response = await fetch('/api/webhooks/calculate-estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estimateRequest)
  });
  
  return response.json();
}
```

### API Route Proxies
Create Next.js API routes that proxy to n8n webhooks:

```typescript
// pages/api/webhooks/roof-analysis.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_BASE_URL}/webhook/roof-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  
  const data = await n8nResponse.json();
  res.status(n8nResponse.status).json(data);
}
```

## 📈 Monitoring & Analytics

### Key Metrics to Track
- **Workflow Execution Times:** Monitor performance
- **Success Rates:** Track failures and errors
- **API Usage:** Monitor Google Maps API costs
- **Conversion Rates:** Track estimate to lead conversion

### Error Handling
Each workflow includes comprehensive error handling:
- Input validation
- API timeout handling
- Database connection errors
- Email delivery failures
- PDF generation issues

### Logging
All workflows log key events:
- Measurement calculations
- Estimate generations
- PDF creations
- Email deliveries
- Error conditions

## 🔧 Troubleshooting

### Common Issues

#### Google Maps API Errors
- **OVER_QUERY_LIMIT:** Increase API quotas
- **REQUEST_DENIED:** Check API key permissions
- **ZERO_RESULTS:** Address not found or invalid

#### Database Connection Issues
- Verify Supabase credentials
- Check Row Level Security policies
- Ensure table schemas are correct

#### PDF Generation Failures
- Check HTMLCSStoImage API limits
- Verify template HTML validity
- Monitor AWS S3 upload permissions

#### Email Delivery Problems
- Verify SMTP credentials
- Check spam/blacklist status
- Monitor email service quotas

---

**Last Updated:** September 7, 2025  
**Version:** 1.0  
**Next Review:** After initial deployment testing