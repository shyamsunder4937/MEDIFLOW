import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DoctorPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}) => {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]">
      <div>
        Showing <strong className="text-[#0F172A]">{startIndex + 1}</strong> to{' '}
        <strong className="text-[#0F172A]">{Math.min(endIndex, totalItems)}</strong> of{' '}
        <strong className="text-[#0F172A]">{totalItems}</strong> doctors
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`flex h-8 min-w-[32px] px-2 items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorPagination;
