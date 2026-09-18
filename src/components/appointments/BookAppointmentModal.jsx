import React, { useState } from 'react';
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
import { defaultHospital, mockDepartments, mockDoctors, mockAvailableDates, mockTimeSlots } from '../../data/mockAppointmentsData';

const STEPS = [
  { id: 1, title: 'Department' },
  { id: 2, title: 'Doctor' },
  { id: 3, title: 'Date' },
  { id: 4, title: 'Time' },
  { id: 5, title: 'Summary' }
];

export const BookAppointmentModal = ({ isOpen, onClose, onAppointmentBooked }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [selectedDepartment, setSelectedDepartment] = useState(mockDepartments[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(
    mockDoctors.find((d) => d.departmentId === mockDepartments[0].id && d.available) || mockDoctors[0]
  );
  const [selectedDate, setSelectedDate] = useState(mockAvailableDates[0]);
  const [selectedTime, setSelectedTime] = useState(mockTimeSlots.find((s) => s.available));
  const [reason, setReason] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  if (!isOpen) return null;

  // Handle department change - also reset selected doctor to first available in that department
  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    const firstAvail = mockDoctors.find((d) => d.departmentId === dept.id && d.available);
    setSelectedDoctor(firstAvail || null);
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

  const handleConfirm = () => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment = {
      id: newId,
      department: selectedDepartment?.name || 'General Medicine',
      doctor: selectedDoctor?.name || 'Dr. Arun Kumar',
      specialization: selectedDoctor?.specialization || 'Consultant Specialist',
      date: selectedDate?.full || '18 September 2026',
      dateShort: selectedDate?.short || '18 Sep',
      time: selectedTime?.time || '10:30 AM',
      hospital: defaultHospital,
      room: selectedDoctor?.room || 'OPD Block B, Room 204',
      status: 'Confirmed',
      tab: 'upcoming',
      type: 'New Booking',
      reason: reason || 'General medical consultation',
      journeyStages: [
        { id: 1, name: 'Registration', status: 'pending', time: 'Check-in on arrival' },
        { id: 2, name: 'Doctor Consultation', status: 'pending', time: selectedTime?.time || '10:30 AM' },
        { id: 3, name: 'Laboratory', status: 'pending', time: 'If prescribed' },
        { id: 4, name: 'Doctor Review', status: 'pending', time: 'Post-tests' },
        { id: 5, name: 'Pharmacy', status: 'pending', time: 'Dispensation' }
      ]
    };

    setBookedAppointment(newAppointment);
    setIsSuccess(true);
    onAppointmentBooked(newAppointment);
  };

  const handleClose = () => {
    // Reset state upon closing
    setIsSuccess(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* ── Modal Header ── */}
        <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
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
            className="h-8 w-8 rounded-xl flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Stepper Bar (visible when not in success screen) ── */}
        {!isSuccess && (
          <div className="px-5 sm:px-7 py-3 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            {STEPS.map((step, idx) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => isPast && setCurrentStep(step.id)}
                    disabled={!isPast}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#0F766E] text-white'
                        : isPast
                        ? 'text-[#0F766E] hover:bg-teal-50 cursor-pointer'
                        : 'text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-[#0F766E]'
                          : isPast
                          ? 'bg-[#0F766E] text-white'
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
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div className="space-y-1 max-w-sm">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/70 text-emerald-800">
                  Appointment Booked Successfully
                </span>
                <h4 className="text-xl font-bold text-[#0F172A] pt-1">
                  Appointment ID: {bookedAppointment?.id}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your consultation with <span className="font-semibold text-[#0F172A]">{bookedAppointment?.doctor}</span> has been confirmed for <span className="font-semibold text-[#0F172A]">{bookedAppointment?.date}</span> at <span className="font-semibold text-[#0F172A]">{bookedAppointment?.time}</span>.
                </p>
              </div>

              {/* Quick Summary Card */}
              <div className="w-full max-w-md bg-slate-50 border border-[#E2E8F0] rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Department:</span>
                  <span className="font-semibold text-[#0F172A]">{bookedAppointment?.department}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Doctor:</span>
                  <span className="font-semibold text-[#0F172A]">{bookedAppointment?.doctor}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-[#64748B]">Date & Time:</span>
                  <span className="font-semibold text-[#0F172A]">{bookedAppointment?.date} at {bookedAppointment?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Hospital Location:</span>
                  <span className="font-semibold text-[#0F172A]">{bookedAppointment?.room}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] text-white text-xs sm:text-sm font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
                >
                  View in Appointments
                </button>
              </div>
            </div>
          ) : (
            /* Step-by-Step Forms */
            <>
              {currentStep === 1 && (
                <DepartmentSelector
                  selectedDepartment={selectedDepartment}
                  onSelectDepartment={handleDepartmentSelect}
                />
              )}

              {currentStep === 2 && (
                <DoctorSelector
                  selectedDepartment={selectedDepartment}
                  selectedDoctor={selectedDoctor}
                  onSelectDoctor={setSelectedDoctor}
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
          <div className="px-5 sm:px-7 py-4 border-t border-[#E2E8F0] bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                currentStep === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs sm:text-sm font-semibold hover:bg-[#115E59] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs sm:text-sm font-semibold hover:bg-[#115E59] transition-all shadow-sm focus:ring-2 focus:ring-[#0F766E]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
