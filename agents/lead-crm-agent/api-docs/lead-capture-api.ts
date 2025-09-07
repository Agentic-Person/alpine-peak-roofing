// Lead Capture API Implementation
// This API endpoint handles all lead captures and triggers the n8n scoring workflow

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Lead data validation schema
const LeadCaptureSchema = z.object({
  // Core lead information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  
  // Project information
  projectType: z.enum([
    'roof-repair',
    'roof-replacement', 
    'new-construction',
    'inspection',
    'emergency',
    'storm-damage',
    'other'
  ]),
  urgency: z.enum([
    'immediate',
    'within-month',
    'within-quarter', 
    'planning-ahead'
  ]),
  propertyType: z.enum(['residential', 'commercial', 'multi-family']).optional(),
  
  // Address information
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().default('US')
  }).optional(),
  
  // Source attribution
  source: z.object({
    channel: z.string(),
    campaign: z.string().optional(),
    referrer: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional()
  }),
  
  // Behavioral scoring data
  websiteEngagement: z.object({
    pagesVisited: z.number().optional(),
    timeOnSiteMinutes: z.number().optional(),
    returnVisits: z.number().optional(),
    bounceRate: z.number().optional(),
    exitIntent: z.boolean().optional()
  }).optional(),
  
  contentConsumption: z.object({
    downloads: z.number().optional(),
    videoViews: z.number().optional(),
    guideReads: z.number().optional(),
    calculatorUsage: z.number().optional()
  }).optional(),
  
  formInteractions: z.object({
    completionRate: z.number().optional(),
    fieldFocusTimeSeconds: z.number().optional(),
    progressiveSteps: z.number().optional()
  }).optional(),
  
  // Demographic scoring data  
  location: z.object({
    inServiceArea: z.boolean().optional(),
    distanceMiles: z.number().optional(),
    neighborhoodValuePercentile: z.number().optional()
  }).optional(),
  
  budgetIndicators: z.object({
    budgetRange: z.enum([
      'under-10k',
      '10k-25k', 
      '25k-50k',
      '50k-plus',
      'need-estimate'
    ]).optional(),
    estimatedValue: z.number().optional()
  }).optional(),
  
  // Interaction scoring data
  interaction: z.object({
    responseSpeed: z.number().optional(),
    communicationQuality: z.number().optional(),
    timeline: z.string().optional()
  }).optional(),
  
  preferredContact: z.enum(['phone', 'email', 'text']).optional(),
  bestTimeToCall: z.string().optional(),
  
  // Additional roofing-specific data
  roofingSpecific: z.object({
    currentRoofAge: z.number().optional(),
    roofMaterial: z.string().optional(),
    roofSize: z.string().optional(),
    issues: z.array(z.string()).optional(),
    stormDamage: z.boolean().optional(),
    insuranceClaim: z.boolean().optional(),
    previousWork: z.string().optional(),
    timeframe: z.string().optional()
  }).optional(),
  
  // Test mode for development
  test: z.boolean().optional()
});

type LeadCaptureData = z.infer<typeof LeadCaptureSchema>;

interface LeadScoringResponse {
  leadId: string;
  leadScore: number;
  priorityLevel: 'hot' | 'warm' | 'cold' | 'unqualified';
  success: boolean;
}

// Lead capture API endpoint
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validationResult = LeadCaptureSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;
    
    // Generate unique lead ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Add metadata
    const enrichedLeadData = {
      ...leadData,
      leadId,
      createdAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      
      // Default scoring data if not provided
      websiteEngagement: {
        pagesVisited: 1,
        timeOnSiteMinutes: 2,
        returnVisits: 0,
        bounceRate: 0,
        ...leadData.websiteEngagement
      },
      
      contentConsumption: {
        downloads: 0,
        videoViews: 0,
        guideReads: 0,
        calculatorUsage: 0,
        ...leadData.contentConsumption
      },
      
      formInteractions: {
        completionRate: 1,
        fieldFocusTimeSeconds: 30,
        progressiveSteps: 3,
        ...leadData.formInteractions
      },
      
      // Enhanced location data
      location: {
        inServiceArea: true, // Default, should be validated against service areas
        distanceMiles: 25,  // Default, should be calculated from ZIP
        neighborhoodValuePercentile: 50, // Default, should be enriched from data sources
        ...leadData.location
      }
    };

    // Skip processing for test submissions
    if (leadData.test) {
      return NextResponse.json({
        success: true,
        leadId,
        message: 'Test submission processed',
        leadScore: 75,
        priorityLevel: 'warm'
      });
    }

    // Store lead in database (implement based on your database choice)
    await storeLeadInDatabase(enrichedLeadData);
    
    // Trigger n8n lead scoring workflow
    const scoringResult = await triggerLeadScoringWorkflow(enrichedLeadData);
    
    // Track analytics event
    await trackLeadCaptureEvent(leadId, leadData.source);
    
    // Return success response
    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead captured successfully',
      leadScore: scoringResult.leadScore,
      priorityLevel: scoringResult.priorityLevel,
      estimatedResponseTime: getEstimatedResponseTime(scoringResult.priorityLevel)
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process lead capture',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Database storage function (implement based on your database)
async function storeLeadInDatabase(leadData: any): Promise<void> {
  // Example implementation for different databases:
  
  // For Supabase:
  // const { data, error } = await supabase
  //   .from('leads')
  //   .insert(leadData);
  
  // For MongoDB:
  // await db.collection('leads').insertOne(leadData);
  
  // For PostgreSQL:
  // await pool.query('INSERT INTO leads (data) VALUES ($1)', [JSON.stringify(leadData)]);
  
  // For now, just log the data
  console.log('Storing lead in database:', leadData.leadId);
}

