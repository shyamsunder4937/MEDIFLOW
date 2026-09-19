import React from 'react';
import { Building2, CheckCircle2, UserCheck } from 'lucide-react';

export const DepartmentAvailabilityOverview = ({
  doctors = [],
  selectedDepartment = 'ALL',
  onSelectDepartment,
}) => {
  const departments = [
    'Cardiology',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
  ];

  // Derive stats dynamically
  const departmentStats = departments.map((dept) => {
    const deptDocs = doctors.filter((d) => d.department === dept);
    const available = deptDocs.filter((d) => d.status === 'Available').length;
    const inConsultation = deptDocs.filter((d) => d.status === 'In Consultation').length;
    const total = deptDocs.length;

    return {
      name: dept,
      total,
      available,
      inConsultation,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Department Availability</h3>
            <p className="text-[11px] text-[#64748B]">Capacity and on-duty physician allocation</p>
          </div>
        </div>

        {selectedDepartment !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectDepartment('ALL')}
            className="text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer"
          >
            Show All Departments
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {departmentStats.map((dept) => {
          const isSelected = selectedDepartment === dept.name;

          return (
            <div
              key={dept.name}
              onClick={() => onSelectDepartment(isSelected ? 'ALL' : dept.name)}
              className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'border-[#0F766E] bg-teal-50/60 shadow-xs ring-1 ring-[#0F766E]'
                  : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="font-bold text-xs text-[#0F172A] truncate">
                {dept.name}
              </div>

              <div className="space-y-1 text-[11px] text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Total Doctors:</span>
                  <strong className="text-[#0F172A]">{dept.total}</strong>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Available:
                  </span>
                  <strong>{dept.available}</strong>
                </div>
                <div className="flex items-center justify-between text-blue-700 font-medium">
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3 w-3" /> In Session:
                  </span>
                  <strong>{dept.inConsultation}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentAvailabilityOverview;
