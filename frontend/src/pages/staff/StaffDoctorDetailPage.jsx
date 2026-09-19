import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffDoctorsData } from '../../data/staffMockData';
import { DoctorStatusBadge } from '../../components/staff/doctors/DoctorStatusBadge';
import { UpdateDoctorStatusModal } from '../../components/staff/doctors/UpdateDoctorStatusModal';
import {
  ArrowLeft,
  Stethoscope,
  Building2,
  DoorOpen,
  Clock,
  Phone,
  Mail,
  Award,
  ListOrdered,
  CalendarDays,
  RefreshCw,
  CheckCircle2,
  UserX,
  ShieldCheck,
} from 'lucide-react';

export const StaffDoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find doctor in initial mock data
  const [doctor, setDoctor] = useState(() => {
    return initialStaffDoctorsData.find(
      (d) => String(d.id).toLowerCase() === String(id).toLowerCase()
    );
  });

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStatus = (doctorId, newStatus) => {
    setDoctor((prev) => ({
      ...prev,
      status: newStatus,
      currentPatient: newStatus === 'Available' || newStatus === 'On Break' || newStatus === 'Unavailable' ? null : prev.currentPatient,
    }));
    showToast(`Doctor availability status updated to ${newStatus}.`);
  };

  if (!doctor) {
    return (
      <StaffLayout
        title="Physician Profile"
        subtitle="Review physician allocation and availability."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mx-auto">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#0F172A]">Physician Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested doctor ID ({id}) was not located in the on-duty roster.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/doctors')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Doctor Roster</span>
              </button>
            </div>
          </div>
        </div>
      </StaffLayout>
    );
  }

  // Get initials
  const getInitials = (name) => {
    if (!name) return 'DR';
    const clean = name.replace(/^Dr\.\s*/i, '').trim();
    const parts = clean.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return clean.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(doctor.name);

  return (
    <StaffLayout
      title="Doctor Profile"
      subtitle={`Physician availability and OPD roster for ${doctor.name}`}
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">
        {/* ── Toast Alert ── */}
        {toastMessage && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-[#0F766E]/20 bg-teal-50 text-[#0F766E] shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5 text-[#0F766E]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Navigation Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={() => navigate('/staff/doctors')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-slate-50 hover:text-[#0F766E] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#0F766E]" />
            <span>Back to Doctors</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View in Queue */}
            <button
              type="button"
              onClick={() => navigate('/staff/queue')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0F766E]/30 bg-[#CCFBF1]/40 text-[#0F766E] hover:bg-[#CCFBF1] text-xs font-bold transition-all cursor-pointer"
            >
              <ListOrdered className="h-4 w-4" />
              <span>View Department Queue</span>
            </button>

            {/* View Schedule */}
            <button
              type="button"
              onClick={() => navigate('/staff/appointments')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#475569] text-xs font-bold transition-all cursor-pointer"
            >
              <CalendarDays className="h-4 w-4" />
              <span>View Appointments</span>
            </button>

            {/* Update Status */}
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Update Status</span>
            </button>
          </div>
        </div>

        {/* ── 1. Hero Doctor Profile Card ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-xl sm:text-2xl shadow-inner flex-shrink-0">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    {doctor.name}
                  </h1>
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                    {doctor.id}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#0F172A]">{doctor.specialization}</span>
                  <span>•</span>
                  <span>{doctor.department}</span>
                  <span>•</span>
                  <span className="font-mono text-[#94A3B8]">{doctor.qualifications}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Roster Status
              </span>
              <DoctorStatusBadge status={doctor.status} />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <DoorOpen className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Consultation Room</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {doctor.room} ({doctor.floor})
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Working Shift</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {doctor.workingHours}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <ListOrdered className="h-3.5 w-3.5 text-[#D97706]" />
                <span>Waiting in Queue</span>
              </div>
              <div className="font-extrabold text-xs sm:text-sm text-[#D97706]">
                {doctor.waitingPatients} patients
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <CalendarDays className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Today's Appointments</span>
              </div>
              <div className="font-extrabold text-xs sm:text-sm text-[#0F766E]">
                {doctor.appointmentsToday} scheduled
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Two Column Grid: Current Consultation + Professional Profile ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Active Consultation Status */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  Active Session & Queue
                </h2>
                <p className="text-[11px] text-[#64748B]">Real-time patient intake and room examination status</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Current Patient</span>
                <span className="font-bold text-[#0F172A]">
                  {doctor.currentPatient || 'None (Suite ready)'}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Department</span>
                <span className="font-bold text-[#0F766E]">{doctor.department}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Room Allocation</span>
                <span className="font-mono font-semibold text-[#0F172A]">{doctor.room}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-[#64748B]">OPD Waiting Count</span>
                <span className="font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {doctor.waitingPatients} patients
                </span>
              </div>
            </div>
          </div>

          {/* Card B: Professional Contact & Credentials */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  Credentials & Contact
                </h2>
                <p className="text-[11px] text-[#64748B]">Hospital internal extensions and background</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0F766E]" /> Internal Counter Phone:
                </span>
                <span className="font-mono font-bold text-[#0F172A]">{doctor.phone}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#0F766E]" /> Official Email:
                </span>
                <span className="font-medium text-[#0F172A]">{doctor.email}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E]" /> Clinical Experience:
                </span>
                <span className="font-semibold text-[#0F172A]">{doctor.experience}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-[#0F766E]" /> Primary Hospital:
                </span>
                <span className="font-medium text-[#0F172A]">MediFlow General (Main OPD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Modal ── */}
      <UpdateDoctorStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        doctor={doctor}
        onUpdateStatus={handleUpdateStatus}
      />
    </StaffLayout>
  );
};

export default StaffDoctorDetailPage;
