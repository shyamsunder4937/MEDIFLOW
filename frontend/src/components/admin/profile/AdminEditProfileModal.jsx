import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Shield, Building2, Save } from 'lucide-react';

export const AdminEditProfileModal = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile && isOpen) {
      setFormData({
        fullName: profile.fullName || profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
      setErrors({});
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      fullName: formData.fullName.trim(),
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      initials: formData.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'MA',
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
              <User className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Administrator Profile
              </h3>
              <p className="text-xs text-slate-500">
                Update personal contact information in local state.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-slate-400" />
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. MediFlow Admin"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-colors ${
                errors.fullName
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-[#0F766E]'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 font-medium mt-0.5">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. admin@mediflow.demo"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-colors ${
                errors.email
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-[#0F766E]'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-medium mt-0.5">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-colors ${
                errors.phone
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-[#0F766E]'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-rose-600 font-medium mt-0.5">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Read-Only: Role */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                System Role (Fixed)
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Read-only</span>
            </label>
            <input
              type="text"
              value={profile?.role || 'System Administrator'}
              disabled
              className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
            />
          </div>

          {/* Read-Only: Department */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                Department (Fixed)
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Read-only</span>
            </label>
            <input
              type="text"
              value={profile?.department || 'Hospital Administration'}
              disabled
              className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl transition-colors shadow-xs cursor-pointer"
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
