'use client';

import { Menu, Bell, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function DashboardHeader({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-4 sticky top-0 z-30 flex-shrink-0">
      {/* Mobile menu trigger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title (desktop) */}
      {title && (
        <h1
          className="hidden sm:block text-base font-bold text-gray-900 flex-shrink-0"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
      )}

      {/* Search */}
      <div className="flex-1 max-w-md ml-auto lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search anything..."
            className="input !pl-10 h-10 text-sm rounded-xl bg-gray-50 border-gray-200 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16A34A] border-2 border-white" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="w-7 h-7 rounded-full grad-green flex items-center justify-center text-white font-bold text-xs flex-shrink-0">V</div>
          <span className="text-sm font-semibold text-gray-700 hidden sm:block">Vendor</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
