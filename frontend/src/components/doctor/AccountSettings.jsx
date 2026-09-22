import React from 'react';
import { Bell, Mail, Users, CalendarCheck } from 'lucide-react';

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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#15803D]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
              Account Settings
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Notification preferences & alert settings
            </p>
          </div>
        </div>
      </div>

      {/* Toggles List */}
      <div className="space-y-2.5 text-xs">
        {toggles.map((item) => {
          const isEnabled = settings[item.key];
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 transition-colors hover:bg-slate-100/60 gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white text-[#15803D] border border-slate-200 mt-0.5 flex-shrink-0 shadow-2xs">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-[#17221B] text-xs">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
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
                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  isEnabled ? 'bg-[#15803D]' : 'bg-slate-300'
                }`}
              >
                <span className="sr-only">Toggle {item.label}</span>
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
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

