// Alpine Peak Roofing - SEO Schema Collection
// Phase 1: Structured Data Implementation
// Export all JSON-LD schemas for integration

export { default as PrimaryBusinessSchema } from './PrimaryBusinessSchema'
export { default as ServiceAreaSchema } from './ServiceAreaSchema'
export { default as PremiumServiceSchema } from './PremiumServiceSchema'
export { default as SustainabilitySchema } from './SustainabilitySchema'
export { default as EmergencyServiceSchema } from './EmergencyServiceSchema'
export { default as ReviewSchema } from './ReviewSchema'
export { default as FAQSchema } from './FAQSchema'
export { default as PortfolioSchema } from './PortfolioSchema'

// Type exports
export type {
  BusinessSchemaProps,
  ServiceAreaProps,
  PremiumServiceProps,
  SustainabilityProps,
  EmergencyServiceProps,
  ReviewProps,
  FAQProps,
  PortfolioProps,
  FAQItem,
  PortfolioProject
} from './types/SchemaTypes'