import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, ListOrdered, FlaskConical, Pill, ArrowUpRight, Zap } from 'lucide-react';
import { mockQuickActions } from '../../data/mockPatientData';

const ICON_MAP = {
  CalendarPlus,
  ListOrdered,
  FlaskConical,
  Pill,
};

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Zap className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17221B] leading-tight">
              Quick Shortcuts
            </h2>
            <p className="text-xs text-[#64748B]">Common patient actions</p>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-3 flex-1">
        {mockQuickActions.map(({ label, icon, href }) => {
          const Icon = ICON_MAP[icon] || CalendarPlus;

          return (
            <Link
              key={href}
              to={href}
              className="group flex flex-col justify-between p-3.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:border-[#15803D]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 group-hover:bg-[#15803D] group-hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#15803D] transition-colors" />
              </div>
              <span className="text-xs font-bold text-[#17221B] mt-2 block leading-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
