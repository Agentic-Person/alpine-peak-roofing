# Agentic Blog Automation Workflow Prompt for Alpine Peak Roofing

## Overview
Create a sophisticated, AI-powered blog automation system using n8n that generates highly relevant, SEO-optimized content for the roofing industry. This system should produce 3-4 blog posts weekly that appeal to homeowners, DIY enthusiasts, and those researching roofing solutions, with the goal of maximizing organic search visibility and AI crawler indexing (ChatGPT, Perplexity, Claude).

## Core Objective
Build an intelligent content generation system that:
- Monitors industry trends and homeowner pain points in real-time
- Creates comprehensive, solution-focused content that LLMs prioritize
- Maintains Alpine Peak Roofing's position as a thought leader
- Drives organic traffic through strategic SEO optimization
- Captures leads through valuable, actionable content

## Content Strategy Based on Research

### High-Priority Topics (Based on Industry Analysis)
**2025 Trending Topics:**
- Smart roofing technology and innovations
- Energy-efficient roofing solutions
- Impact-resistant and weather-resilient materials
- Solar panel integration with roofing
- Sustainable and eco-friendly roofing options

**DIY & Money-Saving Content:**
- Seasonal roof maintenance checklists
- How to inspect your roof safely
- Identifying early warning signs of damage
- Gutter cleaning and maintenance guides
- When to DIY vs. hire a professional

**Problem-Solving Content:**
- Common roofing scams to avoid
- Insurance claim navigation guides
- Storm damage assessment tips
- Cost-saving strategies for roof repairs
- Emergency repair guidance

### Content Pillars

#### Pillar 1: Homeowner Education (40% of content)
- "The Complete Guide to [Topic]" - 2500+ word comprehensive guides
- "How to Save Money on Your Roof" series
- "Understanding Your Roof" educational content
- Seasonal preparation guides (spring cleaning, winter prep, storm season)
- DIY maintenance tutorials with safety warnings

#### Pillar 2: Industry Insights (25% of content)
- Technology trends (drone inspections, AI assessments)
- Material innovations and comparisons
- Cost analysis and pricing transparency
- Labor market updates and impacts
- Regulatory changes affecting homeowners

#### Pillar 3: Local & Seasonal (20% of content)
- Weather-triggered content (storm preparation, hail damage)
- Regional building code updates
- Local contractor spotlights
- Neighborhood case studies
- Climate-specific roofing solutions

#### Pillar 4: Interactive & Tools (15% of content)
- Cost calculators and estimators
- Interactive maintenance schedules
- Decision trees (repair vs. replace)
- Comparison charts (materials, warranties)
- Video tutorials and infographics

## n8n Workflow Architecture

### Workflow Name: "Alpine Peak Intelligent Blog Generator"

### Trigger Configuration
```
Primary Schedule: Monday, Wednesday, Friday at 5:00 AM MST
Secondary Trigger: Manual webhook for urgent content
Weather Trigger: Severe weather alerts in service area
```

### Data Collection Phase (Nodes 1-6)

**Node 1: Multi-Source Content Discovery**
- Monitor 25+ RSS feeds from roofing industry sources
- Track Google Trends for "roof repair," "roof replacement," "DIY roof"
- Reddit API monitoring (r/roofing, r/homeimprovement, r/DIY)
- Weather API for seasonal/storm-related triggers
- Google Search Console for trending queries
- Answer The Public API for question mining

**Node 2: Competitor Content Analysis**
- Scrape top 10 roofing blogs weekly
- Identify content gaps using SEMrush/Ahrefs API
- Track competitor social media engagement
- Monitor local competitor websites

**Node 3: Customer Intelligence Gathering**
- Parse customer support tickets for FAQs
- Analyze chat transcripts for common concerns
- Review form submissions for pain points
- Track website search queries

### Content Planning Phase (Nodes 7-10)

**Node 4: AI Topic Selection Engine**
```
Prompt Template:
"Analyze these data sources:
- Industry trends: {trends}
- Customer questions: {questions}
- Competitor gaps: {gaps}
- Seasonal factors: {season}
- Recent news: {news}

Select the most valuable blog topic that:
1. Addresses immediate homeowner needs
2. Has high search volume but low competition
3. Provides actionable solutions
4. Aligns with {current_month} seasonality
5. Hasn't been covered in last 30 days

Output: Topic title, target keywords, user intent, content angle"
```

**Node 5: Content Outline Generation**
- Create detailed outline with H2/H3 structure
- Include LSI keywords for semantic SEO
- Plan internal linking opportunities
- Identify required media (images, videos, infographics)
- Set target word count (minimum 1500, optimal 2000-3000)

### Content Creation Phase (Nodes 11-16)

**Node 6: AI Content Generation**
```
Advanced Prompt Structure:
"Write a {word_count} word blog post for homeowners about {topic}.

Audience: Homeowners aged 35-65, concerned about {primary_concern}
Tone: Professional yet conversational, empathetic to concerns
Reading level: 8th grade

Include:
- Compelling introduction addressing the problem
- {number} actionable tips with step-by-step instructions
- Cost-saving strategies with specific dollar amounts
- Safety warnings and when to call professionals
- Local considerations for {location}
- Comparison table of options
- FAQ section with 5-7 questions
- Strong CTA for free inspection

SEO Requirements:
- Primary keyword: {primary_keyword} (3-5 times)
- Secondary keywords: {secondary_keywords} (2-3 times each)
- LSI keywords: {lsi_keywords} (naturally incorporated)
- Meta description: {meta_template}

Format: Use short paragraphs, bullet points, numbered lists
Include: Statistics, expert quotes, case studies"
```

