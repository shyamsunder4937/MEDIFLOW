import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, DoorOpen, Users } from 'lucide-react';
import { staffDoctorsAvailability } from '../../data/staffMockData';

export const DoctorStatusBadge = ({ status }) => {
  switch (status) {
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Available
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          In Consultation
        </span>
      );
    case 'On Break':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          On Break
        </span>
      );
    case 'Unavailable':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
          Unavailable
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-[#64748B]">
          {status}
        </span>
      );
  }
};

export const StaffDoctorAvailability = ({ doctors = staffDoctorsAvailability }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
            <Stethoscope className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Doctor Availability</h2>
            <p className="text-xs text-[#64748B]">
              Real-time room occupancy and physician status
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-[#115E59] hover:underline transition-colors cursor-pointer"
        >
          <span>View All Doctors</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Doctor Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-[#0F766E]/40 hover:bg-white transition-all space-y-2.5"
          >
            {/* Top row: Avatar initial, Name and Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex-shrink-0">
                  {doc.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F172A]">{doc.name}</div>
                  <div className="text-[11px] text-[#64748B]">{doc.specialty}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <DoctorStatusBadge status={doc.status} />
              <span className="text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-100 flex items-center gap-1">
                <DoorOpen className="h-3 w-3" />
                {doc.room}
              </span>
            </div>

            {/* Bottom info: Queue count */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 text-[#94A3B8]" />
                <span>Queue: <strong className="text-[#0F172A]">{doc.queueCount} patients</strong></span>
              </span>
              <span className="text-[10px] text-[#94A3B8]">{doc.floor.split(',')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffDoctorAvailability;
