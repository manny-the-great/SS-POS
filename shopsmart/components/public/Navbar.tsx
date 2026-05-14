'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/home', badge: 4 },
  { label: 'Products', href: '/marketplace' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-4 z-50 transition-all duration-300 flex justify-center px-4`}
      >
        <div 
          className={`flex items-center justify-between bg-white rounded-full p-2 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-5xl w-full transition-all ${
            scrolled ? 'shadow-md shadow-black/5 bg-white/95 backdrop-blur-md' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2.5 flex-shrink-0 mr-4">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-black text-lg shadow-sm">
              S
            </div>
            <span
              className="font-extrabold text-xl tracking-tight text-gray-900 hidden sm:block"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Shop<span className="text-[#16A34A]">Smart</span>
            </span>
          </Link>

          {/* Desktop Nav - The Pill Design */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-white">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/home');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-bold transition-all ${
                    isActive
                      ? 'bg-[#C6F498] text-gray-900' 
                      : 'text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span 
                      className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-black ${
                        isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <Link
              href="/auth"
              className="text-gray-600 hover:text-gray-900 text-sm font-bold transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth?tab=signup"
              className="bg-gray-900 text-white hover:bg-gray-800 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 transition-all hover:bg-gray-200"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <Link href="/home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-black text-sm">S</div>
            <span className="font-extrabold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop<span className="text-[#16A34A]">Smart</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/home');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#C6F498] text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className={`flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] font-black ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 pb-8 pt-4 border-t border-gray-100 space-y-3">
          <Link
            href="/auth"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-2xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-200 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/auth?tab=signup"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-all shadow-md"
          >
            Get Started Free
          </Link>
        </div>
      </aside>
    </>
  );
}
