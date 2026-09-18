import React from 'react';
import { Bell, Mail, Users, CalendarCheck, Check } from 'lucide-react';

export const AccountSettings = ({
  settings,
  onToggleSetting,
}) => {
  const toggles = [
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive shift updates, patient check-ins and hospital memos via email',
      icon: Mail,
    },
    {
      key: 'queueNotifications',
      label: 'Queue Notifications',
      description: 'Instant alerts when new patients check into Suite 4B waiting area',
      icon: Users,
    },
    {
      key: 'consultationReminders',
      label: 'Consultation Reminders',
      description: 'Sound chimes & reminders for priority consultations and critical labs',
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Bell className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Account Settings
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Notification preferences & alert settings
            </p>
          </div>
        </div>
      </div>

      {/* Toggles List */}
      <div className="space-y-3 text-xs">
        {toggles.map((item) => {
          const isEnabled = settings[item.key];
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 transition-colors hover:bg-slate-100/60 gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white text-[#0F766E] border border-slate-200 mt-0.5 flex-shrink-0 shadow-2xs">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {item.description}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => onToggleSetting(item.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isEnabled ? 'bg-[#0F766E]' : 'bg-slate-300'
                }`}
              >
                <span className="sr-only">Toggle {item.label}</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountSettings;
