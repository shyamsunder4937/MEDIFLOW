import React from 'react';
import { CheckCircle2, Stethoscope, Coffee, AlertCircle } from 'lucide-react';

export const DoctorStatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    label: status || 'Unknown',
    bg: 'bg-slate-50',
    text: 'text-[#64748B]',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: CheckCircle2,
  };

  if (normalized === 'available') {
    config = {
      label: 'Available',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/80',
      dot: 'bg-[#16A34A]',
      icon: CheckCircle2,
    };
  } else if (normalized === 'in consultation' || normalized === 'consultation' || normalized === 'busy') {
    config = {
      label: 'In Consultation',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/80',
      dot: 'bg-[#2563EB]',
      icon: Stethoscope,
    };
  } else if (normalized === 'on break' || normalized === 'break') {
    config = {
      label: 'On Break',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/80',
      dot: 'bg-[#D97706]',
      icon: Coffee,
    };
  } else if (normalized === 'unavailable' || normalized === 'off duty' || normalized === 'offline') {
    config = {
      label: 'Unavailable',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200/80',
      dot: 'bg-[#DC2626]',
      icon: AlertCircle,
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

export default DoctorStatusBadge;
