import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { mockPatient } from '../../data/mockPatientData';
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
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [patientData, setPatientData] = useState({
    fullName: (isLoaded && user?.fullName) || mockPatient.fullName || 'Rahul Sharma',
    patientId: mockPatient.patientId || 'MF-2024-00742',
    age: mockPatient.age || 34,
    gender: mockPatient.gender || 'Male',
    bloodGroup: mockPatient.bloodGroup || 'O+',
    phone: mockPatient.phone || '+91 98765 43210',
    email: (isLoaded && user?.primaryEmailAddress?.emailAddress) || mockPatient.email || 'rahul.sharma@email.com',
    dob: '14 May 1990',
    address: '42, Green Glen Layout, Bellandur, Bengaluru, KA 560103',
    nationalHealthId: '91-8472-9102-4821',
    emergencyContact: {
      name: 'Ananya Sharma',
      relation: 'Spouse',
      phone: '+91 98765 12345',
    },
    allergies: ['Penicillin', 'Sulfonamides'],
    conditions: ['None recorded (Healthy OPD Status)'],
    insurance: {
      provider: 'MediCare Plus Comprehensive Health',
      policyNo: 'MCP-2026-992182',
      coverage: '₹5,00,000 / year',
      status: 'Active',
      validTill: '31 Dec 2026',
    },
    assignedDoctor: 'Dr. Arun Kumar (General Medicine)',
    preferredHospital: 'MediFlow Medical Center (Main Campus)',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone: patientData.phone,
    email: patientData.email,
    address: patientData.address,
    emergencyName: patientData.emergencyContact.name,
    emergencyPhone: patientData.emergencyContact.phone,
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenEdit = () => {
    setEditFormData({
      phone: patientData.phone,
      email: patientData.email,
      address: patientData.address,
      emergencyName: patientData.emergencyContact.name,
      emergencyPhone: patientData.emergencyContact.phone,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setPatientData((prev) => ({
      ...prev,
      phone: editFormData.phone,
      email: editFormData.email,
      address: editFormData.address,
      emergencyContact: {
        ...prev.emergencyContact,
        name: editFormData.emergencyName,
        phone: editFormData.emergencyPhone,
      },
    }));
    setIsEditModalOpen(false);
    showToast('Profile contact information updated successfully.');
  };

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
                {patientData.fullName.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F766E] text-white text-[10px] font-bold border-2 border-white shadow-xs" title="Verified Patient">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  {patientData.fullName}
                </h1>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active OPD Patient
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                <span className="font-mono font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                  ID: {patientData.patientId}
                </span>
                <span>•</span>
                <span>{patientData.age} Years</span>
                <span>•</span>
                <span>{patientData.gender}</span>
                <span>•</span>
                <span className="font-bold text-[#0F172A] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded text-rose-700">
                  Blood Group: {patientData.bloodGroup}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleOpenEdit}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Contact Info</span>
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Date of Birth</span>
                <span className="font-bold text-[#0F172A] mt-0.5 block">{patientData.dob}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">National Health ID (ABHA)</span>
                <span className="font-mono font-bold text-[#0F766E] mt-0.5 block">{patientData.nationalHealthId}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Primary Phone</span>
                <span className="font-semibold text-[#0F172A] mt-0.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0F766E]" />
                  {patientData.phone}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[#64748B] block text-[11px] font-medium">Email Address</span>
                <span className="font-semibold text-[#0F172A] mt-0.5 flex items-center gap-1.5 truncate">
                  <Mail className="h-3.5 w-3.5 text-[#0F766E] flex-shrink-0" />
                  <span className="truncate">{patientData.email}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                <span className="text-[#64748B] block text-[11px] font-medium">Residential Address</span>
                <span className="font-medium text-[#0F172A] mt-0.5 flex items-start gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E] flex-shrink-0 mt-0.5" />
                  <span>{patientData.address}</span>
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
              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-rose-800 font-semibold uppercase tracking-wider">
                    Primary Emergency Contact
                  </div>
                  <div className="font-bold text-[#0F172A] text-sm mt-0.5">
                    {patientData.emergencyContact.name} ({patientData.emergencyContact.relation})
                  </div>
                  <div className="text-[#64748B] flex items-center gap-1.5 mt-1 font-medium">
                    <Phone className="h-3.5 w-3.5 text-rose-600" />
                    <span>{patientData.emergencyContact.phone}</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <Heart className="h-5 w-5" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#64748B]">Assigned Primary Physician</span>
                  <span className="text-[10px] bg-teal-50 text-[#0F766E] px-2 py-0.5 rounded font-bold">OPD Room 204</span>
                </div>
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Stethoscope className="h-4 w-4 text-[#0F766E]" />
                  <span>{patientData.assignedDoctor}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-semibold text-[#64748B]">Preferred Hospital Facility</span>
                <div className="font-medium text-[#0F172A] flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-[#0F766E]" />
                  <span>{patientData.preferredHospital}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── 3. Medical Details & Health Insurance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clinical Info & Allergies */}
          <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                Clinical Alerts & Allergies
              </h2>
              <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">Safety Flags</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  Known Drug Allergies
                </div>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 font-bold text-amber-900 text-xs shadow-2xs"
                    >
                      ⚠️ {allergy}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  Alerted to all prescribing doctors during E-Prescription validation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-semibold text-[#64748B]">Chronic Conditions</span>
                <div className="font-medium text-[#0F172A]">{patientData.conditions[0]}</div>
              </div>
            </div>
          </section>

          {/* Health Insurance */}
          <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-[#0F766E]" />
                Insurance & Cashless Coverage
              </h2>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                Pre-Approved
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-900 via-[#0F766E] to-[#115E59] text-white shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#CCFBF1]">{patientData.insurance.provider}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {patientData.insurance.status}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-teal-100 font-medium">Policy / TPA ID</div>
                <div className="font-mono font-bold text-sm tracking-wider text-white">
                  {patientData.insurance.policyNo}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-teal-500/40 text-xs">
                <div>
                  <span className="text-[10px] text-teal-200 block">Annual Coverage</span>
                  <span className="font-bold">{patientData.insurance.coverage}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-teal-200 block">Valid Until</span>
                  <span className="font-bold">{patientData.insurance.validTill}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── 4. Clerk Account & Security ── */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <Lock className="h-4.5 w-4.5 text-[#0F766E]" />
              Account Security & Clerk Authentication
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
                <div className="font-bold text-[#0F172A]">{patientData.fullName}</div>
                <div className="text-[#64748B] mt-0.5">{patientData.email}</div>
                <div className="text-[10px] text-[#0F766E] font-semibold mt-0.5">
                  Click avatar to manage passwords, two-factor authentication, or connected devices.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Edit Contact Modal ── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Edit3 className="h-4.5 w-4.5 text-[#0F766E]" />
                Update Contact Details
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="h-7 w-7 flex items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#0F172A] block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#0F172A] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#0F172A] block mb-1">Residential Address</label>
                <textarea
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#E2E8F0]">
                <div>
                  <label className="font-semibold text-[#0F172A] block mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={editFormData.emergencyName}
                    onChange={(e) => setEditFormData({ ...editFormData, emergencyName: e.target.value })}
                    className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#0F172A] block mb-1">Emergency Phone</label>
                  <input
                    type="text"
                    value={editFormData.emergencyPhone}
                    onChange={(e) => setEditFormData({ ...editFormData, emergencyPhone: e.target.value })}
                    className="w-full rounded-xl border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
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
