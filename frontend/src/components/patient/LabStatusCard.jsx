import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, CheckCircle2, Loader2, Circle, ArrowRight } from 'lucide-react';
import { mockLabResults } from '../../data/mockPatientData';

const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    classes: 'text-[#16A34A] bg-[#F0FDF4] border-[#16A34A]/25',
    iconClass: 'text-[#16A34A]',
  },
  processing: {
    label: 'Processing',
    icon: Loader2,
    classes: 'text-[#D97706] bg-amber-50 border-amber-200',
    iconClass: 'text-[#D97706] animate-spin',
  },
  pending: {
    label: 'Pending',
    icon: Circle,
    classes: 'text-[#94A3B8] bg-[#F8FAFC] border-[#E2E8F0]',
    iconClass: 'text-[#CBD5E1]',
  },
};

export const LabStatusCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <FlaskConical className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Laboratory</h2>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        {mockLabResults.map((lab) => {
          const config = STATUS_CONFIG[lab.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={lab.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] px-4 py-3 hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#0F172A] truncate">{lab.test}</p>
                {lab.completedAt && (
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">Completed at {lab.completedAt}</p>
                )}
              </div>
              <span
                className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${config.classes}`}
              >
                <StatusIcon className={`h-3 w-3 ${config.iconClass}`} />
                {config.label}
              </span>
            </div>
          );
        })}

        {/* CTA */}
        <Link
          to="/patient/lab-results"
          className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline underline-offset-2 pt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          View Lab Results <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
