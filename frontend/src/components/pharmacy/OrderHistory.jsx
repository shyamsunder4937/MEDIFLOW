import React from 'react';
import {
  ShoppingBag,
  ChevronRight,
} from 'lucide-react';

const STATUS_CONFIG = {
  'Ready for Pickup': {
    pill: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    dot: 'bg-[#15803D] animate-pulse',
  },
  Completed: {
    pill: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
    dot: 'bg-[#475569]',
  },
};

export const OrderHistory = ({ orders, onViewOrder }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-5">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Completed'];
              return (
                <tr key={order.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <span className="font-mono font-bold text-[#17221B] group-hover:text-[#15803D] transition-colors">
                        {order.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B]">{order.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#17221B]">{order.itemsLabel}</td>
                  <td className="py-3.5 px-4 text-[#64748B] text-xs max-w-[200px] truncate">{order.detail}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.pill}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#15803D] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                    >
                      View
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {orders.map((order) => {
          const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Completed'];
          return (
            <div key={order.id} className="p-4 space-y-3 hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                    <ShoppingBag className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#17221B] font-mono">{order.id}</p>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] mt-0.5">
                      <span>{order.date}</span>
                      <span>·</span>
                      <span className="font-semibold text-[#17221B]">{order.itemsLabel}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.pill} flex-shrink-0`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-[#64748B] truncate px-1">{order.detail}</p>

              <button
                onClick={() => onViewOrder(order)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#15803D] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] transition-colors"
              >
                View Order
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
