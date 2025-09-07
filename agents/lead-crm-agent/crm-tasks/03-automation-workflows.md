# Automation Workflows & n8n Implementation

## 🎯 Overview
This document outlines the comprehensive automation workflows that will be built using the n8n MCP server, including lead scoring, routing, CRM synchronization, and nurturing sequences.

## 🤖 Core n8n Workflows

### 1. Lead Scoring Engine Workflow

#### Workflow: `lead-scoring-engine`
**Trigger**: New lead captured from any source
**Purpose**: Calculate comprehensive lead score and assign priority level

```json
{
  "workflow_name": "lead-scoring-engine",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhook/new-lead",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Parse Lead Data",
      "type": "Code",
      "parameters": {
        "jsCode": "// Extract lead information and prepare for scoring"
      }
    },
    {
      "name": "Behavioral Score",
      "type": "Code",
      "parameters": {
        "jsCode": "// Calculate behavioral score (40% weight)"
      }
    },
    {
      "name": "Demographic Score",
      "type": "Code",
      "parameters": {
        "jsCode": "// Calculate demographic score (30% weight)"
      }
    },
    {
      "name": "Source Score",
      "type": "Code",
      "parameters": {
        "jsCode": "// Calculate source quality score (20% weight)"
      }
    },
    {
      "name": "Interaction Score",
      "type": "Code",
      "parameters": {
        "jsCode": "// Calculate interaction score (10% weight)"
      }
    },
    {
      "name": "Calculate Final Score",
      "type": "Code",
      "parameters": {
        "jsCode": "// Combine all scores with weights"
      }
    },
    {
      "name": "Assign Priority Level",
      "type": "Switch",
      "parameters": {
        "rules": [
          {"operation": ">=", "value": 80, "output": "hot"},
          {"operation": ">=", "value": 60, "output": "warm"},
          {"operation": ">=", "value": 40, "output": "cold"},
          {"operation": "<", "value": 40, "output": "unqualified"}
        ]
      }
    },
    {
      "name": "Update Lead Record",
      "type": "HTTP Request",
      "parameters": {
        "method": "PUT",
        "url": "{{ $json.api_base_url }}/api/leads/{{ $json.lead_id }}",
        "body": {
          "lead_score": "{{ $json.final_score }}",
          "priority_level": "{{ $json.priority_level }}",
          "scoring_breakdown": "{{ $json.scoring_details }}"
        }
      }
    }
  ]
}
```

#### Lead Scoring Algorithm Implementation
```typescript
// Behavioral Scoring (40% weight)
const behavioralScore = {
  websiteEngagement: {
    pages_visited: (pages) => Math.min(pages * 5, 25),
    time_on_site: (minutes) => Math.min(minutes * 2, 20),
    return_visits: (visits) => Math.min(visits * 10, 30),
    bounce_rate: (rate) => rate < 0.3 ? 15 : rate < 0.6 ? 5 : 0
  },
  contentConsumption: {
    downloads: (count) => count * 15,
    video_views: (count) => count * 10,
    guide_reads: (count) => count * 12,
    calculator_usage: (count) => count * 20
  },
  formInteractions: {
    completion_rate: (rate) => rate * 30,
    field_focus_time: (seconds) => Math.min(seconds / 10, 10),
    progressive_disclosure: (steps) => steps * 5
  }
}

// Demographic Scoring (30% weight)
const demographicScore = {
  location: {
    service_area: (inArea) => inArea ? 30 : 0,
    distance: (miles) => miles < 20 ? 25 : miles < 50 ? 15 : 5,
    neighborhood_value: (percentile) => percentile * 0.2
  },
  propertyType: {
    residential: 20,
    commercial: 25,
    multi_family: 15
  },
  budgetIndicators: {
    project_scope: {
      replacement: 30,
      repair: 15,
      inspection: 10,
      emergency: 25
    },
    budget_range: {
      'under-10k': 10,
      '10k-25k': 20,
      '25k-50k': 25,
      '50k-plus': 30,
      'need-estimate': 15
    }
  }
}
```

