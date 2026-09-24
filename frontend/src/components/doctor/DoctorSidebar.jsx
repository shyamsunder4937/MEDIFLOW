import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import {
  Stethoscope,
  LayoutDashboard,
  ListOrdered,
  Users,
  FlaskConical,
  ClipboardList,
  UserCircle,
  HelpCircle,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

const DOCTOR_NAV_ITEMS = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '/doctor/dashboard' },
  { label: 'Queue',         icon: ListOrdered,     href: '/doctor/queue', badge: 8 },
  { label: 'Patients',      icon: Users,           href: '/doctor/patients' },
  { label: 'Consultations', icon: ClipboardList,   href: '/doctor/consultations' },
  { label: 'Lab Results',   icon: FlaskConical,    href: '/doctor/lab-results', badge: 4 },
  { label: 'Profile',       icon: UserCircle,      href: '/doctor/profile' },
];

const BOTTOM_ITEMS = [
  { label: 'Help & Support', icon: HelpCircle, href: '/doctor/help' },
  { label: 'Settings',       icon: Settings,   href: '/doctor/settings' },
];

export const DoctorSidebar = ({ isOpen, onClose }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    sessionStorage.removeItem('mediflow_auth');
    try {
      if (signOut) {
        await signOut();
      }
    } catch {
      // ignore in demo
    }
    navigate('/sign-in');
  };

  const isItemActive = (href) => {
    if (href === '/doctor/dashboard') {
      return location.pathname === '/doctor/dashboard';
    }
    if (href === '/doctor/queue') {
      return location.pathname === '/doctor/queue';
    }
    if (href === '/doctor/patients') {
      return location.pathname.startsWith('/doctor/patient');
    }
    if (href === '/doctor/consultations') {
      return location.pathname.startsWith('/doctor/consultation');
    }
    if (href === '/doctor/lab-results') {
      return location.pathname.startsWith('/doctor/lab-results');
    }
    if (href === '/doctor/profile') {
      return location.pathname.startsWith('/doctor/profile');
    }
    return location.pathname === href;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E2E8F0] select-none">
      {/* ── Logo & Portal Badge ── */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] shadow-2xs flex-shrink-0">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wider text-[#17221B] flex items-center gap-1.5">
              MEDIFLOW
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
                MD
              </span>
            </div>
            <div className="text-[11px] text-[#15803D] font-semibold">
              Doctor Portal
            </div>
          </div>
        </div>

        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Main Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Doctor navigation">
        <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          Clinical Overview
        </div>
        {DOCTOR_NAV_ITEMS.map(({ label, icon: Icon, href, badge }) => {
          const isActive = isItemActive(href);
          return (
            <NavLink
              key={href}
              to={href}
              onClick={onClose}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                isActive
                  ? 'bg-[#F0FDF4] text-[#15803D] font-semibold shadow-2xs border border-[#DCFCE7]'
                  : 'text-[#475569] hover:bg-slate-50 hover:text-[#17221B]'
              }`}
            >
              {/* Active left accent pill */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#15803D]" />
              )}
              <Icon
                className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#15803D]' : 'text-[#94A3B8] group-hover:text-[#475569]'
                }`}
              />
              <span className="flex-1 truncate">{label}</span>
              {badge !== undefined && (
                <span
                  className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    isActive
                      ? 'bg-[#15803D] text-white'
                      : 'bg-slate-100 text-[#475569] group-hover:bg-[#F0FDF4] group-hover:text-[#15803D]'
                  }`}
                >
                  {badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Shift / OPD Info Box ── */}
      <div className="px-3 pb-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs">
          <div className="flex items-center justify-between text-[#64748B] font-medium text-[11px] mb-1">
            <span>Current Shift</span>
            <span className="flex items-center gap-1 text-[#15803D] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
              Active
            </span>
          </div>
          <div className="font-semibold text-[#17221B] text-xs">Suite 4B • OPD</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">08:00 AM – 04:00 PM</div>
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className="px-3 py-3 border-t border-[#E2E8F0] space-y-0.5">
        {BOTTOM_ITEMS.map(({ label, icon: Icon, href }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#17221B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-[#94A3B8]" />
            {label}
          </NavLink>
        ))}

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#DC2626] hover:bg-red-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-left cursor-pointer"
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
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed top-0 left-0 h-screen w-72 z-50 shadow-2xl bg-white animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};
