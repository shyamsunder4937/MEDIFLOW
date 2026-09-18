import React from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
  ChevronRight,
  RefreshCw,
  XCircle,
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AppointmentCard = ({
  appointment,
  onViewDetails,
  onReschedule,
  onCancel,
  onBookAgain
}) => {
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
    cancellationReason
  } = appointment;

  // Status Badge Styling
  const getStatusBadge = (st) => {
    switch (st?.toLowerCase()) {
      case 'confirmed':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Confirmed'
        };
      case 'completed':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          icon: CheckCircle2,
          label: 'Completed'
        };
      case 'cancelled':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'rescheduled':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          icon: AlertCircle,
          label: 'Rescheduled'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          icon: CheckCircle2,
          label: st || 'Active'
        };
    }
  };

  const statusInfo = getStatusBadge(status);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* ── Top Header Bar ── */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1]/70 px-2.5 py-0.5 rounded-lg border border-teal-200/60">
            {id}
          </span>
          {type && (
            <span className="text-[11px] font-medium text-[#64748B] hidden sm:inline-block truncate">
              {type}
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Department & Doctor */}
        <div className="space-y-1.5">
          <div className="inline-block text-xs font-semibold text-[#0F766E] tracking-wide uppercase">
            {department}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight group-hover:text-[#0F766E] transition-colors">
            {doctor}
          </h3>
          {specialization && (
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <Stethoscope className="h-3.5 w-3.5 text-[#94A3B8] flex-shrink-0" />
              <span>{specialization}</span>
            </div>
          )}
        </div>

        {/* Date, Time, Hospital Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm">
          {/* Date */}
          <div className="flex items-center gap-2 text-[#0F172A] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <CalendarDays className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-semibold">Date</div>
              <div className="font-semibold">{date}</div>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-[#0F172A] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Clock className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-semibold">Time</div>
              <div className="font-semibold">{time}</div>
            </div>
          </div>
        </div>

        {/* Hospital Center & Room */}
        <div className="flex items-start gap-2 text-xs text-[#64748B] pt-1">
          <MapPin className="h-4 w-4 text-[#94A3B8] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-medium text-[#0F172A]">{hospital}</span>
            {room && <span className="text-[#64748B] ml-1.5">({room})</span>}
          </div>
        </div>

        {/* Cancellation Notice if applicable */}
        {cancellationReason && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 text-xs text-rose-700">
            <span className="font-semibold">Reason:</span> {cancellationReason}
          </div>
        )}
      </div>

      {/* ── Action Buttons Footer ── */}
      <div className="px-5 py-3.5 bg-slate-50/40 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
        {/* View Details button - available on all */}
        <button
          onClick={() => onViewDetails(appointment)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* For upcoming tab: Reschedule and Cancel */}
        {tab === 'upcoming' && status !== 'Cancelled' && (
          <>
            <button
              onClick={() => onReschedule(appointment)}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <RefreshCw className="h-3 w-3 text-[#64748B]" />
              <span>Reschedule</span>
            </button>
            <button
              onClick={() => onCancel(appointment)}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-rose-50 text-rose-600 hover:border-rose-200 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            >
              <XCircle className="h-3 w-3" />
              <span>Cancel</span>
            </button>
          </>
        )}

        {/* For past / cancelled: Rebook shortcut */}
        {(tab === 'past' || tab === 'cancelled') && onBookAgain && (
          <button
            onClick={() => onBookAgain(appointment)}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-teal-50 text-[#0F766E] hover:border-teal-200 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <span>Book Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
