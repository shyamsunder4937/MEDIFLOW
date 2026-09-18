import React from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  UserCheck,
  Stethoscope,
  FlaskConical,
  FileText,
  Pill,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { mockJourneyStages } from '../../data/mockPatientData';

const ICON_MAP = {
  ClipboardCheck,
  UserCheck,
  Stethoscope,
  FlaskConical,
  FileText,
  Pill,
  CheckCircle2,
};

const StageNode = ({ stage, isLast }) => {
  const Icon = ICON_MAP[stage.icon] || MapPin;
  const isCompleted = stage.status === 'completed';
  const isActive   = stage.status === 'active';
  const isPending  = stage.status === 'pending';

  return (
    /* Desktop: horizontal item; Mobile: vertical item */
    <div className="flex flex-col items-center flex-1 min-w-0 relative group">
      {/* Connector line (desktop: horizontal, hidden for last item) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-5 left-1/2 w-full h-0.5 z-0">
          <div
            className={`h-full transition-all ${
              isCompleted ? 'bg-[#16A34A]' : isActive ? 'bg-gradient-to-r from-[#0F766E] to-[#E2E8F0]' : 'bg-[#E2E8F0]'
            }`}
          />
        </div>
      )}

      {/* Icon circle */}
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          isCompleted
            ? 'border-[#16A34A] bg-[#16A34A] text-white'
            : isActive
            ? 'border-[#0F766E] bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]'
            : 'border-[#E2E8F0] bg-white text-[#CBD5E1]'
        }`}
      >
        <Icon className="h-4 w-4" />
        {isActive && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#0F766E] ring-2 ring-white animate-pulse" />
        )}
      </div>

      {/* Mobile: vertical connector below icon */}
      {!isLast && (
        <div className={`lg:hidden w-0.5 h-6 mt-1 ${isCompleted ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'}`} />
      )}

      {/* Label */}
      <div className="mt-2 text-center px-1 min-w-0">
        <div
          className={`text-[11px] font-semibold leading-tight truncate ${
            isCompleted ? 'text-[#16A34A]' : isActive ? 'text-[#0F766E]' : 'text-[#94A3B8]'
          }`}
        >
          {stage.name}
        </div>
        {stage.time && (
          <div className="text-[10px] text-[#94A3B8] mt-0.5">{stage.time}</div>
        )}
        {isActive && (
          <div className="mt-0.5 text-[10px] font-semibold text-[#0F766E]">Current</div>
        )}
      </div>
    </div>
  );
};

export const JourneyTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Your Hospital Journey</h2>
            <p className="text-[11px] text-[#64748B]">Track your progress through today's visit</p>
          </div>
        </div>
        <Link
          to="/patient/journey"
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
        >
          View Full Journey <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-5">
        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:flex items-start justify-between gap-0 overflow-x-auto pb-2">
          {mockJourneyStages.map((stage, idx) => (
            <StageNode
              key={stage.id}
              stage={stage}
              isLast={idx === mockJourneyStages.length - 1}
            />
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col items-start gap-0">
          {mockJourneyStages.map((stage, idx) => (
            <StageNode
              key={stage.id}
              stage={stage}
              isLast={idx === mockJourneyStages.length - 1}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <Link
          to="/patient/journey"
          className="sm:hidden mt-4 flex items-center justify-center gap-2 w-full rounded-xl border border-[#E2E8F0] py-2.5 text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/30 transition-colors"
        >
          View Full Journey <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
