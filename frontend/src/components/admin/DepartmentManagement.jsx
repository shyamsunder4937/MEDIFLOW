import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  RefreshCw,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  toggleDepartmentStatus,
} from '../../services/departmentService';

export const DepartmentManagement = ({ onUpdated }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    status: 'active',
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments({ includeInactive: true });
      setDepartments(data);
      if (onUpdated) onUpdated();
    } catch (err) {
      setError(err.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      location: '',
      status: 'active',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name || '',
      code: dept.code || '',
      description: dept.description || '',
      location: dept.location || '',
      status: dept.status || 'active',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (dept) => {
    const newStatus = dept.status === 'active' ? 'inactive' : 'active';
    try {
      await toggleDepartmentStatus(dept.id, newStatus);
      await fetchDepartments();
    } catch (err) {
      alert(err.message || 'Failed to update department status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError('Department name is required');
      return;
    }

    try {
      setSubmitting(true);
      setModalError(null);

      if (editingDept) {
        await updateDepartment(editingDept.id, formData);
      } else {
        await createDepartment(formData);
      }

      setIsModalOpen(false);
      await fetchDepartments();
    } catch (err) {
      setModalError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDepts = departments.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.code && d.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.location && d.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0F766E]" />
            Department Management
          </h2>
          <p className="text-sm text-[#64748B]">
            Configure and maintain hospital clinical and operational departments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDepartments}
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
            Add Department
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#64748B] font-medium">Status:</span>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['all', 'active', 'inactive'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition ${
                  statusFilter === st
                    ? 'bg-white text-[#0F766E] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {st}
              </button>
            ))}
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64748B]">
                    <div className="inline-flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#0F766E]" />
                      Loading departments...
                    </div>
                  </td>
                </tr>
              ) : filteredDepts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64748B]">
                    No departments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredDepts.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/75 transition">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-[#0F172A]">{dept.name}</div>
                      {dept.description && (
                        <div className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                          {dept.description}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-[#0F766E]">
                      {dept.code || '—'}
                    </td>
                    <td className="py-4 px-4 text-[#64748B] text-xs">
                      {dept.location || '—'}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          dept.status === 'active'
                            ? 'bg-[#CCFBF1] text-[#0F766E]'
                            : 'bg-slate-100 text-[#64748B]'
                        }`}
                      >
                        {dept.status === 'active' ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        <span className="capitalize">{dept.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(dept)}
                          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-slate-100 transition"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(dept)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                            dept.status === 'active'
                              ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                              : 'border-teal-200 text-[#0F766E] hover:bg-teal-50'
                          }`}
                        >
                          {dept.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#E2E8F0] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-[#94A3B8] hover:text-[#0F172A] transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              {editingDept ? 'Edit Department' : 'Create New Department'}
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              {editingDept
                ? 'Update existing department information.'
                : 'Add a new clinical or administrative department to the hospital.'}
            </p>

            {modalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiology"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CARD"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wing A, 2nd Floor"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of department responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
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
                  disabled={submitting}
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0F766E] text-white hover:bg-[#115E59] transition shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingDept ? 'Save Changes' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
