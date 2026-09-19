import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

export const AdminLayout = ({ children, title, subtitle }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if testing in demo mode or local mock
  const isDemoAuth =
    typeof window !== 'undefined' &&
    (sessionStorage.getItem('mediflow_auth') === 'demo' ||
     localStorage.getItem('mediflow_user_role') === 'admin');

  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // While Clerk is loading, show subtle spinner if not in explicit demo mode
  if (!isLoaded && !isDemoAuth && hasClerkKey) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#0F766E] border-t-transparent animate-spin" />
          <p className="text-sm text-[#64748B] font-medium">Loading Admin Portal…</p>
        </div>
      </div>
    );
  }

  // If Clerk key exists, user is not signed in and not in demo mode, redirect to admin login
  if (hasClerkKey && !isSignedIn && !isDemoAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Fixed Desktop / Drawer Mobile Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="flex flex-col flex-1 min-h-screen lg:pl-64">
        <AdminHeader
          onMenuOpen={() => setSidebarOpen(true)}
          title={title}
          subtitle={subtitle}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
