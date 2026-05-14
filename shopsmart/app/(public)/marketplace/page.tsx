'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Heart, Plus, ChevronRight, SlidersHorizontal } from 'lucide-react';

const ALL_PRODUCTS = [
  {id:1,name:'Fresh Avocados',price:2500,rating:4.8,reviews:120,cat:'Fruits',emoji:'🥑',badge:'NEW',vendor:'FreshMart'},
  {id:2,name:'Whole Grain Bread',price:1800,rating:4.6,reviews:89,cat:'Bakery',emoji:'🍞',badge:'SALE',vendor:'City Bakery'},
  {id:3,name:'Mixed Berries Pack',price:3200,rating:4.9,reviews:215,cat:'Fruits',emoji:'🫐',badge:'HOT',vendor:'Berry Farm'},
  {id:4,name:'Greek Yogurt',price:1500,rating:4.7,reviews:64,cat:'Dairy',emoji:'🥛',badge:null,vendor:'Dairy Plus'},
  {id:5,name:'Orange Juice 1L',price:2200,rating:4.5,reviews:98,cat:'Drinks',emoji:'🍊',badge:null,vendor:'JuiceBar'},
  {id:6,name:'Chicken Shawarma',price:4500,rating:4.8,reviews:302,cat:'Fast Food',emoji:'🌯',badge:'HOT',vendor:'Wrap & Roll'},
  {id:7,name:'Banana Bunch x6',price:800,rating:4.4,reviews:55,cat:'Fruits',emoji:'🍌',badge:null,vendor:'FreshMart'},
  {id:8,name:'Dark Chocolate',price:2800,rating:4.9,reviews:176,cat:'Snacks',emoji:'🍫',badge:'NEW',vendor:'ChocoCraft'},
  {id:9,name:'Jollof Rice Combo',price:4000,rating:4.9,reviews:420,cat:'Fast Food',emoji:'🍛',badge:'HOT',vendor:'Mama Kitchen'},
  {id:10,name:'Smoothie Bowl',price:3500,rating:4.8,reviews:188,cat:'Drinks',emoji:'🍓',badge:null,vendor:'Fresh Vibes'},
  {id:11,name:'Croissant Pack',price:2600,rating:4.7,reviews:134,cat:'Bakery',emoji:'🥐',badge:null,vendor:'City Bakery'},
  {id:12,name:'Suya Skewers',price:3000,rating:4.6,reviews:267,cat:'Fast Food',emoji:'🍢',badge:null,vendor:'Suya Spot'},
];

const CATS = ['All','Fruits','Dairy','Bakery','Drinks','Fast Food','Snacks'];

const VENDORS = [
  {name:'FreshMart',rating:4.8,products:32,emoji:'🛒',tag:'Groceries'},
  {name:'City Bakery',rating:4.7,products:18,emoji:'🥐',tag:'Bakery'},
  {name:'Mama Kitchen',rating:4.9,products:24,emoji:'🍛',tag:'Food'},
  {name:'Suya Spot',rating:4.6,products:12,emoji:'🍢',tag:'BBQ'},
];

function PCard({p}:{p:typeof ALL_PRODUCTS[0]}) {
  const [liked,setLiked]=useState(false);
  return (
    <div className="product-card group">
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl">{p.emoji}</span>
        {p.badge&&<span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full ${p.badge==='SALE'?'bg-red-500 text-white':p.badge==='HOT'?'bg-orange-500 text-white':'bg-[#16A34A] text-white'}`}>{p.badge}</span>}
        <button onClick={()=>setLiked(!liked)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={`w-3.5 h-3.5 ${liked?'fill-red-500 text-red-500':'text-gray-400'}`}/>
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-1">{p.cat}</p>
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-0.5 line-clamp-1 group-hover:text-[#16A34A] transition-colors">{p.name}</h3>
        <p className="text-[10px] text-gray-400 mb-2">{p.vendor}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]"/>
          <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <p className="font-black text-gray-900 text-sm">₦{p.price.toLocaleString()}</p>
          <button className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:bg-[#15803D] transition-colors shadow-md shadow-green-500/25 flex-shrink-0">
            <Plus className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const [cat,setCat]=useState('All');
  const [q,setQ]=useState('');
  const filtered=ALL_PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0d1f12] to-[#0F1923] pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3" style={{fontFamily:'var(--font-heading)'}}>ShopSmart Marketplace</h1>
          <p className="text-white/55 mb-8 max-w-xl mx-auto">Discover fresh products from hundreds of local vendors near you.</p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products, vendors..." className="input !pl-12 !pr-4 h-12 rounded-2xl w-full shadow-lg"/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Vendors */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">Featured Vendors</h2>
            <Link href="/vendors" className="text-[#16A34A] text-sm font-semibold flex items-center gap-1">All Vendors <ChevronRight className="w-4 h-4"/></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {VENDORS.map(v=>(
              <div key={v.name} className="card card-hover p-4 text-center">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{v.name}</h3>
                <p className="text-[10px] text-gray-400 mb-2">{v.products} products • {v.tag}</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]"/>
                  <span className="text-xs font-bold text-gray-700">{v.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-between mb-5">
          <div className="scroll-x gap-2 flex-1">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={`cat-pill ${cat===c?'active':''}`}>{c}</button>
            ))}
          </div>
          <button className="ml-3 flex items-center gap-2 btn btn-secondary btn-sm flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4"/> Filter
          </button>
        </div>

        {/* Products Grid */}
        {filtered.length>0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(p=><PCard key={p.id} p={p}/>)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
