import React from 'react';
import { MapPin, Clock, PhoneCall, CheckCircle2 } from 'lucide-react';

export const PickupInformationCard = ({ info, onContactPharmacy }) => {
  const pickup = info || {
    location: 'MediFlow Hospital Pharmacy',
    floor: 'Ground Floor, OPD Block A',
    counter: 'Counter 02',
    hours: '8:00 AM – 8:00 PM',
    status: 'Open',
  };

  const isOpen = pickup.status === 'Open';

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0] mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17221B] tracking-tight">Pickup Counter</h3>
            <p className="text-xs text-[#64748B]">Pharmacy location & timings</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
          isOpen
            ? 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/20'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-[#15803D] animate-pulse' : 'bg-red-600'}`} />
          {pickup.status}
        </span>
      </div>

      {/* ── Details ── */}
      <div className="space-y-2.5 flex-1">
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <MapPin className="h-4 w-4 text-[#15803D] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#17221B]">{pickup.location}</p>
            <p className="text-[11px] text-[#64748B] mt-0.5">{pickup.floor}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-[#E2E8F0]">
            <CheckCircle2 className="h-4 w-4 text-[#15803D] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Counter</p>
              <p className="text-xs font-bold text-[#17221B] mt-0.5">{pickup.counter}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-[#E2E8F0]">
            <Clock className="h-4 w-4 text-[#15803D] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Hours</p>
              <p className="text-xs font-bold text-[#17221B] mt-0.5">{pickup.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <button
        onClick={onContactPharmacy}
        className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
      >
        <PhoneCall className="h-3.5 w-3.5" />
        <span>Contact Pharmacy</span>
      </button>
    </div>
  );
};

