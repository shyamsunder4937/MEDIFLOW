import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  FlaskConical,
  Pill,
  Activity,
  Clock,
  UserCheck,
  ArrowRight,
  MoreVertical,
  Check,
  X,
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

export const NotificationItem = ({
  notification,
  onMarkRead,
  onDismiss,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);
  const IconComponent = ICON_MAP[notification.icon] || Activity;
  const categoryStyle = CATEGORY_STYLES[notification.category] || CATEGORY_STYLES['Hospital Journey'];

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
    onViewDetails(notification);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (!notification.read) {
      onMarkRead(notification.id);
    }
    if (notification.route) {
      navigate(notification.route);
    }
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMarkRead = (e) => {
    e.stopPropagation();
    onMarkRead(notification.id);
    setShowMenu(false);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    onDismiss(notification.id);
    setShowMenu(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-white rounded-xl border transition-all cursor-pointer group hover:shadow-xs p-4 sm:p-4.5 ${
        notification.read
          ? 'border-[#E2E8F0] hover:border-slate-300'
          : 'border-l-4 border-l-[#15803D] border-t-[#E2E8F0] border-r-[#E2E8F0] border-b-[#E2E8F0] bg-gradient-to-r from-[#F7FEF9]/60 to-white'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Category Icon */}
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
        >
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`text-sm ${
                  notification.read ? 'font-semibold text-[#17221B]' : 'font-bold text-[#17221B]'
                }`}
              >
                {notification.title}
              </h3>
              {!notification.read && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                  NEW
                </span>
              )}
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={handleMenuToggle}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94A3B8] hover:bg-slate-100 hover:text-[#64748B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="Notification options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <div className="absolute right-0 top-8 z-20 w-40 bg-white rounded-xl border border-[#E2E8F0] shadow-md py-1 animate-in zoom-in-95 duration-150">
                    {!notification.read && (
                      <button
                        onClick={handleMarkRead}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#17221B] hover:bg-slate-50 transition-colors text-left"
                      >
                        <Check className="h-3.5 w-3.5 text-[#15803D]" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={handleDismiss}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <X className="h-3.5 w-3.5" />
                      Dismiss
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#64748B] mb-2.5 leading-relaxed">
            {notification.description}
          </p>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                {notification.category}
              </span>
              <span className="text-xs text-[#94A3B8]">{notification.time}</span>
            </div>

            {notification.action && (
              <button
                onClick={handleActionClick}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] rounded px-2 py-1 bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0]"
              >
                {notification.action}
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
