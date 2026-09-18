import React, { useState, useMemo } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorLabResults } from '../../data/doctorMockData';
import { LabResultSummaryCards } from '../../components/doctor/LabResultSummaryCards';
import { LabResultTabs } from '../../components/doctor/LabResultTabs';
import { LabResultSearch } from '../../components/doctor/LabResultSearch';
import { LabResultTable } from '../../components/doctor/LabResultTable';
import { LabResultModal } from '../../components/doctor/LabResultModal';
import { CheckCircle2, Info, FlaskConical } from 'lucide-react';

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

    setToastMessage('Result marked as reviewed.');
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <DoctorLayout
      title="Lab Results"
      subtitle="Review laboratory results for your patients."
    >
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs animate-in fade-in slide-in-from-top-2 duration-150"
            role="status"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-normal hidden sm:inline">
              Moved to Completed Results
            </span>
          </div>
        )}

        {/* ── 1. Summary Cards ── */}
        <section aria-label="Laboratory Overview Statistics">
          <LabResultSummaryCards
            pendingCount={pendingResults.length}
            availableCount={resultsData.length}
            reviewedCount={completedResults.length + 6} // Reflects total reviewed today
          />
        </section>

        {/* ── 2. Tabs & Search Toolbar ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          {/* ── 3. Table / Card List ── */}
          <section aria-label="Laboratory Results List">
            <LabResultTable
              results={filteredResults}
              activeTab={activeTab}
              searchTerm={searchTerm}
              onViewResult={(result) => setSelectedResult(result)}
              onMarkAsReviewed={handleMarkAsReviewed}
              onClearSearch={() => setSearchTerm('')}
            />
          </section>
        </div>

        {/* ── 4. Demo Data Notice ── */}
        <footer className="pt-2 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Demo laboratory data — not connected to a real laboratory system.</span>
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
