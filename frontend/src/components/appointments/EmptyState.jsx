import React from 'react';
import { CalendarX, CalendarPlus, SearchX } from 'lucide-react';

export const EmptyState = ({ tab = 'upcoming', onBookClick, isSearch = false, onClearSearch }) => {
  if (isSearch) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs">
        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#64748B] mb-3.5 border border-slate-200">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-[#17221B]">No appointments match your search</h3>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1 mb-5 max-w-xs leading-relaxed">
          Try searching for a different doctor name, department, or clear the search filter.
        </p>
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#17221B] hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  const stateDetails = {
    upcoming: {
      title: 'No upcoming appointments',
      description: 'You currently have no scheduled appointments. Book a new consultation with our specialist doctors.',
      showButton: true
    },
    past: {
      title: 'No past appointments',
      description: 'Your previous consultation records and hospital visit history will appear here.',
      showButton: false
    },
    cancelled: {
      title: 'No cancelled appointments',
      description: 'You have no cancelled appointments on record.',
      showButton: false
    }
  };

  const details = stateDetails[tab] || stateDetails.upcoming;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6 shadow-xs">
      <div className="h-14 w-14 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center text-[#15803D] mb-3.5">
        <CalendarX className="h-7 w-7" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#17221B]">{details.title}</h3>
      <p className="text-xs sm:text-sm text-[#64748B] mt-1 mb-6 max-w-sm leading-relaxed">
        {details.description}
      </p>

      {onBookClick && details.showButton && (
        <button
          onClick={onBookClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#15803D] text-white text-xs sm:text-sm font-semibold hover:bg-[#166534] transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Book Appointment</span>
        </button>
      )}
    </div>
  );
};
