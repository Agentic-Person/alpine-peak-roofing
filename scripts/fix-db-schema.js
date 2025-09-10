const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixChatConversationsSchema() {
  console.log('Fixing chat_conversations table schema...')
  
  const { data, error } = await supabase.rpc('fix_chat_conversations_schema', {}, {
    sql: `
      DO $$ 
      BEGIN
          -- Add messages column if it doesn't exist
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'chat_conversations' 
              AND column_name = 'messages'
          ) THEN
              ALTER TABLE chat_conversations 
              ADD COLUMN messages JSONB DEFAULT '[]'::jsonb;
              RAISE NOTICE 'Added messages column';
          ELSE
              RAISE NOTICE 'Messages column already exists';
          END IF;

          -- Add context column if it doesn't exist
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'chat_conversations' 
              AND column_name = 'context'
          ) THEN
              ALTER TABLE chat_conversations 
              ADD COLUMN context JSONB DEFAULT '{}'::jsonb;
              RAISE NOTICE 'Added context column';
          ELSE
              RAISE NOTICE 'Context column already exists';
          END IF;

          -- Add lead_score column if it doesn't exist
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'chat_conversations' 
              AND column_name = 'lead_score'
          ) THEN
              ALTER TABLE chat_conversations 
              ADD COLUMN lead_score INTEGER DEFAULT 0;
              RAISE NOTICE 'Added lead_score column';
          ELSE
              RAISE NOTICE 'Lead_score column already exists';
          END IF;

          -- Add status column if it doesn't exist
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'chat_conversations' 
              AND column_name = 'status'
          ) THEN
              ALTER TABLE chat_conversations 
              ADD COLUMN status TEXT DEFAULT 'active';
              RAISE NOTICE 'Added status column';
          ELSE
              RAISE NOTICE 'Status column already exists';
          END IF;
      END $$;
    `
  })
  
  if (error) {
    console.error('Error fixing schema:', error)
    return false
  }
  
  console.log('Schema fix completed successfully')
  return true
}

async function checkTableStructure() {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, column_default')
    .eq('table_name', 'chat_conversations')
    
  if (error) {
    console.error('Error checking table structure:', error)
    return
  }
  
  console.log('Current chat_conversations table structure:')
  data.forEach(col => {
    console.log(`- ${col.column_name}: ${col.data_type} (default: ${col.column_default})`)
  })
}

async function main() {
  await checkTableStructure()
  // await fixChatConversationsSchema()
  // await checkTableStructure()
}

main().catch(console.error)