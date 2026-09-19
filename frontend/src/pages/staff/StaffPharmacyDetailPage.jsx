import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffPharmacyRequestsData } from '../../data/staffMockData';
import {
  PharmacyStatusBadge,
  PharmacyPriorityBadge,
} from '../../components/staff/pharmacy/PharmacyStatusBadge';
import {
  ArrowLeft,
  Pill,
  User,
  Building2,
  Clock,
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ShieldCheck,
  SearchX,
} from 'lucide-react';

export const StaffPharmacyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find prescription in mock data
  const [pharmacyRequest, setPharmacyRequest] = useState(() => {
    return initialStaffPharmacyRequestsData.find(
      (r) => String(r.id).toLowerCase() === String(id).toLowerCase()
    );
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!pharmacyRequest) {
    return (
      <StaffLayout
        title="Prescription Details"
        subtitle="Review medication fulfillment status."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mx-auto">
              <SearchX className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#0F172A]">Prescription Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested prescription ID ({id}) was not found in active pharmacy queues.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/pharmacy')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Pharmacy Coordination</span>
              </button>
            </div>
          </div>
        </div>
      </StaffLayout>
    );
  }

  // Workflow Handlers
  const handleStartPreparing = () => {
    setPharmacyRequest((prev) => ({
      ...prev,
      status: 'Preparing',
    }));
    showToast(`Prescription ${pharmacyRequest.id} moved to preparing queue.`);
  };

  const handleMarkReady = () => {
    setPharmacyRequest((prev) => ({
      ...prev,
      status: 'Ready',
    }));
    showToast(`Prescription ${pharmacyRequest.id} marked ready for pickup.`);
  };

  const handleMarkDispensed = () => {
    setPharmacyRequest((prev) => ({
      ...prev,
      status: 'Dispensed',
    }));
    showToast(`Medications for ${pharmacyRequest.id} successfully dispensed.`);
  };

  // Workflow Stages
  const stages = [
    { key: 'Pending', label: 'Order Received' },
    { key: 'Preparing', label: 'Packaging & Check' },
    { key: 'Ready', label: 'Staged at Counter' },
    { key: 'Dispensed', label: 'Handed to Patient' },
  ];

  const getStageIndex = (status) => {
    const idx = stages.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIndex = getStageIndex(pharmacyRequest.status);

  return (
    <StaffLayout
      title="Prescription Details"
      subtitle={`Medication fulfillment and packaging status for ${pharmacyRequest.id}`}
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
            onClick={() => navigate('/staff/pharmacy')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-slate-50 hover:text-[#0F766E] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#0F766E]" />
            <span>Back to Pharmacy Coordination</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Patient Link */}
            <button
              type="button"
              onClick={() => navigate(`/staff/patients/${pharmacyRequest.patientId}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0F766E]/30 bg-[#CCFBF1]/40 text-[#0F766E] hover:bg-[#CCFBF1] text-xs font-bold transition-all cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span>View Patient ({pharmacyRequest.patientName})</span>
            </button>

            {/* View Doctor Link */}
            {pharmacyRequest.doctorId && (
              <button
                type="button"
                onClick={() => navigate(`/staff/doctors/${pharmacyRequest.doctorId}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#475569] text-xs font-bold transition-all cursor-pointer"
              >
                <Building2 className="h-4 w-4 text-[#0F766E]" />
                <span>View Doctor ({pharmacyRequest.doctor})</span>
              </button>
            )}

            {/* Print Prescription Slip */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#0F172A] text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#64748B]" />
              <span>Print Rx Slip</span>
            </button>
          </div>
        </div>

        {/* ── 1. Hero Prescription Header ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner flex-shrink-0">
                <Pill className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                    Medication Order
                  </h1>
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                    {pharmacyRequest.id}
                  </span>
                  <PharmacyPriorityBadge priority={pharmacyRequest.priority} />
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#64748B] mt-1">
                  <span className="font-semibold text-[#0F172A]">
                    Patient: {pharmacyRequest.patientName}
                  </span>
                  <span>•</span>
                  <span>Doctor: {pharmacyRequest.doctor}</span>
                  <span>•</span>
                  <span className="font-mono text-[#0F766E]">
                    Counter: {pharmacyRequest.counter}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Current Status
              </span>
              <PharmacyStatusBadge status={pharmacyRequest.status} />
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <User className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Patient Demographics</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {pharmacyRequest.patientName} ({pharmacyRequest.patientAge}y, {pharmacyRequest.patientGender})
              </div>
              <div className="text-[11px] text-[#94A3B8] font-mono">{pharmacyRequest.patientId}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Building2 className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Prescribing Doctor</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {pharmacyRequest.doctor}
              </div>
              <div className="text-[11px] text-[#64748B]">{pharmacyRequest.department}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Pill className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Prescription Items</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {pharmacyRequest.medicines?.length || 0} prescribed medicines
              </div>
              <div className="text-[11px] text-[#64748B]">Staging: {pharmacyRequest.counter}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Order Time</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                {pharmacyRequest.requestedTime} ({pharmacyRequest.requestedDate})
              </div>
              <div className="text-[11px] text-[#0F766E] font-medium">Pharmacist: {pharmacyRequest.pharmacist}</div>
            </div>
          </div>
        </div>

        {/* ── 2. Interactive Workflow Progression Stepper ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Fulfillment Pipeline Status
              </h2>
              <p className="text-xs text-[#64748B]">Real-time dispensation progression tracker</p>
            </div>

            {/* Action Buttons */}
            <div>
              {pharmacyRequest.status === 'Pending' && (
                <button
                  type="button"
                  onClick={handleStartPreparing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Pill className="h-4 w-4" />
                  <span>Start Preparing</span>
                </button>
              )}

              {pharmacyRequest.status === 'Preparing' && (
                <button
                  type="button"
                  onClick={handleMarkReady}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <PackageCheck className="h-4 w-4" />
                  <span>Mark Ready for Pickup</span>
                </button>
              )}

              {pharmacyRequest.status === 'Ready' && (
                <button
                  type="button"
                  onClick={handleMarkDispensed}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark Dispensed</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {stages.map((stage, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.key}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                    isCurrent
                      ? 'bg-[#CCFBF1]/40 border-[#0F766E] shadow-2xs'
                      : isPassed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-slate-50 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E] animate-ping" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-[#0F766E]'
                          : isPassed
                          ? 'text-emerald-900'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {stage.key}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{stage.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Prescribed Medicines Section ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  Prescribed Medicines
                </h2>
                <p className="text-[11px] text-[#64748B]">Medications, dosage strengths, and intake instructions</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              <span>Mock Prescription — Phase 1</span>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-2.5 px-3.5 font-bold">Medicine Name & Strength</th>
                  <th className="py-2.5 px-3.5 font-bold">Dosage Form</th>
                  <th className="py-2.5 px-3.5 font-bold">Quantity</th>
                  <th className="py-2.5 px-3.5 font-bold">Instructions & Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(pharmacyRequest.medicines || []).map((med, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5">
                      <strong className="text-[#0F172A] block">{med.name}</strong>
                      <span className="text-[11px] text-[#0F766E] font-medium">{med.strength}</span>
                    </td>
                    <td className="py-3 px-3.5 text-[#64748B]">
                      {med.form}
                    </td>
                    <td className="py-3 px-3.5 font-bold text-[#0F172A]">
                      {med.quantity}
                    </td>
                    <td className="py-3 px-3.5 text-[#0F172A] font-medium">
                      {med.instructions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              <span>
                Registered Pharmacist:{' '}
                <strong className="text-[#0F172A]">{pharmacyRequest.pharmacist}</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">
              Dispensing Desk: {pharmacyRequest.counter}
            </span>
          </div>
        </div>

        {/* ── 4. Clinical Notes & Instructions ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-3">
          <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
            Physician Clinical Notes & Dispensing Instructions
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-[#0F172A] leading-relaxed">
            {pharmacyRequest.notes || 'No special dispensing warnings indicated on prescription.'}
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffPharmacyDetailPage;
