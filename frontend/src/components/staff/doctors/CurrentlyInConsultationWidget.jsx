import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, DoorOpen, ListOrdered, ChevronRight, Activity } from 'lucide-react';

export const CurrentlyInConsultationWidget = ({ doctors = [] }) => {
  const navigate = useNavigate();

  // Filter busy doctors
  const busyDoctors = doctors.filter((d) => d.status === 'In Consultation');

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Currently in Consultation</h3>
            <p className="text-[11px] text-[#64748B]">Active doctor-patient examination sessions</p>
          </div>
        </div>

        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          {busyDoctors.length} active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {busyDoctors.length > 0 ? (
          busyDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/30 space-y-2.5 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#0F172A] flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                    <span>{doc.name}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">{doc.department}</div>
                </div>

                <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-[#0F766E] bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  <DoorOpen className="h-3 w-3" />
                  <span>{doc.room}</span>
                </div>
              </div>

              {/* Patient and Queue info */}
              <div className="p-2 rounded-lg bg-white border border-blue-100/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center gap-1 text-[11px]">
                    <User className="h-3 w-3 text-blue-600" /> Patient:
                  </span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[140px]">
                    {doc.currentPatient || 'Assigned in queue'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-0.5 border-t border-slate-100">
                  <span className="text-[#64748B]">Next in Line:</span>
                  <span className="font-bold text-amber-700">{doc.waitingPatients} waiting</span>
                </div>
              </div>

              {/* View Queue Action */}
              <button
                type="button"
                onClick={() => navigate('/staff/queue')}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
              >
                <ListOrdered className="h-3.5 w-3.5" />
                <span>View Queue</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-6 text-center text-xs text-[#64748B]">
            No physicians currently engaged in consultation.
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentlyInConsultationWidget;
