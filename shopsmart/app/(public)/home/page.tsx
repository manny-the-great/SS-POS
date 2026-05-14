'use client';
import Link from 'next/link';
import { Star, Heart, Plus, ChevronRight, ArrowRight, TrendingUp, ShieldCheck, Zap, Users, BarChart3, Package } from 'lucide-react';
import { useState } from 'react';

const CATS = [
  { e: '🍎', n: 'Fruits' }, { e: '🥦', n: 'Vegetables' }, { e: '🥐', n: 'Pastries' },
  { e: '🍔', n: 'Fast Food' }, { e: '🥤', n: 'Drinks' }, { e: '🛒', n: 'Groceries' },
  { e: '🍿', n: 'Snacks' }, { e: '🧀', n: 'Dairy' }, { e: '🌶', n: 'Spices' }, { e: '🍰', n: 'Desserts' }
];

const PRODUCTS = [
  { id: 1, name: 'Fresh Avocados', price: 2500, rating: 4.8, reviews: 120, tag: 'Organic', emoji: '🥑', badge: 'NEW', vendor: 'FreshMart' },
  { id: 2, name: 'Whole Grain Bread', price: 1800, rating: 4.6, reviews: 89, tag: 'Bakery', emoji: '🍞', badge: 'SALE', vendor: 'City Bakery' },
  { id: 3, name: 'Mixed Berries Pack', price: 3200, rating: 4.9, reviews: 215, tag: 'Fruits', emoji: '🫐', badge: 'HOT', vendor: 'Berry Farm' },
  { id: 4, name: 'Greek Yogurt 500g', price: 1500, rating: 4.7, reviews: 64, tag: 'Dairy', emoji: '🥛', badge: null, vendor: 'Dairy Plus' },
  { id: 5, name: 'Fresh Orange Juice', price: 2200, rating: 4.5, reviews: 98, tag: 'Drinks', emoji: '🍊', badge: null, vendor: 'JuiceBar' },
  { id: 6, name: 'Chicken Shawarma', price: 4500, rating: 4.8, reviews: 302, tag: 'Fast Food', emoji: '🌯', badge: 'HOT', vendor: 'Wrap & Roll' },
  { id: 7, name: 'Banana Bunch x6', price: 800, rating: 4.4, reviews: 55, tag: 'Fruits', emoji: '🍌', badge: null, vendor: 'FreshMart' },
  { id: 8, name: 'Dark Chocolate 70%', price: 2800, rating: 4.9, reviews: 176, tag: 'Snacks', emoji: '🍫', badge: 'NEW', vendor: 'ChocoCraft' },
];

