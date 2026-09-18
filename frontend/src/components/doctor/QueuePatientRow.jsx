import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Clock, ChevronRight, UserCheck, CheckCircle2 } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Waiting
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
          </span>
          In Consultation
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Completed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700">
          {status}
        </span>
      );
  }
};

export const QueuePatientRow = ({ patient }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (patient.status === 'In Consultation') {
      navigate(`/doctor/consultation/${patient.id}`);
    } else {
      navigate(`/doctor/patient/${patient.id}`);
    }
  };

  const isConsulting = patient.status === 'In Consultation';

  return (
    <tr
      className={`border-b border-[#E2E8F0] hover:bg-slate-50/80 transition-colors group ${
        isConsulting ? 'bg-blue-50/35' : ''
      }`}
    >
      {/* 1. Queue Number */}
      <td className="py-4 px-4 font-extrabold text-sm text-[#0F172A] whitespace-nowrap">
        <span
          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-extrabold ${
            isConsulting
              ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
              : 'bg-slate-100 text-[#0F172A]'
          }`}
        >
          {patient.queueNo || `#${patient.queueNumber}`}
        </span>
      </td>

      {/* 2. Patient Name & Info */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#64748B] font-bold text-xs flex-shrink-0 group-hover:bg-[#CCFBF1] group-hover:text-[#0F766E] transition-colors">
            {(patient.patientName || patient.name).charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm text-[#0F172A] truncate group-hover:text-[#0F766E] transition-colors">
              {patient.patientName || patient.name}
            </div>
            <div className="text-[11px] text-[#64748B] truncate flex items-center gap-1.5 mt-0.5">
              <span>{patient.department || 'General OPD'}</span>
              {patient.reason && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="truncate max-w-xs">{patient.reason}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* 3. Appointment Time */}
      <td className="py-4 px-4 text-xs font-semibold text-[#0F172A] whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>{patient.appointmentTime}</span>
        </div>
      </td>

      {/* 4. Arrival Time */}
      <td className="py-4 px-4 text-xs text-[#64748B] whitespace-nowrap">
        {patient.arrivalTime || '—'}
      </td>

      {/* 5. Status Badge */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge status={patient.status} />
      </td>

      {/* 6. Waiting Time */}
      <td className="py-4 px-4 text-xs font-medium text-[#475569] whitespace-nowrap">
        {patient.waitingTime || patient.waitDuration || '—'}
      </td>

      {/* 7. Action Button */}
      <td className="py-4 px-4 text-right whitespace-nowrap">
        {isConsulting ? (
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0F766E] text-white hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] cursor-pointer"
          >
            <Stethoscope className="h-3.5 w-3.5" />
            Open Consultation
          </button>
        ) : (
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-[#E2E8F0] text-[#0F766E] bg-white hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] cursor-pointer"
          >
            View Patient
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </td>
    </tr>
  );
};
