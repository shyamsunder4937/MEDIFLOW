import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  Activity,
  Coffee,
  UserX,
  Clock,
  Save,
  Building2,
  MapPin,
} from 'lucide-react';
import { DoctorStatusBadge } from './DoctorStatusBadge';

export const ManageAvailabilityModal = ({
  doctor,
  isOpen,
  onClose,
  onSaveAvailability,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('Available');
  const [workingHours, setWorkingHours] = useState('09:00 AM - 05:00 PM');

  useEffect(() => {
    if (doctor) {
      setSelectedStatus(doctor.status || 'Available');
      setWorkingHours(doctor.availability || '09:00 AM - 05:00 PM');
    }
  }, [doctor, isOpen]);

  if (!isOpen || !doctor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAvailability(doctor.id, selectedStatus, workingHours);
    onClose();
  };

  const statusOptions = [
    {
      id: 'Available',
      label: 'Available',
      description: 'Ready to receive waiting & walk-in patients in consultation room',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'In Consultation',
      label: 'In Consultation',
      description: 'Actively conducting an examination / patient session',
      icon: Activity,
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#CCFBF1]',
      borderColor: 'border-[#0F766E]/20',
    },
    {
      id: 'On Break',
      label: 'On Break',
      description: 'Temporarily on scheduled break / lunch interval',
      icon: Coffee,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'Unavailable',
      label: 'Unavailable',
      description: 'Off-duty, in emergency surgery, or shift concluded',
      icon: UserX,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
    {
      id: 'Inactive',
      label: 'Inactive',
      description: 'Account deactivated / on extended sabbatical or leave',
      icon: Clock,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-200',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      aria-labelledby="manage-availability-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 shadow-xs">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="manage-availability-modal-title"
                className="text-base sm:text-lg font-bold text-[#0F172A]"
              >
                Manage Doctor Availability
              </h3>
              <p className="text-xs text-[#64748B]">
                Update clinical duty status and shift schedule
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Doctor Info Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="font-bold text-[#0F172A] text-sm">{doctor.name}</div>
              <DoctorStatusBadge status={doctor.status} />
            </div>
            <div className="text-[11px] text-[#64748B] flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3 text-[#94A3B8]" />
                {doctor.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#94A3B8]" />
                {doctor.room || 'Room 102'}
              </span>
            </div>
          </div>

          {/* Status Selection Cards */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-2">
              Select Current Duty Status <span className="text-rose-500">*</span>
            </label>
            <div className="space-y-2">
              {statusOptions.map((opt) => {
                const isSelected = selectedStatus === opt.id;
                const Icon = opt.icon;

                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedStatus(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#0F766E] bg-[#CCFBF1]/30 ring-1 ring-[#0F766E]'
                        : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${opt.bgColor} ${opt.color} flex-shrink-0 mt-0.5`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0F172A]">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Working Hours Input */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Working Hours / Duty Hours
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="e.g. 09:00 AM - 05:00 PM or 24 Hours"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              Save Availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAvailabilityModal;
