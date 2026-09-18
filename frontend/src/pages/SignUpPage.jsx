import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, ShieldCheck, Lock } from 'lucide-react';
import { SignUpBrandPanel } from '../components/auth/SignUpBrandPanel';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignUpPage = () => {
  return (
    <main className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT PANEL — 45% Branded Hero (Desktop only)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <aside
        className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen"
        aria-label="MediFlow brand panel"
      >
        <SignUpBrandPanel />
      </aside>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT PANEL — 55% Patient Registration Form
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 overflow-y-auto"
        aria-label="Patient registration"
      >
        <div className="w-full max-w-[440px] space-y-6">

          {/* ── Mobile / Tablet Logo (hidden on lg+) ── */}
          <div className="lg:hidden flex items-center gap-2.5 pb-2" aria-hidden="true">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E] text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A]">
                MEDIFLOW
              </span>
              <p className="text-[11px] text-[#64748B]">AI-powered hospital coordination</p>
            </div>
          </div>

          {/* ── Page Heading ── */}
          <header className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Create your account
            </h1>
            <p className="text-sm text-[#64748B]">
              Register as a patient to get started
            </p>
          </header>

          {/* ── Patient Role Badge (non-interactive, read-only) ── */}
          <div
            className="flex items-center gap-3 rounded-xl border border-[#0F766E]/25 bg-[#CCFBF1]/30 px-4 py-3"
            role="status"
            aria-label="Account type: Patient"
          >
            {/* Icon badge */}
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#0F766E] text-white shadow-sm">
              <User className="h-4.5 w-4.5" />
            </div>

            {/* Role info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wide">
                  Patient account
                </span>
                <span
                  className="inline-flex items-center rounded-full bg-[#0F766E]/10 border border-[#0F766E]/25 px-2 py-0.5 text-[10px] font-semibold text-[#0F766E] tracking-wide"
                  aria-label="Patient role"
                >
                  👤 Patient
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                Manage appointments &amp; track your hospital journey
              </p>
            </div>

            {/* Locked indicator */}
            <div
              className="flex-shrink-0 flex items-center gap-1 text-[#94A3B8]"
              title="Role is fixed for patient self-registration"
              aria-label="Role is locked"
            >
              <Lock className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* ── Healthcare Professionals Notice ── */}
          <div
            className="rounded-xl bg-slate-50 border border-[#E2E8F0] px-4 py-3 text-xs text-[#64748B] leading-relaxed"
            role="note"
            aria-label="Healthcare professionals information"
          >
            <span className="font-semibold text-[#0F172A]">
              Healthcare professional?
            </span>{' '}
            Doctor, nurse, lab, pharmacy, and admin accounts are provisioned
            directly by your hospital administrator — not through self-registration.
          </div>

          {/* ── Clerk SignUp Component ── */}
          <div className="pt-1 border-t border-[#E2E8F0]">
            <ClerkAuthWrapper mode="signup" />
          </div>

          {/* ── Already have an account? ── */}
          <div className="pt-1 text-center text-sm text-[#64748B]">
            Already have an account?{' '}
            <Link
              to="/sign-in"
              className="font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-1 rounded"
            >
              Sign in
            </Link>
          </div>

          {/* ── Footer ── */}
          <footer className="pt-4 border-t border-[#E2E8F0] text-center space-y-2">
            <p className="text-xs text-[#64748B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E] flex-shrink-0" />
              Protected by hospital-grade encryption &amp; HIPAA compliant protocols.
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
