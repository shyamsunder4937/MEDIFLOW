import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';
import { BrandPanel } from '../../components/auth/BrandPanel';
import { SignIn } from '@clerk/clerk-react';

export const AdminLoginPage = () => {
  const redirectUrl = '/auth-redirect';

  const customAppearance = {
    variables: {
      colorPrimary: '#0F766E',
      colorText: '#0F172A',
      colorTextSecondary: '#64748B',
      colorBackground: '#FFFFFF',
      colorInputBackground: '#FFFFFF',
      colorInputBorder: '#E2E8F0',
      borderRadius: '0.75rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    },
    elements: {
      rootBox: 'w-full',
      card: 'shadow-none p-0 w-full bg-transparent border-0',
      headerTitle: 'hidden',
      headerSubtitle: 'hidden',
      formButtonPrimary:
        'bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.99] text-white text-sm font-semibold rounded-xl py-3 transition duration-150 shadow-sm',
      socialButtonsBlockButton:
        'border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] rounded-xl text-xs font-semibold transition duration-150 py-2.5',
      formFieldInput:
        'rounded-xl border-[#E2E8F0] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-sm text-[#0F172A] placeholder:text-slate-400',
      footerActionLink: 'text-[#0F766E] hover:text-[#115E59] font-semibold hover:underline',
      dividerLine: 'bg-[#E2E8F0]',
      dividerText: 'text-xs text-[#64748B] font-medium',
      formFieldLabel: 'text-xs font-semibold text-[#0F172A] mb-1',
    },
  };

  return (
    <main className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* LEFT PANEL: 45% Branded Hero Section */}
      <aside className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* RIGHT PANEL: 55% Admin Authentication Form */}
      <section className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Admin Shield Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
          </div>

          {/* Authentication Header */}
          <header className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              MediFlow Admin
            </h1>
            <p className="text-base text-[#64748B] font-medium">
              Secure administration portal
            </p>
            <p className="text-sm text-[#64748B]">
              Sign in to manage hospital operations and system workflows
            </p>
          </header>

          {/* Clerk SignIn Component */}
          <div className="w-full flex justify-center">
            <SignIn
              appearance={customAppearance}
              routing="path"
              path="/admin/login"
              signUpUrl="/sign-up"
              fallbackRedirectUrl={redirectUrl}
              forceRedirectUrl={redirectUrl}
            />
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-amber-900">
              ⚠️ Authorized administrators only
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Unauthorized access attempts are logged and monitored
            </p>
          </div>

          {/* Bottom Security Information */}
          <footer className="pt-3 border-t border-[#E2E8F0] text-center text-xs text-[#64748B] space-y-1.5">
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E]" />
              Protected by enterprise-grade security & audit logging
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              MediFlow AI Administration • All rights reserved
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};
