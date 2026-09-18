import React from 'react';
import { FileText, Sparkles, Check, Clock } from 'lucide-react';

export const ClinicalNotes = ({ notes, setNotes }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Clinical Notes
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Record physical examination, diagnosis impressions, and consultation summary
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#0F766E] bg-[#CCFBF1]/50 border border-[#0F766E]/20 px-2.5 py-1 rounded-full font-semibold">
          <Check className="h-3 w-3" />
          <span>Auto-saved locally</span>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <label htmlFor="clinical-notes-input" className="sr-only">
          Clinical Notes
        </label>
        <textarea
          id="clinical-notes-input"
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter consultation notes..."
          className="w-full rounded-xl border border-[#E2E8F0] p-4 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 leading-relaxed focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all resize-y"
        />
        <div className="flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Prompt: Patient reports symptoms discussed during consultation.</span>
          <span>{notes.length} characters</span>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
