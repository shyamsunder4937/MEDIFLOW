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
import { LabResultsPage }      from './pages/patient/LabResultsPage';
import { PharmacyPage }        from './pages/patient/PharmacyPage';
import { NotificationsPage }   from './pages/patient/NotificationsPage';
import { ProfilePage, PatientSettingsPage, PatientHelpPage } from './pages/patient/ProfilePage';

// Doctor dashboard + sub-pages
import { DoctorDashboard }         from './pages/doctor/DoctorDashboard';
import { DoctorQueuePage }         from './pages/doctor/DoctorQueuePage';
import { DoctorPatientsPage }      from './pages/doctor/DoctorPatientsPage';
import { DoctorConsultationPage }  from './pages/doctor/DoctorConsultationPage';
import { DoctorPatientDetailPage } from './pages/doctor/DoctorPatientDetailPage';
import { DoctorLabResultsPage }    from './pages/doctor/DoctorLabResultsPage';
import { DoctorProfilePage, DoctorSettingsPage, DoctorHelpPage } from './pages/doctor/DoctorProfilePage';

// Staff dashboard + sub-pages
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { StaffQueuePage } from './pages/staff/StaffQueuePage';
import { StaffPatientsPage } from './pages/staff/StaffPatientsPage';
import { StaffPatientDetailPage } from './pages/staff/StaffPatientDetailPage';
import { StaffAppointmentsPage } from './pages/staff/StaffAppointmentsPage';
import { StaffAppointmentDetailPage } from './pages/staff/StaffAppointmentDetailPage';
import { StaffDoctorsPage } from './pages/staff/StaffDoctorsPage';
import { StaffDoctorDetailPage } from './pages/staff/StaffDoctorDetailPage';
import { StaffLabPage } from './pages/staff/StaffLabPage';
import { StaffLabDetailPage } from './pages/staff/StaffLabDetailPage';
import { StaffPharmacyPage } from './pages/staff/StaffPharmacyPage';
import { StaffPharmacyDetailPage } from './pages/staff/StaffPharmacyDetailPage';
import { StaffNotificationsPage } from './pages/staff/StaffNotificationsPage';
import {
  StaffHelpPage,
  StaffSettingsPage,
} from './pages/staff/StaffPlaceholders';

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
        <Route path="/patient/lab"           element={<LabResultsPage />} />
        <Route path="/patient/lab-results"   element={<LabResultsPage />} />
        <Route path="/patient/pharmacy"      element={<PharmacyPage />} />
        <Route path="/patient/notifications" element={<NotificationsPage />} />
        <Route path="/patient/profile"       element={<ProfilePage />} />
        <Route path="/patient/settings"      element={<PatientSettingsPage />} />
        <Route path="/patient/help"          element={<PatientHelpPage />} />

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

        {/* ── Hospital Staff Portal ── */}
        <Route path="/staff/dashboard"     element={<StaffDashboard />} />
        <Route path="/staff/queue"         element={<StaffQueuePage />} />
        <Route path="/staff/patients"      element={<StaffPatientsPage />} />
        <Route path="/staff/patients/:id"  element={<StaffPatientDetailPage />} />
        <Route path="/staff/appointments"      element={<StaffAppointmentsPage />} />
        <Route path="/staff/appointments/:id"  element={<StaffAppointmentDetailPage />} />
        <Route path="/staff/doctors"           element={<StaffDoctorsPage />} />
        <Route path="/staff/doctors/:id"       element={<StaffDoctorDetailPage />} />
        <Route path="/staff/lab"           element={<StaffLabPage />} />
        <Route path="/staff/lab/:id"       element={<StaffLabDetailPage />} />
        <Route path="/staff/pharmacy"      element={<StaffPharmacyPage />} />
        <Route path="/staff/pharmacy/:id"  element={<StaffPharmacyDetailPage />} />
        <Route path="/staff/notifications" element={<StaffNotificationsPage />} />
        <Route path="/staff/help"          element={<StaffHelpPage />} />
        <Route path="/staff/settings"      element={<StaffSettingsPage />} />

        {/* ── Catch-all fallback ── */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
