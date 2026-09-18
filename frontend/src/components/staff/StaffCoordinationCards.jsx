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
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-200 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <FlaskConical className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Lab Coordination</h2>
                <p className="text-xs text-[#64748B]">Diagnostic order throughput & sample status</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/staff/lab')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-[#115E59] hover:underline transition-colors cursor-pointer"
            >
              <span>View Lab Coordination</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Pending</span>
              <span className="text-xl font-extrabold text-amber-600 block mt-1">
                {labStats.pendingRequests}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Requests</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Collected</span>
              <span className="text-xl font-extrabold text-blue-600 block mt-1">
                {labStats.samplesCollected}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Samples</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Processing</span>
              <span className="text-xl font-extrabold text-purple-600 block mt-1">
                {labStats.processing}
              </span>
              <span className="text-[10px] text-[#94A3B8]">In Lab</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Ready</span>
              <span className="text-xl font-extrabold text-emerald-600 block mt-1">
                {labStats.resultsReady}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Verified</span>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs text-purple-900">
          <span className="flex items-center gap-1.5 font-medium">
            <Activity className="h-3.5 w-3.5 text-purple-600" />
            Central Diagnostic Lab: <strong>Normal processing speed</strong>
          </span>
          <span className="font-bold text-[11px]">{labStats.totalToday} total orders</span>
        </div>
      </div>

      {/* ── 2. Pharmacy Coordination Card ── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-200 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                <Pill className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Pharmacy Coordination</h2>
                <p className="text-xs text-[#64748B]">Medication dispensation & pickup queues</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/staff/pharmacy')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-[#115E59] hover:underline transition-colors cursor-pointer"
            >
              <span>View Pharmacy Coordination</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Pending</span>
              <span className="text-xl font-extrabold text-amber-600 block mt-1">
                {pharmacyStats.pendingPrescriptions}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Prescriptions</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Preparing</span>
              <span className="text-xl font-extrabold text-blue-600 block mt-1">
                {pharmacyStats.preparing}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Packaging</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Ready</span>
              <span className="text-xl font-extrabold text-[#0F766E] block mt-1">
                {pharmacyStats.readyForPickup}
              </span>
              <span className="text-[10px] text-[#94A3B8]">At Counter</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] font-semibold text-[#64748B] block">Dispensed</span>
              <span className="text-xl font-extrabold text-emerald-600 block mt-1">
                {pharmacyStats.dispensed}
              </span>
              <span className="text-[10px] text-[#94A3B8]">Completed</span>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 flex items-center justify-between text-xs text-teal-900">
          <span className="flex items-center gap-1.5 font-medium">
            <PackageCheck className="h-3.5 w-3.5 text-[#0F766E]" />
            OPD Dispensary: <strong>Counter 02 active</strong>
          </span>
          <span className="font-bold text-[11px]">{pharmacyStats.totalOrdersToday} orders today</span>
        </div>
      </div>
    </div>
  );
};

export default StaffCoordinationCards;
