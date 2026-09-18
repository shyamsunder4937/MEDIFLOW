import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { QueueSummaryCards } from '../../components/staff/queue/QueueSummaryCards';
import { CurrentlyServingCard } from '../../components/staff/queue/CurrentlyServingCard';
import { DepartmentQueueOverview } from '../../components/staff/queue/DepartmentQueueOverview';
import { QueueFilters } from '../../components/staff/queue/QueueFilters';
import { QueueTable } from '../../components/staff/queue/QueueTable';
import {
  initialStaffQueueData,
  staffDepartmentQueueStats,
  staffCurrentlyServing,
} from '../../data/staffMockData';
import {
  RotateCcw,
  Calendar,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const StaffQueuePage = () => {
  // Local state for queue records (supports live status transitions)
  const [queueData, setQueueData] = useState(initialStaffQueueData);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [doctorFilter, setDoctorFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toast feedback helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Summary counts calculated dynamically from current state
  const counts = useMemo(() => {
    const waiting = queueData.filter(
      (p) => p.status === 'Waiting' || p.status === 'Called'
    ).length;
    const inConsultation = queueData.filter(
      (p) => p.status === 'In Consultation'
    ).length;
    const completed = queueData.filter(
      (p) => p.status === 'Completed'
    ).length;

    return {
      waiting,
      inConsultation,
      completed,
      averageWait: '18 min',
    };
  }, [queueData]);

  // Filtered dataset
  const filteredQueue = useMemo(() => {
    return queueData.filter((item) => {
      // 1. Department filter
      if (departmentFilter !== 'ALL' && item.department !== departmentFilter) {
        return false;
      }

      // 2. Doctor filter
      if (doctorFilter !== 'ALL' && item.doctor !== doctorFilter) {
        return false;
      }

      // 3. Status filter
      if (statusFilter !== 'ALL' && item.status !== statusFilter) {
        return false;
      }

      // 4. Search query (Patient name or Token)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = (item.patient || '').toLowerCase().includes(query);
        const matchesToken = (item.token || '').toLowerCase().includes(query);
        const matchesId = (item.patientId || '').toLowerCase().includes(query);

        if (!matchesName && !matchesToken && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [queueData, searchQuery, departmentFilter, doctorFilter, statusFilter]);

  const isFiltered =
    searchQuery.trim() !== '' ||
    departmentFilter !== 'ALL' ||
    doctorFilter !== 'ALL' ||
    statusFilter !== 'ALL';

  // Handler: Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('ALL');
    setDoctorFilter('ALL');
    setStatusFilter('ALL');
  };

  // Handler: Call Patient (Announce token)
  const handleCallPatient = (patient) => {
    setQueueData((prev) =>
      prev.map((item) =>
        (item.id || item.token) === (patient.id || patient.token)
          ? { ...item, status: 'Called' }
          : item
      )
    );
    showToast(`Patient ${patient.token} (${patient.patient}) has been called to ${patient.room}.`);
  };

  // Handler: Start Visit (Transition to In Consultation)
  const handleStartVisit = (patient) => {
    setQueueData((prev) =>
      prev.map((item) =>
        (item.id || item.token) === (patient.id || patient.token)
          ? { ...item, status: 'In Consultation', waitingTime: '—' }
          : item
      )
    );
    showToast(`Visit started for Patient ${patient.token} with ${patient.doctor} (${patient.room}).`);
  };

  // Handler: Refresh queue data
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQueueData(initialStaffQueueData);
      setIsRefreshing(false);
      showToast('Queue data refreshed.');
    }, 400);
  };

  return (
    <StaffLayout
      title="Queue Management"
      subtitle="Monitor and manage the patient queue across hospital departments."
    >
      <div className="p-4 sm:p-6 lg:p-7 space-y-6 max-w-7xl mx-auto">
        {/* ── Toast Notification Banner ── */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#CCFBF1] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── Top Header Controls: Refresh & Date Indicator ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
            <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>OPD Live Queue Engine</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B] font-normal">Real-time status monitor</span>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#64748B]">
              <Calendar className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>Today, 18 Sep 2026</span>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ── 1. Queue Summary Cards ── */}
        <section aria-label="Queue Summary Statistics">
          <QueueSummaryCards
            waitingCount={counts.waiting}
            inConsultationCount={counts.inConsultation}
            completedCount={counts.completed}
            averageWait={counts.averageWait}
          />
        </section>

        {/* ── 2. Currently Serving Highlight Section ── */}
        <section aria-label="Currently Serving Consultation">
          <CurrentlyServingCard serving={staffCurrentlyServing} />
        </section>

        {/* ── 3. Department Queue Overview Breakdown ── */}
        <section aria-label="Department Queue Breakdown">
          <DepartmentQueueOverview
            departmentStats={staffDepartmentQueueStats}
            selectedDepartment={departmentFilter}
            onSelectDepartment={(dept) => {
              if (departmentFilter === dept) {
                setDepartmentFilter('ALL');
              } else {
                setDepartmentFilter(dept);
              }
            }}
          />
        </section>

        {/* ── 4. Queue Filter and Search Toolbar ── */}
        <section aria-label="Queue Filters and Search">
          <QueueFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            doctorFilter={doctorFilter}
            onDoctorChange={setDoctorFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>

        {/* ── 5. Main Queue Management Table ── */}
        <section aria-label="Current Patient Queue Table">
          <QueueTable
            queue={filteredQueue}
            totalCount={queueData.length}
            onCallPatient={handleCallPatient}
            onStartVisit={handleStartVisit}
            onClearFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>

        {/* ── Demo Notice Footer ── */}
        <footer className="pt-2 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Staff Queue Management Interface • Phase 1 Frontend Prototype</span>
          </div>
        </footer>
      </div>
    </StaffLayout>
  );
};

export default StaffQueuePage;
