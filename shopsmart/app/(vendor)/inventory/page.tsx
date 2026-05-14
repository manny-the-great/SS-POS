'use client';
import { useState } from 'react';
import { Search, Plus, Grid3X3, List, Edit2, Trash2, AlertTriangle, Package } from 'lucide-react';

const PRODUCTS = [
  {id:1,name:'Jollof Rice',cat:'Fast Food',price:4000,stock:15,sold:142,status:'active',emoji:'🍛'},
  {id:2,name:'Croissant',cat:'Pastries',price:1500,stock:3,sold:89,status:'low',emoji:'🥐'},
  {id:3,name:'Orange Juice',cat:'Drinks',price:1200,stock:0,sold:210,status:'out',emoji:'🍊'},
  {id:4,name:'Shawarma Wrap',cat:'Fast Food',price:3500,stock:8,sold:67,status:'active',emoji:'🌯'},
  {id:5,name:'Smoothie Bowl',cat:'Drinks',price:2800,stock:12,sold:55,status:'active',emoji:'🍓'},
  {id:6,name:'Dark Chocolate',cat:'Snacks',price:2500,stock:25,sold:176,status:'active',emoji:'🍫'},
  {id:7,name:'Banana Bread',cat:'Pastries',price:2000,stock:2,sold:43,status:'low',emoji:'🍌'},
  {id:8,name:'Iced Coffee',cat:'Drinks',price:1800,stock:18,sold:98,status:'active',emoji:'☕'},
];

const STATUS_BADGE:Record<string,string>={
  active:'badge-green',low:'badge-yellow',out:'badge-red',disabled:'badge-gray'
};
const STATUS_LABEL:Record<string,string>={
  active:'Active',low:'Low Stock',out:'Out of Stock',disabled:'Disabled'
};

export default function InventoryPage() {
  const [view,setView]=useState<'grid'|'list'>('grid');
  const [q,setQ]=useState('');
  const [showModal,setShowModal]=useState(false);

  const filtered=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Inventory</h1>
          <p className="text-sm text-gray-400">{PRODUCTS.length} products total · 2 low stock</p>
        </div>
        <button onClick={()=>setShowModal(true)} className="btn btn-primary gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4"/> Add Product
        </button>
      </div>

      {/* Low stock alert */}
      <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0"/>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-yellow-800">2 products are running low on stock</p>
          <p className="text-xs text-yellow-600">Croissant (3 left) · Banana Bread (2 left)</p>
        </div>
        <button className="text-xs font-bold text-yellow-700 hover:text-yellow-900 flex-shrink-0">Restock</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {l:'Total Products',v:'18',c:'text-gray-900'},
          {l:'Active',v:'14',c:'text-[#16A34A]'},
          {l:'Low Stock',v:'2',c:'text-yellow-500'},
          {l:'Out of Stock',v:'1',c:'text-red-500'},
        ].map(s=>(
          <div key={s.l} className="card p-4 text-center">
            <p className={`text-2xl font-black ${s.c} mb-1`}>{s.v}</p>
            <p className="text-xs text-gray-400 font-medium">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="input pl-9 h-10 text-sm rounded-xl bg-gray-50 border-gray-200 w-full"/>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setView('grid')} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${view==='grid'?'bg-[#16A34A] border-[#16A34A] text-white':'bg-white border-gray-200 text-gray-500'}`}><Grid3X3 className="w-4 h-4"/></button>
          <button onClick={()=>setView('list')} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${view==='list'?'bg-[#16A34A] border-[#16A34A] text-white':'bg-white border-gray-200 text-gray-500'}`}><List className="w-4 h-4"/></button>
        </div>
      </div>

      {/* Grid View */}
      {view==='grid'&&(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="card card-hover p-4 flex flex-col">
              <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center mb-3 text-5xl">{p.emoji}</div>
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1 mr-2">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{p.name}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">{p.cat}</p>
                </div>
                <span className={`badge ${STATUS_BADGE[p.status]} flex-shrink-0`}>{STATUS_LABEL[p.status]}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-black text-gray-900">₦{p.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{p.stock} left</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 btn btn-secondary btn-sm gap-1"><Edit2 className="w-3 h-3"/>Edit</button>
                <button className="btn btn-sm btn-ghost text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view==='list'&&(
        <div className="card overflow-hidden">
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Product</th><th>Category</th><th>Price</th>
                  <th>Stock</th><th>Sold</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.emoji}</span>
                        <span className="font-semibold text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td><span className="text-xs font-semibold text-gray-500">{p.cat}</span></td>
                    <td><span className="font-bold text-gray-900">₦{p.price.toLocaleString()}</span></td>
                    <td><span className={`font-bold ${p.stock<=3?'text-red-500':p.stock<=10?'text-yellow-500':'text-gray-700'}`}>{p.stock}</span></td>
                    <td><span className="text-gray-600">{p.sold}</span></td>
                    <td><span className={`badge ${STATUS_BADGE[p.status]}`}>{STATUS_LABEL[p.status]}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                        <button className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showModal&&(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Add New Product</h3>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><Plus className="w-4 h-4 rotate-45"/></button>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#16A34A] transition-colors">
              <Package className="w-6 h-6 text-gray-300"/>
              <p className="text-sm text-gray-400 font-medium">Upload Product Image</p>
              <p className="text-xs text-gray-300">Click or drag & drop</p>
            </div>
            {[
              {l:'Product Name',p:'e.g. Fresh Avocados',t:'text'},
              {l:'Price (₦)',p:'e.g. 2500',t:'number'},
              {l:'Stock Quantity',p:'e.g. 20',t:'number'},
            ].map(f=>(
              <div key={f.l}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label>
                <input type={f.t} placeholder={f.p} className="input"/>
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <select className="input">
                {['Fast Food','Pastries','Drinks','Snacks','Fruits','Dairy'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea placeholder="Product description..." className="input h-20 py-3 resize-none"/>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowModal(false)} className="btn btn-secondary flex-1">Cancel</button>
              <button className="btn btn-primary flex-1 gap-2"><Plus className="w-4 h-4"/>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
