import React, { useState } from 'react';
import { Phone, MapPin, User, X, CheckCircle2, FileText, Info, HelpCircle } from 'lucide-react';

export const JourneyReceptionModal = ({ isOpen, onClose, receptionInfo }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <Phone className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                OPD Reception Desk
              </h3>
              <p className="text-xs text-[#64748B]">
                Assistance for Rahul Kumar (MF-2026-00127)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {submitted ? (
            <div className="py-6 text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-[#0F172A]">Request Logged</h4>
              <p className="text-xs text-[#64748B]">
                Desk Officer {receptionInfo?.officer || 'Priya Sharma'} has been alerted.
              </p>
            </div>
          ) : (
            <>
              {/* Desk Information Card */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                    Desk Location
                  </span>
                  <span className="font-bold text-[#0F172A]">
                    {receptionInfo?.desk || 'OPD Desk B-2, 2nd Floor'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-[#0F766E]" />
                    Coordinator
                  </span>
                  <span className="font-semibold text-[#0F172A]">
                    {receptionInfo?.officer || 'Priya Sharma'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                    Phone Extension
                  </span>
                  <a
                    href={`tel:${receptionInfo?.phone || '08041238900'}`}
                    className="font-bold text-[#0F766E] hover:underline"
                  >
                    {receptionInfo?.phone || '+91 (080) 4123-8900'} ({receptionInfo?.extension || 'Ext. 2041'})
                  </a>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <label className="text-xs font-bold text-[#0F172A] block">
                  Select Assistance Type:
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer">
                    <input type="radio" name="req" defaultChecked className="accent-[#0F766E]" />
                    <span>Need wheelchair escort to Room 204</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer">
                    <input type="radio" name="req" className="accent-[#0F766E]" />
                    <span>Inquire about doctor delay / estimated consultation start</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer">
                    <input type="radio" name="req" className="accent-[#0F766E]" />
                    <span>Verify insurance pre-authorization status</span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl shadow-xs"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const JourneyHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Patient Journey Guide
              </h3>
              <p className="text-xs text-[#64748B]">
                Hospital visit workflow FAQs & instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* FAQs */}
        <div className="p-5 space-y-3.5 text-xs text-[#334155] max-h-[60vh] overflow-y-auto">
          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
            <h4 className="font-bold text-[#0F172A] mb-1">
              How does the digital consultation queue work?
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              When you check in at reception, you receive a token number (#07). The screen displays real-time patients ahead and estimated wait time. You will receive an SMS and audio callout when token #06 is exiting.
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
            <h4 className="font-bold text-[#0F172A] mb-1">
              What happens if diagnostic tests are ordered?
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              If Dr. Arun Kumar orders blood tests or x-rays, Stage 5 (Laboratory) will automatically activate. You will be directed to the 1st Floor Diagnostic Wing. Results usually appear within 45 minutes in your portal.
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
            <h4 className="font-bold text-[#0F172A] mb-1">
              Where do I collect prescribed medicines?
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              Stage 7 (Pharmacy) tracks prescription preparation. When ready, present your digital visit ID (MF-2026-00127) at Pharmacy Counter A on the Ground Floor.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl shadow-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
