import React from 'react';
import { Mail, Phone, MapPin, Building2, Map, Globe } from 'lucide-react';

export const ContactInformationCard = ({ profile, isEditing, onProfileChange }) => {
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
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all"
        />
      ) : (
        <p className="text-sm font-medium text-[#0F172A] px-3 py-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          {value || '—'}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#0F172A] mb-5">Contact Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="sm:col-span-2">
          <InfoField
            icon={MapPin}
            label="Address"
            value={profile.address}
            field="address"
          />
        </div>
        <InfoField
          icon={Building2}
          label="City"
          value={profile.city}
          field="city"
        />
        <InfoField
          icon={Map}
          label="State"
          value={profile.state}
          field="state"
        />
        <InfoField
          icon={Globe}
          label="Country"
          value={profile.country}
          field="country"
        />
      </div>
    </div>
  );
};
