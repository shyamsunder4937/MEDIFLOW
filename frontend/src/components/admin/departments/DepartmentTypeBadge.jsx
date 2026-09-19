import React from 'react';
import {
  Stethoscope,
  Microscope,
  HelpCircle,
  Package,
} from 'lucide-react';

export const DepartmentTypeBadge = ({ type }) => {
  switch (type) {
    case 'Clinical':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 whitespace-nowrap">
          <Stethoscope className="h-3 w-3 text-sky-600" />
          Clinical
        </span>
      );
    case 'Diagnostic':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 whitespace-nowrap">
          <Microscope className="h-3 w-3 text-purple-600" />
          Diagnostic
        </span>
      );
    case 'Support':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 whitespace-nowrap">
          <Package className="h-3 w-3 text-teal-600" />
          Support
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 whitespace-nowrap">
          <HelpCircle className="h-3 w-3 text-slate-500" />
          {type || 'General'}
        </span>
      );
  }
};

export default DepartmentTypeBadge;
