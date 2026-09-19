import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Clock,
  CheckCircle2,
  Mail,
  User,
  Stethoscope,
  Building2,
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink,
} from 'lucide-react';
import { AdminNotificationCategoryBadge } from './AdminNotificationCategoryBadge';
import { AdminNotificationPriorityBadge } from './AdminNotificationPriorityBadge';

export const AdminNotificationDetailsModal = ({
  notification,
  isOpen,
  onClose,
  onToggleReadStatus,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !notification) return null;

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
    module,
    actionRoute,
    actionLabel,
  } = notification;

  const handleNavigate = (route) => {
    if (route) {
      onClose();
      navigate(route);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-slate-600 px-2 py-1 bg-white border border-slate-200 rounded-md">
              {id}
            </span>
            <AdminNotificationCategoryBadge category={category} />
            <AdminNotificationPriorityBadge priority={priority} />
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Title & Timestamp */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {time} {dateGroup && `• ${dateGroup}`}
              </span>
              <span>•</span>
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  unread ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {unread ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Unread Alert
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Read
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Full Message Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
            {message}
          </div>

          {/* Related Information Section */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-[#0F766E]" />
              Related Information
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {patient && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">
                    Related Patient
                  </span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <User className="h-3 w-3 text-teal-600 flex-shrink-0" />
                    {patient}
                  </span>
                  {patientId && (
                    <span className="text-[11px] font-mono text-slate-500">
                      ID: {patientId}
                    </span>
                  )}
                </div>
              )}

              {doctor && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block font-medium">
                    Related Doctor
                  </span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Stethoscope className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                    {doctor}
                  </span>
                  {doctorId && (
                    <span className="text-[11px] font-mono text-slate-500">
                      ID: {doctorId}
                    </span>
                  )}
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">
                  Related Module
                </span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Building2 className="h-3 w-3 text-blue-600 flex-shrink-0" />
                  {module || category} Module
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">
                  Notification Type
                </span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  {priority} Priority
                </span>
              </div>
            </div>

            {/* Direct Navigation Button if available */}
            {actionRoute && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNavigate(actionRoute)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 rounded-lg text-xs font-bold transition-colors cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {actionLabel || `Open ${category} Module`}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Mock Notice Tag */}
          <div className="px-3 py-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-amber-200/80 font-bold text-[10px] uppercase text-amber-900">
              Mock Notification
            </span>
            <span>Phase 1 static simulation — No real hospital telemetry.</span>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleReadStatus(id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              unread
                ? 'text-[#0F766E] bg-white hover:bg-teal-50 border-teal-200'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300'
            }`}
          >
            {unread ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
                Mark as Read
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 text-slate-500" />
                Mark as Unread
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
