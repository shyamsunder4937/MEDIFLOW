import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Building2,
  RefreshCw,
  AlertCircle,
  X,
  Edit2,
} from 'lucide-react';
import {
  getStaff,
  createStaff,
  updateStaff,
  changeStaffDepartment,
  changeStaffWorkingStatus,
} from '../../services/staffService';
import { getDepartments } from '../../services/departmentService';
import { getUsers } from '../../services/userService';

const WORKING_STATUS_OPTIONS = [
  { value: 'available', label: 'Available', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'busy', label: 'Busy', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'unavailable', label: 'Unavailable', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { value: 'on_leave', label: 'On Leave', color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const COMMON_STAFF_TYPES = [
  'nurse',
  'receptionist',
  'lab_staff',
  'pharmacy_staff',
  'coordinator',
  'support',
  'administrator',
];

export const StaffManagement = ({ onUpdated }) => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    department_id: '',
    employee_id: '',
    staff_type: 'nurse',
    phone: '',
    working_status: 'available',
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [staffData, deptsData] = await Promise.all([
        getStaff(),
        getDepartments(),
      ]);

      setStaffList(staffData);
      setDepartments(deptsData);
      if (onUpdated) onUpdated();
    } catch (err) {
      setError(err.message || 'Failed to load staff data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = async () => {
    setEditingStaff(null);
    setModalError(null);
    setFormData({
      user_id: '',
      department_id: departments[0]?.id || '',
      employee_id: '',
      staff_type: 'nurse',
      phone: '',
      working_status: 'available',
    });

    try {
      const users = await getUsers({ role: 'staff' });
      const linkedUserIds = new Set(staffList.map((s) => s.user_id));
      const unlinked = users.filter((u) => !linkedUserIds.has(u.id));
      setEligibleUsers(unlinked);
      if (unlinked.length > 0) {
        setFormData((prev) => ({ ...prev, user_id: unlinked[0].id }));
      }
    } catch (err) {
      console.warn('Could not fetch staff users:', err);
    }

    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingStaff(member);
    setModalError(null);
    setFormData({
      user_id: member.user_id,
      department_id: member.department_id || '',
      employee_id: member.employee_id || '',
      staff_type: member.staff_type || 'nurse',
      phone: member.phone || '',
      working_status: member.working_status || 'available',
    });
    setIsModalOpen(true);
  };

  const handleChangeWorkingStatus = async (member, newStatus) => {
    try {
      await changeStaffWorkingStatus(member.id, newStatus);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update working status');
    }
  };

  const handleChangeDepartment = async (member, newDeptId) => {
    if (newDeptId === member.department_id) return;
    try {
      await changeStaffDepartment(member.id, newDeptId || null);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to change staff department');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingStaff && !formData.user_id) {
      setModalError('Please select a staff user account');
      return;
    }

    try {
      setSubmitting(true);
      setModalError(null);

      const payload = {
        ...formData,
        department_id: formData.department_id || null,
      };

      if (editingStaff) {
        await updateStaff(editingStaff.id, payload);
      } else {
        await createStaff(payload);
      }

      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      setModalError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStaff = staffList.filter((member) => {
    const name = member.user?.full_name || member.user?.name || '';
    const email = member.user?.email || '';
    const empId = member.employee_id || '';
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === 'all' || member.department_id === departmentFilter;

    const matchesStatus =
      statusFilter === 'all' || member.working_status === statusFilter;

    const matchesType =
      typeFilter === 'all' || member.staff_type === typeFilter;

    return matchesSearch && matchesDept && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F766E]" />
            Hospital Staff Management
          </h2>
          <p className="text-sm text-[#64748B]">
            Configure nursing, reception, lab, and operational staff department assignments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] transition"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#115E59] transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Department filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#64748B] font-medium">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#64748B] font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none capitalize"
            >
              <option value="all">All Types</option>
              {COMMON_STAFF_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#64748B] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none capitalize"
            >
              <option value="all">All Statuses</option>
              {WORKING_STATUS_OPTIONS.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-6">Staff Member</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Staff Role / Type</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Working Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64748B]">
                    <div className="inline-flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#0F766E]" />
                      Loading staff members...
                    </div>
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64748B]">
                    No staff members registered yet. Click &quot;Add Staff Member&quot; to link an account.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((member) => {
                  const statusObj =
                    WORKING_STATUS_OPTIONS.find((s) => s.value === member.working_status) ||
                    WORKING_STATUS_OPTIONS[0];

                  return (
                    <tr key={member.id} className="hover:bg-slate-50/75 transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#0F172A]">
                          {member.user?.full_name || 'Staff Member'}
                        </div>
                        <div className="text-xs text-[#64748B]">{member.user?.email}</div>
                        {member.employee_id && (
                          <div className="text-[11px] font-mono text-[#0F766E] mt-0.5">
                            ID: {member.employee_id}
                          </div>
                        )}
                      </td>

                      {/* Department with Quick Change Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={member.department_id || ''}
                          onChange={(e) => handleChangeDepartment(member, e.target.value)}
                          className="text-xs font-semibold px-2 py-1 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0F766E] focus:outline-none"
                        >
                          <option value="">(No Department)</option>
                          {departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4 font-medium text-xs text-[#0F172A] capitalize">
                        {member.staff_type ? member.staff_type.replace('_', ' ') : 'General Staff'}
                      </td>

                      <td className="py-4 px-4 text-xs text-[#64748B]">
                        {member.phone || member.user?.phone || '—'}
                      </td>

                      {/* Working Status Quick Change */}
                      <td className="py-4 px-4">
                        <select
                          value={member.working_status || 'available'}
                          onChange={(e) => handleChangeWorkingStatus(member, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none capitalize transition ${statusObj.color}`}
                        >
                          {WORKING_STATUS_OPTIONS.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-slate-100 transition"
                          title="Edit Profile"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create / Edit Staff */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#E2E8F0] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-[#94A3B8] hover:text-[#0F172A] transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              {editingStaff ? 'Edit Staff Profile' : 'Assign Staff Profile'}
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              {editingStaff
                ? 'Update staff role, department, or contact details.'
                : 'Link an existing registered staff user to a department.'}
            </p>

            {modalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* If creating: select user */}
              {!editingStaff && (
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Select Staff User Account *
                  </label>
                  {eligibleUsers.length === 0 ? (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                      No unassigned users with role <strong>staff</strong> found. Create a staff account first via sign-up with a staff email.
                    </div>
                  ) : (
                    <select
                      required
                      value={formData.user_id}
                      onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                    >
                      {eligibleUsers.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.full_name || u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Department
                </label>
                <select
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                >
                  <option value="">(None / General Hospital Staff)</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code || 'No Code'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Staff Type & Employee ID */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Staff Role / Type
                  </label>
                  <input
                    type="text"
                    list="staff-types-list"
                    placeholder="e.g. nurse, receptionist"
                    value={formData.staff_type}
                    onChange={(e) => setFormData({ ...formData, staff_type: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                  <datalist id="staff-types-list">
                    {COMMON_STAFF_TYPES.map((t) => (
                      <option key={t} value={t} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. STF-201"
                    value={formData.employee_id}
                    onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none font-mono text-xs"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1 555-0812"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                />
              </div>

              {/* Working Status */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Initial Working Status
                </label>
                <select
                  value={formData.working_status}
                  onChange={(e) =>
                    setFormData({ ...formData, working_status: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none capitalize"
                >
                  {WORKING_STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || (!editingStaff && eligibleUsers.length === 0)}
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0F766E] text-white hover:bg-[#115E59] transition shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingStaff ? 'Save Changes' : 'Assign Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
