import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  Edit2,
  Sliders,
  MoreVertical,
  Building2,
  Users,
  Clock,
  UserCheck,
  CheckCircle2,
  Wrench,
  UserX,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { DepartmentStatusBadge } from './DepartmentStatusBadge';
import { DepartmentTypeBadge } from './DepartmentTypeBadge';

export const DepartmentTable = ({
  departments,
  onViewDepartment,
  onEditDepartment,
  onManageStatus,
  onChangeStatusDirect,
}) => {
  const [openActionDropdown, setOpenActionDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (deptId, e) => {
    e.stopPropagation();
    setOpenActionDropdown(openActionDropdown === deptId ? null : deptId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            <th className="py-3.5 pl-4 pr-2">Department ID</th>
            <th className="py-3.5 px-3">Department</th>
            <th className="py-3.5 px-3">Type</th>
            <th className="py-3.5 px-3">Lead Doctor</th>
            <th className="py-3.5 px-3">Doctors</th>
            <th className="py-3.5 px-3">Patients Today / Capacity</th>
            <th className="py-3.5 px-3">Waiting</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 pr-4 pl-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-xs">
          {departments.map((dept) => {
            const capacityPercent = dept.capacity
              ? Math.min(100, Math.round((dept.patientsToday / dept.capacity) * 100))
              : 0;

            let capacityBarColor = 'bg-[#0F766E]';
            if (capacityPercent >= 90) {
              capacityBarColor = 'bg-rose-500';
            } else if (capacityPercent >= 75) {
              capacityBarColor = 'bg-amber-500';
            }

            return (
              <tr
                key={dept.id}
                className="hover:bg-slate-50/70 transition-colors duration-100 group"
              >
                {/* Department ID */}
                <td className="py-3.5 pl-4 pr-2 font-mono text-[11px] font-bold text-[#0F766E] whitespace-nowrap">
                  {dept.id}
                </td>

                {/* Department Name */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#0F766E]/20">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#0F172A] truncate">
                        {dept.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1 truncate">
                        <MapPin className="h-2.5 w-2.5 text-[#94A3B8]" />
                        {dept.floor || 'Floor 1'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Type Badge */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <DepartmentTypeBadge type={dept.type} />
                </td>

                {/* Lead Doctor */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 text-[#475569] font-bold text-[10px] flex items-center justify-center flex-shrink-0 border border-slate-200">
                      {dept.leadDoctor
                        ? dept.leadDoctor
                            .replace(/^(Dr\.|Pharm\.)\s*/, '')
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')
                        : 'LD'}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F172A]">
                        {dept.leadDoctor}
                      </div>
                      <div className="text-[10px] text-[#64748B]">
                        {dept.leadDoctorRole || 'Department Head'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Doctors Count */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <Link
                    to="/admin/doctors"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#CCFBF1]/50 text-[#0F172A] hover:text-[#0F766E] border border-slate-200 transition-colors font-semibold"
                    title="View Assigned Doctors in Doctor Management"
                  >
                    <Users className="h-3.5 w-3.5 text-[#0F766E]" />
                    <span>{dept.doctorsCount} doctors</span>
                  </Link>
                </td>

                {/* Patients Today / Capacity */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="w-36">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-[#0F172A]">
                        {dept.patientsToday}{' '}
                        <span className="text-[#64748B] font-normal">
                          / {dept.capacity}
                        </span>
                      </span>
                      <span className="text-[10px] font-semibold text-[#64748B]">
                        {capacityPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${capacityBarColor}`}
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Waiting Patients */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      dept.waitingCount > 5
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Clock className="h-3 w-3 text-[#94A3B8]" />
                    {dept.waitingCount} waiting
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <DepartmentStatusBadge status={dept.status} />
                </td>

                {/* Actions */}
                <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1 relative">
                    {/* View Details Button */}
                    <button
                      onClick={() => onViewDepartment(dept)}
                      className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                      title="View Department Details"
                      aria-label={`View details for ${dept.name}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Manage Status Button */}
                    <button
                      onClick={() => onManageStatus(dept)}
                      className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                      title="Manage Department Status"
                      aria-label={`Manage status for ${dept.name}`}
                    >
                      <Sliders className="h-4 w-4" />
                    </button>

                    {/* Edit Department Button */}
                    <button
                      onClick={() => onEditDepartment(dept)}
                      className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                      title="Edit Department"
                      aria-label={`Edit ${dept.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    {/* Context Dropdown Toggle */}
                    <button
                      onClick={(e) => toggleDropdown(dept.id, e)}
                      className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="More options"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {openActionDropdown === dept.id && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setOpenActionDropdown(null)}
                        />
                        <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onViewDepartment(dept);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                            View Full Details
                          </button>

                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onEditDepartment(dept);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-blue-600" />
                            Edit Department
                          </button>

                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onManageStatus(dept);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <Sliders className="h-3.5 w-3.5 text-purple-600" />
                            Manage Status
                          </button>

                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              navigate('/admin/doctors');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <UserCheck className="h-3.5 w-3.5 text-[#0F766E]" />
                            View Doctors &rarr;
                          </button>

                          <div className="my-1 border-t border-slate-100" />

                          {dept.status !== 'Maintenance' ? (
                            <button
                              onClick={() => {
                                setOpenActionDropdown(null);
                                onChangeStatusDirect(dept.id, 'Maintenance');
                              }}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <Wrench className="h-3.5 w-3.5 text-amber-600" />
                              Set Maintenance
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setOpenActionDropdown(null);
                                onChangeStatusDirect(dept.id, 'Active');
                              }}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              Set Active
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
