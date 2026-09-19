import React from 'react';
import { Calendar, Layers } from 'lucide-react';
import { AdminNotificationCard } from './AdminNotificationCard';
import { AdminNotificationEmptyState } from './AdminNotificationEmptyState';

const GROUP_ORDER = ['Today', 'Yesterday', 'Earlier'];

export const AdminNotificationList = ({
  notifications,
  onViewDetails,
  onToggleReadStatus,
  onDelete,
  onClearFilters,
}) => {
  if (!notifications || notifications.length === 0) {
    return <AdminNotificationEmptyState onClearFilters={onClearFilters} />;
  }

  // Group notifications by dateGroup
  const grouped = notifications.reduce((acc, notif) => {
    const groupKey = notif.dateGroup || 'Earlier';
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(notif);
    return acc;
  }, {});

  // Determine active groups preserving standard chronological order
  const activeGroups = GROUP_ORDER.filter((g) => grouped[g] && grouped[g].length > 0);

  // If there are unknown dateGroups, append them
  Object.keys(grouped).forEach((g) => {
    if (!activeGroups.includes(g) && grouped[g].length > 0) {
      activeGroups.push(g);
    }
  });

  return (
    <div className="space-y-6">
      {activeGroups.map((groupName) => {
        const items = grouped[groupName];
        const unreadInGroup = items.filter((n) => n.unread).length;

        return (
          <div key={groupName} className="space-y-3">
            {/* Group Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {groupName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {items.length}
                </span>
              </div>

              {unreadInGroup > 0 && (
                <span className="text-[11px] font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                  {unreadInGroup} unread
                </span>
              )}
            </div>

            {/* Notification Cards in Group */}
            <div className="space-y-2.5">
              {items.map((notification) => (
                <AdminNotificationCard
                  key={notification.id}
                  notification={notification}
                  onViewDetails={onViewDetails}
                  onToggleReadStatus={onToggleReadStatus}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
