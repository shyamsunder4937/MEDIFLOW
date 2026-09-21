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
  Compass,
  Check,
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

export const JourneyTimeline = () => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Compass className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#17221B] leading-tight">
              My Hospital Journey
            </h2>
            <p className="text-xs text-[#64748B]">Real-time clinical milestone tracking</p>
          </div>
        </div>

        <Link
          to="/patient/journey"
          className="text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline flex items-center gap-1"
        >
          <span>Full Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Horizontal / Responsive Step Sequence */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 relative">
          {mockJourneyStages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';
            const isPending = stage.status === 'pending';
            const Icon = ICON_MAP[stage.icon] || ClipboardCheck;

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center text-center relative"
              >
                {/* Node circle */}
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-colors relative z-10 ${
                    isCompleted
                      ? 'bg-[#15803D] border-[#15803D] text-white'
                      : isActive
                      ? 'bg-white border-[#15803D] text-[#15803D] ring-4 ring-[#F0FDF4]'
                      : 'bg-white border-[#CBD5E1] text-[#94A3B8]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#15803D] ring-2 ring-white animate-pulse" />
                  )}
                </div>

                {/* Stage Name */}
                <div className="mt-2.5">
                  <span
                    className={`text-xs block leading-tight ${
                      isActive
                        ? 'font-bold text-[#15803D]'
                        : isCompleted
                        ? 'font-semibold text-[#17221B]'
                        : 'font-medium text-[#64748B]'
                    }`}
                  >
                    {stage.name}
                  </span>

                  {stage.time && (
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5 font-medium">
                      {stage.time}
                    </span>
                  )}

                  {isActive && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 uppercase tracking-wider">
                      Current
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
