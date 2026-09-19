import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { systemAlertsList } from '../../../data/adminMockData';

const getAlertLevelBadge = (level) => {
  switch (level) {
    case 'Warning':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <AlertTriangle className="h-3 w-3" />
          Warning
        </span>
      );
    case 'Attention Required':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <AlertCircle className="h-3 w-3" />
          Attention Required
        </span>
      );
    case 'Information':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Info className="h-3 w-3" />
          Information
        </span>
      );
  }
};

export const SystemAlertsCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                System Alerts
              </h3>
              <p className="text-xs text-[#64748B]">
                Hospital operational thresholds & alerts
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {systemAlertsList.length} Active Alerts
          </span>
        </div>

        {/* Alerts List */}
        <div className="space-y-2.5">
          {systemAlertsList.map((alert) => (
            <div
              key={alert.id}
              className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-[#E2E8F0] transition-colors flex flex-col gap-1.5 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-[#0F172A] truncate">
                    {alert.title}
                  </span>
                  <span className="text-[11px] text-[#64748B] bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0] truncate">
                    {alert.department}
                  </span>
                </div>
                {getAlertLevelBadge(alert.level)}
              </div>

              <p className="text-[11px] text-[#475569] leading-snug">
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Mock alerts for Phase 1 simulation</span>
        <span className="font-semibold text-emerald-700">No Critical Faults</span>
      </div>
    </div>
  );
};

export default SystemAlertsCard;
