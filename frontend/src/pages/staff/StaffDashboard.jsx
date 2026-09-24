import React from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { StaffStatCards } from '../../components/staff/StaffStatCards';
import { StaffCurrentQueue } from '../../components/staff/StaffCurrentQueue';
import { StaffDoctorAvailability } from '../../components/staff/StaffDoctorAvailability';
import { StaffAppointmentsPreview } from '../../components/staff/StaffAppointmentsPreview';
import { StaffCoordinationCards } from '../../components/staff/StaffCoordinationCards';
import { StaffRecentNotifications } from '../../components/staff/StaffRecentNotifications';
import {
  staffSummaryStats,
  staffCurrentQueue,
  staffDoctorsAvailability,
  staffTodayAppointments,
  staffLabSummary,
  staffPharmacySummary,
  staffRecentNotifications,
} from '../../data/staffMockData';
import { ShieldCheck } from 'lucide-react';

export const StaffDashboard = () => {
  return (
    <StaffLayout>
      <div className="p-4 sm:p-6 lg:p-7 space-y-6 max-w-7xl mx-auto">
        {/* ── 1. Page Header (28–32px Heading) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Hospital Staff Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Monitor today's hospital activity, patient flow, appointments, and coordination tasks.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-semibold text-[#17221B] shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
              </span>
              <span>Central OPD Desk 03</span>
              <span className="text-[#CBD5E1]">|</span>
              <span className="text-[#64748B] font-medium">Live Operations</span>
            </div>
          </div>
        </div>

        {/* ── 2. Current Operational Status (Compact Summary Indicators) ── */}
        <section aria-label="Current Operational Status">
          <StaffStatCards stats={staffSummaryStats} />
        </section>

        {/* ── 3. Main Operational Area — Patient / Queue Activity ── */}
        <section aria-label="Current Patient Queue Operations">
          <StaffCurrentQueue queue={staffCurrentQueue} />
        </section>

        {/* ── 4. Operational Schedules & Physician Rooms (Appointments + Doctor Availability) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left: Today's Appointments Preview (7/12) */}
          <div className="lg:col-span-7">
            <StaffAppointmentsPreview appointments={staffTodayAppointments} />
          </div>

          {/* Right: Doctor Availability & Room Occupancy (5/12) */}
          <div className="lg:col-span-5">
            <StaffDoctorAvailability doctors={staffDoctorsAvailability} />
          </div>
        </div>

        {/* ── 5. Department Coordination Workflows (Lab & Pharmacy) ── */}
        <section aria-label="Department Coordination Overviews">
          <StaffCoordinationCards
            labStats={staffLabSummary}
            pharmacyStats={staffPharmacySummary}
          />
        </section>

        {/* ── 6. Supporting Information — Recent Operational Notifications ── */}
        <section aria-label="Recent Operational Notifications and Activity">
          <StaffRecentNotifications notifications={staffRecentNotifications} />
        </section>

        {/* ── 7. Operational Footer ── */}
        <footer className="pt-2 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[11px] text-[#64748B]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#15803D]" />
            <span>MediFlow Hospital Operations Control • OPD Station 03 Active</span>
          </div>
        </footer>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;

