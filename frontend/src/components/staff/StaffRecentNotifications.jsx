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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] flex-shrink-0">
            <Stethoscope className="h-4 w-4" />
          </div>
        );
      case 'lab':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
            <FlaskConical className="h-4 w-4" />
          </div>
        );
      case 'pharmacy':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
            <Pill className="h-4 w-4" />
          </div>
        );
      case 'appointment':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
            <Calendar className="h-4 w-4" />
          </div>
        );
      case 'queue':
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
            <UserCheck className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <Bell className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Recent Notifications</h2>
            <p className="text-xs text-[#64748B]">Real-time operational alerts & updates</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/notifications')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-[#115E59] hover:underline transition-colors cursor-pointer"
        >
          <span>View All Notifications</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Notifications List ── */}
      <div className="divide-y divide-[#E2E8F0] -mx-2">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl transition-colors flex items-start gap-3 ${
              item.unread ? 'bg-[#CCFBF1]/20' : 'hover:bg-slate-50'
            }`}
          >
            {getNotificationIcon(item.type)}

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-[#0F172A] truncate">
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
              <span className="h-2 w-2 rounded-full bg-[#0F766E] flex-shrink-0 mt-2" title="Unread" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffRecentNotifications;
