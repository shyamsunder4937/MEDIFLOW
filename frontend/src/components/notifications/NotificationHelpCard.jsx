import React from 'react';
import { HelpCircle, Phone } from 'lucide-react';

export const NotificationHelpCard = ({ onContactReception, onHelpSupport }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#17221B]">Need assistance?</h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-0.5">
            If you have questions about your hospital visit, appointments, or notifications, contact the hospital reception desk.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <button
          onClick={onContactReception}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <Phone className="h-4 w-4" />
          Contact Reception
        </button>
        <button
          onClick={onHelpSupport}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#475569] border border-[#CBD5E1] text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <HelpCircle className="h-4 w-4 text-[#64748B]" />
          Help & Support
        </button>
      </div>
    </div>
  );
};
