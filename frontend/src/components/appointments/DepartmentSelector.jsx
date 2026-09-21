import React from 'react';
import {
  Stethoscope,
  HeartPulse,
  Bone,
  Sparkles,
  Baby,
  Activity,
  CheckCircle,
  Loader2
} from 'lucide-react';

const iconMap = {
  Stethoscope,
  HeartPulse,
  Bone,
  Sparkles,
  Baby,
  Activity
};

// Map department names to icon names
const departmentIconMap = {
  'General Medicine': 'Stethoscope',
  'Cardiology': 'HeartPulse',
  'Orthopedics': 'Bone',
  'Dermatology': 'Sparkles',
  'Pediatrics': 'Baby',
  'Gastroenterology': 'Activity'
};

export const DepartmentSelector = ({ departments = [], selectedDepartment, onSelectDepartment, isLoading }) => {
  if (isLoading && departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F766E]" />
        <p className="text-sm text-[#64748B]">Loading departments...</p>
      </div>
    );
  }

  if (!isLoading && departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
        <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
          <Stethoscope className="h-6 w-6" />
        </div>
        <p className="text-sm text-[#64748B]">No departments available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold text-[#0F172A]">Select Department</h4>
        <p className="text-xs text-[#64748B] mt-0.5">
          Choose the specialized clinical department for your consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {departments.map((dept) => {
          const iconName = departmentIconMap[dept.name] || 'Stethoscope';
          const Icon = iconMap[iconName] || Stethoscope;
          const isSelected = selectedDepartment?.id === dept.id;

          // Count available doctors from the doctors array (if populated)
          const availableDoctorsCount = Array.isArray(dept.doctors) 
            ? dept.doctors.filter(d => d.working_status === 'available').length 
            : 0;

          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => onSelectDepartment(dept)}
              className={`text-left p-4 rounded-2xl border transition-all duration-150 relative flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                isSelected
                  ? 'border-[#0F766E] bg-[#CCFBF1]/20 shadow-xs ring-1 ring-[#0F766E]'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 text-[#0F766E]">
                  <CheckCircle className="h-4 w-4 fill-[#0F766E] text-white" />
                </div>
              )}

              <div>
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors mb-3 ${
                    isSelected
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-teal-50 text-[#0F766E] group-hover:bg-[#CCFBF1]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-sm font-bold text-[#0F172A] mb-1">
                  {dept.name}
                </div>
                <div className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {dept.description || 'Specialized medical care'}
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-between text-[11px]">
                <span className="text-[#64748B]">Available doctors</span>
                <span className="font-semibold text-[#0F766E]">
                  {availableDoctorsCount > 0 ? `${availableDoctorsCount} Active` : 'Loading...'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
