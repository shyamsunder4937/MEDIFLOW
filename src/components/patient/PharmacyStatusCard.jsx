import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, Package, ArrowRight } from 'lucide-react';
import { mockPharmacy } from '../../data/mockPatientData';

const PHARMACY_STATUS = {
  preparing: { label: 'Preparing',  classes: 'text-[#D97706] bg-amber-50 border-amber-200' },
  ready:     { label: 'Ready',      classes: 'text-[#16A34A] bg-[#F0FDF4] border-[#16A34A]/25' },
  collected: { label: 'Collected',  classes: 'text-[#64748B] bg-slate-50 border-[#E2E8F0]' },
};

export const PharmacyStatusCard = () => {
  const { prescriptionId, medicineCount, status, estimatedReadyMinutes, medicines } = mockPharmacy;
  const statusConfig = PHARMACY_STATUS[status];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Pill className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Pharmacy</h2>
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusConfig.classes}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Prescription info */}
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-[#94A3B8]" />
              <span className="font-semibold text-[#0F172A]">Prescription #{prescriptionId}</span>
            </div>
            <span className="text-xs text-[#64748B]">{medicineCount} medicines</span>
          </div>

          {/* Medicine list */}
          <ul className="space-y-1.5 pt-1">
            {medicines.map((med, idx) => (
              <li key={idx} className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-[#0F172A]">{med.name}</span>
                <span className="text-[10px] text-[#94A3B8]">{med.dosage} · {med.days} days</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimated time */}
        {status === 'preparing' && (
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#94A3B8]" />
            <span>Ready in approximately <span className="font-semibold text-[#D97706]">{estimatedReadyMinutes} min</span></span>
          </div>
        )}

        {/* CTA */}
        <Link
          to="/patient/pharmacy"
          className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0F766E] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          View Prescription <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
