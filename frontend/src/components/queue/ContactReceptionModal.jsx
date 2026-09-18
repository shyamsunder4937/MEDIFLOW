import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, X, CheckCircle2, User, Clock, AlertCircle } from 'lucide-react';

export const ContactReceptionModal = ({ isOpen, onClose, hospitalInfo }) => {
  const [messageSent, setMessageSent] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('brief_away');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <Phone className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Contact OPD Reception
              </h3>
              <p className="text-xs text-[#64748B]">
                Direct assistance for Queue #07
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

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {messageSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h4 className="text-base font-bold text-[#0F172A]">
                Notice Sent to Desk B-2
              </h4>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Executive <strong>{hospitalInfo?.receptionistName || 'Receptionist'}</strong> has noted your request. Your spot in queue will be held.
              </p>
            </div>
          ) : (
            <>
              {/* Desk Information Card */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                    Location
                  </span>
                  <span className="font-bold text-[#0F172A]">
                    {hospitalInfo?.receptionDesk || 'Desk B-2, 2nd Floor'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-[#0F766E]" />
                    Desk Officer
                  </span>
                  <span className="font-semibold text-[#0F172A]">
                    {hospitalInfo?.receptionistName || 'Priya Sharma'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                    Direct Phone
                  </span>
                  <a
                    href={`tel:${hospitalInfo?.receptionPhone || '08041238900'}`}
                    className="font-bold text-[#0F766E] hover:underline"
                  >
                    {hospitalInfo?.receptionPhone || '+91 (080) 4123-8900'}
                  </a>
                </div>
              </div>

              {/* Fast Alert Form */}
              <form onSubmit={handleSendMessage} className="space-y-3 pt-1">
                <label className="text-xs font-bold text-[#0F172A] block">
                  Send a Quick Status Notice to Desk:
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'brief_away'}
                      onChange={() => setSelectedTopic('brief_away')}
                      className="accent-[#0F766E]"
                    />
                    <span>Stepping out for 5 minutes (washroom / water)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'wheelchair'}
                      onChange={() => setSelectedTopic('wheelchair')}
                      className="accent-[#0F766E]"
                    />
                    <span>Need wheelchair / physical mobility assistance</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'directions'}
                      onChange={() => setSelectedTopic('directions')}
                      className="accent-[#0F766E]"
                    />
                    <span>Help locating Room 204 in OPD Block B</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl shadow-xs transition-colors"
                  >
                    Notify Reception
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
