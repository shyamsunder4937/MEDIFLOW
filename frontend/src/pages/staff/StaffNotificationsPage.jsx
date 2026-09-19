import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffNotificationsPageData } from '../../data/staffMockData';
import { NotificationFilterBar } from '../../components/staff/notifications/NotificationFilterBar';
import { NotificationCard } from '../../components/staff/notifications/NotificationCard';
import { NotificationDetailModal } from '../../components/staff/notifications/NotificationDetailModal';
import {
  Bell,
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
      subtitle="Stay updated on patient flow, appointments, queue activity, and hospital operations."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-5xl mx-auto space-y-6">
        {/* ── Toast Alert ── */}
        {toast && (
          <div
            className={`flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-md animate-in slide-in-from-top-2 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-teal-50 border-[#0F766E]/20 text-[#0F766E]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              {toast.type === 'error' ? (
                <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-[#0F766E] flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-xs font-bold underline cursor-pointer hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Header Bar & Action ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner flex-shrink-0">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                  Hospital Operational Feed
                </h1>
                {unreadCount > 0 ? (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 animate-pulse">
                    {unreadCount} unread
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    All caught up
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Real-time alerts for OPD check-ins, diagnostic reports, and counter dispatches.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-[#0F172A] shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-[#0F766E] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Mark All as Read</span>
            </button>
          </div>
        </div>

        {/* ── 1. Search & Filter Bar ── */}
        <section aria-label="Notification Filters">
          <NotificationFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            counts={counts}
          />
        </section>

        {/* ── 2. Notification List ── */}
        <section aria-label="Notification Feed" className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#0F172A]">Notifications</h2>
              <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
                {filteredNotifications.length} items
              </span>
            </div>
          </div>

          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
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
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-xs">
              <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#94A3B8]">
                  <BellOff className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#0F172A]">No notifications found</p>
                  <p className="text-xs text-[#64748B]">
                    {isFiltered
                      ? 'Try changing your search or filter criteria.'
                      : "You're all caught up on hospital operations."}
                  </p>
                </div>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
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
