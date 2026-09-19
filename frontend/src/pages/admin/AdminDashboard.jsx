import React from 'react';
import { Shield, Users, UserCheck, Building2, Activity, Bot, Bell, UserCircle } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Admin Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E] text-white shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0F172A]">MediFlow Admin</h1>
              <p className="text-xs text-[#64748B]">System Administration Portal</p>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#64748B]">
            <UserCircle className="h-5 w-5" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-2xl p-8 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to Admin Portal</h2>
          <p className="text-white/90">
            Manage users, configure workflows, and monitor system operations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Users" value="1,247" color="blue" />
          <StatCard icon={UserCheck} label="Active Doctors" value="142" color="green" />
          <StatCard icon={Building2} label="Staff Members" value="89" color="purple" />
          <StatCard icon={Activity} label="Active Sessions" value="324" color="teal" />
        </div>

        {/* Admin Modules */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Administration Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ModuleCard icon={Users} title="User Management" description="Manage patient, doctor, and staff accounts" />
            <ModuleCard icon={UserCheck} title="Doctor Management" description="Configure doctor profiles and schedules" />
            <ModuleCard icon={Building2} title="Department Management" description="Manage hospital departments and services" />
            <ModuleCard icon={Activity} title="Workflow Configuration" description="Configure hospital workflow processes" />
            <ModuleCard icon={Bot} title="AI Agent Settings" description="Configure AI agent and automation" />
            <ModuleCard icon={Bell} title="Notifications" description="Manage system-wide notifications" />
          </div>
        </div>

        {/* Phase Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-blue-900">
            🚧 Phase 1 - Admin Dashboard
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Full admin functionality will be implemented in Phase 2
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    teal: 'bg-[#CCFBF1] text-[#0F766E]',
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-xs text-[#64748B] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
    </div>
  );
};

const ModuleCard = ({ icon: Icon, title, description }) => (
  <button className="text-left p-4 bg-[#F8FAFC] hover:bg-slate-50 border border-[#E2E8F0] rounded-xl transition-all hover:shadow-sm">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] mb-3">
      <Icon className="h-5 w-5" />
    </div>
    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{title}</h4>
    <p className="text-xs text-[#64748B]">{description}</p>
  </button>
);
