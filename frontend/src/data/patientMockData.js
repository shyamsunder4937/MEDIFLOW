// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Patient Journey Data (Phase 1)
// Centralized mock data store for /patient/journey
// ─────────────────────────────────────────────────────────────────────────────

export const journeyData = {
  patientName: 'Rahul Kumar',
  patientId: 'MF-2026-00127',
  department: 'General Medicine',
  doctor: 'Dr. Arun Kumar',
  doctorSpecialty: 'Senior Consultant Physician',
  appointmentDate: '18 September 2026',
  appointmentTime: '10:30 AM',
  hospital: 'MediFlow General Hospital',
  visitType: 'Outpatient',
  room: 'OPD Block B, Room 204',
  queueNumber: 7,
  formattedQueueNumber: '#07',
  patientsAhead: 6,
  estimatedWait: 24, // minutes
  status: 'IN PROGRESS',
  currentStage: 'Waiting for Consultation',
  lastUpdated: '2 minutes ago',
};

// 8 Stages of Hospital Journey
export const journeyStages = [
  {
    id: 1,
    title: 'Registration',
    status: 'completed', // 'completed' | 'current' | 'upcoming'
    icon: 'CheckCircle',
    time: '9:45 AM',
    description: 'Patient check-in & OPD registration verified at Counter 3',
  },
  {
    id: 2,
    title: 'Doctor Assigned',
    status: 'completed',
    icon: 'UserCheck',
    time: '9:52 AM',
    description: 'Assigned to Dr. Arun Kumar (General Medicine, Room 204)',
  },
  {
    id: 3,
    title: 'Waiting for Consultation',
    status: 'current',
    icon: 'Clock',
    time: '10:05 AM',
    description: 'You are currently waiting for your consultation in Lounge B',
  },
  {
    id: 4,
    title: 'Doctor Consultation',
    status: 'upcoming',
    icon: 'Stethoscope',
    estimated: 'Next (~11:00 AM)',
    description: 'Physical examination and symptoms assessment',
  },
  {
    id: 5,
    title: 'Laboratory',
    status: 'upcoming',
    icon: 'FlaskConical',
    estimated: 'Pending doctor advice',
    description: 'Diagnostic blood tests or imaging if recommended',
  },
  {
    id: 6,
    title: 'Doctor Review',
    status: 'upcoming',
    icon: 'ClipboardCheck',
    estimated: 'Pending test results',
    description: 'Follow-up diagnosis review & prescription finalization',
  },
  {
    id: 7,
    title: 'Pharmacy',
    status: 'upcoming',
    icon: 'Pill',
    estimated: 'Pending prescription',
    description: 'Medication dispensation at OPD Pharmacy Counter A',
  },
  {
    id: 8,
    title: 'Completed',
    status: 'upcoming',
    icon: 'CheckCircle',
    estimated: 'Final discharge',
    description: 'Visit summary report & digital prescription discharge',
  },
];

export const nextSteps = [
  {
    id: 'consultation',
    title: 'Doctor Consultation',
    description: 'You will meet Dr. Arun Kumar for your consultation in Room 204.',
    icon: 'Stethoscope',
    tag: 'Up Next',
    tagColor: 'teal',
  },
  {
    id: 'laboratory',
    title: 'Laboratory',
    description: 'If tests are requested, your lab stage will appear here.',
    icon: 'FlaskConical',
    tag: 'Conditional',
    tagColor: 'slate',
  },
  {
    id: 'review',
    title: 'Doctor Review',
    description: 'Your doctor will review available test results and prescribe care.',
    icon: 'ClipboardCheck',
    tag: 'Follow-up',
    tagColor: 'slate',
  },
];

export const recentActivity = [
  {
    id: 'act-1',
    time: '9:45 AM',
    title: 'Registration completed',
    detail: 'Token #07 generated and OPD record verified at reception.',
  },
  {
    id: 'act-2',
    time: '9:52 AM',
    title: 'Doctor assigned',
    detail: 'Assigned to Dr. Arun Kumar (General Medicine).',
  },
  {
    id: 'act-3',
    time: '10:05 AM',
    title: 'Joined consultation queue',
    detail: 'Positioned at token #09 in General Medicine OPD queue.',
  },
  {
    id: 'act-4',
    time: '10:10 AM',
    title: 'Queue position updated from #9 to #7',
    detail: 'Two previous patient consultations completed.',
  },
  {
    id: 'act-5',
    time: '10:12 AM',
    title: 'Estimated waiting time updated to 24 minutes',
    detail: 'Consultation Room 204 pace adjusted by OPD dispatcher.',
  },
];

