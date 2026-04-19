import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Alpine Peak Roofing — Denver Metro Roofers | 24/7 Emergency Service',
  description:
    'Contact Alpine Peak Roofing for a free estimate. Serving Denver metro, Aspen, Vail, Telluride, and all of Colorado. Call (970) 456-1176 — Mon–Sat business hours and 24/7 emergency roof repair service.',
  alternates: {
    canonical: 'https://alpinepeakroofing.com/contact',
  },
  openGraph: {
    title: 'Contact Alpine Peak Roofing — Denver Metro | 24/7 Emergency Service',
    description:
      'Get a free, no-obligation roofing estimate. Call (970) 456-1176 or submit a request online. We respond within 24 hours and offer 24/7 emergency service across Colorado.',
    url: 'https://alpinepeakroofing.com/contact',
    siteName: 'Alpine Peak Roofing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Alpine Peak Roofing | 24/7 Emergency Service',
    description:
      'Free roofing estimates for Denver metro and Colorado mountains. Call (970) 456-1176 — 24/7 emergency service available.',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Alpine Peak Roofing',
  url: 'https://alpinepeakroofing.com/contact',
  description:
    'Contact page for Alpine Peak Roofing. Request a free estimate, reach our team by phone or email, or get 24/7 emergency roofing service across Denver metro and Colorado.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Alpine Peak Roofing',
  url: 'https://alpinepeakroofing.com',
  logo: 'https://alpinepeakroofing.com/logo.png',
  image: 'https://alpinepeakroofing.com/og-image.jpg',
  description:
    'Premium roofing contractor serving Denver metro, Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, and all of Colorado. Specializing in metal, slate, cedar shake, and high-performance shingle systems for mountain and residential properties.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Denver',
    addressRegion: 'CO',
    postalCode: '80202',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.7392,
    longitude: -104.9903,
  },
  areaServed: [
    { '@type': 'State', name: 'Colorado' },
    { '@type': 'City', name: 'Denver' },
    { '@type': 'City', name: 'Aspen' },
    { '@type': 'City', name: 'Vail' },
    { '@type': 'City', name: 'Telluride' },
    { '@type': 'City', name: 'Crested Butte' },
    { '@type': 'City', name: 'Steamboat Springs' },
    { '@type': 'City', name: 'Breckenridge' },
    { '@type': 'City', name: 'Durango' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+19704561176',
      contactType: 'customer service',
      availLanguage: 'English',
      hoursAvailable: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '07:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '08:00',
          closes: '14:00',
        },
      ],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+19704561176',
      contactType: 'emergency',
      availLanguage: 'English',
      description: '24/7 emergency roofing repair service',
    },
  ],
  email: 'info@alpinepeakroofing.com',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$$',
  slogan: 'Pinnacle of Protection, Peak of Performance',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactClient />
    </>
  );
}
