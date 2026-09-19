import React, { useState } from 'react';
import { Lock, Shield, Smartphone, ExternalLink, X } from 'lucide-react';

export const SecurityCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#0F172A] mb-1">Security</h2>
          <p className="text-xs text-[#64748B]">
            Authentication and security settings
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Password</p>
                <p className="text-xs text-[#64748B]">Managed by Clerk</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Two-Factor Authentication</p>
                <p className="text-xs text-[#64748B]">Managed by Clerk</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Active Sessions</p>
                <p className="text-xs text-[#64748B]">Managed by Clerk</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          Manage Account
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      {/* Account Management Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 px-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F766E] text-white">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">Account Management</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5">
                <div className="bg-[#CCFBF1] rounded-xl p-4 border border-[#0F766E]/20 mb-4">
                  <p className="text-sm text-[#0F172A] leading-relaxed">
                    Authentication and security settings are securely managed through Clerk.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-[#64748B]">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                    <p>Password management and reset</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                    <p>Two-factor authentication setup</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                    <p>Active session management</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                    <p>Login history and security logs</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
