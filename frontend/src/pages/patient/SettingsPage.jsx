import React, { useState } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import {
  Bell,
  MessageSquare,
  Mail,
  Pill,
  Volume2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Save,
  Check,
  Lock,
  Smartphone,
  Info,
} from 'lucide-react';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    smsQueueAlerts: true,
    whatsappAppointmentReminders: true,
    emailLabReports: true,
    pharmacyReadySms: true,
    soundNotifications: true,
    language: 'English (US)',
    dataSharingConsent: true,
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggle = (key) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
    showToast('Preference updated successfully.');
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSettings((prev) => ({ ...prev, language: newLang }));
    showToast(`Language set to ${newLang}.`);
  };

  const handleResetDefaults = () => {
    setSettings({
      smsQueueAlerts: true,
      whatsappAppointmentReminders: true,
      emailLabReports: true,
      pharmacyReadySms: true,
      soundNotifications: true,
      language: 'English (US)',
      dataSharingConsent: true,
    });
    showToast('Preferences restored to hospital defaults.');
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    showToast('All settings saved and applied.');
  };

  return (
    <PatientLayout
      title="Settings"
      subtitle="Manage your notification preferences, communication channels, and hospital privacy options."
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50 flex items-center gap-2.5 bg-[#17221B] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="h-4 w-4 text-[#15803D] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── 1. PRIMARY INFORMATION: Visit & Live Queue Notifications ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Bell className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#17221B]">Visit & Queue Notifications</h2>
                <p className="text-xs text-[#64748B]">Choose how you receive real-time updates during your visit</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-0.5 rounded-full">
              Real-Time
            </span>
          </div>

          <div className="divide-y divide-[#E2E8F0] text-xs">
            {/* Setting Row 1: SMS Queue Position */}
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0">
              <div className="space-y-0.5 max-w-xl">
                <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#15803D]" />
                  <span>SMS & Live Queue Position Updates</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Receive an instant text message when your token is called, moved up, or entering the doctor's chamber.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.smsQueueAlerts}
                onClick={() => toggle('smsQueueAlerts')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  settings.smsQueueAlerts ? 'bg-[#15803D]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.smsQueueAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting Row 2: WhatsApp Appointments */}
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 max-w-xl">
                <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#15803D]" />
                  <span>WhatsApp Appointment Reminders</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Receive hospital appointment booking confirmations, OPD room number, and slot reminders on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.whatsappAppointmentReminders}
                onClick={() => toggle('whatsappAppointmentReminders')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  settings.whatsappAppointmentReminders ? 'bg-[#15803D]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.whatsappAppointmentReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting Row 3: Email Diagnostic Lab Reports */}
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 max-w-xl">
                <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#15803D]" />
                  <span>Email Diagnostic Lab Reports</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Automatically deliver password-protected PDF copies of verified blood & imaging results to your inbox.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.emailLabReports}
                onClick={() => toggle('emailLabReports')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  settings.emailLabReports ? 'bg-[#15803D]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.emailLabReports ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting Row 4: Pharmacy Ready Dispensation */}
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 max-w-xl">
                <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                  <Pill className="h-4 w-4 text-[#15803D]" />
                  <span>Pharmacy Ready Dispensation Alerts</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Get notified immediately once your medications have been packaged and are ready at OPD Counter 02.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.pharmacyReadySms}
                onClick={() => toggle('pharmacyReadySms')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  settings.pharmacyReadySms ? 'bg-[#15803D]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.pharmacyReadySms ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting Row 5: Sound & In-App Chimes */}
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 last:pb-0">
              <div className="space-y-0.5 max-w-xl">
                <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-[#15803D]" />
                  <span>Audible Hospital Chimes</span>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  Play gentle auditory chime in the browser when your token is called or stage status transitions.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.soundNotifications}
                onClick={() => toggle('soundNotifications')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                  settings.soundNotifications ? 'bg-[#15803D]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.soundNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ── 2. Language & Regional Preferences ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#17221B]">Language & Regional Preferences</h2>
                <p className="text-xs text-[#64748B]">Select your preferred interface language</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 max-w-xl">
              <span className="font-bold text-[#17221B] text-xs sm:text-sm block">Portal Display Language</span>
              <p className="text-[#64748B] text-xs leading-relaxed">
                Applies to token announcements, queue displays, and navigation labels.
              </p>
            </div>
            <div className="w-full sm:w-56">
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all cursor-pointer"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                <option value="Kannada (ಕನ್ನಡ)">Kannada (ಕನ್ನಡ)</option>
              </select>
            </div>
          </div>
        </section>

        {/* ── 3. Privacy & Clinical Consent ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#17221B]">Privacy & Clinical Data Consent</h2>
                <p className="text-xs text-[#64748B]">Manage your clinical information transmission preferences</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#64748B] bg-[#F8FAFC] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
              HIPAA Compliant
            </span>
          </div>

          <div className="py-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 max-w-xl">
              <div className="font-bold text-[#17221B] text-xs sm:text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#15803D]" />
                <span>Automated E-Prescription Sharing</span>
              </div>
              <p className="text-[#64748B] text-xs leading-relaxed">
                Allow doctor's digital prescription to securely transmit directly to hospital pharmacy Counter 02 for immediate packing.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.dataSharingConsent}
              onClick={() => toggle('dataSharingConsent')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                settings.dataSharingConsent ? 'bg-[#15803D]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  settings.dataSharingConsent ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        {/* ── 4. Save & Reset Action Controls ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-xs font-semibold text-[#475569] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>Save All Preferences</span>
          </button>
        </div>
      </div>
    </PatientLayout>
  );
};

export default SettingsPage;
