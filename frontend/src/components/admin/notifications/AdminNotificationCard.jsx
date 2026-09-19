import React from 'react';
import {
  Eye,
  Check,
  Mail,
  Trash2,
  Clock,
  User,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import { AdminNotificationCategoryBadge } from './AdminNotificationCategoryBadge';
import { AdminNotificationPriorityBadge } from './AdminNotificationPriorityBadge';

export const AdminNotificationCard = ({
  notification,
  onViewDetails,
  onToggleReadStatus,
  onDelete,
}) => {
  const {
    id,
    title,
    message,
    category,
    priority,
    time,
    dateGroup,
    unread,
    patient,
    patientId,
    doctor,
    doctorId,
  } = notification;

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-200 p-4 sm:p-5 ${
        unread
          ? 'bg-teal-50/40 hover:bg-teal-50/70 border-teal-200/80 shadow-xs border-l-4 border-l-[#0F766E]'
          : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
        {/* ── Left / Content Area ── */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Unread indicator dot */}
          <div className="pt-1 flex-shrink-0">
            {unread ? (
              <span
                className="block h-2.5 w-2.5 rounded-full bg-[#0F766E] ring-4 ring-[#CCFBF1] shadow-xs"
                title="Unread notification"
              />
            ) : (
              <span
                className="block h-2.5 w-2.5 rounded-full bg-slate-300"
                title="Read notification"
              />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Top metadata row: Category, Priority, Notification ID, Time */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <AdminNotificationCategoryBadge category={category} />
              <AdminNotificationPriorityBadge priority={priority} />

              <span className="font-mono text-[11px] font-semibold text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                {id}
              </span>

              <span className="text-slate-400">•</span>

              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Clock className="h-3 w-3 text-slate-400" />
                {time}
                {dateGroup && dateGroup !== 'Today' && ` (${dateGroup})`}
              </span>
            </div>

            {/* Notification Title */}
            <h4
              onClick={() => onViewDetails(notification)}
              className={`text-sm sm:text-base cursor-pointer hover:text-[#0F766E] transition-colors leading-snug ${
                unread
                  ? 'font-bold text-slate-900'
                  : 'font-semibold text-slate-700'
              }`}
            >
              {title}
            </h4>

            {/* Notification Message */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
              {message}
            </p>

            {/* Optional Entity Association Chip (Patient / Doctor) */}
            {(patient || doctor) && (
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                {patient && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 text-[11px] font-medium border border-slate-200">
                    <User className="h-3 w-3 text-teal-600" />
                    <span className="text-slate-500">Patient:</span> {patient}{' '}
                    {patientId && (
                      <span className="text-slate-400">({patientId})</span>
                    )}
                  </span>
                )}
                {doctor && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 text-[11px] font-medium border border-slate-200">
                    <Stethoscope className="h-3 w-3 text-emerald-600" />
                    <span className="text-slate-500">Doctor:</span> {doctor}{' '}
                    {doctorId && (
                      <span className="text-slate-400">({doctorId})</span>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Right / Actions Area ── */}
        <div className="flex sm:flex-col lg:flex-row items-center gap-1.5 sm:gap-2 self-end sm:self-start flex-shrink-0 pt-2 sm:pt-0">
          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(notification)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="View full notification details"
          >
            <Eye className="h-3.5 w-3.5 text-slate-500" />
            <span>View</span>
          </button>

          {/* Toggle Read/Unread Button */}
          <button
            onClick={() => onToggleReadStatus(id)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer shadow-2xs ${
              unread
                ? 'text-[#0F766E] bg-teal-50 hover:bg-teal-100 border-teal-200'
                : 'text-slate-600 bg-white hover:bg-slate-100 border-slate-200'
            }`}
            title={unread ? 'Mark as Read' : 'Mark as Unread'}
          >
            {unread ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#0F766E]" />
                <span className="hidden xs:inline">Mark Read</span>
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden xs:inline">Mark Unread</span>
              </>
            )}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center justify-center p-1.5 text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Delete notification"
            aria-label="Delete notification"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
