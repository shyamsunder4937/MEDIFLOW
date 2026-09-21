import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CalendarPlus,
  Sparkles
} from 'lucide-react';
import { DepartmentSelector } from './DepartmentSelector';
import { DoctorSelector } from './DoctorSelector';
import { DateSelector } from './DateSelector';
import { TimeSelector } from './TimeSelector';
import { AppointmentSummary } from './AppointmentSummary';
import { defaultHospital, mockAvailableDates, mockTimeSlots } from '../../data/mockAppointmentsData';
import { getDepartments } from '../../services/departmentService';
import { getDoctors } from '../../services/doctorService';
import { createAppointment } from '../../services/appointmentService';

const STEPS = [
  { id: 1, title: 'Department' },
  { id: 2, title: 'Doctor' },
  { id: 3, title: 'Date' },
  { id: 4, title: 'Time' },
  { id: 5, title: 'Summary' }
];

export const BookAppointmentModal = ({ isOpen, onClose, onAppointmentBooked }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Data loading states
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(mockAvailableDates[0]);
  const [selectedTime, setSelectedTime] = useState(mockTimeSlots.find((s) => s.available));
  const [reason, setReason] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  // Load departments on mount
  useEffect(() => {
    if (isOpen && departments.length === 0) {
      loadDepartments();
    }
  }, [isOpen]);

  // Load doctors when department changes
  useEffect(() => {
    if (selectedDepartment) {
      loadDoctors(selectedDepartment.id);
    }
  }, [selectedDepartment]);

  const loadDepartments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const departments = await getDepartments({ includeInactive: false });
      setDepartments(departments || []);
      
      // Auto-select first department if available
      if (departments && departments.length > 0) {
        setSelectedDepartment(departments[0]);
      }
    } catch (err) {
      console.error('Failed to load departments:', err);
      setError('Failed to load departments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDoctors = async (departmentId) => {
    try {
      setIsLoading(true);
      setError(null);
      const allDoctors = await getDoctors({ departmentId });
      
      // Filter only available doctors
      const availableDoctors = (allDoctors || []).filter(
        (doc) => doc.working_status === 'available' && doc.user?.status === 'active'
      );
      
      setDoctors(availableDoctors);
      
      // Auto-select first available doctor
      if (availableDoctors.length > 0) {
        setSelectedDoctor(availableDoctors[0]);
      } else {
        setSelectedDoctor(null);
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Failed to load doctors. Please try again.');
      setDoctors([]);
      setSelectedDoctor(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Handle department change - also load doctors for that department
  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setSelectedDoctor(null); // Reset doctor selection
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Parse date from selected date (format: "18 September 2026")
      const dateParts = selectedDate.full.split(' ');
      const day = dateParts[0].padStart(2, '0');
      const monthName = dateParts[1];
      const year = dateParts[2];
      
      const monthMap = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
      };
      const month = monthMap[monthName];
      const appointmentDate = `${year}-${month}-${day}`;

      // Parse time slots (format: "10:30 AM")
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
      };

      const startTime = parseTime(selectedTime.time);
      // Default 30-minute appointment duration
      const startHour = parseInt(startTime.split(':')[0], 10);
      const startMin = parseInt(startTime.split(':')[1], 10);
      let endHour = startHour;
      let endMin = startMin + 30;
      if (endMin >= 60) {
        endHour += 1;
        endMin -= 60;
      }
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}:00`;

      // Create appointment via API
      const newAppointment = await createAppointment({
        doctor_id: selectedDoctor.id,
        department_id: selectedDepartment.id,
        appointment_date: appointmentDate,
        start_time: startTime,
        end_time: endTime,
        appointment_type: 'consultation',
        reason: reason || 'General medical consultation',
      });

      // Format for display
      const displayAppointment = {
        id: newAppointment.appointment_number,
        appointmentId: newAppointment.id,
        department: newAppointment.departmentName || selectedDepartment.name,
        doctor: newAppointment.doctorName || selectedDoctor.user?.full_name || 'Doctor',
        specialization: newAppointment.doctorSpecialization || selectedDoctor.specialization || 'Consultant Specialist',
        date: selectedDate.full,
        dateShort: selectedDate.short,
        time: selectedTime.time,
        hospital: defaultHospital,
        room: newAppointment.doctorRoom || selectedDoctor.room_number || 'To be assigned',
        status: 'Confirmed',
        tab: 'upcoming',
        type: 'New Booking',
        reason: reason || 'General medical consultation',
        journeyStages: [
          { id: 1, name: 'Registration', status: 'pending', time: 'Check-in on arrival' },
          { id: 2, name: 'Doctor Consultation', status: 'pending', time: selectedTime.time },
          { id: 3, name: 'Laboratory', status: 'pending', time: 'If prescribed' },
          { id: 4, name: 'Doctor Review', status: 'pending', time: 'Post-tests' },
          { id: 5, name: 'Pharmacy', status: 'pending', time: 'Dispensation' }
        ]
      };

      setBookedAppointment(displayAppointment);
      setIsSuccess(true);
      onAppointmentBooked(displayAppointment);
    } catch (err) {
      console.error('Failed to create appointment:', err);
      setError(err.message || 'Failed to create appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state upon closing
    setIsSuccess(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
        {/* ── Modal Header ── */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex items-center justify-center">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#17221B]">
                {isSuccess ? 'Booking Confirmed' : 'Book New Appointment'}
              </h3>
              <p className="text-xs text-[#64748B]">
                {isSuccess
                  ? 'Your appointment has been registered with MediFlow'
                  : `Step ${currentStep} of 5: ${STEPS[currentStep - 1].title}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Stepper Bar (visible when not in success screen) ── */}
        {!isSuccess && (
          <div className="px-5 sm:px-6 py-3 bg-slate-50/80 border-b border-[#E2E8F0] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {STEPS.map((step, idx) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => isPast && setCurrentStep(step.id)}
                    disabled={!isPast}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#15803D] text-white'
                        : isPast
                        ? 'text-[#15803D] hover:bg-[#F0FDF4] cursor-pointer'
                        : 'text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-[#15803D]'
                          : isPast
                          ? 'bg-[#15803D] text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPast ? '✓' : step.id}
                    </span>
                    <span className="hidden sm:inline">{step.title}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <span className="h-0.5 w-3 sm:w-6 bg-slate-200" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Modal Body Content ── */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/25 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1 max-w-sm">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                  Appointment Booked Successfully
                </span>
                <h4 className="text-lg font-bold text-[#17221B] pt-1">
                  Appointment ID: {bookedAppointment?.id}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your consultation with <span className="font-semibold text-[#17221B]">{bookedAppointment?.doctor}</span> has been confirmed for <span className="font-semibold text-[#17221B]">{bookedAppointment?.date}</span> at <span className="font-semibold text-[#17221B]">{bookedAppointment?.time}</span>.
                </p>
              </div>

              {/* Quick Summary Card */}
              <div className="w-full max-w-md bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Department:</span>
                  <span className="font-semibold text-[#17221B]">{bookedAppointment?.department}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Doctor:</span>
                  <span className="font-semibold text-[#17221B]">{bookedAppointment?.doctor}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Date & Time:</span>
                  <span className="font-semibold text-[#17221B]">{bookedAppointment?.date} at {bookedAppointment?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Hospital Location:</span>
                  <span className="font-semibold text-[#17221B]">{bookedAppointment?.room}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#15803D] text-white text-xs sm:text-sm font-semibold hover:bg-[#166534] transition-colors shadow-xs cursor-pointer"
                >
                  View in Appointments
                </button>
              </div>
            </div>
          ) : (
            /* Step-by-Step Forms */
            <>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {currentStep === 1 && (
                <DepartmentSelector
                  departments={departments}
                  selectedDepartment={selectedDepartment}
                  onSelectDepartment={handleDepartmentSelect}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 2 && (
                <DoctorSelector
                  doctors={doctors}
                  selectedDepartment={selectedDepartment}
                  selectedDoctor={selectedDoctor}
                  onSelectDoctor={setSelectedDoctor}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 3 && (
                <DateSelector
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              )}

              {currentStep === 4 && (
                <TimeSelector
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              )}

              {currentStep === 5 && (
                <AppointmentSummary
                  department={selectedDepartment}
                  doctor={selectedDoctor}
                  date={selectedDate}
                  time={selectedTime}
                  reason={reason}
                  onReasonChange={setReason}
                  onConfirm={handleConfirm}
                />
              )}
            </>
          )}
        </div>

        {/* ── Modal Footer Buttons ── */}
        {!isSuccess && (
          <div className="px-5 sm:px-6 py-4 border-t border-[#E2E8F0] bg-slate-50/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                currentStep === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'border border-[#E2E8F0] bg-white text-[#17221B] hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#17221B] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !selectedDepartment) ||
                    (currentStep === 2 && !selectedDoctor) ||
                    (currentStep === 3 && !selectedDate) ||
                    (currentStep === 4 && !selectedTime)
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#15803D] text-white text-xs sm:text-sm font-semibold hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#15803D] text-white text-xs sm:text-sm font-semibold hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs focus:ring-2 focus:ring-[#15803D] cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isLoading ? 'Booking...' : 'Confirm Appointment'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
