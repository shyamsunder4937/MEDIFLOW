import React, { useState } from 'react';
import {
  Eye,
  Edit2,
  MoreVertical,
  UserCheck,
  UserX,
  AlertCircle,
  Calendar,
  Building2,
  Mail,
} from 'lucide-react';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';

export const UserTable = ({
  users,
  onViewUser,
  onEditUser,
  onChangeStatus,
}) => {
  const [openActionDropdown, setOpenActionDropdown] = useState(null);

  const toggleDropdown = (userId, e) => {
    e.stopPropagation();
    setOpenActionDropdown(openActionDropdown === userId ? null : userId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[780px]">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
            <th className="py-3.5 pl-4 pr-2">User ID</th>
            <th className="py-3.5 px-3">Name & Email</th>
            <th className="py-3.5 px-3">Role</th>
            <th className="py-3.5 px-3">Department</th>
            <th className="py-3.5 px-3">Status</th>
            <th className="py-3.5 px-3">Joined</th>
            <th className="py-3.5 pr-4 pl-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0] text-xs">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50/70 transition-colors duration-100 group"
            >
              {/* User ID */}
              <td className="py-3.5 pl-4 pr-2 font-mono text-[11px] font-bold text-[#0F766E] whitespace-nowrap">
                {user.id}
              </td>

              {/* Name & Email */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-[#CCFBF1] text-[#0F766E] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#0F766E]/20">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1 truncate">
                      <Mail className="h-2.5 w-2.5 text-[#94A3B8]" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <UserRoleBadge role={user.role} />
              </td>

              {/* Department */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <span className="font-medium text-[#334155] flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-[#94A3B8]" />
                  {user.department}
                </span>
              </td>

              {/* Status */}
              <td className="py-3.5 px-3 whitespace-nowrap">
                <UserStatusBadge status={user.status} />
              </td>

              {/* Joined */}
              <td className="py-3.5 px-3 whitespace-nowrap text-[#64748B] text-[11px]">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#94A3B8]" />
                  {user.joined}
                </div>
              </td>

              {/* Actions */}
              <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1 relative">
                  {/* Quick Action Buttons */}
                  <button
                    onClick={() => onViewUser(user)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                    title="View Details"
                    aria-label={`View details for ${user.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onEditUser(user)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F766E] hover:bg-[#CCFBF1]/40 transition-colors cursor-pointer"
                    title="Edit User"
                    aria-label={`Edit ${user.name}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  {/* Context Dropdown Toggle */}
                  <button
                    onClick={(e) => toggleDropdown(user.id, e)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="More actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {openActionDropdown === user.id && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setOpenActionDropdown(null)}
                      />
                      <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100 text-left">
                        <button
                          onClick={() => {
                            setOpenActionDropdown(null);
                            onViewUser(user);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-[#0F766E]" />
                          View Profile
                        </button>

                        <button
                          onClick={() => {
                            setOpenActionDropdown(null);
                            onEditUser(user);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-blue-600" />
                          Edit Profile
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        {user.status === 'Active' ? (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(user.id, 'Inactive');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <UserX className="h-3.5 w-3.5 text-slate-500" />
                            Deactivate User
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(user.id, 'Active');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          >
                            <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                            Activate User
                          </button>
                        )}

                        {user.status !== 'Suspended' ? (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(user.id, 'Suspended');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                            Suspend Account
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setOpenActionDropdown(null);
                              onChangeStatus(user.id, 'Active');
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          >
                            <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                            Unsuspend User
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
