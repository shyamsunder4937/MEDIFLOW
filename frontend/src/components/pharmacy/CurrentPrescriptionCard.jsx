import React from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  UserCheck,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  FileText,
  ShoppingBag,
} from 'lucide-react';

const STAGE_ICONS = {
  consultation: Stethoscope,
  prescription: FileText,
  pharmacy:    Pill,
  pickup:      ShoppingBag,
};

export const CurrentPrescriptionCard = ({ visit }) => {
  const v = visit || {
    department: 'General Medicine',
    doctor: 'Dr. Arun Kumar',
    visitDate: '18 September 2026',
    prescriptionStatus: 'Ready for Pharmacy',
    stages: [
      { id: 'consultation', label: 'Doctor Consultation', status: 'completed', time: '11:00 AM' },
      { id: 'prescription', label: 'Prescription',        status: 'completed', time: '11:42 AM' },
      { id: 'pharmacy',     label: 'Pharmacy',            status: 'current',   time: 'Now'      },
      { id: 'pickup',       label: 'Pickup',              status: 'upcoming',  time: 'Pending'  },
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">
                Current Visit Prescription
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
                {v.prescriptionStatus}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Outpatient Department • General Medicine
            </p>
          </div>
        </div>

        <Link
          to="/patient/journey"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] w-fit"
        >
          <span>View My Journey</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Visit Details Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <Building2 className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">Department</span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">{v.department}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <UserCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">Attending Doctor</span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">{v.doctor}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <Calendar className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">Visit Date</span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">{v.visitDate}</p>
          </div>
        </div>
      </div>

      {/* ── Workflow Progress Stepper ── */}
      <div className="pt-4">
        <p className="text-xs font-bold text-[#17221B] mb-3">Prescription Workflow</p>

        {/* Mobile: vertical stacked list */}
        <div className="flex flex-col gap-2 sm:hidden">
          {v.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[stage.id] || Pill;
            const isDone    = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                  isDone
                    ? 'bg-[#F0FDF4] border-[#15803D]/25'
                    : isCurrent
                    ? 'bg-white border-[#15803D] shadow-2xs ring-2 ring-[#15803D]/10'
                    : 'bg-slate-50 border-[#E2E8F0] opacity-70'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0 ${
                    isDone
                      ? 'bg-[#15803D] text-white'
                      : isCurrent
                      ? 'bg-[#15803D] text-white'
                      : 'bg-slate-100 text-[#94A3B8] border border-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-[#15803D]' : isDone ? 'text-[#17221B]' : 'text-[#64748B]'
                    }`}
                  >
                    {idx + 1}. {stage.label}
                  </p>
                  <p className={`text-[10px] ${isCurrent ? 'text-amber-800 font-medium' : 'text-[#64748B]'}`}>
                    {isDone ? `✓ ${stage.time}` : stage.time || 'Pending'}
                  </p>
                </div>
                {isCurrent && <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Desktop: horizontal grid */}
        <div className="hidden sm:block relative">
          <div className="absolute top-4.5 h-0.5 bg-[#E2E8F0] z-0" style={{ left: '12%', right: '12%' }} />
          <div className="grid grid-cols-4 gap-3 relative z-10">
            {v.stages.map((stage) => {
              const Icon = STAGE_ICONS[stage.id] || Pill;
              const isDone    = stage.status === 'completed';
              const isCurrent = stage.status === 'current';

              return (
                <div key={stage.id} className="flex flex-col items-center gap-1.5 text-center">
                  <div
                    className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                      isDone
                        ? 'bg-[#15803D] border-[#15803D] text-white'
                        : isCurrent
                        ? 'bg-[#15803D] border-[#15803D] text-white shadow-xs ring-3 ring-[#F0FDF4]'
                        : 'bg-white border-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold leading-snug ${
                        isDone ? 'text-[#15803D]' : isCurrent ? 'text-[#17221B]' : 'text-[#64748B]'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        isCurrent ? 'text-[#15803D] font-bold' : 'text-[#64748B]'
                      }`}
                    >
                      {isDone ? `✓ ${stage.time}` : isCurrent ? stage.time : stage.time || 'Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

