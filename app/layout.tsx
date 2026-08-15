import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lato, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from 'sonner';
import ConditionalChatWidget from '@/components/chatbot/ConditionalChatWidget';
import { EstimateModalProvider } from '@/components/estimator/EstimateModalContext';
import RoofEstimateModal from '@/components/estimator/RoofEstimateModal';
import { 
  PrimaryBusinessSchema,
  ServiceAreaSchema,
  PremiumServiceSchema,
  SustainabilitySchema,
  EmergencyServiceSchema,
  ReviewSchema,
  FAQSchema,
  PortfolioSchema
} from '@/components/seo/schemas';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpine Peak Roofing - Professional Roofing Contractors Denver CO",
  description: "Professional roofing services in Denver metro area. Residential & commercial roofing, emergency repairs, instant estimates. Licensed, insured, 24/7 service. Pinnacle of Protection, Peak of Performance.",
  keywords: "roofing contractors Denver, roof repair Colorado, residential roofing, commercial roofing, emergency roof repair, roofing estimates Denver",
  authors: [{ name: "Alpine Peak Roofing" }],
  robots: "index, follow",
  openGraph: {
    title: "Alpine Peak Roofing - Professional Roofing Contractors Denver CO",
    description: "Professional roofing services in Denver metro area. Licensed, insured, 24/7 emergency service.",
    type: "website",
    locale: "en_US",
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
        <PrimaryBusinessSchema />
        <ServiceAreaSchema />
        <PremiumServiceSchema />
        <SustainabilitySchema />
        <EmergencyServiceSchema />
        <ReviewSchema />
        <FAQSchema />
        <PortfolioSchema />
      </head>
      {/* Google tag (gtag.js) */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4KQXFSY1DH" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4KQXFSY1DH');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${sourceSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <EstimateModalProvider>
            <Navigation />
            <main>
              {children}
            </main>
            <Footer />
            <ConditionalChatWidget />
            <RoofEstimateModal />
            <Toaster richColors position="top-right" />
          </EstimateModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
