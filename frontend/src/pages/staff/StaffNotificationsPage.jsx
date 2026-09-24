import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffNotificationsPageData } from '../../data/staffMockData';
import { NotificationFilterBar } from '../../components/staff/notifications/NotificationFilterBar';
import { NotificationCard } from '../../components/staff/notifications/NotificationCard';
import { NotificationDetailModal } from '../../components/staff/notifications/NotificationDetailModal';
import {
  CheckCheck,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  BellOff,
} from 'lucide-react';

export const StaffNotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialStaffNotificationsPageData);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Mark Single as Read / Unread
  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          const nextState = !notif.unread;
          return { ...notif, unread: nextState };
        }
        return notif;
      })
    );

    // If modal is open for this notification, update it too
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification((prev) => ({
        ...prev,
        unread: !prev.unread,
      }));
    }
  };

  // 2. Mark All as Read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false }))
    );
    showToast('All notifications marked as read.');
  };

  // 3. Refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Operational alerts and notifications refreshed.');
    }, 400);
  };

  // 4. Reset Filters
  const handleResetFilters = () => {
    setActiveFilter('ALL');
    setSearchQuery('');
  };

  // Category counts calculation
  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter((n) => n.unread).length,
      patient: notifications.filter((n) => n.category === 'Patient').length,
      queue: notifications.filter((n) => n.category === 'Queue').length,
      appointment: notifications.filter((n) => n.category === 'Appointment').length,
      lab: notifications.filter((n) => n.category === 'Lab').length,
      pharmacy: notifications.filter((n) => n.category === 'Pharmacy').length,
      doctor: notifications.filter((n) => n.category === 'Doctor').length,
    };
  }, [notifications]);

  // Filtered Notifications List
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // 1. Category / Unread filter
      if (activeFilter === 'UNREAD' && !notif.unread) {
        return false;
      }
      if (
        activeFilter !== 'ALL' &&
        activeFilter !== 'UNREAD' &&
        notif.category !== activeFilter
      ) {
        return false;
      }

      // 2. Search query (title, description, category, ID)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (notif.title || '').toLowerCase().includes(q);
        const descMatch = (notif.description || '').toLowerCase().includes(q);
        const catMatch = (notif.category || '').toLowerCase().includes(q);
        const idMatch = (notif.id || '').toLowerCase().includes(q);

        if (!titleMatch && !descMatch && !catMatch && !idMatch) {
          return false;
        }
      }

      return true;
    });
  }, [notifications, activeFilter, searchQuery]);

  const unreadCount = counts.unread;
  const isFiltered = activeFilter !== 'ALL' || searchQuery.trim() !== '';

  return (
    <StaffLayout
      title="Notifications"
      subtitle="Stay updated on patients, queues, appointments, and hospital operations."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-5xl mx-auto space-y-4">
        {/* ── Toast Alert ── */}
        {toast && (
          <div
            className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xs animate-in slide-in-from-top-2 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              {toast.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-xs font-semibold underline cursor-pointer hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Header & Actions ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#17221B] tracking-tight">
                Operational Feed
              </h1>
              {unreadCount > 0 ? (
                <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                  All caught up
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Real-time alerts for OPD check-ins, diagnostic reports, and counter dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs sm:text-sm font-semibold text-[#17221B] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#15803D] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#17221B] text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCheck className="h-4 w-4 text-[#15803D]" />
              <span>Mark All as Read</span>
            </button>
          </div>
        </div>

        {/* ── 1. Search & Category Filters ── */}
        <section aria-label="Notification Filters">
          <NotificationFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            counts={counts}
          />
        </section>

        {/* ── 2. Notification Master List ── */}
        <section aria-label="Notification Feed" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#17221B]">Notifications</h2>
              <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-md border border-[#15803D]/20">
                {filteredNotifications.length} items
              </span>
            </div>
          </div>

          {filteredNotifications.length > 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden divide-y divide-slate-100">
              {filteredNotifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  onToggleRead={handleToggleRead}
                  onOpenDetails={(item) => setSelectedNotification(item)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#64748B]">
                  <BellOff className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#17221B]">No notifications found</p>
                  <p className="text-xs text-[#64748B]">
                    {isFiltered
                      ? 'Try modifying your search or category filter.'
                      : "You're all caught up on hospital operational updates."}
                  </p>
                </div>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-semibold hover:bg-[#166534] transition-all cursor-pointer"
                  >
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── Detail Modal ── */}
      <NotificationDetailModal
        isOpen={Boolean(selectedNotification)}
        onClose={() => setSelectedNotification(null)}
        notification={selectedNotification}
        onToggleRead={handleToggleRead}
      />
    </StaffLayout>
  );
};

export default StaffNotificationsPage;
