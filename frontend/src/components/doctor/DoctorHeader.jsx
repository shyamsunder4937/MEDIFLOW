import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Bell, Menu, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { doctorDashboardData } from '../../data/doctorMockData';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const DoctorHeader = ({ onMenuOpen, title, subtitle }) => {
  const { user, isLoaded } = useUser();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(doctorDashboardData.notifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const doctorName =
    isLoaded && user?.fullName
      ? `Dr. ${user.fullName.replace(/^Dr\.?\s*/i, '')}`
      : doctorDashboardData.doctor.name;

  const heading = title || `${getGreeting()}, ${doctorName.split(' ')[0] || 'Dr. Arun'} 👋`;
  const subHeading = subtitle || "General Medicine • Consultation Suite 4B";

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5 transition-all">
      {/* Left: Hamburger (mobile) + Doctor Greeting / Custom Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#17221B] tracking-tight truncate">
            {heading}
          </h1>
          <p className="text-[11px] sm:text-xs text-[#64748B] hidden sm:block truncate">
            {subHeading}
          </p>
        </div>
      </div>

      {/* Right: Notifications Popover + Clerk UserButton & Doctor Info */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
              notificationsOpen
                ? 'border-[#15803D] bg-[#F0FDF4] text-[#15803D]'
                : 'border-[#E2E8F0] text-[#64748B] hover:bg-slate-50'
            }`}
            aria-label={`${unreadCount} notifications`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#15803D] text-[9px] font-bold text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] z-40 p-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#E2E8F0] px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#17221B]">Doctor Notifications</span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 text-[10px] font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-[#15803D] hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        item.unread
                          ? 'bg-[#F0FDF4] border-[#15803D]/20'
                          : 'bg-slate-50/70 border-[#E2E8F0]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-semibold text-[#17221B]">
                          {item.type === 'urgent' && (
                            <AlertCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                          )}
                          {item.type === 'info' && (
                            <Info className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                          )}
                          {item.type === 'success' && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                          )}
                          <span>{item.title}</span>
                        </div>
                        <span className="text-[10px] text-[#94A3B8] whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Doctor Identity & Clerk UserButton */}
        <div className="flex items-center gap-2.5 pl-1.5 border-l border-[#E2E8F0]">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8 rounded-xl ring-1 ring-[#15803D]/30',
                userButtonPopoverCard: 'shadow-xl border border-[#E2E8F0] rounded-2xl',
              },
            }}
            afterSignOutUrl="/sign-in"
          />
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-xs font-bold text-[#17221B] flex items-center gap-1 truncate max-w-[140px]">
              {doctorName}
            </div>
            <div className="text-[10px] text-[#15803D] font-medium flex items-center gap-1">
              <span>General Medicine</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#64748B]">Suite 4B</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
