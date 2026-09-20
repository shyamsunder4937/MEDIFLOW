import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  UserCheck,
  Building2,
  Activity,
  Bot,
  Bell,
  UserCircle,
  LogOut,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import { DepartmentManagement } from '../../components/admin/DepartmentManagement';
import { DoctorManagement } from '../../components/admin/DoctorManagement';
import { StaffManagement } from '../../components/admin/StaffManagement';

import { getDepartments } from '../../services/departmentService';
import { getDoctors } from '../../services/doctorService';
import { getStaff } from '../../services/staffService';
import { getUsers } from '../../services/userService';

export const AdminDashboard = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'departments' | 'doctors' | 'staff'
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDoctors: 0,
    staffMembers: 0,
    departmentsCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const [depts, docs, staff, users] = await Promise.all([
        getDepartments({ includeInactive: true }).catch(() => []),
        getDoctors().catch(() => []),
        getStaff().catch(() => []),
        getUsers().catch(() => []),
      ]);

      const activeDocsCount = docs.filter(
        (d) => d.working_status === 'available' || d.working_status === 'busy'
      ).length;

      setStats({
        totalUsers: users.length,
        activeDoctors: docs.length,
        staffMembers: staff.length,
        departmentsCount: depts.length,
      });
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem('mediflow_user_role');
    await signOut();
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Admin Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E] text-white shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0F172A]">MediFlow Admin</h1>
              <p className="text-xs text-[#64748B]">System Administration Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <TabButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                label="Overview"
                icon={LayoutDashboard}
              />
              <TabButton
                active={activeTab === 'departments'}
                onClick={() => setActiveTab('departments')}
                label="Departments"
                icon={Building2}
              />
              <TabButton
                active={activeTab === 'doctors'}
                onClick={() => setActiveTab('doctors')}
                label="Doctors"
                icon={UserCheck}
              />
              <TabButton
                active={activeTab === 'staff'}
                onClick={() => setActiveTab('staff')}
                label="Staff"
                icon={Users}
              />
            </nav>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('overview')}
          className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg ${
            activeTab === 'overview' ? 'bg-[#CCFBF1] text-[#0F766E]' : 'text-[#64748B]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg ${
            activeTab === 'departments' ? 'bg-[#CCFBF1] text-[#0F766E]' : 'text-[#64748B]'
          }`}
        >
          Departments
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg ${
            activeTab === 'doctors' ? 'bg-[#CCFBF1] text-[#0F766E]' : 'text-[#64748B]'
          }`}
        >
          Doctors
        </button>
        <button
          onClick={() => setActiveTab('staff')}
          className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg ${
            activeTab === 'staff' ? 'bg-[#CCFBF1] text-[#0F766E]' : 'text-[#64748B]'
          }`}
        >
          Staff
        </button>
      </div>

      {/* Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Render Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-2xl p-8 text-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to Admin Portal</h2>
                  <p className="text-white/90 text-sm">
                    Manage hospital structure, departments, doctors, and staff coordination
                  </p>
                </div>
                <button
                  onClick={fetchStats}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loadingStats ? 'animate-spin' : ''}`} />
                  Refresh Metrics
                </button>
              </div>
            </div>

            {/* Quick Stats (Connected to Real Supabase Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Building2}
                label="Total Departments"
                value={loadingStats ? '...' : stats.departmentsCount}
                color="teal"
                onClick={() => setActiveTab('departments')}
              />
              <StatCard
                icon={UserCheck}
                label="Registered Doctors"
                value={loadingStats ? '...' : stats.activeDoctors}
                color="green"
                onClick={() => setActiveTab('doctors')}
              />
              <StatCard
                icon={Users}
                label="Staff Members"
                value={loadingStats ? '...' : stats.staffMembers}
                color="purple"
                onClick={() => setActiveTab('staff')}
              />
              <StatCard
                icon={Activity}
                label="System Users"
                value={loadingStats ? '...' : stats.totalUsers}
                color="blue"
              />
            </div>

            {/* Admin Modules Grid */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#0F172A] mb-4">Administration Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ModuleCard
                  icon={Building2}
                  title="Department Management"
                  description="Manage hospital clinical departments, locations, and active status"
                  onClick={() => setActiveTab('departments')}
                  badge="Active"
                />
                <ModuleCard
                  icon={UserCheck}
                  title="Doctor Management"
                  description="Configure doctor profiles, department links, and live working statuses"
                  onClick={() => setActiveTab('doctors')}
                  badge="Active"
                />
                <ModuleCard
                  icon={Users}
                  title="Staff Management"
                  description="Configure nursing, reception, lab, and operations staff assignments"
                  onClick={() => setActiveTab('staff')}
                  badge="Active"
                />
                <ModuleCard
                  icon={Activity}
                  title="Workflow Configuration"
                  description="Configure hospital queue workflows (Module 3+)"
                  badge="Upcoming"
                />
                <ModuleCard
                  icon={Bot}
                  title="AI Agent Settings"
                  description="Configure AI queue triage and agent automation"
                  badge="Upcoming"
                />
                <ModuleCard
                  icon={Bell}
                  title="Notifications"
                  description="Manage system-wide patient broadcast notifications"
                  badge="Upcoming"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Departments Management */}
        {activeTab === 'departments' && (
          <DepartmentManagement onUpdated={fetchStats} />
        )}

        {/* Tab 3: Doctors Management */}
        {activeTab === 'doctors' && (
          <DoctorManagement onUpdated={fetchStats} />
        )}

        {/* Tab 4: Staff Management */}
        {activeTab === 'staff' && (
          <StaffManagement onUpdated={fetchStats} />
        )}
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
      active
        ? 'bg-white text-[#0F766E] shadow-xs'
        : 'text-[#64748B] hover:text-[#0F172A]'
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon: Icon, label, value, color, onClick }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    teal: 'bg-[#CCFBF1] text-[#0F766E]',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm transition ${
        onClick ? 'cursor-pointer hover:border-[#0F766E]/40 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-xs text-[#64748B] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
    </div>
  );
};

const ModuleCard = ({ icon: Icon, title, description, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`text-left p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl transition-all ${
      onClick
        ? 'hover:bg-white hover:border-[#0F766E]/30 hover:shadow-sm cursor-pointer'
        : 'opacity-70 cursor-not-allowed'
    }`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
        <Icon className="h-5 w-5" />
      </div>
      {badge && (
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            badge === 'Active'
              ? 'bg-[#CCFBF1] text-[#0F766E]'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          {badge}
        </span>
      )}
    </div>
    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{title}</h4>
    <p className="text-xs text-[#64748B] leading-relaxed">{description}</p>
  </button>
);