export const hospitalReceptionInfo = {
  hospitalName: 'MediFlow General Hospital',
  desk: 'OPD Reception Desk B-2 (General Medicine)',
  officer: 'Priya Sharma (Patient Coordinator)',
  phone: '+91 (080) 4123-8900',
  extension: 'Ext. 2041',
  location: 'Main Hospital Building, 2nd Floor, West Wing',
  timings: 'OPD Hours: 8:00 AM – 8:00 PM',
};

// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Patient Lab Results Data (Phase 1)
// ─────────────────────────────────────────────────────────────────────────────

export const labSummary = {
  totalTests: 8,
  pendingResults: 2,
  completedResults: 6,
};

export const currentVisitLabStatus = {
  department: 'General Medicine',
  doctor: 'Dr. Arun Kumar',
  visitDate: 'Today, 18 September 2026',
  status: 'Pending',
  description: 'Your doctor may request laboratory tests during your consultation.',
  stages: [
    { name: 'Consultation', status: 'current', label: 'In Progress' },
    { name: 'Laboratory', status: 'pending', label: 'Pending Order' },
    { name: 'Doctor Review', status: 'upcoming', label: 'Upcoming' },
  ],
};

export const pendingTests = [
  {
    id: 'LAB-2026-003',
    name: 'Lipid Profile',
    shortName: 'Lipids',
    status: 'Processing',
    requested: 'Today',
    progress: 65,
    estimatedTime: 'Estimated ~3:30 PM',
    specimen: 'Serum (Blood)',
    labUnit: 'Clinical Biochemistry Unit',
  },
  {
    id: 'LAB-2026-008',
    name: 'Blood Glucose',
    shortName: 'Post Prandial (PPBS)',
    status: 'Awaiting Report',
    requested: 'Today',
    progress: 40,
    estimatedTime: 'Sample collected, awaiting verification',
    specimen: 'Plasma (Fluoride)',
    labUnit: 'Central Diagnostic Lab',
  },
];

