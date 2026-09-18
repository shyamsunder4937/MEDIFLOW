import React from 'react';
import { User, Stethoscope, Building2, Check } from 'lucide-react';

export const ROLES = [
  {
    id: 'patient',
    name: 'Patient',
    icon: User,
    description: 'Manage appointments and track your journey',
  },
  {
    id: 'doctor',
    name: 'Doctor',
    icon: Stethoscope,
    description: 'Manage consultations and patient queues',
  },
  {
    id: 'staff',
    name: 'Hospital Staff',
    icon: Building2,
    description: 'Manage registrations and hospital operations',
  },
];

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#0F172A] tracking-tight">
          Select your portal
        </label>
        <span className="text-[11px] font-medium text-[#64748B]">
          Role Preview
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Select Hospital Role">
        {ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          const Icon = role.icon;

          return (
            <button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectRole(role.id)}
              className={`relative flex flex-col justify-between p-3.5 rounded-xl text-left transition-all duration-200 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 ${
                isSelected
                  ? 'border-[#0F766E] bg-[#CCFBF1]/30 ring-1 ring-[#0F766E] shadow-sm'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              {/* Header Icon + Active Radio Indicator */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-slate-100 text-[#64748B]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#0F766E] bg-[#0F766E] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Role Title & Description */}
              <div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-[#0F766E]' : 'text-[#0F172A]'
                  }`}
                >
                  {role.name}
                </div>
                <p className="text-[11px] text-[#64748B] mt-1 leading-snug font-normal">
                  {role.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
