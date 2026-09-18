import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { mockQueueData } from '../../data/mockQueueData';
import { QueueOverviewCard } from '../../components/queue/QueueOverviewCard';
import { DoctorInfoCard } from '../../components/queue/DoctorInfoCard';
import { LiveQueue } from '../../components/queue/LiveQueue';
import { WaitingTimeCard } from '../../components/queue/WaitingTimeCard';
import { QueueJourney } from '../../components/queue/QueueJourney';
import { QueueUpdate } from '../../components/queue/QueueUpdate';
import { QueueActions } from '../../components/queue/QueueActions';
import { ContactReceptionModal } from '../../components/queue/ContactReceptionModal';
import { LeaveQueueModal } from '../../components/queue/LeaveQueueModal';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export const QueuePage = () => {
  // Local state initialized with mockQueueData
  const [queueState, setQueueState] = useState(mockQueueData);
  const [showUpdateBanner, setShowUpdateBanner] = useState(true);
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleConfirmLeave = () => {
    setQueueState((prev) => ({
      ...prev,
      status: 'Left Queue',
      formattedQueueNumber: '—',
      patientsAhead: 0,
      estimatedWait: 0,
      liveQueue: prev.liveQueue.map((item) =>
        item.isCurrent
          ? { ...item, status: 'Left Queue', waitTime: 'Left queue by patient choice' }
          : item
      ),
    }));
    showToast('You have stepped out of the queue. Rejoin anytime below.');
  };

  const handleRejoinQueue = () => {
    setQueueState(mockQueueData);
    showToast('Rejoined queue as #07 in General Medicine.');
  };

  return (
    <PatientLayout
      title="My Queue"
      subtitle="Track your position and estimated waiting time."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── Section 1: Queue Update Banner (Notification) ── */}
        {showUpdateBanner && (
          <QueueUpdate
            recentUpdate={queueState.recentUpdate}
            onDismiss={() => setShowUpdateBanner(false)}
          />
        )}

        {/* Rejoin Prompt if user left queue */}
        {queueState.status === 'Left Queue' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900">
            <div className="text-xs">
              <strong className="font-bold">You are currently not in queue.</strong> Your previous spot was token #07.
            </div>
            <button
              onClick={handleRejoinQueue}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Rejoin Queue (Demo Reset)
            </button>
          </div>
        )}

        {/* ── Main Layout Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column (Main Focus: 8 of 12 cols on desktop) */}
          <div className="lg:col-span-8 space-y-5">
            {/* 1. Main Queue Overview Card */}
            <QueueOverviewCard queueData={queueState} />

            {/* 2. Live Queue Nearby Positions */}
            <LiveQueue liveQueue={queueState.liveQueue} />

            {/* 3. Hospital Stage Journey */}
            <QueueJourney stages={queueState.journeyStages} />
          </div>

          {/* Right Column (Secondary / Context: 4 of 12 cols on desktop) */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Assigned Doctor Card */}
            <DoctorInfoCard doctor={queueState.doctor} />

            {/* 2. Estimated Waiting Time Card */}
            <WaitingTimeCard
              estimatedWait={queueState.estimatedWait}
              lastUpdated={queueState.lastUpdated}
            />

            {/* 3. Quick Patient Actions */}
            <QueueActions
              onOpenReceptionModal={() => setIsReceptionModalOpen(true)}
              onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            />
          </div>

        </div>

        {/* Modals */}
        <ContactReceptionModal
          isOpen={isReceptionModalOpen}
          onClose={() => setIsReceptionModalOpen(false)}
          hospitalInfo={queueState.hospitalInfo}
        />

        <LeaveQueueModal
          isOpen={isLeaveModalOpen}
          onClose={() => setIsLeaveModalOpen(false)}
          onConfirmLeave={handleConfirmLeave}
          queueNumber={queueState.formattedQueueNumber}
        />

      </div>
    </PatientLayout>
  );
};
