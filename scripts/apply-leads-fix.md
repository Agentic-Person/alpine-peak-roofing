# Fix Leads Table Schema

## Issue
Form submissions failing with error:
```
Database error: Could not find the 'first_name' column of 'leads' in the schema cache
```

## Solution
Run the migration `supabase/migrations/005_fix_leads_columns.sql` against production Supabase.

## How to Apply

### Option 1: Supabase Dashboard
1. Go to Supabase Dashboard > SQL Editor
2. Paste contents of `supabase/migrations/005_fix_leads_columns.sql`
3. Run the query

### Option 2: Supabase CLI
```bash
supabase db push
```

### Option 3: Direct psql
```bash
psql -h <supabase-host> -U postgres -d postgres -f supabase/migrations/005_fix_leads_columns.sql
```

## After Applying
Test form submission:
```bash
curl -X POST https://alpinepeakroofing.com/api/leads/capture \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"555-0100","source":"contact-form"}'
```

Expected response:
```json
{"success":true,"data":{"leadId":"...","leadScore":40,"priority":"low","message":"Lead captured successfully"}}
```
