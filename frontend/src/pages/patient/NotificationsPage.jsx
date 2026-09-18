import React, { useState, useMemo } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { mockNotifications } from '../../data/mockPatientData';
import { NotificationSummaryCards } from '../../components/notifications/NotificationSummaryCards';
import { NotificationFilters } from '../../components/notifications/NotificationFilters';
import { NotificationList } from '../../components/notifications/NotificationList';
import { NotificationEmptyState } from '../../components/notifications/NotificationEmptyState';
import { NotificationDetailsModal } from '../../components/notifications/NotificationDetailsModal';
import { ContactReceptionModal } from '../../components/notifications/ContactReceptionModal';
import { HelpSupportModal } from '../../components/notifications/HelpSupportModal';
import { NotificationHelpCard } from '../../components/notifications/NotificationHelpCard';
import { CheckCircle2, Info } from 'lucide-react';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Counts
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = totalCount - unreadCount;

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Tab filter
      if (activeTab === 'unread' && n.read) return false;
      if (activeTab !== 'all' && activeTab !== 'unread' && n.category !== activeTab) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = n.title.toLowerCase().includes(query);
        const matchesDesc = n.description.toLowerCase().includes(query);
        const matchesCat = n.category.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [notifications, activeTab, searchQuery]);

  // Actions
  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    showToast('Notification marked as read.');
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed.');
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleViewDetails = (notif) => {
    setSelectedNotification(notif);
    setIsDetailsOpen(true);
    if (!notif.read) {
      handleMarkRead(notif.id);
    }
  };

  return (
    <PatientLayout
      title="Notifications"
      subtitle="Stay updated on your appointments, queue status, lab results, and pharmacy orders."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#CCFBF1] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Summary Cards */}
        <NotificationSummaryCards
          total={totalCount}
          unread={unreadCount}
          read={readCount}
        />

        {/* 2. Filters and Search */}
        <NotificationFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMarkAllRead={handleMarkAllRead}
          hasUnread={unreadCount > 0}
        />

        {/* 3. Main Notification List / Empty State */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            {filteredNotifications.length > 0 ? (
              <NotificationList
                notifications={filteredNotifications}
                onMarkRead={handleMarkRead}
                onDismiss={handleDismiss}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <NotificationEmptyState
                hasFilter={activeTab !== 'all' || searchQuery.length > 0}
                onReset={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
              />
            )}
          </div>

          {/* Sidebar Help Card */}
          <div className="space-y-4">
            <NotificationHelpCard
              onOpenContact={() => setIsContactOpen(true)}
              onOpenHelp={() => setIsHelpOpen(true)}
            />
          </div>
        </div>

        {/* Modals */}
        <NotificationDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          notification={selectedNotification}
          onDismiss={handleDismiss}
        />

        <ContactReceptionModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <HelpSupportModal
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />
      </div>
    </PatientLayout>
  );
};

export default NotificationsPage;
