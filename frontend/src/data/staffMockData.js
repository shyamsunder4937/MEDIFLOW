// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Hospital Staff Mock Data (Phase 1)
// Centralized mock data store for Hospital Staff Portal & Operations Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export const staffSummaryStats = {
  patientsToday: {
    value: 128,
    label: 'Patients Today',
    subtext: '12 more than yesterday',
    trend: '+10.3%',
    trendType: 'positive',
  },
  waitingPatients: {
    value: 24,
    label: 'Waiting Patients',
    subtext: 'Currently waiting in OPD',
    averageWaitTime: '18 mins avg',
  },
  todayAppointments: {
    value: 42,
    label: "Today's Appointments",
    subtext: '8 remaining',
    completed: 34,
  },
  availableDoctors: {
    value: 7,
    label: 'Available Doctors',
    subtext: 'Out of 12 doctors on duty',
    totalDoctors: 12,
  },
};

export const staffCurrentQueue = [
  {
    token: 'A-021',
    patient: 'Rahul Kumar',
    patientId: 'PAT-1021',
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    status: 'Waiting',
    waitingTime: '12 min',
    room: 'Room 204',
  },
  {
    token: 'A-022',
    patient: 'Priya Singh',
    patientId: 'PAT-1022',
    doctor: 'Dr. Kumar',
    department: 'General Medicine',
    status: 'In Consultation',
    waitingTime: '—',
    room: 'Room 102',
  },
  {
    token: 'A-023',
    patient: 'Arun Raj',
    patientId: 'PAT-1023',
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    status: 'Waiting',
    waitingTime: '25 min',
    room: 'Room 204',
  },
  {
    token: 'A-024',
    patient: 'Sneha Reddy',
    patientId: 'PAT-1024',
    doctor: 'Dr. Priya',
    department: 'Pediatrics',
    status: 'Waiting',
    waitingTime: '8 min',
    room: 'Room 301',
  },
  {
    token: 'A-025',
    patient: 'Kiran Kumar',
    patientId: 'PAT-1025',
    doctor: 'Dr. Ahmed',
    department: 'Orthopedics',
    status: 'Completed',
    waitingTime: '—',
    room: 'Room 205',
  },
];

export const staffDoctorsAvailability = [
  {
    id: 'doc-1',
    name: 'Dr. Sharma',
    specialty: 'Cardiology',
    status: 'Available', // Available | In Consultation | On Break | Unavailable
    queueCount: 4,
    room: 'Room 204',
    floor: '2nd Floor, Wing B',
    shift: '08:00 AM – 04:00 PM',
  },
  {
    id: 'doc-2',
    name: 'Dr. Kumar',
    specialty: 'General Medicine',
    status: 'In Consultation',
    queueCount: 6,
    room: 'Room 102',
    floor: '1st Floor, Wing A',
    shift: '09:00 AM – 05:00 PM',
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya',
    specialty: 'Pediatrics',
    status: 'Available',
    queueCount: 2,
    room: 'Room 301',
    floor: '3rd Floor, Wing C',
    shift: '08:30 AM – 04:30 PM',
  },
  {
    id: 'doc-4',
    name: 'Dr. Ahmed',
    specialty: 'Orthopedics',
    status: 'On Break',
    queueCount: 3,
    room: 'Room 205',
    floor: '2nd Floor, Wing B',
    shift: '10:00 AM – 06:00 PM',
  },
];

export const staffTodayAppointments = [
  {
    id: 'APT-101',
    time: '10:00 AM',
    patient: 'Rahul Kumar',
    patientId: 'PAT-1021',
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    status: 'Confirmed', // Confirmed | Checked In | Waiting | Completed | Cancelled
  },
  {
    id: 'APT-102',
    time: '10:30 AM',
    patient: 'Priya Singh',
    patientId: 'PAT-1022',
    doctor: 'Dr. Kumar',
    department: 'General Medicine',
    status: 'Checked In',
  },
  {
    id: 'APT-103',
    time: '11:00 AM',
    patient: 'Arun Raj',
    patientId: 'PAT-1023',
    doctor: 'Dr. Priya',
    department: 'Pediatrics',
    status: 'Waiting',
  },
  {
    id: 'APT-104',
    time: '11:30 AM',
    patient: 'Sneha Reddy',
    patientId: 'PAT-1024',
    doctor: 'Dr. Ahmed',
    department: 'Orthopedics',
    status: 'Confirmed',
  },
];

export const staffLabSummary = {
  pendingRequests: 8,
  samplesCollected: 5,
  processing: 4,
  resultsReady: 3,
  totalToday: 20,
};

export const staffPharmacySummary = {
  pendingPrescriptions: 6,
  preparing: 4,
  readyForPickup: 5,
  dispensed: 18,
  totalOrdersToday: 33,
};

export const staffRecentNotifications = [
  {
    id: 'notif-1',
    message: 'Patient A-021 has checked in.',
    detail: 'Token A-021 assigned for Cardiology (Dr. Sharma).',
    time: '5 min ago',
    type: 'queue',
    unread: true,
  },
  {
    id: 'notif-2',
    message: 'Dr. Sharma is now available.',
    detail: 'Consultation room 204 is ready for the next patient.',
    time: '12 min ago',
    type: 'doctor',
    unread: true,
  },
  {
    id: 'notif-3',
    message: 'Lab result for Patient P-102 is ready.',
    detail: 'Complete Blood Count report verified by pathology.',
    time: '25 min ago',
    type: 'lab',
    unread: false,
  },
  {
    id: 'notif-4',
    message: 'Prescription RX-1021 is ready for pickup.',
    detail: 'Packed and waiting at OPD Pharmacy Counter 02.',
    time: '40 min ago',
    type: 'pharmacy',
    unread: false,
  },
  {
    id: 'notif-5',
    message: 'Appointment with Dr. Kumar starts in 15 minutes.',
    detail: 'Priya Singh (PAT-1022) is in the waiting lounge.',
    time: '1 hour ago',
    type: 'appointment',
    unread: false,
  },
];

export const staffProfileData = {
  name: 'Staff Operations Desk',
  deskId: 'Desk Counter 03',
  shift: 'Morning Shift (07:00 AM – 03:30 PM)',
  department: 'Central OPD & Operations',
  hospital: 'MediFlow General Hospital (Main Campus)',
};
