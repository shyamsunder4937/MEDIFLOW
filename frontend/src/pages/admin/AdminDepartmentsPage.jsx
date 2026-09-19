import React, { useState, useMemo } from 'react';
import { Building2, CheckCircle2, PlusCircle } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { DepartmentSummaryCards } from '../../components/admin/departments/DepartmentSummaryCards';
import { DepartmentFilters } from '../../components/admin/departments/DepartmentFilters';
import { DepartmentTable } from '../../components/admin/departments/DepartmentTable';
import { DepartmentPagination } from '../../components/admin/departments/DepartmentPagination';
import { DepartmentEmptyState } from '../../components/admin/departments/DepartmentEmptyState';
import { ViewDepartmentModal } from '../../components/admin/departments/ViewDepartmentModal';
import { EditDepartmentModal } from '../../components/admin/departments/EditDepartmentModal';
import { AddDepartmentModal } from '../../components/admin/departments/AddDepartmentModal';
import { ManageDepartmentStatusModal } from '../../components/admin/departments/ManageDepartmentStatusModal';
import {
  initialAdminDepartments,
  adminDepartmentSummaryStats,
} from '../../data/adminMockData';

const ITEMS_PER_PAGE = 8;

export const AdminDepartmentsPage = () => {
  // Master departments state
  const [departments, setDepartments] = useState(initialAdminDepartments);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Toast / feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered departments calculation
  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        dept.name.toLowerCase().includes(q) ||
        dept.id.toLowerCase().includes(q) ||
        (dept.leadDoctor && dept.leadDoctor.toLowerCase().includes(q)) ||
        (dept.floor && dept.floor.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === 'All' || dept.status === selectedStatus;

      const matchesType =
        selectedType === 'All' || dept.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [departments, searchQuery, selectedStatus, selectedType]);

  // Reset to page 1 on filter changes
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedType('All');
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDepartments = filteredDepartments.slice(startIndex, endIndex);

  // Action handlers
  const handleViewDepartment = (dept) => {
    setSelectedDepartment(dept);
    setIsViewModalOpen(true);
  };

  const handleEditDepartment = (dept) => {
    setSelectedDepartment(dept);
    setIsEditModalOpen(true);
  };

  const handleManageStatus = (dept) => {
    setSelectedDepartment(dept);
    setIsStatusModalOpen(true);
  };

  const handleSaveDepartment = (updatedDept) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === updatedDept.id ? updatedDept : d))
    );
    showToast(`Department "${updatedDept.name}" updated successfully.`);
  };

  const handleAddDepartment = (newDept) => {
    setDepartments((prev) => [newDept, ...prev]);
    showToast(`Department "${newDept.name}" added successfully with ID ${newDept.id}.`);
    setCurrentPage(1);
  };

  const handleUpdateStatus = (deptId, newStatus, note) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === deptId ? { ...d, status: newStatus } : d))
    );
    const noteText = note ? ` (${note})` : '';
    showToast(`Department status updated to ${newStatus}${noteText}.`);
  };

  const handleChangeStatusDirect = (deptId, newStatus) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === deptId ? { ...d, status: newStatus } : d))
    );
    showToast(`Department status changed to ${newStatus}.`);
  };

  // Dynamic summary counts based on active state
  const summaryCounts = useMemo(() => {
    const total = departments.length;
    const active = departments.filter((d) => d.status === 'Active').length;
    const assignedDoctors = departments.reduce((acc, d) => acc + (Number(d.doctorsCount) || 0), 0);
    const attention = departments.filter((d) => d.status === 'Maintenance' || d.status === 'Inactive' || d.waitingCount > 6).length;

    return {
      totalDepartments: total.toString(),
      activeDepartments: active.toString(),
      doctorsAssigned: assignedDoctors.toString(),
      requiringAttention: attention.toString(),
    };
  }, [departments]);

  return (
    <AdminLayout
      title="Department Management"
      subtitle="Manage hospital departments, assigned doctors, capacity, and operational status."
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
              className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
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
                Department Management
              </h2>
              <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                Phase 1 Admin
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Manage hospital departments, assigned doctors, capacity, and operational status.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] active:scale-[0.99] transition-all shadow-xs cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              + Add Department
            </button>
          </div>
        </div>

        {/* ── 1. Summary Cards (4 Cards) ── */}
        <DepartmentSummaryCards counts={summaryCounts} />

        {/* ── 2. Search & Filters ── */}
        <DepartmentFilters
          searchQuery={searchQuery}
          setSearchQuery={handleFilterChange(setSearchQuery)}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleFilterChange(setSelectedStatus)}
          selectedType={selectedType}
          setSelectedType={handleFilterChange(setSelectedType)}
          onClearFilters={handleClearFilters}
          totalResults={filteredDepartments.length}
        />

        {/* ── 3. Department Table & Pagination ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 sm:p-5">
          {filteredDepartments.length > 0 ? (
            <>
              <DepartmentTable
                departments={paginatedDepartments}
                onViewDepartment={handleViewDepartment}
                onEditDepartment={handleEditDepartment}
                onManageStatus={handleManageStatus}
                onChangeStatusDirect={handleChangeStatusDirect}
              />

              <DepartmentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredDepartments.length}
              />
            </>
          ) : (
            <DepartmentEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <ViewDepartmentModal
        department={selectedDepartment}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={(dept) => {
          setSelectedDepartment(dept);
          setIsEditModalOpen(true);
        }}
        onManageStatus={(dept) => {
          setSelectedDepartment(dept);
          setIsStatusModalOpen(true);
        }}
      />

      <EditDepartmentModal
        department={selectedDepartment}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveDepartment}
      />

      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDepartment={handleAddDepartment}
      />

      <ManageDepartmentStatusModal
        department={selectedDepartment}
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </AdminLayout>
  );
};

export default AdminDepartmentsPage;
