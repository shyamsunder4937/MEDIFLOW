// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Mock Patient Queue Data (Phase 1)
// Centralized mock data store for /patient/queue
// ─────────────────────────────────────────────────────────────────────────────

export const mockQueueData = {
  queueNumber: 7,
  formattedQueueNumber: '#07',
  patientsAhead: 6,
  totalInQueue: 18,
  estimatedWait: 24, // minutes
  status: 'Waiting',
  lastUpdated: '10:36 AM',
  doctor: {
    name: 'Dr. Arun Kumar',
    department: 'General Medicine',
    room: '204',
    roomFull: 'OPD Block B, Room 204',
    status: 'Available',
    specialization: 'Internal Medicine & General Care',
    experience: '14+ years',
    currentlyServing: '#06 (Meena R.)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
  },
  liveQueue: [
    { queueNumber: 4, formattedNumber: '#04', name: 'Priya', status: 'Completed', waitTime: 'Finished at 10:28 AM', isCurrent: false },
    { queueNumber: 5, formattedNumber: '#05', name: 'Arun', status: 'Completed', waitTime: 'Finished at 10:35 AM', isCurrent: false },
    { queueNumber: 6, formattedNumber: '#06', name: 'Meena', status: 'In Consultation', waitTime: 'In progress (~6 min left)', isCurrent: false },
    { queueNumber: 7, formattedNumber: '#07', name: 'Rahul', status: 'Waiting', waitTime: '24 min estimated wait', isCurrent: true },
    { queueNumber: 8, formattedNumber: '#08', name: 'Karthik', status: 'Waiting', waitTime: '36 min estimated wait', isCurrent: false },
    { queueNumber: 9, formattedNumber: '#09', name: 'Divya', status: 'Waiting', waitTime: '48 min estimated wait', isCurrent: false },
  ],
  journeyStages: [
    {
      id: 'registration',
      title: 'Registration',
      status: 'completed', // 'completed' | 'current' | 'upcoming'
      time: '09:15 AM',
      description: 'Check-in completed at Counter 3',
    },
    {
      id: 'waiting',
      title: 'Waiting',
      status: 'current',
      time: '10:36 AM',
      description: 'OPD Waiting Lounge B (6 patients ahead)',
    },
    {
      id: 'consultation',
      title: 'Consultation',
      status: 'upcoming',
      time: '~11:00 AM',
      description: 'Consultation with Dr. Arun Kumar in Room 204',
    },
    {
      id: 'completed',
      title: 'Completed',
      status: 'upcoming',
      time: 'Pending',
      description: 'Prescription & follow-up instructions',
    },
  ],
  recentUpdate: {
    title: 'Queue Updated',
    message: 'Your position changed from #9 to #7.',
    timeAgo: '2 minutes ago',
    timestamp: '10:34 AM',
  },
  hospitalInfo: {
    centerName: 'MediFlow Multi-Specialty Hospital',
    wing: 'OPD Block B, 2nd Floor',
    receptionDesk: 'Desk B-2 (General Medicine)',
    receptionistName: 'Priya Sharma (Desk Executive)',
    receptionPhone: '+91 (080) 4123-8900',
    helpDeskExt: 'Ext. 2041',
  },
};
