import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchX,
  Stethoscope,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { QueuePatientRow, StatusBadge } from './QueuePatientRow';

export const QueueTable = ({
  patients = [],
  totalCount = 0,
  onClearFilters,
  isFiltered = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Desktop Table View (Hidden on mobile / tablet < 768px) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3.5 px-4">Queue</th>
              <th className="py-3.5 px-4">Patient</th>
              <th className="py-3.5 px-4">Appointment</th>
              <th className="py-3.5 px-4">Arrival</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Waiting Time</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <QueuePatientRow key={patient.id} patient={patient} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B]">
                      <SearchX className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#17221B]">No patients found</h3>
                      <p className="text-xs text-[#64748B]">
                        There are no patients matching your current filters.
                      </p>
                    </div>
                    {isFiltered && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-all shadow-xs cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
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

      {/* ── Mobile Responsive Card View (Visible on mobile screens) ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {patients.length > 0 ? (
          patients.map((patient) => {
            const isConsulting = patient.status === 'In Consultation';
            return (
              <div
                key={patient.id}
                className={`p-4 space-y-3 transition-colors ${
                  isConsulting ? 'bg-blue-50/30' : 'hover:bg-slate-50/70'
                }`}
              >
                {/* Header: Queue Token & Patient Name + Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        isConsulting
                          ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-200'
                          : 'bg-slate-100 text-[#17221B]'
                      }`}
                    >
                      {patient.queueNo || `#${patient.queueNumber}`}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-[#17221B]">
                        {patient.patientName || patient.name}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {patient.department || 'General Medicine'}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={patient.status} />
                </div>

                {/* Patient Reason / Complaint Note */}
                {patient.reason && (
                  <div className="text-xs text-[#475569] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-medium text-[#64748B]">Note: </span>
                    {patient.reason}
                  </div>
                )}

                {/* Timing Details Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs p-2 rounded-lg bg-slate-50/60 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] font-medium block">Appt Time</span>
                    <span className="font-semibold text-[#17221B]">{patient.appointmentTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] font-medium block">Arrival</span>
                    <span className="font-semibold text-[#17221B]">{patient.arrivalTime || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] font-medium block">Waiting</span>
                    <span className="font-semibold text-[#17221B]">{patient.waitingTime || patient.waitDuration || '—'}</span>
                  </div>
                </div>

                {/* Mobile Action Button */}
                <div className="pt-1">
                  {isConsulting ? (
                    <button
                      onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-[#15803D] text-white hover:bg-[#166534] shadow-xs cursor-pointer"
                    >
                      <Stethoscope className="h-4 w-4" />
                      Open Consultation
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border border-[#E2E8F0] text-[#15803D] bg-white hover:bg-[#F0FDF4] cursor-pointer"
                    >
                      View Patient
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B] mx-auto">
              <SearchX className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#17221B]">No patients found</h3>
              <p className="text-xs text-[#64748B]">
                There are no patients matching your current filters.
              </p>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Table Footer ── */}
      <div className="p-3.5 bg-slate-50/80 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
        <span>
          Showing <span className="font-bold text-[#17221B]">{patients.length}</span> of{' '}
          <span className="font-bold text-[#17221B]">{totalCount}</span> patients in queue
        </span>
        <span className="text-[11px] text-[#94A3B8]">
          Suite 4B • General Medicine OPD
        </span>
      </div>
    </div>
  );
};
