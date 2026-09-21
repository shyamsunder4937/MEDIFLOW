import React, { useState } from 'react';
import { Phone, MapPin, X, CheckCircle2, User } from 'lucide-react';

export const ContactReceptionModal = ({ isOpen, onClose, hospitalInfo }) => {
  const [messageSent, setMessageSent] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('brief_away');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* ── Header ── */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center text-[#15803D]">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17221B]">
                Contact OPD Reception
              </h3>
              <p className="text-xs text-[#64748B]">
                Direct assistance for Token #07
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#17221B] p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Content Body ── */}
        <div className="p-5 space-y-4">
          {messageSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-[#17221B]">
                Notice Sent to Desk B-2
              </h4>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                Executive <strong className="text-[#17221B]">{hospitalInfo?.receptionistName || 'Receptionist'}</strong> has received your notice. Your place in queue is held.
              </p>
            </div>
          ) : (
            <>
              {/* Desk Information Card */}
              <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#15803D]" />
                    Location
                  </span>
                  <span className="font-bold text-[#17221B]">
                    {hospitalInfo?.receptionDesk || 'Desk B-2, 2nd Floor'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-[#15803D]" />
                    Desk Officer
                  </span>
                  <span className="font-semibold text-[#17221B]">
                    {hospitalInfo?.receptionistName || 'Priya Sharma'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                    <Phone className="h-3.5 w-3.5 text-[#15803D]" />
                    Direct Phone
                  </span>
                  <a
                    href={`tel:${hospitalInfo?.receptionPhone || '08041238900'}`}
                    className="font-bold text-[#15803D] hover:underline"
                  >
                    {hospitalInfo?.receptionPhone || '+91 (080) 4123-8900'}
                  </a>
                </div>
              </div>

              {/* Fast Alert Form */}
              <form onSubmit={handleSendMessage} className="space-y-3 pt-1">
                <label className="text-xs font-bold text-[#17221B] block">
                  Send Quick Notice to Reception:
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'brief_away'}
                      onChange={() => setSelectedTopic('brief_away')}
                      className="accent-[#15803D]"
                    />
                    <span className="text-[#17221B]">Stepping out for 5 minutes (washroom / water)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'wheelchair'}
                      onChange={() => setSelectedTopic('wheelchair')}
                      className="accent-[#15803D]"
                    />
                    <span className="text-[#17221B]">Need wheelchair / physical mobility assistance</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="topic"
                      checked={selectedTopic === 'directions'}
                      onChange={() => setSelectedTopic('directions')}
                      className="accent-[#15803D]"
                    />
                    <span className="text-[#17221B]">Help locating Room 204 in OPD Block B</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#17221B] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg shadow-xs transition-colors cursor-pointer"
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
