import React, { useState } from 'react';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

export const LeaveQueueModal = ({ isOpen, onClose, onConfirmLeave, queueNumber = '#07' }) => {
  const [leftConfirmed, setLeftConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setLeftConfirmed(true);
    setTimeout(() => {
      setLeftConfirmed(false);
      onConfirmLeave?.();
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 pb-0 flex items-start justify-between">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {leftConfirmed ? (
            <div className="py-4 text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-[#0F172A]">Queue Forfeited</h4>
              <p className="text-xs text-[#64748B]">
                You have stepped out of token {queueNumber}. You may rejoin at the reception desk.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-base font-bold text-[#0F172A] mt-1">
                Leave Queue Confirmation
              </h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Are you sure you want to leave the queue? You will give up your current position <strong className="text-[#0F172A]">{queueNumber}</strong> and will need to request a new token from reception.
              </p>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800">
                <strong>Important:</strong> There are only 6 patients ahead of you. Estimated wait is 24 minutes.
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Stay in Queue
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 rounded-xl shadow-xs transition-colors"
                >
                  Confirm Leave
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
