#!/usr/bin/env node
/**
 * Apply a SQL migration to the remote Supabase project via Management API.
 * Usage: node scripts/apply-migration.mjs <migration-file>
 * Example: node scripts/apply-migration.mjs supabase/migrations/021_supplement_sniper_leads.sql
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env.local') });

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!ACCESS_TOKEN || !SUPABASE_URL) {
  console.error('❌ Missing SUPABASE_ACCESS_TOKEN or NEXT_PUBLIC_SUPABASE_URL');
  process.exit(1);
}

const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];
const migrationPath = process.argv[2];

if (!migrationPath) {
  console.error('Usage: node scripts/apply-migration.mjs <migration-file>');
  process.exit(1);
}

const sql = readFileSync(join(ROOT, migrationPath), 'utf8');
console.log(`Applying migration: ${migrationPath}`);
console.log(`Project: ${projectRef}`);
console.log(`SQL length: ${sql.length} chars`);

const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
});

const body = await res.text();

if (res.ok) {
  console.log('✅ Migration applied successfully!');
  try {
    const parsed = JSON.parse(body);
    console.log('Result:', JSON.stringify(parsed, null, 2));
  } catch {
    console.log('Result:', body);
  }
} else {
  console.error(`❌ Migration failed: HTTP ${res.status}`);
  console.error(body);
  process.exit(1);
}
