import React from 'react';
import { Link } from 'react-router-dom';
import { ListOrdered, Clock, Users, Stethoscope, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { mockQueue } from '../../data/mockPatientData';

// Visual queue progress steps
const QUEUE_STEPS = [
  { label: 'Registration', done: true  },
  { label: 'Waiting',      done: false, current: true  },
  { label: 'Consultation', done: false },
];

export const QueueCard = () => {
  const { queueNumber, patientsAhead, estimatedWaitMinutes, doctor, status } = mockQueue;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <ListOrdered className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Live Queue</h2>
        </div>
        {/* NOTE: Phase 1 mock data only */}
        <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
          {status}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Big queue number */}
        <div className="flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center h-24 w-24 rounded-full border-4 border-[#CCFBF1] bg-[#F0FDF9]">
            <span className="text-3xl font-extrabold text-[#0F766E] leading-none">#{queueNumber}</span>
            <span className="text-[10px] text-[#64748B] font-medium mt-0.5">Your number</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col items-center gap-0.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] py-3">
            <div className="flex items-center gap-1 text-[#64748B]">
              <Users className="h-3.5 w-3.5" />
            </div>
            <div className="text-lg font-bold text-[#0F172A]">{patientsAhead}</div>
            <div className="text-[10px] text-[#64748B]">Patients ahead</div>
          </div>
          <div className="flex flex-col items-center gap-0.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] py-3">
            <div className="flex items-center gap-1 text-[#64748B]">
              <Clock className="h-3.5 w-3.5" />
            </div>
            <div className="text-lg font-bold text-[#D97706]">{estimatedWaitMinutes}<span className="text-xs font-medium text-[#64748B] ml-0.5">m</span></div>
            <div className="text-[10px] text-[#64748B]">Est. wait</div>
          </div>
        </div>

        {/* Doctor */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Stethoscope className="h-3.5 w-3.5 flex-shrink-0 text-[#94A3B8]" />
          <span>Doctor: <span className="font-semibold text-[#0F172A]">{doctor}</span></span>
        </div>

        {/* Progress steps */}
        <div className="space-y-2">
          {QUEUE_STEPS.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              {step.done ? (
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#16A34A]" />
              ) : step.current ? (
                <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-[#0F766E] bg-[#0F766E] flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </div>
              ) : (
                <Circle className="h-4 w-4 flex-shrink-0 text-[#CBD5E1]" />
              )}
              <span
                className={`text-xs font-medium ${
                  step.done
                    ? 'text-[#16A34A] line-through decoration-[#16A34A]/40'
                    : step.current
                    ? 'text-[#0F766E] font-semibold'
                    : 'text-[#94A3B8]'
                }`}
              >
                {step.label}
                {step.current && <span className="ml-1.5 text-[10px] font-medium">← You are here</span>}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/patient/queue"
          className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl border border-[#0F766E] py-2.5 text-sm font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2"
        >
          View Queue
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
