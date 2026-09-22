import React from 'react';
import {
  FileText,
  FlaskConical,
  Eye,
  CheckCircle2,
  Clock,
  SearchX,
  RotateCcw,
} from 'lucide-react';

export const LabResultStatusBadge = ({ status }) => {
  if (status === 'Reviewed') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
        <CheckCircle2 className="h-3 w-3 text-[#15803D]" />
        Reviewed
      </span>
    );
  }

  if (status === 'Pending Review') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="h-3 w-3 text-amber-600" />
        Pending Review
      </span>
    );
  }

  // Default: Result Available
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
      <FlaskConical className="h-3 w-3 text-[#15803D]" />
      Result Available
    </span>
  );
};

export const LabResultTable = ({
  results = [],
  activeTab = 'pending',
  searchTerm = '',
  onViewResult,
  onMarkAsReviewed,
  onClearSearch,
}) => {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center space-y-3.5 shadow-2xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#64748B] mx-auto">
          <SearchX className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#17221B]">No lab results found</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            {searchTerm
              ? `No laboratory results match "${searchTerm}". Try searching by another patient name, ID, or test name.`
              : `There are no ${activeTab === 'pending' ? 'pending' : 'completed'} laboratory results in the queue.`}
          </p>
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear Search</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
      {/* ── Desktop Table (md and up) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 font-bold">Patient</th>
              <th className="py-3 px-4 font-bold">Test</th>
              <th className="py-3 px-4 font-bold">Requested By</th>
              <th className="py-3 px-4 font-bold">
                {activeTab === 'completed' ? 'Reviewed At' : 'Received Time'}
              </th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-xs">
            {results.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Patient */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] font-bold text-xs flex-shrink-0">
                      {item.patientName
                        ? item.patientName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)
                        : 'PT'}
                    </div>
                    <div>
                      <div className="font-bold text-[#17221B] text-sm group-hover:text-[#15803D] transition-colors">
                        {item.patientName}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {item.patientId || `PAT-10${item.queueNumber || item.id}`} • {item.department || 'General OPD'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Test */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-[#17221B]">
                    <FileText className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                    <span>{item.testName}</span>
                  </div>
                  {item.specimen && (
                    <span className="text-[11px] text-[#64748B] block pl-5 mt-0.5">
                      {item.specimen}
                    </span>
                  )}
                </td>

                {/* Requested By */}
                <td className="py-3.5 px-4 text-[#475569] text-xs font-normal">
                  {item.requestedBy || 'Dr. Arun Kumar'}
                </td>

                {/* Received / Reviewed Time */}
                <td className="py-3.5 px-4 text-[#17221B] font-medium text-xs">
                  {activeTab === 'completed' && item.reviewedTime
                    ? item.reviewedTime
                    : item.receivedTime}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <LabResultStatusBadge status={item.status} />
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onViewResult(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-medium text-[#17221B] hover:bg-[#F0FDF4] hover:text-[#15803D] hover:border-[#DCFCE7] transition-all cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#15803D]" />
                      <span>View Result</span>
                    </button>

                    {activeTab === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onMarkAsReviewed(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                        title="Mark test result as reviewed"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Review</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile & Small Screen Cards (under md) ── */}
      <div className="md:hidden divide-y divide-[#F1F5F9]">
        {results.map((item) => (
          <div key={item.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] font-bold text-xs flex-shrink-0">
                  {item.patientName
                    ? item.patientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                    : 'PT'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#17221B]">{item.patientName}</h4>
                  <div className="text-xs text-[#64748B]">
                    {item.patientId || `PAT-10${item.queueNumber || item.id}`} • {item.department || 'General OPD'}
                  </div>
                </div>
              </div>

              <LabResultStatusBadge status={item.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-semibold block">Test</span>
                <span className="font-semibold text-[#17221B] mt-0.5 block">{item.testName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] uppercase font-semibold block">
                  {activeTab === 'completed' ? 'Reviewed' : 'Received'}
                </span>
                <span className="font-medium text-[#17221B] mt-0.5 block">
                  {activeTab === 'completed' && item.reviewedTime
                    ? item.reviewedTime
                    : item.receivedTime}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => onViewResult(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-medium text-[#17221B] hover:bg-[#F0FDF4] hover:text-[#15803D] hover:border-[#DCFCE7] transition-all cursor-pointer shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5 text-[#15803D]" />
                <span>View Result</span>
              </button>

              {activeTab === 'pending' && (
                <button
                  type="button"
                  onClick={() => onMarkAsReviewed(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Review</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResultTable;

