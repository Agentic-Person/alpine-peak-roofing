# Roof Estimator Requirements & Specifications

## 🎯 Project Overview
Build an intelligent roof estimation system that uses Google Maps satellite imagery to automatically calculate roof measurements and generate professional, instant estimates for Alpine Peak Roofing.

## 🔧 Core Technical Requirements

### 1. Google Maps Integration
**Primary APIs Required:**
- **Building Insights API**: For detailed roof analysis and measurements
- **Geocoding API**: Convert addresses to coordinates with validation
- **Static Maps API**: Generate visual reference images for estimates
- **Places API**: Address autocomplete and validation

**Key Capabilities:**
- Extract roof polygon coordinates from satellite imagery
- Calculate total roof area (square footage) with 95%+ accuracy
- Detect roof slope/pitch angles for material calculations
- Identify ridge lines, valleys, and complex roof intersections
- Measure overhangs, eaves, and rake details
- Handle multiple roof sections and complex geometries

### 2. Calculation Engine Requirements
**Measurement Accuracy:**
- Roof area calculations within 5% of professional estimates
- Slope detection for pitch-based material pricing
- Ridge/valley calculations for trim and flashing materials
- Overhang measurements for drip edge and gutters

**Pricing Calculator:**
- Material selection: Shingles vs Metal roofing options
- Tiered pricing based on material grade and quality
- Regional labor cost adjustments
- Waste factor calculations (typically 10-15%)
- Permit and disposal fee estimates

### 3. Material Selection System
**Shingle Options:**
- Architectural shingles (25-year, 30-year, lifetime)
- Premium designer shingles
- Impact-resistant options for insurance discounts
- Color selection with visual previews

**Metal Roofing Options:**
- Standing seam steel (various gauges)
- Corrugated metal panels
- Stone-coated steel tiles
- Aluminum roofing systems

**Accessories & Add-ons:**
- Underlayment (synthetic vs felt)
- Ridge vents and ventilation systems
- Gutters and downspouts
- Flashing and trim materials
- Ice and water barrier

### 4. Estimate Generation Requirements
**PDF Generation Features:**
- Professional branded estimate template
- Detailed material breakdown with quantities
- Labor cost itemization
- Visual roof diagram/satellite image
- Terms and conditions
- Validity period (typically 30 days)

**Delivery Requirements:**
- Generate PDF within 30 seconds of calculation
- Automatic email delivery to customer
- SMS notification with estimate summary
- Copy stored in CRM for follow-up

## 🎯 User Experience Requirements

### 1. Address Input & Validation
- Smart address autocomplete with Google Places API
- Address validation and error handling
- GPS coordinate extraction
- Service area validation (Colorado focus)

### 2. Interactive Estimator Interface
- Clean, mobile-responsive design
- Real-time pricing updates as selections change
- Material comparison tables
- Visual roof overlay on satellite imagery
- Progress indicators during calculation

### 3. Lead Capture Integration
- Contact information collection (name, phone, email)
- Property details (current roof age, issues)
- Timeline for project (urgent, 6 months, planning)
- Lead scoring based on project value and urgency

## 📊 Data Requirements

### 1. Material Pricing Database
```sql
-- Materials table structure needed
materials: {
  id: uuid,
  category: 'shingles' | 'metal' | 'accessory',
  name: string,
  price_per_sqft: decimal,
  labor_multiplier: decimal,
  waste_factor: decimal,
  description: text,
  image_url: string
}
```

### 2. Estimate Storage
```sql
-- Estimates tracking table
roof_estimates: {
  id: uuid,
  address: string,
  coordinates: point,
  roof_area_sqft: decimal,
  selected_materials: jsonb,
  total_cost: decimal,
  customer_info: jsonb,
  pdf_url: string,
  created_at: timestamp,
  status: 'generated' | 'viewed' | 'contacted'
}
```

### 3. Regional Pricing Data
- Labor cost multipliers by ZIP code
- Permit fee schedules by municipality
- Material availability and delivery costs

## 🔄 n8n Workflow Requirements

### 1. Roof Measurement Processor Workflow
**Trigger:** HTTP POST with address data
**Steps:**
1. Geocode address using Google Maps API
2. Call Building Insights API for roof analysis
3. Process roof polygon data for measurements
4. Calculate areas, slopes, and complexity factors
5. Store measurements in database
6. Return structured measurement data

### 2. Estimate Calculator Workflow
**Trigger:** HTTP POST with measurements and material selections
**Steps:**
1. Retrieve current material pricing
2. Apply regional labor multipliers
3. Calculate waste factors and add-ons
4. Generate line-item cost breakdown
5. Create estimate record in database
6. Trigger PDF generation workflow

### 3. PDF Generator & Email Workflow
**Trigger:** New estimate record created
**Steps:**
1. Generate PDF from estimate template
2. Upload PDF to cloud storage
3. Send formatted email to customer
4. Send SMS notification (optional)
5. Create CRM lead record
6. Schedule follow-up reminders

## 🚨 Error Handling & Fallbacks

### 1. API Failures
- Google Maps API rate limiting handling
- Fallback to manual measurement input
- Error messaging for unsupported addresses
- Retry logic for transient failures

### 2. Measurement Validation
- Sanity checks on calculated areas
- Flag unusual roof geometries for manual review
- Confidence scoring for estimate accuracy
- Option to request professional site visit

### 3. Lead Quality Assurance
- Phone number validation
- Email deliverability checks
- Duplicate lead detection
- Service area filtering

## 📈 Performance Requirements

### 1. Speed Benchmarks
- Address geocoding: < 2 seconds
- Roof measurement calculation: < 10 seconds
- Estimate generation: < 15 seconds
- PDF creation and email: < 30 seconds total

### 2. Accuracy Targets
- Roof area measurement: 95% accuracy (within 5%)
- Address geocoding success: 90%+ for valid addresses
- Email delivery rate: 98%+
- PDF generation success: 99%+

### 3. Scalability Requirements
- Handle 100+ estimates per day
- Concurrent request handling
- Database query optimization
- CDN for PDF storage and delivery

## 🔒 Security & Privacy

### 1. Data Protection
- Customer contact information encryption
- Secure PDF storage with access controls
- API key protection and rotation
- Rate limiting and abuse prevention

### 2. Compliance Requirements
- GDPR compliance for data handling
- CAN-SPAM compliance for email delivery
- Colorado consumer protection laws
- Google Maps API terms of service compliance

## 🎯 Success Metrics & KPIs

### 1. Technical Metrics
- Estimate generation success rate: 95%+
- Measurement accuracy: Within 5% of professional estimates
- System uptime: 99.5%+
- Average response time: < 30 seconds

### 2. Business Metrics
- Lead conversion rate: 15%+ from estimate to contact
- Estimate-to-quote conversion: 25%+
- Customer satisfaction: 4.5+ stars
- Cost per lead reduction: 40%+ vs traditional methods

## 📅 Implementation Timeline

### Week 1: Foundation
- Google Maps API integration
- Basic measurement calculation
- Database schema setup
- n8n workflow scaffolding

### Week 2: Core Features
- Advanced roof analysis algorithms
- Material selection system
- PDF generation workflow
- Email delivery system

### Week 3: UI Development
- Interactive estimator interface
- Material comparison tools
- Mobile optimization
- User testing

### Week 4: Integration & Launch
- CRM integration
- Lead scoring system
- Analytics implementation
- Production deployment

---

**Document Version:** 1.0  
**Last Updated:** September 7, 2025  
**Next Review:** Weekly during development