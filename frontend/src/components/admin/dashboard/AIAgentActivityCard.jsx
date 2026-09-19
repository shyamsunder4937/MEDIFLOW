import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { aiAgentActivityList } from '../../../data/adminMockData';

const getAiStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    case 'Review Required':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <AlertCircle className="h-3 w-3" />
          Review Required
        </span>
      );
  }
};

export const AIAgentActivityCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  AI Agent Activity
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  <Sparkles className="h-3 w-3 text-purple-600" />
                  Mock AI Activity — Phase 1
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Simulated autonomous queue triage & workflow optimization
              </p>
            </div>
          </div>
        </div>

        {/* AI Events List */}
        <div className="space-y-3">
          {aiAgentActivityList.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-purple-50/30 hover:bg-purple-50/60 border border-purple-100 transition-colors flex flex-col gap-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-purple-900 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                    {item.time}
                  </span>
                  <span className="font-bold text-[#0F172A] flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-purple-600" />
                    {item.agent}
                  </span>
                </div>
                {getAiStatusBadge(item.status)}
              </div>

              <p className="text-xs text-[#334155] leading-relaxed">
                {item.action}
              </p>

              <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                <span className="font-semibold text-purple-700">Optimization Note:</span>
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-[11px] text-[#64748B]">
          Phase 1 frontend mock • No real LLM/API active
        </span>
        <Link
          to="/admin/ai-agent"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          View AI Activity
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default AIAgentActivityCard;
