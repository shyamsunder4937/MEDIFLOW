import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Building2,
  RefreshCw,
  AlertCircle,
  X,
  Edit2,
  Activity,
} from 'lucide-react';
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  changeDoctorDepartment,
  changeDoctorWorkingStatus,
} from '../../services/doctorService';
import { getDepartments } from '../../services/departmentService';
import { getUsers } from '../../services/userService';

const WORKING_STATUS_OPTIONS = [
  { value: 'available', label: 'Available', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'busy', label: 'Busy', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'unavailable', label: 'Unavailable', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { value: 'on_leave', label: 'On Leave', color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export const DoctorManagement = ({ onUpdated }) => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    department_id: '',
    employee_id: '',
    specialization: '',
    qualification: '',
    license_number: '',
    room_number: '',
    phone: '',
    working_status: 'available',
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [docsData, deptsData] = await Promise.all([
        getDoctors(),
        getDepartments(),
      ]);

      setDoctors(docsData);
      setDepartments(deptsData);
      if (onUpdated) onUpdated();
    } catch (err) {
      setError(err.message || 'Failed to load doctors data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = async () => {
    setEditingDoc(null);
    setModalError(null);
    setFormData({
      user_id: '',
      department_id: departments[0]?.id || '',
      employee_id: '',
      specialization: '',
      qualification: '',
      license_number: '',
      room_number: '',
      phone: '',
      working_status: 'available',
    });

    // Fetch users with role doctor
    try {
      const users = await getUsers({ role: 'doctor' });
      // Exclude users already linked to a doctor profile
      const linkedUserIds = new Set(doctors.map((d) => d.user_id));
      const unlinked = users.filter((u) => !linkedUserIds.has(u.id));
      setEligibleUsers(unlinked);
      if (unlinked.length > 0) {
        setFormData((prev) => ({ ...prev, user_id: unlinked[0].id }));
      }
    } catch (err) {
      console.warn('Could not fetch doctor users:', err);
    }

    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setModalError(null);
    setFormData({
      user_id: doc.user_id,
      department_id: doc.department_id,
      employee_id: doc.employee_id || '',
      specialization: doc.specialization || '',
      qualification: doc.qualification || '',
      license_number: doc.license_number || '',
      room_number: doc.room_number || '',
      phone: doc.phone || '',
      working_status: doc.working_status || 'available',
    });
    setIsModalOpen(true);
  };

  const handleChangeWorkingStatus = async (doctor, newStatus) => {
    try {
      await changeDoctorWorkingStatus(doctor.id, newStatus);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to update working status');
    }
  };

  const handleChangeDepartment = async (doctor, newDeptId) => {
    if (!newDeptId || newDeptId === doctor.department_id) return;
    try {
      await changeDoctorDepartment(doctor.id, newDeptId);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to change doctor department');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingDoc && !formData.user_id) {
      setModalError('Please select a doctor user account');
      return;
    }
    if (!formData.department_id) {
      setModalError('Please select a department');
      return;
    }

    try {
      setSubmitting(true);
      setModalError(null);

      if (editingDoc) {
        await updateDoctor(editingDoc.id, formData);
      } else {
        await createDoctor(formData);
      }

      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      setModalError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const docName = doc.user?.full_name || doc.user?.name || '';
    const email = doc.user?.email || '';
    const spec = doc.specialization || '';
    const matchesSearch =
      docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === 'all' || doc.department_id === departmentFilter;

    const matchesStatus =
      statusFilter === 'all' || doc.working_status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-[#0F766E]" />
            Doctor Management
          </h2>
          <p className="text-sm text-[#64748B]">
            Configure doctor department assignments, specializations, and working statuses
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
            Add Doctor
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search by name, spec, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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

          {/* Working status filter */}
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

      {/* Doctors Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-6">Doctor</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Specialization</th>
                <th className="py-3.5 px-4">Room / Phone</th>
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
                      Loading doctors...
                    </div>
                  </td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64748B]">
                    No doctors registered yet. Click &quot;Add Doctor&quot; to link a doctor account.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => {
                  const statusObj =
                    WORKING_STATUS_OPTIONS.find((s) => s.value === doc.working_status) ||
                    WORKING_STATUS_OPTIONS[0];

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/75 transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#0F172A]">
                          {doc.user?.full_name || 'Dr. Unnamed'}
                        </div>
                        <div className="text-xs text-[#64748B]">{doc.user?.email}</div>
                        {doc.employee_id && (
                          <div className="text-[11px] font-mono text-[#0F766E] mt-0.5">
                            ID: {doc.employee_id}
                          </div>
                        )}
                      </td>

                      {/* Department with Quick Change Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={doc.department_id}
                          onChange={(e) => handleChangeDepartment(doc, e.target.value)}
                          className="text-xs font-semibold px-2 py-1 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0F766E] focus:outline-none"
                        >
                          {departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-xs font-semibold text-[#0F172A]">
                          {doc.specialization || 'General Physician'}
                        </div>
                        {doc.qualification && (
                          <div className="text-[11px] text-[#64748B]">
                            {doc.qualification}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 text-xs text-[#64748B]">
                        <div>{doc.room_number ? `Room ${doc.room_number}` : '—'}</div>
                        <div>{doc.phone || '—'}</div>
                      </td>

                      {/* Working Status Quick Change */}
                      <td className="py-4 px-4">
                        <select
                          value={doc.working_status || 'available'}
                          onChange={(e) => handleChangeWorkingStatus(doc, e.target.value)}
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
                          onClick={() => handleOpenEdit(doc)}
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

      {/* Modal: Create / Edit Doctor */}
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
              {editingDoc ? 'Edit Doctor Profile' : 'Assign Doctor Profile'}
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              {editingDoc
                ? 'Update credentials, department, or office details.'
                : 'Link an existing registered doctor user to a hospital department.'}
            </p>

            {modalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* If creating: select user */}
              {!editingDoc && (
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Select Doctor User Account *
                  </label>
                  {eligibleUsers.length === 0 ? (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                      No unassigned users with role <strong>doctor</strong> found. Create a doctor account first via sign-up with a doctor email.
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
                  Department *
                </label>
                <select
                  required
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                >
                  <option value="">Select a department...</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code || 'No Code'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialization & Qualification */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Interventional Cardiology"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({ ...formData, specialization: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MD, FACC"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({ ...formData, qualification: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                </div>
              </div>

              {/* Employee ID & License Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DOC-104"
                    value={formData.employee_id}
                    onChange={(e) =>
                      setFormData({ ...formData, employee_id: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MED-89104"
                    value={formData.license_number}
                    onChange={(e) =>
                      setFormData({ ...formData, license_number: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none font-mono text-xs"
                  />
                </div>
              </div>

              {/* Room & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Room / Cabin
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 204-B"
                    value={formData.room_number}
                    onChange={(e) =>
                      setFormData({ ...formData, room_number: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Direct Phone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +1 555-0192"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                </div>
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
                  disabled={submitting || (!editingDoc && eligibleUsers.length === 0)}
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0F766E] text-white hover:bg-[#115E59] transition shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingDoc ? 'Save Changes' : 'Assign Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
