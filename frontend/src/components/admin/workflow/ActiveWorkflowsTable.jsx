import React from 'react';
import {
  Eye,
  Clock,
  User,
  Stethoscope,
  Building2,
} from 'lucide-react';
import { WorkflowStageBadge } from './WorkflowStageBadge';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';
import { WorkflowPriorityBadge } from './WorkflowPriorityBadge';

export const ActiveWorkflowsTable = ({
  workflows,
  onViewPatientWorkflow,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            <th className="py-3.5 pl-4 pr-2">Patient ID</th>
            <th className="py-3.5 px-3">Patient</th>
            <th className="py-3.5 px-3">Current Stage</th>
            <th className="py-3.5 px-3">Assigned Doctor</th>
            <th className="py-3.5 px-3">Department</th>
            <th className="py-3.5 px-3">Waiting Time</th>
            <th className="py-3.5 px-3">Priority</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 pr-4 pl-2 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-xs">
          {workflows.map((wf) => (
            <tr
              key={wf.id}
              className="hover:bg-slate-50/70 transition-colors duration-100 group"
            >
              {/* Patient ID */}
              <td className="py-3.5 pl-4 pr-2 font-mono text-[11px] font-bold text-[#0F766E] whitespace-nowrap">
                {wf.id}
              </td>

              {/* Patient Name & Details */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-slate-100 text-[#0F172A] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
                    {wf.patient
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('') || 'PT'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">
                      {wf.patient}
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 truncate">
                      <span>Age: {wf.patientAge}</span>
                      <span>•</span>
                      <span>{wf.patientGender === 'M' ? 'Male' : 'Female'}</span>
                    </div>
                  </div>
                </div>
              </td>

              {/* Current Stage */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <WorkflowStageBadge stage={wf.currentStage} />
              </td>

              {/* Doctor */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Stethoscope className="h-3 w-3 text-[#94A3B8]" />
                  <span className={`font-medium ${wf.doctor === 'Unassigned' ? 'text-slate-400 italic' : 'text-[#0F172A]'}`}>
                    {wf.doctor}
                  </span>
                </div>
              </td>

              {/* Department */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3 w-3 text-[#94A3B8]" />
                  <span className="text-[#334155] font-medium">
                    {wf.department}
                  </span>
                </div>
              </td>

              {/* Waiting Time */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 font-semibold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  <Clock className="h-3 w-3 text-[#0F766E]" />
                  {wf.waitingTime}
                </span>
              </td>

              {/* Priority */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <WorkflowPriorityBadge priority={wf.priority} />
              </td>

              {/* Status */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <WorkflowStatusBadge status={wf.status} />
              </td>

              {/* Action */}
              <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                <button
                  onClick={() => onViewPatientWorkflow(wf)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#CCFBF1]/50 hover:bg-[#CCFBF1] text-[#0F766E] font-bold text-xs border border-[#0F766E]/20 transition-colors cursor-pointer shadow-2xs"
                  title="View Patient Workflow Details"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveWorkflowsTable;
