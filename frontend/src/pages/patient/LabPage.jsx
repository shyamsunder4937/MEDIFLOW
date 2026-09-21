import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { PatientLayout } from '../../layouts/PatientLayout';

export const LabPage = () => {
  const navigate = useNavigate();

  return (
    <PatientLayout
      title="Lab Results"
      subtitle="View all your diagnostic test records and laboratory reports."
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <FlaskConical className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-[#17221B]">Laboratory Portal</h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm">
              View your prescribed diagnostic tests, real-time pathology processing, and official medical reports.
            </p>
          </div>
          <button
            onClick={() => navigate('/patient/lab-results')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#15803D] text-white text-xs font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <span>View Lab Results</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </PatientLayout>
  );
};


