import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

export const ClerkAuthWrapper = ({ mode = 'signin', selectedRole = 'patient' }) => {
  const targetDashboard =
    selectedRole === 'doctor'
      ? '/doctor/dashboard'
      : selectedRole === 'staff'
      ? '/staff/dashboard'
      : '/patient/dashboard';

  const customAppearance = {
    variables: {
      colorPrimary: '#0F766E',
      colorText: '#0F172A',
      colorTextSecondary: '#64748B',
      colorBackground: '#FFFFFF',
      colorInputBackground: '#FFFFFF',
      colorInputBorder: '#E2E8F0',
      borderRadius: '0.75rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    },
    elements: {
      rootBox: 'w-full',
      card: 'shadow-none p-0 w-full bg-transparent border-0',
      headerTitle: 'hidden',
      headerSubtitle: 'hidden',
      formButtonPrimary:
        'bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.99] text-white text-sm font-semibold rounded-xl py-3 transition duration-150 shadow-sm',
      socialButtonsBlockButton:
        'border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] rounded-xl text-xs font-semibold transition duration-150 py-2.5',
      formFieldInput:
        'rounded-xl border-[#E2E8F0] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-sm text-[#0F172A] placeholder:text-slate-400',
      footerActionLink: 'text-[#0F766E] hover:text-[#115E59] font-semibold hover:underline',
      dividerLine: 'bg-[#E2E8F0]',
      dividerText: 'text-xs text-[#64748B] font-medium',
      formFieldLabel: 'text-xs font-semibold text-[#0F172A] mb-1',
    },
  };

  return (
    <div className="w-full flex justify-center">
      {mode === 'signup' ? (
        <SignUp
          appearance={customAppearance}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl={targetDashboard}
          forceRedirectUrl={targetDashboard}
        />
      ) : (
        <SignIn
          appearance={customAppearance}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl={targetDashboard}
          forceRedirectUrl={targetDashboard}
        />
      )}
    </div>
  );
};
