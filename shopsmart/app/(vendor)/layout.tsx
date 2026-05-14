'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/Header';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/storefront': 'Storefront',
  '/pos': 'Point of Sale',
  '/inventory': 'Inventory',
  '/categories': 'Categories',
  '/orders': 'Orders',
  '/transactions': 'Transactions',
  '/analytics': 'Analytics',
  '/wallet': 'Wallet',
  '/attendants': 'Attendants',
  '/customers': 'Customers',
  '/reviews': 'Reviews',
  '/discounts': 'Discounts',
  '/promotions': 'Promotions',
  '/settings': 'Settings',
  '/support': 'Support',
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <div className="flex h-dvh bg-gray-50 font-sans overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
