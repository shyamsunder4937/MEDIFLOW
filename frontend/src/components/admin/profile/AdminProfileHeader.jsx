import React from 'react';
import {
  Shield,
  ShieldCheck,
  Mail,
  Building2,
  CheckCircle2,
  UserCheck,
  Sparkles,
} from 'lucide-react';

export const AdminProfileHeader = ({ profile }) => {
  const {
    fullName,
    name,
    email,
    role,
    department,
    status,
    accountType,
    initials,
  } = profile;

  const displayName = fullName || name || 'MediFlow Admin';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Decorative top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#0D9488]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        {/* Left: Avatar & Identity Details */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Avatar with Initials & Shield Icon */}
          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md border-2 border-white ring-2 ring-teal-100">
              {initials || 'MA'}
            </div>
            <div
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
              title="Active Administrator"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {displayName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {status || 'Active'}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#0F766E] flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#0F766E]" />
              {role || 'System Administrator'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-0.5">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {email}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                {department}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Account Classification Pill */}
        <div className="flex flex-col sm:items-end gap-2 flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="px-3.5 py-2 rounded-xl bg-teal-50/70 border border-teal-200/80 text-left sm:text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-teal-800">
              Account Type
            </div>
            <div className="text-xs font-extrabold text-[#0F766E] flex items-center gap-1 sm:justify-end">
              <ShieldCheck className="h-3.5 w-3.5" />
              {accountType || 'Administrator'}
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400 sm:text-right">
            ID: {profile.accountId || 'ADM-001'}
          </span>
        </div>
      </div>
    </div>
  );
};
