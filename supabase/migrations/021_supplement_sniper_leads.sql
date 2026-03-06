CREATE TABLE IF NOT EXISTS supplement_sniper_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  claims_per_month TEXT,
  phone TEXT,
  source TEXT DEFAULT 'supplement-sniper-landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON supplement_sniper_leads(email);
CREATE INDEX ON supplement_sniper_leads(created_at DESC);
