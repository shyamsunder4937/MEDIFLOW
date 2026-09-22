import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListOrdered,
  Users,
  FlaskConical,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'View Queue',
      desc: 'Live token ordering & check-in',
      icon: ListOrdered,
      href: '/doctor/queue',
      color: 'text-[#15803D]',
      bg: 'bg-[#F0FDF4]',
      border: 'hover:border-[#15803D]/40',
      badge: '8 Waiting',
    },
    {
      title: 'View Patients',
      desc: 'Patient directory & medical records',
      icon: Users,
      href: '/doctor/patients',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'hover:border-blue-300',
      badge: '24 Total',
    },
    {
      title: 'Lab Results',
      desc: 'Pathology & radiology reports',
      icon: FlaskConical,
      href: '/doctor/lab-results',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'hover:border-amber-300',
      badge: '4 Pending',
    },
    {
      title: 'Consultations',
      desc: 'Active consultation with #23',
      icon: Stethoscope,
      href: '/doctor/consultation/23',
      color: 'text-[#15803D]',
      bg: 'bg-[#F0FDF4]',
      border: 'hover:border-[#15803D]/40',
      badge: 'Active Now',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
            Quick Actions
          </h2>
          <p className="text-xs text-[#64748B]">
            Frequently used clinical workflows
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.href)}
              className={`group flex items-start justify-between p-3.5 rounded-lg border border-[#E2E8F0] bg-white text-left transition-all duration-150 ${action.border} hover:bg-slate-50/70 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] cursor-pointer`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg ${action.bg} ${action.color} flex-shrink-0 transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#17221B] truncate group-hover:text-[#15803D] transition-colors">
                      {action.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                    {action.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0 pl-1">
                <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#15803D] group-hover:translate-x-0.5 transition-all" />
                <span className="text-[10px] font-medium text-[#64748B] bg-slate-100 px-1.5 py-0.5 rounded">
                  {action.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
