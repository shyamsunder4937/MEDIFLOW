import React from 'react';
import { Users, Clock, Sparkles, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

export const QueueOverviewCard = ({ queueData }) => {
  const {
    formattedQueueNumber,
    patientsAhead,
    estimatedWait,
    status,
    totalInQueue = 18,
  } = queueData;

  // Calculate queue progress percentage (e.g. patients served so far)
  const servedCount = Math.max(0, queueData.queueNumber - patientsAhead - 1);
  const progressPercent = Math.min(100, Math.round(((servedCount + 1) / totalInQueue) * 100));

  // Circular gauge SVG parameters (proportioned to prevent any stroke overlap)
  const size = 124;
  const stroke = 5;
  const center = size / 2;
  const normalizedRadius = center - stroke - 4; // radius = 58 - 5 - 4 = 53px
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Top Header Strip ── */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#17221B] uppercase tracking-wider">
              Live Queue Status
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-[#15803D]/25 text-[#15803D] px-2.5 py-1 rounded-full text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
          </span>
          <span>{status}</span>
        </div>
      </div>

      {/* ── Main Content Body: 3-5 Second Scan ── */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Prominent Token Display & Progress Dial */}
          <div className="md:col-span-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pb-5 md:pb-0 border-b md:border-b-0 md:border-r border-[#E2E8F0]">
            {/* Circular Progress Gauge with Centered Queue Number */}
            <div className="relative flex items-center justify-center flex-shrink-0 w-[124px] h-[124px]">
              <svg height={size} width={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  stroke="#F1F5F9"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={center}
                  cy={center}
                />
                {/* Progress circle */}
                <circle
                  stroke="#15803D"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                  r={normalizedRadius}
                  cx={center}
                  cy={center}
                />
              </svg>

              {/* Inner Center Content with generous breathing room */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] leading-tight">
                  Token
                </span>
                <span className="text-3xl font-black text-[#15803D] tracking-tight leading-none my-1">
                  {formattedQueueNumber}
                </span>
                <span className="text-[10px] text-[#15803D] font-bold bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#BBF7D0] leading-tight">
                  Active
                </span>
              </div>
            </div>

            {/* Queue Summary Text */}
            <div className="text-center sm:text-left space-y-1 min-w-0">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Your Assigned Spot
              </div>
              <div className="text-xl font-bold text-[#17221B] tracking-tight">
                Position {formattedQueueNumber}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                OPD Block B lounge. You will be called when token #06 concludes.
              </p>
            </div>
          </div>

          {/* Right: Key Primary Metrics Grid */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
            
            {/* Stat 1: Patients Ahead */}
            <div className="bg-slate-50/80 p-4 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#64748B]">Patients Ahead</span>
                <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#17221B] tracking-tight">
                  {patientsAhead}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Ahead of you in line
                </div>
              </div>
            </div>

            {/* Stat 2: Estimated Wait */}
            <div className="bg-slate-50/80 p-4 rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#64748B]">Estimated Wait</span>
                <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#17221B] tracking-tight">
                  {estimatedWait} <span className="text-xs sm:text-sm font-semibold text-[#64748B]">min</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  ~4 min / patient avg
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Horizontal Progress Line ── */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#17221B] flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#15803D]" />
              Queue Advancement Progress
            </span>
            <span className="text-[#64748B] text-xs">
              Position <strong className="text-[#17221B]">7</strong> of {totalInQueue} registered
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-[#15803D] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#64748B] mt-2">
            <span>Counter Opened 09:30 AM</span>
            <span className="font-semibold text-[#15803D]">{progressPercent}% of queue completed</span>
            <span>Target Turn: ~11:00 AM</span>
          </div>
        </div>

      </div>
    </div>
  );
};
