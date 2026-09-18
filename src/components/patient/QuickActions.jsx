import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, ListOrdered, FlaskConical, Pill } from 'lucide-react';
import { mockQuickActions } from '../../data/mockPatientData';

const ICON_MAP = {
  CalendarPlus,
  ListOrdered,
  FlaskConical,
  Pill,
};

// Color themes per action index
const COLOR_THEMES = [
  { bg: 'bg-[#CCFBF1]',   text: 'text-[#0F766E]',  hover: 'hover:bg-teal-100'  },
  { bg: 'bg-amber-50',    text: 'text-amber-600',   hover: 'hover:bg-amber-100' },
  { bg: 'bg-purple-50',   text: 'text-purple-600',  hover: 'hover:bg-purple-100' },
  { bg: 'bg-green-50',    text: 'text-green-600',   hover: 'hover:bg-green-100'  },
];

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E2E8F0]">
        <h2 className="text-sm font-bold text-[#0F172A]">Quick Actions</h2>
      </div>

      <div className="p-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {mockQuickActions.map(({ label, icon, href }, idx) => {
          const Icon = ICON_MAP[icon];
          const theme = COLOR_THEMES[idx % COLOR_THEMES.length];

          return (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center gap-2.5 rounded-xl border border-[#E2E8F0] py-4 px-2 text-center transition-all ${theme.hover} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.bg} ${theme.text}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-[#0F172A] leading-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
