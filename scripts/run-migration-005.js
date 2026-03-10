/**
 * Run migration 005_fix_leads_columns.sql on Alpine Peak Supabase
 */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE env vars');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('Connecting to:', SUPABASE_URL);
  
  // Check current table structure
  console.log('\n=== Checking current leads table ===');
  const { data: sample, error: sampleErr } = await sb
    .from('leads')
    .select('*')
    .limit(1);
  
  if (sampleErr) {
    console.log('Error reading leads:', sampleErr.message);
  } else {
    console.log('Leads table columns:', sample.length > 0 ? Object.keys(sample[0]) : '(table empty, no columns visible)');
  }

  // The migration SQL - add columns if they don't exist
  // We'll do this via individual ALTER TABLE statements using the REST API
  // Since Supabase JS client doesn't support raw DDL, we use the management API
  
  // Instead, let's test what columns exist by doing a targeted insert
  console.log('\n=== Testing first_name column ===');
  const { data: testData, error: testErr } = await sb
    .from('leads')
    .select('first_name')
    .limit(1);
  
  if (testErr) {
    console.log('first_name NOT present:', testErr.message);
    console.log('\nNeed to run migration via Supabase Dashboard SQL editor.');
    console.log('Migration file: supabase/migrations/005_fix_leads_columns.sql');
    
    // Read and display the migration
    const migPath = path.join(__dirname, '../supabase/migrations/005_fix_leads_columns.sql');
    const sql = fs.readFileSync(migPath, 'utf8');
    console.log('\n=== MIGRATION SQL TO RUN ===');
    console.log(sql);
  } else {
    console.log('first_name column EXISTS. Data:', JSON.stringify(testData));
    console.log('\n✅ Migration already applied!');
    
    // Smoke test the health endpoint
    console.log('\n=== Running smoke test ===');
    const resp = await fetch('https://alpinepeakroofing.com/api/health');
    const json = await resp.json();
    console.log('Health check result:', JSON.stringify(json, null, 2));
  }
}

run().catch(console.error);
