#!/usr/bin/env node

/**
 * Database deployment script for Alpine Peak Roofing
 * Deploys the complete pgvector schema to Supabase
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config({ path: '../.env.local' });

// Supabase connection details
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Error: Missing Supabase configuration.');
  console.error('Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

async function executeSQL(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('SQL execution failed:', error);
    return false;
  }
  
  return true;
}

async function deployDatabase() {
  console.log('🚀 Starting database deployment for Alpine Peak Roofing...\n');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_knowledge_base.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n${i + 1}/${statements.length} Executing: ${statement.substring(0, 60)}...`);

      try {
        // For direct database connection, we'll use a different approach
        const success = await executeDirect(statement);
        if (success) {
          console.log('✅ Success');
        } else {
          console.log('❌ Failed');
        }
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
    }

    console.log('\n🎉 Database deployment completed!');
    console.log('\nNext steps:');
    console.log('1. Run content migration: node scripts/migrateContent.js');
    console.log('2. Test database connection from website');
    console.log('3. Deploy n8n workflows');

  } catch (error) {
    console.error('❌ Database deployment failed:', error.message);
    process.exit(1);
  }
}

async function executeDirect(sql) {
  // Use fetch to execute SQL directly
  const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/sql',
    },
    body: sql
  });

  return response.ok;
}

// Run deployment
if (require.main === module) {
  deployDatabase().catch(console.error);
}

module.exports = deployDatabase;