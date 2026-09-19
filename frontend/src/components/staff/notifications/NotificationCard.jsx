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
        return <UserCheck className="h-4.5 w-4.5 text-blue-600" />;
      case 'Queue':
        return <ListOrdered className="h-4.5 w-4.5 text-amber-600" />;
      case 'Appointment':
        return <Calendar className="h-4.5 w-4.5 text-emerald-600" />;
      case 'Lab':
        return <FlaskConical className="h-4.5 w-4.5 text-purple-600" />;
      case 'Pharmacy':
        return <Pill className="h-4.5 w-4.5 text-[#0F766E]" />;
      case 'Doctor':
        return <Stethoscope className="h-4.5 w-4.5 text-sky-600" />;
      default:
        return <Bell className="h-4.5 w-4.5 text-slate-600" />;
    }
  };

  const getCategoryIconBg = (category) => {
    switch (category) {
      case 'Patient':
        return 'bg-blue-50 border-blue-200';
      case 'Queue':
        return 'bg-amber-50 border-amber-200';
      case 'Appointment':
        return 'bg-emerald-50 border-emerald-200';
      case 'Lab':
        return 'bg-purple-50 border-purple-200';
      case 'Pharmacy':
        return 'bg-[#CCFBF1] border-[#0F766E]/20';
      case 'Doctor':
        return 'bg-sky-50 border-sky-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
        notification.unread
          ? 'bg-teal-50/30 border-[#0F766E]/30 shadow-xs hover:border-[#0F766E]/50'
          : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-2xs'
      }`}
    >
      {/* ── Left Content ── */}
      <div
        onClick={() => onOpenDetails(notification)}
        className="flex items-start gap-3.5 flex-1 cursor-pointer min-w-0"
      >
        <div
          className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border flex-shrink-0 mt-0.5 sm:mt-0 ${getCategoryIconBg(
            notification.category
          )}`}
        >
          {getCategoryIcon(notification.category)}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-xs sm:text-sm tracking-tight truncate ${
                notification.unread ? 'font-extrabold text-[#0F172A]' : 'font-semibold text-[#334155]'
              }`}
            >
              {notification.title}
            </h3>

            {notification.unread && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E] animate-pulse" />
                <span>New</span>
              </span>
            )}
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {notification.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#94A3B8]">
            <NotificationCategoryBadge category={notification.category} />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {notification.time}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Actions ── */}
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0">
        {/* Toggle Read/Unread */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleRead(notification.id);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            notification.unread
              ? 'bg-slate-100 hover:bg-slate-200 text-[#0F172A]'
              : 'bg-white hover:bg-slate-50 text-[#64748B] border border-slate-200'
          }`}
          title={notification.unread ? 'Mark as read' : 'Mark as unread'}
        >
          {notification.unread ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>Mark as Read</span>
            </>
          ) : (
            <>
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>Mark as Unread</span>
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
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{notification.actionLabel || 'View'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
