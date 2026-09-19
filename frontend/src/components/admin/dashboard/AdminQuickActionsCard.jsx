import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Building2,
  Activity,
  Bot,
  Bell,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const actions = [
  {
    label: 'Manage Users',
    description: 'Configure patient, staff, and admin accounts',
    icon: Users,
    href: '/admin/users',
    color: 'text-[#0F766E]',
    bgColor: 'bg-[#CCFBF1]',
    borderColor: 'border-[#0F766E]/20',
  },
  {
    label: 'Manage Doctors',
    description: 'Doctor schedules, duties, and consultation rooms',
    icon: UserCheck,
    href: '/admin/doctors',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    label: 'Manage Departments',
    description: 'Specialties, facilities, and capacity limits',
    icon: Building2,
    href: '/admin/departments',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    label: 'Monitor Workflow',
    description: 'End-to-end patient journey & stage queues',
    icon: Activity,
    href: '/admin/workflow',
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  {
    label: 'View AI Activity',
    description: 'Autonomous triage & queue optimization logs',
    icon: Bot,
    href: '/admin/ai-agent',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    label: 'View Notifications',
    description: 'System alerts, audit events, and broadcasts',
    icon: Bell,
    href: '/admin/notifications',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
];

export const AdminQuickActionsCard = () => {
  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
              Quick Actions
            </h3>
            <p className="text-xs text-[#64748B]">
              Direct administrative navigation & module shortcuts
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#64748B]">
          Admin Operations
        </span>
      </div>

      {/* Grid of Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;

          return (
            <Link
              key={act.href}
              to={act.href}
              className="group p-4 rounded-xl bg-slate-50/80 hover:bg-white border border-[#E2E8F0] hover:border-[#0F766E]/40 transition-all duration-150 flex flex-col justify-between hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              <div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${act.bgColor} ${act.color} border ${act.borderColor} mb-3 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-bold text-xs text-[#0F172A] group-hover:text-[#0F766E] transition-colors mb-1">
                  {act.label}
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug line-clamp-2">
                  {act.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-[#0F766E] group-hover:underline">
                <span>Access</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AdminQuickActionsCard;
