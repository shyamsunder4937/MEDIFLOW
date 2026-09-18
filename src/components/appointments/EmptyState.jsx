import React from 'react';
import { CalendarX, CalendarPlus, SearchX } from 'lucide-react';

export const EmptyState = ({ tab = 'upcoming', onBookClick, isSearch = false, onClearSearch }) => {
  if (isSearch) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6">
        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#64748B] mb-4">
          <SearchX className="h-7 w-7" />
        </div>
        <h3 className="text-base font-bold text-[#0F172A]">No appointments match your search</h3>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 mb-5 max-w-xs">
          Try searching for a different doctor name, department, or clear the search query.
        </p>
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-14 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6 shadow-xs">
      <div className="h-16 w-16 rounded-2xl bg-[#CCFBF1]/70 flex items-center justify-center text-[#0F766E] mb-4">
        <CalendarX className="h-8 w-8" />
      </div>

      <h3 className="text-lg font-bold text-[#0F172A]">{details.title}</h3>
      <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 mb-6 max-w-sm leading-relaxed">
        {details.description}
      </p>

      {onBookClick && (
        <button
          onClick={onBookClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#115E59] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Book Appointment</span>
        </button>
      )}
    </div>
  );
};
