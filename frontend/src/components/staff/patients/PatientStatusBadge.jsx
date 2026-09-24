import React from 'react';
import { Clock, Stethoscope, CheckCircle2, Calendar } from 'lucide-react';

export const PatientStatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: status || 'Unknown',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock,
  };

  if (normalized === 'waiting') {
    config = {
      label: 'Waiting',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: Clock,
    };
  } else if (normalized === 'in consultation' || normalized === 'consultation') {
    config = {
      label: 'In Consultation',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-600',
      icon: Stethoscope,
    };
  } else if (normalized === 'completed') {
    config = {
      label: 'Completed',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-emerald-200',
      dot: 'bg-[#15803D]',
      icon: CheckCircle2,
    };
  } else if (normalized === 'upcoming') {
    config = {
      label: 'Upcoming',
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
      icon: Calendar,
    };
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <Icon className="h-3 w-3 opacity-80" />
      <span>{config.label}</span>
    </span>
  );
};

export default PatientStatusBadge;
