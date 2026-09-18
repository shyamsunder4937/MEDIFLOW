// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Appointments Data (Phase 1)
// ─────────────────────────────────────────────────────────────────────────────

export const initialAppointments = [
  {
    id: "APT-1024",
    department: "General Medicine",
    doctor: "Dr. Arun Kumar",
    specialization: "Senior Physician",
    date: "18 September 2026",
    dateShort: "18 Sep 2026",
    time: "10:30 AM",
    hospital: "MediFlow Medical Center",
    room: "OPD Block B, Room 204",
    status: "Confirmed",
    tab: "upcoming",
    type: "Follow-up",
    reason: "Routine quarterly health checkup & blood sugar review",
    journeyStages: [
      { id: 1, name: "Registration", status: "completed", time: "09:45 AM" },
      { id: 2, name: "Doctor Consultation", status: "in-progress", time: "10:30 AM" },
      { id: 3, name: "Laboratory", status: "pending", time: "Estimated 11:15 AM" },
      { id: 4, name: "Doctor Review", status: "pending", time: "Estimated 12:00 PM" },
      { id: 5, name: "Pharmacy", status: "pending", time: "Estimated 12:30 PM" },
    ]
  },
  {
    id: "APT-1025",
    department: "Cardiology",
    doctor: "Dr. Priya Sharma",
    specialization: "Consultant Cardiologist",
    date: "22 September 2026",
    dateShort: "22 Sep 2026",
    time: "11:30 AM",
    hospital: "MediFlow Medical Center",
    room: "Cardio Wing, Level 3, Room 302",
    status: "Confirmed",
    tab: "upcoming",
    type: "Specialist Visit",
    reason: "Preventative echocardiogram and blood pressure management",
    journeyStages: [
      { id: 1, name: "Registration", status: "pending", time: "Pending check-in" },
      { id: 2, name: "Doctor Consultation", status: "pending", time: "11:30 AM" },
      { id: 3, name: "Laboratory", status: "pending", time: "Scheduled" },
      { id: 4, name: "Doctor Review", status: "pending", time: "Scheduled" },
      { id: 5, name: "Pharmacy", status: "pending", time: "Scheduled" },
    ]
  },
  {
    id: "APT-0982",
    department: "Dermatology",
    doctor: "Dr. Ananya Roy",
    specialization: "Consultant Dermatologist",
    date: "04 August 2026",
    dateShort: "04 Aug 2026",
    time: "02:00 PM",
    hospital: "MediFlow Medical Center",
    room: "Skin Clinic, Room 108",
    status: "Completed",
    tab: "past",
    type: "Initial Consultation",
    reason: "Skin allergy assessment and topical prescription",
    journeyStages: [
      { id: 1, name: "Registration", status: "completed", time: "01:45 PM" },
      { id: 2, name: "Doctor Consultation", status: "completed", time: "02:05 PM" },
      { id: 3, name: "Laboratory", status: "completed", time: "02:30 PM" },
      { id: 4, name: "Doctor Review", status: "completed", time: "03:00 PM" },
      { id: 5, name: "Pharmacy", status: "completed", time: "03:20 PM" },
    ]
  },
  {
    id: "APT-0890",
    department: "General Medicine",
    doctor: "Dr. Arun Kumar",
    specialization: "Senior Physician",
    date: "14 June 2026",
    dateShort: "14 Jun 2026",
    time: "09:30 AM",
    hospital: "MediFlow Medical Center",
    room: "OPD Block B, Room 204",
    status: "Completed",
    tab: "past",
    type: "Routine Checkup",
    reason: "Annual wellness checkup and seasonal flu vaccination",
    journeyStages: [
      { id: 1, name: "Registration", status: "completed", time: "09:15 AM" },
      { id: 2, name: "Doctor Consultation", status: "completed", time: "09:35 AM" },
      { id: 3, name: "Laboratory", status: "completed", time: "10:10 AM" },
      { id: 4, name: "Doctor Review", status: "completed", time: "10:45 AM" },
      { id: 5, name: "Pharmacy", status: "completed", time: "11:00 AM" },
    ]
  },
  {
    id: "APT-0941",
    department: "Orthopedics",
    doctor: "Dr. Vikram Seth",
    specialization: "Orthopedic Specialist",
    date: "10 July 2026",
    dateShort: "10 Jul 2026",
    time: "03:30 PM",
    hospital: "MediFlow Medical Center",
    room: "Orthopedics Block A, Room 112",
    status: "Cancelled",
    tab: "cancelled",
    type: "X-Ray & Consultation",
    reason: "Knee joint stiffness and athletic injury review",
    cancellationReason: "Cancelled by patient due to business travel",
    journeyStages: [
      { id: 1, name: "Registration", status: "cancelled", time: "Cancelled" },
      { id: 2, name: "Doctor Consultation", status: "cancelled", time: "Cancelled" },
      { id: 3, name: "Laboratory", status: "cancelled", time: "Cancelled" },
      { id: 4, name: "Doctor Review", status: "cancelled", time: "Cancelled" },
      { id: 5, name: "Pharmacy", status: "cancelled", time: "Cancelled" },
    ]
  }
];

