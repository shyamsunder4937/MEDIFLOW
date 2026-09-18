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
        title="Patient Not Found"
        subtitle="The requested patient record is unavailable."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mx-auto">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#0F172A]">Patient Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested patient could not be found or has not been registered in today's queue.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/doctor/queue')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Queue</span>
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
      <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
        {/* ── Top Bar: Back to Queue & Start Consultation ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/doctor/queue')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-slate-50 hover:text-[#0F766E] transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <ArrowLeft className="h-4 w-4 text-[#0F766E]" />
            <span>Back to Queue</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Start Consultation</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ── 1. Patient Information Card ── */}
        <section aria-label="Patient Information">
          <PatientInfoCard patient={patient} />
        </section>

        {/* ── 2. Current Workflow Status Card ── */}
        <section aria-label="Workflow Status">
          <WorkflowStatusCard patient={patient} />
        </section>

        {/* ── 3. Two-Column Grid: Visit Information + Previous Visits ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section aria-label="Visit Information">
            <VisitInformation patient={patient} />
          </section>

          <section aria-label="Previous Visits">
            <PreviousVisits previousVisits={patient.previousVisits} />
          </section>
        </div>

        {/* ── 4. Existing Lab Results Section ── */}
        <section aria-label="Existing Lab Results">
          <PatientLabResults labResults={patient.labResults} />
        </section>

        {/* ── 5. Medical Data Disclaimer ── */}
        <footer className="pt-2 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Demo data for demonstration purposes only.</span>
          </div>
        </footer>
      </div>
    </DoctorLayout>
  );
};

export default DoctorPatientDetailPage;
