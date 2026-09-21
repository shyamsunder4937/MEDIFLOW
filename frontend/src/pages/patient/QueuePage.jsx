import React, { useState, useEffect } from 'react';
import { PatientLayout } from '../../layouts/PatientLayout';
import { mockQueueData } from '../../data/mockQueueData';
import { QueueOverviewCard } from '../../components/queue/QueueOverviewCard';
import { DoctorInfoCard } from '../../components/queue/DoctorInfoCard';
import { LiveQueue } from '../../components/queue/LiveQueue';
import { WaitingTimeCard } from '../../components/queue/WaitingTimeCard';
import { QueueJourney } from '../../components/queue/QueueJourney';
import { QueueUpdate } from '../../components/queue/QueueUpdate';
import { QueueActions } from '../../components/queue/QueueActions';
import { ContactReceptionModal } from '../../components/queue/ContactReceptionModal';
import { LeaveQueueModal } from '../../components/queue/LeaveQueueModal';
import { CheckCircle2, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import { getMyQueue, getQueuePosition, getDepartmentQueue } from '../../services/queueService';

export const QueuePage = () => {
  // Local state
  const [queueState, setQueueState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateBanner, setShowUpdateBanner] = useState(true);
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load queue data on mount
  useEffect(() => {
    loadQueueData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadQueueData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadQueueData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get patient's queue
      const queue = await getMyQueue();
      
      // Get queue position
      const position = await getQueuePosition(queue.id);
      
      // Get department queue for live queue context
      const deptQueue = await getDepartmentQueue(queue.department_id, queue.queue_date, 'waiting,called,in_consultation');
      
      // Transform to UI format
      const transformedData = transformQueueToUI(queue, position, deptQueue.data);
      setQueueState(transformedData);
      
    } catch (err) {
      console.error('Failed to load queue:', err);
      setError(err.message || 'Failed to load queue data');
    } finally {
      setLoading(false);
    }
  };

  const transformQueueToUI = (queue, position, deptQueueData) => {
    const formattedNumber = `#${String(queue.queue_number).padStart(2, '0')}`;
    
    // Status mapping
    const statusMap = {
      'waiting': 'Waiting',
      'called': 'Called',
      'in_consultation': 'In Consultation',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'no_show': 'No Show'
    };

    // Calculate estimated wait time (12 min per patient)
    const estimatedWait = position.patientsAhead * 12;
    
    // Build live queue (show 3 before and 3 after current)
    const currentIdx = deptQueueData.findIndex(q => q.id === queue.id);
    const start = Math.max(0, currentIdx - 2);
    const end = Math.min(deptQueueData.length, currentIdx + 4);
    const liveQueue = deptQueueData.slice(start, end).map(q => ({
      queueNumber: q.queue_number,
      formattedNumber: `#${String(q.queue_number).padStart(2, '0')}`,
      name: q.patientName?.split(' ')[0] || 'Patient',
      status: statusMap[q.status] || q.status,
      waitTime: q.status === 'waiting' ? `${Math.max(0, (q.queue_number - queue.queue_number) * 12)} min estimated wait` :
                q.status === 'in_consultation' ? 'In progress' :
                q.status === 'completed' ? 'Finished' : 'Waiting',
      isCurrent: q.id === queue.id
    }));

    // Journey stages
    const journeyStages = [
      {
        id: 'registration',
        title: 'Registration',
        status: 'completed',
        time: new Date(queue.check_in_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        description: 'Check-in completed',
      },
      {
        id: 'waiting',
        title: 'Waiting',
        status: queue.status === 'waiting' ? 'current' : 'completed',
        time: queue.status === 'waiting' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
              queue.called_at ? new Date(queue.called_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Pending',
        description: queue.status === 'waiting' ? `${position.patientsAhead} patients ahead` : 'Called',
      },
      {
        id: 'consultation',
        title: 'Consultation',
        status: queue.status === 'in_consultation' ? 'current' : queue.status === 'completed' ? 'completed' : 'upcoming',
        time: queue.consultation_started_at ? new Date(queue.consultation_started_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
              queue.appointmentTime || 'Scheduled',
        description: `Consultation with ${queue.doctorName || 'Doctor'} in ${queue.doctorRoom || 'Room'}`,
      },
      {
        id: 'completed',
        title: 'Completed',
        status: queue.status === 'completed' ? 'completed' : 'upcoming',
        time: queue.completed_at ? new Date(queue.completed_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Pending',
        description: 'Prescription & follow-up instructions',
      },
    ];

    return {
      queueNumber: queue.queue_number,
      formattedQueueNumber: formattedNumber,
      patientsAhead: position.patientsAhead,
      totalInQueue: deptQueueData.length,
      estimatedWait,
      status: statusMap[queue.status] || queue.status,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      doctor: {
        name: queue.doctorName || 'Doctor',
        department: queue.departmentName || 'Department',
        room: queue.doctorRoom || 'TBA',
        roomFull: `${queue.departmentName || 'Department'}, ${queue.doctorRoom || 'Room TBA'}`,
        status: 'Available',
        specialization: queue.doctor?.specialization || 'Medical Specialist',
        experience: queue.doctor?.qualification || 'MBBS, MD',
        currentlyServing: deptQueueData.find(q => q.status === 'in_consultation')?.patientName || 'Waiting',
      },
      liveQueue,
      journeyStages,
      recentUpdate: {
        title: 'Queue Updated',
        message: queue.status === 'called' ? 'You have been called!' : 
                 `You are number ${formattedNumber}`,
        timeAgo: 'Just now',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      },
      hospitalInfo: {
        centerName: 'MediFlow Multi-Specialty Hospital',
        wing: queue.departmentName || 'OPD',
        receptionDesk: `${queue.departmentName || 'Department'} Reception`,
        receptionistName: 'Reception Staff',
        receptionPhone: '+91 (080) 4123-8900',
        helpDeskExt: 'Ext. 2041',
      },
    };
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleConfirmLeave = async () => {
    // Note: Leave queue functionality would call cancelQueue API
    // For now, just show message
    showToast('Queue cancellation feature coming soon');
  };

  const handleRejoinQueue = () => {
    loadQueueData();
    showToast('Refreshing queue data...');
  };

  // Loading state
  if (loading && !queueState) {
    return (
      <PatientLayout
        title="My Queue"
        subtitle="Track your position and estimated waiting time."
      >
        <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#0F766E]" />
            <p className="text-sm text-[#64748B]">Loading queue information...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Error state
  if (error && !queueState) {
    return (
      <PatientLayout
        title="My Queue"
        subtitle="Track your position and estimated waiting time."
      >
        <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="h-16 w-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">No Active Queue Found</h3>
              <p className="text-sm text-[#64748B] max-w-md mb-4">
                You don't have an active queue entry for today. Check in at the hospital reception desk after your appointment time.
              </p>
              <button
                onClick={loadQueueData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#115E59] transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Render queue
  return (
    <PatientLayout
      title="My Queue"
      subtitle="Track your live outpatient consultation line and waiting position."
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        
        {/* ── Toast Notification ── */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="h-5 w-5 rounded-full bg-[#15803D] text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <div className="text-xs sm:text-sm font-semibold">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white text-xs pl-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Page Header Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              My Queue
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Live consultation status and estimated waiting time for General Medicine OPD.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
              <span>OPD Block B · Room 204</span>
            </div>
          </div>
        </div>

        {/* ── Section 1: Queue Update Banner (Notification) ── */}
        {showUpdateBanner && (
          <QueueUpdate
            recentUpdate={queueState.recentUpdate}
            onDismiss={() => setShowUpdateBanner(false)}
          />
        )}

        {/* ── Rejoin Prompt if user stepped out of queue ── */}
        {queueState.status === 'Left Queue' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-900">
            <div className="text-xs">
              <strong className="font-bold text-[#17221B]">You are currently not in queue.</strong> Your previous spot was token #07.
            </div>
            <button
              onClick={handleRejoinQueue}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Rejoin Queue (Demo Reset)</span>
            </button>
          </div>
        )}

        {/* ── Main Layout Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Primary & Main Content: 8 of 12 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. PRIMARY QUEUE STATUS: Queue Overview Card */}
            <section aria-label="Current Queue Position">
              <QueueOverviewCard queueData={queueState} />
            </section>

            {/* 2. MAIN QUEUE INFORMATION: Live Queue Breakdown */}
            <section aria-label="Live Queue Breakdown">
              <LiveQueue liveQueue={queueState.liveQueue} />
            </section>

            {/* 3. SECONDARY INFORMATION: Hospital Stage Journey */}
            <section aria-label="Hospital Journey Progress">
              <QueueJourney stages={queueState.journeyStages} />
            </section>
          </div>

          {/* Right Column (Secondary Context & Quick Actions: 4 of 12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Assigned Doctor Card */}
            <section aria-label="Assigned Specialist">
              <DoctorInfoCard doctor={queueState.doctor} />
            </section>

            {/* 2. Estimated Waiting Time Forecast */}
            <section aria-label="Waiting Time Forecast">
              <WaitingTimeCard
                estimatedWait={queueState.estimatedWait}
                lastUpdated={queueState.lastUpdated}
              />
            </section>

            {/* 3. Quick Patient Actions */}
            <section aria-label="Quick Actions">
              <QueueActions
                onOpenReceptionModal={() => setIsReceptionModalOpen(true)}
                onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
              />
            </section>
          </div>

        </div>

        {/* ── Modals ── */}
        <ContactReceptionModal
          isOpen={isReceptionModalOpen}
          onClose={() => setIsReceptionModalOpen(false)}
          hospitalInfo={queueState.hospitalInfo}
        />

        <LeaveQueueModal
          isOpen={isLeaveModalOpen}
          onClose={() => setIsLeaveModalOpen(false)}
          onConfirmLeave={handleConfirmLeave}
          queueNumber={queueState.formattedQueueNumber}
        />

      </div>
    </PatientLayout>
  );
};
