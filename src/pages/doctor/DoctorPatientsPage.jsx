import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorPatients } from '../../data/doctorMockData';
import { StatusBadge } from '../../components/doctor/QueuePatientRow';
import {
  Users,
  Search,
  ChevronRight,
  Stethoscope,
  Building2,
  Calendar,
  Clock,
  SearchX,
  RotateCcw,
} from 'lucide-react';

export const DoctorPatientsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Filtered patient list
  const filteredPatients = useMemo(() => {
    return doctorPatients.filter((patient) => {
      // 1. Department Filter
      if (departmentFilter !== 'ALL' && patient.department !== departmentFilter) {
        return false;
      }

      // 2. Search Query (Name, ID, Reason)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (patient.name || patient.patientName).toLowerCase().includes(q);
        const idMatch = (patient.patientId || `pat-${patient.id}`).toLowerCase().includes(q);
        const deptMatch = (patient.department || '').toLowerCase().includes(q);
        const reasonMatch = (patient.reason || '').toLowerCase().includes(q);

        if (!nameMatch && !idMatch && !deptMatch && !reasonMatch) return false;
      }

      return true;
    });
  }, [searchQuery, departmentFilter]);

  const totalPatients = doctorPatients.length;
  const genMedCount = doctorPatients.filter((p) => p.department === 'General Medicine').length;
  const cardioCount = doctorPatients.filter((p) => p.department === 'Cardiology').length;
  const orthoCount = doctorPatients.filter((p) => p.department === 'Orthopedics').length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('ALL');
  };

  const isFiltered = searchQuery.trim() !== '' || departmentFilter !== 'ALL';

  return (
    <DoctorLayout
      title="Patients Directory"
      subtitle="Comprehensive registry of assigned hospital patients and medical histories."
    >
      <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B]">Total Registered</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">{totalPatients}</div>
              <span className="text-[11px] text-[#0F766E] font-medium">All Departments</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
              <Users className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B]">General Medicine</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">{genMedCount}</div>
              <span className="text-[11px] text-[#64748B]">Suite 4B Active</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B]">Cardiology</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">{cardioCount}</div>
              <span className="text-[11px] text-blue-600 font-medium">Cardiovascular OPD</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#64748B]">Orthopedics</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">{orthoCount}</div>
              <span className="text-[11px] text-amber-600 font-medium">Joint & Musculoskeletal</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ── Search and Filter Toolbar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, ID (e.g. PAT-1021), or condition..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/70 pl-10 pr-4 py-2 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              aria-label="Filter by department"
              className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>

            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#0F766E]" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Patients Directory Table & Cards ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Patient Records</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Select any patient to review medical summaries, workflow status, and lab results.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full border border-[#0F766E]/20">
              {filteredPatients.length} Patients
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-4">Patient</th>
                  <th className="py-3.5 px-4">Patient ID</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Appointment</th>
                  <th className="py-3.5 px-4">Queue Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                    >
                      <td className="py-4 px-4 font-bold text-[#0F172A]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                              {patient.name}
                            </div>
                            <div className="text-[11px] text-[#64748B]">
                              {patient.age} yrs • {patient.gender}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono font-semibold text-[#0F766E]">
                        {patient.patientId || `PAT-10${patient.id}`}
                      </td>

                      <td className="py-4 px-4 font-medium text-[#475569]">
                        {patient.department}
                      </td>

                      <td className="py-4 px-4 text-[#475569]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
                          <span>{patient.appointmentTime}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <StatusBadge status={patient.status} />
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/doctor/patient/${patient.id}`);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-[#0F766E] bg-white hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/50 font-semibold transition-all shadow-2xs"
                        >
                          <span>View Patient</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <SearchX className="h-8 w-8 text-slate-300" />
                        <p className="text-sm font-bold text-[#0F172A]">No patients found</p>
                        <p className="text-xs text-[#64748B]">
                          No patient records match the current filter criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[#E2E8F0]">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                  className="p-4 space-y-3 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0F766E] font-bold text-xs">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0F172A]">{patient.name}</div>
                        <div className="text-[11px] text-[#64748B]">
                          {patient.patientId} • {patient.age}y • {patient.gender}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={patient.status} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                    <span>{patient.department}</span>
                    <span>Appt: {patient.appointmentTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/doctor/patient/${patient.id}`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border border-[#E2E8F0] text-[#0F766E] bg-white hover:bg-[#CCFBF1]/30"
                  >
                    <span>View Patient Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 px-4 text-center space-y-2">
                <SearchX className="h-8 w-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-[#0F172A]">No patients found</p>
                <p className="text-xs text-[#64748B]">
                  No patient records match the current filter criteria.
                </p>
              </div>
            )}
          </div>

          <div className="p-3.5 bg-slate-50/80 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
            <span>Showing {filteredPatients.length} of {doctorPatients.length} patient records</span>
            <span className="text-[11px] text-[#94A3B8]">MediFlow Clinical Directory</span>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorPatientsPage;
