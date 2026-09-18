import React from 'react';
import { Bell, BellDot, AlertCircle } from 'lucide-react';

export const NotificationSummaryCards = ({ total, unread, important }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Notifications */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Total Notifications</p>
            <p className="text-3xl font-bold text-[#0F172A]">{total}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#64748B]">
            <Bell className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Unread */}
      <div className="bg-white rounded-2xl border border-[#0F766E]/20 p-5 shadow-sm ring-2 ring-[#0F766E]/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Unread</p>
            <p className="text-3xl font-bold text-[#0F766E]">{unread}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
            <BellDot className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Important */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#64748B] mb-1">Important</p>
            <p className="text-3xl font-bold text-[#0F172A]">{important}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#D97706]">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
