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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Pickup Information</h3>
            <p className="text-[11px] text-[#64748B]">Pharmacy location & hours</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
          isOpen
            ? 'bg-emerald-50 text-[#16A34A] border-emerald-200'
            : 'bg-red-50 text-[#DC2626] border-red-200'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-[#16A34A] animate-pulse' : 'bg-[#DC2626]'}`} />
          {pickup.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 flex-1">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
          <MapPin className="h-4 w-4 text-[#0F766E] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#0F172A]">{pickup.location}</p>
            <p className="text-[11px] text-[#64748B] mt-0.5">{pickup.floor}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <CheckCircle2 className="h-4 w-4 text-[#0F766E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Counter</p>
              <p className="text-xs font-bold text-[#0F172A] mt-0.5">{pickup.counter}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/80">
            <Clock className="h-4 w-4 text-[#0F766E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Hours</p>
              <p className="text-xs font-bold text-[#0F172A] mt-0.5">{pickup.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onContactPharmacy}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#0F766E] bg-[#CCFBF1]/50 hover:bg-[#CCFBF1] border border-teal-200/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
      >
        <PhoneCall className="h-4 w-4" />
        Contact Pharmacy
      </button>
    </div>
  );
};
