import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  CheckCircle2,
  Activity,
  Coffee,
  UserX,
  ArrowRight,
  MapPin,
  Users,
} from 'lucide-react';
import {
  doctorAvailabilitySummary,
  sampleDoctorsList,
} from '../../../data/adminMockData';

const getDoctorStatusBadge = (status) => {
  switch (status) {
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
          <Activity className="h-3 w-3 animate-pulse" />
          In Consultation
        </span>
      );
    case 'On Break':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Coffee className="h-3 w-3" />
          On Break
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-[#64748B] border border-slate-200">
          <UserX className="h-3 w-3" />
          Unavailable
        </span>
      );
  }
};

export const DoctorAvailabilityCard = () => {
  const { total, available, inConsultation, onBreak, unavailable } =
    doctorAvailabilitySummary;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Stethoscope className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Doctor Availability
              </h3>
              <p className="text-xs text-[#64748B]">
                Duty status & consultation room monitoring
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            {total} Total Registered
          </span>
        </div>

        {/* Status Distribution Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center">
            <div className="text-lg font-bold text-emerald-800 leading-none">
              {available}
            </div>
            <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">
              Available
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#CCFBF1]/60 border border-[#0F766E]/20 text-center">
            <div className="text-lg font-bold text-[#0F766E] leading-none">
              {inConsultation}
            </div>
            <div className="text-[10px] font-semibold text-[#0F766E] mt-0.5">
              In Consultation
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-center">
            <div className="text-lg font-bold text-amber-800 leading-none">
              {onBreak}
            </div>
            <div className="text-[10px] font-semibold text-amber-700 mt-0.5">
              On Break
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
            <div className="text-lg font-bold text-slate-700 leading-none">
              {unavailable}
            </div>
            <div className="text-[10px] font-semibold text-slate-600 mt-0.5">
              Off Duty
            </div>
          </div>
        </div>

        {/* Doctor List */}
        <div className="space-y-2.5">
          {sampleDoctorsList.map((doc) => (
            <div
              key={doc.id}
              className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-[#E2E8F0] transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-xl bg-[#0F766E] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {doc.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#0F172A] truncate">
                    {doc.name}
                  </div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 truncate">
                    <span>{doc.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-slate-500">
                      <MapPin className="h-2.5 w-2.5" />
                      {doc.room}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {doc.waitingPatients > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                    <Users className="h-3 w-3 text-[#94A3B8]" />
                    {doc.waitingPatients} waiting
                  </span>
                )}
                {getDoctorStatusBadge(doc.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-xs text-[#64748B]">
          12 doctors scheduled for today
        </span>
        <Link
          to="/admin/doctors"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          Manage Doctors
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorAvailabilityCard;
