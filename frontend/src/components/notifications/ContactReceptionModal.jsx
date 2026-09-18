import React from 'react';
import { X, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactReceptionModal = ({ isOpen, onClose }) => {
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
            <h2 className="text-lg font-bold text-[#0F172A]">Contact Reception</h2>
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
            <div className="bg-[#CCFBF1] rounded-xl p-4 border border-[#0F766E]/20">
              <p className="text-sm text-[#0F172A] leading-relaxed">
                Our reception desk is available to assist you with any queries about your visit,
                appointments, or hospital services.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] mb-0.5">Phone</p>
                  <p className="text-sm font-semibold text-[#0F172A]">+91 80 4567 8900</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Reception Desk</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-[#0F172A]">reception@mediflow.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] mb-0.5">Working Hours</p>
                  <p className="text-sm font-semibold text-[#0F172A]">24/7 Available</p>
                  <p className="text-xs text-[#64748B] mt-0.5">Emergency services always open</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#64748B] mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-[#0F172A]">Ground Floor, Main Block</p>
                  <p className="text-xs text-[#64748B] mt-0.5">MediFlow Medical Center</p>
                </div>
              </div>
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
