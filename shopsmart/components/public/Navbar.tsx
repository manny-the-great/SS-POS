'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ShoppingBag, ChevronDown, Search, Bell
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Categories', href: '/categories' },
  { label: 'Pricing', href: '/pricing' },
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-dark shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl grad-green flex items-center justify-center text-white font-black text-lg shadow-lg shadow-green-500/30">
                S
              </div>
              <span
                className="font-extrabold text-xl tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Shop<span className="text-[#4ADE80]">Smart</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-[#4ADE80] bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth?tab=signup"
                className="btn btn-primary btn-sm shadow-lg shadow-green-500/25"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white transition-all"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 glass-dark flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-xl grad-green flex items-center justify-center text-white font-black">S</div>
            <span className="font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop<span className="text-[#4ADE80]">Smart</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center text-white/60"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? 'bg-[#16A34A] text-white'
                  : 'text-white/65 hover:text-white hover:bg-white/7'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-3">
          <Link
            href="/auth"
            onClick={() => setOpen(false)}
            className="btn btn-secondary w-full"
          >
            Sign In
          </Link>
          <Link
            href="/auth?tab=signup"
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full"
          >
            Get Started Free
          </Link>
        </div>
      </aside>
    </>
  );
}
