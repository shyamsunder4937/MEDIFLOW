import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCategoryBadge } from './NotificationCategoryBadge';
import {
  Clock,
  Check,
  RotateCcw,
  ArrowRight,
  UserCheck,
  ListOrdered,
  Calendar,
  FlaskConical,
  Pill,
  Stethoscope,
  Bell,
} from 'lucide-react';

export const NotificationCard = ({
  notification,
  onToggleRead,
  onOpenDetails,
}) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Patient':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'Queue':
        return <ListOrdered className="h-4 w-4 text-amber-600" />;
      case 'Appointment':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'Lab':
        return <FlaskConical className="h-4 w-4 text-sky-600" />;
      case 'Pharmacy':
        return <Pill className="h-4 w-4 text-[#15803D]" />;
      case 'Doctor':
        return <Stethoscope className="h-4 w-4 text-emerald-600" />;
      default:
        return <Bell className="h-4 w-4 text-slate-600" />;
    }
  };

  const getCategoryIconBg = (category) => {
    switch (category) {
      case 'Patient':
        return 'bg-blue-50 border-blue-200';
      case 'Queue':
        return 'bg-amber-50 border-amber-200';
      case 'Appointment':
        return 'bg-purple-50 border-purple-200';
      case 'Lab':
        return 'bg-sky-50 border-sky-200';
      case 'Pharmacy':
        return 'bg-[#F0FDF4] border-[#15803D]/20';
      case 'Doctor':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div
      className={`p-3.5 sm:p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer ${
        notification.unread
          ? 'bg-[#F7FEF9] hover:bg-[#F0FDF4]/70'
          : 'bg-white hover:bg-[#F8FAFC]'
      }`}
      onClick={() => onOpenDetails(notification)}
    >
      {/* ── Left Content ── */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {/* Unread Status Dot or Read Indicator */}
        <div className="pt-2 flex-shrink-0">
          {notification.unread ? (
            <span className="block h-2 w-2 rounded-full bg-[#15803D]" title="Unread notification" />
          ) : (
            <span className="block h-2 w-2 rounded-full bg-slate-200" title="Read" />
          )}
        </div>

        {/* Category Icon */}
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg border flex-shrink-0 mt-0.5 sm:mt-0 ${getCategoryIconBg(
            notification.category
          )}`}
        >
          {getCategoryIcon(notification.category)}
        </div>

        {/* Message Content */}
        <div className="space-y-0.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-xs sm:text-sm tracking-tight truncate ${
                notification.unread ? 'font-bold text-[#17221B]' : 'font-medium text-[#334155]'
              }`}
            >
              {notification.title}
            </h3>

            {notification.unread && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.2 rounded-md border border-[#15803D]/20">
                New
              </span>
            )}
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {notification.description}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-[11px] text-[#64748B]">
            <NotificationCategoryBadge category={notification.category} />
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {notification.time}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Actions ── */}
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0 pl-5 sm:pl-0">
        {/* Toggle Read/Unread */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleRead(notification.id);
          }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            notification.unread
              ? 'bg-slate-100 hover:bg-slate-200 text-[#17221B]'
              : 'bg-white hover:bg-slate-50 text-[#64748B] border border-[#E2E8F0]'
          }`}
          title={notification.unread ? 'Mark as read' : 'Mark as unread'}
        >
          {notification.unread ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Mark Read</span>
            </>
          ) : (
            <>
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Mark Unread</span>
            </>
          )}
        </button>

        {/* Contextual Jump Action */}
        {notification.actionLink && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(notification.actionLink);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{notification.actionLabel || 'View'}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
