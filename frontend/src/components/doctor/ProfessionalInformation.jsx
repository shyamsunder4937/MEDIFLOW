import React, { useState } from 'react';
import {
  Briefcase,
  Edit3,
  Check,
} from 'lucide-react';

export const ProfessionalInformation = ({
  profile,
  onUpdateProfile,
  onShowToast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    department: profile.department,
    doctorId: profile.doctorId,
    email: profile.email,
    hospital: profile.hospital,
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    onShowToast('Profile updated successfully.');
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      department: profile.department,
      doctorId: profile.doctorId,
      email: profile.email,
      hospital: profile.hospital,
    });
    setIsEditing(false);
  };

  const fields = [
    { label: 'Doctor Name', value: profile.name, bold: true },
    { label: 'Department', value: profile.department },
    { label: 'Doctor ID', value: profile.doctorId, highlight: true },
    { label: 'Email', value: profile.email, isEmail: true },
    { label: 'Hospital', value: profile.hospital },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-[#15803D]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
              Professional Information
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Clinical credentials & institution details
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#17221B] hover:bg-[#F0FDF4] hover:text-[#15803D] hover:border-[#DCFCE7] transition-all cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <Edit3 className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-0.5 rounded-full">
            Editing Mode
          </span>
        )}
      </div>

      {/* Two-Column Field/Value Layout */}
      {!isEditing ? (
        <div className="divide-y divide-[#F1F5F9] text-xs">
          {fields.map((field) => (
            <div
              key={field.label}
              className="py-2.5 flex items-center justify-between gap-4"
            >
              <span className="font-medium text-[#64748B] w-1/3">
                {field.label}
              </span>
              <div className="w-2/3 text-right sm:text-left">
                {field.isEmail ? (
                  <a
                    href={`mailto:${field.value}`}
                    className="text-[#15803D] hover:underline font-medium"
                  >
                    {field.value}
                  </a>
                ) : (
                  <span
                    className={`${
                      field.highlight
                        ? 'text-[#15803D] font-mono font-semibold'
                        : field.bold
                        ? 'font-bold text-[#17221B]'
                        : 'font-medium text-[#17221B]'
                    }`}
                  >
                    {field.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Doctor Name */}
            <div className="space-y-1">
              <label htmlFor="edit-name" className="text-xs font-medium text-[#64748B] block">
                Doctor Name
              </label>
              <input
                id="edit-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 transition-all"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label htmlFor="edit-dept" className="text-xs font-medium text-[#64748B] block">
                Department
              </label>
              <input
                id="edit-dept"
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 transition-all"
                required
              />
            </div>

            {/* Doctor ID */}
            <div className="space-y-1">
              <label htmlFor="edit-id" className="text-xs font-medium text-[#64748B] block">
                Doctor ID
              </label>
              <input
                id="edit-id"
                type="text"
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="edit-email" className="text-xs font-medium text-[#64748B] block">
                Email Address
              </label>
              <input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 transition-all"
                required
              />
            </div>

            {/* Hospital */}
            <div className="sm:col-span-2 space-y-1">
              <label htmlFor="edit-hosp" className="text-xs font-medium text-[#64748B] block">
                Hospital
              </label>
              <input
                id="edit-hosp"
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#17221B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfessionalInformation;