### 2. Lead Routing System Workflow

#### Workflow: `lead-routing-system`
**Trigger**: Lead score calculated
**Purpose**: Automatically assign leads to appropriate team members

```json
{
  "workflow_name": "lead-routing-system",
  "trigger": {
    "type": "webhook", 
    "endpoint": "/webhook/lead-scored",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Get Team Availability",
      "type": "HTTP Request",
      "parameters": {
        "url": "{{ $json.api_base_url }}/api/team/availability"
      }
    },
    {
      "name": "Route by Priority",
      "type": "Switch",
      "parameters": {
        "rules": [
          {"field": "priority_level", "operation": "equal", "value": "hot", "output": "senior_estimator"},
          {"field": "priority_level", "operation": "equal", "value": "warm", "output": "mid_level"},
          {"field": "priority_level", "operation": "equal", "value": "cold", "output": "junior_level"},
          {"field": "priority_level", "operation": "equal", "value": "unqualified", "output": "nurture_sequence"}
        ]
      }
    },
    {
      "name": "Geographic Routing",
      "type": "Code",
      "parameters": {
        "jsCode": "// Route to nearest available team member"
      }
    },
    {
      "name": "Specialization Matching",
      "type": "Code",
      "parameters": {
        "jsCode": "// Match commercial leads to commercial specialists"
      }
    },
    {
      "name": "Workload Balancing",
      "type": "Code",
      "parameters": {
        "jsCode": "// Distribute leads evenly across available staff"
      }
    },
    {
      "name": "Assign Lead",
      "type": "HTTP Request",
      "parameters": {
        "method": "POST",
        "url": "{{ $json.api_base_url }}/api/leads/assign",
        "body": {
          "lead_id": "{{ $json.lead_id }}",
          "assigned_to": "{{ $json.selected_team_member }}",
          "assignment_reason": "{{ $json.routing_logic }}",
          "priority": "{{ $json.priority_level }}"
        }
      }
    },
    {
      "name": "Notify Team Member",
      "type": "Send Email",
      "parameters": {
        "to": "{{ $json.team_member_email }}",
        "subject": "New {{ $json.priority_level }} Lead Assigned",
        "template": "new-lead-assignment"
      }
    },
    {
      "name": "Send SMS for Hot Leads",
      "type": "Twilio",
      "parameters": {
        "condition": "{{ $json.priority_level === 'hot' }}",
        "to": "{{ $json.team_member_phone }}",
        "message": "URGENT: New hot lead assigned. Score: {{ $json.lead_score }}. Contact immediately."
      }
    }
  ]
}
```

### 3. CRM Synchronization Workflow

#### Workflow: `crm-synchronization`
**Trigger**: Lead data updated
**Purpose**: Bi-directional sync with HubSpot/Salesforce

```json
{
  "workflow_name": "crm-synchronization",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhook/lead-updated",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Determine CRM System",
      "type": "Switch",
      "parameters": {
        "field": "crm_system",
        "rules": [
          {"operation": "equal", "value": "hubspot", "output": "hubspot_sync"},
          {"operation": "equal", "value": "salesforce", "output": "salesforce_sync"}
        ]
      }
    },
    {
      "name": "HubSpot Contact Sync",
      "type": "HubSpot",
      "parameters": {
        "resource": "Contact",
        "operation": "upsert",
        "additionalFields": {
          "lead_source": "{{ $json.source }}",
          "lead_score": "{{ $json.score }}",
          "project_type": "{{ $json.project_type }}",
          "urgency_level": "{{ $json.urgency }}"
        }
      }
    },
    {
      "name": "Create HubSpot Deal",
      "type": "HubSpot",
      "parameters": {
        "resource": "Deal",
        "operation": "create",
        "additionalFields": {
          "dealname": "{{ $json.first_name }} {{ $json.last_name }} - {{ $json.project_type }}",
          "dealstage": "appointmentscheduled",
          "amount": "{{ $json.estimated_value }}",
          "pipeline": "roofing-sales-pipeline"
        }
      }
    },
    {
      "name": "Salesforce Lead Sync",
      "type": "Salesforce",
      "parameters": {
        "resource": "Lead",
        "operation": "upsert",
        "matchingColumns": ["Email"],
        "additionalFields": {
          "LeadSource": "{{ $json.source }}",
          "Lead_Score__c": "{{ $json.score }}",
          "Project_Type__c": "{{ $json.project_type }}",
          "Urgency_Level__c": "{{ $json.urgency }}"
        }
      }
    },
    {
      "name": "Update Local Database",
      "type": "HTTP Request",
      "parameters": {
        "method": "PUT",
        "url": "{{ $json.api_base_url }}/api/leads/{{ $json.lead_id }}/crm-sync",
        "body": {
          "crm_contact_id": "{{ $json.crm_contact_id }}",
          "crm_deal_id": "{{ $json.crm_deal_id }}",
          "last_sync": "{{ $now }}",
          "sync_status": "success"
        }
      }
    }
  ]
}
```