export const mockDepartments = [
  {
    id: "general-medicine",
    name: "General Medicine",
    iconName: "Stethoscope",
    description: "Primary care, seasonal ailments & general health checkups",
    availableDoctorsCount: 2,
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "cardiology",
    name: "Cardiology",
    iconName: "HeartPulse",
    description: "Heart care, blood pressure, ECG & cardiovascular health",
    availableDoctorsCount: 2,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    iconName: "Bone",
    description: "Bones, joints, fractures & musculoskeletal conditions",
    availableDoctorsCount: 1,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "dermatology",
    name: "Dermatology",
    iconName: "Sparkles",
    description: "Skin, hair, allergies, cosmetic & chronic skin treatments",
    availableDoctorsCount: 1,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    iconName: "Baby",
    description: "Child healthcare, immunization, growth & pediatric care",
    availableDoctorsCount: 1,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    iconName: "Activity",
    description: "Digestive system, liver, stomach & gastro health",
    availableDoctorsCount: 1,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  }
];

export const mockDoctors = [
  {
    id: "doc-001",
    name: "Dr. Arun Kumar",
    departmentId: "general-medicine",
    department: "General Medicine",
    specialization: "Senior Physician, MBBS, MD",
    experience: "14 years exp.",
    rating: 4.9,
    room: "OPD Block B, Room 204",
    status: "Available",
    available: true,
    avatarInitials: "AK"
  },
  {
    id: "doc-002",
    name: "Dr. Priya Sharma",
    departmentId: "general-medicine",
    department: "General Medicine",
    specialization: "Internal Medicine Specialist",
    experience: "10 years exp.",
    rating: 4.8,
    room: "OPD Block B, Room 208",
    status: "Available",
    available: true,
    avatarInitials: "PS"
  },
  {
    id: "doc-003",
    name: "Dr. Ravi Kumar",
    departmentId: "general-medicine",
    department: "General Medicine",
    specialization: "Physician & Geriatric Specialist",
    experience: "18 years exp.",
    rating: 4.7,
    room: "OPD Block B, Room 210",
    status: "Unavailable",
    available: false,
    avatarInitials: "RK"
  },
  {
    id: "doc-004",
    name: "Dr. Priya Sharma",
    departmentId: "cardiology",
    department: "Cardiology",
    specialization: "Consultant Cardiologist, DM",
    experience: "12 years exp.",
    rating: 4.9,
    room: "Cardio Wing, Room 302",
    status: "Available",
    available: true,
    avatarInitials: "PS"
  },
  {
    id: "doc-005",
    name: "Dr. Rajesh Varma",
    departmentId: "cardiology",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",
    experience: "16 years exp.",
    rating: 4.8,
    room: "Cardio Wing, Room 306",
    status: "Available",
    available: true,
    avatarInitials: "RV"
  },
  {
    id: "doc-006",
    name: "Dr. Vikram Seth",
    departmentId: "orthopedics",
    department: "Orthopedics",
    specialization: "Orthopedic Surgeon & Sports Medicine",
    experience: "15 years exp.",
    rating: 4.9,
    room: "Orthopedics Wing, Room 112",
    status: "Available",
    available: true,
    avatarInitials: "VS"
  },
  {
    id: "doc-007",
    name: "Dr. Meera Nair",
    departmentId: "orthopedics",
    department: "Orthopedics",
    specialization: "Joint Replacement Specialist",
    experience: "11 years exp.",
    rating: 4.7,
    room: "Orthopedics Wing, Room 115",
    status: "Unavailable",
    available: false,
    avatarInitials: "MN"
  },
  {
    id: "doc-008",
    name: "Dr. Ananya Roy",
    departmentId: "dermatology",
    department: "Dermatology",
    specialization: "Consultant Dermatologist & Cosmetologist",
    experience: "9 years exp.",
    rating: 4.9,
    room: "Skin Clinic, Room 108",
    status: "Available",
    available: true,
    avatarInitials: "AR"
  },
  {
    id: "doc-009",
    name: "Dr. Rohan Gupta",
    departmentId: "pediatrics",
    department: "Pediatrics",
    specialization: "Pediatrician & Neonatologist",
    experience: "13 years exp.",
    rating: 4.9,
    room: "Child Care Center, Room 101",
    status: "Available",
    available: true,
    avatarInitials: "RG"
  },
  {
    id: "doc-010",
    name: "Dr. Sneha Patel",
    departmentId: "gastroenterology",
    department: "Gastroenterology",
    specialization: "Gastroenterologist & Hepatologist",
    experience: "14 years exp.",
    rating: 4.8,
    room: "Gastro Clinic, Room 214",
    status: "Available",
    available: true,
    avatarInitials: "SP"
  }
];

