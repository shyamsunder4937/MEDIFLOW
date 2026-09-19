import React from 'react';
import {
  Sliders,
  Bell,
  AlertTriangle,
  LayoutGrid,
  Check,
} from 'lucide-react';

export const AdminPreferencesCard = ({
  preferences,
  onTogglePreference,
}) => {
  const {
    emailNotifications = true,
    systemAlerts = true,
    compactDashboard = false,
  } = preferences;

  const toggleItems = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive critical operational summaries and daily reports via email.',
      icon: Bell,
      checked: emailNotifications,
    },
    {
      id: 'systemAlerts',
      title: 'System Alerts',
      description: 'Real-time in-app banners for queue capacity spikes and urgent clinical alerts.',
      icon: AlertTriangle,
      checked: systemAlerts,
    },
    {
      id: 'compactDashboard',
      title: 'Compact Dashboard',
      description: 'Enable condensed card view for high-density administrative monitoring displays.',
      icon: LayoutGrid,
      checked: compactDashboard,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Interface & Notification Preferences
            </h3>
            <p className="text-xs text-slate-500">
              Customize portal behavior and notification delivery (Local state).
            </p>
          </div>
        </div>

        {/* Toggle List */}
        <div className="space-y-3">
          {toggleItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onTogglePreference(item.id)}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer transition-colors select-none"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`mt-0.5 h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.checked
                        ? 'bg-teal-50 text-[#0F766E] border border-teal-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 leading-snug line-clamp-1 sm:line-clamp-none">
                      {item.description}
                    </div>
                  </div>
                </div>

                {/* Switch Toggle */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                      item.checked ? 'bg-[#0F766E]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        item.checked ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Preferences applied to local session</span>
        <span>Auto-saved</span>
      </div>
    </div>
  );
};