export const labResults = [
  {
    id: 'LAB-2026-001',
    name: 'Complete Blood Count',
    shortName: 'CBC',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '18 September 2026, 11:20 AM',
    reported: '18 September 2026, 1:05 PM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Whole Blood (EDTA)',
    technician: 'R. K. Verma, Senior MLT',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'Hemoglobin', value: '14.2 g/dL', reference: '13.0 – 17.0 g/dL', status: 'normal' },
      { parameter: 'WBC Count', value: '7,800 /µL', reference: '4,000 – 11,000 /µL', status: 'normal' },
      { parameter: 'RBC Count', value: '4.8 million/µL', reference: '4.5 – 5.9 million/µL', status: 'normal' },
      { parameter: 'Platelet Count', value: '2.45 lakh/µL', reference: '1.50 – 4.50 lakh/µL', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-002',
    name: 'Blood Glucose',
    shortName: 'Glucose Fasting',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '18 September 2026, 11:30 AM',
    reported: '18 September 2026, 12:45 PM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Plasma (Sodium Fluoride)',
    technician: 'S. Mehta, MLT',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'Fasting Blood Sugar (FBS)', value: '94 mg/dL', reference: '70 – 100 mg/dL', status: 'normal' },
      { parameter: 'Post Prandial Blood Sugar (PPBS)', value: '126 mg/dL', reference: '< 140 mg/dL', status: 'normal' },
      { parameter: 'HbA1c (Glycated Hemoglobin)', value: '5.4 %', reference: '< 5.7 %', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-003',
    name: 'Lipid Profile',
    shortName: 'Lipid Panel',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Pending',
    subStatus: 'Processing',
    patientName: 'Rahul Kumar',
    collected: '18 September 2026, 11:45 AM',
    reported: 'Processing — Expected 3:30 PM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Serum (Plain)',
    values: null,
  },
  {
    id: 'LAB-2026-004',
    name: 'Urine Routine',
    shortName: 'Urine Routine & Microscopic',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '17 Sep 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '17 September 2026, 10:15 AM',
    reported: '17 September 2026, 11:45 AM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Midstream Urine',
    technician: 'P. Nair, Lab Tech',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'Color', value: 'Pale Yellow', reference: 'Pale Yellow', status: 'normal' },
      { parameter: 'Specific Gravity', value: '1.018', reference: '1.005 – 1.030', status: 'normal' },
      { parameter: 'pH', value: '6.0', reference: '4.6 – 8.0', status: 'normal' },
      { parameter: 'Protein / Albumin', value: 'Nil', reference: 'Nil / Negative', status: 'normal' },
      { parameter: 'Glucose', value: 'Negative', reference: 'Negative', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-005',
    name: 'Serum Electrolytes',
    shortName: 'Electrolytes Panel',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '10 Aug 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '10 August 2026, 09:30 AM',
    reported: '10 August 2026, 11:00 AM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Serum (Plain)',
    technician: 'R. K. Verma, Senior MLT',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'Serum Sodium (Na+)', value: '139 mEq/L', reference: '136 – 145 mEq/L', status: 'normal' },
      { parameter: 'Serum Potassium (K+)', value: '4.2 mEq/L', reference: '3.5 – 5.1 mEq/L', status: 'normal' },
      { parameter: 'Serum Chloride (Cl-)', value: '101 mEq/L', reference: '98 – 107 mEq/L', status: 'normal' },
      { parameter: 'Serum Bicarbonate', value: '24 mEq/L', reference: '22 – 29 mEq/L', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-006',
    name: 'Liver Function Test',
    shortName: 'LFT Profile',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '10 Aug 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '10 August 2026, 09:35 AM',
    reported: '10 August 2026, 12:15 PM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Serum (Plain)',
    technician: 'S. Mehta, MLT',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'Bilirubin (Total)', value: '0.8 mg/dL', reference: '0.2 – 1.2 mg/dL', status: 'normal' },
      { parameter: 'SGOT / AST', value: '26 U/L', reference: '10 – 40 U/L', status: 'normal' },
      { parameter: 'SGPT / ALT', value: '29 U/L', reference: '7 – 56 U/L', status: 'normal' },
      { parameter: 'Alkaline Phosphatase (ALP)', value: '88 U/L', reference: '44 – 147 U/L', status: 'normal' },
      { parameter: 'Serum Albumin', value: '4.3 g/dL', reference: '3.5 – 5.5 g/dL', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-007',
    name: 'Thyroid Stimulating Hormone',
    shortName: 'TSH Ultrasensitive',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '25 Jul 2026',
    status: 'Completed',
    patientName: 'Rahul Kumar',
    collected: '25 July 2026, 08:45 AM',
    reported: '25 July 2026, 11:30 AM',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Serum (Plain)',
    technician: 'P. Nair, Lab Tech',
    verifiedBy: 'Dr. N. Swaminathan (Consultant Pathologist)',
    values: [
      { parameter: 'TSH (3rd Generation)', value: '2.35 µIU/mL', reference: '0.40 – 4.20 µIU/mL', status: 'normal' },
      { parameter: 'Total Triiodothyronine (T3)', value: '1.15 ng/mL', reference: '0.80 – 2.00 ng/mL', status: 'normal' },
      { parameter: 'Total Thyroxine (T4)', value: '7.8 µg/dL', reference: '5.1 – 14.1 µg/dL', status: 'normal' },
    ],
  },
  {
    id: 'LAB-2026-008',
    name: 'Blood Glucose (Follow-up)',
    shortName: 'Post Prandial Sugar',
    requestedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Pending',
    subStatus: 'Awaiting Report',
    patientName: 'Rahul Kumar',
    collected: '18 September 2026, 12:15 PM',
    reported: 'Awaiting Lab Verification',
    laboratory: 'MediFlow Central Laboratory',
    specimenType: 'Plasma (Fluoride)',
    values: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Patient Pharmacy Data (Phase 1)
// All medication data is fictional and for interface demonstration only.
// ─────────────────────────────────────────────────────────────────────────────

export const prescriptionSummary = {
  activePrescriptions: 2,
  readyForPickup: 1,
  completedOrders: 4,
};

export const currentPrescriptionVisit = {
  department: 'General Medicine',
  doctor: 'Dr. Arun Kumar',
  visitDate: '18 September 2026',
  prescriptionStatus: 'Ready for Pharmacy',
  stages: [
    { id: 'consultation', label: 'Doctor Consultation', status: 'completed', time: '11:00 AM' },
    { id: 'prescription', label: 'Prescription',        status: 'completed', time: '11:42 AM' },
    { id: 'pharmacy',    label: 'Pharmacy',             status: 'current',   time: 'Now'      },
    { id: 'pickup',      label: 'Pickup',               status: 'upcoming',  time: 'Pending'  },
  ],
};

export const prescriptions = [
  {
    id: 'RX-2026-001',
    medicine: 'Paracetamol 500 mg',
    genericName: 'Acetaminophen',
    category: 'Analgesic / Antipyretic',
    dosage: '1 tablet',
    frequency: 'Twice daily',
    frequencyDetail: 'Morning & Evening (after meals)',
    duration: '5 days',
    quantity: 10,
    unit: 'Tablets',
    prescribedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Ready for Pickup',
    pharmacyCounter: 'Counter 02',
    pharmacyLocation: 'MediFlow Hospital Pharmacy, Ground Floor',
    instructions: 'Take with water. Do not exceed stated dose.',
    orderId: 'PH-2026-0042',
  },
  {
    id: 'RX-2026-002',
    medicine: 'Vitamin D3 60,000 IU',
    genericName: 'Cholecalciferol',
    category: 'Nutritional Supplement',
    dosage: '1 capsule',
    frequency: 'Once weekly',
    frequencyDetail: 'Every Sunday (after breakfast)',
    duration: '12 weeks',
    quantity: 12,
    unit: 'Capsules',
    prescribedBy: 'Dr. Arun Kumar',
    department: 'General Medicine',
    date: '18 Sep 2026',
    status: 'Processing',
    pharmacyCounter: 'Counter 02',
    pharmacyLocation: 'MediFlow Hospital Pharmacy, Ground Floor',
    instructions: 'Take with a full glass of water or milk.',
    orderId: 'PH-2026-0042',
  },
];

export const pharmacyTracking = {
  orderId: 'PH-2026-0042',
  currentStatus: 'Ready for Pickup',
  message: 'Your order is ready at the hospital pharmacy.',
  counter: 'Counter 02',
  estimatedTime: null,
  stages: [
    { id: 'received',  label: 'Prescription Received', status: 'completed', time: '11:42 AM', note: 'Rx verified by pharmacist' },
    { id: 'prepared',  label: 'Order Prepared',         status: 'completed', time: '12:10 PM', note: 'Medicines picked from dispensary' },
    { id: 'qc',        label: 'Quality Check',          status: 'completed', time: '12:25 PM', note: 'Double-checked by senior pharmacist' },
    { id: 'ready',     label: 'Ready for Pickup',       status: 'current',   time: '12:30 PM', note: 'Waiting at Counter 02' },
    { id: 'collected', label: 'Collected',              status: 'upcoming',  time: null,        note: 'Please collect with hospital token' },
  ],
};

export const pharmacyPickupInfo = {
  location: 'MediFlow Hospital Pharmacy',
  floor: 'Ground Floor, OPD Block A',
  counter: 'Counter 02',
  hours: '8:00 AM – 8:00 PM',
  status: 'Open',
  phone: '+91 (080) 4123-8900',
  extension: 'Ext. 1101',
};

export const pharmacyJourneyStages = [
  { id: 'doctor',   label: 'Doctor',                icon: 'Stethoscope',  status: 'completed', time: '11:00 AM' },
  { id: 'rx',       label: 'Prescription Created',  icon: 'FileText',     status: 'completed', time: '11:42 AM' },
  { id: 'received', label: 'Pharmacy Received',     icon: 'Inbox',        status: 'completed', time: '11:45 AM' },
  { id: 'prepared', label: 'Order Prepared',         icon: 'Package',      status: 'completed', time: '12:10 PM' },
  { id: 'ready',    label: 'Ready for Pickup',       icon: 'Bell',         status: 'current',   time: 'Now'      },
  { id: 'collected','label': 'Collected',            icon: 'CheckCircle2', status: 'upcoming',  time: null       },
];

export const pharmacyOrders = [
  {
    id: 'PH-2026-0042',
    date: '18 Sep 2026',
    items: 2,
    itemsLabel: '2 Medicines',
    status: 'Ready for Pickup',
    prescriptions: ['RX-2026-001', 'RX-2026-002'],
    detail: 'Paracetamol 500 mg + Vitamin D3 60,000 IU',
  },
  {
    id: 'PH-2026-0031',
    date: '05 Sep 2026',
    items: 1,
    itemsLabel: '1 Medicine',
    status: 'Completed',
    prescriptions: [],
    detail: 'Cetirizine 10 mg',
  },
  {
    id: 'PH-2026-0024',
    date: '22 Aug 2026',
    items: 3,
    itemsLabel: '3 Medicines',
    status: 'Completed',
    prescriptions: [],
    detail: 'Metformin 500 mg + Atorvastatin 10 mg + Aspirin 75 mg',
  },
  {
    id: 'PH-2026-0018',
    date: '10 Aug 2026',
    items: 2,
    itemsLabel: '2 Medicines',
    status: 'Completed',
    prescriptions: [],
    detail: 'Amlodipine 5 mg + Losartan 50 mg',
  },
];
