import React from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminSummaryCards } from '../../components/admin/dashboard/AdminSummaryCards';
import { PatientFlowOverview } from '../../components/admin/dashboard/PatientFlowOverview';
import { TodayAppointmentsCard } from '../../components/admin/dashboard/TodayAppointmentsCard';
import { DoctorAvailabilityCard } from '../../components/admin/dashboard/DoctorAvailabilityCard';
import { DepartmentOverviewCard } from '../../components/admin/dashboard/DepartmentOverviewCard';
import { HospitalWorkflowStatusCard } from '../../components/admin/dashboard/HospitalWorkflowStatusCard';
import { AIAgentActivityCard } from '../../components/admin/dashboard/AIAgentActivityCard';
import { RecentSystemActivityCard } from '../../components/admin/dashboard/RecentSystemActivityCard';
import { SystemAlertsCard } from '../../components/admin/dashboard/SystemAlertsCard';
import { AdminQuickActionsCard } from '../../components/admin/dashboard/AdminQuickActionsCard';

export const AdminDashboard = () => {
  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Hospital overview, operations, and system activity."
    >
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* ── 1. Overview Summary Cards (6 KPIs) ── */}
        <AdminSummaryCards />

        {/* ── 2. Patient Flow Process Overview ── */}
        <PatientFlowOverview />

        {/* ── 3. Quick Actions Shortcuts ── */}
        <AdminQuickActionsCard />

        {/* ── 4. Clinical & Schedule Operations Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TodayAppointmentsCard />
          <DoctorAvailabilityCard />
        </div>

        {/* ── 5. Department & Hospital Workflow Health Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DepartmentOverviewCard />
          <HospitalWorkflowStatusCard />
        </div>

        {/* ── 6. AI Agent Intelligence, System Activity & System Alerts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <AIAgentActivityCard />
          </div>
          <div className="lg:col-span-1">
            <RecentSystemActivityCard />
          </div>
          <div className="lg:col-span-1">
            <SystemAlertsCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