### 4. Email Nurturing Sequences Workflow

#### Workflow: `email-nurturing-sequences`
**Trigger**: Lead assigned to nurture sequence
**Purpose**: Automated email follow-up based on lead type and behavior

```json
{
  "workflow_name": "email-nurturing-sequences",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhook/start-nurture-sequence",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Determine Sequence Type",
      "type": "Switch",
      "parameters": {
        "field": "sequence_type",
        "rules": [
          {"operation": "equal", "value": "welcome", "output": "welcome_series"},
          {"operation": "equal", "value": "educational", "output": "education_series"},
          {"operation": "equal", "value": "urgency", "output": "urgency_series"},
          {"operation": "equal", "value": "re_engagement", "output": "reengagement_series"}
        ]
      }
    },
    {
      "name": "Welcome Email 1",
      "type": "Send Email",
      "parameters": {
        "delay": "immediate",
        "template": "welcome-series-01",
        "personalizations": {
          "first_name": "{{ $json.first_name }}",
          "project_type": "{{ $json.project_type }}"
        }
      }
    },
    {
      "name": "Welcome Email 2",
      "type": "Send Email",
      "parameters": {
        "delay": "2 days",
        "template": "welcome-series-02",
        "subject": "Your Roofing Project: What to Expect Next"
      }
    },
    {
      "name": "Educational Content Email",
      "type": "Send Email",
      "parameters": {
        "delay": "5 days",
        "template": "educational-content",
        "dynamic_content": {
          "roof-repair": "repair-tips-guide",
          "roof-replacement": "replacement-process-guide",
          "storm-damage": "insurance-claim-guide"
        }
      }
    },
    {
      "name": "Social Proof Email",
      "type": "Send Email",
      "parameters": {
        "delay": "1 week",
        "template": "social-proof",
        "content": "customer-testimonials-and-gallery"
      }
    },
    {
      "name": "Track Email Engagement",
      "type": "HTTP Request",
      "parameters": {
        "method": "POST",
        "url": "{{ $json.api_base_url }}/api/leads/{{ $json.lead_id }}/engagement",
        "body": {
          "email_opens": "{{ $json.opens }}",
          "email_clicks": "{{ $json.clicks }}",
          "engagement_score": "{{ $json.engagement_score }}"
        }
      }
    },
    {
      "name": "Update Lead Score",
      "type": "HTTP Request",
      "parameters": {
        "method": "POST",
        "url": "{{ $json.api_base_url }}/webhook/update-lead-score",
        "body": {
          "lead_id": "{{ $json.lead_id }}",
          "engagement_data": "{{ $json.engagement_data }}"
        }
      }
    }
  ]
}
```

### 5. SMS Campaign Workflow

#### Workflow: `sms-campaigns`
**Trigger**: High-priority lead or specific triggers
**Purpose**: Timely SMS communication for urgent leads

