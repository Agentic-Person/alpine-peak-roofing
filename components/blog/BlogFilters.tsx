'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEASONS } from '@/lib/blog/types';

interface BlogFiltersProps {
  totalPosts?: number;
  className?: string;
}

export function BlogFilters({ totalPosts = 0, className }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get('q') || '';
  const currentSeason = searchParams.get('season') || '';

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    // Reset to first page when filters change
    if (Object.keys(params).some(key => key !== 'page')) {
      newSearchParams.delete('page');
    }
    
    return newSearchParams.toString();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    const query = createQueryString({ q: searchTerm });
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const handleSeasonFilter = (season: string) => {
    const newSeason = currentSeason === season ? null : season;
    const query = createQueryString({ season: newSeason });
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = currentSearch || currentSeason;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          name="search"
          type="search"
          placeholder="Search blog posts..."
          defaultValue={currentSearch}
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {/* Season Filters */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Filter by Season</h3>
        <div className="flex flex-wrap gap-2">
          {SEASONS.map((season) => (
            <Button
              key={season}
              variant={currentSeason === season ? "default" : "outline"}
              size="sm"
              onClick={() => handleSeasonFilter(season)}
              className="capitalize"
            >
              {season}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Summary and Clear Filters */}
      <div className="flex items-center justify-between py-2 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {totalPosts > 0 ? (
            <>
              Showing {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
              {hasActiveFilters && ' with current filters'}
            </>
          ) : (
            'No posts found'
          )}
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {currentSearch && (
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Search: "{currentSearch}"
              <button
                onClick={() => {
                  const query = createQueryString({ q: null });
                  router.push(`${pathname}?${query}`, { scroll: false });
                }}
                className="ml-1 hover:text-blue-600"
              >
                ×
              </button>
            </div>
          )}
          
          {currentSeason && (
            <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize">
              {currentSeason}
              <button
                onClick={() => {
                  const query = createQueryString({ season: null });
                  router.push(`${pathname}?${query}`, { scroll: false });
                }}
                className="ml-1 hover:text-green-600"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}