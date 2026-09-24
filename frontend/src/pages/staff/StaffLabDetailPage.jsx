import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffLabRequestsData } from '../../data/staffMockData';
import { LabStatusBadge, LabPriorityBadge } from '../../components/staff/lab/LabStatusBadge';
import { MockLabResultModal } from '../../components/staff/lab/MockLabResultModal';
import {
  ArrowLeft,
  FlaskConical,
  User,
  Building2,
  Clock,
  TestTube2,
  FileCheck,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ShieldCheck,
  SearchX,
  ExternalLink,
} from 'lucide-react';

export const StaffLabDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find request in mock data
  const [labRequest, setLabRequest] = useState(() => {
    return initialStaffLabRequestsData.find(
      (r) => String(r.id).toLowerCase() === String(id).toLowerCase()
    );
  });

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!labRequest) {
    return (
      <StaffLayout
        title="Lab Request Requisition"
        subtitle="Review specimen status and test results."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mx-auto">
              <SearchX className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-base font-bold text-[#17221B]">Lab Request Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested requisition ID ({id}) was not found in active laboratory orders.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/lab')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-semibold hover:bg-[#166534] transition-all cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Lab Coordination</span>
              </button>
            </div>
          </div>
        </div>
      </StaffLayout>
    );
  }

  // Workflow Action Handlers
  const handleRequestSample = () => {
    setLabRequest((prev) => ({
      ...prev,
      status: 'Sample Required',
      sampleStatus: 'Required',
    }));
    showToast(`Specimen barcode issued for ${labRequest.id}.`);
  };

  const handleMarkSampleCollected = () => {
    setLabRequest((prev) => ({
      ...prev,
      status: 'Sample Collected',
      sampleStatus: 'Collected',
      collectedTime: 'Just now',
    }));
    showToast('Sample marked as collected.');
  };

  const handleStartProcessing = () => {
    setLabRequest((prev) => ({
      ...prev,
      status: 'Processing',
      sampleStatus: 'Processing',
    }));
    showToast('Lab request moved to processing.');
  };

  // Workflow Stages calculation
  const stages = [
    { key: 'Pending', label: 'Requisition Generated' },
    { key: 'Sample Required', label: 'Sample Required' },
    { key: 'Sample Collected', label: 'Sample Collected' },
    { key: 'Processing', label: 'Processing' },
    { key: 'Result Ready', label: 'Result Ready' },
    { key: 'Completed', label: 'Completed' },
  ];

  const getStageIndex = (status) => {
    const idx = stages.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIndex = getStageIndex(labRequest.status);

  return (
    <StaffLayout
      title="Lab Request Details"
      subtitle={`Diagnostic order and specimen lifecycle for ${labRequest.id}`}
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
            onClick={() => navigate('/staff/lab')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#17221B] hover:bg-[#F8FAFC] hover:text-[#15803D] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#15803D]" />
            <span>Back to Lab Coordination</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Patient */}
            <button
              type="button"
              onClick={() => navigate(`/staff/patients/${labRequest.patientId}`)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#15803D]/20 bg-[#F0FDF4] text-[#15803D] hover:bg-[#15803D] hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Patient ({labRequest.patientName})</span>
            </button>

            {/* View Doctor */}
            {labRequest.doctorId && (
              <button
                type="button"
                onClick={() => navigate(`/staff/doctors/${labRequest.doctorId}`)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-all cursor-pointer"
              >
                <Building2 className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Doctor ({labRequest.doctor})</span>
              </button>
            )}

            {/* Print Requisition */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-all cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Print Slip</span>
            </button>
          </div>
        </div>

        {/* ── 1. Requisition Header ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex-shrink-0">
                <FlaskConical className="h-6 w-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-[#17221B] tracking-tight">
                    {labRequest.test}
                  </h1>
                  <span className="font-mono text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
                    {labRequest.id}
                  </span>
                  <LabPriorityBadge priority={labRequest.priority} />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mt-1">
                  <span className="font-medium text-[#17221B]">
                    Category: {labRequest.category}
                  </span>
                  <span>•</span>
                  <span>Dept: {labRequest.department}</span>
                  <span>•</span>
                  <span className="font-mono text-[#15803D]">
                    Barcode: {labRequest.sampleBarcode}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Current Status
              </span>
              <LabStatusBadge status={labRequest.status} />
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <User className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Patient</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {labRequest.patientName} ({labRequest.patientAge}y, {labRequest.patientGender})
              </div>
              <div className="text-[11px] text-[#64748B] font-mono">{labRequest.patientId}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Building2 className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Requesting Doctor</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {labRequest.doctor}
              </div>
              <div className="text-[11px] text-[#64748B]">{labRequest.department}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <TestTube2 className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Specimen Sample</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {labRequest.sampleType}
              </div>
              <div className="text-[11px] text-[#64748B]">Status: {labRequest.sampleStatus}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Order Time & ETA</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-[#17221B]">
                {labRequest.requestedTime} ({labRequest.requestedDate})
              </div>
              <div className="text-[11px] text-[#15803D] font-medium">ETA: {labRequest.estimatedCompletion}</div>
            </div>
          </div>
        </div>

        {/* ── 2. Workflow Progression Stepper ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
                Workflow Pipeline Status
              </h2>
              <p className="text-xs text-[#64748B]">Specimen progression and analyzer milestone tracking</p>
            </div>

            {/* Contextual Action Button */}
            <div>
              {labRequest.status === 'Pending' && (
                <button
                  type="button"
                  onClick={handleRequestSample}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Request Sample</span>
                </button>
              )}

              {labRequest.status === 'Sample Required' && (
                <button
                  type="button"
                  onClick={handleMarkSampleCollected}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <TestTube2 className="h-3.5 w-3.5" />
                  <span>Mark Sample Collected</span>
                </button>
              )}

              {labRequest.status === 'Sample Collected' && (
                <button
                  type="button"
                  onClick={handleStartProcessing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Start Processing</span>
                </button>
              )}

              {(labRequest.status === 'Result Ready' || labRequest.status === 'Completed') && (
                <button
                  type="button"
                  onClick={() => setIsResultModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F0FDF4] text-[#15803D] hover:bg-[#15803D] hover:text-white border border-[#15803D]/20 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>View Lab Results</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
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

        {/* ── 3. Embedded Mock Results (When Result Ready or Completed) ── */}
        {(labRequest.status === 'Result Ready' || labRequest.status === 'Completed') && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
                    Verified Lab Findings
                  </h2>
                  <p className="text-[11px] text-[#64748B]">Analytes measured and reference ranges</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span>Demonstration Findings</span>
              </div>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Analyte Parameter</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Measured Value</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Unit</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Reference Interval</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider text-right">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(labRequest.mockResults || []).map((res, index) => {
                    const isAbnormal = res.status === 'Elevated' || res.status === 'Borderline';
                    return (
                      <tr key={index} className="hover:bg-[#F8FAFC]/70 transition-colors">
                        <td className="py-2.5 px-3.5 font-semibold text-[#17221B]">
                          {res.parameter}
                        </td>
                        <td className={`py-2.5 px-3.5 font-bold ${isAbnormal ? 'text-amber-800' : 'text-[#17221B]'}`}>
                          {res.value}
                        </td>
                        <td className="py-2.5 px-3.5 text-[#64748B] font-mono">
                          {res.unit}
                        </td>
                        <td className="py-2.5 px-3.5 text-[#64748B]">
                          {res.reference}
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              isAbnormal
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20'
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
              <div className="flex items-center gap-2 text-[#64748B]">
                <ShieldCheck className="h-4 w-4 text-[#15803D]" />
                <span>
                  Technician on Duty:{' '}
                  <strong className="text-[#17221B]">{labRequest.technician}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsResultModalOpen(true)}
                className="inline-flex items-center gap-1 text-[#15803D] font-semibold hover:underline cursor-pointer"
              >
                <span>Open Full-Screen Report</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ── 4. Clinical Notes & Instructions ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-2.5">
          <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
            Physician Clinical Notes & Instructions
          </h2>
          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#17221B] leading-relaxed">
            {labRequest.notes || 'No special handling instructions indicated on requisition.'}
          </div>
        </div>
      </div>

      {/* ── Full Mock Result Modal ── */}
      <MockLabResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        labRequest={labRequest}
      />
    </StaffLayout>
  );
};

export default StaffLabDetailPage;
