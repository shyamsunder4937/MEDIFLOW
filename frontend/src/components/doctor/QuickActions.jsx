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
      color: 'text-[#0F766E]',
      bg: 'bg-[#CCFBF1]',
      border: 'hover:border-[#0F766E]/40',
      badge: '8 Waiting',
    },
    {
      title: 'View Patients',
      desc: 'Patient directory & medical records',
      icon: Users,
      href: '/doctor/patients',
      color: 'text-[#2563EB]',
      bg: 'bg-blue-100/70',
      border: 'hover:border-blue-300',
      badge: '24 Total',
    },
    {
      title: 'Lab Results',
      desc: 'Pathology & radiology reports',
      icon: FlaskConical,
      href: '/doctor/lab-results',
      color: 'text-[#D97706]',
      bg: 'bg-amber-100/70',
      border: 'hover:border-amber-300',
      badge: '4 Pending',
    },
    {
      title: 'Consultations',
      desc: 'Active consultation with #23',
      icon: Stethoscope,
      href: '/doctor/consultation/23',
      color: 'text-[#16A34A]',
      bg: 'bg-emerald-100/70',
      border: 'hover:border-emerald-300',
      badge: 'Active Now',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
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
              className={`group flex items-start justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-white text-left transition-all duration-150 ${action.border} hover:bg-slate-50/70 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${action.bg} ${action.color} flex-shrink-0 transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#0F172A] truncate group-hover:text-[#0F766E] transition-colors">
                      {action.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                    {action.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0 pl-1">
                <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#0F766E] group-hover:translate-x-0.5 transition-all" />
                <span className="text-[10px] font-semibold text-[#64748B] bg-slate-100 px-1.5 py-0.5 rounded-md">
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
