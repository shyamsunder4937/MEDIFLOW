import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Clock,
  Building2,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Wind,
} from 'lucide-react';

export const ConsultationPatientHeader = ({ patient }) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'PT';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const displayName = patient.name || patient.patientName || 'Unknown Patient';
  const patientCode = patient.patientId || `PAT-10${patient.id || '21'}`;
  const queueDisplay = patient.queueNo || `#${patient.queueNumber || patient.id || '21'}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
      {/* Top Nav & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/doctor/queue')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] hover:bg-slate-50 hover:text-[#0F766E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Back to Queue</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/doctor/patient/${patient.id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>View Full Details</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] font-medium hidden sm:inline">Current Status:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            In Consultation
          </span>
        </div>
      </div>

      {/* Patient Profile Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Avatar & Personal Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-xl sm:text-2xl shadow-xs flex-shrink-0">
            {getInitials(displayName)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                {displayName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-[#0F172A] font-extrabold text-xs">
                {queueDisplay}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
              <span className="font-semibold text-[#0F766E] bg-[#CCFBF1]/50 px-2 py-0.5 rounded">
                {patientCode}
              </span>
              <span>•</span>
              <span>{patient.age} yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span className="font-medium text-[#0F172A]">{patient.department || 'General Medicine'}</span>
              <span>•</span>
              <span className="text-slate-500">{patient.visitType || 'Follow-up'}</span>
            </div>
          </div>
        </div>

        {/* Right: Key Consultation Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-[#64748B]">
              <Heart className="h-3 w-3 text-rose-500" />
              <span>BP</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
              {patient.vitals?.bp || '120/80'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-[#64748B]">
              <Activity className="h-3 w-3 text-emerald-600" />
              <span>Pulse</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
              {patient.vitals?.pulse || '84 bpm'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-[#64748B]">
              <Thermometer className="h-3 w-3 text-amber-500" />
              <span>Temp</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
              {patient.vitals?.temp || '102.1°F'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-[#64748B]">
              <Wind className="h-3 w-3 text-blue-500" />
              <span>SpO2</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
              {patient.vitals?.spo2 || '98%'}
            </div>
          </div>
        </div>
      </div>

      {/* Chief Complaint Strip */}
      {patient.reason && (
        <div className="flex items-start sm:items-center gap-2 p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs">
          <span className="font-bold text-amber-900 flex-shrink-0">Chief Complaint:</span>
          <span className="text-amber-950 font-medium">{patient.reason}</span>
        </div>
      )}
    </div>
  );
};

export default ConsultationPatientHeader;
