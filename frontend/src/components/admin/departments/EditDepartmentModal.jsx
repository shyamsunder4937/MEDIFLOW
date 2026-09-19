import React, { useState, useEffect } from 'react';
import {
  X,
  Edit2,
  Building2,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const DEPARTMENT_TYPES = ['Clinical', 'Diagnostic', 'Support'];
const DEPARTMENT_STATUSES = ['Active', 'Inactive', 'Maintenance'];

export const EditDepartmentModal = ({
  department,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Clinical',
    leadDoctor: '',
    leadDoctorRole: '',
    capacity: 50,
    operatingHours: '08:00 AM - 08:00 PM',
    status: 'Active',
    floor: '',
    contactNumber: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        type: department.type || 'Clinical',
        leadDoctor: department.leadDoctor || '',
        leadDoctorRole: department.leadDoctorRole || '',
        capacity: department.capacity || 50,
        operatingHours: department.operatingHours || '08:00 AM - 08:00 PM',
        status: department.status || 'Active',
        floor: department.floor || '',
        contactNumber: department.contactNumber || '',
        description: department.description || '',
      });
      setErrors({});
    }
  }, [department, isOpen]);

  if (!isOpen || !department) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Department name is required';
    if (!formData.leadDoctor.trim()) errs.leadDoctor = 'Lead doctor / supervisor is required';
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      errs.capacity = 'Capacity must be greater than 0';
    }
    if (!formData.operatingHours.trim()) {
      errs.operatingHours = 'Operating hours are required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...department,
      ...formData,
      capacity: Number(formData.capacity),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-department-modal-title"
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <Edit2 className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="edit-department-modal-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Edit Department
              </h3>
              <p className="text-xs text-[#64748B]">
                Update operational details for <span className="font-semibold text-[#0F766E]">{department.id}</span>
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
              placeholder="e.g. Cardiology"
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
                Operational Status <span className="text-red-500">*</span>
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
                placeholder="e.g. Dr. Arjun Rao"
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
                Designation / Role Title
              </label>
              <input
                type="text"
                value={formData.leadDoctorRole}
                onChange={(e) => setFormData({ ...formData, leadDoctorRole: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="e.g. Head of Cardiology"
              />
            </div>
          </div>

          {/* Capacity & Operating Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Daily Patient Capacity <span className="text-red-500">*</span>
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
                placeholder="60"
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
                Operating Hours <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${
                  errors.operatingHours ? 'border-red-400 focus:ring-red-400' : 'border-[#E2E8F0] focus:ring-[#0F766E]'
                } rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                placeholder="08:00 AM - 08:00 PM or 24 Hours"
              />
              {errors.operatingHours && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.operatingHours}
                </p>
              )}
            </div>
          </div>

          {/* Location & Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Hospital Floor / Location
              </label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="Floor 2, Heart Center"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Internal Extension / Phone
              </label>
              <input
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                placeholder="+91 80 2345 6702"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Department Description & Clinical Scope
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent resize-none"
              placeholder="Clinical services, specialties, and triage procedures..."
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
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartmentModal;
