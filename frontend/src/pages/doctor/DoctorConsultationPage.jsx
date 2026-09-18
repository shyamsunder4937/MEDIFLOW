import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorPatients, doctorQueueData } from '../../data/doctorMockData';
import { ConsultationPatientHeader } from '../../components/doctor/ConsultationPatientHeader';
import { ClinicalNotes } from '../../components/doctor/ClinicalNotes';
import { InvestigationRequests } from '../../components/doctor/InvestigationRequests';
import { PrescriptionSection } from '../../components/doctor/PrescriptionSection';
import { ConsultationWorkflow } from '../../components/doctor/ConsultationWorkflow';
import { PatientLabResults } from '../../components/doctor/PatientLabResults';
import { CompleteConsultationModal } from '../../components/doctor/CompleteConsultationModal';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Info,
  UserX,
} from 'lucide-react';

export const DoctorConsultationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find patient by ID from detailed list or queue list
  const patient =
    doctorPatients.find(
      (p) => String(p.id) === String(id) || String(p.queueNumber) === String(id)
    ) ||
    doctorQueueData.find(
      (p) => String(p.id) === String(id) || String(p.queueNumber) === String(id)
    );

  // Local state for clinical inputs
  const [notes, setNotes] = useState('');
  const [selectedTests, setSelectedTests] = useState(['CBC', 'Blood Glucose']);
  const [medicines, setMedicines] = useState([
    {
      id: 'demo_med_1',
      name: 'Paracetamol',
      dosage: '500 mg',
      frequency: 'Twice daily',
      duration: '5 days',
    },
  ]);

  // UI status feedback states
  const [draftMessage, setDraftMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // If patient not found
  if (!patient) {
    return (
      <DoctorLayout
        title="Patient Not Found"
        subtitle="The requested patient could not be found."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mx-auto">
              <UserX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#0F172A]">Patient Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested patient could not be found. Please check the queue and try again.
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

  // Handle Save Draft
  const handleSaveDraft = () => {
    setDraftMessage('Consultation draft saved.');
    setTimeout(() => {
      setDraftMessage('');
    }, 4000);
  };

  // Handle Complete Confirmation
  const handleConfirmComplete = () => {
    setIsModalOpen(false);
    setIsCompleted(true);
  };

  return (
    <DoctorLayout
      title="Consultation"
      subtitle="Review patient information and record today's consultation."
    >
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Completion Success Banner */}
        {isCompleted && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white flex-shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-emerald-950">
                  Consultation completed successfully.
                </h2>
                <p className="text-xs text-emerald-800 mt-0.5">
                  The clinical record and orders for {patient.name} have been finalized and routed to OPD coordination.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/doctor/queue')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex-shrink-0"
            >
              <span>Return to Queue</span>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </button>
          </div>
        )}

        {/* Draft Saved Toast Banner */}
        {draftMessage && (
          <div
            className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-150"
            role="status"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
              <span>{draftMessage}</span>
            </div>
            <span className="text-[10px] text-teal-700 font-normal">Local storage cache updated</span>
          </div>
        )}

        {/* ── 1. Patient Header Card ── */}
        <section aria-label="Patient Overview">
          <ConsultationPatientHeader patient={patient} />
        </section>

        {/* ── 2. Main Consultation Workspace (2-Column Desktop Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols on Large Screens): Clinical Notes, Investigations, Prescription */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clinical Notes Card */}
            <section aria-label="Clinical Notes">
              <ClinicalNotes notes={notes} setNotes={setNotes} />
            </section>

            {/* Investigation Requests Card */}
            <section aria-label="Investigation Requests">
              <InvestigationRequests
                selectedTests={selectedTests}
                setSelectedTests={setSelectedTests}
                onRequestSuccess={() => {
                  setDraftMessage('Lab tests selected successfully.');
                  setTimeout(() => setDraftMessage(''), 3000);
                }}
              />
            </section>

            {/* Prescription Form & List Card */}
            <section aria-label="Prescription Form and List">
              <PrescriptionSection
                medicines={medicines}
                setMedicines={setMedicines}
              />
            </section>
          </div>

          {/* Right Column (1 Col on Large Screens): Workflow & Previous Lab Results */}
          <div className="space-y-6">
            {/* Patient Workflow Tracker */}
            <section aria-label="Workflow Stages">
              <ConsultationWorkflow isCompleted={isCompleted} />
            </section>

            {/* Existing Lab Results */}
            <section aria-label="Previous Lab Results">
              <PatientLabResults labResults={patient.labResults || []} />
            </section>
          </div>
        </div>

        {/* ── 3. Bottom Consultation Actions ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64748B] text-center sm:text-left">
            <span className="font-semibold text-[#0F172A] block sm:inline">
              Consultation Status:
            </span>{' '}
            {isCompleted ? (
              <span className="text-emerald-700 font-bold">Session Completed</span>
            ) : (
              <span>In Progress • Draft changes kept in local state</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              <Save className="h-4 w-4 text-[#0F766E]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={isCompleted}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                isCompleted
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete Consultation</span>
            </button>
          </div>
        </div>

        {/* ── 4. Demo Disclaimer ── */}
        <footer className="pt-2 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Demo interface — consultation data is not connected to a real medical system.</span>
          </div>
        </footer>
      </div>

      {/* Confirmation Modal */}
      <CompleteConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmComplete}
        patientName={patient.name}
      />
    </DoctorLayout>
  );
};

export default DoctorConsultationPage;
