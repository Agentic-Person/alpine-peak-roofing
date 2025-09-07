#!/usr/bin/env node

/**
 * Alpine Peak Roofing n8n MCP Server
 * Model Context Protocol server for n8n workflow automation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

class AlpinePeakN8nServer {
  constructor() {
    this.server = new Server(
      {
        name: 'alpine-peak-n8n-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'trigger_chatbot_workflow',
            description: 'Triggers the AI chatbot processing workflow in n8n',
            inputSchema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'User message to process',
                },
                session_id: {
                  type: 'string',
                  description: 'Chat session identifier',
                },
                page_context: {
                  type: 'string',
                  description: 'Current page context',
                },
                user_data: {
                  type: 'object',
                  description: 'Additional user context data',
                },
              },
              required: ['message'],
            },
          },
          {
            name: 'trigger_lead_capture',
            description: 'Triggers the lead capture and CRM workflow in n8n',
            inputSchema: {
              type: 'object',
              properties: {
                lead_data: {
                  type: 'object',
                  description: 'Lead information collected from forms',
                  properties: {
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                    project_type: { type: 'string' },
                    urgency_level: { type: 'number' },
                    budget_range: { type: 'string' },
                  },
                },
                source: {
                  type: 'string',
                  description: 'Source of the lead (website, chat, etc.)',
                },
                utm_data: {
                  type: 'object',
                  description: 'UTM tracking parameters',
                },
              },
              required: ['lead_data'],
            },
          },
          {
            name: 'trigger_blog_generation',
            description: 'Triggers the automated blog generation workflow in n8n',
            inputSchema: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  description: 'Blog post topic or keyword',
                },
                target_audience: {
                  type: 'string',
                  description: 'Target audience for the blog post',
                },
                content_type: {
                  type: 'string',
                  enum: ['educational', 'promotional', 'seasonal', 'news'],
                  description: 'Type of content to generate',
                },
                seo_keywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'SEO keywords to target',
                },
                publish_immediately: {
                  type: 'boolean',
                  description: 'Whether to publish immediately or save as draft',
                  default: false,
                },
              },
              required: ['topic'],
            },
          },
          {
            name: 'trigger_roof_estimation',
            description: 'Triggers the roof estimation workflow in n8n',
            inputSchema: {
              type: 'object',
              properties: {
                property_data: {
                  type: 'object',
                  description: 'Property information for estimation',
                  properties: {
                    address: { type: 'string' },
                    roof_type: { type: 'string' },
                    roof_size: { type: 'number' },
                    roof_age: { type: 'number' },
                    damage_description: { type: 'string' },
                    material_preference: { type: 'string' },
                  },
                },
                estimation_type: {
                  type: 'string',
                  enum: ['basic', 'detailed', 'full_inspection'],
                  description: 'Type of estimation to perform',
                },
                include_images: {
                  type: 'boolean',
                  description: 'Whether satellite/drone images are available',
                  default: false,
                },
                priority: {
                  type: 'string',
                  enum: ['low', 'medium', 'high', 'emergency'],
                  description: 'Priority level for the estimation',
                  default: 'medium',
                },
              },
              required: ['property_data', 'estimation_type'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'trigger_chatbot_workflow':
            return await this.triggerChatbotWorkflow(args);
          case 'trigger_lead_capture':
            return await this.triggerLeadCapture(args);
          case 'trigger_blog_generation':
            return await this.triggerBlogGeneration(args);
          case 'trigger_roof_estimation':
            return await this.triggerRoofEstimation(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        console.error(`Error executing tool ${name}:`, error);
        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${error.message}`
        );
      }
    });
  }

  async triggerChatbotWorkflow(args) {
    const webhookUrl = process.env.N8N_WEBHOOK_CHATBOT;
    const payload = {
      message: args.message,
      session_id: args.session_id || this.generateSessionId(),
      page_context: args.page_context || 'website',
      user_data: args.user_data || {},
      timestamp: new Date().toISOString(),
    };

    const response = await this.makeN8nRequest(webhookUrl, payload);
    
    return {
      content: [
        {
          type: 'text',
          text: `Chatbot workflow triggered successfully. Response: ${JSON.stringify(response.data, null, 2)}`,
        },
      ],
    };
  }

  async triggerLeadCapture(args) {
    const webhookUrl = process.env.N8N_WEBHOOK_LEAD_CAPTURE;
    const payload = {
      lead_data: args.lead_data,
      source: args.source || 'mcp_server',
      utm_data: args.utm_data || {},
      created_at: new Date().toISOString(),
      lead_score: this.calculateLeadScore(args.lead_data),
    };

    const response = await this.makeN8nRequest(webhookUrl, payload);
    
    return {
      content: [
        {
          type: 'text',
          text: `Lead capture workflow triggered successfully. Lead ID: ${response.data.lead_id || 'Generated'}`,
        },
      ],
    };
  }

  async triggerBlogGeneration(args) {
    const webhookUrl = process.env.N8N_WEBHOOK_BLOG_GENERATION;
    const payload = {
      topic: args.topic,
      target_audience: args.target_audience || 'Denver homeowners',
      content_type: args.content_type || 'educational',
      seo_keywords: args.seo_keywords || [args.topic],
      publish_immediately: args.publish_immediately || false,
      requested_at: new Date().toISOString(),
    };

    const response = await this.makeN8nRequest(webhookUrl, payload);
    
    return {
      content: [
        {
          type: 'text',
          text: `Blog generation workflow triggered successfully. Status: ${response.data.status || 'Processing'}`,
        },
      ],
    };
  }

  async triggerRoofEstimation(args) {
    const webhookUrl = process.env.N8N_WEBHOOK_ROOF_ESTIMATION;
    const payload = {
      property_data: args.property_data,
      estimation_type: args.estimation_type,
      include_images: args.include_images || false,
      priority: args.priority || 'medium',
      requested_at: new Date().toISOString(),
    };

    const response = await this.makeN8nRequest(webhookUrl, payload);
    
    return {
      content: [
        {
          type: 'text',
          text: `Roof estimation workflow triggered successfully. Estimation ID: ${response.data.estimation_id || 'Generated'}`,
        },
      ],
    };
  }

  async makeN8nRequest(url, payload) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (process.env.N8N_MCP_BEARER_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.N8N_MCP_BEARER_TOKEN}`;
    }

    try {
      const response = await axios.post(url, payload, { headers });
      return response;
    } catch (error) {
      console.error('n8n webhook request failed:', error.response?.data || error.message);
      throw new Error(`n8n webhook failed: ${error.response?.status || error.message}`);
    }
  }

  calculateLeadScore(leadData) {
    let score = 0;
    
    if (leadData.urgency_level >= 4) score += 25;
    if (leadData.budget_range === 'above_15k') score += 30;
    if (leadData.project_type === 'full_replacement') score += 20;
    if (leadData.phone) score += 15;
    if (leadData.email) score += 10;
    
    return Math.min(score, 100);
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Alpine Peak Roofing n8n MCP server running on stdio');
  }
}

const server = new AlpinePeakN8nServer();
server.run().catch(console.error);