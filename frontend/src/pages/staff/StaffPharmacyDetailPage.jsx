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
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mx-auto">
              <SearchX className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-base font-bold text-[#17221B]">Prescription Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested prescription ID ({id}) was not found in active pharmacy queues.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/pharmacy')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-semibold hover:bg-[#166534] transition-all cursor-pointer"
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
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5">
        {/* ── Toast Alert ── */}
        {toastMessage && (
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#15803D]/20 bg-[#F0FDF4] text-[#15803D] shadow-xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-xs font-semibold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Navigation Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => navigate('/staff/pharmacy')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#17221B] hover:bg-[#F8FAFC] hover:text-[#15803D] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#15803D]" />
            <span>Back to Pharmacy Coordination</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Patient Link */}
            <button
              type="button"
              onClick={() => navigate(`/staff/patients/${pharmacyRequest.patientId}`)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#15803D]/20 bg-[#F0FDF4] text-[#15803D] hover:bg-[#15803D] hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Patient ({pharmacyRequest.patientName})</span>
            </button>

            {/* View Doctor Link */}
            {pharmacyRequest.doctorId && (
              <button
                type="button"
                onClick={() => navigate(`/staff/doctors/${pharmacyRequest.doctorId}`)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-all cursor-pointer"
              >
                <Building2 className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Doctor ({pharmacyRequest.doctor})</span>
              </button>
            )}

            {/* Print Prescription Slip */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-all cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Print Rx Slip</span>
            </button>
          </div>
        </div>

        {/* ── 1. Requisition Header ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex-shrink-0">
                <Pill className="h-6 w-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-[#17221B] tracking-tight">
                    Medication Order
                  </h1>
                  <span className="font-mono text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
                    {pharmacyRequest.id}
                  </span>
                  <PharmacyPriorityBadge priority={pharmacyRequest.priority} />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mt-1">
                  <span className="font-medium text-[#17221B]">
                    Patient: {pharmacyRequest.patientName}
                  </span>
                  <span>•</span>
                  <span>Doctor: {pharmacyRequest.doctor}</span>
                  <span>•</span>
                  <span className="font-mono text-[#15803D]">
                    Counter: {pharmacyRequest.counter}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Current Status
              </span>
              <PharmacyStatusBadge status={pharmacyRequest.status} />
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <User className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Patient Demographics</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {pharmacyRequest.patientName} ({pharmacyRequest.patientAge}y, {pharmacyRequest.patientGender})
              </div>
              <div className="text-[11px] text-[#64748B] font-mono">{pharmacyRequest.patientId}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Building2 className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Prescribing Doctor</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {pharmacyRequest.doctor}
              </div>
              <div className="text-[11px] text-[#64748B]">{pharmacyRequest.department}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Pill className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Prescription Items</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {pharmacyRequest.medicines?.length || 0} prescribed medicines
              </div>
              <div className="text-[11px] text-[#64748B]">Staging: {pharmacyRequest.counter}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Order Time</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {pharmacyRequest.requestedTime} ({pharmacyRequest.requestedDate})
              </div>
              <div className="text-[11px] text-[#15803D] font-medium">Pharmacist: {pharmacyRequest.pharmacist}</div>
            </div>
          </div>
        </div>

        {/* ── 2. Fulfillment Progression Stepper ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
                Fulfillment Pipeline Status
              </h2>
              <p className="text-xs text-[#64748B]">Medication preparation and counter staging milestones</p>
            </div>

            {/* Action Buttons */}
            <div>
              {pharmacyRequest.status === 'Pending' && (
                <button
                  type="button"
                  onClick={handleStartPreparing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <Pill className="h-3.5 w-3.5" />
                  <span>Start Preparing</span>
                </button>
              )}

              {pharmacyRequest.status === 'Preparing' && (
                <button
                  type="button"
                  onClick={handleMarkReady}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <PackageCheck className="h-3.5 w-3.5" />
                  <span>Mark Ready for Pickup</span>
                </button>
              )}

              {pharmacyRequest.status === 'Ready' && (
                <button
                  type="button"
                  onClick={handleMarkDispensed}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mark Dispensed</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {stages.map((stage, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.key}
                  className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 transition-all ${
                    isCurrent
                      ? 'bg-[#F0FDF4] border-[#15803D]'
                      : isPassed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-[#15803D] animate-ping" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-[#15803D]'
                          : isPassed
                          ? 'text-emerald-900'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {stage.key}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{stage.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Prescribed Medicines Section ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
                  Prescribed Medicines
                </h2>
                <p className="text-[11px] text-[#64748B]">Medications, dosage strengths, and intake instructions</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              <span>Dispensation Record</span>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                  <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Medicine Name & Strength</th>
                  <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Dosage Form</th>
                  <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Quantity</th>
                  <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Instructions & Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(pharmacyRequest.medicines || []).map((med, index) => (
                  <tr key={index} className="hover:bg-[#F8FAFC]/70 transition-colors">
                    <td className="py-3 px-3.5">
                      <strong className="text-[#17221B] block">{med.name}</strong>
                      <span className="text-[11px] text-[#15803D] font-medium">{med.strength}</span>
                    </td>
                    <td className="py-3 px-3.5 text-[#64748B]">
                      {med.form}
                    </td>
                    <td className="py-3 px-3.5 font-bold text-[#17221B]">
                      {med.quantity}
                    </td>
                    <td className="py-3 px-3.5 text-[#17221B] font-medium">
                      {med.instructions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-2 text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-[#15803D]" />
              <span>
                Registered Pharmacist:{' '}
                <strong className="text-[#17221B]">{pharmacyRequest.pharmacist}</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">
              Dispensing Desk: {pharmacyRequest.counter}
            </span>
          </div>
        </div>

        {/* ── 4. Clinical Notes & Instructions ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-2.5">
          <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
            Physician Clinical Notes & Dispensing Instructions
          </h2>
          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#17221B] leading-relaxed">
            {pharmacyRequest.notes || 'No special dispensing warnings indicated on prescription.'}
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffPharmacyDetailPage;
