import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  UserCheck,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2,
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
      status: 'current', // current
      subtext: 'In Progress (Token #07)',
    },
    {
      id: 'laboratory',
      label: 'Laboratory',
      icon: FlaskConical,
      status: 'pending', // pending
      subtext: 'Awaiting Doctor Order',
    },
    {
      id: 'review',
      label: 'Doctor Review',
      icon: ClipboardCheck,
      status: 'upcoming', // upcoming
      subtext: 'Post-test Evaluation',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 transition-shadow duration-200 hover:shadow-md">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Current Visit
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <span>View My Journey</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Visit Meta Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <Building2 className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-[#64748B] block uppercase tracking-wider">
              Department
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">
              {visit.department}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <UserCheck className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-[#64748B] block uppercase tracking-wider">
              Attending Doctor
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">
              {visit.doctor}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
          <Calendar className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[11px] font-medium text-[#64748B] block uppercase tracking-wider">
              Visit Schedule
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] truncate">
              {visit.visitDate}
            </p>
          </div>
        </div>
      </div>

      {/* Description & Simple Progress Indicator */}
      <div className="pt-5 space-y-4">
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          {visit.description}
        </p>

        {/* Stepper: Consultation → Laboratory → Doctor Review */}
        <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4">
          <div className="text-xs font-semibold text-[#0F172A] mb-3 flex items-center justify-between flex-wrap gap-2">
            <span>Clinical Flow</span>
            <span className="text-[11px] font-medium text-[#0F766E]">Current Stage: Consultation</span>
          </div>

          {/* Mobile: vertical list */}
          <div className="flex flex-col gap-2 md:hidden">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCurrent = stage.status === 'current';
              const isPending = stage.status === 'pending';
              const isUpcoming = stage.status === 'upcoming';
              return (
                <div key={stage.id} className={`flex items-center gap-3 p-3 rounded-xl border ${
                  isCurrent  ? 'bg-white border-[#0F766E] ring-2 ring-[#0F766E]/10 shadow-xs' :
                  isPending  ? 'bg-amber-50/50 border-amber-200/80' :
                               'bg-[#F8FAFC] border-[#E2E8F0] opacity-70'
                }`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                    isCurrent ? 'bg-[#0F766E] text-white' : isPending ? 'bg-amber-100 text-[#D97706]' : 'bg-slate-100 text-[#94A3B8]'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-[#0F766E]' : isPending ? 'text-[#B45309]' : 'text-[#64748B]'}`}>
                      {idx + 1}. {stage.label}
                    </p>
                    <p className="text-[11px] text-[#64748B]">{stage.subtext}</p>
                  </div>
                  {isCurrent && <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-ping flex-shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Desktop: 3-col grid */}
          <div className="hidden md:grid grid-cols-3 gap-3">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCurrent = stage.status === 'current';
              const isPending = stage.status === 'pending';
              return (
                <div key={stage.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isCurrent  ? 'bg-white border-[#0F766E] shadow-xs ring-2 ring-[#0F766E]/15' :
                  isPending  ? 'bg-amber-50/50 border-amber-200/80' :
                               'bg-white/60 border-[#E2E8F0] opacity-80'
                }`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${
                    isCurrent ? 'bg-[#0F766E] text-white' : isPending ? 'bg-amber-100 text-[#D97706]' : 'bg-slate-100 text-[#94A3B8]'
                  }`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-xs font-bold truncate ${
                        isCurrent ? 'text-[#0F766E]' : isPending ? 'text-[#B45309]' : 'text-[#64748B]'
                      }`}>{idx + 1}. {stage.label}</p>
                      {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E] animate-ping" />}
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