// Trigger n8n lead scoring workflow
async function triggerLeadScoringWorkflow(leadData: any): Promise<LeadScoringResponse> {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_BASE_URL + '/new-lead-scoring';
  
  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...leadData,
        api_base_url: process.env.API_BASE_URL || 'http://localhost:3000',
        webhook_base_url: process.env.WEBHOOK_BASE_URL || 'http://localhost:3000',
        notification_base_url: process.env.NOTIFICATION_BASE_URL || 'http://localhost:3000',
        analytics_base_url: process.env.ANALYTICS_BASE_URL || 'http://localhost:3000'
      })
    });

    if (!response.ok) {
      throw new Error(`n8n workflow failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      leadId: leadData.leadId,
      leadScore: result.leadScore || 50, // Default score if not returned
      priorityLevel: result.priorityLevel || 'cold',
      success: true
    };
    
  } catch (error) {
    console.error('n8n workflow trigger failed:', error);
    
    // Fallback: return default scoring
    return {
      leadId: leadData.leadId,
      leadScore: 50,
      priorityLevel: 'cold',
      success: false
    };
  }
}

// Track analytics event
async function trackLeadCaptureEvent(leadId: string, source: any): Promise<void> {
  try {
    // Track in your analytics system (Google Analytics, Mixpanel, etc.)
    
    // Example for custom analytics API:
    await fetch(process.env.ANALYTICS_BASE_URL + '/api/analytics/lead-capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: 'lead_captured',
        leadId,
        source: source.channel,
        campaign: source.campaign,
        timestamp: new Date().toISOString()
      })
    });
    
  } catch (error) {
    console.error('Analytics tracking failed:', error);
    // Don't throw - analytics failure shouldn't break lead capture
  }
}

// Get estimated response time based on priority
function getEstimatedResponseTime(priorityLevel: string): string {
  switch (priorityLevel) {
    case 'hot':
      return '15 minutes';
    case 'warm':
      return '2 hours';
    case 'cold':
      return '24 hours';
    default:
      return '72 hours';
  }
}

// Lead update API endpoint for scoring updates
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { leadId, leadScore, priorityLevel, scoringBreakdown } = body;
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Update lead in database
    await updateLeadInDatabase(leadId, {
      leadScore,
      priorityLevel,
      scoringBreakdown,
      scoredAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Lead score updated successfully'
    });

  } catch (error) {
    console.error('Lead update error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update lead',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Update lead in database
async function updateLeadInDatabase(leadId: string, updates: any): Promise<void> {
  // Example implementation for different databases:
  
  // For Supabase:
  // const { data, error } = await supabase
  //   .from('leads')
  //   .update(updates)
  //   .eq('lead_id', leadId);
  
  // For MongoDB:
  // await db.collection('leads').updateOne(
  //   { leadId },
  //   { $set: updates }
  // );
  
  console.log('Updating lead in database:', leadId, updates);
}

// Lead assignment API endpoint
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { 
      leadId, 
      assignedTo, 
      assignedToName, 
      assignedToEmail,
      assignedToPhone,
      routingReason,
      maxResponseTime
    } = body;
    
    if (!leadId || !assignedTo) {
      return NextResponse.json(
        { error: 'Lead ID and assigned team member are required' },
        { status: 400 }
      );
    }

    // Update lead assignment in database
    await updateLeadInDatabase(leadId, {
      assignedTo,
      assignedToName,
      assignedToEmail,
      assignedToPhone,
      routingReason,
      maxResponseTime,
      assignedAt: new Date().toISOString(),
      status: 'assigned'
    });

    return NextResponse.json({
      success: true,
      leadId,
      assignedTo,
      message: 'Lead assigned successfully'
    });

  } catch (error) {
    console.error('Lead assignment error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to assign lead',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Environment configuration check
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Health check endpoint
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    configuration: {
      n8nWebhookUrl: !!process.env.N8N_WEBHOOK_BASE_URL,
      apiBaseUrl: !!process.env.API_BASE_URL,
      analyticsUrl: !!process.env.ANALYTICS_BASE_URL
    }
  });
}