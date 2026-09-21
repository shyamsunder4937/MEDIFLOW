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
          bg: 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/25',
          dot: 'bg-[#15803D]',
          icon: CheckCircle2,
          label: 'Confirmed'
        };
      case 'completed':
        return {
          bg: 'bg-slate-100 text-[#475569] border-slate-200',
          dot: 'bg-slate-500',
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
    <div className="bg-white rounded-xl border border-[#E2E8F0] hover:border-slate-300 shadow-xs transition-all duration-150 flex flex-col justify-between overflow-hidden">
      {/* ── Top Header Bar ── */}
      <div className="px-5 py-3 bg-slate-50/70 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#15803D]/20">
            {id}
          </span>
          {type && (
            <span className="text-xs font-medium text-[#64748B] hidden sm:inline-block truncate">
              {type}
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.bg}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-5 flex-1 flex flex-col gap-3.5">
        {/* Department & Doctor */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
            {department}
          </div>
          <h3 className="text-base font-bold text-[#17221B] leading-tight">
            {doctor}
          </h3>
          {specialization && (
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <Stethoscope className="h-3.5 w-3.5 text-[#94A3B8] flex-shrink-0" />
              <span>{specialization}</span>
            </div>
          )}
        </div>

        {/* Date, Time Details */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#17221B] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <CalendarDays className="h-4 w-4 text-[#15803D] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-semibold">Date</div>
              <div className="font-semibold">{date}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#17221B] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <Clock className="h-4 w-4 text-[#15803D] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-semibold">Time</div>
              <div className="font-semibold">{time}</div>
            </div>
          </div>
        </div>

        {/* Hospital Center & Room */}
        <div className="flex items-start gap-2 text-xs text-[#64748B] pt-0.5">
          <MapPin className="h-3.5 w-3.5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-medium text-[#17221B]">{hospital}</span>
            {room && <span className="text-[#64748B] ml-1">· {room}</span>}
          </div>
        </div>

        {/* Cancellation Notice if applicable */}
        {cancellationReason && (
          <div className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 text-xs text-rose-700">
            <span className="font-semibold">Reason:</span> {cancellationReason}
          </div>
        )}
      </div>

      {/* ── Action Buttons Footer ── */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
        {/* View Details button - available on all */}
        <button
          onClick={() => onViewDetails(appointment)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <span>View Details</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* For upcoming tab: Reschedule and Cancel */}
        {tab === 'upcoming' && status !== 'Cancelled' && (
          <>
            <button
              onClick={() => onReschedule(appointment)}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3 w-3 text-[#64748B]" />
              <span>Reschedule</span>
            </button>
            <button
              onClick={() => onCancel(appointment)}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-rose-50 text-rose-600 hover:border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
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
            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F0FDF4] text-[#15803D] hover:border-[#15803D]/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Book Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
