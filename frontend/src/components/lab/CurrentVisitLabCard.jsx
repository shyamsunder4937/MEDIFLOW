import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  UserCheck,
  Building2,
  ArrowRight,
  Stethoscope,
  FlaskConical,
  ClipboardCheck,
} from 'lucide-react';

export const CurrentVisitLabCard = ({ currentVisit }) => {
  const visit = currentVisit || {
    department: 'General Medicine',
    doctor: 'Dr. Arun Kumar',
    visitDate: 'Today, 18 September 2026',
    status: 'Pending',
    description: 'Your doctor may request laboratory tests during your consultation.',
  };

  const stages = [
    {
      id: 'consultation',
      label: 'Consultation',
      icon: Stethoscope,
      status: 'current',
      subtext: 'In Progress (Token #07)',
    },
    {
      id: 'laboratory',
      label: 'Laboratory',
      icon: FlaskConical,
      status: 'pending',
      subtext: 'Awaiting Doctor Order',
    },
    {
      id: 'review',
      label: 'Doctor Review',
      icon: ClipboardCheck,
      status: 'upcoming',
      subtext: 'Post-test Evaluation',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Top Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">
                Current Visit Lab Status
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                Lab Status: {visit.status}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Outpatient Department • Token #07
            </p>
          </div>
        </div>

        <Link
          to="/patient/journey"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <span>View My Journey</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Visit Meta Information Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <Building2 className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">
              Department
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">
              {visit.department}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <UserCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">
              Attending Doctor
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">
              {visit.doctor}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <Calendar className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">
              Visit Schedule
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#17221B] truncate mt-0.5">
              {visit.visitDate}
            </p>
          </div>
        </div>
      </div>

      {/* ── Description & Stepper ── */}
      <div className="pt-4 space-y-3.5">
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          {visit.description}
        </p>

        {/* Stepper: Consultation → Laboratory → Doctor Review */}
        <div className="bg-slate-50 rounded-lg border border-[#E2E8F0] p-3.5">
          <div className="text-xs font-semibold text-[#17221B] mb-2.5 flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold">Clinical Workflow Stage</span>
            <span className="text-[11px] font-semibold text-[#15803D]">Active: Consultation</span>
          </div>

          {/* Desktop & Tablet: 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCurrent = stage.status === 'current';
              const isPending = stage.status === 'pending';
              return (
                <div
                  key={stage.id}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-[#F0FDF4] border-[#15803D]/40 shadow-2xs'
                      : isPending
                      ? 'bg-white border-amber-200'
                      : 'bg-white/70 border-[#E2E8F0] opacity-75'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                      isCurrent
                        ? 'bg-[#15803D] text-white'
                        : isPending
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-[#94A3B8]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p
                        className={`text-xs font-bold truncate ${
                          isCurrent ? 'text-[#15803D]' : isPending ? 'text-amber-800' : 'text-[#64748B]'
                        }`}
                      >
                        {idx + 1}. {stage.label}
                      </p>
                    </div>
                    <p className="text-[10px] text-[#64748B] truncate mt-0.5">{stage.subtext}</p>
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

