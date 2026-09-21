import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { mockPharmacy } from '../../data/mockPatientData';

const PHARMACY_STATUS = {
  preparing: {
    label: 'Preparing',
    classes: 'text-[#B45309] bg-amber-50 border-amber-200',
  },
  ready: {
    label: 'Ready for Pickup',
    classes: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/25',
  },
  collected: {
    label: 'Dispensed',
    classes: 'text-[#64748B] bg-slate-50 border-[#E2E8F0]',
  },
};

export const PharmacyStatusCard = () => {
  const { prescriptionId, medicineCount, status, estimatedReadyMinutes, medicines } = mockPharmacy;
  const statusConfig = PHARMACY_STATUS[status] || PHARMACY_STATUS.preparing;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Pill className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17221B] leading-tight">
              Pharmacy & Medication
            </h2>
            <p className="text-xs text-[#64748B]">Dispensing counter status</p>
          </div>
        </div>

        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusConfig.classes}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          {/* Prescription Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-[#15803D]" />
              <span className="text-xs font-bold text-[#17221B]">
                Prescription #{prescriptionId}
              </span>
            </div>
            <span className="text-xs font-medium text-[#64748B]">
              {medicineCount} Items
            </span>
          </div>

          {/* Medicine List */}
          <div className="space-y-2">
            {medicines.map((med, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs"
              >
                <div>
                  <span className="font-bold text-[#17221B] block">{med.name}</span>
                  <span className="text-[11px] text-[#64748B]">{med.dosage}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#15803D]/20">
                  {med.days} days
                </span>
              </div>
            ))}
          </div>

          {/* Time notice */}
          {status === 'preparing' && (
            <div className="flex items-center gap-2 text-xs text-[#64748B] bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/80">
              <Clock className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
              <span>
                Estimated ready in <strong className="text-[#17221B]">~{estimatedReadyMinutes} mins</strong> at Counter 01.
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[#E2E8F0]">
          <Link
            to="/patient/pharmacy"
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline"
          >
            <span>View Full Prescription Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
