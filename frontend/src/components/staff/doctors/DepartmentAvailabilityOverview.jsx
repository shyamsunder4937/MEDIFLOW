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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#17221B]">Department Availability</h3>
            <p className="text-[11px] text-[#64748B]">Capacity and on-duty physician allocation</p>
          </div>
        </div>

        {selectedDepartment !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectDepartment('ALL')}
            className="text-xs font-semibold text-[#15803D] hover:underline cursor-pointer"
          >
            Show All Departments
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {departmentStats.map((dept) => {
          const isSelected = selectedDepartment === dept.name;

          return (
            <div
              key={dept.name}
              onClick={() => onSelectDepartment(isSelected ? 'ALL' : dept.name)}
              className={`p-3 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                isSelected
                  ? 'border-[#15803D] bg-[#F0FDF4] shadow-2xs ring-1 ring-[#15803D]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs text-[#17221B] truncate">
                {dept.name}
              </div>

              <div className="space-y-1 text-[11px] text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>Total Doctors:</span>
                  <strong className="text-[#17221B]">{dept.total}</strong>
                </div>
                <div className="flex items-center justify-between text-[#15803D] font-medium">
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
