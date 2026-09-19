import React, { useState } from 'react';
import { AlertCircle, Phone, User, Users, Edit2, X } from 'lucide-react';

export const EmergencyContactCard = ({ emergencyContact, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emergencyContact);

  const handleSave = () => {
    onUpdate(formData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData(emergencyContact);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[#DC2626]" />
            <h2 className="text-lg font-bold text-[#0F172A]">Emergency Contact</h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] flex-shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#64748B] mb-0.5">Name</p>
              <p className="text-sm font-semibold text-[#0F172A]">{emergencyContact.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#64748B] mb-0.5">Relationship</p>
              <p className="text-sm font-semibold text-[#0F172A]">{emergencyContact.relationship}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 flex-shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#64748B] mb-0.5">Phone Number</p>
              <p className="text-sm font-semibold text-[#0F172A]">{emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleCancel}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 px-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
                <h3 className="text-lg font-bold text-[#0F172A]">Edit Emergency Contact</h3>
                <button
                  onClick={handleCancel}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Relationship</label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
