'use client';

import React from 'react';
import Head from 'next/head';
import { BlogPost } from '@/lib/blog/types';

interface SEOOptimizerProps {
  post: BlogPost;
  canonicalUrl?: string;
}

export function SEOOptimizer({ post, canonicalUrl }: SEOOptimizerProps) {
  const siteUrl = 'https://alpinepeakroofing.com';
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  
  // Generate structured data for the blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description,
    image: post.featured_image_url ? [post.featured_image_url] : [],
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Alpine Peak Roofing',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alpine Peak Roofing',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullCanonicalUrl,
    },
    articleSection: 'Roofing',
    keywords: post.keywords?.join(', '),
    wordCount: post.content ? post.content.replace(/<[^>]*>/g, '').split(' ').length : undefined,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };

  // Generate FAQ structured data if content contains Q&A
  const faqMatches = post.content.match(/<h[3-4][^>]*>([^<]*\?[^<]*)<\/h[3-4]>/gi);
  let faqStructuredData = null;
  
  if (faqMatches && faqMatches.length > 0) {
    const faqs = faqMatches.map((match, index) => {
      const question = match.replace(/<[^>]*>/g, '').trim();
      // Try to find the answer in the following content
      const contentAfterH = post.content.split(match)[1];
      const answer = contentAfterH ? 
        contentAfterH.split(/<h[2-6]/)[0].replace(/<[^>]*>/g, '').trim().substring(0, 300) :
        'Please read the full article for detailed information.';
      
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      };
    });

    faqStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs,
    };
  }

  // Generate HowTo structured data if content contains step-by-step instructions
  const stepMatches = post.content.match(/<h[3-4][^>]*>([^<]*step[^<]*)<\/h[3-4]>/gi);
  let howToStructuredData = null;

  if (stepMatches && stepMatches.length >= 2) {
    const steps = stepMatches.map((match, index) => {
      const stepName = match.replace(/<[^>]*>/g, '').trim();
      const contentAfterH = post.content.split(match)[1];
      const stepText = contentAfterH ? 
        contentAfterH.split(/<h[2-6]/)[0].replace(/<[^>]*>/g, '').trim().substring(0, 500) :
        stepName;

      return {
        '@type': 'HowToStep',
        position: index + 1,
        name: stepName,
        text: stepText,
      };
    });

    howToStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.title,
      description: post.meta_description,
      image: post.featured_image_url ? [post.featured_image_url] : [],
      step: steps,
      totalTime: 'PT30M', // Estimated reading time
      supply: [
        {
          '@type': 'HowToSupply',
          name: 'Professional roofing tools',
        },
      ],
    };
  }

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: fullCanonicalUrl,
      },
    ],
  };

  return (
    <Head>
      {/* Basic SEO Meta Tags */}
      <title>{post.seo_title || `${post.title} | Alpine Peak Roofing`}</title>
      <meta name="description" content={post.meta_description} />
      <meta name="keywords" content={post.keywords?.join(', ')} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={post.seo_title || post.title} />
      <meta property="og:description" content={post.meta_description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Alpine Peak Roofing" />
      <meta property="og:locale" content="en_US" />
      
      {post.featured_image_url && (
        <>
          <meta property="og:image" content={post.featured_image_url} />
          <meta property="og:image:alt" content={post.alt_text || post.title} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {post.published_at && (
        <>
          <meta property="article:published_time" content={post.published_at} />
          <meta property="article:modified_time" content={post.updated_at} />
        </>
      )}
      
      <meta property="article:author" content="Alpine Peak Roofing" />
      <meta property="article:section" content="Roofing" />
      
      {post.keywords?.map((keyword, index) => (
        <meta key={index} property="article:tag" content={keyword} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.seo_title || post.title} />
      <meta name="twitter:description" content={post.meta_description} />
      {post.featured_image_url && (
        <meta name="twitter:image" content={post.featured_image_url} />
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Alpine Peak Roofing" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Geographic SEO */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Denver, Colorado" />
      <meta name="geo.position" content="39.739236;-104.990251" />
      <meta name="ICBM" content="39.739236, -104.990251" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* FAQ Structured Data */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      )}

      {/* HowTo Structured Data */}
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToStructuredData),
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </Head>
  );
}

// Hook for generating SEO meta tags for blog listing pages
export function useBlogListingSEO(searchParams?: { q?: string; season?: string; page?: string }) {
  const baseTitle = 'Roofing Blog | Alpine Peak Roofing';
  const baseDescription = 'Expert roofing tips, seasonal maintenance guides, and industry insights for Denver homeowners.';
  
  let title = baseTitle;
  let description = baseDescription;
  
  if (searchParams?.q) {
    title = `"${searchParams.q}" - Blog Search Results | Alpine Peak Roofing`;
    description = `Search results for "${searchParams.q}" in our roofing blog. Find expert tips and advice.`;
  }
  
  if (searchParams?.season) {
    const season = searchParams.season.charAt(0).toUpperCase() + searchParams.season.slice(1);
    title = `${season} Roofing Guides | Alpine Peak Roofing Blog`;
    description = `${season} roofing maintenance guides, tips, and seasonal advice for Denver homeowners.`;
  }
  
  if (searchParams?.page && parseInt(searchParams.page) > 1) {
    title = `${title} - Page ${searchParams.page}`;
  }

  return { title, description };
}

// SEO-optimized meta tags for blog category pages
export function generateCategoryMeta(season: string) {
  const seasonCapitalized = season.charAt(0).toUpperCase() + season.slice(1);
  
  const seasonalContent = {
    spring: {
      title: `Spring Roofing Maintenance Guides | Alpine Peak Roofing`,
      description: `Spring roofing inspection guides, storm preparation tips, and maintenance checklists for Denver homeowners. Prepare your roof for the season ahead.`,
      keywords: ['spring roofing', 'roof inspection', 'storm preparation', 'spring maintenance', 'Denver roofing'],
    },
    summer: {
      title: `Summer Roofing Tips & Heat Protection | Alpine Peak Roofing`,
      description: `Summer roofing guides focusing on heat protection, energy efficiency, and ventilation solutions for Colorado homes.`,
      keywords: ['summer roofing', 'heat protection', 'roof ventilation', 'energy efficiency', 'Colorado summer'],
    },
    fall: {
      title: `Fall Roofing Preparation & Gutter Cleaning | Alpine Peak Roofing`,
      description: `Fall roofing guides including gutter cleaning, winter preparation, and leaf damage prevention for Denver area homes.`,
      keywords: ['fall roofing', 'gutter cleaning', 'winter preparation', 'leaf damage', 'fall maintenance'],
    },
    winter: {
      title: `Winter Roofing Emergency & Ice Dam Prevention | Alpine Peak Roofing`,
      description: `Winter roofing guides covering ice dam prevention, emergency repairs, and cold weather protection for Colorado homes.`,
      keywords: ['winter roofing', 'ice dams', 'emergency repairs', 'winter protection', 'Colorado winter'],
    },
  };

  return seasonalContent[season as keyof typeof seasonalContent] || seasonalContent.spring;
}