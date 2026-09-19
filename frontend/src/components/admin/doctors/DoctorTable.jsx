import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Edit2,
  Sliders,
  MoreVertical,
  CheckCircle2,
  UserX,
  Building2,
  Clock,
  Briefcase,
  MapPin,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { DoctorStatusBadge } from './DoctorStatusBadge';

export const DoctorTable = ({
  doctors,
  onViewDoctor,
  onEditDoctor,
  onManageAvailability,
  onChangeStatus,
}) => {
  const [openActionDropdown, setOpenActionDropdown] = useState(null);

  const toggleDropdown = (docId, e) => {
    e.stopPropagation();
    setOpenActionDropdown(openActionDropdown === docId ? null : docId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[850px]">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            <th className="py-3.5 pl-4 pr-2">Doctor ID</th>
            <th className="py-3.5 px-3">Physician</th>
            <th className="py-3.5 px-3">Specialization</th>
            <th className="py-3.5 px-3">Department</th>
            <th className="py-3.5 px-3">Experience</th>
            <th className="py-3.5 px-3">Availability & Shift</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 pr-4 pl-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-xs">
          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className="hover:bg-slate-50/70 transition-colors duration-100 group"
            >
              {/* Doctor ID */}
              <td className="py-3.5 pl-4 pr-2 font-mono text-[11px] font-bold text-[#0F766E] whitespace-nowrap">
                {doctor.id}
              </td>

              {/* Doctor Name & Email */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-emerald-200">
                    {doctor.name
                      .replace('Dr. ', '')
                      .split(' ')
                      .map((n) => n[0])
                      .join('') || 'DR'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">
                      {doctor.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1 truncate">
                      <Mail className="h-2.5 w-2.5 text-[#94A3B8]" />
                      {doctor.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Specialization */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <span className="font-semibold text-[#0F172A] bg-emerald-50/60 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {doctor.specialization}
                </span>
              </td>

              {/* Department */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-[#334155] flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-[#94A3B8]" />
                    {doctor.department}
                  </span>
                  <Link
                    to="/admin/departments"
                    className="opacity-0 group-hover:opacity-100 text-[10px] text-[#0F766E] font-semibold hover:underline transition-opacity"
                    title="View Department"
                  >
                    Dept &rarr;
                  </Link>
                </div>
              </td>

              {/* Experience */}
              <td className="py-3.5 px-3 whitespace-nowrap text-[#475569]">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-[#94A3B8]" />
                  {doctor.experience}
                </div>
              </td>

              {/* Availability & Shift */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#0F766E]" />
                    {doctor.availability}
                  </span>
                  <span className="text-[10px] text-[#64748B] flex items-center gap-0.5">
                    <MapPin className="h-2.5 w-2.5 text-[#94A3B8]" />
                    {doctor.room || 'Room 102'}
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <DoctorStatusBadge status={doctor.status} />
              </td>

              {/* Actions */}
              <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1 relative">
                  {/* Quick Action Buttons */}
                  <button
                    onClick={() => onViewDoctor(doctor)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                    title="View Details"
                    aria-label={`View details for ${doctor.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onManageAvailability(doctor)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                    title="Manage Availability"
                    aria-label={`Manage availability for ${doctor.name}`}
                  >
                    <Sliders className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onEditDoctor(doctor)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                    title="Edit Doctor"
                    aria-label={`Edit ${doctor.name}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  {/* Context Dropdown Toggle */}
                  <button
                    onClick={(e) => toggleDropdown(doctor.id, e)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="More options"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {openActionDropdown === doctor.id && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setOpenActionDropdown(null)}
                      />
                      <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
                        <button
                          onClick={() => {
                            setOpenActionDropdown(null);
                            onViewDoctor(doctor);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                          View Full Record
                        </button>

                        <button
                          onClick={() => {
                            setOpenActionDropdown(null);
                            onManageAvailability(doctor);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Sliders className="h-3.5 w-3.5 text-purple-600" />
                          Manage Availability
                        </button>

                        <button
                          onClick={() => {
                            setOpenActionDropdown(null);
                            onEditDoctor(doctor);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-blue-600" />
                          Edit Credentials
                        </button>

                        <Link
                          to="/admin/departments"
                          onClick={() => setOpenActionDropdown(null)}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors"
                        >
                          <Building2 className="h-3.5 w-3.5 text-[#64748B]" />
                          View Department
                        </Link>

                        <div className="my-1 border-t border-slate-100" />

                        {doctor.status === 'Available' || doctor.status === 'In Consultation' ? (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(doctor.id, 'Unavailable');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <UserX className="h-3.5 w-3.5 text-rose-600" />
                            Set Unavailable
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(doctor.id, 'Available');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            Activate / Available
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
