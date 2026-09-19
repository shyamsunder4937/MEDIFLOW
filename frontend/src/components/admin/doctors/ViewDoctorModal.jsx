import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Stethoscope,
  Mail,
  Phone,
  Building2,
  Clock,
  MapPin,
  Calendar,
  Briefcase,
  Sparkles,
  Edit2,
  Sliders,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { DoctorStatusBadge } from './DoctorStatusBadge';

export const ViewDoctorModal = ({
  doctor,
  isOpen,
  onClose,
  onEdit,
  onManageAvailability,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      aria-labelledby="view-doctor-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold text-sm border border-emerald-200 shadow-xs">
              {doctor.name
                .replace('Dr. ', '')
                .split(' ')
                .map((n) => n[0])
                .join('') || 'DR'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="view-doctor-modal-title"
                  className="text-lg font-bold text-[#0F172A]"
                >
                  {doctor.name}
                </h3>
                <DoctorStatusBadge status={doctor.status} />
              </div>
              <p className="text-xs text-[#64748B] font-mono mt-0.5">
                {doctor.id} • {doctor.specialization}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Phase 1 Mock Notice */}
          <div className="flex items-center justify-between p-3 bg-purple-50/60 border border-purple-100 rounded-xl text-xs text-purple-900">
            <span className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              Mock Data — Phase 1 Doctor Record
            </span>
            <span className="text-[11px] font-medium text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
              Frontend Simulation
            </span>
          </div>

          {/* Primary Doctor Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              Physician & Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Stethoscope className="h-3 w-3" /> Specialization
                </div>
                <div className="font-bold text-[#0F172A]">
                  {doctor.specialization}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" /> Department
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F172A]">
                    {doctor.department}
                  </span>
                  <Link
                    to="/admin/departments"
                    className="text-[11px] font-semibold text-[#0F766E] hover:underline flex items-center gap-0.5"
                  >
                    View Dept <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Briefcase className="h-3 w-3" /> Clinical Experience
                </div>
                <div className="font-bold text-[#0F172A]">
                  {doctor.experience}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> Consultation Room
                </div>
                <div className="font-bold text-[#0F172A]">
                  {doctor.room || 'Room 102 (OPD Block A)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email Address
                </div>
                <div className="font-bold text-[#0F172A] truncate">
                  {doctor.email}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Phone className="h-3 w-3" /> Contact Phone
                </div>
                <div className="font-bold text-[#0F172A]">{doctor.phone}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs sm:col-span-2">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Working Hours & Availability
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#0F172A]">
                    {doctor.availability}
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onManageAvailability(doctor);
                    }}
                    className="text-[11px] font-semibold text-[#0F766E] hover:underline"
                  >
                    Adjust Availability
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule Section */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              Today's Schedule & Clinical Slots
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-2.5">
              {doctor.schedule && doctor.schedule.length > 0 ? (
                doctor.schedule.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {slot.time}
                      </span>
                      <span className="font-semibold text-[#0F172A]">
                        {slot.title}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                      {slot.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      09:00 AM
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      General Consultation
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                      consultation
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      10:00 AM
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      Follow-up Consultation
                    </span>
                    <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      followup
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      11:30 AM
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      New Patient Consultation
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      new_patient
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      01:00 PM
                    </span>
                    <span className="font-semibold text-[#0F172A]">Break</span>
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      break
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      02:00 PM
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      General Consultation
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                      consultation
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2E8F0] bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onManageAvailability(doctor);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0F766E]/30 bg-[#CCFBF1]/50 text-[#0F766E] text-xs font-bold hover:bg-[#CCFBF1] transition-colors cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" />
              Manage Availability
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(doctor);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorModal;
