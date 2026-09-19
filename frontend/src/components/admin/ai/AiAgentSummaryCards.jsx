import React from 'react';
import {
  Bot,
  Activity,
  Users,
  BellRing,
} from 'lucide-react';

export const AiAgentSummaryCards = ({ counts }) => {
  const cards = [
    {
      id: 'agent_status',
      label: 'Agent Status',
      value: counts?.agentStatus ?? 'Simulation',
      supporting: 'Mock inference engine active',
      icon: Bot,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'actions_today',
      label: 'Actions Today',
      value: counts?.actionsToday ?? '42',
      supporting: 'Simulated workflow suggestions',
      icon: Activity,
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#CCFBF1]',
      borderColor: 'border-[#0F766E]/20',
    },
    {
      id: 'queue_actions',
      label: 'Queue Actions',
      value: counts?.queueActions ?? '18',
      supporting: 'Simulated triage & wait alerts',
      icon: Users,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'workflow_alerts',
      label: 'Workflow Alerts',
      value: counts?.workflowAlerts ?? '6',
      supporting: 'Simulated load notifications',
      icon: BellRing,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
  ];

  return (
    <section aria-label="AI Agent Summary Overview" className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                  {card.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bgColor} ${card.color} border ${card.borderColor} flex-shrink-0`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-none mb-1.5">
                  {card.value}
                </div>
                <div className="text-[11px] text-[#64748B] truncate">
                  {card.supporting}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AiAgentSummaryCards;
