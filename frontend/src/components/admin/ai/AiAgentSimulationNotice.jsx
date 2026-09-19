import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export const AiAgentSimulationNotice = () => {
  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50/90 via-teal-50/50 to-white border border-purple-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-start sm:items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-700 flex-shrink-0 border border-purple-200">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-[#0F172A]">
            <span>Phase 1 Simulation</span>
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
              Mock Engine
            </span>
          </div>
          <p className="text-[11px] text-[#475569] mt-0.5 leading-normal">
            AI Agent activity shown on this page is mock demonstration data. No real AI model or hospital backend is connected in Phase 1.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto text-[11px] font-semibold text-[#0F766E] bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
        <Info className="h-3.5 w-3.5 text-[#0F766E]" />
        <span>Workflow Assistance Mock</span>
      </div>
    </div>
  );
};

export default AiAgentSimulationNotice;
