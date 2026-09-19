import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PharmacyStatusBadge, PharmacyPriorityBadge } from './PharmacyStatusBadge';
import {
  Pill,
  PackageCheck,
  CheckCircle2,
  Eye,
  SearchX,
} from 'lucide-react';

export const PharmacyRequestTable = ({
  requests = [],
  onStartPreparing,
  onMarkReady,
  onMarkDispensed,
}) => {
  const navigate = useNavigate();

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-xs">
        <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#94A3B8]">
            <SearchX className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#0F172A]">No pharmacy requests found</p>
            <p className="text-xs text-[#64748B]">
              Try changing your search terms or filter selections.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Desktop View (Table) ── */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-[#64748B]">
              <th className="py-3.5 px-4 font-bold">Prescription ID</th>
              <th className="py-3.5 px-4 font-bold">Patient</th>
              <th className="py-3.5 px-4 font-bold">Doctor</th>
              <th className="py-3.5 px-4 font-bold">Department</th>
              <th className="py-3.5 px-4 font-bold">Medicines</th>
              <th className="py-3.5 px-4 font-bold">Requested</th>
              <th className="py-3.5 px-4 font-bold">Priority</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Workflow Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                {/* Prescription ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-[#0F766E]">
                  <button
                    type="button"
                    onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                    className="hover:underline cursor-pointer"
                  >
                    {req.id}
                  </button>
                </td>

                {/* Patient */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#0F172A]">{req.patientName}</div>
                  <div className="text-[11px] text-[#94A3B8] font-mono">{req.patientId}</div>
                </td>

                {/* Doctor */}
                <td className="py-3.5 px-4 font-medium text-[#0F172A]">
                  {req.doctor}
                </td>

                {/* Department */}
                <td className="py-3.5 px-4 text-[#64748B] font-medium">
                  {req.department}
                </td>

                {/* Medicines */}
                <td className="py-3.5 px-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-[#0F172A]">
                    <Pill className="h-3 w-3 text-[#0F766E]" />
                    <span>{req.medicines?.length || 0} medicines</span>
                  </div>
                </td>

                {/* Requested */}
                <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                  <span className="font-medium text-[#0F172A]">{req.requestedTime}</span>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4">
                  <PharmacyPriorityBadge priority={req.priority} />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <PharmacyStatusBadge status={req.status} />
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    {/* State 1: Pending */}
                    {req.status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onStartPreparing(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Start packaging medications"
                        >
                          <Pill className="h-3 w-3" />
                          <span>Start Preparing</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 2: Preparing */}
                    {req.status === 'Preparing' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onMarkReady(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Stage ready package at counter"
                        >
                          <PackageCheck className="h-3.5 w-3.5" />
                          <span>Mark Ready</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 3: Ready */}
                    {req.status === 'Ready' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onMarkDispensed(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Hand over medications to patient"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Mark Dispensed</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 4 & 5: Dispensed / Cancelled */}
                    {(req.status === 'Dispensed' || req.status === 'Cancelled') && (
                      <button
                        type="button"
                        onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0F172A] transition-all cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile/Tablet View (Cards) ── */}
      <div className="lg:hidden divide-y divide-slate-100">
        {requests.map((req) => (
          <div key={req.id} className="p-4 space-y-3.5 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                    {req.id}
                  </span>
                  <PharmacyPriorityBadge priority={req.priority} />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mt-1.5">
                  {req.patientName}
                </h3>
                <p className="text-xs text-[#64748B] font-mono">{req.patientId}</p>
              </div>

              <PharmacyStatusBadge status={req.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[#64748B] block">Doctor:</span>
                <strong className="text-[#0F172A] font-semibold">{req.doctor}</strong>
              </div>

              <div>
                <span className="text-[#64748B] block">Dept:</span>
                <span className="text-[#0F766E] font-semibold">{req.department}</span>
              </div>

              <div>
                <span className="text-[#64748B] block">Medicines:</span>
                <span className="text-[#0F172A] font-medium">{req.medicines?.length || 0} items</span>
              </div>

              <div>
                <span className="text-[#64748B] block">Requested Time:</span>
                <span className="text-[#0F172A] font-medium">{req.requestedTime}</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {req.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => onStartPreparing(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Pill className="h-3.5 w-3.5" />
                  <span>Start Preparing</span>
                </button>
              )}

              {req.status === 'Preparing' && (
                <button
                  type="button"
                  onClick={() => onMarkReady(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <PackageCheck className="h-3.5 w-3.5" />
                  <span>Mark Ready</span>
                </button>
              )}

              {req.status === 'Ready' && (
                <button
                  type="button"
                  onClick={() => onMarkDispensed(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mark Dispensed</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/staff/pharmacy/${req.id}`)}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0F172A] cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
