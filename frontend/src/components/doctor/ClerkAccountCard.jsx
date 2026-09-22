import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { ShieldCheck, UserCircle } from 'lucide-react';

export const ClerkAccountCard = () => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#15803D]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
              Account Authentication
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Manage your account and authentication settings.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#DCFCE7]">
          Clerk Secured
        </span>
      </div>

      {/* Account Info Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs">
            <UserCircle className="h-5 w-5 text-[#15803D]" />
          </div>
          <div>
            <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
              {user?.fullName || 'Dr. Arun Kumar'}
            </div>
            <div className="text-[11px] text-[#64748B]">
              {user?.primaryEmailAddress?.emailAddress || 'arun.kumar@mediflow.demo'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
            Manage Security:
          </span>
          <div className="p-0.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClerkAccountCard;

