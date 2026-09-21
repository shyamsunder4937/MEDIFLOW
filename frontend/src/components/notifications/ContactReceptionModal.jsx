import React from 'react';
import { X, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactReceptionModal = ({ isOpen, onClose }) => {
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
          <h2 className="text-base font-bold text-[#17221B]">Contact Reception</h2>
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
          <div className="bg-[#F0FDF4] rounded-xl p-3.5 border border-[#BBF7D0]">
            <p className="text-xs sm:text-sm text-[#166534] leading-relaxed font-medium">
              Our reception desk is available to assist you with any queries about your visit,
              appointments, or hospital services.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Phone</p>
                <p className="text-xs sm:text-sm font-bold text-[#17221B]">+91 80 4567 8900</p>
                <p className="text-xs text-[#64748B] mt-0.5">Reception Desk · Counter 01</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Email</p>
                <p className="text-xs sm:text-sm font-bold text-[#17221B]">reception@mediflow.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Working Hours</p>
                <p className="text-xs sm:text-sm font-bold text-[#17221B]">24/7 Available</p>
                <p className="text-xs text-[#64748B] mt-0.5">Emergency and helpdesk always open</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Location</p>
                <p className="text-xs sm:text-sm font-bold text-[#17221B]">Ground Floor, Main Block</p>
                <p className="text-xs text-[#64748B] mt-0.5">MediFlow Medical Center</p>
              </div>
            </div>
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
