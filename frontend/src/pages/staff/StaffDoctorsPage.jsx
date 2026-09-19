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
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
              Hospital Physician Roster & Availability
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Live consultation room allocations, active queues, and shift assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0F172A] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-[#0F766E] ${isRefreshing ? 'animate-spin' : ''}`} />
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
        <section aria-label="Doctor Cards Directory" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">Doctors on Duty</h2>
              <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                {filteredDoctors.length} physicians
              </span>
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorAvailabilityCard
                  key={doctor.id}
                  doctor={doctor}
                  onOpenUpdateStatus={(doc) => setTargetDoctor(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-xs">
              <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#94A3B8]">
                  <SearchX className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#0F172A]">No doctors found</p>
                  <p className="text-xs text-[#64748B]">
                    Try changing your search or filters to find on-duty physicians.
                  </p>
                </div>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
                  >
                    <span>Clear Filters</span>
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
