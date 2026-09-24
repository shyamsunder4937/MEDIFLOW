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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#17221B]">Upcoming Schedule</h3>
            <p className="text-[11px] text-[#64748B]">Next consultations for today</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#15803D]/20">
          {upcomingList.length} next
        </span>
      </div>

      <div className="space-y-2">
        {upcomingList.length > 0 ? (
          upcomingList.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/staff/appointments/${item.id}`)}
              className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F0FDF4] hover:border-[#15803D]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex flex-col items-center justify-center bg-white px-2 py-1 rounded-md border border-[#E2E8F0] text-center min-w-[55px] flex-shrink-0">
                  <Clock className="h-3 w-3 text-[#15803D] mb-0.5" />
                  <span className="text-[10px] font-bold text-[#17221B] leading-tight">
                    {item.time}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#17221B] group-hover:text-[#15803D] transition-colors truncate">
                    {item.patientName}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#64748B] truncate">
                    <Stethoscope className="h-3 w-3 text-[#94A3B8] flex-shrink-0" />
                    <span>{item.doctor} • {item.department}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#15803D] flex-shrink-0 transition-colors ml-2" />
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
