import React, { useState } from 'react';
import { PatientLayout }           from '../../layouts/PatientLayout';
import { PharmacySummaryCards }    from '../../components/pharmacy/PharmacySummaryCards';
import { CurrentPrescriptionCard } from '../../components/pharmacy/CurrentPrescriptionCard';
import { PrescriptionCard }        from '../../components/pharmacy/PrescriptionCard';
import { PrescriptionDetailsModal } from '../../components/pharmacy/PrescriptionDetailsModal';
import { OrderTrackingCard }       from '../../components/pharmacy/OrderTrackingCard';
import { PickupInformationCard }   from '../../components/pharmacy/PickupInformationCard';
import { PharmacyContactModal }    from '../../components/pharmacy/PharmacyContactModal';
import { OrderHistory }            from '../../components/pharmacy/OrderHistory';
import { PharmacyJourneyCard }     from '../../components/pharmacy/PharmacyJourneyCard';
import { PharmacyInformationCard } from '../../components/pharmacy/PharmacyInformationCard';
import { OrderDetailsModal }       from '../../components/pharmacy/OrderDetailsModal';
import {
  prescriptionSummary,
  currentPrescriptionVisit,
  prescriptions,
  pharmacyTracking,
  pharmacyPickupInfo,
  pharmacyJourneyStages,
  pharmacyOrders,
} from '../../data/patientMockData';
import { Pill, CheckCircle2 } from 'lucide-react';

// ── Pharmacy Empty State ──────────────────────────────────────────────────────
const PharmacyEmptyState = () => (
  <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-12 flex flex-col items-center text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1]/60 text-[#0F766E] mb-4">
      <Pill className="h-8 w-8" />
    </div>
    <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">No prescriptions found</h3>
    <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mt-1.5 leading-relaxed">
      Your prescriptions will appear here after they are created during your hospital visit.
    </p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
export const PharmacyPage = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsPrescriptionModalOpen(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  return (
    <PatientLayout
      title="Pharmacy"
      subtitle="Track your prescriptions and medication orders."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">

        {/* ── Toast ── */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Summary Cards ── */}
        <section aria-labelledby="pharmacy-summary-heading">
          <h2 id="pharmacy-summary-heading" className="sr-only">Pharmacy Summary</h2>
          <PharmacySummaryCards summary={prescriptionSummary} />
        </section>

        {/* ── 2. Current Visit Prescription Status ── */}
        <section aria-labelledby="current-prescription-heading">
          <h2 id="current-prescription-heading" className="sr-only">Current Visit Prescription</h2>
          <CurrentPrescriptionCard visit={currentPrescriptionVisit} />
        </section>

        {/* ── 8. Prescription Journey (full-width) ── */}
        <PharmacyJourneyCard stages={pharmacyJourneyStages} />

        {/* ── 3 + 5 + 6. Main Grid: Prescriptions (left) + Tracking & Pickup (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">

          {/* Left — Active Prescriptions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">Active Prescriptions</h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Fictional demo medications — not medical advice
                </p>
              </div>
              <span className="text-xs font-semibold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-full">
                {prescriptions.length} Rx
              </span>
            </div>

            {prescriptions.length > 0 ? (
              <div className="space-y-4">
                {prescriptions.map((rx) => (
                  <PrescriptionCard
                    key={rx.id}
                    prescription={rx}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <PharmacyEmptyState />
            )}
          </div>

          {/* Right — Order Tracking + Pickup Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* 5. Order Tracking */}
            <OrderTrackingCard tracking={pharmacyTracking} />

            {/* 6. Pickup Information */}
            <PickupInformationCard
              info={pharmacyPickupInfo}
              onContactPharmacy={() => setIsContactModalOpen(true)}
            />
          </div>
        </div>

        {/* ── 7. Order History ── */}
        <section className="space-y-4" aria-labelledby="order-history-heading">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="order-history-heading" className="text-lg font-bold text-[#0F172A]">
                Order History
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Past pharmacy dispensation records for this patient
              </p>
            </div>
            <span className="text-xs font-semibold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-full">
              {pharmacyOrders.length} Orders
            </span>
          </div>

          <OrderHistory
            orders={pharmacyOrders}
            onViewOrder={handleViewOrder}
          />
        </section>

        {/* ── 9. Information Card ── */}
        <PharmacyInformationCard />

        {/* ── Modals ── */}
        <PrescriptionDetailsModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => setIsPrescriptionModalOpen(false)}
          prescription={selectedPrescription}
        />

        <OrderDetailsModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          order={selectedOrder}
        />

        <PharmacyContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </PatientLayout>
  );
};

export default PharmacyPage;
