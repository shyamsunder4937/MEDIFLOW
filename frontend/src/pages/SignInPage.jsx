import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BrandPanel } from '../components/auth/BrandPanel';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignInPage = () => {
  return (
    <main className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* LEFT PANEL: 45% Branded Hero Section (Visible on Desktop / Large screens) */}
      <aside className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* RIGHT PANEL: 55% Authentication Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Authentication Header */}
          <header className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome back 👋
            </h1>
            <p className="text-sm text-[#64748B]">
              Sign in to continue to MediFlow AI
            </p>
          </header>

          {/* Clerk SignIn Authentication Component */}
          <ClerkAuthWrapper mode="signin" />

          {/* Bottom Help / Security Information */}
          <footer className="pt-3 border-t border-[#E2E8F0] text-center text-xs text-[#64748B] space-y-1.5">
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E]" />
              Protected by hospital-grade encryption & HIPAA compliant protocols.
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              MediFlow AI Platform • All rights reserved
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};
