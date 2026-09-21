import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  UserCheck,
  FlaskConical,
  Clock,
  Pill,
  ArrowRight,
  Users,
  Calendar,
} from 'lucide-react';
import { mockNotifications } from '../../data/mockPatientData';

const ICON_MAP = {
  UserCheck,
  FlaskConical,
  Clock,
  Pill,
  Bell,
  Users,
  Calendar,
};

export const NotificationList = () => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Bell className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17221B] leading-tight">
              Recent Notifications
            </h2>
            <p className="text-xs text-[#64748B]">Recent activity and status updates</p>
          </div>
        </div>

        <Link
          to="/patient/notifications"
          className="text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Notification Rows */}
      <div className="divide-y divide-[#E2E8F0] flex-1">
        {mockNotifications.slice(0, 3).map((notif) => {
          const Icon = ICON_MAP[notif.icon] || Bell;

          return (
            <div
              key={notif.id}
              className={`flex items-start gap-3.5 px-5 py-3 transition-colors hover:bg-slate-50/70 ${
                !notif.read ? 'bg-[#F0FDF4]/30' : 'bg-white'
              }`}
            >
              <div
                className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border ${
                  !notif.read
                    ? 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/20'
                    : 'bg-slate-100 text-[#64748B] border-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-xs truncate ${
                      !notif.read
                        ? 'font-bold text-[#17221B]'
                        : 'font-semibold text-[#475569]'
                    }`}
                  >
                    {notif.title || notif.message}
                  </p>
                  <span className="text-[10px] text-[#94A3B8] flex-shrink-0">
                    {notif.time}
                  </span>
                </div>

                <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                  {notif.description || notif.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-[#E2E8F0] bg-slate-50/50">
        <Link
          to="/patient/notifications"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline"
        >
          <span>All Notification History</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
