import React from 'react';
import { Bell, Clock, FlaskConical, Pill, Mail, MessageSquare } from 'lucide-react';

export const PreferencesCard = ({ preferences, onPreferenceChange }) => {
  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 ${
        enabled ? 'bg-[#0F766E]' : 'bg-[#E2E8F0]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const PreferenceItem = ({ icon: Icon, label, enabled, onChange, iconColor }) => (
    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#0F766E]/20 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-[#0F172A]">{label}</span>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#0F172A] mb-1">Preferences</h2>
        <p className="text-xs text-[#64748B]">
          Manage your notification and communication preferences
        </p>
      </div>

      <div className="space-y-3">
        <PreferenceItem
          icon={Clock}
          label="Appointment Reminders"
          enabled={preferences.appointmentReminders}
          onChange={(value) => onPreferenceChange('appointmentReminders', value)}
          iconColor="bg-green-50 text-green-600"
        />
        <PreferenceItem
          icon={Bell}
          label="Queue Updates"
          enabled={preferences.queueUpdates}
          onChange={(value) => onPreferenceChange('queueUpdates', value)}
          iconColor="bg-blue-50 text-blue-600"
        />
        <PreferenceItem
          icon={FlaskConical}
          label="Lab Result Notifications"
          enabled={preferences.labResults}
          onChange={(value) => onPreferenceChange('labResults', value)}
          iconColor="bg-purple-50 text-purple-600"
        />
        <PreferenceItem
          icon={Pill}
          label="Pharmacy Updates"
          enabled={preferences.pharmacyUpdates}
          onChange={(value) => onPreferenceChange('pharmacyUpdates', value)}
          iconColor="bg-orange-50 text-orange-600"
        />
        <PreferenceItem
          icon={Mail}
          label="Email Notifications"
          enabled={preferences.emailNotifications}
          onChange={(value) => onPreferenceChange('emailNotifications', value)}
          iconColor="bg-[#CCFBF1] text-[#0F766E]"
        />
        <PreferenceItem
          icon={MessageSquare}
          label="SMS Notifications"
          enabled={preferences.smsNotifications}
          onChange={(value) => onPreferenceChange('smsNotifications', value)}
          iconColor="bg-slate-100 text-slate-600"
        />
      </div>
    </div>
  );
};
