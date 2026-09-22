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
      <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
        {/* ── 1. Page Title & Overview Description (28–32px Heading) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Here's your patient and workflow overview for today.
            </p>
          </div>
        </div>

        {/* ── 2. Primary Information — Doctor Status Panel ── */}
        <section aria-label="Doctor Status and Live Control">
          <DoctorStatusCard />
        </section>

        {/* ── 3. Today's Clinical Overview (Single Unified Panel) ── */}
        <section aria-label="Today's Clinical Overview">
          <SummaryCards />
        </section>

        {/* ── 4. Clinical Workflow / Quick Actions ── */}
        <section aria-label="Clinical Workflows and Quick Actions">
          <QuickActions />
        </section>

        {/* ── 5. Supporting Information & Queue Management ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (7/12): Current Queue Table */}
          <div className="lg:col-span-7">
            <CurrentQueue />
          </div>

          {/* Right Column (5/12): Supporting Metrics (natural height) + Timeline Overview */}
          <div className="lg:col-span-5 space-y-5">
            <section aria-label="Supporting Clinical Metrics">
              <AdditionalStatisticsCards />
            </section>
            <section aria-label="Today's Timeline Overview">
              <TodayOverview />
            </section>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
