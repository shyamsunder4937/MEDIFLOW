import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Stethoscope,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { doctorDashboardData } from '../../data/doctorMockData';
import { QueuePatientRow, StatusBadge } from './QueuePatientRow';

export const CurrentQueue = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const queueList = doctorDashboardData.queue;

  const filteredQueue = queueList.filter((patient) => {
    const matchesFilter =
      filterStatus === 'ALL'
        ? true
        : filterStatus === 'WAITING'
        ? patient.status === 'Waiting'
        : filterStatus === 'CONSULTING'
        ? patient.status === 'In Consultation'
        : filterStatus === 'COMPLETED'
        ? patient.status === 'Completed'
        : true;

    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.queueNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.reason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const waitingCount = queueList.filter((p) => p.status === 'Waiting').length;
  const inConsultCount = queueList.filter((p) => p.status === 'In Consultation').length;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Header & Toolbar ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B] tracking-tight">
                Current Queue
              </h2>
              <span className="rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold">
                {waitingCount} Waiting • {inConsultCount} In Room
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Patients currently assigned to your queue in Consultation Suite 4B.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search patient or #token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-[#17221B] placeholder:text-[#94A3B8] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 mt-3.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'text-[#64748B] hover:bg-slate-100'
            }`}
          >
            All Patients ({queueList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('WAITING')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'WAITING'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-[#64748B] hover:bg-slate-100'
            }`}
          >
            Waiting ({waitingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('CONSULTING')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'CONSULTING'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#64748B] hover:bg-slate-100'
            }`}
          >
            In Consultation ({inConsultCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('COMPLETED')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'COMPLETED'
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'text-[#64748B] hover:bg-slate-100'
            }`}
          >
            Completed (2)
          </button>
        </div>
      </div>

      {/* ── Desktop Table View (Hidden on mobile/small tablet) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4">Queue #</th>
              <th className="py-3 px-4">Patient Name & Chief Complaint</th>
              <th className="py-3 px-4">Appt Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Wait Time</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueue.length > 0 ? (
              filteredQueue.map((patient) => (
                <QueuePatientRow key={patient.id} patient={patient} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-xs text-[#64748B]">
                  No patients match the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card View (Visible on mobile screens) ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {filteredQueue.length > 0 ? (
          filteredQueue.map((patient) => {
            const isConsulting = patient.status === 'In Consultation';
            return (
              <div
                key={patient.id}
                className={`p-4 space-y-3 ${isConsulting ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#17221B] font-bold text-xs">
                      {patient.queueNo}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-[#17221B]">
                        {patient.name}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {patient.age}y • {patient.gender}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={patient.status} />
                </div>

                <div className="text-xs text-[#475569] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-medium text-[#64748B]">Complaint: </span>
                  {patient.reason}
                </div>

                <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
                    <span>{patient.appointmentTime}</span>
                    <span className="text-slate-300">•</span>
                    <span>{patient.waitDuration}</span>
                  </div>

                  {isConsulting ? (
                    <button
                      onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#15803D] text-white shadow-xs cursor-pointer"
                    >
                      <Stethoscope className="h-3.5 w-3.5" />
                      Consult
                    </button>
                  ) : patient.status === 'Completed' ? (
                    <button
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-[#475569] cursor-pointer"
                    >
                      Summary
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] text-[#15803D] bg-white cursor-pointer"
                    >
                      View Patient
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-xs text-[#64748B]">
            No patients match your search.
          </div>
        )}
      </div>

      {/* ── Footer Link ── */}
      <div className="p-3 bg-slate-50/80 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Showing {filteredQueue.length} of {queueList.length} patients</span>
        <button
          onClick={() => navigate('/doctor/queue')}
          className="font-medium text-[#15803D] hover:underline flex items-center gap-1 cursor-pointer"
        >
          Open Full Queue Management
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
