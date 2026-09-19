import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  ArrowLeft,
  Users,
  UserCheck,
  Building2,
  Activity,
  Bot,
  Bell,
  UserCircle,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';

const placeholderConfigs = {
  '/admin/users': {
    title: 'User Management',
    subtitle: 'Manage patient, doctor, and staff accounts',
    icon: Users,
    description:
      'The User Management module will allow System Administrators to view all registered users, manage roles, grant permissions, and configure access levels.',
  },
  '/admin/doctors': {
    title: 'Doctor Management',
    subtitle: 'Manage doctor profiles, specialties, and schedules',
    icon: UserCheck,
    description:
      'The Doctor Management module will allow administrators to manage physician rosters, assign consultation rooms, and adjust shift timings.',
  },
  '/admin/departments': {
    title: 'Department Management',
    subtitle: 'Manage hospital departments, wards, and services',
    icon: Building2,
    description:
      'The Department Management module will enable administration of clinical departments, bed quotas, and service catalogs.',
  },
  '/admin/workflow': {
    title: 'Workflow Monitoring',
    subtitle: 'Monitor end-to-end hospital operational flow',
    icon: Activity,
    description:
      'The Workflow Monitoring module provides detailed stage-by-stage insights into patient queues, service bottlenecks, and throughput metrics.',
  },
  '/admin/ai-agent': {
    title: 'AI Agent Activity & Optimization',
    subtitle: 'Autonomous triage logs and recommendations',
    icon: Bot,
    description:
      'The AI Agent Activity console provides insights into simulated autonomous decision-making, queue balancing, and automated triage alerts.',
  },
  '/admin/notifications': {
    title: 'Admin Notifications',
    subtitle: 'System broadcasts, audit alerts, and operations feed',
    icon: Bell,
    description:
      'Manage system-wide alerts, configure notification channels, and review audit trail logs.',
  },
  '/admin/profile': {
    title: 'Admin Profile',
    subtitle: 'Administrator account details and credentials',
    icon: UserCircle,
    description:
      'View administrator profile information, active security sessions, and administrative privilege logs.',
  },
  '/admin/help': {
    title: 'Admin Help & Support',
    subtitle: 'System documentation, operational guides, and IT support',
    icon: HelpCircle,
    description:
      'Access MediFlow administrator documentation, user manuals, and technical support resources.',
  },
  '/admin/settings': {
    title: 'Admin Settings',
    subtitle: 'System configuration, multi-tenant settings, and security policies',
    icon: Settings,
    description:
      'Configure hospital operating hours, queue threshold alerts, data retention policies, and authentication parameters.',
  },
};

export const AdminGenericPlaceholderPage = () => {
  const location = useLocation();
  const config = placeholderConfigs[location.pathname] || {
    title: 'Admin Module',
    subtitle: 'Phase 1 Administration',
    icon: Shield,
    description: 'This administration module is scheduled for Phase 2 development.',
  };

  const Icon = config.icon;

  return (
    <AdminLayout title={config.title} subtitle={config.subtitle}>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 text-center shadow-xs">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 shadow-xs">
              <Icon className="h-8 w-8" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">
            {config.title}
          </h2>
          <p className="text-sm text-[#64748B] max-w-lg mx-auto mb-6">
            {config.description}
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-800 mb-8">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Phase 1 Module Placeholder — Admin Dashboard Active
          </div>

          <div className="flex justify-center">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] transition-all shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGenericPlaceholderPage;
