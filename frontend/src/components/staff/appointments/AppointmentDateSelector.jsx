import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const AppointmentDateSelector = ({
  selectedDate,
  onDateChange,
  activeQuickFilter,
  onQuickFilterChange,
}) => {
  const handlePrevDay = () => {
    const current = new Date(selectedDate || '2026-09-18');
    current.setDate(current.getDate() - 1);
    const newDateStr = current.toISOString().split('T')[0];
    onDateChange(newDateStr);
    onQuickFilterChange('custom');
  };

  const handleNextDay = () => {
    const current = new Date(selectedDate || '2026-09-18');
    current.setDate(current.getDate() + 1);
    const newDateStr = current.toISOString().split('T')[0];
    onDateChange(newDateStr);
    onQuickFilterChange('custom');
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 sm:p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* ── Left: Date Label & Day Stepper ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#17221B]">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Calendar className="h-4 w-4" />
          </div>
          <span>Appointment Date:</span>
        </div>

        <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-1">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1 rounded-md text-[#64748B] hover:bg-slate-200/70 hover:text-[#17221B] transition-colors cursor-pointer"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              onDateChange(e.target.value);
              onQuickFilterChange('custom');
            }}
            className="bg-transparent text-xs sm:text-sm font-semibold text-[#17221B] px-2 py-0.5 focus:outline-none cursor-pointer"
          />

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1 rounded-md text-[#64748B] hover:bg-slate-200/70 hover:text-[#17221B] transition-colors cursor-pointer"
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right: Quick Filter Pills ── */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-[#94A3B8] mr-1 hidden sm:inline">
          Quick Range:
        </span>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('today');
            onDateChange('2026-09-18');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'today'
              ? 'bg-[#15803D] text-white shadow-2xs'
              : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-slate-100 hover:text-[#17221B]'
          }`}
        >
          Today
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('tomorrow');
            onDateChange('2026-09-19');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'tomorrow'
              ? 'bg-[#15803D] text-white shadow-2xs'
              : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-slate-100 hover:text-[#17221B]'
          }`}
        >
          Tomorrow
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('this_week');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'this_week'
              ? 'bg-[#15803D] text-white shadow-2xs'
              : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-slate-100 hover:text-[#17221B]'
          }`}
        >
          This Week
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('all');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'all'
              ? 'bg-[#15803D] text-white shadow-2xs'
              : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-slate-100 hover:text-[#17221B]'
          }`}
        >
          All Dates
        </button>
      </div>
    </div>
  );
};

export default AppointmentDateSelector;
