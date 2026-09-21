import React, { useState, useEffect } from 'react';
import {
  CalendarPlus,
  CalendarDays,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter,
  Check,
  Loader2,
  AlertTriangle,
  Stethoscope,
  MapPin,
  ArrowRight,
  RefreshCw,
  XCircle,
  Calendar,
} from 'lucide-react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { AppointmentTabs } from '../../components/appointments/AppointmentTabs';
import { AppointmentCard } from '../../components/appointments/AppointmentCard';
import { EmptyState } from '../../components/appointments/EmptyState';
import { BookAppointmentModal } from '../../components/appointments/BookAppointmentModal';
import { AppointmentDetailsModal } from '../../components/appointments/AppointmentDetailsModal';
import { CancelConfirmModal, RescheduleModal } from '../../components/appointments/AppointmentActionModals';
import { getMyAppointments, cancelAppointment } from '../../services/appointmentService';

// Helper: Format appointments to match existing UI structure
const formatAppointmentForUI = (apt) => {
  // Format date
  const date = new Date(apt.appointment_date);
  const dateShort = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const dateLong = date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });

  // Format time
  const startTime = new Date(`2000-01-01T${apt.start_time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Determine tab based on status and date
  let tab = 'upcoming';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const apptDate = new Date(apt.appointment_date);
  apptDate.setHours(0, 0, 0, 0);

  if (apt.status === 'cancelled') {
    tab = 'cancelled';
  } else if (apt.status === 'completed' || apptDate < today) {
    tab = 'past';
  }

  // Map appointment_type to display type
  const typeMap = {
    consultation: 'Initial Consultation',
    follow_up: 'Follow-up',
    routine_checkup: 'Routine Checkup',
  };

  // Map status to display status
  const statusMap = {
    scheduled: 'Scheduled',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_show: 'No Show',
  };

  return {
    id: apt.appointment_number,
    appointmentId: apt.id, // Keep UUID for backend calls
    department: apt.departmentName || 'Department',
    doctor: apt.doctorName || 'Doctor',
    specialization: apt.doctorSpecialization || '',
    date: dateLong,
    dateShort: dateShort,
    time: startTime,
    hospital: 'MediFlow Medical Center',
    room: apt.doctorRoom || 'TBD',
    status: statusMap[apt.status] || apt.status,
    tab: tab,
    type: typeMap[apt.appointment_type] || apt.appointment_type,
    reason: apt.reason || 'Consultation',
    cancellationReason: apt.notes && apt.status === 'cancelled' ? apt.notes : undefined,
    journeyStages: [
      { id: 1, name: 'Registration', status: 'pending', time: 'Pending check-in' },
      { id: 2, name: 'Doctor Consultation', status: 'pending', time: startTime },
      { id: 3, name: 'Laboratory', status: 'pending', time: 'Scheduled' },
      { id: 4, name: 'Doctor Review', status: 'pending', time: 'Scheduled' },
      { id: 5, name: 'Pharmacy', status: 'pending', time: 'Scheduled' },
    ],
  };
};

export const AppointmentsPage = () => {
  // Appointment list state
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load appointments on mount
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMyAppointments();
        const formattedAppointments = response.data.map(formatAppointmentForUI);
        setAppointments(formattedAppointments);
      } catch (err) {
        console.error('Failed to load appointments:', err);
        setError(err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Counts for tabs
  const tabCounts = {
    upcoming: appointments.filter((a) => a.tab === 'upcoming').length,
    past: appointments.filter((a) => a.tab === 'past').length,
    cancelled: appointments.filter((a) => a.tab === 'cancelled').length,
  };

  // Filtered appointments by tab and search
  const currentTabAppointments = appointments.filter((a) => {
    if (a.tab !== activeTab) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      a.doctor.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.hospital.toLowerCase().includes(q)
    );
  });

  // Next primary upcoming appointment (first upcoming record)
  const nextUpcomingAppointment = appointments.find((a) => a.tab === 'upcoming' && a.status !== 'Cancelled');

  // Handlers
  const handleOpenBooking = () => {
    setIsBookModalOpen(true);
  };

  const handleAppointmentBooked = (newAppointment) => {
    getMyAppointments()
      .then((response) => {
        const formattedAppointments = response.data.map(formatAppointmentForUI);
        setAppointments(formattedAppointments);
        setActiveTab('upcoming');
        showToast('Appointment booked successfully.');
      })
      .catch((err) => {
        console.error('Failed to reload appointments:', err);
        if (newAppointment) {
          setAppointments((prev) => [newAppointment, ...prev]);
        }
        setActiveTab('upcoming');
        showToast('Appointment booked successfully.');
      });
  };

  const handleViewDetails = (apt) => {
    setSelectedAppointment(apt);
    setIsDetailsModalOpen(true);
  };

  const handleOpenCancel = (apt) => {
    setSelectedAppointment(apt);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async (id, reason) => {
    try {
      // Find the appointment by display ID (appointment_number)
      const apt = appointments.find((a) => a.id === id);
      if (!apt || !apt.appointmentId) {
        throw new Error('Appointment not found');
      }

      await cancelAppointment(apt.appointmentId, reason);
      
      // Update local state
      setAppointments((prev) =>
        prev.map((a) => {
          if (a.id === id) {
            return {
              ...a,
              status: 'Cancelled',
              tab: 'cancelled',
              cancellationReason: reason,
            };
          }
          return a;
        })
      );
      showToast(`Appointment ${id} cancelled.`);
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      showToast(err.message || 'Failed to cancel appointment');
    }
  };

  const handleOpenReschedule = (apt) => {
    setSelectedAppointment(apt);
    setIsRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (id, newDate, newTime) => {
    // Note: Rescheduling requires backend update - for now just show toast
    // This would need to be connected to updateAppointment service
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          return {
            ...apt,
            date: newDate,
            time: newTime,
            status: 'Confirmed',
          };
        }
        return apt;
      })
    );
    showToast(`Appointment ${id} rescheduled to ${newDate} at ${newTime}.`);
  };

  const handleBookAgain = (pastApt) => {
    setIsBookModalOpen(true);
  };

  // Loading state
  if (loading) {
    return (
      <PatientLayout
        title="Appointments"
        subtitle="Manage your upcoming and previous hospital appointments."
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#15803D] mx-auto" />
            <p className="text-sm text-[#64748B]">Loading your appointments...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PatientLayout
        title="Appointments"
        subtitle="Manage your upcoming and previous hospital appointments."
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3 max-w-md">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-[#17221B]">Unable to Load Appointments</h3>
            <p className="text-sm text-[#64748B]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-[#15803D] text-white text-sm font-semibold hover:bg-[#166534] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title="Appointments"
      subtitle="Manage your upcoming and previous hospital appointments."
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* ── Toast Notification Banner ── */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="h-5 w-5 rounded-full bg-[#15803D] text-white flex items-center justify-center flex-shrink-0">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <div className="text-xs sm:text-sm font-semibold">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs pl-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── 1. Page Header Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Appointments
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Manage your upcoming consultations, doctor bookings, and appointment records.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <CalendarPlus className="h-4 w-4" />
              <span>+ Book New Appointment</span>
            </button>
          </div>
        </div>

        {/* ── 2. PRIMARY INFORMATION: Next Upcoming Appointment Spotlight ── */}
        {activeTab === 'upcoming' && nextUpcomingAppointment && !searchQuery.trim() && (
          <section aria-label="Next Scheduled Appointment">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
              {/* Card Header */}
              <div className="px-5 py-3.5 bg-slate-50/70 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-[#17221B] uppercase tracking-wider">
                    Next Scheduled Appointment
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
                  {nextUpcomingAppointment.status}
                </span>
              </div>

              {/* Main Info Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Doctor & Department */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
                      Consulting Doctor
                    </span>
                    <div className="text-base font-bold text-[#17221B] flex items-center gap-1.5">
                      <Stethoscope className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                      <span>{nextUpcomingAppointment.doctor}</span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      {nextUpcomingAppointment.specialization} · {nextUpcomingAppointment.department}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
                      Date & Time
                    </span>
                    <div className="text-base font-bold text-[#17221B] flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                      <span>{nextUpcomingAppointment.date}</span>
                    </div>
                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#94A3B8]" />
                      <span>{nextUpcomingAppointment.time}</span>
                    </p>
                  </div>

                  {/* Facility / Location */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
                      Location
                    </span>
                    <div className="text-sm font-bold text-[#17221B] flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                      <span>{nextUpcomingAppointment.hospital}</span>
                    </div>
                    <p className="text-xs text-[#64748B]">{nextUpcomingAppointment.room}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
                    <button
                      onClick={() => handleViewDetails(nextUpcomingAppointment)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenReschedule(nextUpcomingAppointment)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3 text-[#64748B]" />
                        <span>Reschedule</span>
                      </button>
                      <button
                        onClick={() => handleOpenCancel(nextUpcomingAppointment)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-rose-50 text-rose-600 hover:border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>

                {nextUpcomingAppointment.reason && (
                  <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center gap-1.5">
                    <span className="font-semibold text-[#17221B]">Consultation Reason:</span>
                    <span>{nextUpcomingAppointment.reason}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. MAIN APPOINTMENT CONTENT: Tabs & Appointment Directory ── */}
        <section aria-label="Appointment Directory" className="space-y-4">
          <AppointmentTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={tabCounts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Appointments Grid or Empty State */}
          {currentTabAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentTabAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onViewDetails={handleViewDetails}
                  onReschedule={handleOpenReschedule}
                  onCancel={handleOpenCancel}
                  onBookAgain={handleBookAgain}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              tab={activeTab}
              onBookClick={handleOpenBooking}
              isSearch={Boolean(searchQuery.trim())}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
        </section>
      </div>

      {/* ── Modals ── */}
      {/* 5-Step Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
        onReschedule={handleOpenReschedule}
        onCancel={handleOpenCancel}
      />

      {/* Cancel Confirmation Modal */}
      <CancelConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        appointment={selectedAppointment}
        onConfirmCancel={handleConfirmCancel}
      />

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        appointment={selectedAppointment}
        onConfirmReschedule={handleConfirmReschedule}
      />
    </PatientLayout>
  );
};

export default AppointmentsPage;
