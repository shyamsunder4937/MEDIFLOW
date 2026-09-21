import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import {
  journeyData,
  journeyStages,
  nextSteps,
  recentActivity,
  hospitalReceptionInfo,
} from '../../data/patientMockData.js';
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
      title="My Journey"
      subtitle="Track your clinical workflow from registration to completion."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-6xl mx-auto space-y-6">
        
        {/* ── 1. Current Journey Status / Visit Header ── */}
        <JourneyVisitHeader visit={journeyData} />

        {/* ── 2. Main Journey Stepper (8 Connected Stages) ── */}
        <JourneyProgressCard stages={journeyStages} />

        {/* ── 3. Current Stage Details ── */}
        <CurrentStageCard journeyData={journeyData} />

        {/* ── 4. Supporting Information Grid (Next Steps, Visit Details, Activity, Help) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Next Steps & Activity Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <NextStepsCard steps={nextSteps} />
            <ActivityTimelineCard activities={recentActivity} />
          </div>

          {/* Right Column (5 cols): Encounter Record & Help Support */}
          <div className="lg:col-span-5 space-y-6">
            <VisitDetailsCard visit={journeyData} />
            <JourneyHelpCard
              onOpenReceptionModal={() => setIsReceptionModalOpen(true)}
              onOpenHelpModal={() => setIsHelpModalOpen(true)}
            />
          </div>

        </div>

        {/* ── Interactive Modals ── */}
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

