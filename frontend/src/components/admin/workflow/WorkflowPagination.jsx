import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const WorkflowPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}) => {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]">
      <div>
        Showing{' '}
        <span className="font-semibold text-[#0F172A]">{startIndex + 1}</span> to{' '}
        <span className="font-semibold text-[#0F172A]">
          {Math.min(endIndex, totalItems)}
        </span>{' '}
        of <span className="font-semibold text-[#0F172A]">{totalItems}</span>{' '}
        active workflows
      </div>

      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#0F172A] transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>

        <div className="flex items-center gap-1 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-[#475569] hover:bg-slate-100'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#0F172A] transition-colors cursor-pointer"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default WorkflowPagination;
