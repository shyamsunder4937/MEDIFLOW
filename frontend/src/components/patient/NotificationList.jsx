import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  UserCheck,
  FlaskConical,
  Clock,
  Pill,
  ArrowRight,
} from 'lucide-react';
import { mockNotifications } from '../../data/mockPatientData';

const ICON_MAP = {
  UserCheck,
  FlaskConical,
  Clock,
  Pill,
  Bell,
};

const TYPE_DOT = {
  success: 'bg-[#16A34A]',
  info: 'bg-[#0F766E]',
  warning: 'bg-[#D97706]',
  error: 'bg-[#DC2626]',
};

export const NotificationList = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <Bell className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Recent Notifications</h2>
        </div>
        <Link
          to="/patient/notifications"
          className="text-xs font-semibold text-[#0F766E] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-[#F1F5F9]">
        {mockNotifications.map((notif) => {
          const Icon = ICON_MAP[notif.icon] || Bell;
          const dotClass = TYPE_DOT[notif.type] || 'bg-[#94A3B8]';

          return (
            <div
              key={notif.id}
              className={`flex items-start gap-3.5 px-5 py-3.5 transition-colors hover:bg-[#F8FAFC] ${
                !notif.read ? 'bg-[#F0FDF9]/60' : ''
              }`}
            >
              {/* Icon */}
              <div
                className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                  !notif.read ? 'bg-[#CCFBF1] text-[#0F766E]' : 'bg-slate-100 text-[#64748B]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-xs font-semibold truncate ${!notif.read ? 'text-[#0F172A]' : 'text-[#475569]'}`}>
                    {notif.message}
                  </p>
                  {!notif.read && (
                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotClass}`} />
                  )}
                </div>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View all link */}
      <div className="px-5 py-3 border-t border-[#E2E8F0]">
        <Link
          to="/patient/notifications"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          View All Notifications <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
