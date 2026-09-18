import React, { useState } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorProfile } from '../../data/doctorMockData';
import { DoctorProfileHeader } from '../../components/doctor/DoctorProfileHeader';
import { ProfessionalInformation } from '../../components/doctor/ProfessionalInformation';
import { WorkingHours } from '../../components/doctor/WorkingHours';
import { AvailabilityCard } from '../../components/doctor/AvailabilityCard';
import { AccountSettings } from '../../components/doctor/AccountSettings';
import { ClerkAccountCard } from '../../components/doctor/ClerkAccountCard';
import { CheckCircle2, Info, UserCircle, Bell, HelpCircle, Settings } from 'lucide-react';

export const DoctorProfilePage = () => {
  // Local state for doctor profile details
  const [profile, setProfile] = useState(doctorProfile);
  const [availability, setAvailability] = useState(doctorProfile.availability || 'Available');
  const [settings, setSettings] = useState(
    doctorProfile.accountSettings || {
      emailNotifications: true,
      queueNotifications: true,
      consultationReminders: true,
    }
  );
  const [toastMessage, setToastMessage] = useState('');

  // Handle setting toggle
  const handleToggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle profile update
  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  // Toast trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <DoctorLayout
      title="Doctor Profile"
      subtitle="Manage your professional information and account preferences."
    >
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toastMessage && (
          <div
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs animate-in fade-in slide-in-from-top-2 duration-150"
            role="status"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-normal">
              Local session updated
            </span>
          </div>
        )}

        {/* ── 1. Profile Overview Card ── */}
        <section aria-label="Profile Overview">
          <DoctorProfileHeader
            profile={profile}
            availability={availability}
          />
        </section>

        {/* ── 2. Two-Column Desktop Grid: Professional Info + Availability ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Information */}
          <section aria-label="Professional Information">
            <ProfessionalInformation
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onShowToast={showToast}
            />
          </section>

          {/* Clinical Availability */}
          <section aria-label="Clinical Availability">
            <AvailabilityCard
              availability={availability}
              onSetAvailability={(newStatus) => {
                setAvailability(newStatus);
                showToast(`Status updated to ${newStatus}.`);
              }}
            />
          </section>
        </div>

        {/* ── 3. Two-Column Desktop Grid: Working Hours + Account Settings ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Working Hours */}
          <section aria-label="Working Hours">
            <WorkingHours workingHours={profile.workingHours} />
          </section>

          {/* Account Settings */}
          <section aria-label="Notification Preferences">
            <AccountSettings
              settings={settings}
              onToggleSetting={handleToggleSetting}
            />
          </section>
        </div>

        {/* ── 4. Clerk Account Section ── */}
        <section aria-label="Authentication Settings">
          <ClerkAccountCard />
        </section>

        {/* ── 5. Demo Data Disclaimer ── */}
        <footer className="pt-2 pb-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-[#64748B]">
            <Info className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Demo profile information — not connected to a hospital database.</span>
          </div>
        </footer>
      </div>
    </DoctorLayout>
  );
};

export const DoctorSettingsPage = () => {
  return (
    <DoctorLayout
      title="Doctor Settings"
      subtitle="Configure your consultation notifications, audio alerts and display options"
    >
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <Settings className="h-4 w-4 text-[#0F766E]" />
            Consultation Room Preferences
          </h2>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">Audio Chime on Next Patient</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Play sound alert when next patient enters waiting area</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0F766E] cursor-pointer" />
            </label>
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-semibold text-[#0F172A]">Critical Lab Result Alerts</div>
                <div className="text-[#64748B] text-[11px] mt-0.5">Immediate high-priority banner for urgent diagnostic flags</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0F766E] cursor-pointer" />
            </label>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export const DoctorHelpPage = () => {
  return (
    <DoctorLayout
      title="Doctor Support & Help Desk"
      subtitle="Quick guide for the MediFlow AI Clinical Portal"
    >
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#0F766E]" />
            Clinical Workflow Guide
          </h2>
          <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0F172A] block mb-1">1. Status Bar & Availability:</span>
              Toggle between Available, Busy, and Unavailable to regulate patient flow from the hospital central triage queue.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0F172A] block mb-1">2. Current Queue:</span>
              View real-time patient tokens, check vitals recorded by triage nurses, and click "Open Consultation" to commence consultation.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0F172A] block mb-1">3. E-Prescriptions:</span>
              Transmit signed prescription notes directly to the Central Pharmacy dispensing system.
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorProfilePage;
