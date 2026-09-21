import React from 'react';
import { X, HelpCircle, MessageCircle, FileText, ExternalLink } from 'lucide-react';

const HELP_TOPICS = [
  {
    icon: MessageCircle,
    title: 'Notification Settings',
    description: 'Manage your notification preferences and alert settings',
  },
  {
    icon: FileText,
    title: 'Understanding Notifications',
    description: 'Learn about different notification types and their meanings',
  },
  {
    icon: HelpCircle,
    title: 'Troubleshooting',
    description: 'Solutions for common notification-related issues',
  },
];

export const HelpSupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
              <HelpCircle className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[#17221B]">Help & Support</h2>
          </div>
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
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0]">
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Get help with notifications, alerts, and stay informed about your hospital visits.
            </p>
          </div>

          {/* Help Topics */}
          <div className="space-y-2">
            {HELP_TOPICS.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-start gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#15803D] hover:bg-[#F0FDF4]/30 transition-all text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] group-hover:bg-[#F0FDF4] group-hover:text-[#15803D] border border-[#E2E8F0] transition-colors flex-shrink-0 mt-0.5">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#17221B] mb-0.5">
                      {topic.title}
                    </p>
                    <p className="text-xs text-[#64748B]">{topic.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#94A3B8] group-hover:text-[#15803D] transition-colors flex-shrink-0 mt-1" />
                </button>
              );
            })}
          </div>

          {/* FAQ Box */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <p className="text-xs sm:text-sm font-bold text-[#17221B] mb-0.5">Still need help?</p>
            <p className="text-xs text-[#64748B] mb-3">
              Visit our comprehensive FAQ section or contact support
            </p>
            <button className="w-full px-4 py-2 bg-white text-[#15803D] border border-[#BBF7D0] hover:bg-[#F0FDF4] text-xs sm:text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]">
              View FAQ
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
