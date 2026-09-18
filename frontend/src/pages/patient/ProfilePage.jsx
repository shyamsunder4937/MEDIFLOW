import React from 'react';
import { UserCircle } from 'lucide-react';
import { PatientLayout } from '../../layouts/PatientLayout';

export const ProfilePage = () => (
  <PatientLayout>
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E]">
          <UserCircle className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#0F172A]">My Profile</h1>
          <p className="text-sm text-[#64748B] max-w-sm">
            Manage your personal information, medical details, and account settings in Phase 2.
          </p>
        </div>
        <span className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-1.5 text-xs font-semibold text-[#64748B]">
          Coming Soon — Phase 2
        </span>
      </div>
    </div>
  </PatientLayout>
);
