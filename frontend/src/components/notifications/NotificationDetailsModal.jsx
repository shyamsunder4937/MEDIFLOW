import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Calendar,
  Users,
  FlaskConical,
  Pill,
  Activity,
  Clock,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP = {
  Calendar,
  Users,
  FlaskConical,
  Pill,
  Activity,
  Clock,
  UserCheck,
};

const CATEGORY_STYLES = {
  Queue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200/70' },
  Appointment: { bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]' },
  Laboratory: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200/70' },
  Pharmacy: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200/70' },
  'Hospital Journey': { bg: 'bg-emerald-50', text: 'text-[#166534]', border: 'border-emerald-200/70' },
};

export const NotificationDetailsModal = ({ notification, isOpen, onClose, onMarkRead }) => {
  const navigate = useNavigate();

  if (!isOpen || !notification) return null;

  const IconComponent = ICON_MAP[notification.icon] || Activity;
  const categoryStyle = CATEGORY_STYLES[notification.category] || CATEGORY_STYLES['Hospital Journey'];

  const handleOpen = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
    if (notification.route) {
      navigate(notification.route);
    }
    onClose();
  };

  const handleMarkAsRead = () => {
    onMarkRead(notification.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E2E8F0] z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <h2 className="text-base font-bold text-[#17221B]">Notification Details</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Icon and Title */}
          <div className="flex items-start gap-3">
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
            >
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#17221B] mb-1">
                {notification.title}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                {notification.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0]">
            <p className="text-xs sm:text-sm text-[#17221B] leading-relaxed">
              {notification.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">Time</p>
              <p className="text-xs font-bold text-[#17221B]">{notification.time}</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">Status</p>
              <p className="text-xs font-bold text-[#17221B]">
                {notification.read ? 'Read' : 'Unread'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          {!notification.read && (
            <button
              onClick={handleMarkAsRead}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
              Mark as Read
            </button>
          )}
          {notification.route && (
            <button
              onClick={handleOpen}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <span>Open</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          {!notification.route && notification.read && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
