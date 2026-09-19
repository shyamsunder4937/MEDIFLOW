import React from 'react';
import {
  AlertTriangle,
  Clock,
  Microscope,
  Package,
  Info,
  CheckCircle2,
} from 'lucide-react';

const STAGE_ICON_MAP = {
  Queue: Clock,
  Laboratory: Microscope,
  Pharmacy: Package,
};

export const WorkflowAttentionCards = ({ alerts }) => {
  return (
    <section aria-label="Workflow Attention Indicators" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                Workflow Attention
              </h3>
              <p className="text-xs text-[#64748B]">
                Live operational observations across waiting zones and fulfillment stations.
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200">
            <Info className="h-3 w-3 text-slate-400" />
            Mock Workflow Indicator
          </span>
        </div>

        {/* Attention Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {alerts.map((alert) => {
            const Icon = STAGE_ICON_MAP[alert.stage] || AlertTriangle;

            let badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
            let iconBoxStyle = 'bg-amber-100 text-amber-800';

            if (alert.level === 'Normal') {
              badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              iconBoxStyle = 'bg-emerald-100 text-emerald-800';
            }

            return (
              <div
                key={alert.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-[#0F172A] flex items-center gap-1.5">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center ${iconBoxStyle}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {alert.stage}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeStyle}`}>
                      {alert.count}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#0F172A] mb-1">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-[#475569] leading-relaxed mb-2.5">
                    {alert.message}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-[10px] text-[#0F766E] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3 w-3 text-[#0F766E] flex-shrink-0" />
                  <span className="truncate">{alert.recommendation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowAttentionCards;
