import React, { useState, useMemo } from 'react';
import { Stethoscope, CheckCircle2, UserPlus } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { DoctorSummaryCards } from '../../components/admin/doctors/DoctorSummaryCards';
import { DoctorFilters } from '../../components/admin/doctors/DoctorFilters';
import { DoctorTable } from '../../components/admin/doctors/DoctorTable';
import { DoctorPagination } from '../../components/admin/doctors/DoctorPagination';
import { DoctorEmptyState } from '../../components/admin/doctors/DoctorEmptyState';
import { ViewDoctorModal } from '../../components/admin/doctors/ViewDoctorModal';
import { EditDoctorModal } from '../../components/admin/doctors/EditDoctorModal';
import { AddDoctorModal } from '../../components/admin/doctors/AddDoctorModal';
import { ManageAvailabilityModal } from '../../components/admin/doctors/ManageAvailabilityModal';
import {
  initialAdminDoctors,
  adminDoctorSummaryStats,
} from '../../data/adminMockData';

const ITEMS_PER_PAGE = 8;

export const AdminDoctorsPage = () => {
  // Master doctors list
  const [doctors, setDoctors] = useState(initialAdminDoctors);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered doctors calculation
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        doc.name.toLowerCase().includes(q) ||
        doc.id.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.email.toLowerCase().includes(q) ||
        (doc.room && doc.room.toLowerCase().includes(q));

      const matchesDepartment =
        selectedDepartment === 'All Departments' ||
        doc.department === selectedDepartment;

      const matchesSpecialization =
        selectedSpecialization === 'All Specializations' ||
        doc.specialization === selectedSpecialization;

      const matchesStatus =
        selectedStatus === 'All Status' || doc.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSpecialization &&
        matchesStatus
      );
    });
  }, [doctors, searchQuery, selectedDepartment, selectedSpecialization, selectedStatus]);

  // Reset to page 1 on filter change
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All Departments');
    setSelectedSpecialization('All Specializations');
    setSelectedStatus('All Status');
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Action handlers
  const handleViewDoctor = (doc) => {
    setSelectedDoctor(doc);
    setIsViewModalOpen(true);
  };

  const handleEditDoctor = (doc) => {
    setSelectedDoctor(doc);
    setIsEditModalOpen(true);
  };

  const handleManageAvailability = (doc) => {
    setSelectedDoctor(doc);
    setIsAvailabilityModalOpen(true);
  };

  const handleSaveDoctor = (updatedDoc) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
    showToast(`Doctor ${updatedDoc.name} updated successfully.`);
  };

  const handleAddDoctor = (newDoc) => {
    setDoctors((prev) => [newDoc, ...prev]);
    showToast(`Doctor ${newDoc.name} added successfully with ID ${newDoc.id}.`);
    setCurrentPage(1);
  };

  const handleSaveAvailability = (docId, newStatus, newWorkingHours) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            status: newStatus,
            availability: newWorkingHours || d.availability,
          };
        }
        return d;
      })
    );
    showToast(`Doctor availability updated to ${newStatus}.`);
  };

  const handleChangeStatus = (docId, newStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: newStatus } : d))
    );
    showToast(`Doctor status updated to ${newStatus}.`);
  };

  // Summary counts
  const summaryCounts = useMemo(() => {
    return {
      totalDoctors: adminDoctorSummaryStats.totalDoctors,
      available: adminDoctorSummaryStats.available,
      inConsultation: adminDoctorSummaryStats.inConsultation,
      inactive: adminDoctorSummaryStats.inactive,
    };
  }, []);

  return (
    <AdminLayout
      title="Doctor Management"
      subtitle="Manage doctors, departments, specializations, schedules, and availability."
    >
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Toast Alert Notification */}
        {toastMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage.message}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Page Header Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Doctor Management
              </h2>
              <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                Phase 1 Admin
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Manage doctors, departments, specializations, schedules, and availability.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] active:scale-[0.99] transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              + Add Doctor
            </button>
          </div>
        </div>

        {/* ── 1. Summary Cards (4 Cards) ── */}
        <DoctorSummaryCards counts={summaryCounts} />

        {/* ── 2. Search & Filters ── */}
        <DoctorFilters
          searchQuery={searchQuery}
          setSearchQuery={handleFilterChange(setSearchQuery)}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={handleFilterChange(setSelectedDepartment)}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={handleFilterChange(setSelectedSpecialization)}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleFilterChange(setSelectedStatus)}
          onClearFilters={handleClearFilters}
          totalResults={filteredDoctors.length}
        />

        {/* ── 3. Doctor Table & Pagination ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 sm:p-5">
          {filteredDoctors.length > 0 ? (
            <>
              <DoctorTable
                doctors={paginatedDoctors}
                onViewDoctor={handleViewDoctor}
                onEditDoctor={handleEditDoctor}
                onManageAvailability={handleManageAvailability}
                onChangeStatus={handleChangeStatus}
              />

              <DoctorPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredDoctors.length}
              />
            </>
          ) : (
            <DoctorEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <ViewDoctorModal
        doctor={selectedDoctor}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={(doc) => {
          setSelectedDoctor(doc);
          setIsEditModalOpen(true);
        }}
        onManageAvailability={(doc) => {
          setSelectedDoctor(doc);
          setIsAvailabilityModalOpen(true);
        }}
      />

      <EditDoctorModal
        doctor={selectedDoctor}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveDoctor}
      />

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />

      <ManageAvailabilityModal
        doctor={selectedDoctor}
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
        onSaveAvailability={handleSaveAvailability}
      />
    </AdminLayout>
  );
};

export default AdminDoctorsPage;
