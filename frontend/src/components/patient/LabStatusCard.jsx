import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, CheckCircle2, Loader2, Circle, ArrowRight } from 'lucide-react';
import { mockLabResults } from '../../data/mockPatientData';

const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    classes: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/25',
    icon: CheckCircle2,
    iconClass: 'text-[#15803D]',
  },
  processing: {
    label: 'Processing',
    classes: 'text-[#B45309] bg-amber-50 border-amber-200',
    icon: Loader2,
    iconClass: 'text-[#B45309] animate-spin',
  },
  pending: {
    label: 'Pending',
    classes: 'text-[#64748B] bg-slate-50 border-[#E2E8F0]',
    icon: Circle,
    iconClass: 'text-[#94A3B8]',
  },
};

export const LabStatusCard = () => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <FlaskConical className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17221B] leading-tight">
              Laboratory Tests
            </h2>
            <p className="text-xs text-[#64748B]">Diagnostic sample & order status</p>
          </div>
        </div>

        <Link
          to="/patient/lab-results"
          className="text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Content List */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2.5">
          {mockLabResults.map((lab) => {
            const config = STATUS_CONFIG[lab.status] || STATUS_CONFIG.pending;
            const StatusIcon = config.icon;

            return (
              <div
                key={lab.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-[#E2E8F0] hover:bg-slate-50/70 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#17221B] truncate">{lab.test}</p>
                  {lab.completedAt ? (
                    <p className="text-[11px] text-[#64748B] mt-0.5">Verified at {lab.completedAt}</p>
                  ) : (
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">Diagnostics Bay 02</p>
                  )}
                </div>

                <span
                  className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${config.classes}`}
                >
                  <StatusIcon className={`h-3 w-3 ${config.iconClass}`} />
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#E2E8F0]">
          <Link
            to="/patient/lab-results"
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline"
          >
            <span>Access Official Lab Reports</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
