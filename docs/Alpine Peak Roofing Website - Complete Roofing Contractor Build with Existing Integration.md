# Alpine Peak Roofing Website - Complete Roofing Contractor Build with Existing Integration

## Project Context
You're completing the Alpine Peak Roofing website in the existing `apr-website/` directory. The project already has 
AI automation features partially implemented in the `agents/` folders. Your task is to build a complete, professional 
roofing contractor website that uses these AI tools operationally, with one special page that showcases them.

## Existing Structure - DO NOT OVERWRITE
```
apr-website/
├── agents/                          # Already structured - DO NOT OVERWRITE
│   ├── ai-chatbot-agent/           # Contains chatbot implementation
│   ├── blog-automation-agent/      # Blog generation system
│   ├── roof-estimator-agent/       # Instant estimation tools
│   └── lead-crm-agent/            # Lead management system
├── app/                            # Expand existing structure
├── components/                     # Add to existing components
├── lib/                           # Utilize existing utilities
└── types/                         # Extend type definitions
```

## Navigation Structure
```
Main Navigation:
- Home
- About Us
- Services
- Portfolio
- Our Process
- Blog
- AI Tools (dropdown)
  └── Intelligent Roofing Automations
- Contact
```

## Complete Website Implementation

### 1. **Homepage** (`app/page.tsx`)
**Build a Professional Roofing Company Homepage:**

**Hero Section:**
- Headline: "Pinnacle of Protection, Peak of Performance"
- Subheading: "Professional Roofing Solutions for Homes and Businesses"
- CTA: "Get Your Free Instant Estimate" (links to `/estimator` using existing `roof-estimator-agent`)
- Background: High-quality roofing project image

**Key Sections:**
- **Our Services** (3 cards):
  - Residential Roofing
  - Commercial Roofing
  - Emergency Repairs
- **Why Alpine Peak:**
  - 24/7 Support (powered by `ai-chatbot-agent`)
  - Instant Estimates (using `roof-estimator-agent`)
  - Licensed & Insured Professionals
  - 10-Year Workmanship Warranty
- **Recent Projects** (carousel from portfolio)
- **Customer Testimonials** (about roofing work)
- **Latest from Our Blog** (3 recent posts from `blog-automation-agent`)
- **Service Area Map**

**Integration Points:**
- Import and use `ChatWidget` from `components/chatbot/`
- Link to estimator using existing `roof-estimator-agent` components
- Pull blog posts from database populated by `blog-automation-agent`

### 2. **About Us** (`app/about/page.tsx`)
**Roofing Company Story Using Identity Document:**

```typescript
// Use content from the Alpine Peak Roofing Company Identity document
const aboutContent = {
  mission: "To safeguard our communities by delivering superior roofing solutions...",
  vision: "To redefine the roofing industry by seamlessly integrating...",
  taglineExplanation: "Pinnacle of Protection, Peak of Performance is more than just a tagline..."
}
```

**Team Section:**
- Michael Chen - Founder & Master Roofer
- Sarah Mitchell - Operations Director
- Marcus Rodriguez - Senior Project Manager
- Jennifer Park - Customer Experience Manager
- David Thompson - Lead Estimator

**Additional Sections:**
- Core Values (from identity document)
- Certifications & Awards
- Community Involvement
- Safety Commitment

### 3. **Services** (`app/services/page.tsx` and subdirectories)
**Complete Roofing Services:**

Create individual pages for each service:
```
app/services/
├── residential/
│   ├── roof-replacement/page.tsx
│   ├── roof-repair/page.tsx
│   ├── shingle-installation/page.tsx
│   └── metal-roofing/page.tsx
├── commercial/
│   ├── tpo-epdm/page.tsx
│   ├── built-up-roofing/page.tsx
│   └── maintenance-programs/page.tsx
└── emergency/page.tsx
```

**Each Service Page Includes:**
- Detailed service description
- Benefits and features
- Material options
- Warranty information
- Photo gallery
- "Get Instant Estimate" button (using `roof-estimator-agent`)

