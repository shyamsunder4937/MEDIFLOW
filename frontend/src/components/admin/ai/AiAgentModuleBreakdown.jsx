import React from 'react';
import {
  Users,
  Stethoscope,
  Microscope,
  Package,
  Activity,
  Calendar,
  Layers,
} from 'lucide-react';

const MODULE_ICON_MAP = {
  Queue: Users,
  Doctor: Stethoscope,
  Laboratory: Microscope,
  Pharmacy: Package,
  Workflow: Activity,
  Appointments: Calendar,
};

export const AiAgentModuleBreakdown = ({ modules }) => {
  return (
    <section aria-label="Agent Activity by Module" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                Agent Activity by Module
              </h3>
              <p className="text-xs text-[#64748B]">
                Distribution of simulated intelligence events across hospital operational modules.
              </p>
            </div>
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {modules.map((item) => {
            const Icon = MODULE_ICON_MAP[item.module] || Activity;

            return (
              <div
                key={item.module}
                className="p-3.5 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-bold text-xs text-[#0F172A]">
                    {item.module}
                  </span>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${item.bgColor} ${item.color} border ${item.borderColor}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                </div>

                <div>
                  <div className="text-lg font-extrabold text-[#0F172A] tracking-tight">
                    {item.count}{' '}
                    <span className="text-[11px] font-normal text-[#64748B]">
                      actions
                    </span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    Simulation tracked
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AiAgentModuleBreakdown;
