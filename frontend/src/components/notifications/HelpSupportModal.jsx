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
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F766E] text-white">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">Help & Support</h2>
            </div>
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
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              <p className="text-sm text-[#0F172A] leading-relaxed">
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
                    className="w-full flex items-start gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#0F766E] hover:bg-[#CCFBF1]/10 transition-all text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-[#64748B] group-hover:bg-[#CCFBF1] group-hover:text-[#0F766E] transition-colors flex-shrink-0">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] mb-0.5">
                        {topic.title}
                      </p>
                      <p className="text-xs text-[#64748B]">{topic.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#94A3B8] group-hover:text-[#0F766E] transition-colors flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-xl p-4 text-white">
              <p className="text-sm font-semibold mb-1">Still need help?</p>
              <p className="text-xs text-white/90 mb-3">
                Visit our comprehensive FAQ section or contact support
              </p>
              <button className="w-full px-4 py-2 bg-white text-[#0F766E] text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                View FAQ
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
