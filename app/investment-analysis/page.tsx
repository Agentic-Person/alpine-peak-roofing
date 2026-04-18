import type { Metadata } from 'next';
import InvestmentAnalysisClient from './InvestmentAnalysisClient';

export const metadata: Metadata = {
  title: 'Roofing Investment Analysis — ROI, Home Value, Insurance Considerations | Alpine Peak Roofing',
  description:
    'Analyze the ROI of premium roofing in Denver and Colorado. Premium metal roofs deliver 35–45% energy savings, 50–70 year lifespans, 8–12% property value gains, and lower insurance premiums — compare materials and calculate your payback period.',
  alternates: {
    canonical: 'https://alpinepeakroofing.com/investment-analysis',
  },
  openGraph: {
    title: 'Roofing Investment Analysis — ROI, Home Value & Insurance | Alpine Peak Roofing',
    description:
      'Compare the true cost of premium vs. standard roofing over 30 years. Includes energy savings, maintenance reduction, property value impact, and Colorado-specific insurance premium considerations.',
    url: 'https://alpinepeakroofing.com/investment-analysis',
    siteName: 'Alpine Peak Roofing',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Investment Analysis — ROI & Home Value | Alpine Peak Roofing',
    description:
      'Premium roofing ROI calculator for Colorado homeowners. Understand energy savings, longevity payoff, and property value impact.',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Premium Roofing Investment Analysis: ROI, Home Value, and Insurance Considerations',
  description:
    'A comprehensive analysis of the financial benefits of investing in premium mountain roofing systems, including ROI calculations, material longevity payoff, energy savings, and insurance premium impact for Denver and Colorado homeowners.',
  author: {
    '@type': 'Organization',
    name: 'Alpine Peak Roofing',
    url: 'https://alpinepeakroofing.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Alpine Peak Roofing',
    url: 'https://alpinepeakroofing.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://alpinepeakroofing.com/logo.png',
    },
  },
  datePublished: '2025-01-01',
  dateModified: '2025-01-01',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://alpinepeakroofing.com/investment-analysis',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <InvestmentAnalysisClient />
    </>
  );
}
