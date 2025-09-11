import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import EnhancedBlogGrid from '@/components/blog/EnhancedBlogGrid';

export const metadata: Metadata = {
  title: 'Roofing Blog | Alpine Peak Roofing - Expert Tips & Advice',
  description: 'Expert roofing tips, seasonal maintenance guides, and industry insights for Denver homeowners. Learn from Alpine Peak Roofing\'s automated content system.',
  keywords: ['roofing blog', 'roof maintenance', 'Denver roofing', 'roofing tips', 'home maintenance', 'roof repair'],
  openGraph: {
    title: 'Roofing Blog | Alpine Peak Roofing',
    description: 'Expert roofing tips and advice for Denver homeowners',
    type: 'website',
    images: [
      {
        url: '/images/blog/blog_1_diy_vs_professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Peak Roofing Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roofing Blog | Alpine Peak Roofing',
    description: 'Expert roofing tips and advice for Denver homeowners',
    images: ['/images/blog/blog_1_diy_vs_professional.jpg'],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Featured Posts Section */}
      <FeaturedPosts />

      {/* All Posts Grid */}
      <EnhancedBlogGrid />

      {/* Admin Login Link - Subtle placement */}
      <div className="text-center py-4">
        <Link 
          href="/blog/admin" 
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}