import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Info,
  User,
  Shield,
  Sliders,
  KeyRound,
  RotateCcw,
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminProfileHeader } from '../../components/admin/profile/AdminProfileHeader';
import { AdminPersonalInfoCard } from '../../components/admin/profile/AdminPersonalInfoCard';
import { AdminEditProfileModal } from '../../components/admin/profile/AdminEditProfileModal';
import { AdminAccountInfoCard } from '../../components/admin/profile/AdminAccountInfoCard';
import { AdminSecurityCard } from '../../components/admin/profile/AdminSecurityCard';
import { AdminChangePasswordModal } from '../../components/admin/profile/AdminChangePasswordModal';
import { AdminPreferencesCard } from '../../components/admin/profile/AdminPreferencesCard';
import { AdminSessionCard } from '../../components/admin/profile/AdminSessionCard';
import { adminProfileData } from '../../data/adminMockData';

export const AdminProfilePage = () => {
  // Master Profile State
  const [profile, setProfile] = useState(adminProfileData);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Toast / Feedback message state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handle Profile Update (Save from Edit Modal)
  const handleSaveProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    showToast('Profile updated successfully', 'success');
  };

  // Handle Preference Toggle
  const handleTogglePreference = (key) => {
    setProfile((prev) => {
      const currentPreferences = prev.preferences || {
        emailNotifications: true,
        systemAlerts: true,
        compactDashboard: false,
      };
      const updated = {
        ...currentPreferences,
        [key]: !currentPreferences[key],
      };
      return {
        ...prev,
        preferences: updated,
      };
    });
    showToast('Preferences updated', 'info');
  };

  // Handle Password Updated (Simulated)
  const handlePasswordUpdated = () => {
    showToast('Password update is simulated in Phase 1.', 'info');
  };

  // Reset to initial mock profile
  const handleResetProfile = () => {
    setProfile({ ...adminProfileData });
    showToast('Profile reset to initial demo values', 'info');
  };

  return (
    <AdminLayout
      title="Admin Profile"
      subtitle="Manage your administrator account information and preferences."
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* ── Toast Notification Banner ── */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
                  : 'bg-slate-900 text-slate-50 border-slate-700'
              }`}
            >
              <CheckCircle2
                className={`h-4 w-4 ${
                  toastMessage.type === 'success'
                    ? 'text-emerald-400'
                    : 'text-[#CCFBF1]'
                }`}
              />
              <span>{toastMessage.message}</span>
            </div>
          </div>
        )}

        {/* ── Page Header Action Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Admin Profile
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-[#0F766E] border border-teal-200">
                Phase 1
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your administrator account information and preferences.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleResetProfile}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Reset profile data to initial mock values"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Profile</span>
            </button>
          </div>
        </div>

        {/* ── 1. Profile Overview Header ── */}
        <section aria-label="Profile Overview">
          <AdminProfileHeader profile={profile} />
        </section>

        {/* ── 2. Two-Column Grid: Personal Info & Account Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <section aria-label="Personal Information">
            <AdminPersonalInfoCard
              profile={profile}
              onEdit={() => setIsEditModalOpen(true)}
            />
          </section>

          {/* Account Information */}
          <section aria-label="Account Information">
            <AdminAccountInfoCard profile={profile} />
          </section>
        </div>

        {/* ── 3. Two-Column Grid: Security & Preferences ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security & Authentication */}
          <section aria-label="Security">
            <AdminSecurityCard
              onChangePassword={() => setIsPasswordModalOpen(true)}
            />
          </section>

          {/* Interface & Notification Preferences */}
          <section aria-label="Preferences">
            <AdminPreferencesCard
              preferences={profile.preferences || {}}
              onTogglePreference={handleTogglePreference}
            />
          </section>
        </div>

        {/* ── 4. Session & System Context (Includes Sign Out) ── */}
        <section aria-label="Session Context">
          <AdminSessionCard profile={profile} />
        </section>

        {/* ── 5. Edit Profile Modal ── */}
        <AdminEditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />

        {/* ── 6. Change Password Modal (Simulated) ── */}
        <AdminChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onPasswordUpdated={handlePasswordUpdated}
        />

        {/* ── 7. Phase 1 Mock Notice ── */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] flex-shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800">
                Admin Profile Console — Phase 1 Demonstration
              </span>
              <p className="text-[11px] text-slate-500">
                Administrator information, security parameters, and preferences are handled via local state. No live database changes or external authentication API mutations are made.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white font-mono text-[11px] text-[#0F766E] border border-[#0F766E]/20 font-semibold flex-shrink-0">
            MOCK DATA — PHASE 1
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
