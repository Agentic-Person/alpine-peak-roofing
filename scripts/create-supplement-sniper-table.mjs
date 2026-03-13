#!/usr/bin/env node
/**
 * Creates the supplement_sniper_leads table in Supabase.
 * Run once: node scripts/create-supplement-sniper-table.mjs
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function run() {
  console.log('Creating supplement_sniper_leads table...');

  // Try inserting a row and see if the table exists first
  const { error: checkError } = await supabase
    .from('supplement_sniper_leads')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('✅ Table already exists.');
    return;
  }

  if (checkError.code !== 'PGRST205') {
    console.error('Unexpected error checking table:', checkError);
    return;
  }

  // Table doesn't exist — create it via Supabase management API
  const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];
  console.log('Project ref:', projectRef);

  // Note: We need the Supabase management API token for DDL operations
  // If SUPABASE_ACCESS_TOKEN env is set, use the management API
  const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('\n⚠️  Cannot create table automatically — no SUPABASE_ACCESS_TOKEN in env.');
    console.log('\nRun this SQL in the Supabase dashboard SQL editor:');
    console.log('https://supabase.com/dashboard/project/' + projectRef + '/editor');
    console.log('\n--- SQL ---');
    console.log(`
CREATE TABLE IF NOT EXISTS public.supplement_sniper_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  claims_per_month text NOT NULL,
  phone text,
  source text DEFAULT 'supplement-sniper-landing',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_email 
  ON public.supplement_sniper_leads(email);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_created_at 
  ON public.supplement_sniper_leads(created_at DESC);

COMMENT ON TABLE public.supplement_sniper_leads 
  IS 'Waitlist leads from the Supplement Sniper landing page';
    `.trim());
    return;
  }

  // Use Supabase management API
  const sql = `
CREATE TABLE IF NOT EXISTS public.supplement_sniper_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  claims_per_month text NOT NULL,
  phone text,
  source text DEFAULT 'supplement-sniper-landing',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_email 
  ON public.supplement_sniper_leads(email);

CREATE INDEX IF NOT EXISTS idx_supplement_sniper_leads_created_at 
  ON public.supplement_sniper_leads(created_at DESC);

COMMENT ON TABLE public.supplement_sniper_leads 
  IS 'Waitlist leads from the Supplement Sniper landing page';
  `;

  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await res.text();
  
  if (res.ok) {
    console.log('✅ Table created successfully!');
  } else {
    console.error('❌ Failed to create table:', res.status, text);
  }
}

run().catch(console.error);
