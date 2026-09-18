import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { BrandPanel } from '../components/auth/BrandPanel';
import { RoleSelector } from '../components/auth/RoleSelector';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignInPage = () => {
  const [selectedRole, setSelectedRole] = useState('patient');

  return (
    <main className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* LEFT PANEL: 45% Branded Hero Section (Visible on Desktop / Large screens) */}
      <aside className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* RIGHT PANEL: 55% Authentication Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-7">
          {/* Mobile Header Logo (Visible only on mobile / tablet) */}
          <div className="lg:hidden flex items-center gap-2.5 pb-2">
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

          {/* Authentication Header */}
          <header className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome back 👋
            </h1>
            <p className="text-sm text-[#64748B]">
              Sign in to continue to MediFlow
            </p>
          </header>

          {/* Role Selector Above Clerk Auth Fields */}
          <RoleSelector
            selectedRole={selectedRole}
            onSelectRole={(newRole) => setSelectedRole(newRole)}
          />

          {/* Clerk SignIn Authentication Component */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <ClerkAuthWrapper mode="signin" />
          </div>

          {/* Bottom Help / Security Information */}
          <footer className="pt-4 border-t border-[#E2E8F0] text-center text-xs text-[#64748B] space-y-2">
            <p>
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
