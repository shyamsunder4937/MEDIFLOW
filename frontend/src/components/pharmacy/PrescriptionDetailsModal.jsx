import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Pill,
  User,
  Building2,
  Calendar,
  MapPin,
  Hash,
  CheckCircle2,
  Clock,
  Info,
  ArrowRight,
} from 'lucide-react';

export const PrescriptionDetailsModal = ({ isOpen, onClose, prescription }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !prescription) return null;

  const isReady = prescription.status === 'Ready for Pickup';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E2E8F0] my-auto z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
              <Pill className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17221B]">Prescription Details</h3>
              <p className="text-xs text-[#64748B]">Official prescription summary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 hover:text-[#17221B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Identity grid */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Prescription ID
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#E2E8F0] rounded text-[#17221B] shadow-xs">
                {prescription.id}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 text-xs pt-2 border-t border-[#E2E8F0]">
              {[
                { icon: User,      label: 'Patient',     value: 'Rahul Kumar' },
                { icon: Building2, label: 'Prescribed By', value: prescription.prescribedBy },
                { icon: Building2, label: 'Department',   value: prescription.department },
                { icon: Calendar,  label: 'Date',         value: prescription.date },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-[#94A3B8] flex-shrink-0" />
                  <span className="text-[#64748B] w-24 flex-shrink-0">{label}:</span>
                  <span className="font-semibold text-[#17221B]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Medication Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17221B] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              Medication
            </h4>

            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              {/* Medicine Header */}
              <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
                  <Pill className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#17221B]">{prescription.medicine}</p>
                  <p className="text-xs text-[#64748B]">{prescription.genericName} · {prescription.category}</p>
                </div>
              </div>

              {/* Medicine details grid */}
              <div className="grid grid-cols-3 divide-x divide-[#E2E8F0]">
                {[
                  { label: 'Dosage',    value: prescription.dosage    },
                  { label: 'Frequency', value: prescription.frequency  },
                  { label: 'Duration',  value: prescription.duration   },
                ].map(({ label, value }) => (
                  <div key={label} className="py-3 px-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">{label}</p>
                    <p className="text-xs font-bold text-[#17221B] mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {/* Frequency detail & quantity */}
              <div className="px-4 py-3 border-t border-[#E2E8F0] flex items-center justify-between gap-3 text-xs">
                <span className="text-[#64748B]">
                  🕐 {prescription.frequencyDetail}
                </span>
                <span className="font-semibold text-[#17221B]">
                  Qty: {prescription.quantity} {prescription.unit}
                </span>
              </div>

              {/* Instructions */}
              {prescription.instructions && (
                <div className="px-4 py-2.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                  <p className="text-xs text-[#475569] font-medium">
                    ℹ️ {prescription.instructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pharmacy Status */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17221B]">
              Pharmacy Status
            </h4>
            <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${
              isReady
                ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                : 'bg-amber-50/80 border-amber-200'
            }`}>
              {isReady
                ? <CheckCircle2 className="h-5 w-5 text-[#15803D] flex-shrink-0" />
                : <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />}
              <div>
                <p className={`text-sm font-bold ${isReady ? 'text-[#15803D]' : 'text-amber-800'}`}>
                  {prescription.status}
                </p>
                {isReady && (
                  <>
                    <div className="flex items-center gap-1.5 text-xs text-[#166534] mt-0.5">
                      <MapPin className="h-3 w-3 text-[#15803D]" />
                      {prescription.pharmacyLocation}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#166534] mt-0.5">
                      <Hash className="h-3 w-3 text-[#15803D]" />
                      {prescription.pharmacyCounter}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] leading-relaxed">
            <Info className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#17221B]">Demo Notice:</strong>{' '}
              This is fictional demonstration data only. Always follow your doctor's instructions for all medications.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#475569] bg-white border border-[#CBD5E1] hover:bg-slate-50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            Close
          </button>
          <Link
            to="/patient/journey"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <span>View Journey</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
