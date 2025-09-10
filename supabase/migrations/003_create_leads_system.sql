-- Migration: Create leads and CRM system tables
-- Created: 2025-09-10

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  
  -- Contact Information
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  
  -- Project Information
  address TEXT,
  property_type TEXT DEFAULT 'residential',
  project_type TEXT,
  timeline TEXT,
  budget_range TEXT,
  
  -- Scoring and Status
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  
  -- Metadata
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  ip_address INET,
  
  -- CRM Integration
  crm_id TEXT,
  crm_system TEXT,
  synced_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_session_id ON leads(session_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_lead_score ON leads(lead_score);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Update trigger
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on leads" ON leads
    FOR ALL USING (true);

-- Lead activities tracking table
CREATE TABLE lead_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at);

ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on lead_activities" ON lead_activities
    FOR ALL USING (true);