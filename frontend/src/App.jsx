import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import { SignInPage }  from './pages/SignInPage';
import { SignUpPage }  from './pages/SignUpPage';

// Patient dashboard + sub-pages
import { PatientDashboard }    from './pages/patient/PatientDashboard';
import { AppointmentsPage }    from './pages/patient/AppointmentsPage';
import { QueuePage }           from './pages/patient/QueuePage';
import { JourneyPage }         from './pages/patient/JourneyPage';
import { LabPage }             from './pages/patient/LabPage';
import { PharmacyPage }        from './pages/patient/PharmacyPage';
import { NotificationsPage }   from './pages/patient/NotificationsPage';
import { ProfilePage }         from './pages/patient/ProfilePage';

// Doctor dashboard + sub-pages
import { DoctorDashboard }         from './pages/doctor/DoctorDashboard';
import { DoctorQueuePage }         from './pages/doctor/DoctorQueuePage';
import { DoctorPatientsPage }      from './pages/doctor/DoctorPatientsPage';
import { DoctorConsultationPage }  from './pages/doctor/DoctorConsultationPage';
import { DoctorPatientDetailPage } from './pages/doctor/DoctorPatientDetailPage';
import { DoctorLabResultsPage }    from './pages/doctor/DoctorLabResultsPage';
import { DoctorProfilePage, DoctorSettingsPage, DoctorHelpPage } from './pages/doctor/DoctorProfilePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Default landing ── */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />

        {/* ── Authentication ── */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* ── Patient Portal ── */}
        <Route path="/patient/dashboard"     element={<PatientDashboard />} />
        <Route path="/patient/appointments"  element={<AppointmentsPage />} />
        <Route path="/patient/queue"         element={<QueuePage />} />
        <Route path="/patient/journey"       element={<JourneyPage />} />
        <Route path="/patient/lab"           element={<LabPage />} />
        <Route path="/patient/pharmacy"      element={<PharmacyPage />} />
        <Route path="/patient/notifications" element={<NotificationsPage />} />
        <Route path="/patient/profile"       element={<ProfilePage />} />

        {/* ── Doctor Portal ── */}
        <Route path="/doctor/dashboard"         element={<DoctorDashboard />} />
        <Route path="/doctor/queue"             element={<DoctorQueuePage />} />
        <Route path="/doctor/patients"          element={<DoctorPatientsPage />} />
        <Route path="/doctor/patient/:id"       element={<DoctorPatientDetailPage />} />
        <Route path="/doctor/consultation/:id"  element={<DoctorConsultationPage />} />
        <Route path="/doctor/consultation"      element={<Navigate to="/doctor/consultation/21" replace />} />
        <Route path="/doctor/consultations"     element={<Navigate to="/doctor/consultation/21" replace />} />
        <Route path="/doctor/lab-results"       element={<DoctorLabResultsPage />} />
        <Route path="/doctor/profile"           element={<DoctorProfilePage />} />
        <Route path="/doctor/settings"          element={<DoctorSettingsPage />} />
        <Route path="/doctor/help"              element={<DoctorHelpPage />} />

        {/* ── Catch-all fallback ── */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
