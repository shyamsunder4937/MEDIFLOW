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
  Queue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  Appointment: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
  Laboratory: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  Pharmacy: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  'Hospital Journey': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100' },
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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-200 px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#0F172A]">Notification Details</h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
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
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${categoryStyle.bg} ${categoryStyle.text}`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-[#0F172A] mb-1">
                  {notification.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                >
                  {notification.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              <p className="text-sm text-[#0F172A] leading-relaxed">
                {notification.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 border border-[#E2E8F0]">
                <p className="text-[10px] font-medium text-[#64748B] mb-1">Time</p>
                <p className="text-xs font-semibold text-[#0F172A]">{notification.time}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-[#E2E8F0]">
                <p className="text-[10px] font-medium text-[#64748B] mb-1">Status</p>
                <p className="text-xs font-semibold text-[#0F172A]">
                  {notification.read ? 'Read' : 'Unread'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
            {!notification.read && (
              <button
                onClick={handleMarkAsRead}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark as Read
              </button>
            )}
            {notification.route && (
              <button
                onClick={handleOpen}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                Open
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {!notification.route && notification.read && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
