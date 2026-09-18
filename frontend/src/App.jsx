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
import { LabResultsPage }     from './pages/patient/LabResultsPage';
import { PharmacyPage }        from './pages/patient/PharmacyPage';
import { NotificationsPage }   from './pages/patient/NotificationsPage';
import { ProfilePage }         from './pages/patient/ProfilePage';

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
        <Route path="/patient/lab-results"    element={<LabResultsPage />} />
        <Route path="/patient/pharmacy"      element={<PharmacyPage />} />
        <Route path="/patient/notifications" element={<NotificationsPage />} />
        <Route path="/patient/profile"       element={<ProfilePage />} />

        {/* ── Catch-all fallback ── */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
