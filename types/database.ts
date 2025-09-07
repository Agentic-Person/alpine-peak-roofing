export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string
          phone?: string
          address?: string
          project_type?: string
          urgency_level?: number
          budget_range?: string
          source?: string
          lead_score?: number
          status?: string
          conversation_data?: any
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string
          address?: string
          project_type?: string
          urgency_level?: number
          budget_range?: string
          source?: string
          lead_score?: number
          status?: string
          conversation_data?: any
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          project_type?: string
          urgency_level?: number
          budget_range?: string
          source?: string
          lead_score?: number
          status?: string
          conversation_data?: any
        }
      }
      chat_conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          session_id: string
          lead_id?: string
          messages: any[]
          context: any
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          session_id: string
          lead_id?: string
          messages?: any[]
          context?: any
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          session_id?: string
          lead_id?: string
          messages?: any[]
          context?: any
          status?: string
        }
      }
      roof_estimates: {
        Row: {
          id: string
          created_at: string
          lead_id?: string
          address: string
          square_footage: number
          roof_type: string
          material_type: string
          estimated_cost: number
          details: any
        }
        Insert: {
          id?: string
          created_at?: string
          lead_id?: string
          address: string
          square_footage: number
          roof_type: string
          material_type: string
          estimated_cost: number
          details?: any
        }
        Update: {
          id?: string
          created_at?: string
          lead_id?: string
          address?: string
          square_footage?: number
          roof_type?: string
          material_type?: string
          estimated_cost?: number
          details?: any
        }
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string
          meta_title: string
          meta_description: string
          keywords: string[]
          published: boolean
          author: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string
          meta_title: string
          meta_description: string
          keywords?: string[]
          published?: boolean
          author?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string
          meta_title?: string
          meta_description?: string
          keywords?: string[]
          published?: boolean
          author?: string
        }
      }
    }
  }
}