import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alpine Peak Roofing - Professional Roofing Contractors Denver CO",
  description: "Professional roofing services in Denver metro area. Residential & commercial roofing, emergency repairs, instant estimates. Licensed, insured, 24/7 service. Pinnacle of Protection, Peak of Performance.",
  keywords: "roofing contractors Denver, roof repair Colorado, residential roofing, commercial roofing, emergency roof repair, roofing estimates Denver",
  authors: [{ name: "Alpine Peak Roofing" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Alpine Peak Roofing - Professional Roofing Contractors Denver CO",
    description: "Professional roofing services in Denver metro area. Licensed, insured, 24/7 emergency service.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
