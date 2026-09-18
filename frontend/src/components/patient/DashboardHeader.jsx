import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Bell, Menu } from 'lucide-react';
import { mockNotifications } from '../../data/mockPatientData';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const DashboardHeader = ({ onMenuOpen, title, subtitle }) => {
  const { user, isLoaded } = useUser();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const firstName = isLoaded && user ? user.firstName || 'Patient' : 'Patient';

  const heading = title || `${getGreeting()}, ${firstName} 👋`;
  const subHeading = subtitle || "Here's what's happening with your hospital visit.";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5">
      {/* Left: Hamburger (mobile) + Greeting / Custom Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight truncate">
            {heading}
          </h1>
          <p className="text-[11px] sm:text-xs text-[#64748B] hidden sm:block truncate">
            {subHeading}
          </p>
        </div>
      </div>

      {/* Right: Notification bell + Clerk UserButton */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          aria-label={`${unreadCount} unread notifications`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F766E] text-[9px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Clerk UserButton */}
        <div className="flex items-center gap-2.5 pl-1">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8 rounded-lg',
                userButtonPopoverCard: 'shadow-xl border border-[#E2E8F0] rounded-2xl',
              },
            }}
            afterSignOutUrl="/sign-in"
          />
          <div className="hidden sm:block leading-tight max-w-[120px]">
            <div className="text-xs font-semibold text-[#0F172A] truncate">
              {isLoaded && user ? user.fullName || firstName : firstName}
            </div>
            <div className="text-[10px] text-[#64748B]">Patient</div>
          </div>
        </div>
      </div>
    </header>
  );
};
