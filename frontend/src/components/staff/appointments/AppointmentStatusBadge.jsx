import React from 'react';
import {
  CalendarCheck,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from 'lucide-react';

export const AppointmentStatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: status || 'Unknown',
    bg: 'bg-slate-50',
    text: 'text-[#64748B]',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock,
  };

  if (normalized === 'confirmed') {
    config = {
      label: 'Confirmed',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/80',
      dot: 'bg-[#2563EB]',
      icon: CalendarCheck,
    };
  } else if (normalized === 'checked in' || normalized === 'checkedin') {
    config = {
      label: 'Checked In',
      bg: 'bg-[#CCFBF1]/70',
      text: 'text-[#0F766E]',
      border: 'border-[#0F766E]/20',
      dot: 'bg-[#0F766E]',
      icon: UserCheck,
    };
  } else if (normalized === 'waiting') {
    config = {
      label: 'Waiting',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/80',
      dot: 'bg-[#D97706]',
      icon: Clock,
    };
  } else if (normalized === 'completed') {
    config = {
      label: 'Completed',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/80',
      dot: 'bg-[#16A34A]',
      icon: CheckCircle2,
    };
  } else if (normalized === 'cancelled' || normalized === 'canceled') {
    config = {
      label: 'Cancelled',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200/80',
      dot: 'bg-[#DC2626]',
      icon: XCircle,
    };
  } else if (normalized === 'rescheduled') {
    config = {
      label: 'Rescheduled',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200/80',
      dot: 'bg-purple-600',
      icon: CalendarClock,
    };
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <Icon className="h-3 w-3 opacity-85" />
      <span>{config.label}</span>
    </span>
  );
};

export default AppointmentStatusBadge;
