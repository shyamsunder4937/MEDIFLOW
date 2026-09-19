import React, { useState, useMemo } from 'react';
import {
  Bot,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  ListFilter,
  Terminal,
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AiAgentSummaryCards } from '../../components/admin/ai/AiAgentSummaryCards';
import { AiAgentSimulationNotice } from '../../components/admin/ai/AiAgentSimulationNotice';
import { AiAgentStatusCard } from '../../components/admin/ai/AiAgentStatusCard';
import { AiAgentModuleBreakdown } from '../../components/admin/ai/AiAgentModuleBreakdown';
import { AiAgentTimeline } from '../../components/admin/ai/AiAgentTimeline';
import { AiAgentFilters } from '../../components/admin/ai/AiAgentFilters';
import { AiAgentActivityTable } from '../../components/admin/ai/AiAgentActivityTable';
import { AiAgentActivityModal } from '../../components/admin/ai/AiAgentActivityModal';
import { AiAgentPagination } from '../../components/admin/ai/AiAgentPagination';
import { AiAgentEmptyState } from '../../components/admin/ai/AiAgentEmptyState';
import {
  aiAgentSummaryStats,
  aiAgentSystemStatus,
  aiAgentModuleBreakdown,
  initialAiAgentActivityLogs,
} from '../../data/adminMockData';

const ITEMS_PER_PAGE = 7;

export const AdminAIAgentPage = () => {
  // Master activity logs state
  const [activities, setActivities] = useState(initialAiAgentActivityLogs);
  const [systemStatus, setSystemStatus] = useState(aiAgentSystemStatus);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Local Simulate Activity Trigger
  const handleSimulateActivity = () => {
    const mockActions = [
      {
        action: 'Workflow Stage Updated',
        module: 'Workflow',
        patient: 'Rahul Kumar',
        department: 'General Medicine',
        priority: 'Normal',
        desc: "Simulated milestone trigger: patient triage stage advanced in OPD Block A.",
        resp: "Simulation response: queue index updated for consultation desk.",
      },
      {
        action: 'Waiting Time Alert',
        module: 'Queue',
        patient: 'Ananya Reddy',
        department: 'Cardiology',
        priority: 'High',
        desc: "Simulated load balance notification: queue wait reached 18 min in Heart Center.",
        resp: "Simulation response: auxiliary call notification generated.",
      },
      {
        action: 'Pharmacy Status Checked',
        module: 'Pharmacy',
        patient: 'Sneha Rao',
        department: 'Orthopedics',
        priority: 'Normal',
        desc: "Simulated inventory verification for prescription fulfillment items.",
        resp: "Simulation response: items confirmed in active formulary.",
      },
      {
        action: 'Doctor Assignment Suggested',
        module: 'Doctor',
        patient: 'Vikram Kumar',
        department: 'Pediatrics',
        priority: 'Normal',
        desc: "Simulated physician routing suggestion based on room availability.",
        resp: "Simulation response: Room 108 designated for next consultation.",
      },
    ];

    const randomAction = mockActions[Math.floor(Math.random() * mockActions.length)];
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const randomId = `AI-${Math.floor(100 + Math.random() * 900)}`;

    const newActivity = {
      id: randomId,
      time: timeString,
      patient: randomAction.patient,
      action: randomAction.action,
      module: randomAction.module,
      priority: randomAction.priority,
      status: 'Simulation',
      department: randomAction.department,
      description: randomAction.desc,
      agentResponse: randomAction.resp,
      systemEffect: 'No backend change. Phase 1 frontend simulation only.',
      reasoning: 'Triggered via local mock simulation button.',
    };

    setActivities((prev) => [newActivity, ...prev]);
    setSystemStatus((prev) => ({
      ...prev,
      lastActivity: timeString,
      actionsProcessed: (Number(prev.actionsProcessed) || 42) + 1,
    }));
    setCurrentPage(1);
    showToast(`Mock activity "${newActivity.action}" added (${newActivity.id}).`);
  };

  // Filtered activities calculation
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        act.action.toLowerCase().includes(q) ||
        act.id.toLowerCase().includes(q) ||
        act.patient.toLowerCase().includes(q) ||
        (act.department && act.department.toLowerCase().includes(q));

      const matchesModule =
        selectedModule === 'All' || act.module === selectedModule;

      const matchesPriority =
        selectedPriority === 'All' || act.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === 'All' || act.status === selectedStatus;

      return matchesSearch && matchesModule && matchesPriority && matchesStatus;
    });
  }, [activities, searchQuery, selectedModule, selectedPriority, selectedStatus]);

  // Reset to page 1 on filter changes
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedModule('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  // Dynamic summary stats
  const summaryCounts = useMemo(() => {
    const total = activities.length;
    const queueCount = activities.filter((a) => a.module === 'Queue').length;
    const highPriority = activities.filter((a) => a.priority === 'High').length;

    return {
      agentStatus: 'Simulation',
      actionsToday: total.toString(),
      queueActions: queueCount.toString(),
      workflowAlerts: highPriority.toString(),
    };
  }, [activities]);

  const handleViewDetails = (act) => {
    setSelectedActivity(act);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout
      title="AI Agent Activity"
      subtitle="Monitor simulated AI-assisted workflow actions and system events."
    >
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Toast Alert Notification */}
        {toastMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>{toastMessage.message}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-purple-700 hover:text-purple-900 text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Page Header Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                AI Agent Activity
              </h2>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                <Bot className="h-3 w-3 text-purple-600" />
                Simulation Mode
              </span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Mock / Phase 1
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Monitor simulated AI-assisted workflow actions and system events.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSimulateActivity}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              title="Add simulated mock activity"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-200" />
              + Simulate Activity
            </button>
          </div>
        </div>

        {/* ── 1. Simulation Informational Notice ── */}
        <AiAgentSimulationNotice />

        {/* ── 2. Summary Cards (4 Cards) ── */}
        <AiAgentSummaryCards counts={summaryCounts} />

        {/* ── 3. AI Agent Status Card ── */}
        <AiAgentStatusCard statusData={systemStatus} />

        {/* ── 4. Module Breakdown ── */}
        <AiAgentModuleBreakdown modules={aiAgentModuleBreakdown} />

        {/* ── 5. Recent Agent Activity Timeline ── */}
        <AiAgentTimeline
          recentLogs={activities}
          onViewDetails={handleViewDetails}
        />

        {/* ── 6. Agent Activity Log (Search, Filters, & Table) ── */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-purple-600" />
              Agent Activity Log
            </h3>
            <p className="text-xs text-[#64748B]">
              Comprehensive log of simulated workflow observations and notifications.
            </p>
          </div>
        </div>

        <AiAgentFilters
          searchQuery={searchQuery}
          setSearchQuery={handleFilterChange(setSearchQuery)}
          selectedModule={selectedModule}
          setSelectedModule={handleFilterChange(setSelectedModule)}
          selectedPriority={selectedPriority}
          setSelectedPriority={handleFilterChange(setSelectedPriority)}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleFilterChange(setSelectedStatus)}
          onClearFilters={handleClearFilters}
          totalResults={filteredActivities.length}
        />

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 sm:p-5">
          {filteredActivities.length > 0 ? (
            <>
              <AiAgentActivityTable
                activities={paginatedActivities}
                onViewActivity={handleViewDetails}
              />

              <AiAgentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredActivities.length}
              />
            </>
          ) : (
            <AiAgentEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>

      {/* ── Activity Details Modal ── */}
      <AiAgentActivityModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminAIAgentPage;
