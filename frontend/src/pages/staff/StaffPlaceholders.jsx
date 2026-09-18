import React from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import {
  Users,
  CalendarDays,
  Stethoscope,
  FlaskConical,
  Pill,
  Bell,
  HelpCircle,
  Settings,
} from 'lucide-react';

const PlaceholderWrapper = ({ title, subtitle, icon: Icon, badge, description }) => (
  <StaffLayout title={title} subtitle={subtitle}>
    <div className="p-4 sm:p-6 lg:p-7 max-w-4xl mx-auto py-12">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] mx-auto shadow-inner">
          <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0F766E]">
            <span>{badge || 'Module Coming in Next Step'}</span>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </StaffLayout>
);

export const StaffPatientsPage = () => (
  <PlaceholderWrapper
    title="Staff Patients Directory"
    subtitle="Hospital-wide patient lookup and registration records."
    icon={Users}
    badge="Patient Records Module"
    description="Comprehensive search, registration intake, emergency admission tracking, and patient KYC verification will be built here."
  />
);

export const StaffAppointmentsPage = () => (
  <PlaceholderWrapper
    title="Staff Appointments Management"
    subtitle="Schedule, check-in, and manage OPD doctor bookings."
    icon={CalendarDays}
    badge="Appointments Module"
    description="Centralized appointment scheduler, slot management, walk-in bookings, and cancellation overrides will be built here."
  />
);

export const StaffDoctorsPage = () => (
  <PlaceholderWrapper
    title="Doctor Availability & Duty Roster"
    subtitle="Consultant room allocation and real-time shift status."
    icon={Stethoscope}
    badge="Doctor Roster Module"
    description="Detailed physician schedules, room occupancy management, on-call alerts, and shift assignment will be built here."
  />
);

export const StaffLabPage = () => (
  <PlaceholderWrapper
    title="Lab Coordination & Diagnostics"
    subtitle="Sample collection queues and pathology report delivery."
    icon={FlaskConical}
    badge="Lab Coordination Module"
    description="Phlebotomy check-in, barcode scanning, test status monitoring, and critical value dispatch alerts will be built here."
  />
);

export const StaffPharmacyPage = () => (
  <PlaceholderWrapper
    title="Pharmacy Coordination & Dispensation"
    subtitle="Prescription packing and pickup counter throughput."
    icon={Pill}
    badge="Pharmacy Module"
    description="Prescription order processing, token display boards, stock check flags, and medication pickup verifications will be built here."
  />
);

export const StaffNotificationsPage = () => (
  <PlaceholderWrapper
    title="Staff Operational Notifications"
    subtitle="Hospital-wide broadcasts, emergency alerts, and department chimes."
    icon={Bell}
    badge="Notifications Module"
    description="Real-time operational alerts, code blue notifications, queue threshold warnings, and direct paging will be built here."
  />
);

export const StaffHelpPage = () => (
  <PlaceholderWrapper
    title="Staff Help Desk & Protocols"
    subtitle="SOP guidelines and hospital IT support assistance."
    icon={HelpCircle}
    badge="Staff Help Desk"
    description="Operations manual, OPD protocols, emergency contact directory, and system troubleshooting guides."
  />
);

export const StaffSettingsPage = () => (
  <PlaceholderWrapper
    title="Staff Counter Settings"
    subtitle="Counter preferences, audio chime devices, and printer setups."
    icon={Settings}
    badge="Counter Settings"
    description="Configure receipt printer, token calling audio alerts, desk number, and dark mode display preferences."
  />
);
