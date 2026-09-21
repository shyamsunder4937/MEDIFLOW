import React, { useEffect } from 'react';
import { X, ShoppingBag, CheckCircle2, Package } from 'lucide-react';

const STATUS_CONFIG = {
  'Ready for Pickup': { badge: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]', icon: CheckCircle2 },
  Completed:          { badge: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',     icon: CheckCircle2 },
};

export const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Completed'];
  const StatusIcon = cfg.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E2E8F0] z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17221B]">Order Details</h3>
              <p className="text-xs font-mono text-[#64748B]">{order.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 transition-colors focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Status */}
          <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${cfg.badge}`}>
            <StatusIcon className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-bold">{order.status}</p>
          </div>

          {/* Order meta */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Order ID',  value: order.id },
              { label: 'Date',      value: order.date },
              { label: 'Items',     value: order.itemsLabel },
              { label: 'Patient',   value: 'Rahul Kumar' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">{label}</p>
                <p className="font-bold text-[#17221B] mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Medicine detail */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-3.5 w-3.5 text-[#15803D]" />
              <span className="text-xs font-bold text-[#17221B]">Medicines Dispensed</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">{order.detail}</p>
          </div>

          <p className="text-xs text-[#64748B] italic">
            Detailed prescription breakdown is visible in Active Prescriptions for current-visit orders.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] transition-all shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
