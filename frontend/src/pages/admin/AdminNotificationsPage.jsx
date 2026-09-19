import React, { useState, useMemo } from 'react';
import {
  Bell,
  CheckCheck,
  RotateCcw,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminNotificationSummaryCards } from '../../components/admin/notifications/AdminNotificationSummaryCards';
import { AdminNotificationFilters } from '../../components/admin/notifications/AdminNotificationFilters';
import { AdminNotificationList } from '../../components/admin/notifications/AdminNotificationList';
import { AdminNotificationDetailsModal } from '../../components/admin/notifications/AdminNotificationDetailsModal';
import {
  initialAdminSystemNotifications,
  adminNotificationSummaryStats,
} from '../../data/adminMockData';

export const AdminNotificationsPage = () => {
  // Master notification state
  const [notifications, setNotifications] = useState(initialAdminSystemNotifications);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedReadStatus, setSelectedReadStatus] = useState('All');

  // Modal state
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast / feedback message state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle single notification read status
  const handleToggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          const updatedUnread = !notif.unread;
          showToast(
            updatedUnread ? 'Notification marked as unread' : 'Notification marked as read',
            'info'
          );
          return { ...notif, unread: updatedUnread };
        }
        return notif;
      })
    );

    // Update modal if currently viewing this notification
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification((prev) => ({
        ...prev,
        unread: !prev.unread,
      }));
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    const unreadCount = notifications.filter((n) => n.unread).length;
    if (unreadCount === 0) {
      showToast('All notifications are already marked as read', 'info');
      return;
    }

    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false }))
    );

    if (selectedNotification) {
      setSelectedNotification((prev) => ({ ...prev, unread: false }));
    }

    showToast('All notifications marked as read', 'success');
  };

  // Delete notification (local React state only)
  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    if (selectedNotification && selectedNotification.id === id) {
      setIsModalOpen(false);
      setSelectedNotification(null);
    }
    showToast('Notification removed', 'info');
  };

  // Open details modal
  const handleViewDetails = (notif) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };

  // Reset to initial mock notifications
  const handleResetNotifications = () => {
    setNotifications([...initialAdminSystemNotifications]);
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedReadStatus('All');
    showToast('Notification list reset to initial state', 'info');
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedReadStatus('All');
  };

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalCount = notifications.length;
    const unreadCount = notifications.filter((n) => n.unread).length;
    const highPriorityCount = notifications.filter(
      (n) => n.priority === 'High' || n.priority === 'Critical'
    ).length;
    const todayCount = notifications.filter((n) => n.dateGroup === 'Today').length;

    return {
      totalCount,
      unreadCount,
      highPriorityCount,
      todayCount,
    };
  }, [notifications]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Search filter (title, message, related patient, notification ID)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = notif.title?.toLowerCase().includes(query);
        const matchesMessage = notif.message?.toLowerCase().includes(query);
        const matchesId = notif.id?.toLowerCase().includes(query);
        const matchesPatient = notif.patient?.toLowerCase().includes(query);
        const matchesDoctor = notif.doctor?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesMessage && !matchesId && !matchesPatient && !matchesDoctor) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All') {
        if (notif.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Priority filter
      if (selectedPriority !== 'All') {
        if (notif.priority?.toLowerCase() !== selectedPriority.toLowerCase()) {
          return false;
        }
      }

      // Read status filter
      if (selectedReadStatus !== 'All') {
        if (selectedReadStatus === 'Unread' && !notif.unread) {
          return false;
        }
        if (selectedReadStatus === 'Read' && notif.unread) {
          return false;
        }
      }

      return true;
    });
  }, [notifications, searchQuery, selectedCategory, selectedPriority, selectedReadStatus]);

  return (
    <AdminLayout
      title="Notifications"
      subtitle="View and manage system-wide hospital workflow alerts and administrative notifications."
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* ── Toast Notification ── */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
                  : 'bg-slate-900 text-slate-50 border-slate-700'
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 ${
                  toastMessage.type === 'success'
                    ? 'text-emerald-400'
                    : 'text-[#CCFBF1]'
                }`}
              />
              <span>{toastMessage.message}</span>
            </div>
          </div>
        )}

        {/* ── Page Header Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Notifications
              </h1>
              {stats.unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-[#0F766E] border border-teal-200">
                  {stats.unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              View and manage system-wide hospital workflow alerts and administrative notifications.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mark All as Read Button */}
            <button
              onClick={handleMarkAllAsRead}
              disabled={stats.unreadCount === 0}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer ${
                stats.unreadCount > 0
                  ? 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              title="Mark all notifications as read"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Mark All as Read</span>
            </button>

            {/* Reset Mock Data Button */}
            <button
              onClick={handleResetNotifications}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Reset notification data to default mock values"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset Mock</span>
            </button>
          </div>
        </div>

        {/* ── Summary KPI Cards ── */}
        <AdminNotificationSummaryCards
          totalCount={stats.totalCount}
          unreadCount={stats.unreadCount}
          highPriorityCount={stats.highPriorityCount}
          todayCount={stats.todayCount}
        />

        {/* ── Filter Bar ── */}
        <AdminNotificationFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedReadStatus={selectedReadStatus}
          onReadStatusChange={setSelectedReadStatus}
          onClearFilters={handleClearFilters}
          totalResults={filteredNotifications.length}
        />

        {/* ── Notification List Section ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                System Notifications
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                ({filteredNotifications.length} available)
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Live Local State • Phase 1
            </div>
          </div>

          <AdminNotificationList
            notifications={filteredNotifications}
            onViewDetails={handleViewDetails}
            onToggleReadStatus={handleToggleReadStatus}
            onDelete={handleDeleteNotification}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* ── Notification Details Modal ── */}
        <AdminNotificationDetailsModal
          notification={selectedNotification}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedNotification(null);
          }}
          onToggleReadStatus={handleToggleReadStatus}
        />

        {/* ── Phase 1 Mock Notice ── */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] flex-shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                Admin Notifications Console — Phase 1 Demonstration
              </span>
              <p className="text-[11px] text-slate-500">
                All alerts, queues, and clinical milestone updates are simulated locally. No real external email, SMS, or hospital database connections are active.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white font-mono text-[11px] text-[#0F766E] border border-[#0F766E]/20 font-semibold flex-shrink-0">
            MOCK DATA — PHASE 1
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
