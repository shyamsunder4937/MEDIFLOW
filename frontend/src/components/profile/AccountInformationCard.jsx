import React from 'react';
import { IdCard, Calendar, CheckCircle2, Shield } from 'lucide-react';

export const AccountInformationCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#0F172A] mb-5">Account Information</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] flex-shrink-0">
            <IdCard className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#64748B] mb-0.5">Patient ID</p>
            <p className="text-sm font-semibold text-[#0F172A] font-mono">{profile.patientId}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#64748B] mb-0.5">Account Created</p>
            <p className="text-sm font-semibold text-[#0F172A]">{profile.accountCreated}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 flex-shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#64748B] mb-0.5">Account Status</p>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
              <p className="text-sm font-semibold text-[#16A34A]">{profile.accountStatus}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white flex-shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/90 mb-0.5">Authentication</p>
            <p className="text-sm font-semibold text-white mb-2">Clerk</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Your account is securely managed through Clerk authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
