import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, DoorOpen, Users } from 'lucide-react';
import { staffDoctorsAvailability } from '../../data/staffMockData';

export const DoctorStatusBadge = ({ status }) => {
  switch (status) {
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          Available
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          In Consultation
        </span>
      );
    case 'On Break':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          On Break
        </span>
      );
    case 'Unavailable':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
          Unavailable
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-[#64748B] border border-slate-200">
          {status}
        </span>
      );
  }
};

export const StaffDoctorAvailability = ({ doctors = staffDoctorsAvailability }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Section Header ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Doctor Availability</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] text-[10px] font-bold border border-[#DCFCE7]">
                {doctors.filter((d) => d.status === 'Available').length} Available
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Real-time room occupancy and physician status
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>View All Doctors</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Doctor Cards Grid ── */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-[#E2E8F0] hover:border-[#15803D]/30 hover:bg-white transition-all space-y-2.5"
          >
            {/* Top row: Avatar initial, Name and Specialty */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#15803D] border border-[#E2E8F0] font-bold text-xs flex-shrink-0">
                  {doc.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#17221B] truncate">{doc.name}</div>
                  <div className="text-[11px] text-[#64748B] truncate">{doc.specialty}</div>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-[#17221B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0] flex items-center gap-1 flex-shrink-0">
                <DoorOpen className="h-3 w-3 text-[#64748B]" />
                {doc.room}
              </span>
            </div>

            {/* Status pill & shift details */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <DoctorStatusBadge status={doc.status} />
              <span className="text-[10px] text-[#94A3B8] truncate">{doc.shift.split('–')[0].trim()}</span>
            </div>

            {/* Bottom info: Queue count & Floor */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 text-[#94A3B8]" />
                <span>Queue: <strong className="text-[#17221B]">{doc.queueCount}</strong></span>
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

