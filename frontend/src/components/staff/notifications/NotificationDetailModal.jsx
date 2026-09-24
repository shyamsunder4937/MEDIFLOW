import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCategoryBadge } from './NotificationCategoryBadge';
import {
  X,
  Bell,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const NotificationDetailModal = ({
  isOpen,
  onClose,
  notification,
  onToggleRead,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !notification) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#17221B]">
                  Operational Alert
                </h2>
                <span className="font-mono text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
                  {notification.id}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Hospital staff operational notification
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17221B] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2">
              <NotificationCategoryBadge category={notification.category} />
              <span className="text-xs text-[#64748B] flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {notification.time}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#17221B] mt-1">
              {notification.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#334155] mt-2 leading-relaxed bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
              {notification.description}
            </p>
          </div>

          {/* Status info bar */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <span className="text-[#64748B]">Read Status:</span>
            <div className="flex items-center gap-1.5 font-semibold">
              {notification.unread ? (
                <span className="text-amber-800 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                  Unread
                </span>
              ) : (
                <span className="text-[#15803D] flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                  Read
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="flex items-center justify-between p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={() => {
              onToggleRead(notification.id);
            }}
            className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17221B] transition-all cursor-pointer"
          >
            {notification.unread ? 'Mark as Read' : 'Mark as Unread'}
          </button>

          <div className="flex items-center gap-2">
            {notification.actionLink && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(notification.actionLink);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>{notification.actionLabel || 'Go to Module'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
