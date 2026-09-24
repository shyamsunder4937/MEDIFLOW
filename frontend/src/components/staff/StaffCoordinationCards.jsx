import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Pill, ArrowRight, Activity, PackageCheck } from 'lucide-react';
import { staffLabSummary, staffPharmacySummary } from '../../data/staffMockData';

export const StaffCoordinationCards = ({
  labStats = staffLabSummary,
  pharmacyStats = staffPharmacySummary,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
      {/* ── 1. Lab Coordination Card ── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#E2E8F0] transition-all">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <FlaskConical className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Lab Coordination</h2>
                <p className="text-xs text-[#64748B]">Diagnostic order throughput & sample status</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/staff/lab')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer"
            >
              <span>View Lab</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Pending</span>
              <span className="text-xl font-bold text-amber-800 block mt-0.5">
                {labStats.pendingRequests}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Requests</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Collected</span>
              <span className="text-xl font-bold text-blue-700 block mt-0.5">
                {labStats.samplesCollected}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Samples</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Processing</span>
              <span className="text-xl font-bold text-[#475569] block mt-0.5">
                {labStats.processing}
              </span>
              <span className="text-[10px] text-[#94A3B8]">In Lab</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Ready</span>
              <span className="text-xl font-bold text-[#15803D] block mt-0.5">
                {labStats.resultsReady}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Verified</span>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-center justify-between text-xs text-[#475569]">
          <span className="flex items-center gap-1.5 font-medium text-[11px]">
            <Activity className="h-3.5 w-3.5 text-[#15803D]" />
            Central Diagnostic Lab: <strong>Normal speed</strong>
          </span>
          <span className="font-bold text-[11px] text-[#17221B]">{labStats.totalToday} total orders</span>
        </div>
      </div>

      {/* ── 2. Pharmacy Coordination Card ── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#E2E8F0] transition-all">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Pharmacy Coordination</h2>
                <p className="text-xs text-[#64748B]">Medication dispensation & pickup queues</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/staff/pharmacy')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer"
            >
              <span>View Pharmacy</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Pending</span>
              <span className="text-xl font-bold text-amber-800 block mt-0.5">
                {pharmacyStats.pendingPrescriptions}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Prescriptions</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Preparing</span>
              <span className="text-xl font-bold text-blue-700 block mt-0.5">
                {pharmacyStats.preparing}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Packaging</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Ready</span>
              <span className="text-xl font-bold text-[#15803D] block mt-0.5">
                {pharmacyStats.readyForPickup}
              </span>
              <span className="text-[10px] text-[#94A3B8]">At Counter</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-[#E2E8F0] text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Dispensed</span>
              <span className="text-xl font-bold text-[#475569] block mt-0.5">
                {pharmacyStats.dispensed}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Completed</span>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-between text-xs text-[#166534]">
          <span className="flex items-center gap-1.5 font-medium text-[11px]">
            <PackageCheck className="h-3.5 w-3.5 text-[#15803D]" />
            OPD Dispensary: <strong>Counter 02 active</strong>
          </span>
          <span className="font-bold text-[11px]">{pharmacyStats.totalOrdersToday} orders today</span>
        </div>
      </div>
    </div>
  );
};

export default StaffCoordinationCards;

