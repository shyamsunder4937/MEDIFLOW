import React, { useState, useMemo } from 'react';
import { UserPlus, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { UserSummaryCards } from '../../components/admin/users/UserSummaryCards';
import { UserFilters } from '../../components/admin/users/UserFilters';
import { UserTable } from '../../components/admin/users/UserTable';
import { UserPagination } from '../../components/admin/users/UserPagination';
import { UserEmptyState } from '../../components/admin/users/UserEmptyState';
import { ViewUserModal } from '../../components/admin/users/ViewUserModal';
import { EditUserModal } from '../../components/admin/users/EditUserModal';
import { AddUserModal } from '../../components/admin/users/AddUserModal';
import { initialMockUsers, userManagementSummaryStats } from '../../data/adminMockData';

const ITEMS_PER_PAGE = 8;

export const AdminUsersPage = () => {
  // Master users list
  const [users, setUsers] = useState(initialMockUsers);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Search matching (name, email, phone, user id)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone && u.phone.toLowerCase().includes(q)) ||
        u.id.toLowerCase().includes(q) ||
        (u.patientId && u.patientId.toLowerCase().includes(q));

      // Role filter
      const matchesRole =
        selectedRole === 'All Roles' || u.role === selectedRole;

      // Status filter
      const matchesStatus =
        selectedStatus === 'All Status' || u.status === selectedStatus;

      // Department filter
      const matchesDepartment =
        selectedDepartment === 'All Departments' ||
        u.department === selectedDepartment;

      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });
  }, [users, searchQuery, selectedRole, selectedStatus, selectedDepartment]);

  // Reset to page 1 on filter changes
  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRole('All Roles');
    setSelectedStatus('All Status');
    setSelectedDepartment('All Departments');
    setCurrentPage(1);
  };

  // Paginated slice
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Action handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    showToast(`User ${updatedUser.name} updated successfully.`);
  };

  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    showToast(`User ${newUser.name} created successfully with ID ${newUser.id}.`);
    setCurrentPage(1);
  };

  const handleChangeStatus = (userId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: newStatus,
            loginAccess: newStatus === 'Active' ? 'Enabled' : 'Disabled',
          };
        }
        return u;
      })
    );
    showToast(`Account status changed to ${newStatus}.`);
  };

  // Dynamic summary stats computation based on current master list
  const summaryCounts = useMemo(() => {
    return {
      totalUsers: userManagementSummaryStats.totalUsers,
      patients: userManagementSummaryStats.patients,
      doctors: userManagementSummaryStats.doctors,
      staff: userManagementSummaryStats.staff,
    };
  }, []);

  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage user accounts, roles, access, and account status."
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
                User Management
              </h2>
              <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                Phase 1 Admin
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Manage user accounts, roles, access, and account status.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#115E59] active:scale-[0.99] transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              + Add User
            </button>
          </div>
        </div>

        {/* ── 1. Summary Cards (4 Cards) ── */}
        <UserSummaryCards counts={summaryCounts} />

        {/* ── 2. Search & Filters ── */}
        <UserFilters
          searchQuery={searchQuery}
          setSearchQuery={handleFilterChange(setSearchQuery)}
          selectedRole={selectedRole}
          setSelectedRole={handleFilterChange(setSelectedRole)}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleFilterChange(setSelectedStatus)}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={handleFilterChange(setSelectedDepartment)}
          onClearFilters={handleClearFilters}
          totalResults={filteredUsers.length}
        />

        {/* ── 3. User Table & Pagination ── */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-4 sm:p-5">
          {filteredUsers.length > 0 ? (
            <>
              <UserTable
                users={paginatedUsers}
                onViewUser={handleViewUser}
                onEditUser={handleEditUser}
                onChangeStatus={handleChangeStatus}
              />

              <UserPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={filteredUsers.length}
              />
            </>
          ) : (
            <UserEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <ViewUserModal
        user={selectedUser}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsEditModalOpen(true);
        }}
      />

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </AdminLayout>
  );
};

export default AdminUsersPage;
