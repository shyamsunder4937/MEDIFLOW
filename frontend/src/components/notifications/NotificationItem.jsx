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
  Queue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  Appointment: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
  Laboratory: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  Pharmacy: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  'Hospital Journey': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100' },
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
      className={`relative bg-white rounded-2xl border p-4 transition-all cursor-pointer group hover:shadow-md ${
        notification.read
          ? 'border-[#E2E8F0]'
          : 'border-[#0F766E]/20 bg-[#CCFBF1]/10 ring-1 ring-[#0F766E]/5'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${categoryStyle.bg} ${categoryStyle.text}`}
        >
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className={`text-sm ${
                notification.read ? 'font-medium text-[#0F172A]' : 'font-semibold text-[#0F172A]'
              }`}
            >
              {notification.title}
              {!notification.read && (
                <span className="inline-block ml-2 h-2 w-2 rounded-full bg-[#0F766E]" />
              )}
            </h3>
            {/* Menu */}
            <div className="relative">
              <button
                onClick={handleMenuToggle}
                className="flex h-6 w-6 items-center justify-center rounded-lg text-[#94A3B8] hover:bg-slate-100 hover:text-[#64748B] transition-colors opacity-0 group-hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
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
                  <div className="absolute right-0 top-8 z-20 w-40 bg-white rounded-xl border border-[#E2E8F0] shadow-lg py-1">
                    {!notification.read && (
                      <button
                        onClick={handleMarkRead}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#0F172A] hover:bg-slate-50 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={handleDismiss}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#DC2626] hover:bg-red-50 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      Dismiss
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-xs text-[#64748B] mb-2 leading-relaxed">
            {notification.description}
          </p>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                {notification.category}
              </span>
              <span className="text-[10px] text-[#94A3B8]">{notification.time}</span>
            </div>

            {notification.action && (
              <button
                onClick={handleActionClick}
                className="flex items-center gap-1 text-[10px] font-semibold text-[#0F766E] hover:text-[#115E59] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded px-2 py-1"
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
