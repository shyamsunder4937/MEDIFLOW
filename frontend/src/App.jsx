import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth components
import { AuthRedirect } from './components/auth/AuthRedirect';
import { RoleProtectedRoute } from './components/auth/ProtectedRoute';

// Auth pages
import { SignInPage }  from './pages/SignInPage';
import { SignUpPage }  from './pages/SignUpPage';
import { DevDemoPage } from './pages/DevDemoPage';

// Admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminDoctorsPage } from './pages/admin/AdminDoctorsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminWorkflowPage } from './pages/admin/AdminWorkflowPage';
import { AdminAIAgentPage } from './pages/admin/AdminAIAgentPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminGenericPlaceholderPage } from './pages/admin/AdminPlaceholders';

// Patient dashboard + sub-pages
import { PatientDashboard }    from './pages/patient/PatientDashboard';
import { AppointmentsPage }    from './pages/patient/AppointmentsPage';
import { QueuePage }           from './pages/patient/QueuePage';
import { JourneyPage }         from './pages/patient/JourneyPage';
import { LabPage }             from './pages/patient/LabPage';
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
import { StaffHelpPage, StaffSettingsPage } from './pages/staff/StaffPlaceholders';

import { USER_ROLES } from './utils/roleConfig';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Default landing ── */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />

        {/* ── Authentication ── */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/auth-redirect" element={<AuthRedirect />} />
        
        {/* ── Development Demo (Phase 1 Only) ── */}
        <Route path="/dev-demo" element={<DevDemoPage />} />

        {/* ── Admin Portal ── */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminUsersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminDoctorsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminDepartmentsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/workflow"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminWorkflowPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/ai-agent"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminAIAgentPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminNotificationsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminProfilePage />
            </RoleProtectedRoute>
          }
        />
        <Route path="/admin/help"          element={<RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}><AdminGenericPlaceholderPage /></RoleProtectedRoute>} />
        <Route path="/admin/settings"      element={<RoleProtectedRoute requiredRole={USER_ROLES.ADMIN}><AdminGenericPlaceholderPage /></RoleProtectedRoute>} />

        {/* ── Patient Portal ── */}
        <Route path="/patient/dashboard"     element={<PatientDashboard />} />
        <Route path="/patient/appointments"  element={<AppointmentsPage />} />
        <Route path="/patient/queue"         element={<QueuePage />} />
        <Route path="/patient/journey"       element={<JourneyPage />} />
        <Route path="/patient/lab"           element={<LabPage />} />
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