```json
{
  "workflow_name": "sms-campaigns",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhook/send-sms",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Check SMS Consent",
      "type": "Code",
      "parameters": {
        "jsCode": "// Verify lead has opted in for SMS"
      }
    },
    {
      "name": "Determine SMS Type",
      "type": "Switch",
      "parameters": {
        "field": "sms_type",
        "rules": [
          {"operation": "equal", "value": "immediate_response", "output": "immediate_sms"},
          {"operation": "equal", "value": "appointment_reminder", "output": "reminder_sms"},
          {"operation": "equal", "value": "weather_alert", "output": "weather_sms"},
          {"operation": "equal", "value": "follow_up", "output": "followup_sms"}
        ]
      }
    },
    {
      "name": "Send Immediate Response SMS",
      "type": "Twilio",
      "parameters": {
        "to": "{{ $json.phone }}",
        "message": "Hi {{ $json.first_name }}, thanks for your interest in Alpine Peak Roofing! We'll call you within 2 hours to discuss your {{ $json.project_type }} project."
      }
    },
    {
      "name": "Send Appointment Reminder",
      "type": "Twilio",
      "parameters": {
        "delay": "24 hours before appointment",
        "message": "Reminder: Your roofing consultation with Alpine Peak is tomorrow at {{ $json.appointment_time }}. Reply CONFIRM or call us at (555) 123-4567."
      }
    },
    {
      "name": "Weather Alert SMS",
      "type": "Twilio",
      "parameters": {
        "message": "Weather Alert: {{ $json.weather_condition }} reported in your area. Free storm damage inspection available. Call (555) 123-4567 or reply YES."
      }
    },
    {
      "name": "Track SMS Response",
      "type": "HTTP Request",
      "parameters": {
        "method": "POST",
        "url": "{{ $json.api_base_url }}/api/leads/{{ $json.lead_id }}/sms-engagement",
        "body": {
          "message_sent": "{{ $json.message_content }}",
          "delivery_status": "{{ $json.delivery_status }}",
          "response_received": "{{ $json.response }}"
        }
      }
    }
  ]
}
```

### 6. Appointment Scheduling Automation

#### Workflow: `appointment-scheduling`
**Trigger**: Lead requests appointment or reaches qualification threshold
**Purpose**: Automated calendar management and scheduling

```json
{
  "workflow_name": "appointment-scheduling",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhook/schedule-appointment",
    "method": "POST"
  },
  "nodes": [
    {
      "name": "Check Team Availability",
      "type": "Google Calendar",
      "parameters": {
        "operation": "Get Busy Times",
        "calendarId": "team-calendar",
        "timeMin": "{{ $json.requested_date }}",
        "timeMax": "{{ $json.requested_date_end }}"
      }
    },
    {
      "name": "Find Available Slots",
      "type": "Code",
      "parameters": {
        "jsCode": "// Calculate available appointment slots"
      }
    },
    {
      "name": "Create Calendar Event",
      "type": "Google Calendar",
      "parameters": {
        "operation": "Create Event",
        "start": "{{ $json.selected_time }}",
        "end": "{{ $json.end_time }}",
        "summary": "Roofing Consultation - {{ $json.first_name }} {{ $json.last_name }}",
        "description": "Project: {{ $json.project_type }}\nLead Score: {{ $json.lead_score }}\nNotes: {{ $json.project_notes }}",
        "attendees": ["{{ $json.assigned_estimator }}"]
      }
    },
    {
      "name": "Send Confirmation Email",
      "type": "Send Email",
      "parameters": {
        "template": "appointment-confirmation",
        "to": "{{ $json.email }}",
        "personalizations": {
          "appointment_date": "{{ $json.appointment_date }}",
          "appointment_time": "{{ $json.appointment_time }}",
          "estimator_name": "{{ $json.estimator_name }}"
        }
      }
    },
    {
      "name": "Schedule Reminder SMS",
      "type": "Schedule Trigger",
      "parameters": {
        "cron": "0 9 * * *", // 9 AM day before appointment
        "workflow": "sms-campaigns",
        "data": {
          "sms_type": "appointment_reminder",
          "lead_id": "{{ $json.lead_id }}"
        }
      }
    },
    {
      "name": "Update CRM",
      "type": "HTTP Request",
      "parameters": {
        "method": "PUT",
        "url": "{{ $json.api_base_url }}/api/leads/{{ $json.lead_id }}",
        "body": {
          "status": "appointment_scheduled",
          "appointment_date": "{{ $json.appointment_date }}",
          "assigned_estimator": "{{ $json.estimator_id }}"
        }
      }
    }
  ]
}
```