export const mockAvailableDates = [
  { full: "18 September 2026", short: "18 Sep", dayName: "Fri", badge: "Today", isAvailable: true },
  { full: "19 September 2026", short: "19 Sep", dayName: "Sat", badge: "Tomorrow", isAvailable: true },
  { full: "20 September 2026", short: "20 Sep", dayName: "Sun", badge: null, isAvailable: false }, // Hospital OPD closed on Sun
  { full: "21 September 2026", short: "21 Sep", dayName: "Mon", badge: null, isAvailable: true },
  { full: "22 September 2026", short: "22 Sep", dayName: "Tue", badge: null, isAvailable: true },
  { full: "23 September 2026", short: "23 Sep", dayName: "Wed", badge: null, isAvailable: true }
];

export const mockTimeSlots = [
  { id: "slot-1", time: "09:00 AM", period: "Morning", available: true },
  { id: "slot-2", time: "09:30 AM", period: "Morning", available: true },
  { id: "slot-3", time: "10:00 AM", period: "Morning", available: false }, // Visually disabled
  { id: "slot-4", time: "10:30 AM", period: "Morning", available: true },
  { id: "slot-5", time: "11:00 AM", period: "Morning", available: true },
  { id: "slot-6", time: "11:30 AM", period: "Morning", available: false }, // Visually disabled
  { id: "slot-7", time: "02:00 PM", period: "Afternoon", available: true },
  { id: "slot-8", time: "02:30 PM", period: "Afternoon", available: true },
  { id: "slot-9", time: "03:00 PM", period: "Afternoon", available: true },
  { id: "slot-10", time: "03:30 PM", period: "Afternoon", available: false }, // Visually disabled
  { id: "slot-11", time: "04:00 PM", period: "Afternoon", available: true },
  { id: "slot-12", time: "04:30 PM", period: "Afternoon", available: true },
];

export const defaultHospital = "MediFlow Medical Center";

export const standardJourneySteps = [
  {
    step: 1,
    title: "Registration",
    description: "OPD Check-in & Token Generation",
    icon: "ClipboardCheck"
  },
  {
    step: 2,
    title: "Doctor Consultation",
    description: "Clinical Assessment & Diagnosis",
    icon: "Stethoscope"
  },
  {
    step: 3,
    title: "Laboratory",
    description: "Sample Collection & Diagnostics",
    icon: "FlaskConical"
  },
  {
    step: 4,
    title: "Doctor Review",
    description: "Report Analysis & Recommendations",
    icon: "FileText"
  },
  {
    step: 5,
    title: "Pharmacy",
    description: "Prescription Dispensation & Counseling",
    icon: "Pill"
  }
];
