import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Building2,
  AlertCircle,
  Clock,
} from 'lucide-react';

const DEPARTMENT_TYPES = ['Clinical', 'Diagnostic', 'Support'];
const DEPARTMENT_STATUSES = ['Active', 'Inactive', 'Maintenance'];

export const AddDepartmentModal = ({
  isOpen,
  onClose,
  onAddDepartment,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Clinical',
    leadDoctor: '',
    leadDoctorRole: '',
    capacity: 50,
    openingTime: '08:00 AM',
    closingTime: '08:00 PM',
    is24Hours: false,
    status: 'Active',
    doctorsCount: 8,
    floor: '',
    contactNumber: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Department name is required';
    if (!formData.leadDoctor.trim()) errs.leadDoctor = 'Lead doctor / supervisor is required';
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      errs.capacity = 'Capacity must be greater than 0';
    }
    if (!formData.is24Hours) {
      if (!formData.openingTime.trim()) errs.openingTime = 'Opening time is required';
      if (!formData.closingTime.trim()) errs.closingTime = 'Closing time is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate next mock Department ID
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `DPT-${randomSuffix}`;

    const operatingHours = formData.is24Hours
      ? '24 Hours'
      : `${formData.openingTime} - ${formData.closingTime}`;

    const newDepartment = {
      id: newId,
      name: formData.name.trim(),
      type: formData.type,
      leadDoctor: formData.leadDoctor.trim(),
      leadDoctorRole: formData.leadDoctorRole.trim() || 'Department Head',
      doctorsCount: Number(formData.doctorsCount) || 5,
      patientsToday: 0,
      waitingCount: 0,
      capacity: Number(formData.capacity),
      operatingHours,
      status: formData.status,
      floor: formData.floor.trim() || 'Floor 1, Main Complex',
      contactNumber: formData.contactNumber.trim() || '+91 80 2345 6700',
      description: formData.description.trim() || `${formData.name} specialized healthcare services.`,
    };

    onAddDepartment(newDepartment);
    onClose();

    // Reset form
    setFormData({
      name: '',
      type: 'Clinical',
      leadDoctor: '',
      leadDoctorRole: '',
      capacity: 50,
      openingTime: '08:00 AM',
      closingTime: '08:00 PM',
      is24Hours: false,
      status: 'Active',
      doctorsCount: 8,
      floor: '',
      contactNumber: '',
      description: '',
    });
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-department-modal-title"
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="add-department-modal-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Add New Department
              </h3>
              <p className="text-xs text-[#64748B]">
                Configure hospital wing, assigned doctors, and operating capacity.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Department Name */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                errors.name ? 'border-red-400 focus:ring-red-400' : 'border-[#E2E8F0] focus:ring-[#0F766E]'
              } rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              placeholder="e.g. Neurology, Oncology, Dermatology"
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Department Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Department Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent cursor-pointer"
              >
                {DEPARTMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Initial Operational Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent cursor-pointer"
              >
                {DEPARTMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lead Doctor & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Lead Doctor / Supervisor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.leadDoctor}
                onChange={(e) => setFormData({ ...formData, leadDoctor: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                  errors.leadDoctor ? 'border-red-400 focus:ring-red-400' : 'border-[#E2E8F0] focus:ring-[#0F766E]'
                } rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                placeholder="e.g. Dr. Sunita Menon"
              />
              {errors.leadDoctor && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.leadDoctor}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Designation / Title
              </label>
              <input
                type="text"
                value={formData.leadDoctorRole}
                onChange={(e) => setFormData({ ...formData, leadDoctorRole: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="e.g. Head of Pediatric Neurology"
              />
            </div>
          </div>

          {/* Capacity & Doctors Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Department Capacity (Daily Slots) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                  errors.capacity ? 'border-red-400 focus:ring-red-400' : 'border-[#E2E8F0] focus:ring-[#0F766E]'
                } rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                placeholder="50"
              />
              {errors.capacity && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.capacity}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Initial Doctors Assigned
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.doctorsCount}
                onChange={(e) => setFormData({ ...formData, doctorsCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="8"
              />
            </div>
          </div>

          {/* Operating Hours (Opening / Closing Time or 24 Hours) */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                Operating Schedule
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F766E]">
                <input
                  type="checkbox"
                  checked={formData.is24Hours}
                  onChange={(e) => setFormData({ ...formData, is24Hours: e.target.checked })}
                  className="rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E]"
                />
                24 Hours Continuous
              </label>
            </div>

            {!formData.is24Hours && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Opening Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.openingTime}
                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.openingTime ? 'border-red-400' : 'border-[#E2E8F0]'
                    } rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]`}
                    placeholder="08:00 AM"
                  />
                  {errors.openingTime && (
                    <p className="text-[10px] text-red-600 mt-0.5">{errors.openingTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Closing Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.closingTime}
                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.closingTime ? 'border-red-400' : 'border-[#E2E8F0]'
                    } rounded-lg text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]`}
                    placeholder="08:00 PM"
                  />
                  {errors.closingTime && (
                    <p className="text-[10px] text-red-600 mt-0.5">{errors.closingTime}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Location & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Floor / Wing Location
              </label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="Floor 2, Wing C"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Internal Extension
              </label>
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="+91 80 2345 6709"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Description & Clinical Scope
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent resize-none"
              placeholder="Brief description of patient services and procedures..."
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#334155] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
