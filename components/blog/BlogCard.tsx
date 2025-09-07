'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BlogPost } from '@/lib/blog/types';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}

const seasonColors = {
  spring: 'bg-green-100 text-green-800',
  summer: 'bg-yellow-100 text-yellow-800',
  fall: 'bg-orange-100 text-orange-800',
  winter: 'bg-blue-100 text-blue-800',
};

export function BlogCard({ post, priority = false, className }: BlogCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  return (
    <Card className={cn('group hover:shadow-lg transition-shadow duration-300', className)}>
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featured_image_url && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={post.featured_image_url}
              alt={post.alt_text || post.title}
              fill
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {post.season && (
              <div className="absolute top-3 right-3">
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  seasonColors[post.season]
                )}>
                  {post.season.charAt(0).toUpperCase() + post.season.slice(1)}
                </span>
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.seo_title || post.title}
          </CardTitle>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={post.published_at || post.created_at}>
              {formattedDate}
            </time>
            {post.estimated_cost && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Cost: ${post.estimated_cost}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-3">
            {post.meta_description || post.content?.substring(0, 160) + '...'}
          </CardDescription>
          
          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                >
                  {keyword}
                </span>
              ))}
              {post.keywords.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md">
                  +{post.keywords.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
              Read more →
            </span>
            
            {post.status === 'draft' && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Draft
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

// Skeleton loader for blog cards
export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('animate-pulse', className)}>
      <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
      
      <CardHeader>
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        <div className="mt-4 flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-14" />
        </div>
      </CardContent>
    </Card>
  );
}