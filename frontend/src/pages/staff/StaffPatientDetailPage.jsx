import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffPatientsData } from '../../data/staffMockData';
import { PatientStatusBadge } from '../../components/staff/patients/PatientStatusBadge';
import { PatientFormModal } from '../../components/staff/patients/PatientFormModal';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  Calendar,
  Building2,
  Clock,
  ListOrdered,
  CalendarDays,
  Edit3,
  CheckCircle2,
  FileText,
  UserX,
  ShieldCheck,
  Droplet,
} from 'lucide-react';

export const StaffPatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve patient from initial mock data or fallback
  const [patient, setPatient] = useState(() => {
    return initialStaffPatientsData.find(
      (p) => String(p.id).toLowerCase() === String(id).toLowerCase()
    );
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEditSubmit = (updatedData) => {
    setPatient((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast('Patient details updated successfully.');
  };

  if (!patient) {
    return (
      <StaffLayout
        title="Patient Record"
        subtitle="Review demographic details and admission status."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mx-auto">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#0F172A]">Patient Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested patient ID ({id}) could not be located in the current hospital registry.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/patients')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Patients Directory</span>
              </button>
            </div>
          </div>
        </div>
      </StaffLayout>
    );
  }

  const fullName = patient.name || `${patient.firstName} ${patient.lastName}`;
  const isWaiting = (patient.status || '').toLowerCase() === 'waiting';

  return (
    <StaffLayout
      title="Patient Details"
      subtitle={`Electronic health demographic record for ${patient.id}`}
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

        {/* ── Top Action Navigation Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={() => navigate('/staff/patients')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-slate-50 hover:text-[#0F766E] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#0F766E]" />
            <span>Back to Patients</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Queue Connection Button if Waiting */}
            {isWaiting && (
              <button
                type="button"
                onClick={() => navigate('/staff/queue')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <ListOrdered className="h-4 w-4" />
                <span>View in Queue</span>
              </button>
            )}

            {/* Appointment Connection Button */}
            <button
              type="button"
              onClick={() => navigate('/staff/appointments')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0F766E]/30 bg-[#CCFBF1]/40 text-[#0F766E] hover:bg-[#CCFBF1] text-xs font-bold transition-all cursor-pointer"
            >
              <CalendarDays className="h-4 w-4" />
              <span>View Appointment</span>
            </button>

            {/* Edit Patient Button */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Patient</span>
            </button>
          </div>
        </div>

        {/* ── 1. Hero Patient Profile Card ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-xl sm:text-2xl shadow-inner flex-shrink-0">
                {patient.firstName?.charAt(0) || 'P'}
                {patient.lastName?.charAt(0) || ''}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    {fullName}
                  </h1>
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                    {patient.id}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#64748B] mt-1">
                  <span>{patient.age} years old</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    <Droplet className="h-3 w-3 text-rose-500" />
                    Blood: {patient.bloodGroup || 'O+'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Today's Queue Status
              </span>
              <PatientStatusBadge status={patient.status} />
            </div>
          </div>

          {/* Quick Demographics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Phone Number</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-[#0F172A]">
                {patient.phone}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Mail className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Email Address</span>
              </div>
              <div className="font-medium text-xs sm:text-sm text-[#0F172A] truncate">
                {patient.email || 'None registered'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Calendar className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Date of Birth</span>
              </div>
              <div className="font-medium text-xs sm:text-sm text-[#0F172A]">
                {patient.dob || 'Not provided'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Registered Date</span>
              </div>
              <div className="font-medium text-xs sm:text-sm text-[#0F172A]">
                {patient.registeredDate || '15 Jan 2024'}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Two Column Grid: Today's Admission + Contact & Emergency ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Today's Visit & Consultation Status */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  OPD & Visit Assignment
                </h2>
                <p className="text-[11px] text-[#64748B]">Current department and physician details</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Assigned Department</span>
                <span className="font-bold text-[#0F172A]">{patient.department}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Consulting Doctor</span>
                <span className="font-bold text-[#0F766E]">{patient.doctor}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Room / Suite</span>
                <span className="font-mono font-semibold text-[#0F172A]">{patient.room || 'Room 102'}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-[#64748B]">Token Number</span>
                <span className="font-mono font-extrabold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                  {patient.token || 'A-021'}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-[#64748B]">Scheduled Slot</span>
                <div className="flex items-center gap-1 font-semibold text-[#0F172A]">
                  <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
                  <span>{patient.todayAppointment || '10:00 AM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Residential & Emergency Contact */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  Address & Emergency Contact
                </h2>
                <p className="text-[11px] text-[#64748B]">Primary residential and next-of-kin records</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-xs text-[#64748B] flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                  Residential Address:
                </span>
                <p className="text-xs font-semibold text-[#0F172A] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {patient.address || 'No address registered'}
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-xs text-[#64748B] flex items-center gap-1">
                  <HeartHandshake className="h-3.5 w-3.5 text-[#0F766E]" />
                  Emergency Next-of-Kin:
                </span>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-0.5">
                  <div className="font-bold text-xs text-[#0F172A]">
                    {patient.emergencyContactName || 'Sunita Kumar'} (
                    {patient.emergencyRelation || 'Spouse'})
                  </div>
                  <div className="font-mono text-xs text-[#64748B]">
                    Phone: {patient.emergencyContactPhone || '9876543299'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Medical Notes & Prior History ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
            <FileText className="h-4 w-4 text-[#0F766E]" />
            <h3 className="text-sm font-bold text-[#0F172A]">Intake Notes & Clinical Summary</h3>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">
            {patient.notes ||
              'Patient registered at central OPD counter. Standard vitals and triage screening required prior to doctor examination.'}
          </p>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      <PatientFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        patientToEdit={patient}
      />
    </StaffLayout>
  );
};

export default StaffPatientDetailPage;
