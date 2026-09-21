import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, ListOrdered, FlaskConical, Pill, ArrowRight } from 'lucide-react';
import { mockQuickActions } from '../../data/mockPatientData';

const ICON_MAP = {
  CalendarPlus,
  ListOrdered,
  FlaskConical,
  Pill,
};

export const QuickActions = () => {
  return (
    <section aria-label="Quick Shortcuts" className="space-y-2.5">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-[#17221B] leading-tight">
          Quick Shortcuts
        </h2>
        <p className="text-xs text-[#64748B]">Common patient actions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {mockQuickActions.map(({ label, icon, href }) => {
          const Icon = ICON_MAP[icon] || CalendarPlus;

          return (
            <Link
              key={href}
              to={href}
              className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50/80 hover:border-[#15803D]/40 transition-all duration-150 shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0 group-hover:bg-[#15803D] group-hover:text-white transition-colors">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#17221B] truncate group-hover:text-[#15803D] transition-colors">
                  {label}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#15803D] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
