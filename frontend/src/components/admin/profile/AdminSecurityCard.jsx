import React from 'react';
import { Lock, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminSecurityCard = ({ onChangePassword }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Security & Authentication
              </h3>
              <p className="text-xs text-slate-500">
                Credentials and access security settings.
              </p>
            </div>
          </div>

          <button
            onClick={onChangePassword}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
            title="Change administrator password"
          >
            <KeyRound className="h-3.5 w-3.5 text-slate-500" />
            <span>Change Password</span>
          </button>
        </div>

        {/* Security Elements */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">
                Current Password
              </div>
              <div className="text-sm font-mono font-bold text-slate-800 tracking-widest mt-0.5">
                ••••••••••••
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Encrypted
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">
                Multi-Factor Authentication (MFA)
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Managed through identity federation and Clerk SSO.
              </div>
            </div>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              Enabled
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Password hashing: Argon2 / Clerk Auth</span>
        <span>Secure Protocol</span>
      </div>
    </div>
  );
};
