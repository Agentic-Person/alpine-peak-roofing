-- Migration: Create roof estimates system tables
-- Created: 2025-09-10

-- Roof estimates table
CREATE TABLE roof_estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id TEXT,
  
  -- Property Information
  address TEXT NOT NULL,
  property_type TEXT DEFAULT 'residential',
  stories INTEGER DEFAULT 1,
  
  -- Roof Measurements
  roof_area_sqft DECIMAL(10,2),
  roof_perimeter_ft DECIMAL(10,2),
  roof_pitch TEXT,
  roof_complexity TEXT DEFAULT 'standard',
  
  -- Materials and Pricing
  material_type TEXT NOT NULL,
  material_grade TEXT,
  base_price_per_sqft DECIMAL(10,2),
  labor_cost DECIMAL(10,2),
  material_cost DECIMAL(10,2),
  additional_costs JSONB DEFAULT '{}'::jsonb,
  
  -- Estimate Totals
  subtotal DECIMAL(10,2),
  tax_amount DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  
  -- Project Details
  estimated_duration_days INTEGER,
  warranty_years INTEGER,
  special_requirements TEXT,
  
  -- Status and Metadata
  status TEXT DEFAULT 'draft',
  pdf_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Google Maps API Data
  satellite_image_url TEXT,
  building_insights_data JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_estimates_lead_id ON roof_estimates(lead_id);
CREATE INDEX idx_estimates_session_id ON roof_estimates(session_id);
CREATE INDEX idx_estimates_address ON roof_estimates(address);
CREATE INDEX idx_estimates_status ON roof_estimates(status);
CREATE INDEX idx_estimates_created_at ON roof_estimates(created_at);

-- Update trigger
CREATE TRIGGER update_roof_estimates_updated_at 
    BEFORE UPDATE ON roof_estimates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS policies
ALTER TABLE roof_estimates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on roof_estimates" ON roof_estimates
    FOR ALL USING (true);

-- Estimate line items table for detailed breakdowns
CREATE TABLE estimate_line_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES roof_estimates(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_estimate_line_items_estimate_id ON estimate_line_items(estimate_id);

ALTER TABLE estimate_line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on estimate_line_items" ON estimate_line_items
    FOR ALL USING (true);