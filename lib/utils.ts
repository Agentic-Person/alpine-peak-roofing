import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length !== 10) return phone
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface LeadData {
  urgency_level?: number
  budget_range?: string
  project_type?: string
  phone?: string
  email?: string
  address?: string
}

export function calculateLeadScore(leadData: LeadData): number {
  let score = 0
  
  // Urgency level scoring
  if ((leadData.urgency_level ?? 0) >= 4) score += 30
  else if ((leadData.urgency_level ?? 0) >= 3) score += 20
  else if ((leadData.urgency_level ?? 0) >= 2) score += 10
  
  // Budget range scoring
  if (leadData.budget_range === 'above_25k') score += 30
  else if (leadData.budget_range === '15k_to_25k') score += 25
  else if (leadData.budget_range === '10k_to_15k') score += 20
  else if (leadData.budget_range === '5k_to_10k') score += 15
  else if (leadData.budget_range === 'under_5k') score += 5
  
  // Project type scoring
  if (leadData.project_type === 'full_replacement') score += 25
  else if (leadData.project_type === 'commercial') score += 30
  else if (leadData.project_type === 'partial_replacement') score += 15
  else if (leadData.project_type === 'repair') score += 10
  
  // Contact information completeness
  if (leadData.phone) score += 10
  if (leadData.email) score += 10
  if (leadData.address) score += 5
  
  return Math.min(score, 100)
}