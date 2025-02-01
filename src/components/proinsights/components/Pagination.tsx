import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

export function Pagination({ currentPage, totalPages, paginate }: PaginationProps) {
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    if (pageNumber < 1 || pageNumber > totalPages) return;
    paginate(pageNumber);
  };

  // Create array of page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center gap-2 relative z-50">
      {/* Previous Page Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
          hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer
          hover:border-[#8000FF]/40 disabled:hover:border-white/10"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      {/* Page Numbers */}
      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="w-10 h-10 flex items-center justify-center text-white/40"
            >
              {pageNumber}
            </span>
          );
        }

        return (
          <button
            type="button"
            key={index}
            onClick={() => handlePageClick(Number(pageNumber))}
            className={`w-10 h-10 rounded-lg border font-urbanist font-bold transition-all cursor-pointer
              ${currentPage === pageNumber
                ? 'bg-[#8000FF] border-[#8000FF] text-white hover:bg-[#6700CC]' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-[#8000FF]/40'
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
          hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer
          hover:border-[#8000FF]/40 disabled:hover:border-white/10"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}