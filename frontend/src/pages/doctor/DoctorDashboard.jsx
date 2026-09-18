import React from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { DoctorStatusCard } from '../../components/doctor/DoctorStatusCard';
import { SummaryCards, AdditionalStatisticsCards } from '../../components/doctor/SummaryCards';
import { CurrentQueue } from '../../components/doctor/CurrentQueue';
import { QuickActions } from '../../components/doctor/QuickActions';
import { TodayOverview } from '../../components/doctor/TodayOverview';

// ─────────────────────────────────────────────────────────────────────────────
// Doctor Dashboard — Phase 1 (Mock data, local React state, no real APIs)
// ─────────────────────────────────────────────────────────────────────────────
export const DoctorDashboard = () => {
  return (
    <DoctorLayout>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-w-7xl mx-auto">
        {/* ── Row 1: Doctor Availability / Status Bar ── */}
        <DoctorStatusCard />

        {/* ── Row 2: Main Patient Summary Cards (4 Cards Grid) ── */}
        <section aria-label="Today's Patient Statistics">
          <SummaryCards />
        </section>

        {/* ── Row 3: Additional Statistics (2 Cards) & Quick Actions (4 Actions) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-5">
            <AdditionalStatisticsCards />
          </div>
          <div className="lg:col-span-7">
            <QuickActions />
          </div>
        </div>

        {/* ── Row 4: Current Queue (Primary 7/12) + Today's Timeline (5/12) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-7">
            <CurrentQueue />
          </div>
          <div className="lg:col-span-5">
            <TodayOverview />
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
