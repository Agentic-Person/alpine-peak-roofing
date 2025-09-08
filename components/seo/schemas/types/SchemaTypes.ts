// TypeScript definitions for Alpine Peak Roofing JSON-LD schemas
// Phase 1: Structured Data Implementation

export interface BusinessSchemaProps {
  organizationName?: string
  description?: string
  customizations?: Record<string, any>
}

export interface ServiceAreaProps {
  primaryMarkets?: string[]
  secondaryMarkets?: string[]
  emergencyServiceArea?: string
  serviceRadius?: string
}

export interface PremiumServiceProps {
  serviceType?: string
  priceRange?: string
  warrantyTerms?: string[]
  premiumFeatures?: string[]
}

export interface SustainabilityProps {
  certifications?: string[]
  ecoFriendlyFeatures?: string[]
  energyEfficiencyRating?: string
}

export interface EmergencyServiceProps {
  responseTime?: string
  availabilityHours?: string
  serviceTypes?: string[]
  coverageArea?: string
}

export interface ReviewProps {
  averageRating?: number
  reviewCount?: number
  bestRating?: number
  worstRating?: number
}

export interface FAQProps {
  questions?: FAQItem[]
  category?: string
}

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export interface PortfolioProps {
  projects?: PortfolioProject[]
  showcaseType?: string
}

export interface PortfolioProject {
  name: string
  description: string
  location: string
  projectType: string
  materials: string[]
  completionDate: string
  imageUrl?: string
}

// Geographic coordinates interface
export interface GeoCoordinates {
  "@type": "GeoCoordinates"
  latitude: number
  longitude: number
  name?: string
}

// Address interface
export interface PostalAddress {
  "@type": "PostalAddress"
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

// Opening hours specification
export interface OpeningHoursSpec {
  "@type": "OpeningHoursSpecification"
  dayOfWeek: string | string[]
  opens: string
  closes: string
  description?: string
}

// Service/Offer interface
export interface ServiceOffer {
  "@type": "Offer"
  itemOffered: {
    "@type": "Service"
    name: string
    description: string
  }
}

// Credential interface
export interface Credential {
  "@type": "EducationalOccupationalCredential"
  credentialCategory: string
  recognizedBy: {
    "@type": "Organization"
    name: string
    alternateName?: string
    url?: string
  }
  description: string
}

// Aggregate rating interface
export interface AggregateRating {
  "@type": "AggregateRating"
  ratingValue: string
  reviewCount: string
  bestRating: string
  worstRating: string
}

// Base schema interface
export interface BaseSchema {
  "@context": string
  "@type": string | string[]
  name: string
  description: string
}