import React from 'react';
import { Bell, BellDot, AlertCircle } from 'lucide-react';

export const NotificationSummaryCards = ({ total, unread, important }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Notifications */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B] mb-1">Total Notifications</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#17221B]">{total}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#64748B] border border-[#E2E8F0]/70">
            <Bell className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Unread */}
      <div className="bg-white rounded-xl border border-[#BBF7D0] p-4 sm:p-5 shadow-xs transition-colors bg-gradient-to-b from-white to-[#F7FEF9]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#15803D] mb-1">Unread Alerts</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#15803D]">{unread}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
            <BellDot className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Important */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B] mb-1">Important Updates</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#17221B]">{important}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
