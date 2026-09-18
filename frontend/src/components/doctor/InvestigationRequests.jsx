import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, Send, AlertCircle } from 'lucide-react';

const AVAILABLE_TESTS = [
  { id: 'cbc', label: 'CBC (Complete Blood Count)', code: 'CBC' },
  { id: 'glucose', label: 'Blood Glucose (Fasting / Post-Meal)', code: 'Blood Glucose' },
  { id: 'lipid', label: 'Lipid Profile (Cholesterol Panel)', code: 'Lipid Profile' },
  { id: 'urine', label: 'Urine Routine & Microscopic Test', code: 'Urine Test' },
  { id: 'thyroid', label: 'Thyroid Profile (TSH, Free T3/T4)', code: 'Thyroid Profile' },
  { id: 'ecg', label: '12-Lead Electrocardiogram (ECG)', code: '12-Lead ECG' },
];

export const InvestigationRequests = ({
  selectedTests,
  setSelectedTests,
  onRequestSuccess,
}) => {
  const [successMessage, setSuccessMessage] = useState('');

  const toggleTest = (code) => {
    if (selectedTests.includes(code)) {
      setSelectedTests(selectedTests.filter((t) => t !== code));
    } else {
      setSelectedTests([...selectedTests, code]);
    }
    setSuccessMessage('');
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (selectedTests.length === 0) {
      setSuccessMessage('Please select at least one test to request.');
      return;
    }

    setSuccessMessage('Lab tests selected successfully.');
    if (onRequestSuccess) {
      onRequestSuccess(selectedTests);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Investigation Requests
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Select tests to request for this patient.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1]/40 border border-[#0F766E]/20 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
          {selectedTests.length} Selected
        </span>
      </div>

      {/* Success / Alert Banner */}
      {successMessage && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-all ${
            successMessage.includes('successfully')
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border border-amber-200 text-amber-800'
          }`}
          role="status"
        >
          {successMessage.includes('successfully') ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
          )}
          <span>{successMessage}</span>
        </div>
      )}

      {/* Test Checkboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {AVAILABLE_TESTS.map((test) => {
          const isChecked = selectedTests.includes(test.code);
          return (
            <label
              key={test.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-[#CCFBF1]/30 border-[#0F766E] text-[#0F172A] font-semibold shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70 text-[#475569]'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleTest(test.code)}
                className="h-4 w-4 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E] accent-[#0F766E] cursor-pointer"
              />
              <span className="text-xs">{test.label}</span>
            </label>
          );
        })}
      </div>

      {/* Request Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-[11px] text-[#64748B]">
          Orders will be visible in patient's lab requisition workflow.
        </span>

        <button
          type="button"
          onClick={handleRequest}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Request Lab Tests</span>
        </button>
      </div>
    </div>
  );
};

export default InvestigationRequests;
