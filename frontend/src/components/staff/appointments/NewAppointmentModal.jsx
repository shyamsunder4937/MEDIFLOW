import React, { useState } from 'react';
import { X, CalendarPlus, AlertCircle, Building2, User, Clock } from 'lucide-react';

export const NewAppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: 'General Medicine',
    doctor: 'Dr. Kumar',
    date: '2026-09-18',
    time: '11:00 AM',
    type: 'Consultation',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDepartmentChange = (dept) => {
    let defaultDoc = 'Dr. Kumar';
    if (dept === 'Cardiology') defaultDoc = 'Dr. Sharma';
    if (dept === 'Pediatrics') defaultDoc = 'Dr. Priya';
    if (dept === 'Orthopedics') defaultDoc = 'Dr. Ahmed';
    if (dept === 'Dermatology') defaultDoc = 'Dr. Iyer';

    setFormData((prev) => ({
      ...prev,
      department: dept,
      doctor: defaultDoc,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.date) {
      newErrors.date = 'Appointment date is required.';
    }

    if (!formData.time) {
      newErrors.time = 'Time slot is required.';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for visit is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      status: 'Confirmed',
    };

    setTimeout(() => {
      onSubmit(payload);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 shadow-2xs">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">
                Create New Appointment
              </h2>
              <p className="text-xs text-[#64748B]">
                Book an outpatient consultation or follow-up slot with a hospital physician.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 hover:text-[#17221B] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Patient Details Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] pb-1 border-b border-slate-100">
              <User className="h-3.5 w-3.5" />
              <span>Patient Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => {
                    setFormData({ ...formData, patientName: e.target.value });
                    if (errors.patientName) setErrors({ ...errors, patientName: undefined });
                  }}
                  placeholder="e.g. Rahul Kumar"
                  className={`w-full rounded-lg border px-3 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                    errors.patientName ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                  }`}
                />
                {errors.patientName && (
                  <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="9876543210"
                  className={`w-full rounded-lg border px-3 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                    errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                  }`}
                />
                {errors.phone && (
                  <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Department & Doctor Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] pb-1 border-b border-slate-100">
              <Building2 className="h-3.5 w-3.5" />
              <span>Department & Doctor</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Consulting Physician <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
                >
                  <option value="Dr. Kumar">Dr. Kumar (Gen Med)</option>
                  <option value="Dr. Sharma">Dr. Sharma (Cardiology)</option>
                  <option value="Dr. Priya">Dr. Priya (Pediatrics)</option>
                  <option value="Dr. Ahmed">Dr. Ahmed (Orthopedics)</option>
                  <option value="Dr. Iyer">Dr. Iyer (Dermatology)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Slot & Type Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15803D] pb-1 border-b border-slate-100">
              <Clock className="h-3.5 w-3.5" />
              <span>Appointment Schedule & Type</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="New Patient">New Patient</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Reason for Visit <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={formData.reason}
                onChange={(e) => {
                  setFormData({ ...formData, reason: e.target.value });
                  if (errors.reason) setErrors({ ...errors, reason: undefined });
                }}
                placeholder="e.g. Routine blood pressure checkup and ECG review."
                className={`w-full rounded-lg border px-3 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all ${
                  errors.reason ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}
              />
              {errors.reason && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  {errors.reason}
                </p>
              )}
            </div>
          </div>

          {/* ── Footer Actions ── */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#17221B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <CalendarPlus className="h-4 w-4" />
              <span>{isSubmitting ? 'Creating…' : 'Create Appointment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
