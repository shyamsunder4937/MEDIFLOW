import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { ShieldCheck, UserCircle, Key } from 'lucide-react';

export const ClerkAccountCard = () => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Account Authentication
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Manage your account and authentication settings.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Clerk Secured
        </span>
      </div>

      {/* Account Info Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-2xs">
            <UserCircle className="h-6 w-6 text-[#0F766E]" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
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
          <div className="p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
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
