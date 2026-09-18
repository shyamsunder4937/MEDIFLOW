import React from 'react';
import {
  Pill,
  CheckCircle2,
  Clock,
  Calendar,
  UserCheck,
  Building2,
  Tag,
  ChevronRight,
  Hash,
} from 'lucide-react';

const STATUS_CONFIG = {
  'Ready for Pickup': {
    badge: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
    icon: CheckCircle2,
    iconClass: 'text-[#16A34A]',
    pillBg: 'bg-emerald-50 text-[#16A34A]',
  },
  Processing: {
    badge: 'bg-amber-50 text-[#D97706] border-amber-200',
    icon: Clock,
    iconClass: 'text-[#D97706]',
    pillBg: 'bg-amber-50 text-[#D97706]',
  },
  Completed: {
    badge: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
    icon: CheckCircle2,
    iconClass: 'text-[#475569]',
    pillBg: 'bg-slate-100 text-[#475569]',
  },
};

export const PrescriptionCard = ({ prescription, onViewDetails }) => {
  const cfg = STATUS_CONFIG[prescription.status] || STATUS_CONFIG['Processing'];
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top colour accent strip based on status */}
      <div className={`h-1 w-full ${
        prescription.status === 'Ready for Pickup'
          ? 'bg-[#16A34A]'
          : prescription.status === 'Processing'
          ? 'bg-[#D97706]'
          : 'bg-[#CBD5E1]'
      }`} />

      <div className="p-5">
        {/* Header */}
        {/* Card title row - wraps on very small screens */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1]/60 text-[#0F766E] flex-shrink-0">
              <Pill className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                {prescription.medicine}
              </h3>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                {prescription.genericName} · {prescription.category}
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border flex-shrink-0 ${cfg.badge}`}>
            <StatusIcon className={`h-3 w-3 ${cfg.iconClass}`} />
            <span className="hidden xs:inline sm:inline">{prescription.status}</span>
          </span>
        </div>
      </div>

        {/* Dosage Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Dosage',    value: prescription.dosage },
            { label: 'Frequency', value: prescription.frequency },
            { label: 'Duration',  value: prescription.duration },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]/80 p-2.5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {label}
              </p>
              <p className="text-xs font-bold text-[#0F172A] mt-0.5 leading-tight">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-3.5 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-mono flex-shrink-0">
              <Hash className="h-3 w-3" />
              {prescription.id}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] truncate">
              <UserCheck className="h-3.5 w-3.5 text-[#94A3B8] flex-shrink-0" />
              <span className="truncate">{prescription.prescribedBy}</span>
            </div>
          </div>
          <button
            onClick={() => onViewDetails(prescription)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-semibold text-[#0F766E] bg-[#CCFBF1]/50 hover:bg-[#CCFBF1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            View Details
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
