import React from 'react';
import {
  Bell,
  MailCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const AdminNotificationSummaryCards = ({
  totalCount,
  unreadCount,
  highPriorityCount,
  todayCount,
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Notifications',
      value: totalCount,
      subtitle: 'System-wide activity logs',
      icon: Bell,
      iconBg: 'bg-teal-50 text-[#0F766E] border border-teal-100',
      badge: 'All Modules',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      id: 'unread',
      title: 'Unread',
      value: unreadCount,
      subtitle: unreadCount > 0 ? 'Requires administrative review' : 'All caught up',
      icon: MailCheck,
      iconBg: unreadCount > 0 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-500 border border-slate-100',
      badge: unreadCount > 0 ? 'Action Needed' : 'Completed',
      badgeColor: unreadCount > 0 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200',
    },
    {
      id: 'high-priority',
      title: 'High Priority',
      value: highPriorityCount,
      subtitle: 'High & Critical priority flags',
      icon: AlertTriangle,
      iconBg: highPriorityCount > 0 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-500 border border-slate-100',
      badge: highPriorityCount > 0 ? 'Urgent' : 'Normal',
      badgeColor: highPriorityCount > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200',
    },
    {
      id: 'today',
      title: 'Today',
      value: todayCount,
      subtitle: 'Logged past 24 hours',
      icon: Clock,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      badge: 'Past 24h',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                </div>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} shadow-xs flex-shrink-0`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate">{card.subtitle}</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${card.badgeColor}`}
              >
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
