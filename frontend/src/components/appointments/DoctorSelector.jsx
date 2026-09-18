import React from 'react';
import { Star, CheckCircle, Stethoscope, MapPin, AlertCircle } from 'lucide-react';
import { mockDoctors } from '../../data/mockAppointmentsData';

export const DoctorSelector = ({ selectedDepartment, selectedDoctor, onSelectDoctor }) => {
  // Filter doctors for the selected department
  const filteredDoctors = mockDoctors.filter(
    (doc) => doc.departmentId === selectedDepartment?.id
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A]">Select Doctor</h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Available medical specialists in <span className="font-semibold text-[#0F766E]">{selectedDepartment?.name}</span>.
          </p>
        </div>
        <span className="text-xs text-[#64748B]">
          {filteredDoctors.filter((d) => d.available).length} of {filteredDoctors.length} available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredDoctors.map((doc) => {
          const isSelected = selectedDoctor?.id === doc.id;
          const isAvailable = doc.available;

          return (
            <button
              key={doc.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectDoctor(doc)}
              className={`text-left p-4 rounded-2xl border transition-all duration-150 relative flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                !isAvailable
                  ? 'opacity-60 bg-slate-50 border-slate-200 cursor-not-allowed'
                  : isSelected
                  ? 'border-[#0F766E] bg-[#CCFBF1]/20 ring-1 ring-[#0F766E] shadow-xs cursor-pointer'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 text-[#0F766E]">
                  <CheckCircle className="h-4 w-4 fill-[#0F766E] text-white" />
                </div>
              )}

              <div>
                <div className="flex items-start gap-3">
                  {/* Doctor Avatar / Initials */}
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      !isAvailable
                        ? 'bg-slate-200 text-slate-500'
                        : isSelected
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-teal-50 text-[#0F766E]'
                    }`}
                  >
                    {doc.avatarInitials}
                  </div>

                  <div className="min-w-0 pr-5">
                    <div className="text-sm font-bold text-[#0F172A] truncate">
                      {doc.name}
                    </div>
                    <div className="text-xs text-[#64748B] truncate mt-0.5">
                      {doc.specialization}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                      {doc.experience}
                    </div>
                  </div>
                </div>

                {/* Room location & rating */}
                <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#94A3B8]" />
                    <span className="truncate">{doc.room}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                </div>
              </div>

              {/* Availability badge */}
              <div className="mt-3 pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-between">
                <div className="text-[11px] text-[#64748B]">Consultation Status</div>
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                    <AlertCircle className="h-3 w-3" />
                    Unavailable
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
