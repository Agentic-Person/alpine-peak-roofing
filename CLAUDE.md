# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a high-end roofing contractor website project for Alpine Peak Roofing, featuring AI-powered automation, chatbot integration, and comprehensive CRM workflows. The project aims to create a premium digital presence that automates lead capture, qualification, and customer engagement through modern web technologies.

**Company Identity:** "Pinnacle of Protection, Peak of Performance"
**Location:** Denver metro area and surrounding regions
**Target Market:** Residential homeowners, commercial property managers, and insurance adjusters

## Project Structure

Currently in planning/documentation phase:
```
apr-website/
├── docs/                                    # Project documentation
│   ├── tech-specs-2025.md                 # Technical implementation specs
│   ├── roofing-prd-2025.md                # Product requirements document
│   ├── Website Architecture and Design Plan.md
│   ├── AI Chatbot Design and Workflow Plan.md
│   ├── market-analysis-2025.md
│   └── Alpine Peak Roofing_ Company Identity and Content.md
```

**Note:** This is currently a documentation-only repository. Implementation has not yet begun.

## Planned Technology Stack

Based on technical specifications in docs/:

### Frontend
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS with custom component library
- **State Management:** Zustand for global state
- **Forms:** React Hook Form with Zod validation
- **Analytics:** Google Analytics 4 + Custom events tracking

### Backend & Automation
- **API:** Node.js with Express.js
- **Database:** PostgreSQL with encryption
- **Automation Platform:** n8n for workflow orchestration
- **Chatbot:** GPT-4 Turbo with custom training
- **CRM Integration:** HubSpot/Salesforce APIs
- **Caching:** Redis for performance optimization

### Infrastructure
- **Hosting:** Cloud-based with 99.9% uptime guarantee
- **Performance:** CDN integration, under 3-second load times
- **Security:** SSL certification, end-to-end encryption, GDPR/CCPA compliance
- **Deployment:** Docker containerization with Kubernetes orchestration

## Planned Development Commands

When implementation begins, the following commands will be available:

### Initial Setup
```bash
# Create Next.js project
npx create-next-app@latest apr-website --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Install core dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install framer-motion react-hot-toast zustand
npm install react-youtube @types/react-youtube
npm install lucide-react @hookform/resolvers zod

# Development
npm run dev

# Production build
npm run build
npm run start

# Linting and type checking (when configured)
npm run lint
npm run typecheck
```

## Planned Architecture Patterns

### API Route Structure
```
/api/leads/capture          # Lead capture from forms/chatbot
/api/chatbot/process        # Chatbot message processing
/api/crm/sync              # CRM integration endpoints
/api/automation/trigger    # n8n workflow triggers
/api/webhooks/discord      # External webhook handlers
```

### Database Schema Overview
Key planned tables:
- `leads` - Lead information with scoring and status
- `chat_conversations` - Chatbot interaction history
- `automation_executions` - n8n workflow tracking
- `content_items` - SEO-optimized content management

### Automation Workflows (n8n)
- **Lead Processing Pipeline:** Form → Validation → CRM → Notifications
- **Content Publishing:** Scheduled → AI Generation → SEO → Distribution
- **Storm Response:** Weather API → Alert System → Emergency Protocols

## Key Implementation Priorities

### Phase 1: Foundation (Months 1-2)
- Core website with responsive design
- Basic CRM integration
- SEO optimization and content structure
- Security and compliance implementation

### Phase 2: Automation (Months 2-3)
- n8n workflow deployment
- AI chatbot development and integration
- Advanced CRM automation
- Content marketing automation

### Phase 3: Advanced Features (Months 3-4)
- Customer portal development
- Project management integration
- Payment processing
- Mobile optimization

## Business Context

### Target Metrics
- **Lead Generation:** 150+ qualified leads monthly
- **Conversion Rate:** 35% visitor-to-lead conversion
- **Customer Satisfaction:** 95%+ satisfaction scores
- **SEO Performance:** Top 3 rankings for target keywords
- **Revenue Impact:** 40% increase in annual revenue

### Industry Challenges Addressed
- Labor shortages (61% of contractors affected)
- Administrative inefficiencies (18-day payment delays)
- Lead qualification and response time issues
- Limited digital presence in roofing industry

## Development Guidelines

### Code Quality Standards
- Follow Next.js 14 App Router conventions
- Implement TypeScript strictly for type safety
- Use Tailwind CSS for consistent styling
- Maintain responsive, mobile-first design
- Ensure WCAG 2.1 AA accessibility compliance

### Security Best Practices
- Never commit environment variables or API keys
- Implement end-to-end encryption for sensitive data
- Use rate limiting on all API endpoints
- Validate all user inputs with Zod schemas
- Regular security audits and penetration testing

### Performance Requirements
- Page load times under 3 seconds
- Mobile PageSpeed score of 90+
- Core Web Vitals compliance
- CDN integration for static assets
- Optimized images with Next.js Image component

## Integration Requirements

### CRM Systems
- HubSpot Professional/Enterprise integration
- Salesforce API connectivity
- Real-time bi-directional synchronization
- Custom field mapping and validation

### External Services
- Google Analytics 4 for tracking
- YouTube iframe API for content
- Weather APIs for storm response
- Payment processing (Stripe/PayPal)
- Email service providers (SendGrid/Mailgun)

When implementation begins, this documentation will be updated with actual file structures, specific commands, and deployment configurations.