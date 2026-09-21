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
  AlertTriangle
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

  // Handlers
  const handleOpenBooking = () => {
    setIsBookModalOpen(true);
  };

  const handleAppointmentBooked = (newAppointment) => {
    // Reload appointments after booking
    getMyAppointments()
      .then((response) => {
        const formattedAppointments = response.data.map(formatAppointmentForUI);
        setAppointments(formattedAppointments);
        setActiveTab('upcoming');
        showToast(`Appointment booked successfully.`);
      })
      .catch((err) => {
        console.error('Failed to reload appointments:', err);
        showToast('Appointment booked, but failed to refresh list');
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
            <Loader2 className="h-8 w-8 animate-spin text-[#0F766E] mx-auto" />
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
            <h3 className="text-lg font-bold text-[#0F172A]">Unable to Load Appointments</h3>
            <p className="text-sm text-[#64748B]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#115E59] transition"
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
      <div className="p-4 sm:p-6 sm:pb-12 max-w-7xl mx-auto space-y-6">
        {/* ── Toast Notification Banner ── */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <div className="text-xs sm:text-sm font-medium">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs pl-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Top Action Section ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Outpatient Department (OPD) Consultations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Hospital Appointments
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl">
              Schedule in-person visits with specialists, review live consultation statuses, and view complete hospital journey workflows.
            </p>
          </div>

          {/* Prominent "+ Book New Appointment" Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 active:scale-98"
            >
              <CalendarPlus className="h-4.5 w-4.5" />
              <span>+ Book New Appointment</span>
            </button>
          </div>
        </div>

        {/* ── Appointment Tabs & Search Bar ── */}
        <div className="space-y-4">
          <AppointmentTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={tabCounts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* ── Appointments Cards List / Empty State ── */}
          {currentTabAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
        </div>
      </div>

      {/* ── Modals ── */}
      {/* 5-Step Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* Appointment Details Modal with Hospital Journey */}
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
