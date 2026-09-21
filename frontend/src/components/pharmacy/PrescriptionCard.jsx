import React from 'react';
import {
  Pill,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  Hash,
} from 'lucide-react';

const STATUS_CONFIG = {
  'Ready for Pickup': {
    badge: 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/20',
    icon: CheckCircle2,
    iconClass: 'text-[#15803D]',
  },
  Processing: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Clock,
    iconClass: 'text-amber-700',
  },
  Completed: {
    badge: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
    icon: CheckCircle2,
    iconClass: 'text-[#475569]',
  },
};

export const PrescriptionCard = ({ prescription, onViewDetails }) => {
  const cfg = STATUS_CONFIG[prescription.status] || STATUS_CONFIG['Processing'];
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:shadow-sm transition-all overflow-hidden p-4 sm:p-5">
      {/* Card title row */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex-shrink-0">
            <Pill className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-[#17221B] leading-snug truncate">
              {prescription.medicine}
            </h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug truncate">
              {prescription.genericName} · {prescription.category}
            </p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex-shrink-0 ${cfg.badge}`}>
          <StatusIcon className={`h-3 w-3 ${cfg.iconClass}`} />
          <span>{prescription.status}</span>
        </span>
      </div>

      {/* Dosage Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3.5">
        {[
          { label: 'Dosage',    value: prescription.dosage },
          { label: 'Frequency', value: prescription.frequency },
          { label: 'Duration',  value: prescription.duration },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-50 rounded-lg border border-[#E2E8F0] p-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              {label}
            </p>
            <p className="text-xs font-bold text-[#17221B] mt-0.5 leading-tight truncate">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-mono flex-shrink-0">
            <Hash className="h-3 w-3" />
            <span>{prescription.id}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#64748B] truncate">
            <UserCheck className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
            <span className="truncate">{prescription.prescribedBy}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(prescription)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#15803D] bg-[#F0FDF4] hover:bg-[#15803D] hover:text-white border border-[#15803D]/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

