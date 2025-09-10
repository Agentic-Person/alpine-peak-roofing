-- Blog Automation System Database Schema
-- Cost-optimized blog automation for Alpine Peak Roofing

-- 1. Blog Posts (Generated Content)
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    seo_title TEXT,
    meta_description TEXT,
    focus_keyword TEXT,
    keywords TEXT[],
    featured_image_url TEXT,
    alt_text TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    season TEXT CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
    social_media JSONB, -- Store social media posts as JSON
    estimated_cost DECIMAL(5,2) NOT NULL DEFAULT 6.50,
    cms_id TEXT, -- External CMS reference
    social_media_scheduled BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    publish_date DATE,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Blog Content Calendar (Planning Phase)
CREATE TABLE blog_content_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    planned_date DATE NOT NULL,
    season TEXT NOT NULL CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
    status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'content_generated', 'published', 'cancelled')),
    estimated_cost DECIMAL(5,2) NOT NULL DEFAULT 14.50,
    actual_cost DECIMAL(5,2),
    blog_post_id UUID REFERENCES blog_posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    performance_tracking_enabled BOOLEAN DEFAULT false,
    final_cost DECIMAL(5,2)
);

-- 3. Blog Performance Tracking
CREATE TABLE blog_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    bounce_rate DECIMAL(4,2),
    avg_time_on_page INTEGER, -- in seconds
    social_shares INTEGER DEFAULT 0,
    leads_generated INTEGER DEFAULT 0,
    phone_calls INTEGER DEFAULT 0,
    quote_requests INTEGER DEFAULT 0,
    email_signups INTEGER DEFAULT 0,
    search_impressions INTEGER DEFAULT 0,
    search_clicks INTEGER DEFAULT 0,
    avg_position DECIMAL(4,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(blog_post_id, date)
);

-- 4. Newsletter Queue (Email Marketing)
CREATE TABLE newsletter_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id),
    title TEXT NOT NULL,
    excerpt TEXT,
    url TEXT NOT NULL,
    featured_image TEXT,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'included', 'sent')),
    newsletter_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE
);

-- 5. SEO Keywords Tracking
CREATE TABLE seo_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL,
    blog_post_id UUID REFERENCES blog_posts(id),
    target_position INTEGER DEFAULT 10,
    current_position INTEGER,
    search_volume INTEGER,
    competition_level TEXT CHECK (competition_level IN ('low', 'medium', 'high')),
    last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(keyword, blog_post_id)
);

-- 6. Content Cost Tracking
CREATE TABLE content_costs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_post_id UUID REFERENCES blog_posts(id),
    workflow_name TEXT NOT NULL,
    service_name TEXT NOT NULL, -- 'openai-gpt-3.5', 'openai-gpt-4', 'dall-e-3', etc.
    cost_amount DECIMAL(6,3) NOT NULL,
    tokens_used INTEGER,
    api_call_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_publish_date ON blog_posts(publish_date);
CREATE INDEX idx_blog_posts_season ON blog_posts(season);
CREATE INDEX idx_blog_content_calendar_status ON blog_content_calendar(status);
CREATE INDEX idx_blog_content_calendar_planned_date ON blog_content_calendar(planned_date);
CREATE INDEX idx_blog_performance_blog_post_id ON blog_performance(blog_post_id);
CREATE INDEX idx_blog_performance_date ON blog_performance(date);
CREATE INDEX idx_seo_keywords_keyword ON seo_keywords(keyword);
CREATE INDEX idx_content_costs_blog_post_id ON content_costs(blog_post_id);

-- Row Level Security (RLS) policies
ALTER TABLE blog_content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_costs ENABLE ROW LEVEL SECURITY;

-- Policies for public read access on published posts
CREATE POLICY "Public can read published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Policies for admin access (will be configured based on auth setup)
CREATE POLICY "Authenticated users can manage blog content" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage calendar" ON blog_content_calendar
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view performance" ON blog_performance
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage newsletter" ON newsletter_queue
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage keywords" ON seo_keywords
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view costs" ON content_costs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Functions for common operations

-- Function to calculate total cost per blog post
CREATE OR REPLACE FUNCTION get_blog_post_total_cost(post_id UUID)
RETURNS DECIMAL(6,2) AS $$
BEGIN
    RETURN (
        SELECT COALESCE(SUM(cost_amount), 0)
        FROM content_costs
        WHERE blog_post_id = post_id
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get blog post performance summary
CREATE OR REPLACE FUNCTION get_blog_post_performance_summary(post_id UUID)
RETURNS TABLE (
    total_views INTEGER,
    total_leads INTEGER,
    avg_bounce_rate DECIMAL(4,2),
    total_social_shares INTEGER,
    best_position DECIMAL(4,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(bp.page_views), 0)::INTEGER as total_views,
        COALESCE(SUM(bp.leads_generated), 0)::INTEGER as total_leads,
        COALESCE(AVG(bp.bounce_rate), 0) as avg_bounce_rate,
        COALESCE(SUM(bp.social_shares), 0)::INTEGER as total_social_shares,
        COALESCE(MIN(sk.current_position), 0) as best_position
    FROM blog_performance bp
    LEFT JOIN seo_keywords sk ON sk.blog_post_id = post_id
    WHERE bp.blog_post_id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial seasonal content ideas for testing
INSERT INTO blog_content_calendar (topic, planned_date, season, status) VALUES
('Spring Roof Inspection Checklist for Denver Homeowners', CURRENT_DATE + INTERVAL '7 days', 'spring', 'planned'),
('How to Prepare Your Roof for Summer Heat in Colorado', CURRENT_DATE + INTERVAL '14 days', 'summer', 'planned'),
('Fall Gutter Cleaning: Essential Guide for Denver Weather', CURRENT_DATE + INTERVAL '21 days', 'fall', 'planned');

-- Comments for documentation
COMMENT ON TABLE blog_content_calendar IS 'Content planning and scheduling for automated blog generation';
COMMENT ON TABLE blog_posts IS 'Generated blog posts with SEO optimization and social media content';
COMMENT ON TABLE blog_performance IS 'Daily performance metrics for published blog posts';
COMMENT ON TABLE newsletter_queue IS 'Queue for including blog posts in email newsletters';
COMMENT ON TABLE seo_keywords IS 'Keyword tracking and ranking monitoring';
COMMENT ON TABLE content_costs IS 'Detailed cost tracking for AI services and API usage';