import React from 'react';
import {
  FileText,
  FlaskConical,
  Eye,
  CheckCircle2,
  Clock,
  User,
  SearchX,
  RotateCcw,
} from 'lucide-react';

export const LabResultStatusBadge = ({ status }) => {
  if (status === 'Reviewed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="h-3 w-3" />
        Reviewed
      </span>
    );
  }

  if (status === 'Pending Review') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="h-3 w-3" />
        Pending Review
      </span>
    );
  }

  // Default: Result Available
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
      <FlaskConical className="h-3 w-3" />
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
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 text-center space-y-4 shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B] mx-auto">
          <SearchX className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#0F172A]">No lab results found</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            {searchTerm
              ? `No laboratory results match "${searchTerm}". Try searching by another patient or test name.`
              : `There are no ${activeTab === 'pending' ? 'pending' : 'completed'} laboratory results at this time.`}
          </p>
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear Search</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Desktop Table (md and up) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3.5 px-4">Patient</th>
              <th className="py-3.5 px-4">Test</th>
              <th className="py-3.5 px-4">Requested By</th>
              <th className="py-3.5 px-4">
                {activeTab === 'completed' ? 'Reviewed At' : 'Received Time'}
              </th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {results.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                {/* Patient */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex-shrink-0">
                      {item.patientName
                        ? item.patientName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)
                        : 'PT'}
                    </div>
                    <div>
                      <div className="font-bold text-[#0F172A] text-sm group-hover:text-[#0F766E] transition-colors">
                        {item.patientName}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {item.patientId || `PAT-10${item.queueNumber || item.id}`} • {item.department || 'General OPD'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Test */}
                <td className="py-3.5 px-4 font-semibold text-[#0F172A]">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#0F766E]" />
                    <span>{item.testName}</span>
                  </div>
                  {item.specimen && (
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                      {item.specimen}
                    </span>
                  )}
                </td>

                {/* Requested By */}
                <td className="py-3.5 px-4 text-[#475569]">
                  {item.requestedBy || 'Dr. Arun Kumar'}
                </td>

                {/* Received / Reviewed Time */}
                <td className="py-3.5 px-4 text-[#0F172A] font-medium">
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
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewResult(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F766E] hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/30 transition-all cursor-pointer shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Result</span>
                    </button>

                    {activeTab === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onMarkAsReviewed(item.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-[#475569] hover:text-emerald-700 hover:border-emerald-200 border border-transparent text-xs font-semibold transition-all cursor-pointer"
                        title="Quick mark as reviewed"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="hidden lg:inline">Review</span>
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
      <div className="md:hidden divide-y divide-slate-100">
        {results.map((item) => (
          <div key={item.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex-shrink-0">
                  {item.patientName
                    ? item.patientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                    : 'PT'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F172A]">{item.patientName}</h4>
                  <div className="text-xs text-[#64748B]">
                    {item.patientId || `PAT-10${item.queueNumber || item.id}`}
                  </div>
                </div>
              </div>

              <LabResultStatusBadge status={item.status} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase block">Test</span>
                <span className="font-bold text-[#0F172A] mt-0.5 block">{item.testName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] uppercase block">
                  {activeTab === 'completed' ? 'Reviewed' : 'Received'}
                </span>
                <span className="font-medium text-[#0F172A] mt-0.5 block">
                  {activeTab === 'completed' && item.reviewedTime
                    ? item.reviewedTime
                    : item.receivedTime}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              {activeTab === 'pending' && (
                <button
                  type="button"
                  onClick={() => onMarkAsReviewed(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Review</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onViewResult(item)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-colors shadow-xs cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Result</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResultTable;
