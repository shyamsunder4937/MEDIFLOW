import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import { BrandPanel } from '../components/auth/BrandPanel';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignInPage = () => {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* ── LEFT PANEL: Branded Hospital Introduction (Desktop / Large screens) ── */}
      <aside className="hidden lg:flex lg:w-[46%] xl:w-[44%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* ── RIGHT PANEL: Clean Authentication Form Section ── */}
      <section className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-5">
          {/* Mobile Header Branding (Visible on mobile/tablet when left panel is hidden) */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] shadow-2xs">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-wider text-[#17221B] block">
                MEDIFLOW
              </span>
              <span className="text-[10px] font-semibold text-[#64748B] block">
                Hospital Patient Coordination Platform
              </span>
            </div>
          </div>

          {/* Authentication Card Container */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            {/* Header */}
            <header className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17221B]">
                Welcome back 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Sign in to continue to MediFlow
              </p>
            </header>

            {/* Clerk SignIn Authentication Component */}
            <ClerkAuthWrapper mode="signin" />
          </div>

          {/* Bottom Help / Security Information */}
          <footer className="text-center text-xs text-[#64748B] space-y-1.5 px-2">
            <p className="flex items-center justify-center gap-1.5 text-[11.5px]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
              Protected by hospital-grade encryption & HIPAA compliant protocols.
            </p>
            <p className="text-[10.5px] text-[#94A3B8]">
              MediFlow Healthcare Platform • All rights reserved
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;



