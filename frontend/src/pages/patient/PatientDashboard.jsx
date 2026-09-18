import React from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { CurrentVisitCard }    from '../../components/patient/CurrentVisitCard';
import { QueueCard }           from '../../components/patient/QueueCard';
import { JourneyTimeline }     from '../../components/patient/JourneyTimeline';
import { AppointmentCard }     from '../../components/patient/AppointmentCard';
import { LabStatusCard }       from '../../components/patient/LabStatusCard';
import { PharmacyStatusCard }  from '../../components/patient/PharmacyStatusCard';
import { NotificationList }    from '../../components/patient/NotificationList';
import { QuickActions }        from '../../components/patient/QuickActions';

// ─────────────────────────────────────────────────────────────────────────────
// Patient Dashboard — Phase 1 (mock data, no AI, no real APIs)
// ─────────────────────────────────────────────────────────────────────────────
export const PatientDashboard = () => {
  return (
    <PatientLayout>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-w-7xl mx-auto">

        {/* ── Row 1: Current Visit (2/3) + Queue (1/3) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2">
            <CurrentVisitCard />
          </div>
          <div className="lg:col-span-1">
            <QueueCard />
          </div>
        </div>

        {/* ── Row 2: Hospital Journey Timeline (full width) ── */}
        <JourneyTimeline />

        {/* ── Row 3: Appointment + Lab + Pharmacy ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AppointmentCard />
          <LabStatusCard />
          <PharmacyStatusCard />
        </div>

        {/* ── Row 4: Notifications + Quick Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
          <div className="lg:col-span-3">
            <NotificationList />
          </div>
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>

      </div>
    </PatientLayout>
  );
};
