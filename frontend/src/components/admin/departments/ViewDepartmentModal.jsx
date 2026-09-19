import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Building2,
  Users,
  Clock,
  UserCheck,
  MapPin,
  Phone,
  Shield,
  Activity,
  Sliders,
  Edit2,
  Info,
} from 'lucide-react';
import { DepartmentStatusBadge } from './DepartmentStatusBadge';
import { DepartmentTypeBadge } from './DepartmentTypeBadge';

export const ViewDepartmentModal = ({
  department,
  isOpen,
  onClose,
  onEdit,
  onManageStatus,
}) => {
  if (!isOpen || !department) return null;

  const capacityPercent = department.capacity
    ? Math.min(100, Math.round((department.patientsToday / department.capacity) * 100))
    : 0;

  let capacityBarColor = 'bg-[#0F766E]';
  if (capacityPercent >= 90) {
    capacityBarColor = 'bg-rose-500';
  } else if (capacityPercent >= 75) {
    capacityBarColor = 'bg-amber-500';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-department-modal-title"
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="view-department-modal-title"
                  className="text-lg font-bold text-[#0F172A]"
                >
                  {department.name}
                </h3>
                <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1]/60 px-2 py-0.5 rounded border border-[#0F766E]/20">
                  {department.id}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <DepartmentTypeBadge type={department.type} />
                <DepartmentStatusBadge status={department.status} />
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#0F172A]">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Assigned Doctors</div>
              <div className="text-lg font-extrabold text-[#0F172A] mt-0.5">
                {department.doctorsCount}
              </div>
              <div className="text-[10px] text-[#0F766E] font-medium">Full Roster</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Patients Today</div>
              <div className="text-lg font-extrabold text-[#0F172A] mt-0.5">
                {department.patientsToday}
              </div>
              <div className="text-[10px] text-sky-700 font-medium">Checked-in OPD</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Waiting Now</div>
              <div className="text-lg font-extrabold text-amber-700 mt-0.5">
                {department.waitingCount}
              </div>
              <div className="text-[10px] text-amber-700 font-medium">In Queue</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-[#E2E8F0]">
              <div className="text-[11px] font-semibold text-[#64748B]">Department Capacity</div>
              <div className="text-lg font-extrabold text-[#0F172A] mt-0.5">
                {department.capacity || 50}
              </div>
              <div className="text-[10px] text-[#64748B] font-medium">Max Daily Slots</div>
            </div>
          </div>

          {/* Capacity Utilization Progress Bar */}
          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-[#0F766E]" />
                Daily Capacity Utilization
              </span>
              <span className="font-mono font-bold text-xs text-[#0F766E]">
                {department.patientsToday} / {department.capacity} ({capacityPercent}%)
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${capacityBarColor}`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#64748B] mt-1.5">
              <span>0 (Empty)</span>
              <span>Safe Load (&lt; 75%)</span>
              <span>High Load (75-90%)</span>
              <span>Max Capacity ({department.capacity})</span>
            </div>
          </div>

          {/* Department Details Information */}
          <div className="p-4 bg-slate-50 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider text-[11px] text-[#64748B]">
              Operational Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Lead Doctor / HOD</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">
                    {department.leadDoctor
                      ? department.leadDoctor
                          .replace(/^(Dr\.|Pharm\.)\s*/, '')
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                      : 'LD'}
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">{department.leadDoctor}</span>
                    <span className="text-[10px] text-[#64748B]">{department.leadDoctorRole || 'Head of Department'}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Operating Hours</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1.5 mt-1">
                  <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                  {department.operatingHours || '08:00 AM - 08:00 PM'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Hospital Location</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                  {department.floor || 'Floor 1, Main Medical Complex'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Department Contact</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1.5 mt-1">
                  <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                  {department.contactNumber || '+91 80 2345 6700'}
                </span>
              </div>
            </div>

            {department.description && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] text-[#64748B] block font-medium mb-1">Scope & Services</span>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {department.description}
                </p>
              </div>
            )}
          </div>

          {/* Mock Notice Badge */}
          <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 flex items-center gap-2 text-teal-800 text-[11px]">
            <Info className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <span className="font-bold">Mock Data — Phase 1</span>
              <p className="text-[10px] text-teal-700">
                Demonstration operational information. Not connected to real hospital infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2.5 bg-slate-50/50">
          <Link
            to="/admin/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:underline"
            onClick={onClose}
          >
            <UserCheck className="h-3.5 w-3.5" />
            View Assigned Doctors &rarr;
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onManageStatus(department);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5 text-purple-600" />
              Manage Status
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(department);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Department
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentModal;
