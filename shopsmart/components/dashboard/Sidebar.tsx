'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Store, Package, Layers, Terminal,
  ShoppingCart, Receipt, Users, UserCheck, BarChart3,
  Wallet, Settings, HelpCircle, LogOut,
  ChevronLeft, ChevronRight, X, Star, MessageSquare,
  Percent, Megaphone
} from 'lucide-react';

const SECTIONS = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'Storefront', icon: Store, href: '/storefront' },
      { name: 'POS', icon: Terminal, href: '/pos' },
    ]
  },
  {
    label: 'Inventory',
    items: [
      { name: 'Products', icon: Package, href: '/inventory' },
      { name: 'Categories', icon: Layers, href: '/categories' },
    ]
  },
  {
    label: 'Sales',
    items: [
      { name: 'Orders', icon: ShoppingCart, href: '/orders' },
      { name: 'Transactions', icon: Receipt, href: '/transactions' },
      { name: 'Discounts', icon: Percent, href: '/discounts' },
      { name: 'Promotions', icon: Megaphone, href: '/promotions' },
    ]
  },
  {
    label: 'People',
    items: [
      { name: 'Customers', icon: Users, href: '/customers' },
      { name: 'Attendants', icon: UserCheck, href: '/attendants' },
      { name: 'Reviews', icon: Star, href: '/reviews' },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Analytics', icon: BarChart3, href: '/analytics' },
      { name: 'Wallet', icon: Wallet, href: '/wallet' },
    ]
  },
];

interface NavContentProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  pathname: string;
  onMobileClose?: () => void;
}

function NavContent({ collapsed, setCollapsed, pathname, onMobileClose }: NavContentProps) {
  return (
    <>
      {/* Logo Row */}
      <div
        className={`flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-5'} py-5 border-b border-white/5 flex-shrink-0`}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl grad-green flex items-center justify-center text-white font-black text-base shadow-lg shadow-green-500/25">S</div>
            <span className="font-extrabold text-lg tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop<span className="text-[#4ADE80]">Smart</span>
            </span>
          </Link>
        )}
        <div className="flex items-center gap-1">
          {/* Desktop collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/12 items-center justify-center text-white/50 transition-colors flex-shrink-0 hidden lg:flex"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          {/* Mobile close */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/50"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 min-h-0">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-3 mb-2">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#16A34A] text-white shadow-md shadow-green-500/20'
                        : 'text-white/55 hover:text-white hover:bg-white/6'
                    }`}
                  >
                    <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/50'}`} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 py-3 px-3 space-y-0.5 flex-shrink-0">
        <Link
          href="/support"
          title={collapsed ? 'Support' : undefined}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm font-medium text-white/45 hover:text-white hover:bg-white/6 transition-all`}
        >
          <HelpCircle className="w-4.5 h-4.5 flex-shrink-0" />
          {!collapsed && <span>Support</span>}
        </Link>
        <Link
          href="/settings"
          title={collapsed ? 'Settings' : undefined}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm font-medium text-white/45 hover:text-white hover:bg-white/6 transition-all`}
        >
          <Settings className="w-4.5 h-4.5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* Vendor profile */}
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 cursor-pointer transition-colors mt-1">
            <div className="w-8 h-8 rounded-full grad-green flex items-center justify-center text-white font-bold text-sm flex-shrink-0">V</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Vendor Store</p>
              <p className="text-xs text-white/35 truncate">vendor@shopsmart.ng</p>
            </div>
            <LogOut className="w-4 h-4 text-white/30 flex-shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center px-3 py-2.5 cursor-pointer" title="Profile">
            <div className="w-8 h-8 rounded-full grad-green flex items-center justify-center text-white font-bold text-sm">V</div>
          </div>
        )}
      </div>
    </>
  );
}

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (mobileOpen && onMobileClose) onMobileClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen && onMobileClose) onMobileClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-[72px]' : 'w-60'
        } bg-[#0F1923] text-white flex-col h-screen sticky top-0 border-r border-white/5 transition-all duration-300 flex-shrink-0 hidden lg:flex overflow-hidden`}
      >
        <NavContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          pathname={pathname}
        />
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-[#0F1923] text-white flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavContent
          collapsed={false}
          setCollapsed={setCollapsed}
          pathname={pathname}
          onMobileClose={onMobileClose}
        />
      </aside>
    </>
  );
}
