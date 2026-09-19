import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { PatientLayout } from '../../layouts/PatientLayout';

export const LabPage = () => {
  const navigate = useNavigate();

  return (
    <PatientLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <FlaskConical className="h-8 w-8" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[#0F172A]">Lab Results</h1>
            <p className="text-sm text-[#64748B] max-w-sm">
              View all your lab test results, reports, and medical records.
            </p>
          </div>
          <button
            onClick={() => navigate('/patient/lab-results')}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            View Lab Results
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </PatientLayout>
  );
};

