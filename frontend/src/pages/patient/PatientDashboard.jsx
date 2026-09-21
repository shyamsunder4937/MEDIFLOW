import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { QuickActions } from '../../components/patient/QuickActions';
import { AppointmentCard } from '../../components/patient/AppointmentCard';
import { JourneyTimeline } from '../../components/patient/JourneyTimeline';
import { LabStatusCard } from '../../components/patient/LabStatusCard';
import { PharmacyStatusCard } from '../../components/patient/PharmacyStatusCard';
import { NotificationList } from '../../components/patient/NotificationList';

// ─────────────────────────────────────────────────────────────────────────────
// Patient Dashboard — Professional Healthcare UI
// Information Hierarchy:
// Dashboard Header → Quick Shortcuts → Upcoming Appointment →
// My Hospital Journey → Laboratory & Pharmacy → Recent Notifications
// ─────────────────────────────────────────────────────────────────────────────
export const PatientDashboard = () => {
  return (
    <PatientLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
        {/* ── 1. Page Header (Single prominent title) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Overview of your current visit, upcoming appointments, and medical status.
            </p>
          </div>
        </div>

        {/* ── 2. Quick Shortcuts (Single horizontal row directly below header) ── */}
        <QuickActions />

        {/* ── 3. PRIMARY INFORMATION: Upcoming Appointment & Current Visit ── */}
        <section aria-label="Upcoming Appointment and Visit Status">
          <AppointmentCard />
        </section>

        {/* ── 4. MAIN CONTENT: Hospital Journey Workflow ── */}
        <section aria-label="Hospital Journey Workflow">
          <JourneyTimeline />
        </section>

        {/* ── 5. SECONDARY INFORMATION: Laboratory & Pharmacy (Equal 2-Column Grid) ── */}
        <section aria-label="Laboratory and Pharmacy Status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabStatusCard />
            <PharmacyStatusCard />
          </div>
        </section>

        {/* ── 6. SUPPORTING INFORMATION: Recent Notifications ── */}
        <section aria-label="Recent Activity and Notifications">
          <NotificationList />
        </section>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
