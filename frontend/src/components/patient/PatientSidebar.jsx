import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import {
  Activity,
  LayoutDashboard,
  CalendarDays,
  ListOrdered,
  Compass,
  FlaskConical,
  Pill,
  Bell,
  UserCircle,
  HelpCircle,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '/patient/dashboard'      },
  { label: 'Appointments',  icon: CalendarDays,    href: '/patient/appointments'   },
  { label: 'My Queue',      icon: ListOrdered,     href: '/patient/queue'          },
  { label: 'My Journey',    icon: Compass,         href: '/patient/journey'        },
  { label: 'Lab Results',   icon: FlaskConical,    href: '/patient/lab-results'    },
  { label: 'Pharmacy',      icon: Pill,            href: '/patient/pharmacy'       },
  { label: 'Notifications', icon: Bell,            href: '/patient/notifications', badge: 2 },
  { label: 'Profile',       icon: UserCircle,      href: '/patient/profile'        },
];

const BOTTOM_ITEMS = [
  { label: 'Help & Support', icon: HelpCircle, href: '/patient/help'     },
  { label: 'Settings',       icon: Settings,   href: '/patient/settings'  },
];

export const PatientSidebar = ({ isOpen, onClose }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    sessionStorage.removeItem('mediflow_auth');
    localStorage.removeItem('mediflow_user_role');
    try {
      if (signOut) {
        await signOut();
      }
    } catch {
      // ignore in demo mode
    }
    navigate('/sign-in');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E2E8F0]">
      {/* ── Logo ── */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#15803D] text-white shadow-xs flex-shrink-0">
            <Activity className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wider text-[#17221B]">
              MEDIFLOW
            </div>
            <div className="text-[10px] text-[#64748B] font-medium">
              Patient Portal
            </div>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden flex h-7 w-7 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Patient navigation">
        {NAV_ITEMS.map(({ label, icon: Icon, href, badge }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                isActive
                  ? 'bg-[#F0FDF4] text-[#15803D] font-semibold'
                  : 'text-[#475569] hover:bg-slate-50 hover:text-[#17221B]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active left accent bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#15803D]" />
                )}
                <Icon
                  className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-[#15803D]' : 'text-[#94A3B8] group-hover:text-[#475569]'
                  }`}
                />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#15803D] px-1 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom section ── */}
      <div className="px-3 py-3 border-t border-[#E2E8F0] space-y-0.5">
        {BOTTOM_ITEMS.map(({ label, icon: Icon, href }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                isActive
                  ? 'bg-[#F0FDF4] text-[#15803D] font-semibold'
                  : 'text-[#64748B] hover:bg-slate-50 hover:text-[#17221B]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#15803D]" />
                )}
                <Icon
                  className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-[#15803D]' : 'text-[#94A3B8] group-hover:text-[#475569]'
                  }`}
                />
                <span className="flex-1">{label}</span>
              </>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#DC2626] hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always-visible fixed sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile: slide-in drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed top-0 left-0 h-screen w-72 z-50 shadow-2xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};
