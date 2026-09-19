import React from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  Edit3,
  FileBadge,
} from 'lucide-react';

export const AdminPersonalInfoCard = ({ profile, onEdit }) => {
  const {
    fullName,
    name,
    email,
    phone,
    role,
    department,
  } = profile;

  const displayName = fullName || name || 'MediFlow Admin';

  const infoFields = [
    {
      id: 'name',
      label: 'Full Name',
      value: displayName,
      icon: User,
      readOnly: false,
    },
    {
      id: 'email',
      label: 'Email Address',
      value: email || 'admin@mediflow.demo',
      icon: Mail,
      readOnly: false,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: phone || '+91 98765 43210',
      icon: Phone,
      readOnly: false,
    },
    {
      id: 'role',
      label: 'System Role',
      value: role || 'System Administrator',
      icon: Shield,
      readOnly: true,
      badge: 'Protected Role',
    },
    {
      id: 'department',
      label: 'Department',
      value: department || 'Hospital Administration',
      icon: Building2,
      readOnly: true,
      badge: 'Assigned Unit',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header with Title & Edit Button */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-200">
              <User className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Personal Information
              </h3>
              <p className="text-xs text-slate-500">
                Primary contact and identity details for administrative access.
              </p>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F766E] bg-teal-50 hover:bg-teal-100 hover:text-[#115E59] border border-teal-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
            title="Edit administrator contact details"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoFields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.id}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    {field.label}
                  </span>
                  {field.readOnly && (
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1.5 py-0.2 rounded bg-slate-200/60">
                      Fixed
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-800 break-words">
                  {field.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Managed via Local State</span>
        <span>Phase 1 Demonstration</span>
      </div>
    </div>
  );
};
