import React from 'react';
import { Users, Clock, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';

export const QueueOverviewCard = ({ queueData }) => {
  const {
    formattedQueueNumber,
    patientsAhead,
    estimatedWait,
    status,
    totalInQueue = 18,
  } = queueData;

  // Calculate queue progress percentage (e.g. patients served so far)
  // Assuming out of 18, position 7 means ~5 served, 1 in consult, 12 remaining
  const servedCount = Math.max(0, queueData.queueNumber - patientsAhead - 1);
  const progressPercent = Math.min(100, Math.round(((servedCount + 1) / totalInQueue) * 100));

  // Circular gauge SVG parameters
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-all">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-[#0F766E] to-[#115E59] px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#CCFBF1]" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">Your Queue</h2>
            <p className="text-xs text-[#CCFBF1] font-medium">Live outpatient consultation line</p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-300/30 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="text-xs font-semibold text-amber-100 tracking-wide uppercase">
            {status}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-7">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Prominent Queue Number & Visual Dial */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-[#E2E8F0]">
            {/* Circular Progress Gauge with Centered Queue Number */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <svg height={radius * 2 + 16} width={radius * 2 + 16} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  stroke="#F1F5F9"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius + 8}
                  cy={radius + 8}
                />
                {/* Progress circle */}
                <circle
                  stroke="#0F766E"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  r={normalizedRadius}
                  cx={radius + 8}
                  cy={radius + 8}
                />
              </svg>

              {/* Inner Center Content */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">Token</span>
                <span className="text-3xl sm:text-4xl font-black text-[#0F766E] tracking-tight">
                  {formattedQueueNumber}
                </span>
                <span className="text-[10px] text-[#0F766E] font-semibold bg-[#CCFBF1] px-2 py-0.5 rounded-full mt-0.5">
                  Priority Active
                </span>
              </div>
            </div>

            {/* Queue Summary Text */}
            <div className="text-center sm:text-left space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Assigned Token
              </div>
              <div className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Queue Number {formattedQueueNumber}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed max-w-xs">
                Please remain within OPD Block B waiting lounge. You will be called when token #06 finishes.
              </p>
            </div>
          </div>

          {/* Right: Key Queue Stats (Patients Ahead & Wait Time) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            
            {/* Stat 1: Patients Ahead */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] flex flex-col justify-between hover:border-[#CBD5E1] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#64748B]">Patients Ahead</span>
                <div className="h-7 w-7 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {patientsAhead}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  In line before your turn
                </div>
              </div>
            </div>

            {/* Stat 2: Estimated Wait */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] flex flex-col justify-between hover:border-[#CBD5E1] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#64748B]">Estimated Wait</span>
                <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {estimatedWait} <span className="text-sm font-semibold text-[#64748B]">min</span>
                </div>
                <div className="text-[11px] text-amber-700 font-medium mt-0.5 flex items-center gap-1">
                  <span>~4 min / patient avg</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#0F766E]" />
              Queue Advancement Progress
            </span>
            <span className="text-[#64748B] font-medium">
              Position <strong>7</strong> of {totalInQueue} patients
            </span>
          </div>

          <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0F766E] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#64748B] mt-2">
            <span>Counter Opened 09:30 AM</span>
            <span className="font-medium text-[#0F766E]">{progressPercent}% of queue processed</span>
            <span>Target Turn: ~11:00 AM</span>
          </div>
        </div>

      </div>
    </div>
  );
};
