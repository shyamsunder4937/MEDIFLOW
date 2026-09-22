import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

export const ClerkAuthWrapper = ({ mode = 'signin' }) => {
  // Redirect to auth-redirect page after successful authentication
  // This page will determine the user's role and redirect accordingly
  const redirectUrl = '/auth-redirect';

  const customAppearance = {
    variables: {
      colorPrimary: '#15803D',
      colorText: '#17221B',
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
        'bg-[#15803D] hover:bg-[#166534] active:scale-[0.99] text-white text-sm font-semibold rounded-xl py-2.5 transition duration-150 shadow-xs cursor-pointer',
      socialButtonsBlockButton:
        'border-[#E2E8F0] hover:bg-slate-50 text-[#17221B] rounded-xl text-xs font-semibold transition duration-150 py-2.5 shadow-2xs',
      formFieldInput:
        'rounded-xl border-[#E2E8F0] focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] text-sm text-[#17221B] placeholder:text-slate-400',
      footerActionLink: 'text-[#15803D] hover:text-[#166534] font-semibold hover:underline',
      dividerLine: 'bg-[#E2E8F0]',
      dividerText: 'text-xs text-[#64748B] font-medium',
      formFieldLabel: 'text-xs font-semibold text-[#17221B] mb-1',
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
          fallbackRedirectUrl={redirectUrl}
          forceRedirectUrl={redirectUrl}
        />
      ) : (
        <SignIn
          appearance={customAppearance}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl={redirectUrl}
          forceRedirectUrl={redirectUrl}
        />
      )}
    </div>
  );
};
