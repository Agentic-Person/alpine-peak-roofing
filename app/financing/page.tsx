import type { Metadata } from 'next';
import FinancingClient from './FinancingClient';

export const metadata: Metadata = {
  title: 'Roofing Financing — Payment Plans, Zero-Down Options, Insurance Claims | Alpine Peak Roofing',
  description:
    'Flexible roofing financing for Colorado homeowners — 0% APR for 12 months (same-as-cash, no down payment), terms up to 120 months, and full insurance claim coordination. Apply online and get a decision in minutes.',
  alternates: {
    canonical: 'https://alpinepeakroofing.com/financing',
  },
  openGraph: {
    title: 'Roofing Financing — Zero-Down, 0% APR & Insurance Claims | Alpine Peak Roofing',
    description:
      'Make premium roofing affordable with flexible payment plans. Same-as-cash 0% APR for 12 months, extended terms up to 10 years, and direct insurance claim coordination — serving Denver metro and Colorado mountains.',
    url: 'https://alpinepeakroofing.com/financing',
    siteName: 'Alpine Peak Roofing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Financing — Zero-Down & Insurance Claims | Alpine Peak Roofing',
    description:
      '0% APR same-as-cash financing, payment plans up to 120 months, and insurance claim coordination for Colorado roofing projects.',
  },
};

const financingSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Roofing Financing Options',
  url: 'https://alpinepeakroofing.com/financing',
  description:
    'Flexible roofing financing options from Alpine Peak Roofing, including zero-down same-as-cash plans, extended term financing, and insurance claim coordination for Colorado homeowners.',
  about: [
    {
      '@type': 'FinancialProduct',
      name: 'Same-As-Cash Roofing Financing',
      description:
        'Zero-down, 0% APR financing for 12 months for qualified buyers. No interest if paid in full within the promotional period. No prepayment penalties.',
      provider: {
        '@type': 'Organization',
        name: 'Alpine Peak Roofing',
        url: 'https://alpinepeakroofing.com',
        telephone: '+19704561176',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Denver',
          addressRegion: 'CO',
          addressCountry: 'US',
        },
      },
      feesAndCommissionsSpecification: '0% APR for 12 months, no down payment required, no prepayment penalty',
    },
    {
      '@type': 'FinancialProduct',
      name: 'Extended Term Roofing Loan',
      description:
        'Low monthly payment financing for roofing projects with terms of 60 or 120 months. Competitive fixed rates starting at 6.99% APR for qualified applicants. Up to $100,000 financing available.',
      provider: {
        '@type': 'Organization',
        name: 'Alpine Peak Roofing',
        url: 'https://alpinepeakroofing.com',
        telephone: '+19704561176',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Denver',
          addressRegion: 'CO',
          addressCountry: 'US',
        },
      },
      feesAndCommissionsSpecification: 'Fixed rates from 6.99% APR (60 mo) to 8.99% APR (120 mo), no prepayment penalty',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financingSchema) }}
      />
      <FinancingClient />
    </>
  );
}