### 4. **Portfolio** (`app/portfolio/page.tsx`)
**Roofing Projects Showcase:**

```typescript
// Use filtering system for projects
const projectCategories = [
  'All Projects',
  'Residential',
  'Commercial',
  'Storm Damage',
  'Metal Roofing',
  'Shingle Roofing'
]
```

**Project Cards Include:**
- Before/after images
- Project type and materials
- Duration and season
- Customer testimonial
- View Details modal

### 5. **Our Process** (`app/process/page.tsx`)
**Real Roofing Installation Process:**

**Interactive Timeline:**
1. **Initial Consultation**
   - Free inspection booking (uses `ai-chatbot-agent` for scheduling)
   - Instant estimate option (uses `roof-estimator-agent`)
   
2. **Detailed Assessment**
   - Professional evaluation
   - Material selection
   - Final quote preparation

3. **Project Planning**
   - Permit acquisition
   - Material ordering
   - Schedule coordination

4. **Installation**
   - Day-by-day breakdown
   - Safety protocols
   - Quality checkpoints

5. **Completion**
   - Final inspection
   - Warranty registration
   - Maintenance schedule

### 6. **Blog** (`app/blog/page.tsx`)
**Roofing Industry Blog:**

**Integration with `blog-automation-agent`:**
```typescript
// Pull posts from Supabase populated by blog-automation-agent
import { getBlogPosts } from '@/lib/blog/queries'

// Display posts with categories
const categories = [
  'Maintenance Tips',
  'Material Guides', 
  'Seasonal Advice',
  'Industry News',
  'Energy Efficiency'
]
```

**Initial Posts to Generate:**
- "2025 Guide to Roof Maintenance"
- "Storm Season Preparation Checklist"
- "Understanding Roofing Materials: Complete Guide"
- "Signs Your Roof Needs Replacement"
- "Energy-Efficient Roofing Options"

### 7. **Intelligent Roofing Automations** (`app/ai-tools/intelligent-roofing-automations/page.tsx`)
**THE SHOWCASE PAGE for Your Four AI Tools:**

**Hero Section:**
- Title: "Intelligent Roofing Automations"
- Subtitle: "See How We Deliver Superior Service Through Innovation"
- Description: "Alpine Peak Roofing leverages four revolutionary AI-powered automation features"

**Four Feature Sections (from Alpine Peak Roofing Features.md):**

1. **🤖 AI-Powered Chatbot System**
   - Live demo widget
   - Feature highlights:
     - 24/7 availability
     - 150+ qualified leads monthly
     - 85% lead qualification accuracy
   - "Try It Now" interactive demo

2. **📝 Automated Blog Content System**
   - Sample generated posts
   - Metrics display:
     - $11.72 per post
     - 5+ leads per post
     - 2-3 posts weekly
   - "View Our Blog" link

3. **🏠 Instant Roof Estimator**
   - Live estimator demo
   - Technology explanation:
     - 30-second estimates
     - 95% accuracy
     - Satellite imagery analysis
   - "Get Your Estimate" CTA

4. **🎯 Lead Generation & CRM System**
   - Dashboard preview
   - Performance metrics:
     - 150+ leads monthly
     - 30% conversion rate
     - 15-minute response time
   - Integration capabilities

**Bottom Section:**
- "Interested in These Tools for Your Roofing Business?"
- ROI Calculator
- Request Demo form
- Case studies of efficiency improvements

### 8. **Contact** (`app/contact/page.tsx`)
**Standard Roofing Contact Page:**

**Contact Options:**
- Request Estimate form (captured by `lead-crm-agent`)
- Emergency Hotline
- Office Information
- Service Area Map
- Insurance Claims Help

**Integration:**
- Forms connected to `lead-crm-agent`
- Chatbot handles initial inquiries
- Automatic lead scoring and routing

## Component Integration

