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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Current Visit Prescription
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] w-fit"
        >
          <span>View My Journey</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Visit Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <Building2 className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Department</span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">{v.department}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <UserCheck className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Attending Doctor</span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">{v.doctor}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <Calendar className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block">Visit Date</span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">{v.visitDate}</p>
          </div>
        </div>
      </div>

      {/* Workflow Progress Stepper */}
      <div className="pt-5">
        <p className="text-xs font-semibold text-[#0F172A] mb-4">Prescription Workflow</p>

        {/* Mobile: vertical stacked list */}
        <div className="flex flex-col gap-2 sm:hidden">
          {v.stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[stage.id] || Pill;
            const isDone    = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div key={stage.id} className={`flex items-center gap-3 p-3 rounded-xl border ${
                isDone    ? 'bg-[#CCFBF1]/30 border-[#0F766E]/30' :
                isCurrent ? 'bg-white border-[#0F766E] ring-2 ring-[#0F766E]/10 shadow-xs' :
                            'bg-[#F8FAFC] border-[#E2E8F0] opacity-70'
              }`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 flex-shrink-0 ${
                  isDone    ? 'bg-[#0F766E] border-[#0F766E] text-white' :
                  isCurrent ? 'bg-white border-[#0F766E] text-[#0F766E]' :
                              'bg-white border-[#E2E8F0] text-[#CBD5E1]'
                }`}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${
                    isCurrent ? 'text-[#0F766E]' : isDone ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                  }`}>{idx + 1}. {stage.label}</p>
                  <p className={`text-[11px] ${isCurrent ? 'text-[#D97706] font-medium' : 'text-[#94A3B8]'}`}>
                    {isDone ? `✓ ${stage.time}` : stage.time || 'Pending'}
                  </p>
                </div>
                {isCurrent && <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-pulse flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Desktop: horizontal grid */}
        <div className="hidden sm:block relative">
          <div className="absolute top-5 h-0.5 bg-[#E2E8F0] z-0" style={{ left: '10%', right: '10%' }} />
          <div className="grid grid-cols-4 gap-3 relative z-10">
            {v.stages.map((stage, idx) => {
              const Icon = STAGE_ICONS[stage.id] || Pill;
              const isDone    = stage.status === 'completed';
              const isCurrent = stage.status === 'current';

              return (
                <div key={stage.id} className="flex flex-col items-center gap-2 text-center">
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    isDone    ? 'bg-[#0F766E] border-[#0F766E] text-white' :
                    isCurrent ? 'bg-white border-[#0F766E] text-[#0F766E] shadow-md ring-4 ring-[#0F766E]/15' :
                                'bg-white border-[#E2E8F0] text-[#CBD5E1]'
                  }`}>
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                    {isCurrent && <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#0F766E] border-2 border-white" />}
                  </div>
                  <div>
                    <p className={`text-[11px] font-semibold leading-snug ${
                      isDone ? 'text-[#0F766E]' : isCurrent ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'
                    }`}>{stage.label}</p>
                    <p className={`text-[10px] mt-0.5 ${isCurrent ? 'text-[#D97706] font-medium' : 'text-[#94A3B8]'}`}>
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
