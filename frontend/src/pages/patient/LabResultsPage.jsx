import React, { useState, useMemo } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import {
  labSummary,
  currentVisitLabStatus,
  labResults,
  pendingTests,
} from '../../data/patientMockData.js';
import { LabSummaryCards } from '../../components/lab/LabSummaryCards';
import { CurrentVisitLabCard } from '../../components/lab/CurrentVisitLabCard';
import { LabResultFilters } from '../../components/lab/LabResultFilters';
import { LabResultsTable } from '../../components/lab/LabResultsTable';
import { LabResultModal } from '../../components/lab/LabResultModal';
import { PendingTestsCard } from '../../components/lab/PendingTestsCard';
import { LabInformationCard } from '../../components/lab/LabInformationCard';
import { LabEmptyState } from '../../components/lab/LabEmptyState';
import { CheckCircle2, Info } from 'lucide-react';

export const LabResultsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast notification helper with auto-hide
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter calculations
  const counts = useMemo(() => {
    return {
      all: labResults.length,
      pending: labResults.filter((r) => r.status.toLowerCase() === 'pending').length,
      completed: labResults.filter((r) => r.status.toLowerCase() === 'completed').length,
    };
  }, []);

  const filteredResults = useMemo(() => {
    return labResults.filter((item) => {
      // Status filter
      if (activeFilter === 'pending' && item.status.toLowerCase() !== 'pending') {
        return false;
      }
      if (activeFilter === 'completed' && item.status.toLowerCase() !== 'completed') {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesDoctor = item.requestedBy.toLowerCase().includes(query);
        const matchesDept = item.department.toLowerCase().includes(query);
        return matchesName || matchesId || matchesDoctor || matchesDept;
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  // Open modal handler
  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  // Trigger report download toast
  const handleViewReport = () => {
    showToast('Report download will be available when backend integration is connected.');
  };

  return (
    <PatientLayout
      title="Lab Results"
      subtitle="View your test results and laboratory reports."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-6xl mx-auto space-y-6">
        {/* ── Toast Notification Banner ── */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#17221B] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <Info className="h-4 w-4 text-[#15803D] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Lab Summary (3 Metric Cards) ── */}
        <section aria-labelledby="lab-summary-heading">
          <h2 id="lab-summary-heading" className="sr-only">Lab Summary</h2>
          <LabSummaryCards summary={labSummary} />
        </section>

        {/* ── 2. Current Visit Lab Status ── */}
        <section aria-labelledby="current-visit-heading">
          <h2 id="current-visit-heading" className="sr-only">Current Visit Lab Status</h2>
          <CurrentVisitLabCard currentVisit={currentVisitLabStatus} />
        </section>

        {/* ── 3. Lab Results List with Filters ── */}
        <section className="space-y-3.5" aria-labelledby="results-list-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 id="results-list-heading" className="text-base sm:text-lg font-bold text-[#17221B] tracking-tight">
                Your Lab Results
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Detailed history of prescribed diagnostic laboratory investigations
              </p>
            </div>
          </div>

          {/* Filter tabs & Search */}
          <LabResultFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Table / Cards or Empty State */}
          {filteredResults.length > 0 ? (
            <LabResultsTable
              results={filteredResults}
              onViewResult={handleViewResult}
            />
          ) : (
            <LabEmptyState
              hasFilterActive={activeFilter !== 'all' || searchQuery.length > 0}
              onResetFilter={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
            />
          )}
        </section>

        {/* ── 4 & 5. Secondary Grid: Pending Tests + Information Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Section 4: Pending Tests */}
          <PendingTestsCard pendingList={pendingTests} />

          {/* Section 5: About Your Lab Results */}
          <LabInformationCard />
        </div>

        {/* ── Result Details Modal ── */}
        <LabResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={selectedResult}
          onViewReport={handleViewReport}
        />
      </div>
    </PatientLayout>
  );
};

export default LabResultsPage;

