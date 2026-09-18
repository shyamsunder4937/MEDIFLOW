// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Patient Data (Phase 1)
// Replace these with real API calls in Phase 2.
// ─────────────────────────────────────────────────────────────────────────────

export const mockPatient = {
  name: 'Rahul',
  fullName: 'Rahul Sharma',
  patientId: 'MF-2024-00742',
  age: 34,
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@email.com',
};

export const mockCurrentVisit = {
  visitId: 'V-20240916-0014',
  date: 'Today, 16 Sep 2026',
  department: 'General Medicine',
  doctor: 'Dr. Arun Kumar',
  appointmentTime: '10:30 AM',
  status: 'IN PROGRESS',
  room: 'OPD Block B, Room 204',
};

export const mockQueue = {
  queueNumber: 7,
  patientsAhead: 6,
  estimatedWaitMinutes: 24,
  doctor: 'Dr. Arun Kumar',
  status: 'Waiting',
  department: 'General Medicine',
};

// Journey stage statuses: 'completed' | 'active' | 'pending'
export const mockJourneyStages = [
  { id: 1, name: 'Registration',    icon: 'ClipboardCheck', status: 'completed', time: '9:15 AM'  },
  { id: 2, name: 'Doctor Assigned', icon: 'UserCheck',      status: 'completed', time: '9:22 AM'  },
  { id: 3, name: 'Consultation',    icon: 'Stethoscope',    status: 'active',    time: '~10:54 AM' },
  { id: 4, name: 'Laboratory',      icon: 'FlaskConical',   status: 'pending',   time: null        },
  { id: 5, name: 'Doctor Review',   icon: 'FileText',       status: 'pending',   time: null        },
  { id: 6, name: 'Pharmacy',        icon: 'Pill',           status: 'pending',   time: null        },
  { id: 7, name: 'Completed',       icon: 'CheckCircle2',   status: 'pending',   time: null        },
];

export const mockUpcomingAppointment = {
  id: 'APT-0298',
  department: 'General Medicine',
  doctor: 'Dr. Arun Kumar',
  specialization: 'Internal Medicine',
  date: 'Tomorrow, 17 Sep 2026',
  time: '10:30 AM',
  hospital: 'MediFlow Medical Center',
  type: 'Follow-up',
};

export const mockLabResults = [
  { id: 'LAB001', test: 'CBC (Complete Blood Count)',   status: 'completed',  completedAt: '9:45 AM' },
  { id: 'LAB002', test: 'Blood Glucose (Fasting)',      status: 'processing', completedAt: null       },
  { id: 'LAB003', test: 'Lipid Profile',                status: 'pending',    completedAt: null       },
];

export const mockPharmacy = {
  prescriptionId: 'RX1024',
  medicineCount: 2,
  status: 'preparing',          // 'preparing' | 'ready' | 'collected'
  estimatedReadyMinutes: 12,
  medicines: [
    { name: 'Amoxicillin 500mg', dosage: '1 tablet twice daily', days: 5 },
    { name: 'Paracetamol 650mg', dosage: '1 tablet as needed',   days: 3 },
  ],
};

export const mockNotifications = [
  {
    id: 'N001',
    icon: 'UserCheck',
    message: 'Doctor assigned to your visit',
    detail: 'Dr. Arun Kumar has been assigned to your visit.',
    time: '2 min ago',
    read: false,
    type: 'info',
  },
  {
    id: 'N002',
    icon: 'FlaskConical',
    message: 'Blood test result available',
    detail: 'Your CBC report is ready. Tap to view.',
    time: '18 min ago',
    read: false,
    type: 'success',
  },
  {
    id: 'N003',
    icon: 'Clock',
    message: 'Queue position updated',
    detail: 'You are now #7 in the queue. 6 patients ahead.',
    time: '25 min ago',
    read: true,
    type: 'info',
  },
  {
    id: 'N004',
    icon: 'Pill',
    message: 'Prescription received by pharmacy',
    detail: 'Prescription #RX1024 is now being prepared.',
    time: '32 min ago',
    read: true,
    type: 'success',
  },
];

export const mockQuickActions = [
  { label: 'Book Appointment', icon: 'CalendarPlus', href: '/patient/appointments' },
  { label: 'View Queue',       icon: 'ListOrdered',  href: '/patient/queue'         },
  { label: 'Lab Results',      icon: 'FlaskConical', href: '/patient/lab'           },
  { label: 'Pharmacy',         icon: 'Pill',         href: '/patient/pharmacy'      },
];
