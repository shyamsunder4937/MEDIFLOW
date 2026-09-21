import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { AppointmentCard } from '../../components/patient/AppointmentCard';
import { JourneyTimeline } from '../../components/patient/JourneyTimeline';
import { LabStatusCard } from '../../components/patient/LabStatusCard';
import { PharmacyStatusCard } from '../../components/patient/PharmacyStatusCard';
import { NotificationList } from '../../components/patient/NotificationList';
import { QuickActions } from '../../components/patient/QuickActions';

// ─────────────────────────────────────────────────────────────────────────────
// Patient Dashboard — Professional Healthcare UI
// Strict Information Hierarchy:
// Title → Primary Information (Appointment/Visit) → Main Content (Journey) →
// Secondary Information (Lab/Pharmacy) → Supporting Information (Notifications/Actions)
// ─────────────────────────────────────────────────────────────────────────────
export const PatientDashboard = () => {
  return (
    <PatientLayout
      title="Dashboard"
      subtitle="Overview of your current visit, upcoming appointments, and medical status."
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
        {/* ── 1. Page Title & Overview ── */}
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

        {/* ── 2. PRIMARY INFORMATION: Upcoming Appointment & Current Visit ── */}
        <section aria-label="Upcoming Appointment and Visit Status">
          <AppointmentCard />
        </section>

        {/* ── 3. MAIN CONTENT: Hospital Journey Workflow ── */}
        <section aria-label="Hospital Journey Workflow">
          <JourneyTimeline />
        </section>

        {/* ── 4. SECONDARY INFORMATION: Laboratory & Pharmacy (Equal 2-Column Grid) ── */}
        <section aria-label="Laboratory and Pharmacy Status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabStatusCard />
            <PharmacyStatusCard />
          </div>
        </section>

        {/* ── 5. SUPPORTING INFORMATION: Recent Notifications & Quick Shortcuts ── */}
        <section aria-label="Recent Activity and Shortcuts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NotificationList />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </section>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
