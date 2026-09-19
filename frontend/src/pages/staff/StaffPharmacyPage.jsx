import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import {
  initialStaffPharmacyRequestsData,
  initialPharmacyRecentActivity,
} from '../../data/staffMockData';
import { PharmacyStatCards } from '../../components/staff/pharmacy/PharmacyStatCards';
import { PharmacyWorkflowGuide } from '../../components/staff/pharmacy/PharmacyWorkflowGuide';
import { PharmacyActivityWidget } from '../../components/staff/pharmacy/PharmacyActivityWidget';
import { PharmacyFilters } from '../../components/staff/pharmacy/PharmacyFilters';
import { PharmacyRequestTable } from '../../components/staff/pharmacy/PharmacyRequestTable';
import { NewPharmacyRequestModal } from '../../components/staff/pharmacy/NewPharmacyRequestModal';
import {
  PlusCircle,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Pill,
} from 'lucide-react';

export const StaffPharmacyPage = () => {
  // Main data state
  const [requests, setRequests] = useState(initialStaffPharmacyRequestsData);
  const [activities, setActivities] = useState(initialPharmacyRecentActivity);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Modal & Toast state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Action: Start Preparing (Pending -> Preparing)
  const handleStartPreparing = (id) => {
    let reqPatient = '';
    let medCount = 0;

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          medCount = item.medicines?.length || 0;
          return {
            ...item,
            status: 'Preparing',
          };
        }
        return item;
      })
    );

    const newAct = {
      id: `PHARM-ACT-${Date.now()}`,
      prescriptionId: id,
      patientName: reqPatient || 'Patient',
      medicinesCount: medCount,
      message: `${id} packaging and stock check started`,
      time: 'Just now',
      type: 'preparing',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast(`Prescription ${id} moved to preparing queue.`);
  };

  // 2. Action: Mark Ready (Preparing -> Ready)
  const handleMarkReady = (id) => {
    let reqPatient = '';
    let medCount = 0;
    let counterName = 'Counter 1';

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          medCount = item.medicines?.length || 0;
          counterName = item.counter || 'Counter 1';
          return {
            ...item,
            status: 'Ready',
          };
        }
        return item;
      })
    );

    const newAct = {
      id: `PHARM-ACT-${Date.now()}`,
      prescriptionId: id,
      patientName: reqPatient || 'Patient',
      medicinesCount: medCount,
      message: `${id} staged & ready for pickup at ${counterName}`,
      time: 'Just now',
      type: 'ready',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast(`Prescription ${id} marked ready for pickup at ${counterName}.`);
  };

  // 3. Action: Mark Dispensed (Ready -> Dispensed)
  const handleMarkDispensed = (id) => {
    let reqPatient = '';
    let medCount = 0;

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          reqPatient = item.patientName;
          medCount = item.medicines?.length || 0;
          return {
            ...item,
            status: 'Dispensed',
          };
        }
        return item;
      })
    );

    const newAct = {
      id: `PHARM-ACT-${Date.now()}`,
      prescriptionId: id,
      patientName: reqPatient || 'Patient',
      medicinesCount: medCount,
      message: `${id} medications dispensed to patient`,
      time: 'Just now',
      type: 'dispensed',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast(`Medications for ${id} successfully dispensed to patient.`);
  };

  // 4. Action: Create New Pharmacy Request
  const handleCreateRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);

    const newAct = {
      id: `PHARM-ACT-${Date.now()}`,
      prescriptionId: newRequest.id,
      patientName: newRequest.patientName,
      medicinesCount: newRequest.medicines?.length || 0,
      message: `${newRequest.id} created from OPD Counter`,
      time: 'Just now',
      type: 'pending',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('Pharmacy request created successfully.');
  };

  // 5. Action: Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Pharmacy queue and counter statuses refreshed.');
    }, 450);
  };

  // 6. Reset Filters
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

      // 4. Search query (patient, prescription ID, doctor, medication)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (req.patientName || '').toLowerCase().includes(q);
        const idMatch = (req.id || '').toLowerCase().includes(q);
        const docMatch = (req.doctor || '').toLowerCase().includes(q);
        const medMatch = (req.medicines || []).some((m) =>
          (m.name || '').toLowerCase().includes(q)
        );

        if (!nameMatch && !idMatch && !docMatch && !medMatch) return false;
      }

      return true;
    });
  }, [requests, searchQuery, statusFilter, priorityFilter, departmentFilter]);

  // Derived counts for stat cards
  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const preparingCount = requests.filter((r) => r.status === 'Preparing').length;
  const readyCount = requests.filter((r) => r.status === 'Ready').length;
  const dispensedCount = requests.filter((r) => r.status === 'Dispensed').length;

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <StaffLayout
      title="Pharmacy Coordination"
      subtitle="Coordinate prescriptions and track medication fulfillment."
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

        {/* ── Top Header Bar & Actions ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner flex-shrink-0">
              <Pill className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                Hospital Pharmacy & Dispensation Desk
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Coordinate prescription intake, track packaging, and stage medications for pickup.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0F172A] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-[#0F766E] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>+ New Pharmacy Request</span>
            </button>
          </div>
        </div>

        {/* ── 1. Summary Cards ── */}
        <section aria-label="Pharmacy Statistics Summary">
          <PharmacyStatCards
            pendingCount={pendingCount}
            preparingCount={preparingCount}
            readyCount={readyCount}
            dispensedCount={dispensedCount}
          />
        </section>

        {/* ── 2. Standard Medication Workflow SOP Guide ── */}
        <section aria-label="Pharmacy Workflow Pipeline">
          <PharmacyWorkflowGuide />
        </section>

        {/* ── 3. Pharmacy Activity & Recent Events ── */}
        <section aria-label="Pharmacy Activity and Recent Events">
          <PharmacyActivityWidget
            pharmacyRequests={requests}
            recentActivities={activities}
          />
        </section>

        {/* ── 4. Search and Filters Toolbar ── */}
        <section aria-label="Pharmacy Request Filters">
          <PharmacyFilters
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

        {/* ── 5. Main Pharmacy Requests Table / Cards ── */}
        <section aria-label="Pharmacy Requests Table" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Pharmacy Requests</h2>
              <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                {filteredRequests.length} orders
              </span>
            </div>
          </div>

          <PharmacyRequestTable
            requests={filteredRequests}
            onStartPreparing={handleStartPreparing}
            onMarkReady={handleMarkReady}
            onMarkDispensed={handleMarkDispensed}
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

      {/* ── New Pharmacy Request Modal ── */}
      <NewPharmacyRequestModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateRequest={handleCreateRequest}
      />
    </StaffLayout>
  );
};

export default StaffPharmacyPage;
