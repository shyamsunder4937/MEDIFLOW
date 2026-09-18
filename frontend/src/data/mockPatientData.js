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
    id: 1,
    title: 'Queue position updated',
    description: 'Your queue position changed from #9 to #7.',
    time: '2 minutes ago',
    category: 'Queue',
    read: false,
    action: 'View Queue',
    route: '/patient/queue',
    icon: 'Users',
  },
  {
    id: 2,
    title: 'Your appointment is confirmed',
    description: 'Your General Medicine appointment with Dr. Arun Kumar is confirmed for today at 10:30 AM.',
    time: '35 minutes ago',
    category: 'Appointment',
    read: false,
    action: 'View Appointment',
    route: '/patient/appointments',
    icon: 'Calendar',
  },
  {
    id: 3,
    title: 'Lab result available',
    description: 'Your Complete Blood Count result is now available.',
    time: '1 hour ago',
    category: 'Laboratory',
    read: false,
    action: 'View Results',
    route: '/patient/lab-results',
    icon: 'FlaskConical',
  },
  {
    id: 4,
    title: 'Prescription ready for pickup',
    description: 'Your prescription order is ready at the hospital pharmacy.',
    time: '2 hours ago',
    category: 'Pharmacy',
    read: true,
    action: 'View Pharmacy',
    route: '/patient/pharmacy',
    icon: 'Pill',
  },
  {
    id: 5,
    title: 'Doctor assigned',
    description: 'Dr. Arun Kumar has been assigned to your current visit.',
    time: '3 hours ago',
    category: 'Appointment',
    read: true,
    action: null,
    route: null,
    icon: 'UserCheck',
  },
  {
    id: 6,
    title: 'Registration completed',
    description: 'Your hospital registration has been successfully completed.',
    time: 'Today, 9:45 AM',
    category: 'Hospital Journey',
    read: true,
    action: null,
    route: null,
    icon: 'Activity',
  },
  {
    id: 7,
    title: 'Estimated waiting time updated',
    description: 'Your estimated waiting time is now approximately 24 minutes.',
    time: 'Today, 10:12 AM',
    category: 'Queue',
    read: true,
    action: 'View Queue',
    route: '/patient/queue',
    icon: 'Clock',
  },
  {
    id: 8,
    title: 'Lab test processing',
    description: 'Your Lipid Profile test is currently being processed.',
    time: 'Today, 11:40 AM',
    category: 'Laboratory',
    read: true,
    action: 'View Lab Status',
    route: '/patient/lab-results',
    icon: 'FlaskConical',
  },
];

export const mockQuickActions = [
  { label: 'Book Appointment', icon: 'CalendarPlus', href: '/patient/appointments' },
  { label: 'View Queue',       icon: 'ListOrdered',  href: '/patient/queue'         },
  { label: 'Lab Results',      icon: 'FlaskConical', href: '/patient/lab-results'  },
  { label: 'Pharmacy',         icon: 'Pill',         href: '/patient/pharmacy'      },
];
