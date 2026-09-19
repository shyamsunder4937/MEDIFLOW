import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LabStatusBadge, LabPriorityBadge } from './LabStatusBadge';
import {
  TestTube2,
  RefreshCw,
  Eye,
  FileCheck,
  Send,
  SearchX,
} from 'lucide-react';

export const LabRequestTable = ({
  requests = [],
  onRequestSample,
  onMarkCollected,
  onStartProcessing,
  onViewResult,
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
            <p className="text-sm font-bold text-[#0F172A]">No lab requests found</p>
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
              <th className="py-3.5 px-4 font-bold">Request ID</th>
              <th className="py-3.5 px-4 font-bold">Patient</th>
              <th className="py-3.5 px-4 font-bold">Requested Test</th>
              <th className="py-3.5 px-4 font-bold">Doctor</th>
              <th className="py-3.5 px-4 font-bold">Department</th>
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
                {/* Request ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-[#0F766E]">
                  <button
                    type="button"
                    onClick={() => navigate(`/staff/lab/${req.id}`)}
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

                {/* Test */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[#0F172A]">{req.test}</div>
                  <div className="text-[11px] text-[#64748B]">{req.category}</div>
                </td>

                {/* Doctor */}
                <td className="py-3.5 px-4 font-medium text-[#0F172A]">
                  {req.doctor}
                </td>

                {/* Department */}
                <td className="py-3.5 px-4 text-[#64748B] font-medium">
                  {req.department}
                </td>

                {/* Requested Time */}
                <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                  <span className="font-medium text-[#0F172A]">{req.requestedTime}</span>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4">
                  <LabPriorityBadge priority={req.priority} />
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <LabStatusBadge status={req.status} />
                </td>

                {/* Contextual Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    {/* State 1: Pending */}
                    {req.status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onRequestSample(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Generate specimen collection barcode"
                        >
                          <Send className="h-3 w-3" />
                          <span>Request Sample</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Requisition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 2: Sample Required */}
                    {req.status === 'Sample Required' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onMarkCollected(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Mark Phlebotomy sample collected"
                        >
                          <TestTube2 className="h-3.5 w-3.5" />
                          <span>Mark Sample Collected</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 3: Sample Collected */}
                    {req.status === 'Sample Collected' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onStartProcessing(req.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          title="Load specimen onto diagnostic analyzer"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Start Processing</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}

                    {/* State 4: Processing */}
                    {req.status === 'Processing' && (
                      <button
                        type="button"
                        onClick={() => navigate(`/staff/lab/${req.id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0F172A] transition-all cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                        <span>View</span>
                      </button>
                    )}

                    {/* State 5 & 6: Result Ready & Completed */}
                    {(req.status === 'Result Ready' || req.status === 'Completed') && (
                      <>
                        <button
                          type="button"
                          onClick={() => onViewResult(req)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#CCFBF1] text-[#0F766E] hover:bg-[#0F766E] hover:text-white border border-[#0F766E]/20 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          <FileCheck className="h-3.5 w-3.5" />
                          <span>View Result</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
                          title="View Requisition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </>
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
                  <LabPriorityBadge priority={req.priority} />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mt-1.5">
                  {req.patientName}
                </h3>
                <p className="text-xs text-[#64748B] font-mono">{req.patientId}</p>
              </div>

              <LabStatusBadge status={req.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[#64748B] block">Test:</span>
                <strong className="text-[#0F172A] font-semibold">{req.test}</strong>
              </div>

              <div>
                <span className="text-[#64748B] block">Doctor:</span>
                <strong className="text-[#0F172A] font-semibold">{req.doctor}</strong>
              </div>

              <div>
                <span className="text-[#64748B] block">Dept:</span>
                <span className="text-[#0F766E] font-semibold">{req.department}</span>
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
                  onClick={() => onRequestSample(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Request Sample</span>
                </button>
              )}

              {req.status === 'Sample Required' && (
                <button
                  type="button"
                  onClick={() => onMarkCollected(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <TestTube2 className="h-3.5 w-3.5" />
                  <span>Mark Sample Collected</span>
                </button>
              )}

              {req.status === 'Sample Collected' && (
                <button
                  type="button"
                  onClick={() => onStartProcessing(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0F766E] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Start Processing</span>
                </button>
              )}

              {(req.status === 'Result Ready' || req.status === 'Completed') && (
                <button
                  type="button"
                  onClick={() => onViewResult(req)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#CCFBF1] text-[#0F766E] hover:bg-[#0F766E] hover:text-white border border-[#0F766E]/20 text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>View Result</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/staff/lab/${req.id}`)}
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
