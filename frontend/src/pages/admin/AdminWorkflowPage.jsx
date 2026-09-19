import React, { useState, useMemo } from 'react';
import {
  RotateCw,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { WorkflowSummaryCards } from '../../components/admin/workflow/WorkflowSummaryCards';
import { PatientJourneyOverview } from '../../components/admin/workflow/PatientJourneyOverview';
import { WorkflowAttentionCards } from '../../components/admin/workflow/WorkflowAttentionCards';
import { DepartmentWorkflowSection } from '../../components/admin/workflow/DepartmentWorkflowSection';
import { WorkflowFilters } from '../../components/admin/workflow/WorkflowFilters';
import { ActiveWorkflowsTable } from '../../components/admin/workflow/ActiveWorkflowsTable';
import { PatientWorkflowModal } from '../../components/admin/workflow/PatientWorkflowModal';
import { WorkflowPagination } from '../../components/admin/workflow/WorkflowPagination';
import { WorkflowEmptyState } from '../../components/admin/workflow/WorkflowEmptyState';
import {
  workflowSummaryStats,
  workflowJourneyStages,
  workflowAttentionAlerts,
  departmentWorkflowList,
  initialActivePatientWorkflows,
} from '../../data/adminMockData';

const ITEMS_PER_PAGE = 6;

export const AdminWorkflowPage = () => {
  // Master state
  const [workflows, setWorkflows] = useState(initialActivePatientWorkflows);
  const [stages, setStages] = useState(workflowJourneyStages);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Refresh view handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWorkflows([...initialActivePatientWorkflows]);
      setStages([...workflowJourneyStages]);
      setIsRefreshing(false);
      showToast('Workflow monitoring view refreshed successfully.');
    }, 400);
  };

  // Filtered workflows calculation
  const filteredWorkflows = useMemo(() => {
    return workflows.filter((wf) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        wf.patient.toLowerCase().includes(q) ||
        wf.id.toLowerCase().includes(q) ||
        (wf.doctor && wf.doctor.toLowerCase().includes(q)) ||
        (wf.token && wf.token.toLowerCase().includes(q));

      const matchesStage =
        selectedStage === 'All' || wf.currentStage === selectedStage;

      const matchesDepartment =
        selectedDepartment === 'All' || wf.department === selectedDepartment;

      const matchesPriority =
        selectedPriority === 'All' || wf.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === 'All' || wf.status === selectedStatus;

      return (
        matchesSearch &&
        matchesStage &&
        matchesDepartment &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    workflows,
    searchQuery,
    selectedStage,
    selectedDepartment,
    selectedPriority,
    selectedStatus,
  ]);

  // Reset to page 1 on filter changes
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStage('All');
    setSelectedDepartment('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredWorkflows.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedWorkflows = filteredWorkflows.slice(startIndex, endIndex);

  // View modal handler
  const handleViewPatientWorkflow = (wf) => {
    setSelectedWorkflow(wf);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout
      title="Workflow Monitoring"
      subtitle="Monitor the complete patient journey across registration, queue, consultation, laboratory, and pharmacy."
    >
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Toast Alert Notification */}
        {toastMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage.message}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
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
                Workflow Monitoring
              </h2>
              <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                Phase 1 Admin
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Monitor the complete patient journey across registration, queue, consultation, laboratory, and pharmacy.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-bold rounded-xl border border-[#E2E8F0] shadow-2xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
              title="Refresh local workflow view"
            >
              <RotateCw
                className={`h-3.5 w-3.5 text-[#0F766E] ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              />
              Refresh View
            </button>
          </div>
        </div>

        {/* ── 1. Summary Cards (4 Cards) ── */}
        <WorkflowSummaryCards counts={workflowSummaryStats} />

        {/* ── 2. Patient Journey Pipeline Visualizer ── */}
        <PatientJourneyOverview stages={stages} />

        {/* ── 3. Workflow Attention & Informational Indicators ── */}
        <WorkflowAttentionCards alerts={workflowAttentionAlerts} />

        {/* ── 4. Department Workflow Overview ── */}
        <DepartmentWorkflowSection departments={departmentWorkflowList} />

        {/* ── 5. Active Patient Workflows (Filters & Table) ── */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-[#0F766E]" />
              Active Patient Workflows
            </h3>
            <p className="text-xs text-[#64748B]">
              Track real-time patient progression through individual clinical nodes.
            </p>
          </div>
        </div>

        <WorkflowFilters
          searchQuery={searchQuery}
          setSearchQuery={handleFilterChange(setSearchQuery)}
          selectedStage={selectedStage}
          setSelectedStage={handleFilterChange(setSelectedStage)}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={handleFilterChange(setSelectedDepartment)}
          selectedPriority={selectedPriority}
          setSelectedPriority={handleFilterChange(setSelectedPriority)}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleFilterChange(setSelectedStatus)}
          onClearFilters={handleClearFilters}
          totalResults={filteredWorkflows.length}
        />

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 sm:p-5">
          {filteredWorkflows.length > 0 ? (
            <>
              <ActiveWorkflowsTable
                workflows={paginatedWorkflows}
                onViewPatientWorkflow={handleViewPatientWorkflow}
              />

              <WorkflowPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredWorkflows.length}
              />
            </>
          ) : (
            <WorkflowEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>

      {/* ── Patient Workflow Details Modal ── */}
      <PatientWorkflowModal
        workflow={selectedWorkflow}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminWorkflowPage;
