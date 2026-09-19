import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Stethoscope, ChevronRight, CalendarDays } from 'lucide-react';

export const UpcomingAppointmentsWidget = ({ appointments = [] }) => {
  const navigate = useNavigate();

  // Pick next 4-5 upcoming/confirmed appointments
  const upcomingList = appointments
    .filter((a) => a.status === 'Confirmed' || a.status === 'Checked In' || a.status === 'Waiting')
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Upcoming Schedule</h3>
            <p className="text-[11px] text-[#64748B]">Next consultations for today</p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full">
          {upcomingList.length} next
        </span>
      </div>

      <div className="space-y-2.5">
        {upcomingList.length > 0 ? (
          upcomingList.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/staff/appointments/${item.id}`)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-teal-50/40 hover:border-[#0F766E]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col items-center justify-center bg-white px-2 py-1 rounded-lg border border-slate-200 text-center min-w-[55px] flex-shrink-0">
                  <Clock className="h-3 w-3 text-[#0F766E] mb-0.5" />
                  <span className="text-[10px] font-bold text-[#0F172A] leading-tight">
                    {item.time}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#0F172A] group-hover:text-[#0F766E] transition-colors truncate">
                    {item.patientName}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#64748B] truncate">
                    <Stethoscope className="h-3 w-3 text-[#94A3B8] flex-shrink-0" />
                    <span>{item.doctor} • {item.department}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#0F766E] flex-shrink-0 transition-colors ml-2" />
            </div>
          ))
        ) : (
          <p className="text-xs text-[#64748B] text-center py-4">No upcoming appointments pending.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointmentsWidget;
