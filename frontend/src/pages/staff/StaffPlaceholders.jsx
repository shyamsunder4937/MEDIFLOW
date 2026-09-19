import React from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import {
  HelpCircle,
  Settings,
} from 'lucide-react';
const PlaceholderWrapper = ({ title, subtitle, icon: Icon, badge, description }) => (
  <StaffLayout title={title} subtitle={subtitle}>
    <div className="p-4 sm:p-6 lg:p-7 max-w-4xl mx-auto py-12">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-xs">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] mx-auto shadow-inner">
          <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0F766E]">
            <span>{badge || 'Module Coming in Next Step'}</span>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </StaffLayout>
);


export const StaffHelpPage = () => (
  <PlaceholderWrapper
    title="Staff Help Desk & Protocols"
    subtitle="SOP guidelines and hospital IT support assistance."
    icon={HelpCircle}
    badge="Staff Help Desk"
    description="Operations manual, OPD protocols, emergency contact directory, and system troubleshooting guides."
  />
);

export const StaffSettingsPage = () => (
  <PlaceholderWrapper
    title="Staff Counter Settings"
    subtitle="Counter preferences, audio chime devices, and printer setups."
    icon={Settings}
    badge="Counter Settings"
    description="Configure receipt printer, token calling audio alerts, desk number, and dark mode display preferences."
  />
);
