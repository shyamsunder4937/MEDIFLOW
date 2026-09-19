import React from 'react';
import { Clock, Stethoscope, CheckCircle2, Calendar } from 'lucide-react';

export const PatientStatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: status || 'Unknown',
    bg: 'bg-slate-50',
    text: 'text-[#64748B]',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock,
  };

  if (normalized === 'waiting') {
    config = {
      label: 'Waiting',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/80',
      dot: 'bg-[#D97706]',
      icon: Clock,
    };
  } else if (normalized === 'in consultation' || normalized === 'consultation') {
    config = {
      label: 'In Consultation',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/80',
      dot: 'bg-[#2563EB]',
      icon: Stethoscope,
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
  } else if (normalized === 'upcoming') {
    config = {
      label: 'Upcoming',
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200/80',
      dot: 'bg-sky-500',
      icon: Calendar,
    };
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <Icon className="h-3 w-3 opacity-80" />
      <span>{config.label}</span>
    </span>
  );
};

export default PatientStatusBadge;
