import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import {
  initialStaffLabRequestsData,
  initialLabRecentActivity,
} from '../../data/staffMockData';
import { LabStatCards } from '../../components/staff/lab/LabStatCards';
import { LabWorkflowGuide } from '../../components/staff/lab/LabWorkflowGuide';
import { LabActivityWidget } from '../../components/staff/lab/LabActivityWidget';
import { LabFilters } from '../../components/staff/lab/LabFilters';
import { LabRequestTable } from '../../components/staff/lab/LabRequestTable';
import { MockLabResultModal } from '../../components/staff/lab/MockLabResultModal';
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
} from 'lucide-react';

export const StaffLabPage = () => {
  // Main state
  const [requests, setRequests] = useState(initialStaffLabRequestsData);
  const [activities, setActivities] = useState(initialLabRecentActivity);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Modal & Toast state
  const [activeResultRequest, setActiveResultRequest] = useState(null);
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Action: Request Sample (Pending -> Sample Required)
  const handleRequestSample = (id) => {
    let reqPatient = '';
    let reqTest = '';

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          reqTest = item.test;
          return {
            ...item,
            status: 'Sample Required',
            sampleStatus: 'Required',
          };
        }
        return item;
      })
    );

    // Add activity
    const newAct = {
      id: `ACT-${Date.now()}`,
      requestId: id,
      patientName: reqPatient || 'Patient',
      test: reqTest || 'Lab Test',
      message: `${id} requisition issued to Phlebotomy`,
      time: 'Just now',
      type: 'collected',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast(`Specimen collection barcode generated for ${id}.`);
  };

  // 2. Action: Mark Sample Collected (Sample Required -> Sample Collected)
  const handleMarkSampleCollected = (id) => {
    let reqPatient = '';
    let reqTest = '';

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          reqTest = item.test;
          return {
            ...item,
            status: 'Sample Collected',
            sampleStatus: 'Collected',
            collectedTime: 'Just now',
          };
        }
        return item;
      })
    );

    // Add activity
    const newAct = {
      id: `ACT-${Date.now()}`,
      requestId: id,
      patientName: reqPatient || 'Patient',
      test: reqTest || 'Lab Test',
      message: `${id} sample collected & barcoded`,
      time: 'Just now',
      type: 'collected',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('Sample marked as collected.');
  };

  // 3. Action: Start Processing (Sample Collected -> Processing)
  const handleStartProcessing = (id) => {
    let reqPatient = '';
    let reqTest = '';

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          reqTest = item.test;
          return {
            ...item,
            status: 'Processing',
            sampleStatus: 'Processing',
          };
        }
        return item;
      })
    );

    // Add activity
    const newAct = {
      id: `ACT-${Date.now()}`,
      requestId: id,
      patientName: reqPatient || 'Patient',
      test: reqTest || 'Lab Test',
      message: `${id} loaded into analyzer queue`,
      time: 'Just now',
      type: 'processing',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('Lab request moved to processing.');
  };

  // 4. Action: Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Laboratory orders and specimen queues refreshed.');
    }, 450);
  };

  // 5. Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setDepartmentFilter('ALL');
  };

  // Filtered dataset
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // 1. Status Filter
      if (statusFilter !== 'ALL' && req.status !== statusFilter) {
        return false;
      }

      // 2. Priority Filter
      if (priorityFilter !== 'ALL' && req.priority !== priorityFilter) {
        return false;
      }

      // 3. Department Filter
      if (departmentFilter !== 'ALL' && req.department !== departmentFilter) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (req.patientName || '').toLowerCase().includes(q);
        const idMatch = (req.id || '').toLowerCase().includes(q);
        const docMatch = (req.doctor || '').toLowerCase().includes(q);
        const testMatch = (req.test || '').toLowerCase().includes(q);

        if (!nameMatch && !idMatch && !docMatch && !testMatch) return false;
      }

      return true;
    });
  }, [requests, searchQuery, statusFilter, priorityFilter, departmentFilter]);

  // Derived counts for stat cards
  const pendingCount = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Sample Required'
  ).length;
  const collectedCount = requests.filter((r) => r.status === 'Sample Collected').length;
  const processingCount = requests.filter((r) => r.status === 'Processing').length;
  const resultsReadyCount = requests.filter((r) => r.status === 'Result Ready').length;

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <StaffLayout
      title="Lab Coordination"
      subtitle="Monitor laboratory requests, sample collection, processing, and result availability."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">
        {/* ── Toast Alert ── */}
        {toast && (
          <div
            className={`flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-md animate-in slide-in-from-top-2 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-teal-50 border-[#0F766E]/20 text-[#0F766E]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              {toast.type === 'error' ? (
                <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-[#0F766E] flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-xs font-bold underline cursor-pointer hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Header Bar & Action ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner flex-shrink-0">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                Hospital Diagnostic & Laboratory Coordination
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Monitor requisitions, phlebotomy collection desks, and report dispatch.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0F172A] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-[#0F766E] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* ── 1. Summary Cards ── */}
        <section aria-label="Lab Statistics Summary">
          <LabStatCards
            pendingCount={pendingCount}
            collectedCount={collectedCount}
            processingCount={processingCount}
            resultsReadyCount={resultsReadyCount}
          />
        </section>

        {/* ── 2. Standard Testing Workflow Guide ── */}
        <section aria-label="Laboratory Workflow Pipeline">
          <LabWorkflowGuide />
        </section>

        {/* ── 3. Lab Activity & Recent Events ── */}
        <section aria-label="Lab Activity and Recent Events">
          <LabActivityWidget
            labRequests={requests}
            recentActivities={activities}
          />
        </section>

        {/* ── 4. Search and Filters Toolbar ── */}
        <section aria-label="Lab Request Filters">
          <LabFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            onResetFilters={handleResetFilters}
            totalResults={filteredRequests.length}
            totalCount={requests.length}
          />
        </section>

        {/* ── 5. Main Lab Requests Table / Cards ── */}
        <section aria-label="Lab Requests Table" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Lab Requests</h2>
              <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                {filteredRequests.length} requisitions
              </span>
            </div>
          </div>

          <LabRequestTable
            requests={filteredRequests}
            onRequestSample={handleRequestSample}
            onMarkCollected={handleMarkSampleCollected}
            onStartProcessing={handleStartProcessing}
            onViewResult={(req) => setActiveResultRequest(req)}
          />

          {filteredRequests.length === 0 && isFiltered && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
              >
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </section>
      </div>

      {/* ── Mock Lab Result Modal ── */}
      <MockLabResultModal
        isOpen={Boolean(activeResultRequest)}
        onClose={() => setActiveResultRequest(null)}
        labRequest={activeResultRequest}
      />
    </StaffLayout>
  );
};

export default StaffLabPage;
