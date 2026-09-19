import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Activity } from 'lucide-react';
import { getUserRole, getRoleRedirectPath } from '../../utils/roleConfig';

/**
 * ProtectedRoute Component
 * Requires user to be authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return <LoadingScreen message="Loading..." />;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

/**
 * RoleProtectedRoute Component
 * Requires user to be authenticated AND have the required role
 */
export const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const isDemoAuth =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('mediflow_auth') === 'demo';

  const mockRole =
    typeof window !== 'undefined'
      ? localStorage.getItem('mediflow_user_role')
      : null;

  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // Allow direct access in demo mode or if local dev mockRole matches
  if (isDemoAuth || mockRole === requiredRole || !hasClerkKey) {
    return children;
  }

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return <LoadingScreen message="Verifying permissions..." />;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Check if user has required role
  const userRole = getUserRole(user);
  
  if (userRole !== requiredRole) {
    // User doesn't have required role - show unauthorized page
    return <UnauthorizedPage userRole={userRole} />;
  }

  return children;
};

/**
 * Loading Screen Component
 */
const LoadingScreen = ({ message }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-lg animate-pulse">
        <Activity className="h-8 w-8" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold text-[#0F172A]">MediFlow AI</h2>
        <p className="text-sm text-[#64748B]">{message}</p>
      </div>
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 rounded-full bg-[#0F766E] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

/**
 * Unauthorized Page Component
 */
const UnauthorizedPage = ({ userRole }) => {
  const correctPath = getRoleRedirectPath(userRole);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Access Restricted</h1>
        <p className="text-sm text-[#64748B] mb-6">
          You don't have permission to access this portal. Please return to your designated dashboard.
        </p>
        
        <a
          href={correctPath}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          Go to My Portal
        </a>
        
        <p className="text-xs text-[#94A3B8] mt-6">
          Error Code: 403 - Unauthorized Access
        </p>
      </div>
    </div>
  );
};