### 7. Content Health Monitoring Workflow

#### Workflow: `content-health-monitoring`
**Trigger**: Scheduled weekly
**Purpose**: Monitor and maintain lead magnets and content availability

```json
{
  "workflow_name": "content-health-monitoring",
  "trigger": {
    "type": "Schedule Trigger",
    "rule": "0 2 * * 1" // 2 AM every Monday
  },
  "nodes": [
    {
      "name": "Check Content Availability",
      "type": "HTTP Request",
      "parameters": {
        "method": "GET",
        "url": "{{ $json.content_url }}",
        "timeout": 10000
      }
    },
    {
      "name": "Validate Download Links",
      "type": "Code",
      "parameters": {
        "jsCode": "// Check all PDF and resource download links"
      }
    },
    {
      "name": "Test Form Submissions",
      "type": "HTTP Request",
      "parameters": {
        "method": "POST",
        "url": "{{ $json.api_base_url }}/api/leads/capture",
        "body": {
          "test": true,
          "source": "health_check"
        }
      }
    },
    {
      "name": "Generate Health Report",
      "type": "Code",
      "parameters": {
        "jsCode": "// Compile health check results"
      }
    },
    {
      "name": "Send Alert if Issues",
      "type": "Send Email",
      "parameters": {
        "condition": "{{ $json.issues_found }}",
        "to": "admin@alpinepeakroofing.com",
        "subject": "Lead Capture System Health Issues Detected",
        "template": "health-check-alert"
      }
    }
  ]
}
```

## 🔧 Workflow Implementation Plan

### Phase 1: Core Workflows (Week 1)
1. **Lead Scoring Engine**: Implement comprehensive scoring algorithm
2. **Lead Routing System**: Automatic assignment based on scores and availability
3. **CRM Synchronization**: Bi-directional sync with HubSpot/Salesforce
4. **Basic Email Sequences**: Welcome and educational email automation

### Phase 2: Enhanced Automation (Week 2)
1. **SMS Campaigns**: High-priority lead communication
2. **Appointment Scheduling**: Automated calendar management
3. **Content Health Monitoring**: Maintain system reliability
4. **Advanced Email Sequences**: Urgency and re-engagement campaigns

### Phase 3: Optimization (Week 3)
1. **A/B Testing Integration**: Test different email templates and sequences
2. **Dynamic Content**: Personalized content based on lead data
3. **Predictive Analytics**: Machine learning for better lead scoring
4. **Performance Monitoring**: Real-time workflow performance tracking

### Phase 4: Integration (Week 4)
1. **Cross-Agent Integration**: Connect with other agent systems
2. **Advanced Reporting**: Comprehensive analytics and insights
3. **Mobile Optimization**: Ensure all workflows work on mobile
4. **Scale Testing**: Performance testing for high lead volumes

## 📊 Workflow Monitoring & Analytics

### Key Performance Indicators
- **Workflow Execution Time**: Average time for each workflow to complete
- **Success Rate**: Percentage of workflows completing without errors
- **Email Delivery Rate**: Successful email delivery percentage
- **SMS Delivery Rate**: Successful SMS delivery percentage
- **Lead Processing Speed**: Time from capture to assignment
- **CRM Sync Accuracy**: Data consistency between systems

### Error Handling & Recovery
- **Retry Logic**: Automatic retry for failed API calls
- **Fallback Mechanisms**: Alternative paths when primary methods fail
- **Error Notifications**: Immediate alerts for critical workflow failures
- **Data Backup**: Regular backup of workflow data and configurations
- **Manual Intervention**: Clear escalation paths for complex issues

This comprehensive automation workflow system will provide Alpine Peak Roofing with sophisticated lead management capabilities while demonstrating advanced automation expertise to potential clients.