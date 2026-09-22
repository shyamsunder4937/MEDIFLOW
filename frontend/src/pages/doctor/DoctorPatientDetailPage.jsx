import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorPatients } from '../../data/doctorMockData';
import { PatientInfoCard } from '../../components/doctor/PatientInfoCard';
import { WorkflowStatusCard } from '../../components/doctor/WorkflowStatusCard';
import { VisitInformation } from '../../components/doctor/VisitInformation';
import { PreviousVisits } from '../../components/doctor/PreviousVisits';
import { PatientLabResults } from '../../components/doctor/PatientLabResults';
import { ArrowLeft, Stethoscope, ChevronRight, UserX, Info } from 'lucide-react';

export const DoctorPatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find patient by ID (supports string or number comparison)
  const patient = doctorPatients.find(
    (p) => String(p.id) === String(id) || String(p.queueNumber) === String(id)
  );

  // If patient ID does not exist in mock data
  if (!patient) {
    return (
      <DoctorLayout
        title="Patient Details"
        subtitle="Clinical record review"
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-2xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100 mx-auto">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-xl font-bold text-[#17221B]">Patient Record Not Found</h1>
              <p className="text-xs text-[#64748B] max-w-md mx-auto">
                The requested patient record (ID #{id}) could not be located in today's clinical queue.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/doctor/queue')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Doctor Queue</span>
              </button>
            </div>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout
      title="Patient Details"
      subtitle="Review patient information and visit workflow before consultation."
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
        {/* ── Page Header & Top Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] mb-1">
              <button
                type="button"
                onClick={() => navigate('/doctor/queue')}
                className="hover:text-[#15803D] transition-colors cursor-pointer"
              >
                Doctor Queue
              </button>
              <span>/</span>
              <span className="text-[#17221B] font-semibold">Patient Record #{patient.queueNo || patient.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Patient Details
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Clinical record, triage vitals, and encounter workflow for pre-consultation review
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/doctor/queue')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#17221B] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <ArrowLeft className="h-4 w-4 text-[#64748B]" />
              <span>Back to Queue</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Start Consultation</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ── 1. PATIENT IDENTITY: Clean Hospital Header ── */}
        <section aria-label="Patient Identity">
          <PatientInfoCard patient={patient} />
        </section>

        {/* ── 2. CURRENT WORKFLOW STATUS: Real-Time Progression ── */}
        <section aria-label="Workflow Status">
          <WorkflowStatusCard patient={patient} />
        </section>

        {/* ── 3. VISIT INFORMATION & PREVIOUS VISITS: Two-Column Clinical Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <section aria-label="Current Visit Information">
            <VisitInformation patient={patient} />
          </section>

          <section aria-label="Previous Visits History">
            <PreviousVisits previousVisits={patient.previousVisits} />
          </section>
        </div>

        {/* ── 4. CLINICAL INFORMATION: Existing Diagnostic Lab Results ── */}
        <section aria-label="Diagnostic Lab Results">
          <PatientLabResults labResults={patient.labResults} />
        </section>

        {/* ── 5. Bottom Actions & Medical Data Disclaimer ── */}
        <div className="pt-2 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-bold text-[#17221B]">Ready for Consultation?</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Proceed to the active clinical consultation suite to record examination notes, write prescriptions, and order tests.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Open Consultation Suite</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
              <Info className="h-3.5 w-3.5 text-[#15803D]" />
              <span>MediFlow Clinical Suite • Prototype demonstration records only</span>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorPatientDetailPage;
