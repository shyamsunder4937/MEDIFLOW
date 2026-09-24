import React from 'react';
import { CheckCircle2, Stethoscope, Coffee, AlertCircle } from 'lucide-react';

export const DoctorStatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: status || 'Unknown',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: CheckCircle2,
  };

  if (normalized === 'available') {
    config = {
      label: 'Available',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-emerald-200',
      dot: 'bg-[#15803D]',
      icon: CheckCircle2,
    };
  } else if (normalized === 'in consultation' || normalized === 'consultation' || normalized === 'busy') {
    config = {
      label: 'In Consultation',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      dot: 'bg-blue-600',
      icon: Stethoscope,
    };
  } else if (normalized === 'on break' || normalized === 'break') {
    config = {
      label: 'On Break',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: Coffee,
    };
  } else if (normalized === 'unavailable' || normalized === 'off duty' || normalized === 'offline') {
    config = {
      label: 'Unavailable',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
      icon: AlertCircle,
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

export default DoctorStatusBadge;