### Existing Components to Use:
```typescript
// From existing agents
import { ChatWidget } from '@/components/chatbot/ChatWidget'
import { EstimatorWizard } from '@/components/estimator/EstimatorWizard'
import { LeadCaptureForm } from '@/components/crm/LeadCaptureForm'
import { BlogPost } from '@/components/blog/BlogPost'
```

### New Components to Create:
```typescript
// Roofing-specific components
components/
├── roof/
│   ├── ServiceCard.tsx
│   ├── ProjectGallery.tsx
│   ├── TestimonialCard.tsx
│   └── ProcessTimeline.tsx
├── layout/
│   ├── Navigation.tsx (with AI Tools dropdown)
│   └── Footer.tsx
└── automation-showcase/
    ├── FeatureDemo.tsx
    ├── ROICalculator.tsx
    └── MetricsDisplay.tsx
```

## Database Integration

### Utilize Existing Supabase Tables:
```sql
-- These should already exist from agents setup
- chat_sessions (from ai-chatbot-agent)
- blog_posts (from blog-automation-agent)
- estimates (from roof-estimator-agent)
- leads (from lead-crm-agent)

-- Add new tables for roofing content
- projects (for portfolio)
- testimonials
- services
- team_members
```

## API Routes

### Use Existing API Routes:
```typescript
// Already implemented in agents
/api/chatbot/message
/api/blog/generate
/api/estimator/calculate
/api/leads/capture
```

### Add New Routes:
```typescript
/api/projects/list
/api/testimonials/list
/api/contact/submit
/api/automation-demo/request
```

## Content Requirements

### Roofing-Focused Content:
1. **Service Descriptions**: 500+ words per service
2. **Project Case Studies**: 10+ detailed projects
3. **Testimonials**: 20+ customer reviews about roofing work
4. **FAQ Content**: Common roofing questions
5. **Blog Posts**: Initial 10 posts about roofing topics

### AI Automation Content (for showcase page only):
- Use content from `Alpine Peak Roofing Features.md`
- Include all metrics and ROI data
- Create interactive demos for each feature

## Implementation Priority

### Phase 1: Core Roofing Website
1. Homepage with all sections
2. About Us with company identity
3. Services overview and individual pages
4. Contact page with forms

### Phase 2: Integration Features
1. Connect chatbot across all pages
2. Implement instant estimator
3. Set up blog with automated posts
4. Configure lead capture system

### Phase 3: Content & Polish
1. Portfolio with 20+ projects
2. Testimonials page
3. Our Process with timeline
4. Intelligent Roofing Automations showcase page

### Phase 4: Optimization
1. SEO optimization for roofing keywords
2. Performance improvements
3. Mobile responsiveness
4. Analytics integration

## Critical Notes

1. **DO NOT OVERWRITE** the `agents/` directory - these contain working implementations
2. **USE EXISTING COMPONENTS** from agents whenever possible
3. **The website is a ROOFING COMPANY** - AI is just how we operate
4. **Only the "Intelligent Roofing Automations" page** reveals and showcases the AI tools
5. **All testimonials are about ROOFING WORK**, not AI features
6. **Blog posts are about ROOFING TOPICS** to demonstrate expertise
7. **The chatbot knows everything about Alpine Peak Roofing** as a roofing company
8. **Use the company identity document** for mission, vision, values, and brand voice

## Success Criteria

The completed website should:
1. Function as a legitimate, professional roofing contractor website
2. Seamlessly integrate the four AI tools without making them the focus
3. Generate real roofing leads through natural user flow
4. Have one dedicated page (Intelligent Roofing Automations) that showcases the AI capabilities
5. Build trust through quality content, testimonials, and portfolio
6. Rank well for roofing-related searches
7. Demonstrate the power of AI automation through actual use, not just claims

---

This prompt ensures Claude Code builds upon your existing work, maintains the roofing company focus, and includes the 
special "Intelligent Roofing Automations" page under the AI Tools menu item to showcase your four powerful 
features to potential buyers.