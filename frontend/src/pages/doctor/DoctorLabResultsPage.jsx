import React, { useState, useMemo } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorLabResults } from '../../data/doctorMockData';
import { LabResultSummaryCards } from '../../components/doctor/LabResultSummaryCards';
import { LabResultTabs } from '../../components/doctor/LabResultTabs';
import { LabResultSearch } from '../../components/doctor/LabResultSearch';
import { LabResultTable } from '../../components/doctor/LabResultTable';
import { LabResultModal } from '../../components/doctor/LabResultModal';
import { CheckCircle2, Info } from 'lucide-react';

export const DoctorLabResultsPage = () => {
  // Local state for results data (supports local review transitions)
  const [resultsData, setResultsData] = useState(doctorLabResults);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Counts calculation
  const pendingResults = useMemo(
    () => resultsData.filter((r) => r.status !== 'Reviewed'),
    [resultsData]
  );
  const completedResults = useMemo(
    () => resultsData.filter((r) => r.status === 'Reviewed'),
    [resultsData]
  );

  // Filtered dataset for active tab and search query
  const filteredResults = useMemo(() => {
    const list = activeTab === 'pending' ? pendingResults : completedResults;
    if (!searchTerm.trim()) return list;

    const query = searchTerm.toLowerCase().trim();
    return list.filter(
      (item) =>
        item.patientName.toLowerCase().includes(query) ||
        item.testName.toLowerCase().includes(query) ||
        (item.patientId && item.patientId.toLowerCase().includes(query))
    );
  }, [activeTab, pendingResults, completedResults, searchTerm]);

  // Handle Mark as Reviewed
  const handleMarkAsReviewed = (resultId) => {
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    setResultsData((prev) =>
      prev.map((item) =>
        item.id === resultId
          ? {
              ...item,
              status: 'Reviewed',
              reviewedTime: timeString,
            }
          : item
      )
    );

    setToastMessage('Result marked as reviewed and signed.');
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <DoctorLayout
      title="Lab Results"
      subtitle="Review laboratory results for your patients."
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* ── Page Header ── */}
        <div className="pb-2 border-b border-[#E2E8F0]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
            Lab Results
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Review laboratory results for your patients.
          </p>
        </div>

        {/* ── Toast Notification ── */}
        {toastMessage && (
          <div
            className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-xs font-semibold flex items-center justify-between gap-2 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-150"
            role="status"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[11px] text-[#166534] font-medium hidden sm:inline">
              Moved to Completed Results
            </span>
          </div>
        )}

        {/* ── 1. SUMMARY SECTION: 3 Clinical Indicators ── */}
        <section aria-label="Laboratory Overview Statistics">
          <LabResultSummaryCards
            pendingCount={pendingResults.length}
            availableCount={resultsData.length}
            reviewedCount={completedResults.length + 6} // Reflects total reviewed today
          />
        </section>

        {/* ── 2. MAIN LAB RESULTS SECTION: Unified White Content Surface ── */}
        <section
          aria-label="Laboratory Results Workspace"
          className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden"
        >
          {/* Top Controls Toolbar: Tabs on Left, Search on Right */}
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0] bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {/* Tabs */}
              <LabResultTabs
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                }}
                pendingCount={pendingResults.length}
                completedCount={completedResults.length}
              />

              {/* Search Box */}
              <LabResultSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>

          {/* Results Table Area */}
          <div className="p-0">
            <LabResultTable
              results={filteredResults}
              activeTab={activeTab}
              searchTerm={searchTerm}
              onViewResult={(result) => setSelectedResult(result)}
              onMarkAsReviewed={handleMarkAsReviewed}
              onClearSearch={() => setSearchTerm('')}
            />
          </div>
        </section>

        {/* ── 3. Medical Data Disclaimer ── */}
        <footer className="pt-2 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#15803D]" />
            <span>MediFlow Diagnostic Suite • Prototype demonstration data only</span>
          </div>
        </footer>
      </div>

      {/* ── Result Detail Modal ── */}
      <LabResultModal
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
        onMarkAsReviewed={handleMarkAsReviewed}
      />
    </DoctorLayout>
  );
};

export default DoctorLabResultsPage;

