import React, { useState } from 'react';
import {
  X,
  Pill,
  User,
  Building2,
  AlertTriangle,
  FileText,
  PlusCircle,
} from 'lucide-react';

export const NewPharmacyRequestModal = ({ isOpen, onClose, onCreateRequest }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: 'PAT-1001',
    doctor: 'Dr. Suresh Sharma',
    department: 'General Medicine',
    medicinesSummary: 'Paracetamol 500mg, Amoxicillin 500mg',
    priority: 'Normal',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    if (!formData.medicinesSummary.trim()) {
      newErrors.medicinesSummary = 'At least one medication is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Split medicines summary into items
    const medList = formData.medicinesSummary
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => ({
        name: item,
        strength: 'Standard',
        form: 'Oral / Topical',
        quantity: 10,
        instructions: 'As prescribed by physician',
      }));

    const newRequest = {
      id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: formData.patientId || 'PAT-1001',
      patientName: formData.patientName.trim(),
      patientAge: 35,
      patientGender: 'Adult',
      patientPhone: '+91 98765 00000',
      doctorId: 'DOC-001',
      doctor: formData.doctor,
      department: formData.department,
      requestedDate: '2026-09-18',
      requestedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: formData.priority,
      status: 'Pending',
      counter: 'Counter 1',
      pharmacist: 'Anil Deshpande (R.Ph)',
      notes: formData.notes.trim() || 'New OPD prescription request logged by counter staff.',
      medicines: medList.length > 0 ? medList : [
        { name: 'Standard Medication', strength: '500mg', form: 'Tablet', quantity: 10, instructions: 'As prescribed' },
      ],
    };

    onCreateRequest(newRequest);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E2E8F0] bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner">
              <Pill className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                New Pharmacy Request
              </h2>
              <p className="text-xs text-[#64748B]">
                Issue a new medication dispensation order to the pharmacy queue.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#0F766E]" /> Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="e.g. Rahul Kumar"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F8FAFC] text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all ${
                errors.patientName ? 'border-rose-300 ring-rose-100' : 'border-[#E2E8F0] focus:border-[#0F766E]'
              }`}
            />
            {errors.patientName && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.patientName}</p>
            )}
          </div>

          {/* Doctor & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#0F766E]" /> Prescribing Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all cursor-pointer"
              >
                <option value="Dr. Suresh Sharma">Dr. Suresh Sharma (Cardiology)</option>
                <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar (General Med)</option>
                <option value="Dr. Priya Nair">Dr. Priya Nair (Pediatrics)</option>
                <option value="Dr. Farooq Ahmed">Dr. Farooq Ahmed (Orthopedics)</option>
                <option value="Dr. Kavita Iyer">Dr. Kavita Iyer (Dermatology)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all cursor-pointer"
              >
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
          </div>

          {/* Medicines List */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <Pill className="h-3.5 w-3.5 text-[#0F766E]" /> Prescribed Medicines (Comma-separated) *
            </label>
            <textarea
              name="medicinesSummary"
              rows={2}
              value={formData.medicinesSummary}
              onChange={handleChange}
              placeholder="e.g. Paracetamol 500mg, Amoxicillin 500mg, Cetirizine 10mg"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F8FAFC] text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all ${
                errors.medicinesSummary ? 'border-rose-300 ring-rose-100' : 'border-[#E2E8F0] focus:border-[#0F766E]'
              }`}
            />
            {errors.medicinesSummary && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.medicinesSummary}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706]" /> Order Priority
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                  formData.priority === 'Normal'
                    ? 'border-[#0F766E] bg-[#CCFBF1]/40 text-[#0F766E]'
                    : 'border-slate-200 bg-white text-[#64748B]'
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value="Normal"
                  checked={formData.priority === 'Normal'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>Normal Priority</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                  formData.priority === 'Urgent'
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-[#64748B]'
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value="Urgent"
                  checked={formData.priority === 'Urgent'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>Urgent (Stat)</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#64748B]" /> Dispensing Notes / Instructions
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Advise after food, check child allergy history"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
            />
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs sm:text-sm font-bold text-[#64748B] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