const FEATURES = [
  { icon: BarChart3, title: 'Live Analytics', desc: 'Real-time revenue, sales trends, and performance metrics at your fingertips.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Zap, title: 'Fast POS System', desc: 'Process sales in seconds with our lightning-fast point of sale system.', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Users, title: 'Team Management', desc: 'Add attendants, assign roles, and track performance per staff member.', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Package, title: 'Smart Inventory', desc: 'Never run out of stock. Get alerts, track quantities, manage categories.', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Multiple payment methods with bank-grade security on every transaction.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: TrendingUp, title: 'Growth Tools', desc: 'Promotions, discounts, and vendor storefronts to accelerate growth.', color: 'text-orange-500', bg: 'bg-orange-50' },
];

const TESTIMONIALS = [
  { name: 'Amaka O.', role: 'Bakery Owner', text: 'ShopSmart transformed my bakery. I manage orders, inventory, and staff all from my phone.', stars: 5, avatar: '👩🏾' },
  { name: 'Chukwudi E.', role: 'Restaurant Vendor', text: 'The POS is incredible. Attendants learn it in minutes. Revenue up 40% since joining.', stars: 5, avatar: '👨🏿' },
  { name: 'Fatima I.', role: 'Grocery Store Owner', text: 'The analytics show exactly what sells best and when. It pays for itself every month.', stars: 5, avatar: '👩🏽' },
];

function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="product-card group">
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <span className="text-6xl">{p.emoji}</span>
        {p.badge && <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full ${p.badge === 'SALE' ? 'bg-red-500 text-white' : p.badge === 'HOT' ? 'bg-orange-500 text-white' : 'bg-[#16A34A] text-white'}`}>{p.badge}</span>}
        <button onClick={() => setLiked(!liked)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-1">{p.tag}</p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-1 group-hover:text-[#16A34A] transition-colors">{p.name}</h3>
        <p className="text-[10px] text-gray-400 mb-2 truncate">{p.vendor}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]" />
          <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <p className="font-black text-gray-900 text-sm">₦{p.price.toLocaleString()}</p>
          <button className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-[#15803D] transition-colors shadow-md shadow-green-500/25">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'Fruits', 'Dairy', 'Fast Food', 'Snacks'];
  const filtered = tab === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.tag === tab);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative grad-hero overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#16A34A]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FACC15]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/4 left-0 w-48 h-48 bg-[#16A34A]/5 rounded-full blur-2xl -translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-36 lg:pb-28 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-[#16A34A]/20 border border-[#16A34A]/30 text-[#4ADE80] text-xs font-bold px-4 py-1.5 rounded-full mb-8 anim-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                #1 Vendor Commerce Platform in Nigeria
              </span>
              <h1 className="hero-title text-white mb-6 anim-fade-in-up" style={{ fontFamily: 'var(--font-heading)' }}>
                Sell Smarter.<br />
                <span className="text-grad-green">Manage Better.</span><br />
                Grow Faster.
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 anim-fade-in-up delay-200">
                ShopSmart helps vendors manage inventory, sales, attendants, orders, and business growth from one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 anim-fade-in-up delay-300">
                <Link href="/auth?tab=signup" className="btn btn-primary btn-lg w-full sm:w-auto gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/marketplace" className="btn btn-lg w-full sm:w-auto border border-white/20 text-white bg-transparent hover:bg-white/8">
                  Explore Vendors
                </Link>
              </div>
              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 anim-fade-in delay-400">
                {[{ v: '2,000+', l: 'Active Vendors' }, { v: '₦500M+', l: 'Monthly Volume' }, { v: '4.9★', l: 'Avg Rating' }].map(s => (
                  <div key={s.l} className="text-center lg:text-left">
                    <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>{s.v}</p>
                    <p className="text-xs text-white/45 font-medium mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT - Dashboard Preview */}
            <div className="hidden lg:block anim-fade-in-right delay-300">
              <div className="relative">
                {/* Main dashboard card */}
                <div className="glass rounded-3xl p-5 shadow-2xl shadow-black/40">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/50 text-xs mb-1">Today's Revenue</p>
                      <p className="text-white text-2xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>₦47,600</p>
                    </div>
                    <span className="badge badge-green text-xs">+12% ↑</span>
                  </div>
                  {/* Mini chart bars */}
                  <div className="flex items-end gap-1.5 h-16 mb-4">
                    {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-lg bg-[#16A34A]/30 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-[#16A34A] rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ l: 'Orders', v: '24' }, { l: 'Products', v: '18' }, { l: 'Staff', v: '4' }].map(m => (
                      <div key={m.l} className="bg-white/5 rounded-xl p-2.5 text-center">
                        <p className="text-white text-sm font-black">{m.v}</p>
                        <p className="text-white/40 text-[10px]">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating product card */}
                <div className="absolute -top-6 -right-6 glass rounded-2xl p-3 shadow-xl anim-float">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥑</span>
                    <div>
                      <p className="text-white text-xs font-bold">Fresh Avocados</p>
                      <p className="text-[#4ADE80] text-xs font-black">₦2,500</p>
                    </div>
                  </div>
                </div>
                {/* Floating notification */}
                <div className="absolute -bottom-4 -left-6 glass rounded-2xl p-3 shadow-xl anim-float delay-300">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#16A34A] flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">New Order</p>
                      <p className="text-white/50 text-[10px]">₦4,200 • 2 min ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-3">Everything your business needs</h2>
            <p className="section-sub max-w-2xl mx-auto">One platform to manage your entire vendor operation, from inventory to payroll.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card card-hover p-6 anim-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-11 h-11 rounded-2xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Shop By Category</h2>
              <p className="section-sub">Find what you need from our top vendors</p>
            </div>
            <Link href="/categories" className="text-[#16A34A] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all flex-shrink-0 ml-4">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="scroll-x pb-3">
            {CATS.map(c => (
              <Link key={c.n} href="/marketplace" className="cat-pill flex-shrink-0">
                <span className="text-lg">{c.e}</span>
                <span className="text-gray-700">{c.n}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Featured Products</h2>
            <p className="section-sub">Hand-picked fresh items from our top vendors</p>
          </div>
          <div className="scroll-x pb-2 mb-8">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${tab === t ? 'bg-[#16A34A] text-white shadow-md shadow-green-500/25' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/marketplace" className="btn btn-secondary rounded-full gap-2">
              View All Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#14532D] to-[#16A34A] p-7 flex items-center justify-between gap-4 relative">
              <div className="relative z-10">
                <p className="text-green-200 text-sm font-semibold mb-1">Today's Special</p>
                <h3 className="text-white text-2xl font-black mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Organic Food<br />25% OFF</h3>
                <Link href="/marketplace" className="inline-flex items-center gap-2 bg-white text-[#16A34A] font-bold text-sm px-4 py-2 rounded-xl hover:shadow-lg transition-shadow">Shop Now <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <span className="text-8xl opacity-80 anim-float flex-shrink-0">🥗</span>
            </div>
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#92400E] to-[#FACC15] p-7 flex items-center justify-between gap-4 relative">
              <div className="relative z-10">
                <p className="text-yellow-900 text-sm font-semibold mb-1">Weekend Deal</p>
                <h3 className="text-white text-2xl font-black mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Breakfast<br />Combos</h3>
                <Link href="/marketplace" className="inline-flex items-center gap-2 bg-white text-[#92400E] font-bold text-sm px-4 py-2 rounded-xl hover:shadow-lg transition-shadow">Order Now <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <span className="text-8xl opacity-80 anim-float delay-300 flex-shrink-0">🥐</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">What Our Vendors Say</h2>
            <p className="section-sub">Real stories from businesses growing with ShopSmart</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.stars }).map((_, s) => <Star key={s} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic flex-1 truncate-3">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grad-navy rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#16A34A]/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FACC15]/8 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            <div className="relative z-10">
              <p className="text-[#4ADE80] text-xs font-bold uppercase tracking-widest mb-3">Join 2,000+ Vendors</p>
              <h2 className="text-3xl sm:text-5xl font-black mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Start selling smarter<br />today, it's free.</h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm leading-relaxed">One link. One dashboard. Unlimited growth. Launch your storefront in under 5 minutes.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth?tab=signup" className="btn btn-primary btn-lg w-full sm:w-auto gap-2">Start for Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="/marketplace" className="text-white/60 hover:text-white font-semibold flex items-center gap-2 transition-colors">Browse Vendors <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
