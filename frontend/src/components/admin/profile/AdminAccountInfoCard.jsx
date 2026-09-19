import React from 'react';
import {
  FileText,
  Key,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const AdminAccountInfoCard = ({ profile }) => {
  const {
    accountId,
    role,
    accessLevel,
    accountStatus,
    created,
    lastLogin,
  } = profile;

  const metadataItems = [
    {
      id: 'accountId',
      label: 'Account ID',
      value: accountId || 'ADM-001',
      icon: Key,
      isMono: true,
    },
    {
      id: 'role',
      label: 'Role',
      value: role || 'System Administrator',
      icon: ShieldCheck,
    },
    {
      id: 'accessLevel',
      label: 'Access Level',
      value: accessLevel || 'Administrator',
      icon: FileText,
      badge: 'Full Operations',
    },
    {
      id: 'accountStatus',
      label: 'Account Status',
      value: accountStatus || 'Active',
      icon: CheckCircle2,
      isStatus: true,
    },
    {
      id: 'created',
      label: 'Created',
      value: created || 'Phase 1 Demo Account',
      icon: Calendar,
    },
    {
      id: 'lastLogin',
      label: 'Last Login',
      value: lastLogin || 'Today',
      icon: Clock,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Account Information
            </h3>
            <p className="text-xs text-slate-500">
              System access credentials and administrative authorization level.
            </p>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metadataItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.isStatus && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                  <span
                    className={`text-sm font-bold text-slate-800 ${
                      item.isMono ? 'font-mono tracking-tight text-[#0F766E]' : ''
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Authorization: Role-Based (RBAC)</span>
        <span>Tier 1 Clearance</span>
      </div>
    </div>
  );
};
