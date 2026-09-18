import React from 'react';
import {
  Activity,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  Layers,
  Clock,
} from 'lucide-react';

const PATIENT_FEATURES = [
  'Manage appointments',
  'Track your queue in real time',
  'Follow your complete hospital journey',
];

export const SignUpBrandPanel = () => {
  return (
    <div className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#0F766E] to-[#115E59] text-white overflow-hidden select-none w-full h-full">
      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      {/* Soft ambient glow orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

      {/* Top: Brand Logo */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 shadow-sm">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-wider text-white">
            MEDIFLOW
          </span>
        </div>
        <p className="text-xs font-medium text-teal-100/80 tracking-wide pl-[52px]">
          AI-powered hospital coordination
        </p>
      </div>

      {/* Center: Headline + Features + Visual Card */}
      <div className="relative z-10 my-8 space-y-8 max-w-lg">
        {/* Value proposition */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            Smarter patient flow.
            <br />
            <span className="text-teal-200">Better care.</span>
          </h2>

          <p className="text-sm sm:text-base text-teal-50/90 leading-relaxed font-normal">
            Create your MediFlow account and manage your hospital journey from
            one place.
          </p>
        </div>

        {/* Patient feature highlights */}
        <div className="space-y-3 pt-1" role="list" aria-label="Platform features">
          {PATIENT_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              role="listitem"
              className="flex items-center gap-3 text-sm font-medium text-white/95"
            >
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#16A34A]/25 border border-[#16A34A]/40 text-[#4ADE80]">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Patient Journey Workflow Visual */}
        <div
          className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 shadow-lg space-y-4 mt-6"
          aria-hidden="true"
        >
          {/* Card header */}
          <div className="flex items-center justify-between text-xs text-teal-100 font-semibold uppercase tracking-wider">
            <span>Your Hospital Journey</span>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-300 normal-case font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-time tracking
            </span>
          </div>

          {/* Journey stage nodes */}
          <div className="grid grid-cols-3 gap-2">
            {/* Stage 1 */}
            <div className="rounded-xl bg-white/10 p-3 text-center border border-white/10 space-y-1.5">
              <CalendarCheck className="h-4 w-4 mx-auto text-teal-200" />
              <div className="text-[11px] font-semibold text-white leading-tight">Book</div>
              <div className="text-[9px] text-teal-200/80 font-mono">Appointment</div>
            </div>

            {/* Stage 2 - active */}
            <div className="rounded-xl bg-white/20 p-3 text-center border border-white/25 shadow-sm space-y-1.5 ring-1 ring-white/30">
              <Layers className="h-4 w-4 mx-auto text-white" />
              <div className="text-[11px] font-bold text-white leading-tight">Queue</div>
              <div className="text-[9px] text-teal-100 font-mono">Live status</div>
            </div>

            {/* Stage 3 */}
            <div className="rounded-xl bg-white/10 p-3 text-center border border-white/10 space-y-1.5">
              <Clock className="h-4 w-4 mx-auto text-teal-200" />
              <div className="text-[11px] font-semibold text-white leading-tight">Journey</div>
              <div className="text-[9px] text-teal-200/80 font-mono">Full history</div>
            </div>
          </div>

          {/* Decorative progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-teal-200/70 font-mono">
              <span>Patient flow progress</span>
              <span>Step 1 of 3</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-teal-300 to-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Security note */}
      <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-teal-100/80">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-teal-200" />
          <span>Secure • Private • Connected</span>
        </span>
        <span className="text-[11px] font-mono opacity-80">v1.0 Healthcare SaaS</span>
      </div>
    </div>
  );
};
