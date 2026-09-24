import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  ArrowRight,
  UserCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Calendar,
  Clock,
} from 'lucide-react';
import { staffRecentNotifications } from '../../data/staffMockData';

export const StaffRecentNotifications = ({
  notifications = staffRecentNotifications,
}) => {
  const navigate = useNavigate();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'doctor':
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <Stethoscope className="h-3.5 w-3.5" />
          </div>
        );
      case 'lab':
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#475569] border border-[#E2E8F0] flex-shrink-0">
            <FlaskConical className="h-3.5 w-3.5" />
          </div>
        );
      case 'pharmacy':
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#475569] border border-[#E2E8F0] flex-shrink-0">
            <Pill className="h-3.5 w-3.5" />
          </div>
        );
      case 'appointment':
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <Calendar className="h-3.5 w-3.5" />
          </div>
        );
      case 'queue':
      default:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
            <UserCheck className="h-3.5 w-3.5" />
          </div>
        );
    }
  };

  return (
    <section className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Section Header ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Recent Notifications</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] text-[10px] font-bold border border-[#DCFCE7]">
                {notifications.filter((n) => n.unread).length} New
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">Real-time operational alerts & updates</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/notifications')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Notifications List ── */}
      <div className="divide-y divide-[#E2E8F0]">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 sm:p-4 transition-colors flex items-start gap-3 ${
              item.unread ? 'bg-[#F0FDF4]/30' : 'hover:bg-slate-50/60'
            }`}
          >
            {getNotificationIcon(item.type)}

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-[#17221B] truncate">
                  {item.message}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-medium whitespace-nowrap flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                {item.detail}
              </p>
            </div>

            {item.unread && (
              <span className="h-2 w-2 rounded-full bg-[#15803D] flex-shrink-0 mt-1.5" title="Unread" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffRecentNotifications;

