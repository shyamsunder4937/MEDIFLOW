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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
      {/* ── Left: Date Label & Picker ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <Calendar className="h-4 w-4" />
          </div>
          <span>Appointment Date:</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-50 border border-[#E2E8F0] rounded-xl p-1">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1 rounded-lg text-[#64748B] hover:bg-slate-200/70 hover:text-[#0F172A] transition-colors cursor-pointer"
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
            className="bg-transparent text-xs sm:text-sm font-semibold text-[#0F172A] px-2 py-1 focus:outline-none cursor-pointer"
          />

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1 rounded-lg text-[#64748B] hover:bg-slate-200/70 hover:text-[#0F172A] transition-colors cursor-pointer"
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Right: Quick Filter Pills ── */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-semibold text-[#94A3B8] mr-1 hidden sm:inline">
          Quick Select:
        </span>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('today');
            onDateChange('2026-09-18');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'today'
              ? 'bg-[#0F766E] text-white shadow-xs'
              : 'bg-slate-50 text-[#64748B] border border-slate-200 hover:bg-slate-100 hover:text-[#0F172A]'
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
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'tomorrow'
              ? 'bg-[#0F766E] text-white shadow-xs'
              : 'bg-slate-50 text-[#64748B] border border-slate-200 hover:bg-slate-100 hover:text-[#0F172A]'
          }`}
        >
          Tomorrow
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('this_week');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'this_week'
              ? 'bg-[#0F766E] text-white shadow-xs'
              : 'bg-slate-50 text-[#64748B] border border-slate-200 hover:bg-slate-100 hover:text-[#0F172A]'
          }`}
        >
          This Week
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickFilterChange('all');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeQuickFilter === 'all'
              ? 'bg-[#0F766E] text-white shadow-xs'
              : 'bg-slate-50 text-[#64748B] border border-slate-200 hover:bg-slate-100 hover:text-[#0F172A]'
          }`}
        >
          All Dates
        </button>
      </div>
    </div>
  );
};

export default AppointmentDateSelector;
