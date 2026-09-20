import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { getCurrentPatientProfile, updatePatientProfile } from '../../services/patientService';
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Shield,
  AlertTriangle,
  FileText,
  Edit3,
  CheckCircle2,
  Lock,
  Stethoscope,
  Building2,
  Sparkles,
  HelpCircle,
  Settings,
  Bell,
  Sliders,
  ChevronRight,
  Info,
  X,
  Save,
  Loader2,
} from 'lucide-react';

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Load patient profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!isLoaded) return;
      
      try {
        setLoading(true);
        setError(null);
        const profile = await getCurrentPatientProfile();
        setPatientData(profile);
      } catch (err) {
        console.error('Failed to load patient profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isLoaded]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenEdit = () => {
    if (!patientData) return;
    
    setEditFormData({
      phone: patientData.phone || '',
      dateOfBirth: patientData.date_of_birth || '',
      gender: patientData.gender || '',
      bloodGroup: patientData.blood_group || '',
      address: patientData.address || '',
      city: patientData.city || '',
      state: patientData.state || '',
      postalCode: patientData.postal_code || '',
      emergencyContactName: patientData.emergency_contact_name || '',
      emergencyContactPhone: patientData.emergency_contact_phone || '',
      emergencyContactRelation: patientData.emergency_contact_relation || '',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const updates = {
        phone: editFormData.phone,
        date_of_birth: editFormData.dateOfBirth,
        gender: editFormData.gender,
        blood_group: editFormData.bloodGroup,
        address: editFormData.address,
        city: editFormData.city,
        state: editFormData.state,
        postal_code: editFormData.postalCode,
        emergency_contact_name: editFormData.emergencyContactName,
        emergency_contact_phone: editFormData.emergencyContactPhone,
        emergency_contact_relation: editFormData.emergencyContactRelation,
      };
      
      const updatedProfile = await updatePatientProfile(null, updates);
      setPatientData(updatedProfile);
      setIsEditModalOpen(false);
      showToast('Profile updated successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      showToast(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <PatientLayout
        title="My Profile"
        subtitle="Manage your personal details, emergency contact, and medical records."
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#0F766E] mx-auto" />
            <p className="text-sm text-[#64748B]">Loading your profile...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Error state
  if (error || !patientData) {
    return (
      <PatientLayout
        title="My Profile"
        subtitle="Manage your personal details, emergency contact, and medical records."
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3 max-w-md">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-[#0F172A]">Unable to Load Profile</h3>
            <p className="text-sm text-[#64748B]">{error || 'Patient profile not found'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#115E59] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Computed values
  const age = calculateAge(patientData.date_of_birth);
  const formattedDob = formatDate(patientData.date_of_birth);
  const fullAddress = [patientData.address, patientData.city, patientData.state, patientData.postal_code]
    .filter(Boolean)
    .join(', ') || 'Not provided';

  return (
    <PatientLayout
      title="My Profile"
      subtitle="Manage your personal details, emergency contact, and medical records."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#CCFBF1] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. Profile Identity Header Card ── */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-black text-2xl shadow-inner flex-shrink-0 border-2 border-[#0F766E]/20">
                {(patientData.fullName || 'P').charAt(0).toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F766E] text-white text-[10px] font-bold border-2 border-white shadow-xs" title="Verified Patient">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  {patientData.fullName || 'Patient'}
                </h1>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Patient
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                <span className="font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                  ID: {patientData.patient_id || 'N/A'}
                </span>
                {age && (
                  <>
                    <span>•</span>
                    <span>{age} Years</span>
                  </>
                )}
                {patientData.gender && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{patientData.gender.replace('_', ' ')}</span>
                  </>
                )}
                {patientData.blood_group && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-[#0F172A] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded text-rose-700">
                      Blood Group: {patientData.blood_group}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleOpenEdit}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </section>

        {/* ── 2. Two-Column Desktop Grid: Personal Details & Emergency Contact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <UserCircle className="h-4.5 w-4.5 text-[#0F766E]" />
                Personal Information
              </h2>
              <span className="text-[11px] text-[#64748B] font-medium">Hospital KYC Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {formattedDob && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[#64748B] block text-[11px] font-medium">Date of Birth</span>
                  <span className="font-bold text-[#0F172A] mt-0.5 block">{formattedDob}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Patient ID</span>
                <span className="font-mono font-bold text-[#0F766E] mt-0.5 block">{patientData.patient_id || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Primary Phone</span>
                <span className="font-semibold text-[#0F172A] mt-0.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                  {patientData.phone || patientData.userPhone || 'Not provided'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Email Address</span>
                <span className="font-semibold text-[#0F172A] mt-0.5 flex items-center gap-1.5 truncate">
                  <Mail className="h-3.5 w-3.5 text-[#0F766E] flex-shrink-0" />
                  <span className="truncate">{patientData.email || 'Not provided'}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                <span className="text-[#64748B] block text-[11px] font-medium">Residential Address</span>
                <span className="font-medium text-[#0F172A] mt-0.5 flex items-start gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E] flex-shrink-0 mt-0.5" />
                  <span>{fullAddress}</span>
                </span>
              </div>
            </div>
          </section>

          {/* Emergency Contact & Attending Care */}
          <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Heart className="h-4.5 w-4.5 text-rose-600" />
                Emergency Contact & Care Team
              </h2>
              <span className="text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">24/7 Helpline</span>
            </div>

            <div className="space-y-3.5 text-xs">
              {(patientData.emergency_contact_name || patientData.emergency_contact_phone) && (
                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-rose-800 font-semibold uppercase tracking-wider">
                      Primary Emergency Contact
                    </div>
                    <div className="font-bold text-[#0F172A] text-sm mt-0.5">
                      {patientData.emergency_contact_name || 'Not provided'}
                      {patientData.emergency_contact_relation && ` (${patientData.emergency_contact_relation})`}
                    </div>
                    {patientData.emergency_contact_phone && (
                      <div className="text-[#64748B] flex items-center gap-1.5 mt-1 font-medium">
                        <Phone className="h-3.5 w-3.5 text-rose-600" />
                        <span>{patientData.emergency_contact_phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                    <Heart className="h-5 w-5" />
                  </div>
                </div>
              )}

              {!patientData.emergency_contact_name && !patientData.emergency_contact_phone && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="text-[#64748B]">No emergency contact information provided</p>
                  <button
                    onClick={handleOpenEdit}
                    className="mt-2 text-xs text-[#0F766E] font-semibold hover:underline"
                  >
                    Add Emergency Contact
                  </button>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-semibold text-[#64748B]">Account Status</span>
                <div className="font-medium text-[#0F172A] flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-[#0F766E]" />
                  <span className="capitalize">{patientData.userStatus || 'Active'}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── 3. Account Security & Clerk Authentication ── */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <Lock className="h-4.5 w-4.5 text-[#0F766E]" />
              Account Security & Authentication
            </h2>
            <span className="text-[11px] text-[#64748B]">HIPAA Compliant</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-11 w-11 rounded-xl ring-2 ring-[#0F766E]',
                  },
                }}
              />
              <div className="text-xs">
                <div className="font-bold text-[#0F172A]">{patientData.fullName || 'Patient'}</div>
                <div className="text-[#64748B] mt-0.5">{patientData.email || 'Email not available'}</div>
                <div className="text-[10px] text-[#0F766E] font-semibold mt-0.5">
                  Click avatar to manage passwords, two-factor authentication, or connected devices.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Edit Profile Modal ── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Edit3 className="h-4.5 w-4.5 text-[#0F766E]" />
                Update Profile Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="h-7 w-7 flex items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors"
                disabled={saving}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Basic Information */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0F172A]">Basic Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={editFormData.dateOfBirth}
                      onChange={(e) => setEditFormData({ ...editFormData, dateOfBirth: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Gender</label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Blood Group</label>
                    <select
                      value={editFormData.bloodGroup}
                      onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-3 pt-3 border-t border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#0F172A]">Address</h4>
                
                <div>
                  <label className="font-semibold text-[#0F172A] block mb-1">Street Address</label>
                  <textarea
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">City</label>
                    <input
                      type="text"
                      value={editFormData.city}
                      onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">State</label>
                    <input
                      type="text"
                      value={editFormData.state}
                      onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={editFormData.postalCode}
                      onChange={(e) => setEditFormData({ ...editFormData, postalCode: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-3 pt-3 border-t border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#0F172A]">Emergency Contact</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={editFormData.emergencyContactName}
                      onChange={(e) => setEditFormData({ ...editFormData, emergencyContactName: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={editFormData.emergencyContactPhone}
                      onChange={(e) => setEditFormData({ ...editFormData, emergencyContactPhone: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="Emergency contact phone"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#0F172A] block mb-1">Relationship</label>
                    <input
                      type="text"
                      value={editFormData.emergencyContactRelation}
                      onChange={(e) => setEditFormData({ ...editFormData, emergencyContactRelation: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PatientLayout>
  );
};

export const PatientSettingsPage = () => {
  const [settings, setSettings] = useState({
    smsQueueAlerts: true,
    whatsappAppointmentReminders: true,
    emailLabReports: true,
    pharmacyReadySms: true,
    soundNotifications: true,
    language: 'English (US)',
  });
  const [toastMessage, setToastMessage] = useState(null);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setToastMessage('Preference saved.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <PatientLayout
      title="Patient Settings"
      subtitle="Manage your notification preferences, alerts, and accessibility options."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-4xl mx-auto space-y-6">
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#CCFBF1] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">Notification & Alert Preferences</h2>
              <p className="text-[11px] text-[#64748B]">Choose how you receive real-time updates during your visit</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">SMS & Live Queue Position Updates</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Receive an instant text message when your token is called or moved up</div>
              </div>
              <input
                type="checkbox"
                checked={settings.smsQueueAlerts}
                onChange={() => toggle('smsQueueAlerts')}
                className="h-4 w-4 accent-[#0F766E] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">WhatsApp Appointment Confirmations</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Receive hospital appointment booking details and slot reminders on WhatsApp</div>
              </div>
              <input
                type="checkbox"
                checked={settings.whatsappAppointmentReminders}
                onChange={() => toggle('whatsappAppointmentReminders')}
                className="h-4 w-4 accent-[#0F766E] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">Email Diagnostic Lab Reports</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Automatically deliver PDF copies of verified blood & imaging results to your inbox</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailLabReports}
                onChange={() => toggle('emailLabReports')}
                className="h-4 w-4 accent-[#0F766E] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">Pharmacy Dispensation Chimes</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Alert immediately when medications are packaged and waiting at counter</div>
              </div>
              <input
                type="checkbox"
                checked={settings.pharmacyReadySms}
                onChange={() => toggle('pharmacyReadySms')}
                className="h-4 w-4 accent-[#0F766E] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export const PatientHelpPage = () => {
  return (
    <PatientLayout
      title="Help & Support"
      subtitle="Frequently asked questions and hospital assistance contacts."
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">Patient Assistance Guide</h2>
              <p className="text-[11px] text-[#64748B]">Find answers to common questions about your hospital experience</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-[#475569]">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0F172A] text-sm block">How does the digital queue work?</span>
              <p className="leading-relaxed">
                When you arrive and register at reception Counter 3, you are given a token number (e.g. #07). You can track how many patients are ahead of you in real-time on the "My Queue" page without having to wait physically in the crowded corridor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0F172A] text-sm block">Where do I collect my prescribed medications?</span>
              <p className="leading-relaxed">
                Once Dr. Arun Kumar finalizes your consultation, prescriptions are routed automatically to OPD Pharmacy Counter 02 (Ground Floor, OPD Block A). Track status on the "Pharmacy" page.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0F172A] text-sm block">How do I access my lab test reports?</span>
              <p className="leading-relaxed">
                Verified lab test results appear in the "Lab Results" tab as soon as they are approved by the clinical pathologist. You can inspect reference values and normal ranges directly.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[#64748B]">
              Need immediate on-site help? Visit <strong className="text-[#0F172A]">OPD Reception Desk B-2</strong>.
            </div>
            <a
              href="tel:+918041238900"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F766E] text-white font-bold hover:bg-[#115E59] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Reception (Ext. 2041)</span>
            </a>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default ProfilePage;
