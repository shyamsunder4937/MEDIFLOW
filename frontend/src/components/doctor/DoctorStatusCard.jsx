import React, { useState } from 'react';
import { Clock, CheckCircle2, UserX } from 'lucide-react';

export const DoctorStatusCard = () => {
  // Local React state for doctor availability
  const [status, setStatus] = useState('Available'); // 'Available' | 'Busy' | 'Unavailable'

  const getStatusConfig = () => {
    switch (status) {
      case 'Available':
        return {
          label: 'Available',
          badgeBg: 'bg-[#F0FDF4] border-[#DCFCE7] text-[#15803D]',
          dotColor: 'bg-[#15803D]',
          pulse: true,
          desc: 'Ready for next patient. Live queue routing is active to Consultation Suite 4B.',
          icon: CheckCircle2,
          textColor: 'text-[#15803D]',
        };
      case 'Busy':
        return {
          label: 'Busy',
          badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
          dotColor: 'bg-[#D97706]',
          pulse: false,
          desc: 'Currently in active consultation or reviewing urgent medical reports. Next patient will wait.',
          icon: Clock,
          textColor: 'text-[#D97706]',
        };
      case 'Unavailable':
        return {
          label: 'Unavailable',
          badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
          dotColor: 'bg-[#DC2626]',
          pulse: false,
          desc: 'Away from consultation room or on emergency rounds. Queue routing is temporarily paused.',
          icon: UserX,
          textColor: 'text-[#DC2626]',
        };
      default:
        return {
          label: 'Available',
          badgeBg: 'bg-[#F0FDF4] border-[#DCFCE7] text-[#15803D]',
          dotColor: 'bg-[#15803D]',
          pulse: true,
          desc: 'Ready for next patient.',
          icon: CheckCircle2,
          textColor: 'text-[#15803D]',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Title + Current Status Badge */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Your Status
            </h2>
            <span className="text-[10px] text-[#94A3B8] font-medium">• Live Control</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Pill Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs sm:text-sm font-bold ${config.badgeBg}`}
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2 w-2">
                {config.pulse && (
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`}
                  />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`}
                />
              </span>
              <span>{config.label}</span>
            </div>

            <p className="text-xs text-[#64748B] hidden md:block">
              {config.desc}
            </p>
          </div>
          <p className="text-xs text-[#64748B] md:hidden">
            {config.desc}
          </p>
        </div>

        {/* Right: Interactive State Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {status !== 'Available' && (
            <button
              type="button"
              onClick={() => setStatus('Available')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#15803D] text-white hover:bg-[#166534] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] cursor-pointer"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Mark Available
            </button>
          )}

          {status !== 'Busy' && (
            <button
              type="button"
              onClick={() => setStatus('Busy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E2E8F0] text-amber-700 hover:bg-amber-50 hover:border-amber-300 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
            >
              <Clock className="h-3.5 w-3.5" />
              Mark Busy
            </button>
          )}

          {status !== 'Unavailable' && (
            <button
              type="button"
              onClick={() => setStatus('Unavailable')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E2E8F0] text-rose-700 hover:bg-rose-50 hover:border-rose-300 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
            >
              <UserX className="h-3.5 w-3.5" />
              Mark Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
