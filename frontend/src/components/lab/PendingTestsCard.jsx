import React from 'react';
import { Clock, AlertCircle, Loader2 } from 'lucide-react';

export const PendingTestsCard = ({ pendingList }) => {
  const tests = pendingList && pendingList.length > 0
    ? pendingList
    : [
        {
          id: 'LAB-2026-003',
          name: 'Lipid Profile',
          status: 'Processing',
          requested: 'Today',
          progress: 65,
          estimatedTime: 'Estimated ~3:30 PM',
        },
        {
          id: 'LAB-2026-008',
          name: 'Blood Glucose',
          status: 'Awaiting Report',
          requested: 'Today',
          progress: 40,
          estimatedTime: 'Sample collected, in queue',
        },
      ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
      <div>
        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17221B] tracking-tight">
                Pending Tests
              </h3>
              <p className="text-xs text-[#64748B]">
                Active laboratory diagnostic orders
              </p>
            </div>
          </div>
          <span className="flex h-5 items-center justify-center px-2 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            {tests.length} Active
          </span>
        </div>

        {/* ── Tests List ── */}
        <div className="divide-y divide-[#E2E8F0] mt-1">
          {tests.map((test) => (
            <div key={test.id} className="py-3.5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17221B]">
                    {test.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
                    <span>Requested: <strong className="text-[#17221B]">{test.requested}</strong></span>
                    {test.estimatedTime && (
                      <>
                        <span>·</span>
                        <span className="text-amber-800 font-medium">{test.estimatedTime}</span>
                      </>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    test.status === 'Processing'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-[#475569] border-slate-200'
                  }`}
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {test.status}
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-1 pt-0.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${test.progress || 50}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>Order Queued</span>
                  <span>Pathology Verification</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-2 text-[11px] text-[#64748B]">
        <AlertCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
        <span>Turnaround time typically ranges between 1 to 3 hours depending on test type.</span>
      </div>
    </div>
  );
};

