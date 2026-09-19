import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import {
  Server,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Radio,
} from 'lucide-react';

export const AdminSessionCard = ({ profile }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const {
    sessionStatus = 'Active',
    authentication = 'Clerk',
    environment = 'Phase 1 Frontend',
    lastActivity = 'Today',
  } = profile;

  const handleSignOut = async () => {
    sessionStorage.removeItem('mediflow_auth');
    localStorage.removeItem('mediflow_user_role');
    try {
      if (signOut) {
        await signOut();
      }
    } catch {
      // ignore in demo mode
    }
    navigate('/admin/login');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
            <Server className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Session & System Context
            </h3>
            <p className="text-xs text-slate-500">
              Active authentication session and environment details.
            </p>
          </div>
        </div>

        {/* Session Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <span className="text-xs text-slate-500 block font-medium">
              Current Session
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {sessionStatus}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <span className="text-xs text-slate-500 block font-medium">
              Authentication Provider
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              {authentication} SSO
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <span className="text-xs text-slate-500 block font-medium">
              Environment
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
              <Globe className="h-4 w-4 text-blue-600" />
              {environment}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <span className="text-xs text-slate-500 block font-medium">
              Last Activity
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
              <Radio className="h-4 w-4 text-teal-600" />
              {lastActivity}
            </div>
          </div>
        </div>

        {/* Account Actions / Danger Zone */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-700">
              Account Actions
            </div>
            <div className="text-[11px] text-slate-500">
              Terminate active administrative session and return to login.
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer shadow-2xs w-full sm:w-auto justify-center"
            title="Sign out of Admin Portal"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
