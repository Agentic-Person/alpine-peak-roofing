-- Blog Automation System Migration
-- Version: 1.0
-- Date: 2025-09-16
-- Description: Database schema for automated blog content management

-- Enable necessary extensions (if not already enabled)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- BLOG AUTOMATION TABLES
-- =====================================================

-- Blog Posts Table - Main content storage
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    featured_image_url TEXT,
    featured_image_alt TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    author TEXT DEFAULT 'Alpine Peak Roofing',
    category TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    seo_keywords TEXT[] DEFAULT ARRAY[]::text[],
    internal_links JSONB DEFAULT '[]'::jsonb,
    social_posts JSONB DEFAULT '{}'::jsonb,
    analytics_data JSONB DEFAULT '{}'::jsonb,
    ai_generation_cost DECIMAL(10,2) DEFAULT 0.00,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Content Plans Table - Topic planning and research
CREATE TABLE IF NOT EXISTS blog_content_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    keywords TEXT[] DEFAULT ARRAY[]::text[],
    user_intent TEXT,
    content_type TEXT CHECK (content_type IN ('seasonal', 'problem_solving', 'industry_update')),
    season TEXT CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
    research_data JSONB DEFAULT '{}'::jsonb,
    outline JSONB DEFAULT '{}'::jsonb,
    scheduled_for DATE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Performance Metrics Table - Track content performance
CREATE TABLE IF NOT EXISTS blog_performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    page_views INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2),
    time_on_page INTEGER,
    leads_generated INTEGER DEFAULT 0,
    social_shares INTEGER DEFAULT 0,
    click_through_rate DECIMAL(5,2),
    conversion_rate DECIMAL(5,2),
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Content Templates Table - Store reusable templates
CREATE TABLE IF NOT EXISTS blog_content_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    template_type TEXT NOT NULL,
    structure JSONB NOT NULL,
    prompt_template TEXT,
    target_word_count INTEGER,
    estimated_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Automation Logs Table - Track workflow executions
CREATE TABLE IF NOT EXISTS blog_automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name TEXT NOT NULL,
    workflow_execution_id TEXT,
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
    content_plan_id UUID REFERENCES blog_content_plans(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('started', 'completed', 'failed', 'cancelled')),
    cost_incurred DECIMAL(10,2) DEFAULT 0.00,
    tokens_used INTEGER DEFAULT 0,
    execution_time_ms INTEGER,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Content plans indexes
CREATE INDEX IF NOT EXISTS idx_blog_content_plans_status ON blog_content_plans(status);
CREATE INDEX IF NOT EXISTS idx_blog_content_plans_scheduled_for ON blog_content_plans(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_blog_content_plans_content_type ON blog_content_plans(content_type);

-- Performance metrics indexes
CREATE INDEX IF NOT EXISTS idx_blog_performance_metrics_post_id ON blog_performance_metrics(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_performance_metrics_measured_at ON blog_performance_metrics(measured_at);

-- Automation logs indexes
CREATE INDEX IF NOT EXISTS idx_blog_automation_logs_workflow_name ON blog_automation_logs(workflow_name);
CREATE INDEX IF NOT EXISTS idx_blog_automation_logs_status ON blog_automation_logs(status);
CREATE INDEX IF NOT EXISTS idx_blog_automation_logs_created_at ON blog_automation_logs(created_at);

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_blog_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to blog_posts table
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_updated_at_column();

-- =====================================================
-- SAMPLE CONTENT TEMPLATES
-- =====================================================

-- Insert default blog content templates
INSERT INTO blog_content_templates (name, template_type, structure, prompt_template, target_word_count, estimated_cost) VALUES
('Seasonal Maintenance Guide', 'seasonal',
'{"sections": ["Why [Season] Matters for Your Roof", "Essential [Season] Roof Tasks Checklist", "DIY vs Professional: What You Can Handle", "Cost Breakdown and Budgeting", "Common Mistakes to Avoid", "FAQ Section", "Next Steps and Free Inspection CTA"], "word_distribution": [200, 400, 300, 200, 200, 100, 100]}',
'Write a comprehensive {season} roofing maintenance guide for Denver homeowners. Include practical checklists, cost breakdowns, and clear DIY vs professional guidance.',
1400, 6.50),

('Problem-Solution Guide', 'problem_solving',
'{"sections": ["Identifying the Problem", "Immediate Safety Steps", "Temporary Solutions", "Professional Repair Options", "Cost Comparison Table", "Prevention and Maintenance", "FAQ Section", "Get Professional Help CTA"], "word_distribution": [250, 200, 300, 300, 200, 200, 150, 100]}',
'Create a detailed problem-solving guide for {roofing_issue}. Focus on safety, immediate actions, and when to call professionals.',
1500, 7.00),

('Industry Update/Comparison', 'industry_update',
'{"sections": ["What\'s New in [Topic]", "Benefits for Denver Homeowners", "Cost Analysis and ROI", "Installation Process Overview", "Comparison with Traditional Options", "FAQ Section", "Consultation CTA"], "word_distribution": [200, 300, 300, 200, 200, 100, 100]}',
'Explain new developments in {roofing_topic} for homeowners. Include cost analysis, benefits, and comparisons with existing options.',
1300, 6.00)
ON CONFLICT DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all blog tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_content_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_automation_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (adjust as needed)
-- Note: These are basic policies - customize based on your auth requirements

CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update access for authenticated users" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON blog_content_plans FOR SELECT USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON blog_content_plans FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update access for authenticated users" ON blog_content_plans FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON blog_performance_metrics FOR SELECT USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON blog_performance_metrics FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON blog_content_templates FOR SELECT USING (true);

CREATE POLICY "Enable read access for authenticated users" ON blog_automation_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON blog_automation_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');