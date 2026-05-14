'use client';

import Link from 'next/link';
import { Globe, MessageCircle, Camera, Play, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Vendor Stores', href: '/vendors' },
    { label: 'Categories', href: '/categories' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Vendors: [
    { label: 'Start Selling', href: '/auth?tab=signup' },
    { label: 'Vendor Login', href: '/auth' },
    { label: 'POS System', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

const SOCIALS = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1923] text-white">
      {/* CTA Strip */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl md:text-3xl font-black mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Ready to grow your business?
              </h3>
              <p className="text-white/55 text-sm">
                Join 2,000+ vendors already selling on ShopSmart.
              </p>
            </div>
            <Link
              href="/auth?tab=signup"
              className="btn btn-primary btn-lg flex-shrink-0 gap-2"
            >
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl grad-green flex items-center justify-center text-white font-black text-xl shadow-lg">S</div>
              <span className="font-extrabold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Shop<span className="text-[#4ADE80]">Smart</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The all-in-one commerce platform for vendors. Manage storefront, POS, inventory, attendants, and analytics from one dashboard.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#16A34A] flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/85 font-bold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Lagos, Nigeria
            </span>
            <a href="mailto:hello@shopsmart.ng" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Mail className="w-3.5 h-3.5" /> hello@shopsmart.ng
            </a>
            <a href="tel:+2348000000000" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <Phone className="w-3.5 h-3.5" /> +234 800 000 0000
            </a>
          </div>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} ShopSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
