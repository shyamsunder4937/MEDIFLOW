import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { mockNotifications } from '../../data/mockPatientData';
import { NotificationSummaryCards } from '../../components/notifications/NotificationSummaryCards';
import { NotificationFilters } from '../../components/notifications/NotificationFilters';
import { NotificationList } from '../../components/notifications/NotificationList';
import { NotificationDetailsModal } from '../../components/notifications/NotificationDetailsModal';
import { NotificationEmptyState } from '../../components/notifications/NotificationEmptyState';
import { NotificationHelpCard } from '../../components/notifications/NotificationHelpCard';
import { ContactReceptionModal } from '../../components/notifications/ContactReceptionModal';
import { HelpSupportModal } from '../../components/notifications/HelpSupportModal';
import { CheckCircle2 } from 'lucide-react';

export const NotificationsPage = () => {
  // Initialize state with mock data
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null), 4000;
    }, 4000);
  };

  // Mark notification as read
  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    showToast('All notifications marked as read.');
  };

  // Dismiss/delete notification
  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    showToast('Notification dismissed.');
  };

  // View notification details
  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setIsDetailsModalOpen(true);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    // Tab filter
    if (activeTab === 'unread' && notif.read) return false;
    if (activeTab !== 'all' && activeTab !== 'unread' && notif.category !== activeTab) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notif.title.toLowerCase().includes(query) ||
        notif.description.toLowerCase().includes(query) ||
        notif.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Calculate summary stats
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const importantCount = notifications.filter(
    (n) => !n.read && (n.category === 'Appointment' || n.category === 'Laboratory')
  ).length;

  return (
    <PatientLayout
      title="Notifications"
      subtitle="Stay updated about your appointments, queue status, and hospital journey."
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#17221B] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#15803D] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section 1: Summary Overview */}
        <section aria-labelledby="notification-summary-heading">
          <h2 id="notification-summary-heading" className="sr-only">Notification Summary</h2>
          <NotificationSummaryCards
            total={totalNotifications}
            unread={unreadCount}
            important={importantCount}
          />
        </section>

        {/* Section 2: Filters & Search */}
        <section aria-labelledby="notification-filters-heading">
          <h2 id="notification-filters-heading" className="sr-only">Notification Filters</h2>
          <NotificationFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onMarkAllRead={handleMarkAllRead}
            hasUnread={unreadCount > 0}
          />
        </section>

        {/* Section 3: Notification List or Empty State */}
        <section className="space-y-3" aria-labelledby="notification-list-heading">
          <div className="flex items-center justify-between">
            <h2 id="notification-list-heading" className="text-base sm:text-lg font-bold text-[#17221B]">
              {activeTab === 'all'
                ? 'All Notifications'
                : activeTab === 'unread'
                ? 'Unread Notifications'
                : `${activeTab} Updates`}
            </h2>
            <span className="text-xs font-semibold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-0.5 rounded-full">
              {filteredNotifications.length} {filteredNotifications.length === 1 ? 'Alert' : 'Alerts'}
            </span>
          </div>

          {filteredNotifications.length > 0 ? (
            <NotificationList
              notifications={filteredNotifications}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <NotificationEmptyState />
          )}
        </section>

        {/* Section 4: Secondary Assistance */}
        {notifications.length > 0 && (
          <NotificationHelpCard
            onContactReception={() => setIsReceptionModalOpen(true)}
            onHelpSupport={() => setIsHelpModalOpen(true)}
          />
        )}

        {/* Modals */}
        <NotificationDetailsModal
          notification={selectedNotification}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedNotification(null);
          }}
          onMarkRead={handleMarkRead}
        />

        <ContactReceptionModal
          isOpen={isReceptionModalOpen}
          onClose={() => setIsReceptionModalOpen(false)}
        />

        <HelpSupportModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      </div>
    </PatientLayout>
  );
};
