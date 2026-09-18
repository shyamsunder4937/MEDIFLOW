import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Stethoscope, User, ShieldCheck } from 'lucide-react';
import { BrandPanel } from '../components/auth/BrandPanel';
import { RoleSelector } from '../components/auth/RoleSelector';
import { ClerkAuthWrapper } from '../components/auth/ClerkAuthWrapper';

export const SignInPage = () => {
  const [selectedRole, setSelectedRole] = useState('patient');
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    sessionStorage.setItem('mediflow_auth', 'demo');
    localStorage.setItem('mediflow_user_role', selectedRole);
    if (selectedRole === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* LEFT PANEL: 45% Branded Hero Section (Visible on Desktop / Large screens) */}
      <aside className="hidden lg:flex lg:w-[45%] sticky top-0 h-screen">
        <BrandPanel />
      </aside>

      {/* RIGHT PANEL: 55% Authentication Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Mobile Header Logo (Visible only on mobile / tablet) */}
          <div className="lg:hidden flex items-center gap-2.5 pb-1">
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
              Sign in or enter preview to continue to MediFlow
            </p>
          </header>

          {/* Role Selector Above Clerk Auth Fields */}
          <RoleSelector
            selectedRole={selectedRole}
            onSelectRole={(newRole) => {
              setSelectedRole(newRole);
              localStorage.setItem('mediflow_user_role', newRole);
            }}
          />

          {/* Instant Prototype Demo Button for fast preview */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-900 to-[#0F766E] text-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                {selectedRole === 'doctor' ? (
                  <>
                    <Stethoscope className="h-4 w-4 text-[#CCFBF1]" />
                    Doctor Portal Selected
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 text-[#CCFBF1]" />
                    Patient Portal Selected
                  </>
                )}
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                Phase 1 Prototype
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white text-[#0F766E] hover:bg-[#CCFBF1] text-xs font-bold transition-all active:scale-[0.99] shadow-xs cursor-pointer"
            >
              <span>
                Enter {selectedRole === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'} (Instant Demo)
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Clerk SignIn Authentication Component */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <div className="text-center text-xs text-[#64748B] mb-2 font-medium">
              Or sign in with hospital credentials:
            </div>
            <ClerkAuthWrapper mode="signin" selectedRole={selectedRole} />
          </div>

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
