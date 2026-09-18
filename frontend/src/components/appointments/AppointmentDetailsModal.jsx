import React from 'react';
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
  Building2,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileText,
  Printer,
  Share2,
  CalendarPlus,
  ClipboardCheck,
  FlaskConical,
  Pill,
  ArrowRight
} from 'lucide-react';
import { standardJourneySteps } from '../../data/mockAppointmentsData';

const journeyIcons = {
  ClipboardCheck,
  Stethoscope,
  FlaskConical,
  FileText,
  Pill
};

export const AppointmentDetailsModal = ({ isOpen, onClose, appointment, onReschedule, onCancel }) => {
  if (!isOpen || !appointment) return null;

  const {
    id,
    department,
    doctor,
    specialization,
    date,
    time,
    hospital,
    room,
    status,
    tab,
    type,
    reason,
    journeyStages
  } = appointment;

  // Compute status badge
  const isConfirmed = status === 'Confirmed';
  const isCompleted = status === 'Completed';
  const isCancelled = status === 'Cancelled';

  // Determine stage status
  const getStageStatus = (stepIndex) => {
    if (isCancelled) return 'cancelled';
    if (isCompleted) return 'completed';
    // For confirmed/upcoming:
    if (stepIndex === 0) return 'completed'; // Registration
    if (stepIndex === 1) return 'active';    // Consultation
    return 'pending';                         // Lab, Review, Pharmacy
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* ── Modal Header ── */}
        <div className="px-5 sm:px-7 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  Appointment Details
                </h3>
                <span className="font-mono text-xs font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  {id}
                </span>
              </div>
              <p className="text-xs text-[#64748B]">{hospital}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Modal Body Content ── */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Status banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
            <div>
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Appointment Status
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isConfirmed
                      ? 'bg-emerald-100/80 text-emerald-800'
                      : isCompleted
                      ? 'bg-blue-100/80 text-blue-800'
                      : 'bg-rose-100/80 text-rose-800'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isConfirmed
                        ? 'bg-emerald-500'
                        : isCompleted
                        ? 'bg-blue-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  {status}
                </span>
                {type && (
                  <span className="text-xs text-[#64748B] font-medium">
                    · {type}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                OPD Room
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0F172A] mt-0.5">
                {room || 'OPD Block B, Room 204'}
              </div>
            </div>
          </div>

          {/* Clinical & Schedule Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Doctor Info */}
            <div className="p-4 rounded-2xl border border-[#E2E8F0] space-y-2">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Consultant Doctor
              </div>
              <div className="text-sm font-bold text-[#0F172A]">{doctor}</div>
              <div className="text-xs text-[#64748B]">{specialization}</div>
              <div className="inline-block text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md">
                Department: {department}
              </div>
            </div>

            {/* Schedule Info */}
            <div className="p-4 rounded-2xl border border-[#E2E8F0] space-y-2">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Scheduled Slot
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F172A]">
                <CalendarDays className="h-4 w-4 text-[#0F766E]" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F172A]">
                <Clock className="h-4 w-4 text-[#0F766E]" />
                <span>{time}</span>
              </div>
              <div className="text-[11px] text-[#64748B]">
                Central OPD Hospital Campus
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          {reason && (
            <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-slate-50/50 space-y-1">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Reason for Consultation
              </div>
              <p className="text-xs sm:text-sm text-[#0F172A]">{reason}</p>
            </div>
          )}

          {/* ── Hospital Journey Workflow (Visual/Static) ── */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">Hospital Journey</h4>
                <p className="text-xs text-[#64748B]">
                  Live visual workflow stages for this consultation visit.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Visual Flow
              </span>
            </div>

            {/* Journey Stages Bar */}
            <div className="bg-slate-50 border border-[#E2E8F0] rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 relative">
                {standardJourneySteps.map((step, idx) => {
                  const Icon = journeyIcons[step.icon] || Stethoscope;
                  const stageStatus = getStageStatus(idx);

                  const isStageDone = stageStatus === 'completed';
                  const isStageActive = stageStatus === 'active';
                  const isStageCancelled = stageStatus === 'cancelled';

                  return (
                    <div
                      key={step.step}
                      className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                        isStageActive
                          ? 'bg-[#CCFBF1]/40 border-[#0F766E] ring-1 ring-[#0F766E]'
                          : isStageDone
                          ? 'bg-white border-emerald-200'
                          : isStageCancelled
                          ? 'bg-rose-50/50 border-rose-200 opacity-60'
                          : 'bg-white border-slate-200 opacity-70'
                      }`}
                    >
                      {/* Step Number + Icon */}
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs mb-2 ${
                          isStageActive
                            ? 'bg-[#0F766E] text-white shadow-xs animate-pulse'
                            : isStageDone
                            ? 'bg-emerald-500 text-white'
                            : isStageCancelled
                            ? 'bg-rose-400 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isStageDone ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>

                      <div className="text-xs font-bold text-[#0F172A] leading-tight">
                        {step.title}
                      </div>

                      <div className="mt-1 text-[10px] font-semibold">
                        {isStageActive && (
                          <span className="text-[#0F766E] uppercase tracking-wider">
                            Active
                          </span>
                        )}
                        {isStageDone && (
                          <span className="text-emerald-600 uppercase tracking-wider">
                            Done
                          </span>
                        )}
                        {isStageCancelled && (
                          <span className="text-rose-600 uppercase tracking-wider">
                            Cancelled
                          </span>
                        )}
                        {!isStageActive && !isStageDone && !isStageCancelled && (
                          <span className="text-[#94A3B8] uppercase tracking-wider">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="px-5 sm:px-7 py-4 border-t border-[#E2E8F0] bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#64748B]">
            Patient ID: <span className="font-semibold text-[#0F172A]">MF-2024-00742</span>
          </div>

          <div className="flex items-center gap-2">
            {tab === 'upcoming' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onReschedule && onReschedule(appointment);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] hover:bg-slate-100 transition-colors"
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onCancel && onCancel(appointment);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 bg-white text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Cancel Visit
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