**Node 7: Content Enhancement**
- Add current pricing data from supplier APIs
- Insert recent case studies from CRM
- Include seasonal/weather-specific information
- Add schema markup for FAQs, How-tos
- Generate custom meta descriptions

**Node 8: Visual Content Generation**
- DALL-E 3 or Midjourney for featured images
- Canva API for infographics
- Before/after photo selection from database
- Video embedding from YouTube library
- Alt text generation for accessibility

### Quality Assurance Phase (Nodes 17-20)

**Node 9: Content Validation**
- Plagiarism check via Copyscape API
- Fact verification against authoritative sources
- Readability scoring (target: 60-70 Flesch score)
- Grammar and spelling check
- Brand voice consistency analysis
- Legal/compliance review for claims

**Node 10: SEO Optimization**
- Yoast SEO scoring integration
- Internal link insertion (3-5 per post)
- External link validation
- Image optimization and compression
- URL slug optimization
- Schema markup validation

### Publishing Phase (Nodes 21-25)

**Node 11: CMS Integration**
- Push to WordPress/Next.js via API
- Set categories and tags
- Schedule social media posts
- Update XML sitemap
- Trigger CDN cache refresh

**Node 12: Distribution Automation**
- Email newsletter inclusion
- Social media scheduling (Facebook, Instagram, LinkedIn)
- Google My Business post creation
- Push notification to app users
- Slack notification to team

### Performance Tracking Phase (Nodes 26-28)

**Node 13: Analytics Integration**
- Track pageviews, time on page, bounce rate
- Monitor keyword rankings
- Track conversion events (form fills, calls)
- Social share tracking
- Lead attribution analysis

**Node 14: Feedback Loop**
```
Weekly Analysis:
- Top performing topics
- Lowest performing content
- User engagement patterns
- Conversion rates by topic
- Search ranking changes

Optimization Actions:
- Update content calendar
- Adjust topic selection weights
- Refine prompt templates
- A/B test CTAs
```

## Content Templates

### Template 1: Ultimate Guide Format
```
Title: The Complete [Year] Guide to {Topic} for {Location} Homeowners
Sections:
1. Why This Matters Now
2. Understanding the Basics
3. Step-by-Step Process
4. Cost Breakdown with Examples
5. Common Mistakes to Avoid
6. Professional vs. DIY Analysis
7. Maintenance Schedule
8. FAQ Section
9. Next Steps
```

### Template 2: Problem-Solution Format
```
Title: {Problem} in {Season}? Here's Exactly What to Do
Sections:
1. Identifying the Problem
2. Immediate Actions (Safety First)
3. Temporary Fixes
4. Permanent Solutions
5. Cost Comparisons
6. Prevention Strategies
7. When to Call Professionals
8. Insurance Considerations
```

### Template 3: Comparison Format
```
Title: {Option A} vs {Option B}: Which is Right for Your {Location} Home?
Sections:
1. Quick Comparison Table
2. Detailed Analysis
3. Cost Over Time
4. Climate Considerations
5. Aesthetic Options
6. Warranty Comparisons
7. Installation Process
8. Final Recommendation
```

## SEO Optimization Framework

### On-Page SEO Requirements
- Title tags: 50-60 characters with primary keyword
- Meta descriptions: 150-160 characters with CTA
- Headers: H1 with keyword, H2s with variations
- URL structure: /blog/category/keyword-rich-slug
- Image SEO: Descriptive filenames, alt text, compression
- Internal linking: 3-5 contextual links per post
- External linking: 1-2 authoritative sources

### Technical SEO Elements
```json
{
  "schema": {
    "Article": true,
    "FAQPage": true,
    "HowTo": true,
    "LocalBusiness": true
  },
  "performance": {
    "loadTime": "<2 seconds",
    "mobileFirst": true,
    "coreWebVitals": "green"
  }
}
```

## Success Metrics

### Content Performance KPIs
- Organic traffic growth: 20% monthly
- Average time on page: >3 minutes
- Pages per session: >2
- Bounce rate: <40%
- Social shares: >50 per post

### Business Impact Metrics
- Lead generation: 5+ qualified leads per post
- Phone calls: 2+ per post
- Quote requests: 3+ per post
- Email signups: 10+ per post
- Local search ranking improvement

### AI Crawler Optimization
- Featured snippets captured: 30% of posts
- "People Also Ask" appearances: 50% of posts
- Voice search optimization
- ChatGPT/Perplexity citations
- Google Discover eligibility

## Implementation Notes

### Phase 1: Foundation (Week 1)
- Set up n8n infrastructure
- Configure API connections
- Create content templates
- Establish quality checkpoints

### Phase 2: Testing (Week 2)
- Generate 5 test articles
- Refine prompts based on output
- Optimize workflow efficiency
- Set up tracking systems

### Phase 3: Launch (Week 3)
- Begin automated publishing
- Monitor performance daily
- Gather team feedback
- Iterate on templates

### Phase 4: Optimization (Ongoing)
- Weekly performance reviews
- Monthly strategy adjustments
- Quarterly content audits
- Continuous prompt refinement

## Special Considerations

### Seasonal Content Calendar
- **Spring**: Inspection guides, storm prep
- **Summer**: Energy efficiency, ventilation
- **Fall**: Winter preparation, gutter cleaning
- **Winter**: Ice dam prevention, emergency repairs

### Local Market Integration
- Neighborhood-specific content
- Local weather patterns
- Regional building codes
- Community event tie-ins
- Local partnership content

### Legal and Compliance
- Disclaimer templates for DIY content
- Insurance claim accuracy
- Warranty information accuracy
- Safety warning requirements
- FTC disclosure compliance

This comprehensive workflow will position Alpine Peak Roofing as the authoritative source for roofing information, driving consistent organic traffic while demonstrating the power of AI automation to potential roofing company clients.