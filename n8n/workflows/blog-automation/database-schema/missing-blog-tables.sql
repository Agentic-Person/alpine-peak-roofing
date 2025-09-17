-- Missing Blog Automation Tables for Supabase
-- Execute these in your Supabase SQL Editor

-- 1. Blog Content Plans Table
CREATE TABLE IF NOT EXISTS blog_content_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic VARCHAR(500) NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  user_intent VARCHAR(50) DEFAULT 'informational',
  content_type VARCHAR(50) NOT NULL,
  season VARCHAR(20),
  scheduled_for DATE,
  status VARCHAR(20) DEFAULT 'pending',
  research_data JSONB DEFAULT '{}',
  outline JSONB DEFAULT '{}',
  blog_post_id UUID,
  priority_score INTEGER DEFAULT 5,
  target_audience VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Blog Content Templates Table
CREATE TABLE IF NOT EXISTS blog_content_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name VARCHAR(100) NOT NULL,
  template_type VARCHAR(50) NOT NULL,
  description TEXT,
  structure JSONB NOT NULL,
  target_word_count INTEGER DEFAULT 1200,
  required_sections TEXT[] DEFAULT '{}',
  sample_keywords TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blog Automation Logs Table
CREATE TABLE IF NOT EXISTS blog_automation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_name VARCHAR(100) NOT NULL,
  workflow_execution_id VARCHAR(255),
  blog_post_id UUID,
  content_plan_id UUID,
  status VARCHAR(20) DEFAULT 'running',
  cost_incurred DECIMAL(10,4) DEFAULT 0.00,
  tokens_used INTEGER DEFAULT 0,
  execution_time_ms INTEGER,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blog Performance Metrics Table
CREATE TABLE IF NOT EXISTS blog_performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL,
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0.00,
  time_on_page INTEGER DEFAULT 0,
  social_shares INTEGER DEFAULT 0,
  organic_traffic INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  leads_generated INTEGER DEFAULT 0,
  search_ranking JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_post_id, date)
);

-- Insert Sample Content Templates
INSERT INTO blog_content_templates (template_name, template_type, description, structure, target_word_count, required_sections) VALUES
('Seasonal Roofing Guide', 'seasonal', 'Template for seasonal roofing content',
 '{"intro": "Seasonal introduction", "main_sections": ["Current season challenges", "Maintenance checklist", "Professional services", "Cost considerations", "FAQ"], "conclusion": "Call-to-action for inspection"}',
 1400, ARRAY['intro', 'seasonal_challenges', 'maintenance_tips', 'cost_guide', 'cta']),

('Problem-Solving Guide', 'problem_solving', 'Template for addressing specific roofing problems',
 '{"intro": "Problem identification", "main_sections": ["Signs and symptoms", "Causes", "DIY vs Professional", "Solutions", "Prevention", "FAQ"], "conclusion": "Professional consultation CTA"}',
 1200, ARRAY['problem_identification', 'causes', 'solutions', 'prevention', 'cta']),

('Industry Update', 'industry_update', 'Template for roofing industry news and updates',
 '{"intro": "Industry context", "main_sections": ["What changed", "Impact on homeowners", "New technologies/materials", "Cost implications", "FAQ"], "conclusion": "How Alpine Peak adapts"}',
 1000, ARRAY['industry_context', 'homeowner_impact', 'innovations', 'implications', 'cta'])

ON CONFLICT DO NOTHING;

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_content_plans_status ON blog_content_plans(status);
CREATE INDEX IF NOT EXISTS idx_content_plans_scheduled ON blog_content_plans(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_automation_logs_workflow ON blog_automation_logs(workflow_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_post ON blog_performance_metrics(blog_post_id);

-- Enable RLS
ALTER TABLE blog_content_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_performance_metrics ENABLE ROW LEVEL SECURITY;

-- Service role policies
CREATE POLICY "Service role full access on blog_content_plans" ON blog_content_plans FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on blog_content_templates" ON blog_content_templates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on blog_automation_logs" ON blog_automation_logs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access on blog_performance_metrics" ON blog_performance_metrics FOR ALL USING (auth.role() = 'service_role');