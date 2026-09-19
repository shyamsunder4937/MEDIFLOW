import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffAppointmentsData } from '../../data/staffMockData';
import { AppointmentSummaryCards } from '../../components/staff/appointments/AppointmentSummaryCards';
import { AppointmentDateSelector } from '../../components/staff/appointments/AppointmentDateSelector';
import { AppointmentFilters } from '../../components/staff/appointments/AppointmentFilters';
import { AppointmentTable } from '../../components/staff/appointments/AppointmentTable';
import { NewAppointmentModal } from '../../components/staff/appointments/NewAppointmentModal';
import { RescheduleModal } from '../../components/staff/appointments/RescheduleModal';
import { CancelAppointmentModal } from '../../components/staff/appointments/CancelAppointmentModal';
import { UpcomingAppointmentsWidget } from '../../components/staff/appointments/UpcomingAppointmentsWidget';
import { AppointmentTimelineWidget } from '../../components/staff/appointments/AppointmentTimelineWidget';
import { CalendarPlus, CheckCircle2, AlertCircle } from 'lucide-react';

export const StaffAppointmentsPage = () => {
  // Appointment state
  const [appointments, setAppointments] = useState(initialStaffAppointmentsData);

  // Date selection state
  const [selectedDate, setSelectedDate] = useState('2026-09-18');
  const [quickFilter, setQuickFilter] = useState('today'); // today | tomorrow | this_week | all | custom

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [doctorFilter, setDoctorFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // 1. Check In action
  const handleCheckIn = (appt) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appt.id ? { ...a, status: 'Checked In' } : a))
    );
    showToast(`Patient ${appt.patientName} (${appt.id}) checked in successfully.`);
  };

  // 2. Reschedule action
  const handleReschedule = (id, updateData) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updateData } : a))
    );
    showToast(`Appointment ${id} rescheduled successfully.`);
  };

  // 3. Cancel action
  const handleCancelConfirm = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
    showToast(`Appointment ${id} has been cancelled.`, 'info');
  };

  // 4. Create New Appointment
  const handleCreateAppointment = (newData) => {
    const nextIdNumber = 1000 + appointments.length + 1;
    const newId = `APT-${nextIdNumber}`;

    const formattedDate = new Date(newData.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newAppt = {
      ...newData,
      id: newId,
      patientId: `P-${1000 + appointments.length + 1}`,
      formattedDate,
      room: newData.department === 'General Medicine' ? 'Room 102' : 'Room 204',
      token: `A-0${appointments.length + 20}`,
    };

    setAppointments((prev) => [newAppt, ...prev]);
    showToast(`Appointment ${newId} booked for ${newAppt.patientName}.`);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setDepartmentFilter('ALL');
    setDoctorFilter('ALL');
    setTypeFilter('ALL');
    setQuickFilter('all');
  };

  // Filtered dataset calculation
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      // 1. Date Quick Filter
      if (quickFilter === 'today' && appt.date !== '2026-09-18') {
        return false;
      }
      if (quickFilter === 'tomorrow' && appt.date !== '2026-09-19') {
        return false;
      }
      if (quickFilter === 'custom' && selectedDate && appt.date !== selectedDate) {
        return false;
      }

      // 2. Status filter
      if (statusFilter !== 'ALL' && appt.status !== statusFilter) {
        return false;
      }

      // 3. Department filter
      if (departmentFilter !== 'ALL' && appt.department !== departmentFilter) {
        return false;
      }

      // 4. Doctor filter
      if (doctorFilter !== 'ALL' && appt.doctor !== doctorFilter) {
        return false;
      }

      // 5. Type filter
      if (typeFilter !== 'ALL' && appt.type !== typeFilter) {
        return false;
      }

      // 6. Search query (patient name, appointment ID, doctor)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const patientMatch = (appt.patientName || '').toLowerCase().includes(q);
        const idMatch = (appt.id || '').toLowerCase().includes(q);
        const docMatch = (appt.doctor || '').toLowerCase().includes(q);
        const phoneMatch = (appt.phone || '').toLowerCase().includes(q);

        if (!patientMatch && !idMatch && !docMatch && !phoneMatch) return false;
      }

      return true;
    });
  }, [
    appointments,
    quickFilter,
    selectedDate,
    statusFilter,
    departmentFilter,
    doctorFilter,
    typeFilter,
    searchQuery,
  ]);

  // Dynamic summary stats
  const todayTotal = appointments.length;
  const upcomingCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const checkedInCount = appointments.filter((a) => a.status === 'Checked In').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    departmentFilter !== 'ALL' ||
    doctorFilter !== 'ALL' ||
    typeFilter !== 'ALL' ||
    quickFilter !== 'all';

  return (
    <StaffLayout
      title="Appointment Management"
      subtitle="Manage today's appointments, patient check-ins, and upcoming visits."
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

        {/* ── Top Header Bar & Primary Action ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
              Hospital Appointment Desk
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Review booked slots, conduct front-desk check-ins, and manage patient schedules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>+ New Appointment</span>
          </button>
        </div>

        {/* ── Summary Stats Cards ── */}
        <section aria-label="Appointment Statistics">
          <AppointmentSummaryCards
            todayCount={todayTotal}
            upcomingCount={upcomingCount}
            checkedInCount={checkedInCount}
            completedCount={completedCount}
          />
        </section>

        {/* ── Date Selector ── */}
        <section aria-label="Date Selection">
          <AppointmentDateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            activeQuickFilter={quickFilter}
            onQuickFilterChange={setQuickFilter}
          />
        </section>

        {/* ── Search & Multi-Criteria Filters ── */}
        <section aria-label="Appointment Filters">
          <AppointmentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            doctorFilter={doctorFilter}
            onDoctorChange={setDoctorFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            onResetFilters={handleResetFilters}
            totalResults={filteredAppointments.length}
            totalCount={appointments.length}
          />
        </section>

        {/* ── Secondary Widgets Grid: Timeline + Upcoming Feed ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <AppointmentTimelineWidget appointments={appointments} />
          </div>
          <div>
            <UpcomingAppointmentsWidget appointments={appointments} />
          </div>
        </div>

        {/* ── Main Appointment Table ── */}
        <section aria-label="Appointments Table">
          <AppointmentTable
            appointments={filteredAppointments}
            onCheckIn={handleCheckIn}
            onOpenReschedule={(appt) => setRescheduleTarget(appt)}
            onOpenCancel={(appt) => setCancelTarget(appt)}
            onClearFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>
      </div>

      {/* ── Modals ── */}
      <NewAppointmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateAppointment}
      />

      <RescheduleModal
        isOpen={Boolean(rescheduleTarget)}
        onClose={() => setRescheduleTarget(null)}
        appointment={rescheduleTarget}
        onReschedule={handleReschedule}
      />

      <CancelAppointmentModal
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        appointment={cancelTarget}
        onConfirmCancel={handleCancelConfirm}
      />
    </StaffLayout>
  );
};

export default StaffAppointmentsPage;
