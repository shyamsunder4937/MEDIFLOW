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
        className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E2E8F0] bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0F172A]">
                  Operational Alert
                </h2>
                <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                  {notification.id}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Hospital staff notification broadcast
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2">
              <NotificationCategoryBadge category={notification.category} />
              <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {notification.time}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mt-1">
              {notification.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
              {notification.description}
            </p>
          </div>

          {/* Status info bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <span className="text-[#64748B]">Read Status:</span>
            <div className="flex items-center gap-1.5 font-bold">
              {notification.unread ? (
                <span className="text-amber-700 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                  Unread
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Read
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-t border-[#E2E8F0] bg-slate-50/50">
          <button
            type="button"
            onClick={() => {
              onToggleRead(notification.id);
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-[#0F172A] transition-all cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{notification.actionLabel || 'Navigate to Module'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
