import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, Stethoscope, Coffee, AlertCircle } from 'lucide-react';

export const UpdateDoctorStatusModal = ({
  isOpen,
  onClose,
  doctor,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(doctor?.status || 'Available');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !doctor) return null;

  const statusOptions = [
    {
      value: 'Available',
      label: 'Available (Ready for OPD)',
      description: 'Doctor is in the consultation room and ready to call waiting patients.',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      value: 'In Consultation',
      label: 'In Consultation',
      description: 'Currently actively examining and treating a patient in the clinic suite.',
      icon: Stethoscope,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      value: 'On Break',
      label: 'On Break (Temporary)',
      description: 'Short meal or tea intermission. Queue admissions paused temporarily.',
      icon: Coffee,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      value: 'Unavailable',
      label: 'Unavailable / Off Duty',
      description: 'Not currently seeing patients for this shift or on emergency duty.',
      icon: AlertCircle,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onUpdateStatus(doctor.id, selectedStatus);
      setIsSubmitting(false);
      onClose();
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-gradient-to-r from-slate-50 to-teal-50/40 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] shadow-xs">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                Update Doctor Availability
              </h2>
              <p className="text-xs text-[#64748B]">
                Updating status for <strong className="text-[#0F172A]">{doctor.name}</strong> ({doctor.department})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 hover:text-[#0F172A] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              Select Availability Status:
            </label>

            <div className="space-y-2">
              {statusOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedStatus === opt.value;

                return (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0F766E] bg-teal-50/40 ring-1 ring-[#0F766E]'
                        : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="doctorStatus"
                      value={opt.value}
                      checked={isSelected}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="mt-1 text-[#0F766E] focus:ring-[#0F766E]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-md ${opt.color}`}>
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#0F172A]">
                          {opt.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{isSubmitting ? 'Updating…' : 'Save Status'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctorStatusModal;
