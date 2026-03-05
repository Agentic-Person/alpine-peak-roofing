-- Alpine Peak Roofing Chat Widget - Supabase Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/tatxorfovsyydrgztbfk/sql/new

-- 1. Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT UNIQUE NOT NULL,
    messages JSONB DEFAULT '[]'::jsonb,
    context JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON chat_conversations(status);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON chat_conversations(created_at DESC);

-- 3. Add auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION update_chat_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_chat_conversations_updated_at
    BEFORE UPDATE ON chat_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_conversations_updated_at();

-- 4. Enable RLS (Row Level Security)
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for public access
-- Allow anyone to insert new chat sessions (public chat widget)
CREATE POLICY "Allow public insert chat conversations" ON chat_conversations
    FOR INSERT
    WITH CHECK (true);

-- Allow anyone to read their own session
CREATE POLICY "Allow public read own session" ON chat_conversations
    FOR SELECT
    USING (true);

-- Allow anyone to update their own session
CREATE POLICY "Allow public update own session" ON chat_conversations
    FOR UPDATE
    USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role all" ON chat_conversations
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 6. Create storage bucket for chat file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-uploads', 'chat-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Create storage policies for chat-uploads bucket
CREATE POLICY "Allow public upload to chat-uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'chat-uploads');

CREATE POLICY "Allow public read from chat-uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'chat-uploads');

-- 8. Add helpful comments
COMMENT ON TABLE chat_conversations IS 'Stores chat conversations for Alpine Peak Roofing website';
COMMENT ON COLUMN chat_conversations.session_id IS 'Unique session identifier (format: chat_timestamp_random)';
COMMENT ON COLUMN chat_conversations.messages IS 'Array of chat messages (JSONB)';
COMMENT ON COLUMN chat_conversations.context IS 'Conversation context (page, user_agent, user_info, etc.)';
COMMENT ON COLUMN chat_conversations.status IS 'Session status (active, completed, handed_off)';

-- Done! Tables created successfully.
-- You can verify with: SELECT * FROM chat_conversations LIMIT 10;
