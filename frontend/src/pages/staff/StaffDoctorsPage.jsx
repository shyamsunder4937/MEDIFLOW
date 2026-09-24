import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffDoctorsData } from '../../data/staffMockData';
import { DoctorSummaryCards } from '../../components/staff/doctors/DoctorSummaryCards';
import { DepartmentAvailabilityOverview } from '../../components/staff/doctors/DepartmentAvailabilityOverview';
import { CurrentlyInConsultationWidget } from '../../components/staff/doctors/CurrentlyInConsultationWidget';
import { DoctorFilters } from '../../components/staff/doctors/DoctorFilters';
import { DoctorAvailabilityCard } from '../../components/staff/doctors/DoctorAvailabilityCard';
import { UpdateDoctorStatusModal } from '../../components/staff/doctors/UpdateDoctorStatusModal';
import { RefreshCw, SearchX, CheckCircle2, AlertCircle } from 'lucide-react';

export const StaffDoctorsPage = () => {
  const [doctors, setDoctors] = useState(initialStaffDoctorsData);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Status update modal state
  const [targetDoctor, setTargetDoctor] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Status change handler
  const handleUpdateStatus = (doctorId, newStatus) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            status: newStatus,
            currentPatient: newStatus === 'Available' || newStatus === 'On Break' || newStatus === 'Unavailable' ? null : doc.currentPatient,
          };
        }
        return doc;
      })
    );
    showToast(`Status for ${targetDoctor?.name || 'Doctor'} updated to ${newStatus}.`);
  };

  // Mock refresh handler
  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Doctor roster and availability status refreshed.');
    }, 400);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setDepartmentFilter('ALL');
  };

  // Filtered dataset
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // 1. Status Filter
      if (statusFilter !== 'ALL' && doc.status !== statusFilter) {
        return false;
      }

      // 2. Department Filter
      if (departmentFilter !== 'ALL' && doc.department !== departmentFilter) {
        return false;
      }

      // 3. Search query (checks name, department, specialization)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (doc.name || '').toLowerCase().includes(q);
        const deptMatch = (doc.department || '').toLowerCase().includes(q);
        const specMatch = (doc.specialization || '').toLowerCase().includes(q);

        if (!nameMatch && !deptMatch && !specMatch) return false;
      }

      return true;
    });
  }, [doctors, searchQuery, statusFilter, departmentFilter]);

  // Dynamic summary stats
  const totalDoctors = doctors.length;
  const availableCount = doctors.filter((d) => d.status === 'Available').length;
  const inConsultationCount = doctors.filter((d) => d.status === 'In Consultation').length;
  const onBreakCount = doctors.filter((d) => d.status === 'On Break').length;

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <StaffLayout
      title="Doctor Availability"
      subtitle="Monitor doctor availability, consultation status, and current patient queues."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5">
        {/* ── Toast Alert ── */}
        {toast && (
          <div
            className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xs animate-in slide-in-from-top-2 duration-150 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              {toast.type === 'error' ? (
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-4.5 w-4.5 text-[#15803D] flex-shrink-0" />
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

        {/* ── Page Header & Primary Action ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#17221B] tracking-tight">
                Hospital Physician Roster & Availability
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                Live Capacity
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Live consultation room allocations, active queues, and shift assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#17221B] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-[#15803D] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Status</span>
          </button>
        </div>

        {/* ── Summary Stats Cards ── */}
        <section aria-label="Doctor Availability Statistics">
          <DoctorSummaryCards
            totalCount={totalDoctors}
            availableCount={availableCount}
            inConsultationCount={inConsultationCount}
            onBreakCount={onBreakCount}
          />
        </section>

        {/* ── Department Overview ── */}
        <section aria-label="Department Overview">
          <DepartmentAvailabilityOverview
            doctors={doctors}
            selectedDepartment={departmentFilter}
            onSelectDepartment={setDepartmentFilter}
          />
        </section>

        {/* ── Currently in Consultation Widget ── */}
        <section aria-label="Active Consultations">
          <CurrentlyInConsultationWidget doctors={doctors} />
        </section>

        {/* ── Search & Filters ── */}
        <section aria-label="Doctor Filters">
          <DoctorFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            onResetFilters={handleResetFilters}
            totalResults={filteredDoctors.length}
            totalCount={doctors.length}
          />
        </section>

        {/* ── Main Doctor Cards Grid ── */}
        <section aria-label="Doctor Cards Directory" className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[#17221B]">Doctors on Duty</h2>
              <span className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                {filteredDoctors.length} physicians
              </span>
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <DoctorAvailabilityCard
                  key={doctor.id}
                  doctor={doctor}
                  onOpenUpdateStatus={(doc) => setTargetDoctor(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center shadow-2xs">
              <div className="flex flex-col items-center justify-center space-y-2.5 max-w-sm mx-auto">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#94A3B8]">
                  <SearchX className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[#17221B]">No doctors found</p>
                  <p className="text-xs text-[#64748B]">
                    Try adjusting your search query or reset active filters.
                  </p>
                </div>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Clear All Filters</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── Update Status Modal ── */}
      <UpdateDoctorStatusModal
        isOpen={Boolean(targetDoctor)}
        onClose={() => setTargetDoctor(null)}
        doctor={targetDoctor}
        onUpdateStatus={handleUpdateStatus}
      />
    </StaffLayout>
  );
};

export default StaffDoctorsPage;
