import React from 'react';
import { HelpCircle, Phone } from 'lucide-react';

export const NotificationHelpCard = ({ onContactReception, onHelpSupport }) => {
  return (
    <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold mb-1">Need assistance?</h3>
          <p className="text-sm text-white/90 leading-relaxed">
            If you have questions about your hospital visit, contact the hospital reception desk.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onContactReception}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#0F766E] text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Phone className="h-4 w-4" />
          Contact Reception
        </button>
        <button
          onClick={onHelpSupport}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <HelpCircle className="h-4 w-4" />
          Help & Support
        </button>
      </div>
    </div>
  );
};
