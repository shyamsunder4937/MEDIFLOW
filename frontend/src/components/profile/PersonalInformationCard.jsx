import React from 'react';
import { User, Mail, Phone, Calendar, Users2, Droplet } from 'lucide-react';

export const PersonalInformationCard = ({ profile, isEditing, onProfileChange }) => {
  const handleChange = (field, value) => {
    onProfileChange({ ...profile, [field]: value });
  };

  const InfoField = ({ icon: Icon, label, value, field, type = 'text' }) => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </label>
      {isEditing ? (
        type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all"
          >
            {field === 'gender' ? (
              <>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </>
            )}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all"
          />
        )
      ) : (
        <p className="text-sm font-medium text-[#0F172A] px-3 py-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          {value || '—'}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#0F172A] mb-5">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InfoField
          icon={User}
          label="Full Name"
          value={profile.name}
          field="name"
        />
        <InfoField
          icon={Mail}
          label="Email Address"
          value={profile.email}
          field="email"
          type="email"
        />
        <InfoField
          icon={Phone}
          label="Phone Number"
          value={profile.phone}
          field="phone"
          type="tel"
        />
        <InfoField
          icon={Calendar}
          label="Date of Birth"
          value={profile.dateOfBirth}
          field="dateOfBirth"
        />
        <InfoField
          icon={Users2}
          label="Gender"
          value={profile.gender}
          field="gender"
          type="select"
        />
        <InfoField
          icon={Droplet}
          label="Blood Group"
          value={profile.bloodGroup}
          field="bloodGroup"
          type="select"
        />
      </div>
    </div>
  );
};
