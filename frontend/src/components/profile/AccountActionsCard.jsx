import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { LogOut, AlertTriangle } from 'lucide-react';

export const AccountActionsCard = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  return (
    <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 flex-shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] mb-1">Account Actions</h2>
          <p className="text-xs text-[#64748B]">
            Manage your session and account access
          </p>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </div>
  );
};
