import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Mail,
  Phone,
  Building2,
  Clock,
  MapPin,
  Briefcase,
  UserPlus,
  AlertCircle,
} from 'lucide-react';

export const AddDoctorModal = ({ isOpen, onClose, onAddDoctor }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: 'General Medicine',
    department: 'General Medicine',
    experience: '5 years',
    availability: '09:00 AM - 05:00 PM',
    room: 'Room 105 (OPD Block A)',
    status: 'Available',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Doctor name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newDocId = `DOC-${randomSuffix}`;

    const formattedName = formData.name.startsWith('Dr.')
      ? formData.name.trim()
      : `Dr. ${formData.name.trim()}`;

    const newDoctor = {
      id: newDocId,
      name: formattedName,
      email: formData.email.trim(),
      phone: formData.phone.trim() || '+91 98765 11999',
      specialization: formData.specialization,
      department: formData.department,
      experience: formData.experience.trim() || '5 years',
      availability: formData.availability.trim() || '09:00 AM - 05:00 PM',
      room: formData.room.trim() || 'Room 102 (OPD Wing)',
      status: formData.status,
      schedule: [
        { time: '09:00 AM', title: 'General Consultation', type: 'consultation' },
        { time: '11:00 AM', title: 'Patient Follow-up', type: 'followup' },
        { time: '01:00 PM', title: 'Lunch Break', type: 'break' },
        { time: '02:00 PM', title: 'Clinical Review', type: 'consultation' },
      ],
    };

    onAddDoctor(newDoctor);
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: 'General Medicine',
      department: 'General Medicine',
      experience: '5 years',
      availability: '09:00 AM - 05:00 PM',
      room: 'Room 105 (OPD Block A)',
      status: 'Available',
    });
    setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      aria-labelledby="add-doctor-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="add-doctor-modal-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Add New Physician
              </h3>
              <p className="text-xs text-[#64748B]">
                Register physician credentials, department & schedule
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
              Doctor Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Dr. Priya Sharma"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="e.g. priya.sharma@mediflow.ai"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>

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
                  placeholder="e.g. +91 98765 11000"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>
          </div>

          {/* Specialization & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Specialization <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                </select>
              </div>
            </div>

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
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience & Consultation Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Clinical Experience
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  placeholder="e.g. 8 years"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Consultation Room
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  placeholder="e.g. Room 102 (OPD Block A)"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Working Hours / Shift
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
                placeholder="e.g. 09:00 AM - 05:00 PM"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Initial Status */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Initial Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Available', 'Unavailable', 'Inactive'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setFormData({ ...formData, status: st })}
                  className={`py-2 px-3 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
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
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
