import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientStatusBadge } from './PatientStatusBadge';
import {
  Eye,
  Edit3,
  SearchX,
  Phone,
  Calendar,
} from 'lucide-react';

export const PatientTable = ({
  patients = [],
  onEditPatient,
  onClearFilters,
  isFiltered = false,
}) => {
  const navigate = useNavigate();

  // Helper to extract initials from name
  const getInitials = (patient) => {
    if (patient.firstName && patient.lastName) {
      return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`.toUpperCase();
    }
    if (patient.name) {
      const parts = patient.name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return parts[0].substring(0, 2).toUpperCase();
    }
    return 'PT';
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
      {/* ── Table Header Bar ── */}
      <div className="p-3.5 sm:p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-bold text-[#17221B]">Patients Directory</h2>
          <span className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
            {patients.length} records
          </span>
        </div>
        <p className="text-xs text-[#64748B] hidden sm:block">
          Select any patient record to review demographic details and visit history.
        </p>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 font-mono">Patient ID</th>
              <th className="py-3 px-4">Patient Name</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">Last Visit</th>
              <th className="py-3 px-4">Today's Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {patients.length > 0 ? (
              patients.map((patient) => {
                const initials = getInitials(patient);
                const fullName = patient.name || `${patient.firstName} ${patient.lastName}`;

                return (
                  <tr
                    key={patient.id}
                    onClick={() => navigate(`/staff/patients/${patient.id}`)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    {/* 1. Patient ID */}
                    <td className="py-3 px-4 font-mono font-bold text-[#15803D]">
                      {patient.id}
                    </td>

                    {/* 2. Patient Avatar + Name + Dept */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] font-extrabold text-xs flex-shrink-0 border border-[#15803D]/20 group-hover:scale-105 transition-transform">
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#17221B] group-hover:text-[#15803D] transition-colors">
                            {fullName}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {patient.department} {patient.room ? `• ${patient.room}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Age */}
                    <td className="py-3 px-4 text-[#475569] font-medium">
                      {patient.age} yrs
                    </td>

                    {/* 4. Gender */}
                    <td className="py-3 px-4 text-[#475569] font-medium">
                      {patient.gender}
                    </td>

                    {/* 5. Phone */}
                    <td className="py-3 px-4 font-mono text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-[#94A3B8]" />
                        <span>{patient.phone}</span>
                      </div>
                    </td>

                    {/* 6. Last Visit */}
                    <td className="py-3 px-4 text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-[#94A3B8]" />
                        <span>{patient.lastVisit}</span>
                      </div>
                    </td>

                    {/* 7. Today's Status */}
                    <td className="py-3 px-4">
                      <PatientStatusBadge status={patient.status} />
                    </td>

                    {/* 8. Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div
                        className="inline-flex items-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/patients/${patient.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white text-xs font-semibold text-[#15803D] hover:bg-[#F0FDF4] hover:border-[#15803D]/30 transition-all cursor-pointer shadow-2xs"
                          title="View patient profile"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditPatient(patient)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white text-xs font-semibold text-[#475569] hover:bg-slate-50 hover:text-[#17221B] transition-all cursor-pointer shadow-2xs"
                          title="Edit patient details"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2.5 max-w-sm mx-auto">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#94A3B8]">
                      <SearchX className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[#17221B]">No patients found</p>
                      <p className="text-xs text-[#64748B]">
                        Try adjusting your search query or reset active filters.
                      </p>
                    </div>
                    {isFiltered && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <span>Clear All Filters</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Patient Cards ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {patients.length > 0 ? (
          patients.map((patient) => {
            const initials = getInitials(patient);
            const fullName = patient.name || `${patient.firstName} ${patient.lastName}`;

            return (
              <div
                key={patient.id}
                onClick={() => navigate(`/staff/patients/${patient.id}`)}
                className="p-3.5 space-y-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] font-extrabold text-xs flex-shrink-0 border border-[#15803D]/20">
                      {initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#17221B]">{fullName}</div>
                      <div className="text-[11px] font-mono text-[#64748B]">
                        {patient.id} • {patient.age}y • {patient.gender} • {patient.department}
                      </div>
                    </div>
                  </div>
                  <PatientStatusBadge status={patient.status} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#64748B] pt-0.5">
                  <div className="flex items-center gap-1 truncate font-mono">
                    <Phone className="h-3 w-3 text-[#94A3B8] flex-shrink-0" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate">
                    <Calendar className="h-3 w-3 text-[#94A3B8] flex-shrink-0" />
                    <span>Last: {patient.lastVisit}</span>
                  </div>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div
                  className="flex items-center gap-2 pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/staff/patients/${patient.id}`)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold border border-[#E2E8F0] text-[#15803D] bg-white hover:bg-[#F0FDF4] transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditPatient(patient)}
                    className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg text-xs font-semibold border border-[#E2E8F0] text-[#475569] bg-white hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 px-4 text-center space-y-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#94A3B8] mx-auto">
              <SearchX className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#17221B]">No patients found</p>
              <p className="text-xs text-[#64748B]">
                Try adjusting your search query or reset active filters.
              </p>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <span>Clear All Filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Table Footer ── */}
      <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
        <span>Showing {patients.length} patient records in registry</span>
        <span className="text-[11px] font-medium text-[#94A3B8]">MediFlow Registry Master</span>
      </div>
    </div>
  );
};

export default PatientTable;
