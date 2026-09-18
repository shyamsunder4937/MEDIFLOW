import React, { useState } from 'react';
import { Pill, Plus, Trash2, AlertCircle } from 'lucide-react';

const FREQUENCY_OPTIONS = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'As needed (SOS)',
  'Every 8 hours',
  'At bedtime',
];

export const PrescriptionSection = ({ medicines, setMedicines }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Twice daily');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a medicine name.');
      return;
    }
    if (!dosage.trim()) {
      setError('Please enter a dosage (e.g. 500 mg).');
      return;
    }
    if (!duration.trim()) {
      setError('Please specify duration (e.g. 5 days).');
      return;
    }

    const newMed = {
      id: Date.now().toString(),
      name: name.trim(),
      dosage: dosage.trim(),
      frequency,
      duration: duration.trim(),
    };

    setMedicines([...medicines, newMed]);
    setName('');
    setDosage('');
    setFrequency('Twice daily');
    setDuration('');
    setError('');
  };

  const handleRemoveMedicine = (id) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Pill className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Prescription
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Add medicines for this consultation.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1]/40 border border-[#0F766E]/20 px-2.5 py-0.5 rounded-full">
          {medicines.length} Item{medicines.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Structured Add Medicine Form */}
      <form onSubmit={handleAddMedicine} className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
        <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5 text-[#0F766E]" />
          <span>New Prescription Entry</span>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Medicine Name */}
          <div className="space-y-1">
            <label htmlFor="med-name" className="text-[11px] font-semibold text-[#475569] block">
              Medicine
            </label>
            <input
              id="med-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Medicine name"
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />
          </div>

          {/* Dosage */}
          <div className="space-y-1">
            <label htmlFor="med-dosage" className="text-[11px] font-semibold text-[#475569] block">
              Dosage
            </label>
            <input
              id="med-dosage"
              type="text"
              value={dosage}
              onChange={(e) => {
                setDosage(e.target.value);
                setError('');
              }}
              placeholder="e.g. 500 mg"
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />
          </div>

          {/* Frequency */}
          <div className="space-y-1">
            <label htmlFor="med-freq" className="text-[11px] font-semibold text-[#475569] block">
              Frequency
            </label>
            <select
              id="med-freq"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] cursor-pointer"
            >
              {FREQUENCY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label htmlFor="med-duration" className="text-[11px] font-semibold text-[#475569] block">
              Duration
            </label>
            <input
              id="med-duration"
              type="text"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                setError('');
              }}
              placeholder="e.g. 5 days"
              className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Medicine</span>
          </button>
        </div>
      </form>

      {/* Prescription List Table */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#0F172A]">
          Current Prescription List
        </div>

        {medicines.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-2.5 px-3">Medicine</th>
                  <th className="py-2.5 px-3">Dosage</th>
                  <th className="py-2.5 px-3">Frequency</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs bg-white">
                {medicines.map((med, index) => (
                  <tr key={med.id || index} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <Pill className="h-3.5 w-3.5 text-[#0F766E]" />
                        <span>{med.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#475569] font-medium">{med.dosage}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {med.frequency}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#475569]">{med.duration}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(med.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                        title="Remove medicine"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#64748B] bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Pill className="h-5 w-5 text-slate-300 mx-auto mb-1" />
            <span>No medicines added yet. Use the form above to add medicines.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionSection;
