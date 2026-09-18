import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { PatientSidebar } from '../components/patient/PatientSidebar';
import { DashboardHeader } from '../components/patient/DashboardHeader';

export const PatientLayout = ({ children, title, subtitle }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // While Clerk loads, show a subtle loading screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#0F766E] border-t-transparent animate-spin" />
          <p className="text-sm text-[#64748B] font-medium">Loading MediFlow…</p>
        </div>
      </div>
    );
  }

  // If Clerk key is present and user is NOT signed in, redirect to sign-in
  // (If no Clerk key is set, isSignedIn will be null/false but we allow render for dev)
  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (hasClerkKey && !isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Fixed sidebar */}
      <PatientSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area — offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 min-h-screen lg:pl-64">
        <DashboardHeader
          onMenuOpen={() => setSidebarOpen(true)}
          title={title}
          subtitle={subtitle}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
