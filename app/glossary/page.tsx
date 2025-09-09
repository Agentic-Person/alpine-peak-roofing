import React from 'react'
import { Metadata } from 'next'
import { GlossaryPageClient } from './GlossaryPageClient'

export const metadata: Metadata = {
  title: 'Roofing Glossary - Technical Terms | Alpine Peak Roofing Knowledge Base',
  description: 'Comprehensive glossary of roofing terminology, mountain-specific techniques, and technical definitions. Expert knowledge base from Colorado\'s premier high-altitude roofing specialists.',
  keywords: 'roofing glossary, roofing terms, mountain roofing terminology, technical roofing definitions, alpine roofing knowledge, colorado roofing vocabulary',
  openGraph: {
    title: 'Roofing Glossary - Technical Knowledge Base | Alpine Peak Roofing',
    description: 'Complete guide to roofing terminology and mountain-specific techniques from Colorado\'s premier roofing experts.',
    type: 'website',
  },
}

export default function GlossaryPage() {
  return <GlossaryPageClient />
}