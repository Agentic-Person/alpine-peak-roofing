'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  className?: string;
}

export function BlogPagination({ 
  currentPage, 
  totalPages, 
  hasMore, 
  className = '' 
}: BlogPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    return params.toString();
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const queryString = createQueryString(page);
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url, { scroll: false });
    
    // Scroll to top of blog content
    const blogContainer = document.getElementById('blog-content');
    if (blogContainer) {
      blogContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't render if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate range
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add range
    rangeWithDots.push(...range);

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className={`flex items-center justify-center space-x-2 ${className}`}
      aria-label="Blog pagination"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3"
      >
        ← Previous
      </Button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center space-x-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 py-1 text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => goToPage(page as number)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: Current Page Display */}
      <div className="sm:hidden flex items-center px-3 py-1 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore || currentPage >= totalPages}
        className="px-3"
      >
        Next →
      </Button>
    </nav>
  );
}

// Simple load more button alternative
export function LoadMoreButton({
  hasMore,
  loading,
  onLoadMore,
  className = ''
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  className?: string;
}) {
  if (!hasMore) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={loading}
        className="px-8"
      >
        {loading ? 'Loading...' : 'Load More Posts'}
      </Button>
    </div>
  );
}