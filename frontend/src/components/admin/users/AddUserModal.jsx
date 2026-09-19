import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  UserPlus,
  AlertCircle,
} from 'lucide-react';

export const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Patient',
    department: 'General Medicine',
    status: 'Active',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newUserId = `USR-${randomSuffix}`;

    const newUser = {
      id: newUserId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+91 98765 00000',
      role: formData.role,
      department: formData.department,
      status: formData.status,
      joined: '19 Sep 2026',
      lastLogin: 'Never logged in',
      loginAccess: formData.status === 'Active' ? 'Enabled' : 'Disabled',
      // Default mock attributes based on role
      patientId: formData.role === 'Patient' ? `PT-${randomSuffix}` : undefined,
      registeredDate: formData.role === 'Patient' ? '19 Sep 2026' : undefined,
      specialization:
        formData.role === 'Doctor'
          ? `${formData.department} Specialist`
          : undefined,
      availability:
        formData.role === 'Doctor' ? 'Available (OPD Wing)' : undefined,
      staffRole:
        formData.role === 'Hospital Staff'
          ? `${formData.department} Support Lead`
          : formData.role === 'Lab Staff'
          ? 'Diagnostic Technologist'
          : formData.role === 'Pharmacy Staff'
          ? 'Dispensing Pharmacist'
          : undefined,
      adminRole:
        formData.role === 'Admin'
          ? 'System Operations Administrator'
          : undefined,
      accessLevel:
        formData.role === 'Admin' ? 'Tier 1 Standard Admin' : undefined,
    };

    onAddUser(newUser);
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Patient',
      department: 'General Medicine',
      status: 'Active',
    });
    setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      aria-labelledby="add-user-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 shadow-xs">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="add-user-modal-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Register New User Account
              </h3>
              <p className="text-xs text-[#64748B]">
                Create credential record & assign hospital role
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
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Dr. Sunita Menon or Rahul Kumar"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. user@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* System Role */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                System Role <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Hospital Staff">Hospital Staff</option>
                  <option value="Lab Staff">Lab Staff</option>
                  <option value="Pharmacy Staff">Pharmacy Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Initial Account Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Active', 'Inactive', 'Suspended'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setFormData({ ...formData, status: st })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    formData.status === st
                      ? 'border-[#0F766E] bg-[#CCFBF1]/50 text-[#0F766E] shadow-xs'
                      : 'border-[#E2E8F0] bg-slate-50 text-[#64748B] hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
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
              <UserPlus className="h-3.5 w-3.5" />
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
