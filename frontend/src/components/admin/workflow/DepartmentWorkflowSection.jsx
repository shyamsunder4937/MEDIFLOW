import React from 'react';
import {
  Building2,
  Users,
  Clock,
  Stethoscope,
  Microscope,
  Package,
} from 'lucide-react';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';

export const DepartmentWorkflowSection = ({ departments }) => {
  return (
    <section aria-label="Department Workflow Overview" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                Department Workflow Overview
              </h3>
              <p className="text-xs text-[#64748B]">
                Current patient distribution across hospital clinical and diagnostic wings.
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 pl-4 pr-3">Department</th>
                <th className="py-3 px-3 text-center">Total Patients</th>
                <th className="py-3 px-3 text-center">Waiting</th>
                <th className="py-3 px-3 text-center">In Consultation</th>
                <th className="py-3 px-3 text-center">Lab Tests</th>
                <th className="py-3 px-3 text-center">Pharmacy</th>
                <th className="py-3 pr-4 pl-3 text-right">Load Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {departments.map((dept) => (
                <tr
                  key={dept.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Department Name */}
                  <td className="py-3.5 pl-4 pr-3 font-bold text-[#0F172A] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#0F766E]" />
                      <span>{dept.department}</span>
                    </div>
                  </td>

                  {/* Total Patients */}
                  <td className="py-3.5 px-3 text-center font-bold text-[#0F172A] whitespace-nowrap">
                    <span className="inline-flex items-center justify-center h-6 min-w-[28px] px-2 rounded-md bg-slate-100 text-[#0F172A]">
                      {dept.totalPatients}
                    </span>
                  </td>

                  {/* Waiting */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Clock className="h-3 w-3" />
                      {dept.waiting}
                    </span>
                  </td>

                  {/* In Consultation */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      <Stethoscope className="h-3 w-3" />
                      {dept.inConsultation}
                    </span>
                  </td>

                  {/* Lab */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      <Microscope className="h-3 w-3" />
                      {dept.lab}
                    </span>
                  </td>

                  {/* Pharmacy */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      <Package className="h-3 w-3" />
                      {dept.pharmacy}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 pr-4 pl-3 text-right whitespace-nowrap">
                    <WorkflowStatusBadge status={dept.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DepartmentWorkflowSection;
