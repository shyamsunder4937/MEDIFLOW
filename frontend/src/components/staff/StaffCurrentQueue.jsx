import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListOrdered, ArrowRight, Clock, Stethoscope } from 'lucide-react';
import { staffCurrentQueue } from '../../data/staffMockData';

export const QueueStatusBadge = ({ status }) => {
  switch (status) {
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          In Consultation
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Waiting
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          Completed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-[#64748B] border border-slate-200">
          {status}
        </span>
      );
  }
};

export const StaffCurrentQueue = ({ queue = staffCurrentQueue }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Section Header ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Current Queue</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] text-[10px] font-bold border border-[#DCFCE7]">
                {queue.length} Active Tokens
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live token stream across active consultation suites
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/queue')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>View Full Queue</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4">Token</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Waiting Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {queue.map((item) => (
              <tr
                key={item.token}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="font-mono font-bold text-xs bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-md border border-[#DCFCE7] inline-block">
                    {item.token}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="font-bold text-[#17221B]">{item.patient}</div>
                  <div className="text-[11px] text-[#64748B] font-mono">{item.patientId}</div>
                </td>

                <td className="py-3 px-4 font-semibold text-[#17221B]">
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                    <span>{item.doctor}</span>
                  </div>
                </td>

                <td className="py-3 px-4 text-[#64748B] font-medium">
                  {item.department}
                </td>

                <td className="py-3 px-4">
                  <QueueStatusBadge status={item.status} />
                </td>

                <td className="py-3 px-4 text-right font-medium">
                  {item.waitingTime !== '—' ? (
                    <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold text-[11px]">
                      <Clock className="h-3 w-3 text-amber-700" />
                      {item.waitingTime}
                    </span>
                  ) : (
                    <span className="text-[#94A3B8]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Responsive Cards ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {queue.map((item) => (
          <div key={item.token} className="p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-md border border-[#DCFCE7]">
                {item.token}
              </span>
              <QueueStatusBadge status={item.status} />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-sm text-[#17221B]">{item.patient}</div>
                <div className="text-[11px] text-[#64748B]">{item.department} • {item.doctor}</div>
              </div>
              {item.waitingTime !== '—' && (
                <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold text-[11px]">
                  <Clock className="h-3 w-3 text-amber-700" />
                  {item.waitingTime}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffCurrentQueue;

