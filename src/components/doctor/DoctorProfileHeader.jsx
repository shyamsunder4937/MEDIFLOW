import React from 'react';
import { Mail, Building2, ShieldCheck, Stethoscope, Star, Award } from 'lucide-react';

export const DoctorProfileHeader = ({ profile, availability }) => {
  const getInitials = (name) => {
    if (!name) return 'AK';
    return name
      .split(' ')
      .filter((n) => !n.startsWith('Dr.'))
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AK';
  };

  const getStatusBadge = (status) => {
    if (status === 'Available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for Consultations
        </span>
      );
    }
    if (status === 'Busy') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Busy with Patient
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        Currently Unavailable
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
        {/* Left: Avatar & Identity */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-2xl sm:text-3xl shadow-xs border border-[#0F766E]/20 flex-shrink-0">
            {getInitials(profile.name)}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                {profile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
                {profile.badge || 'MD, FACP'}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#0F766E]">
              {profile.department}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#64748B] pt-0.5">
              <span className="font-semibold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded">
                Doctor ID: {profile.doctorId}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#475569]">
                <Mail className="h-3.5 w-3.5 text-[#94A3B8]" />
                {profile.email}
              </span>
            </div>

            <div className="text-xs text-[#64748B] flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Building2 className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>{profile.hospital}</span>
            </div>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div className="self-center sm:self-start">
          {getStatusBadge(availability)}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileHeader;
