import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { hospitalWorkflowStatusList } from '../../../data/adminMockData';

const getWorkflowBadge = (status) => {
  switch (status) {
    case 'Normal':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3" />
          Normal
        </span>
      );
    case 'Busy':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="h-3 w-3" />
          Busy
        </span>
      );
    case 'Attention Required':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="h-3 w-3" />
          Attention Required
        </span>
      );
  }
};

export const HospitalWorkflowStatusCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Hospital Workflow Status
              </h3>
              <p className="text-xs text-[#64748B]">
                Stage health across patient care lifecycle
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full border border-[#0F766E]/20">
            Phase 1 Mock Ops
          </span>
        </div>

        {/* Workflow List */}
        <div className="space-y-2.5">
          {hospitalWorkflowStatusList.map((wf) => (
            <div
              key={wf.id}
              className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-[#E2E8F0] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-2 w-2 rounded-full bg-[#0F766E] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-[#0F172A] truncate">
                    {wf.stage}
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate">
                    {wf.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                <span className="text-[11px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
                  {wf.metric}
                </span>
                {getWorkflowBadge(wf.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-xs text-[#64748B]">
          Updated 1 min ago • Central OPD Engine
        </span>
        <Link
          to="/admin/workflow"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          View Workflow
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default HospitalWorkflowStatusCard;
