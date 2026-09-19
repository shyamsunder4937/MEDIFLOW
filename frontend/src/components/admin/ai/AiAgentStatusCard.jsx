import React from 'react';
import {
  Bot,
  Cpu,
  Server,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AiAgentStatusCard = ({ statusData }) => {
  return (
    <section aria-label="AI Agent Status Details" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                AI Agent Status
              </h3>
              <p className="text-xs text-[#64748B]">
                Simulated intelligence service configuration and runtime telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              {statusData?.status || 'Simulation Mode'}
            </span>
          </div>
        </div>

        {/* Status Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <Cpu className="h-3 w-3 text-[#94A3B8]" />
              Runtime Status
            </div>
            <div className="font-bold text-[#0F172A] mt-1 text-xs">
              {statusData?.status || 'Simulation Mode'}
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <Activity className="h-3 w-3 text-[#94A3B8]" />
              Environment
            </div>
            <div className="font-bold text-[#0F172A] mt-1 text-xs">
              {statusData?.environment || 'Phase 1 Frontend'}
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <Bot className="h-3 w-3 text-[#94A3B8]" />
              Model Profile
            </div>
            <div className="font-bold text-purple-700 mt-1 text-xs">
              {statusData?.model || 'Mock Agent'}
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <Server className="h-3 w-3 text-[#94A3B8]" />
              Backend Link
            </div>
            <div className="font-bold text-amber-700 mt-1 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-amber-600" />
              {statusData?.backend || 'Not Connected'}
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#94A3B8]" />
              Last Activity
            </div>
            <div className="font-bold text-[#0F172A] mt-1 text-xs font-mono">
              {statusData?.lastActivity || '10:42 AM'}
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-[#E2E8F0]">
            <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-[#0F766E]" />
              Actions Logged
            </div>
            <div className="font-bold text-[#0F766E] mt-1 text-xs">
              {statusData?.actionsProcessed || 42} actions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAgentStatusCard;
