import React from 'react';
import { Bell, Settings, Calendar, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';

const Topbar = () => {
  return (
    <header 
      className="sticky top-0 z-20 h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-white via-white to-blue-50/30 shadow-sm"
    >
      {/* Left side (empty, for symmetry or breadcrumbs if needed) */}
      <div></div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-gray-200 text-sm text-gray-600 shadow-sm">
          <Calendar size={16} className="text-gray-400" />
          <span>Hari ini, 29 Okt 2025</span>
          <ChevronDown size={14} className="text-gray-400 ml-1" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100/80 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-full border border-white shadow-sm shadow-red-500/40"></span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100/80 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{currentUser.nama}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-100">
            {currentUser.avatar}
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
