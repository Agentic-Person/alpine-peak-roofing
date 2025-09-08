import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from '@/components/layout/ClientLayout';
import { 
  PrimaryBusinessSchema, 
  ServiceAreaSchema, 
  PremiumServiceSchema,
  SustainabilitySchema,
  EmergencyServiceSchema,
  ReviewSchema,
  FAQSchema,
  PortfolioSchema 
} from '@/components/seo/schemas/index';
import SchemaRelationshipMapper from '@/components/seo/schemas/SchemaRelationshipMapper';
import { PerformanceDashboard } from '@/lib/performance/webVitals';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alpine Peak Roofing - Colorado's Premier Luxury Mountain Roofing Specialists",
  description: "Colorado's premier luxury roofing contractor specializing in high-altitude, sustainable roofing solutions for mountain communities including Aspen, Vail, and Telluride. Premium materials, lifetime warranties, 24/7 emergency service. Pinnacle of Protection, Peak of Performance.",
  keywords: "luxury roofing Colorado mountains, Aspen roofing contractor, Vail roofing specialist, high altitude roofing, mountain roofing expert, sustainable roofing Colorado, premium roofing Denver, emergency roofing mountain communities, copper roofing specialist, slate roofing Colorado",
  authors: [{ name: "Alpine Peak Roofing" }],
  robots: "index, follow",
  openGraph: {
    title: "Alpine Peak Roofing - Colorado's Premier Luxury Mountain Roofing Specialists",
    description: "Premium mountain roofing contractor specializing in high-altitude installations for Colorado's most exclusive communities. Serving Aspen, Vail, Telluride, and Denver premium areas.",
    type: "website",
    locale: "en_US",
    siteName: "Alpine Peak Roofing",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Alpine Peak Roofing - JSON-LD Structured Data Schemas */}
        <PrimaryBusinessSchema />
        <ServiceAreaSchema />
        <PremiumServiceSchema />
        <SustainabilitySchema />
        <EmergencyServiceSchema />
        <ReviewSchema />
        <FAQSchema />
        <PortfolioSchema />
        <SchemaRelationshipMapper includeVisualDebug={process.env.NODE_ENV === 'development'} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <PerformanceDashboard />
      </body>
    </html>
  );
}
