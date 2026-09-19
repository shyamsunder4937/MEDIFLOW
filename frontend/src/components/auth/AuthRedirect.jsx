import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Activity } from 'lucide-react';
import { getUserRole, getRoleRedirectPath, getRoleByEmail } from '../../utils/roleConfig';

/**
 * AuthRedirect Component
 * Handles post-authentication role-based redirection
 * Shows loading state while determining user role
 */
export const AuthRedirect = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Phase 1: Determine role by email
      const email = user.primaryEmailAddress?.emailAddress;
      const role = getRoleByEmail(email);
      
      // Store role in localStorage for Phase 1
      localStorage.setItem('mediflow_user_role', role);
      
      // Get redirect path
      const redirectPath = getRoleRedirectPath(role);
      
      // Redirect to role-specific dashboard
      navigate(redirectPath, { replace: true });
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  // Loading state
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-lg animate-pulse">
          <Activity className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-[#0F172A]">MediFlow AI</h2>
          <p className="text-sm text-[#64748B]">Checking your account...</p>
        </div>
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
