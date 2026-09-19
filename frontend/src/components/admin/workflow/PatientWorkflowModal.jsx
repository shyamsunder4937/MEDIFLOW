import React from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  Clock,
  User,
  Stethoscope,
  Building2,
  AlertCircle,
  Check,
  CircleDot,
  Info,
} from 'lucide-react';
import { WorkflowStageBadge } from './WorkflowStageBadge';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';
import { WorkflowPriorityBadge } from './WorkflowPriorityBadge';

const STAGES_ORDER = [
  'Registration',
  'Queue',
  'Doctor',
  'Laboratory',
  'Pharmacy',
  'Completed',
];

export const PatientWorkflowModal = ({
  workflow,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !workflow) return null;

  // Determine stage progression index
  const currentStageIndex = STAGES_ORDER.indexOf(workflow.currentStage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="patient-workflow-modal-title"
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="patient-workflow-modal-title"
                  className="text-lg font-bold text-[#0F172A]"
                >
                  {workflow.patient}
                </h3>
                <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1]/60 px-2 py-0.5 rounded border border-[#0F766E]/20">
                  {workflow.id}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <WorkflowStageBadge stage={workflow.currentStage} />
                <WorkflowStatusBadge status={workflow.status} />
                <WorkflowPriorityBadge priority={workflow.priority} />
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#0F172A]">
          {/* Patient & Care Team Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Department</div>
              <div className="text-xs font-bold text-[#0F172A] mt-1 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-[#0F766E]" />
                <span className="truncate">{workflow.department}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Assigned Doctor</div>
              <div className="text-xs font-bold text-[#0F172A] mt-1 flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-[#0F766E]" />
                <span className="truncate">{workflow.doctor}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Waiting Time</div>
              <div className="text-xs font-bold text-amber-700 mt-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{workflow.waitingTime}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Est. Wait Remaining</div>
              <div className="text-xs font-bold text-[#0F766E] mt-1">
                {workflow.estWait || '3 min'}
              </div>
            </div>
          </div>

          {/* Patient Journey Progression Stepper */}
          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="text-xs font-bold text-[#0F172A] mb-3.5 flex items-center justify-between">
              <span>Patient Journey Stepper</span>
              <span className="text-[10px] text-[#64748B] font-normal">
                Stage {currentStageIndex + 1} of {STAGES_ORDER.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {STAGES_ORDER.map((stageName, idx) => {
                let state = 'pending';
                if (idx < currentStageIndex || workflow.status === 'Completed') {
                  state = 'completed';
                } else if (idx === currentStageIndex) {
                  state = 'current';
                }

                return (
                  <div
                    key={stageName}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : state === 'current'
                        ? 'bg-[#CCFBF1] border-[#0F766E]/40 text-[#0F766E] shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {state === 'completed' && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                      {state === 'current' && (
                        <CircleDot className="h-4 w-4 text-[#0F766E] animate-pulse" />
                      )}
                      {state === 'pending' && (
                        <div className="h-3.5 w-3.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div className="font-bold text-[11px] leading-tight">
                      {stageName}
                    </div>
                    <div className="text-[9px] mt-0.5 uppercase tracking-wider font-semibold">
                      {state === 'completed' && '✓ Done'}
                      {state === 'current' && '● Active'}
                      {state === 'pending' && '○ Pending'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Chronological Timeline */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#0F172A] mb-3 flex items-center justify-between">
              <span>Workflow Chronological Timeline</span>
              <span className="text-[10px] text-[#64748B]">Demonstration events</span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {(workflow.timeline || []).map((tl, index) => {
                const isCurrent = tl.status === 'current';
                const isDone = tl.status === 'done';

                return (
                  <div key={index} className="flex items-start gap-3 pl-0.5 relative">
                    <div
                      className={`h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isDone && <Check className="h-2.5 w-2.5" />}
                      {isCurrent && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>

                    <div className="flex-1 min-w-0 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-[#0F766E]">
                          {tl.time}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {tl.stage}
                        </span>
                      </div>
                      <p className="text-xs text-[#0F172A] leading-snug">
                        {tl.event || tl.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mock Workflow Banner */}
          <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 flex items-center gap-2 text-teal-800 text-[11px]">
            <Info className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <span className="font-bold">Mock Workflow — Phase 1</span>
              <p className="text-[10px] text-teal-700">
                Demonstration workflow simulation. Not connected to real clinical queues or backend agents.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientWorkflowModal;
