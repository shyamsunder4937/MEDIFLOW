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
import { Info } from 'lucide-react';

export const StaffDashboard = () => {
  return (
    <StaffLayout
      title="Hospital Staff Dashboard"
      subtitle="Monitor today's hospital activity, patient flow, appointments, and coordination tasks."
    >
      <div className="p-4 sm:p-6 lg:p-7 space-y-6 max-w-7xl mx-auto">
        {/* ── 1. Summary Cards (4 Cards Grid) ── */}
        <section aria-label="Today's Operational Summary">
          <StaffStatCards stats={staffSummaryStats} />
        </section>

        {/* ── 2. Current Queue Live Stream ── */}
        <section aria-label="Current Patient Queue">
          <StaffCurrentQueue queue={staffCurrentQueue} />
        </section>

        {/* ── 3. Doctor Availability Status ── */}
        <section aria-label="Physician Room Availability">
          <StaffDoctorAvailability doctors={staffDoctorsAvailability} />
        </section>

        {/* ── 4. Main 2-Column Split: Today's Appointments (7/12) + Recent Notifications (5/12) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left: Today's Appointments */}
          <div className="lg:col-span-7 space-y-5">
            <StaffAppointmentsPreview appointments={staffTodayAppointments} />
          </div>

          {/* Right: Recent Notifications */}
          <div className="lg:col-span-5 space-y-5">
            <StaffRecentNotifications notifications={staffRecentNotifications} />
          </div>
        </div>

        {/* ── 5. Lab Coordination & Pharmacy Coordination Summaries ── */}
        <section aria-label="Department Coordination Overviews">
          <StaffCoordinationCards
            labStats={staffLabSummary}
            pharmacyStats={staffPharmacySummary}
          />
        </section>

        {/* ── 6. Demo Prototype Notice ── */}
        <footer className="pt-2 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>MediFlow Hospital Staff Portal • Operations Overview (Phase 1 Prototype)</span>
          </div>
        </footer>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
