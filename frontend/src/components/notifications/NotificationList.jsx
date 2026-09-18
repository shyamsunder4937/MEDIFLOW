import React from 'react';
import { NotificationItem } from './NotificationItem';

export const NotificationList = ({ notifications, onMarkRead, onDismiss, onViewDetails }) => {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
          onDismiss={onDismiss}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
