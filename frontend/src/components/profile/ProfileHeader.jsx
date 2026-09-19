import React from 'react';
import { UserCircle, Edit2, CheckCircle2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

export const ProfileHeader = ({ profile, isEditing, onEditClick }) => {
  const { user } = useUser();
  const avatarUrl = user?.imageUrl;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={profile.name}
              className="h-24 w-24 rounded-full border-4 border-[#CCFBF1] shadow-md object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white shadow-md">
              <UserCircle className="h-12 w-12" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{profile.name}</h1>
          <p className="text-sm text-[#64748B] mb-3">{profile.role}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <span className="text-[#64748B]">Patient ID:</span>
              <span className="ml-2 font-semibold text-[#0F172A]">{profile.patientId}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748B]">Status:</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                <span className="font-semibold text-[#16A34A]">{profile.accountStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex-shrink-0">
          <button
            onClick={onEditClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            {isEditing ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Done Editing
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
