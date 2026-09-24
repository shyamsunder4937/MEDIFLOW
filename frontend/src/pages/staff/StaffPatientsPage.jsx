import React, { useState, useMemo } from 'react';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffPatientsData } from '../../data/staffMockData';
import { PatientSummaryCards } from '../../components/staff/patients/PatientSummaryCards';
import { PatientFilters } from '../../components/staff/patients/PatientFilters';
import { PatientTable } from '../../components/staff/patients/PatientTable';
import { PatientFormModal } from '../../components/staff/patients/PatientFormModal';
import { UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';

export const StaffPatientsPage = () => {
  // Local state for all patients
  const [patients, setPatients] = useState(initialStaffPatientsData);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Open Register modal
  const handleOpenRegister = () => {
    setPatientToEdit(null);
    setIsModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (patient) => {
    setPatientToEdit(patient);
    setIsModalOpen(true);
  };

  // Submit handler for both Register and Edit
  const handleFormSubmit = (patientData) => {
    if (patientToEdit) {
      // Edit existing patient
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patientToEdit.id
            ? { ...p, ...patientData, id: patientToEdit.id }
            : p
        )
      );
      showToast(`Patient ${patientToEdit.id} information updated successfully.`);
    } else {
      // Register new patient
      // Generate next patient ID e.g. P-1249
      const newIdNumber = 1248 + (patients.length - initialStaffPatientsData.length + 1);
      const newId = `P-${newIdNumber}`;

      const newPatient = {
        ...patientData,
        id: newId,
        lastVisit: 'Today, 18 Sep 2026',
        registeredDate: '18 Sep 2026',
        room: patientData.department === 'General Medicine' ? 'Room 102' : 'Room 204',
        token: `A-0${patients.length + 20}`,
      };

      setPatients((prev) => [newPatient, ...prev]);
      showToast(`Patient ${newId} (${newPatient.name}) registered successfully.`);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setGenderFilter('ALL');
    setDepartmentFilter('ALL');
  };

  // Filtered patients calculation
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // 1. Status filter
      if (statusFilter !== 'ALL' && patient.status !== statusFilter) {
        return false;
      }

      // 2. Gender filter
      if (genderFilter !== 'ALL' && patient.gender !== genderFilter) {
        return false;
      }

      // 3. Department filter
      if (departmentFilter !== 'ALL' && patient.department !== departmentFilter) {
        return false;
      }

      // 4. Search query (checks patient name, ID, or phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullName = (patient.name || `${patient.firstName} ${patient.lastName}`).toLowerCase();
        const id = (patient.id || '').toLowerCase();
        const phone = (patient.phone || '').toLowerCase();

        if (!fullName.includes(q) && !id.includes(q) && !phone.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [patients, searchQuery, statusFilter, genderFilter, departmentFilter]);

  // Dynamic summary stats
  const totalRegistered = 1248 + (patients.length - initialStaffPatientsData.length);
  const waitingCount = patients.filter((p) => p.status === 'Waiting').length;

  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    genderFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <StaffLayout
      title="Patient Management"
      subtitle="Search, register, and manage patient information."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5">
        {/* ── Toast Alert ── */}
        {toast && (
          <div
            className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xs animate-in slide-in-from-top-2 duration-150 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              {toast.type === 'error' ? (
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="h-4.5 w-4.5 text-[#15803D] flex-shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-xs font-bold underline cursor-pointer hover:opacity-80"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Page Header & Primary Action ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#17221B] tracking-tight">
                Hospital Patients Directory
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                OPD Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Access electronic health demographic records, active OPD queues, and patient intake.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenRegister}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <UserPlus className="h-4 w-4" />
            <span>+ Register Patient</span>
          </button>
        </div>

        {/* ── Summary Operational Indicators ── */}
        <section aria-label="Patient Statistics">
          <PatientSummaryCards
            totalCount={totalRegistered.toLocaleString()}
            todayCount={128 + (patients.length - initialStaffPatientsData.length)}
            waitingCount={waitingCount}
            appointmentsCount={42}
          />
        </section>

        {/* ── Search and Filters ── */}
        <section aria-label="Patient Filters">
          <PatientFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            genderFilter={genderFilter}
            onGenderChange={setGenderFilter}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            onResetFilters={handleResetFilters}
            totalResults={filteredPatients.length}
            totalCount={patients.length}
          />
        </section>

        {/* ── Main Patients Table ── */}
        <section aria-label="Patients Table">
          <PatientTable
            patients={filteredPatients}
            onEditPatient={handleOpenEdit}
            onClearFilters={handleResetFilters}
            isFiltered={isFiltered}
          />
        </section>
      </div>

      {/* ── Register / Edit Patient Modal ── */}
      <PatientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        patientToEdit={patientToEdit}
      />
    </StaffLayout>
  );
};

export default StaffPatientsPage;
