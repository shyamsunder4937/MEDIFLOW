import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
  Building2,
} from 'lucide-react';
import { DepartmentStatusBadge } from './DepartmentStatusBadge';

const STATUS_CONFIGS = [
  {
    id: 'Active',
    label: 'Active (Operational)',
    description: 'Department is fully open, taking patient registrations and OPD consultations.',
    icon: CheckCircle2,
    color: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    activeBg: 'bg-emerald-50/90',
  },
  {
    id: 'Maintenance',
    label: 'Maintenance / Partial Service',
    description: 'Department undergoing equipment calibration, sanitation, or technical overhaul.',
    icon: Wrench,
    color: 'text-amber-700',
    borderColor: 'border-amber-300',
    activeBg: 'bg-amber-50/90',
  },
  {
    id: 'Inactive',
    label: 'Inactive (Closed)',
    description: 'Department is temporarily closed or deactivated for incoming queues.',
    icon: Clock,
    color: 'text-slate-600',
    borderColor: 'border-slate-300',
    activeBg: 'bg-slate-100',
  },
];

export const ManageDepartmentStatusModal = ({
  department,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [statusNote, setStatusNote] = useState('');

  useEffect(() => {
    if (department) {
      setSelectedStatus(department.status || 'Active');
      setStatusNote('');
    }
  }, [department, isOpen]);

  if (!isOpen || !department) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(department.id, selectedStatus, statusNote);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-status-modal-title"
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="manage-status-modal-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Manage Department Status
              </h3>
              <p className="text-xs text-[#64748B]">
                Configure operational state for <span className="font-semibold text-[#0F766E]">{department.name}</span> ({department.id})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Current Status Display */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#64748B]" />
              <span className="font-semibold text-[#0F172A]">{department.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#64748B]">Current:</span>
              <DepartmentStatusBadge status={department.status} />
            </div>
          </div>

          {/* Status Selection Cards */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-2">
              Select New Operational Status <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2.5">
              {STATUS_CONFIGS.map((cfg) => {
                const isSelected = selectedStatus === cfg.id;
                const Icon = cfg.icon;

                return (
                  <label
                    key={cfg.id}
                    onClick={() => setSelectedStatus(cfg.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? `${cfg.activeBg} ${cfg.borderColor} ring-1 ring-offset-0 ring-[#0F766E]/40 shadow-xs`
                        : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="departmentStatus"
                      value={cfg.id}
                      checked={isSelected}
                      onChange={() => setSelectedStatus(cfg.id)}
                      className="mt-0.5 text-[#0F766E] focus:ring-[#0F766E]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#0F172A]">
                        <Icon className={`h-4 w-4 ${cfg.color}`} />
                        <span>{cfg.label}</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
                        {cfg.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Optional Administrative Note */}
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Audit Note / Reason for Status Change <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent resize-none"
              placeholder="e.g. Scheduled bi-weekly maintenance of MRI equipment or room sterilization..."
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#334155] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" />
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageDepartmentStatusModal;
