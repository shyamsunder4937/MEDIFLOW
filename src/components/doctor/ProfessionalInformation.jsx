import React, { useState } from 'react';
import {
  User,
  Building2,
  Mail,
  ShieldCheck,
  Edit3,
  Check,
  X,
  Stethoscope,
  Briefcase,
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

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F766E] hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/30 transition-all cursor-pointer shadow-2xs"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
            Editing Mode
          </span>
        )}
      </div>

      {/* Profile Form / View Table */}
      {!isEditing ? (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 px-4 w-1/3">Field</th>
                <th className="py-3 px-4 w-2/3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#475569]">Doctor Name</td>
                <td className="py-3 px-4 font-bold text-[#0F172A]">{profile.name}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#475569]">Department</td>
                <td className="py-3 px-4 font-medium text-[#0F172A]">{profile.department}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#475569]">Doctor ID</td>
                <td className="py-3 px-4 font-mono font-bold text-[#0F766E]">{profile.doctorId}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#475569]">Email</td>
                <td className="py-3 px-4 text-[#0F172A]">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#0F766E] hover:underline font-medium"
                  >
                    {profile.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#475569]">Hospital</td>
                <td className="py-3 px-4 font-medium text-[#0F172A]">{profile.hospital}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Doctor Name */}
            <div className="space-y-1">
              <label htmlFor="edit-name" className="text-xs font-semibold text-[#475569] block">
                Doctor Name
              </label>
              <input
                id="edit-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label htmlFor="edit-dept" className="text-xs font-semibold text-[#475569] block">
                Department
              </label>
              <input
                id="edit-dept"
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                required
              />
            </div>

            {/* Doctor ID */}
            <div className="space-y-1">
              <label htmlFor="edit-id" className="text-xs font-semibold text-[#475569] block">
                Doctor ID
              </label>
              <input
                id="edit-id"
                type="text"
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="edit-email" className="text-xs font-semibold text-[#475569] block">
                Email Address
              </label>
              <input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                required
              />
            </div>

            {/* Hospital */}
            <div className="sm:col-span-2 space-y-1">
              <label htmlFor="edit-hosp" className="text-xs font-semibold text-[#475569] block">
                Hospital
              </label>
              <input
                id="edit-hosp"
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
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
