import React from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Shield,
  Stethoscope,
  FlaskConical,
  Pill,
  Lock,
  Clock,
  Edit,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';

export const ViewUserModal = ({ user, isOpen, onClose, onEdit }) => {
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      aria-labelledby="view-user-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-sm border border-[#0F766E]/20 shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="view-user-modal-title"
                  className="text-lg font-bold text-[#0F172A]"
                >
                  {user.name}
                </h3>
                <UserStatusBadge status={user.status} />
              </div>
              <p className="text-xs text-[#64748B] font-mono mt-0.5">
                {user.id} • {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Phase 1 Mock Notice */}
          <div className="flex items-center justify-between p-3 bg-purple-50/60 border border-purple-100 rounded-xl text-xs text-purple-900">
            <span className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              Mock Data — Phase 1 User Profile
            </span>
            <span className="text-[11px] font-medium text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
              Frontend Simulation
            </span>
          </div>

          {/* Primary Profile Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              Account Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <User className="h-3 w-3" /> Full Name
                </div>
                <div className="font-bold text-[#0F172A]">{user.name}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email Address
                </div>
                <div className="font-bold text-[#0F172A] truncate">{user.email}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Phone className="h-3 w-3" /> Phone Number
                </div>
                <div className="font-bold text-[#0F172A]">{user.phone || '+91 98765 43210'}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Shield className="h-3 w-3" /> System Role
                </div>
                <div>
                  <UserRoleBadge role={user.role} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" /> Assigned Department
                </div>
                <div className="font-bold text-[#0F172A]">{user.department}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Date Joined
                </div>
                <div className="font-bold text-[#0F172A]">{user.joined}</div>
              </div>
            </div>
          </div>

          {/* Role Specific Section */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              Role Specific Attributes
            </h4>

            {user.role === 'Patient' && (
              <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px]">Patient Identifier</div>
                  <div className="font-bold text-sky-900 font-mono mt-0.5">{user.patientId || `PT-${user.id.replace('USR-', '')}`}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">Registration Date</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{user.registeredDate || user.joined}</div>
                </div>
              </div>
            )}

            {user.role === 'Doctor' && (
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px] flex items-center gap-1"><Stethoscope className="h-3 w-3 text-emerald-600" /> Specialization</div>
                  <div className="font-bold text-emerald-900 mt-0.5">{user.specialization || 'Clinical Specialist'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">Availability / Room</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{user.availability || 'Available (OPD Wing)'}</div>
                </div>
              </div>
            )}

            {user.role === 'Hospital Staff' && (
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px] flex items-center gap-1"><Building2 className="h-3 w-3 text-indigo-600" /> Staff Role</div>
                  <div className="font-bold text-indigo-900 mt-0.5">{user.staffRole || 'Central OPD Coordinator'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">Assigned Section</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{user.department} Operations</div>
                </div>
              </div>
            )}

            {user.role === 'Lab Staff' && (
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px] flex items-center gap-1"><FlaskConical className="h-3 w-3 text-purple-600" /> Diagnostic Role</div>
                  <div className="font-bold text-purple-900 mt-0.5">{user.staffRole || 'Diagnostic Technologist'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">Certification / Credential</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{user.certification || 'M.Sc Clinical Laboratory Science'}</div>
                </div>
              </div>
            )}

            {user.role === 'Pharmacy Staff' && (
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px] flex items-center gap-1"><Pill className="h-3 w-3 text-amber-600" /> Pharmacist Role</div>
                  <div className="font-bold text-amber-900 mt-0.5">{user.staffRole || 'Dispensing Pharmacist'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">License Number</div>
                  <div className="font-bold text-[#0F172A] font-mono mt-0.5">{user.licenseNo || 'PH-REG-9912'}</div>
                </div>
              </div>
            )}

            {user.role === 'Admin' && (
              <div className="p-4 rounded-xl bg-[#CCFBF1]/40 border border-[#0F766E]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#64748B] text-[11px] flex items-center gap-1"><Shield className="h-3 w-3 text-[#0F766E]" /> Administrative Scope</div>
                  <div className="font-bold text-[#0F766E] mt-0.5">{user.adminRole || 'System & Multi-Tenant Administrator'}</div>
                </div>
                <div>
                  <div className="text-[#64748B] text-[11px]">Access Level</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{user.accessLevel || 'Tier 1 Full Superadmin'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Account Access Area */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              Account Access & Security
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[#64748B] text-[11px] mb-1">Account Status</div>
                <UserStatusBadge status={user.status} />
              </div>
              <div>
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Last Login
                </div>
                <div className="font-semibold text-[#0F172A]">{user.lastLogin || '19 Sep 2026, 08:30 AM'}</div>
              </div>
              <div>
                <div className="text-[#64748B] text-[11px] mb-1 flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Login Access
                </div>
                <div className={`font-semibold ${user.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {user.status === 'Active' ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2E8F0] bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit(user);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit User Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
