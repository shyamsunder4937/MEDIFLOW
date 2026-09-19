import React from 'react';
import {
  Eye,
  Clock,
  Sparkles,
  Bot,
} from 'lucide-react';
import { AiAgentStatusBadge } from './AiAgentStatusBadge';
import { AiAgentPriorityBadge } from './AiAgentPriorityBadge';
import { AiAgentModuleBadge } from './AiAgentModuleBadge';

export const AiAgentActivityTable = ({
  activities,
  onViewActivity,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[850px]">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            <th className="py-3.5 pl-4 pr-2">Time</th>
            <th className="py-3.5 px-3">Activity ID</th>
            <th className="py-3.5 px-3">Patient</th>
            <th className="py-3.5 px-3">Simulated Action</th>
            <th className="py-3.5 px-3">Module</th>
            <th className="py-3.5 px-3">Priority</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 pr-4 pl-2 text-right">Details</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-xs">
          {activities.map((act) => (
            <tr
              key={act.id}
              className="hover:bg-slate-50/70 transition-colors duration-100 group"
            >
              {/* Time */}
              <td className="py-3.5 pl-4 pr-2 font-mono text-[11px] font-bold text-[#475569] whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-[#94A3B8]" />
                  <span>{act.time}</span>
                </div>
              </td>

              {/* Activity ID */}
              <td className="py-3.5 px-3 font-mono text-[11px] font-bold text-purple-700 whitespace-nowrap">
                {act.id}
              </td>

              {/* Patient */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-slate-100 text-[#0F172A] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
                    {act.patient
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('') || 'PT'}
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] truncate">
                      {act.patient}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      {act.department || 'Hospital General'}
                    </div>
                  </div>
                </div>
              </td>

              {/* Action */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-purple-600 flex-shrink-0" />
                  <span>{act.action}</span>
                </div>
              </td>

              {/* Module */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <AiAgentModuleBadge module={act.module} />
              </td>

              {/* Priority */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <AiAgentPriorityBadge priority={act.priority} />
              </td>

              {/* Status */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <AiAgentStatusBadge status={act.status} />
              </td>

              {/* Details Action Button */}
              <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                <button
                  onClick={() => onViewActivity(act)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors cursor-pointer shadow-2xs"
                  title="View Activity Details"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AiAgentActivityTable;
