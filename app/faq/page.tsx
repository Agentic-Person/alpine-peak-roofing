import React from 'react'
import { Metadata } from 'next'
import { FAQPageClient } from './FAQPageClient'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Alpine Peak Roofing | Mountain Roofing Expert Knowledge',
  description: 'Comprehensive FAQ covering mountain roofing, high-altitude challenges, premium materials, emergency services, and Colorado climate solutions. Expert answers from Alpine Peak Roofing specialists.',
  keywords: 'mountain roofing FAQ, high altitude roofing questions, Colorado roofing answers, alpine roofing experts, mountain weather roofing, premium roofing materials FAQ',
  openGraph: {
    title: 'Mountain Roofing FAQ - Expert Answers | Alpine Peak Roofing',
    description: 'Get expert answers to common mountain roofing questions from Colorado\'s premier high-altitude roofing specialists.',
    type: 'website',
  },
}

export default function FAQPage() {
  return <FAQPageClient />
}