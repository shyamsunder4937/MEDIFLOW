import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Stethoscope,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { departmentOverviewList } from '../../../data/adminMockData';

export const DepartmentOverviewCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Department Overview
              </h3>
              <p className="text-xs text-[#64748B]">
                Staffing levels, patient intake & department load
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            {departmentOverviewList.length} Departments
          </span>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {departmentOverviewList.map((dept) => {
            const isAttention = dept.status === 'Attention Required';

            return (
              <div
                key={dept.id}
                className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between text-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">
                      {dept.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      Head: {dept.headDoctor}
                    </div>
                  </div>

                  {isAttention ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
                      <AlertCircle className="h-2.5 w-2.5" />
                      Attention
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Normal
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 text-center">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                    <div className="text-xs font-bold text-[#0F172A]">
                      {dept.doctorsCount}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      {dept.staffLabel || 'Doctors'}
                    </div>
                  </div>

                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                    <div className="text-xs font-bold text-[#0F766E]">
                      {dept.patientsToday}
                    </div>
                    <div className="text-[10px] text-[#64748B]">Patients</div>
                  </div>

                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                    <div
                      className={`text-xs font-bold ${
                        dept.waitingCount > 5 ? 'text-amber-700' : 'text-[#0F172A]'
                      }`}
                    >
                      {dept.waitingCount}
                    </div>
                    <div className="text-[10px] text-[#64748B]">Waiting</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-xs text-[#64748B]">
          8 clinical & diagnostic departments active
        </span>
        <Link
          to="/admin/departments"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          Manage Departments
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default DepartmentOverviewCard;
