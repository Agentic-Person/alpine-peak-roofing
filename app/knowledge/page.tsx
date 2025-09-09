import React from 'react'
import { Metadata } from 'next'
import { KnowledgeBaseClient } from './KnowledgeBaseClient'

export const metadata: Metadata = {
  title: 'Knowledge Base - Complete Roofing Resource Center | Alpine Peak Roofing',
  description: 'Comprehensive roofing knowledge base featuring expert guides, technical resources, FAQs, and glossary. Your complete resource for mountain roofing information and best practices.',
  keywords: 'roofing knowledge base, mountain roofing resources, technical guides, roofing education, alpine roofing expertise, colorado roofing information',
  openGraph: {
    title: 'Roofing Knowledge Base - Expert Resource Center | Alpine Peak Roofing',
    description: 'Complete roofing knowledge base with expert guides, technical resources, and comprehensive information for mountain roofing.',
    type: 'website',
  },
}

export default function KnowledgeBasePage() {
  return <KnowledgeBaseClient />
}