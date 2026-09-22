import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import { BrandPanel } from '../components/auth/BrandPanel';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignInPage = () => {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* ── LEFT PANEL: ~55% Branded Hospital Experience (Desktop / Large screens) ── */}
      <aside className="hidden lg:flex lg:w-[54%] xl:w-[55%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* ── RIGHT PANEL: ~45% Focused Authentication Area ── */}
      <section className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-5">
          {/* Mobile Header Branding (Visible on mobile/tablet when left panel is hidden) */}
          <div className="lg:hidden flex flex-col items-center justify-center text-center pt-3 pb-1 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] shadow-2xs">
                <Activity className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <span className="text-lg font-extrabold tracking-wider text-[#17221B] block">
                  MEDIFLOW
                </span>
                <span className="text-[10px] font-semibold text-[#64748B] block">
                  Hospital Patient Coordination Platform
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] font-medium max-w-xs">
              Registration → Queue → Doctor → Lab → Pharmacy → Completed
            </p>
          </div>

          {/* Authentication Card Container */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            {/* Header */}
            <header className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17221B]">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Sign in to continue to MediFlow.
              </p>
            </header>

            {/* Clerk SignIn Authentication Component */}
            <ClerkAuthWrapper mode="signin" />
          </div>

          {/* Bottom Security / Trust Notice */}
          <footer className="text-center text-xs text-[#64748B] space-y-1 px-2">
            <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-[#475569]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
              <span>Secure access</span>
            </div>
            <p className="text-[10.5px] text-[#64748B]">
              Your account information is protected through secure authentication.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;


