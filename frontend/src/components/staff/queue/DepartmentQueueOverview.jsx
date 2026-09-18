import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';
import { staffDepartmentQueueStats } from '../../../data/staffMockData';

export const DepartmentQueueOverview = ({
  departmentStats = staffDepartmentQueueStats,
  selectedDepartment = 'ALL',
  onSelectDepartment,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Department Queue Overview</h2>
            <p className="text-xs text-[#64748B]">
              Real-time patient distribution across clinical specialties
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full">
          {departmentStats.length} Active Departments
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {departmentStats.map((dept) => {
          const isSelected = selectedDepartment === dept.department;
          return (
            <div
              key={dept.department}
              onClick={() => onSelectDepartment && onSelectDepartment(dept.department)}
              className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-2.5 ${
                isSelected
                  ? 'bg-[#CCFBF1]/40 border-[#0F766E] ring-1 ring-[#0F766E] shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-[#0F766E]/50 hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-xs text-[#0F172A] truncate">
                  {dept.department}
                </span>
                <span className="text-[10px] text-[#0F766E] font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {dept.leadDoctor}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[10px] text-[#64748B] block">Waiting</span>
                  <span className="text-sm font-extrabold text-amber-600 block">
                    {dept.waiting}
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[10px] text-[#64748B] block">In Room</span>
                  <span className="text-sm font-extrabold text-blue-600 block">
                    {dept.inConsultation}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-0.5">
                <span>Total: {dept.waiting + dept.inConsultation}</span>
                <span className="text-[#0F766E] font-semibold flex items-center gap-0.5">
                  Filter <ChevronRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DepartmentQueueOverview;
