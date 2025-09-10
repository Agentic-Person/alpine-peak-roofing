-- Migration: Fix chat_conversations schema if missing columns
-- Created: 2025-09-10

-- Check if messages column exists, if not add it
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
    END IF;

    -- Add context column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'chat_conversations' 
        AND column_name = 'context'
    ) THEN
        ALTER TABLE chat_conversations 
        ADD COLUMN context JSONB DEFAULT '{}'::jsonb;
    END IF;

    -- Add lead_score column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'chat_conversations' 
        AND column_name = 'lead_score'
    ) THEN
        ALTER TABLE chat_conversations 
        ADD COLUMN lead_score INTEGER DEFAULT 0;
    END IF;

    -- Add status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'chat_conversations' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE chat_conversations 
        ADD COLUMN status TEXT DEFAULT 'active';
    END IF;
END $$;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at);

-- Ensure RLS is enabled
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

-- Recreate the policy if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'chat_conversations' 
        AND policyname = 'Allow all operations on chat_conversations'
    ) THEN
        CREATE POLICY "Allow all operations on chat_conversations" ON chat_conversations
            FOR ALL USING (true);
    END IF;
END $$;