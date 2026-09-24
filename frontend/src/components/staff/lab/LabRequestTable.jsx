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
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#64748B]">
            <SearchX className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#17221B]">No lab requests found</p>
            <p className="text-xs text-[#64748B]">
              Try modifying your search criteria or resetting filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Desktop Table View ── */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Requisition ID</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Patient</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Requested Test</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Doctor</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Department</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Order Time</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Priority</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 font-semibold text-[11px] uppercase tracking-wider text-right">Workflow Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-[#F8FAFC]/80 transition-colors"
              >
                {/* Request ID */}
                <td className="py-3.5 px-4 font-mono font-semibold text-[#15803D]">
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
                  <div className="font-semibold text-sm text-[#17221B]">{req.patientName}</div>
                  <div className="text-[11px] text-[#64748B] font-mono">{req.patientId}</div>
                </td>

                {/* Test */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-sm text-[#17221B]">{req.test}</div>
                  <div className="text-[11px] text-[#64748B]">{req.category}</div>
                </td>

                {/* Doctor */}
                <td className="py-3.5 px-4 font-medium text-[#17221B]">
                  {req.doctor}
                </td>

                {/* Department */}
                <td className="py-3.5 px-4 text-[#64748B]">
                  {req.department}
                </td>

                {/* Requested Time */}
                <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                  <span className="font-medium text-[#17221B]">{req.requestedTime}</span>
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
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all cursor-pointer"
                          title="Generate specimen collection barcode"
                        >
                          <Send className="h-3 w-3" />
                          <span>Request Sample</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 transition-all cursor-pointer"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-all cursor-pointer"
                          title="Mark specimen collected"
                        >
                          <TestTube2 className="h-3.5 w-3.5" />
                          <span>Mark Sample Collected</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 transition-all cursor-pointer"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all cursor-pointer"
                          title="Load specimen onto diagnostic analyzer"
                        >
                          <RefreshCw className="h-3 w-3" />
                          <span>Start Processing</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 transition-all cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17221B] transition-all cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 text-[#15803D]" />
                        <span>View</span>
                      </button>
                    )}

                    {/* State 5 & 6: Result Ready & Completed */}
                    {(req.status === 'Result Ready' || req.status === 'Completed') && (
                      <>
                        <button
                          type="button"
                          onClick={() => onViewResult(req)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] text-[#15803D] hover:bg-[#15803D] hover:text-white border border-[#15803D]/20 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <FileCheck className="h-3.5 w-3.5" />
                          <span>View Result</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/lab/${req.id}`)}
                          className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 transition-all cursor-pointer"
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
          <div key={req.id} className="p-4 space-y-3 hover:bg-[#F8FAFC]/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
                    {req.id}
                  </span>
                  <LabPriorityBadge priority={req.priority} />
                </div>
                <h3 className="font-semibold text-sm text-[#17221B] mt-1.5">
                  {req.patientName}
                </h3>
                <p className="text-xs text-[#64748B] font-mono">{req.patientId}</p>
              </div>

              <LabStatusBadge status={req.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div>
                <span className="text-[#64748B] block">Test:</span>
                <strong className="text-[#17221B] font-semibold">{req.test}</strong>
              </div>

              <div>
                <span className="text-[#64748B] block">Doctor:</span>
                <strong className="text-[#17221B] font-semibold">{req.doctor}</strong>
              </div>

              <div>
                <span className="text-[#64748B] block">Dept:</span>
                <span className="text-[#15803D] font-medium">{req.department}</span>
              </div>

              <div>
                <span className="text-[#64748B] block">Order Time:</span>
                <span className="text-[#17221B] font-medium">{req.requestedTime}</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {req.status === 'Pending' && (
                <button
                  type="button"
                  onClick={() => onRequestSample(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Request Sample</span>
                </button>
              )}

              {req.status === 'Sample Required' && (
                <button
                  type="button"
                  onClick={() => onMarkCollected(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold cursor-pointer"
                >
                  <TestTube2 className="h-3.5 w-3.5" />
                  <span>Mark Sample Collected</span>
                </button>
              )}

              {req.status === 'Sample Collected' && (
                <button
                  type="button"
                  onClick={() => onStartProcessing(req.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Start Processing</span>
                </button>
              )}

              {(req.status === 'Result Ready' || req.status === 'Completed') && (
                <button
                  type="button"
                  onClick={() => onViewResult(req)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#F0FDF4] text-[#15803D] hover:bg-[#15803D] hover:text-white border border-[#15803D]/20 text-xs font-semibold cursor-pointer transition-colors"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>View Result</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/staff/lab/${req.id}`)}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17221B] cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
