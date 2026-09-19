import React from 'react';
import {
  X,
  Bot,
  Clock,
  Sparkles,
  Info,
  Shield,
  Activity,
  Layers,
  Terminal,
} from 'lucide-react';
import { AiAgentStatusBadge } from './AiAgentStatusBadge';
import { AiAgentPriorityBadge } from './AiAgentPriorityBadge';
import { AiAgentModuleBadge } from './AiAgentModuleBadge';

export const AiAgentActivityModal = ({
  activity,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !activity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-activity-modal-title"
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="ai-activity-modal-title"
                  className="text-base font-bold text-[#0F172A]"
                >
                  {activity.action}
                </h3>
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded border border-purple-200">
                  {activity.id}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <AiAgentModuleBadge module={activity.module} />
                <AiAgentStatusBadge status={activity.status} />
                <AiAgentPriorityBadge priority={activity.priority} />
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
        <div className="p-6 overflow-y-auto space-y-4.5 text-xs text-[#0F172A]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Timestamp</div>
              <div className="font-mono font-bold text-[#0F172A] mt-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
                {activity.time}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Target Patient</div>
              <div className="font-bold text-[#0F172A] mt-1 truncate">
                {activity.patient}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Department</div>
              <div className="font-bold text-[#0F172A] mt-1 truncate">
                {activity.department || 'Hospital General'}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs space-y-1.5">
            <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              Event Description
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Agent Response Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1.5">
            <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-[#0F766E]" />
              Agent Simulated Response
            </div>
            <p className="text-xs text-[#334155] leading-relaxed font-mono bg-white p-2.5 rounded-lg border border-slate-200">
              {activity.agentResponse}
            </p>
          </div>

          {/* System Effect Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-1.5">
            <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#64748B]" />
              System Effect
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              {activity.systemEffect}
            </p>
          </div>

          {/* Mock Notice Banner */}
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 flex items-center gap-2 text-purple-900 text-[11px]">
            <Info className="h-4 w-4 text-purple-700 flex-shrink-0" />
            <div>
              <span className="font-bold">Mock AI Activity — Phase 1</span>
              <p className="text-[10px] text-purple-800">
                This event represents demonstration UI state. No live inference model was invoked.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAgentActivityModal;
