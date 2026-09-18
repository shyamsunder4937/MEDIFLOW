import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import {
  journeyData,
  journeyStages,
  nextSteps,
  recentActivity,
  hospitalReceptionInfo,
} from '../../data/patientMockData';
import { JourneyVisitHeader } from '../../components/journey/JourneyVisitHeader';
import { JourneyProgressCard } from '../../components/journey/JourneyProgressCard';
import { CurrentStageCard } from '../../components/journey/CurrentStageCard';
import { NextStepsCard } from '../../components/journey/NextStepsCard';
import { VisitDetailsCard } from '../../components/journey/VisitDetailsCard';
import { ActivityTimelineCard } from '../../components/journey/ActivityTimelineCard';
import { JourneyHelpCard } from '../../components/journey/JourneyHelpCard';
import { JourneyReceptionModal, JourneyHelpModal } from '../../components/journey/JourneyModals';

export const JourneyPage = () => {
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <PatientLayout
      title="My Hospital Journey"
      subtitle="Track your progress from registration to completion."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        
        {/* ── 1. Current Visit Header Card ── */}
        <JourneyVisitHeader visit={journeyData} />

        {/* ── 2. Journey Progress Bar & Stepper (8 Stages) ── */}
        <JourneyProgressCard stages={journeyStages} />

        {/* ── 3. Main Split Grid (Current Stage, Next Steps, Visit Details, Activity) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Left Column (7 of 12 on desktop): Current Stage, Next Steps, Recent Activity */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Current Stage Card */}
            <CurrentStageCard journeyData={journeyData} />

            {/* What Happens Next Card */}
            <NextStepsCard steps={nextSteps} />

            {/* Recent Activity Timeline Card */}
            <ActivityTimelineCard activities={recentActivity} />
          </div>

          {/* Right Column (5 of 12 on desktop): Visit Details & Help Support */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Official Visit Details Card */}
            <VisitDetailsCard visit={journeyData} />

            {/* Need Help Information Card */}
            <JourneyHelpCard
              onOpenReceptionModal={() => setIsReceptionModalOpen(true)}
              onOpenHelpModal={() => setIsHelpModalOpen(true)}
            />
          </div>

        </div>

        {/* ── Interactive Modals (Client-side Phase 1) ── */}
        <JourneyReceptionModal
          isOpen={isReceptionModalOpen}
          onClose={() => setIsReceptionModalOpen(false)}
          receptionInfo={hospitalReceptionInfo}
        />

        <JourneyHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />

      </div>
    </PatientLayout>
  );
};

export default JourneyPage;
