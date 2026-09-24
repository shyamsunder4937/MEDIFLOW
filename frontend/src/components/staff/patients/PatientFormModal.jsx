import React, { useState } from 'react';
import { X, UserPlus, Edit3, AlertCircle, Building2, User, Phone, MapPin } from 'lucide-react';

const getInitialFormData = (patient) => {
  if (patient) {
    return {
      firstName: patient.firstName || patient.name?.split(' ')[0] || '',
      lastName: patient.lastName || patient.name?.split(' ').slice(1).join(' ') || '',
      dob: patient.dob || '',
      age: patient.age !== undefined ? String(patient.age) : '',
      gender: patient.gender || 'Male',
      phone: patient.phone || '',
      email: patient.email || '',
      address: patient.address || '',
      emergencyContactName: patient.emergencyContactName || '',
      emergencyContactPhone: patient.emergencyContactPhone || '',
      emergencyRelation: patient.emergencyRelation || 'Spouse',
      department: patient.department || 'General Medicine',
      doctor: patient.doctor || 'Dr. Kumar',
      status: patient.status || 'Waiting',
      todayAppointment: patient.todayAppointment || '10:00 AM',
      bloodGroup: patient.bloodGroup || 'O+',
    };
  }
  return {
    firstName: '',
    lastName: '',
    dob: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: 'Spouse',
    department: 'General Medicine',
    doctor: 'Dr. Kumar',
    status: 'Waiting',
    todayAppointment: '10:00 AM',
    bloodGroup: 'O+',
  };
};

const PatientFormInner = ({
  onClose,
  onSubmit,
  patientToEdit,
}) => {
  const isEditMode = Boolean(patientToEdit);
  const [formData, setFormData] = useState(() => getInitialFormData(patientToEdit));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle department change to automatically recommend doctor
  const handleDepartmentChange = (dept) => {
    let defaultDoc = 'Dr. Kumar';
    if (dept === 'Cardiology') defaultDoc = 'Dr. Sharma';
    if (dept === 'Pediatrics') defaultDoc = 'Dr. Priya';
    if (dept === 'Orthopedics') defaultDoc = 'Dr. Ahmed';
    if (dept === 'Dermatology') defaultDoc = 'Dr. Iyer';

    setFormData((prev) => ({
      ...prev,
      department: dept,
      doctor: defaultDoc,
    }));
  };

  // Auto calculate age from DOB if entered
  const handleDobChange = (dobValue) => {
    let calculatedAge = formData.age;
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age >= 0 && age <= 120) {
        calculatedAge = String(age);
      }
    }
    setFormData((prev) => ({
      ...prev,
      dob: dobValue,
      age: calculatedAge,
    }));
    if (errors.age) {
      setErrors((prev) => ({ ...prev, age: undefined }));
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!formData.age || isNaN(formData.age) || Number(formData.age) < 0 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (0–120).';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      age: Number(formData.age),
      emergencyContact: formData.emergencyContactName
        ? `${formData.emergencyContactName} (${formData.emergencyRelation}) - ${formData.emergencyContactPhone || formData.phone}`
        : 'None recorded',
    };

    setTimeout(() => {
      onSubmit(payload);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div
      className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 animate-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Modal Header ── */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 shadow-2xs">
            {isEditMode ? <Edit3 className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#17221B]">
              {isEditMode ? 'Edit Patient Information' : 'Register New Patient'}
            </h2>
            <p className="text-xs text-[#64748B]">
              {isEditMode
                ? `Updating hospital demographic file for ${patientToEdit?.id || 'Patient'}`
                : 'Enter patient demographic and admission details for OPD registration.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 hover:text-[#17221B] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Form Body ── */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto">
        {/* Section: Personal Information */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-[#15803D]">
            <User className="h-3.5 w-3.5" />
            <span>Personal Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                }}
                placeholder="e.g. Rahul"
                className={`w-full rounded-lg border px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                  errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}
              />
              {errors.firstName && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                }}
                placeholder="e.g. Kumar"
                className={`w-full rounded-lg border px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                  errors.lastName ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}
              />
              {errors.lastName && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleDobChange(e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs sm:text-sm text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all"
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) => {
                    setFormData({ ...formData, age: e.target.value });
                    if (errors.age) setErrors({ ...errors, age: undefined });
                  }}
                  placeholder="32"
                  className={`w-full rounded-lg border px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                    errors.age ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                  }`}
                />
                {errors.age && (
                  <p className="text-[10px] text-red-600 mt-1 font-medium">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17221B] mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Blood Group
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs sm:text-sm text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="9876543210"
                className={`w-full rounded-lg border px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}
              />
              {errors.phone && (
                <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section: Contact & Address */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-[#15803D]">
            <MapPin className="h-3.5 w-3.5" />
            <span>Contact & Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="patient@example.com"
                className={`w-full rounded-lg border px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all ${
                  errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#E2E8F0] bg-[#F8FAFC]'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Residential Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. 14, Gandhi Road, Anna Nagar, Chennai"
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section: Emergency Contact */}
        <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#17221B]">
            <Phone className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Emergency Contact (Optional)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
              placeholder="Contact Name (e.g. Sunita)"
              className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#17221B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D]"
            />
            <input
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
              placeholder="Emergency Phone"
              className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#17221B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D]"
            />
            <select
              value={formData.emergencyRelation}
              onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
              className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#17221B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] cursor-pointer"
            >
              <option value="Spouse">Spouse</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Daughter">Daughter</option>
              <option value="Son">Son</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>
        </div>

        {/* Section: Department & Visit Assignment */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-[#15803D]">
            <Building2 className="h-3.5 w-3.5" />
            <span>Department & OPD Admission</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Assigned Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
              >
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Consulting Doctor
              </label>
              <select
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
              >
                <option value="Dr. Kumar">Dr. Kumar (Gen Med)</option>
                <option value="Dr. Sharma">Dr. Sharma (Cardio)</option>
                <option value="Dr. Priya">Dr. Priya (Pediatrics)</option>
                <option value="Dr. Ahmed">Dr. Ahmed (Ortho)</option>
                <option value="Dr. Iyer">Dr. Iyer (Dermatology)</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-[#17221B] mb-1">
                Queue / Visit Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] transition-all cursor-pointer"
              >
                <option value="Waiting">Waiting in OPD</option>
                <option value="Upcoming">Upcoming Appointment</option>
                <option value="In Consultation">In Consultation</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#17221B] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isEditMode ? (
              <>
                <Edit3 className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving Changes…' : 'Save Changes'}</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>{isSubmitting ? 'Registering…' : 'Register Patient'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export const PatientFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  patientToEdit = null,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <PatientFormInner
        key={patientToEdit ? `edit-${patientToEdit.id}` : 'new-patient'}
        onClose={onClose}
        onSubmit={onSubmit}
        patientToEdit={patientToEdit}
      />
    </div>
  );
};

export default PatientFormModal;
