-- Temporarily disable RLS for chat_conversations table for testing
-- This should only be used in development

-- Drop existing RLS policy
DROP POLICY IF EXISTS "Allow all operations on chat_conversations" ON chat_conversations;

-- Disable RLS temporarily
ALTER TABLE chat_conversations DISABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows everything (for development only)
-- In production, you'll want to restrict this based on user authentication
CREATE POLICY "Allow all operations for development" ON chat_conversations
    FOR ALL USING (true);

-- Re-enable RLS with the permissive policy
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;