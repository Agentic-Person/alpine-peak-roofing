-- Migration: 021_supplement_sniper_leads
-- Creates the waitlist leads table for the Supplement Sniper landing page.
-- Apply via: Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard/project/adueyerxzutuuwtxyage/editor

CREATE TABLE IF NOT EXISTS public.supplement_sniper_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  claims_per_month TEXT NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'supplement-sniper-landing',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_email
  ON public.supplement_sniper_leads(email);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_created_at
  ON public.supplement_sniper_leads(created_at DESC);

-- RLS: allow service role full access, block anon
ALTER TABLE public.supplement_sniper_leads ENABLE ROW LEVEL SECURITY;

-- Policy: only the service role (backend) can insert/read
CREATE POLICY "service_role_all" ON public.supplement_sniper_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.supplement_sniper_leads
  IS 'Waitlist leads from the Supplement Sniper landing page at /supplement-sniper';
