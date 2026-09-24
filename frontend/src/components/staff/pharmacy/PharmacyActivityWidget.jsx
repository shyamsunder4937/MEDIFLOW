import React from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  Pill,
  PackageCheck,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PharmacyActivityWidget = ({
  pharmacyRequests = [],
  recentActivities = [],
}) => {
  const navigate = useNavigate();

  // Derived throughput counts
  const totalOrders = pharmacyRequests.length;
  const pendingCount = pharmacyRequests.filter((r) => r.status === 'Pending').length;
  const preparingCount = pharmacyRequests.filter((r) => r.status === 'Preparing').length;
  const readyCount = pharmacyRequests.filter((r) => r.status === 'Ready').length;
  const dispensedCount = pharmacyRequests.filter((r) => r.status === 'Dispensed').length;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'preparing':
        return <Pill className="h-3.5 w-3.5 text-blue-600" />;
      case 'ready':
        return <PackageCheck className="h-3.5 w-3.5 text-emerald-600" />;
      case 'dispensed':
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'urgent':
        return <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-amber-600" />;
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'preparing':
        return 'bg-blue-50 border-blue-200';
      case 'ready':
        return 'bg-emerald-50 border-emerald-200';
      case 'dispensed':
        return 'bg-[#F0FDF4] border-[#15803D]/20';
      case 'urgent':
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-amber-50 border-amber-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* ── 1. Pharmacy Daily Throughput (1 Column) ── */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D]">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
                Dispensation Throughput
              </h2>
              <p className="text-[11px] text-[#64748B]">Counter queue distribution</p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
            Today
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-slate-100">
            <span className="text-[#64748B] font-medium">Orders Processed:</span>
            <strong className="text-sm font-bold text-[#17221B]">{totalOrders}</strong>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/70 border border-amber-100">
            <span className="text-amber-800 font-medium flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600" /> Pending Preparation:
            </span>
            <strong className="text-sm font-bold text-amber-900">{pendingCount}</strong>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/70 border border-blue-100">
            <span className="text-blue-800 font-medium flex items-center gap-1.5">
              <Pill className="h-3.5 w-3.5 text-blue-600" /> Currently Packaging:
            </span>
            <strong className="text-sm font-bold text-blue-900">{preparingCount}</strong>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
            <span className="text-emerald-800 font-medium flex items-center gap-1.5">
              <PackageCheck className="h-3.5 w-3.5 text-emerald-600" /> Ready at Counters:
            </span>
            <strong className="text-sm font-bold text-emerald-900">{readyCount}</strong>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20">
            <span className="text-[#15803D] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" /> Handed Over / Dispensed:
            </span>
            <strong className="text-sm font-bold text-[#15803D]">{dispensedCount}</strong>
          </div>
        </div>
      </div>

      {/* ── 2. Recent Pharmacy Activity Feed (2 Columns) ── */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
              Recent Pharmacy Activity
            </h2>
            <p className="text-[11px] text-[#64748B]">Real-time medication dispensation audit</p>
          </div>
          <span className="text-[11px] font-medium text-[#64748B]">
            Dispensing desk
          </span>
        </div>

        <div className="space-y-2.5">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="flex items-start sm:items-center justify-between gap-3 p-2.5 sm:p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-300 transition-colors text-xs"
            >
              <div className="flex items-start sm:items-center gap-2.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md border flex-shrink-0 mt-0.5 sm:mt-0 ${getActivityBg(
                    act.type
                  )}`}
                >
                  {getActivityIcon(act.type)}
                </div>

                <div>
                  <p className="font-semibold text-[#17221B]">{act.message}</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    <span className="font-medium text-[#15803D]">{act.patientName}</span> • {act.medicinesCount} items
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                <span className="text-[11px] text-[#64748B] font-medium whitespace-nowrap">
                  {act.time}
                </span>
                <button
                  type="button"
                  onClick={() => navigate(`/staff/pharmacy/${act.prescriptionId}`)}
                  className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#15803D] hover:underline cursor-pointer"
                >
                  <span>View</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
