import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListOrdered,
  Clock,
  Stethoscope,
  ChevronRight,
  SearchX,
  Volume2,
  Play,
  Eye,
  DoorOpen,
} from 'lucide-react';

export const StaffQueueStatusBadge = ({ status }) => {
  switch (status) {
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          In Consultation
        </span>
      );
    case 'Called':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] animate-pulse">
          <Volume2 className="h-3 w-3 text-[#15803D]" />
          Called
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

export const QueueTable = ({
  queue = [],
  totalCount = 0,
  onCallPatient,
  onStartVisit,
  onClearFilters,
  isFiltered = false,
}) => {
  const navigate = useNavigate();

  const isLongWait = (waitTimeStr) => {
    if (!waitTimeStr || waitTimeStr === '—') return false;
    const num = parseInt(waitTimeStr, 10);
    return !isNaN(num) && num >= 20;
  };

  return (
    <section className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Table Header Bar ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17221B]">Current Queue</h2>
            <p className="text-xs text-[#64748B]">
              Active patient list with real-time consultation dispatch controls
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#DCFCE7]">
            Showing {queue.length} of {totalCount} Patients
          </span>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4">Token</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Doctor & Room</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Appointment</th>
              <th className="py-3 px-4">Waiting Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {queue.length > 0 ? (
              queue.map((item) => {
                const longWait = isLongWait(item.waitingTime);
                return (
                  <tr
                    key={item.id || item.token}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Token */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-xs bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-md border border-[#DCFCE7] inline-block">
                        {item.token}
                      </span>
                    </td>

                    {/* Patient */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#17221B]">{item.patient}</div>
                      <div className="text-[11px] text-[#64748B] font-mono">{item.patientId}</div>
                    </td>

                    {/* Doctor & Room */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#17221B] flex items-center gap-1.5">
                        <Stethoscope className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                        <span>{item.doctor}</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <DoorOpen className="h-3 w-3" />
                        <span>{item.room}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4 text-[#475569] font-medium">
                      {item.department}
                    </td>

                    {/* Appointment */}
                    <td className="py-3.5 px-4 text-[#64748B]">
                      {item.appointmentTime}
                    </td>

                    {/* Waiting Time */}
                    <td className="py-3.5 px-4">
                      {item.waitingTime !== '—' ? (
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                            longWait
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          <span>{item.waitingTime}</span>
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StaffQueueStatusBadge status={item.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === 'Waiting' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onCallPatient && onCallPatient(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DCFCE7] text-[#15803D] bg-[#F0FDF4] hover:bg-[#DCFCE7] font-bold text-[11px] transition-colors cursor-pointer"
                              title="Announce token"
                            >
                              <Volume2 className="h-3 w-3" />
                              <span>Call</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onStartVisit && onStartVisit(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#15803D] text-white hover:bg-[#166534] font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                            >
                              <Play className="h-3 w-3 fill-current" />
                              <span>Start Visit</span>
                            </button>
                          </>
                        )}

                        {item.status === 'Called' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onCallPatient && onCallPatient(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100 font-bold text-[11px] transition-colors cursor-pointer"
                              title="Re-announce token"
                            >
                              <Volume2 className="h-3 w-3" />
                              <span>Recall</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onStartVisit && onStartVisit(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#15803D] text-white hover:bg-[#166534] font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
                            >
                              <Play className="h-3 w-3 fill-current" />
                              <span>Start Visit</span>
                            </button>
                          </>
                        )}

                        {item.status === 'In Consultation' && (
                          <button
                            type="button"
                            onClick={() => navigate('/staff/patients')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#15803D] bg-white hover:bg-[#F0FDF4] font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            <Eye className="h-3 w-3" />
                            <span>View Patient</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}

                        {item.status === 'Completed' && (
                          <button
                            type="button"
                            onClick={() => navigate('/staff/patients')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] bg-white hover:bg-slate-50 font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            <span>View</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <SearchX className="h-8 w-8 text-slate-300" />
                    <p className="text-sm font-bold text-[#17221B]">No patients found</p>
                    <p className="text-xs text-[#64748B]">
                      Try changing your search or filters.
                    </p>
                    {isFiltered && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="mt-2 px-3 py-1.5 rounded-lg bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Responsive Cards ── */}
      <div className="lg:hidden divide-y divide-[#E2E8F0]">
        {queue.length > 0 ? (
          queue.map((item) => {
            const longWait = isLongWait(item.waitingTime);
            return (
              <div key={item.id || item.token} className="p-4 space-y-3">
                {/* Token and Status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs bg-[#F0FDF4] text-[#15803D] px-2.5 py-1 rounded-md border border-[#DCFCE7]">
                    {item.token}
                  </span>
                  <StaffQueueStatusBadge status={item.status} />
                </div>

                {/* Patient & Doctor */}
                <div className="space-y-1">
                  <div className="font-bold text-sm text-[#17221B]">{item.patient}</div>
                  <div className="text-xs text-[#64748B] flex items-center justify-between">
                    <span>{item.department} • {item.doctor} ({item.room})</span>
                    <span>Appt: {item.appointmentTime}</span>
                  </div>
                </div>

                {/* Waiting time & Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    {item.waitingTime !== '—' ? (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          longWait
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {item.waitingTime}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#94A3B8]">In room</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.status === 'Waiting' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onCallPatient && onCallPatient(item)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#DCFCE7] text-[#15803D] bg-[#F0FDF4] font-bold text-xs"
                        >
                          Call
                        </button>
                        <button
                          type="button"
                          onClick={() => onStartVisit && onStartVisit(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#15803D] text-white font-bold text-xs"
                        >
                          Start Visit
                        </button>
                      </>
                    )}

                    {item.status === 'Called' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onCallPatient && onCallPatient(item)}
                          className="px-2.5 py-1.5 rounded-lg border border-amber-200 text-amber-800 bg-amber-50 font-bold text-xs"
                        >
                          Recall
                        </button>
                        <button
                          type="button"
                          onClick={() => onStartVisit && onStartVisit(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#15803D] text-white font-bold text-xs"
                        >
                          Start Visit
                        </button>
                      </>
                    )}

                    {(item.status === 'In Consultation' || item.status === 'Completed') && (
                      <button
                        type="button"
                        onClick={() => navigate('/staff/patients')}
                        className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#15803D] font-semibold text-xs"
                      >
                        View Patient
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 px-4 text-center space-y-2">
            <SearchX className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-[#17221B]">No patients found</p>
            <p className="text-xs text-[#64748B]">Try changing your search or filters.</p>
            {isFiltered && (
              <button
                type="button"
                onClick={onClearFilters}
                className="mt-2 px-3.5 py-1.5 rounded-lg bg-[#15803D] text-white text-xs font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QueueTable;

