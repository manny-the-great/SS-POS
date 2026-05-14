'use client';
import { useState } from 'react';
import { Plus, Search, Minus, Trash2, ShoppingCart, X, CreditCard, Banknote, Smartphone, Printer } from 'lucide-react';

const CATS = ['All','Pastries','Drinks','Fast Food','Snacks','Fruits'];
const PRODUCTS = [
  {id:1,name:'Jollof Rice',price:4000,cat:'Fast Food',emoji:'🍛',stock:15},
  {id:2,name:'Croissant',price:1500,cat:'Pastries',emoji:'🥐',stock:20},
  {id:3,name:'Orange Juice',price:1200,cat:'Drinks',emoji:'🍊',stock:30},
  {id:4,name:'Shawarma Wrap',price:3500,cat:'Fast Food',emoji:'🌯',stock:8},
  {id:5,name:'Smoothie Bowl',price:2800,cat:'Drinks',emoji:'🍓',stock:12},
  {id:6,name:'Dark Chocolate',price:2500,cat:'Snacks',emoji:'🍫',stock:25},
  {id:7,name:'Banana Bread',price:2000,cat:'Pastries',emoji:'🍌',stock:10},
  {id:8,name:'Iced Coffee',price:1800,cat:'Drinks',emoji:'☕',stock:18},
  {id:9,name:'Chin Chin Pack',price:800,cat:'Snacks',emoji:'🍪',stock:40},
  {id:10,name:'Grilled Chicken',price:5500,cat:'Fast Food',emoji:'🍗',stock:6},
  {id:11,name:'Mixed Berries',price:3200,cat:'Fruits',emoji:'🫐',stock:15},
  {id:12,name:'Avocado',price:2500,cat:'Fruits',emoji:'🥑',stock:9},
];

interface CartItem { id:number; name:string; price:number; emoji:string; qty:number; }

export default function POSPage() {
  const [cat,setCat]=useState('All');
  const [q,setQ]=useState('');
  const [cart,setCart]=useState<CartItem[]>([]);
  const [showCheckout,setShowCheckout]=useState(false);
  const [payMethod,setPayMethod]=useState<'cash'|'card'|'transfer'>('cash');
  const [showReceipt,setShowReceipt]=useState(false);

  const filtered=PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&p.name.toLowerCase().includes(q.toLowerCase()));
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const tax=Math.round(subtotal*0.075);
  const total=subtotal+tax;
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);

  const addToCart=(p:typeof PRODUCTS[0])=>{
    setCart(c=>{
      const ex=c.find(i=>i.id===p.id);
      if(ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return [...c,{id:p.id,name:p.name,price:p.price,emoji:p.emoji,qty:1}];
    });
  };

  const updateQty=(id:number,delta:number)=>{
    setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+delta)}:i).filter(i=>i.qty>0));
  };

  const clearCart=()=>setCart([]);

  const handleCheckout=()=>{
    if(cart.length===0) return;
    setShowCheckout(false);
    setShowReceipt(true);
    setTimeout(()=>{setShowReceipt(false);clearCart();},4000);
  };

  return (
    <div className="flex h-full gap-0 -m-4 sm:-m-6 lg:-m-8 overflow-hidden">
      {/* LEFT — Products */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-gray-200 bg-gray-50">
        {/* Search + Filter */}
        <div className="p-4 bg-white border-b border-gray-100 space-y-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="input pl-9 h-10 text-sm rounded-xl bg-gray-50 border-gray-200 w-full"/>
          </div>
          <div className="scroll-x">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${cat===c?'bg-[#16A34A] text-white':'bg-white border border-gray-200 text-gray-600 hover:border-[#16A34A]'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map(p=>{
              const inCart=cart.find(i=>i.id===p.id);
              return (
                <button key={p.id} onClick={()=>addToCart(p)}
                  className={`pos-product-btn text-left ${inCart?'in-cart':''}`}>
                  <div className="text-4xl mb-2.5 text-center">{p.emoji}</div>
                  <p className="text-xs font-bold text-[#16A34A] uppercase tracking-wide mb-0.5">{p.cat}</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-1">{p.name}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-black text-gray-900 text-sm">₦{p.price.toLocaleString()}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${p.stock>10?'badge-green':p.stock>0?'badge-yellow':'badge-red'}`}>
                      {p.stock>0?`${p.stock} left`:'Out'}
                    </span>
                  </div>
                  {inCart&&<div className="mt-2 bg-[#16A34A] text-white text-[10px] font-bold text-center py-0.5 rounded-lg">In Cart ×{inCart.qty}</div>}
                </button>
              );
            })}
          </div>
          {filtered.length===0&&<div className="text-center py-16 text-gray-400"><p className="text-3xl mb-2">🔍</p><p>No products found</p></div>}
        </div>
      </div>

      {/* RIGHT — Cart */}
      <div className="w-72 xl:w-80 flex flex-col bg-white flex-shrink-0 hidden md:flex">
        {/* Cart Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4.5 h-4.5 text-gray-700"/>
            <h2 className="font-bold text-gray-900">Cart</h2>
            {cartCount>0&&<span className="w-5 h-5 rounded-full bg-[#16A34A] text-white text-[10px] font-black flex items-center justify-center">{cartCount}</span>}
          </div>
          {cart.length>0&&<button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 font-semibold flex items-center gap-1"><Trash2 className="w-3 h-3"/>Clear</button>}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {cart.length===0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
              <ShoppingCart className="w-12 h-12"/>
              <p className="text-sm font-medium">Cart is empty</p>
              <p className="text-xs">Tap products to add</p>
            </div>
          ) : (
            cart.map(item=>(
              <div key={item.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-[#16A34A] font-bold">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={()=>updateQty(item.id,-1)} className="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-red-100 transition-colors"><Minus className="w-3 h-3"/></button>
                  <span className="text-sm font-black text-gray-900 w-5 text-center">{item.qty}</span>
                  <button onClick={()=>updateQty(item.id,1)} className="w-6 h-6 rounded-lg bg-[#EAF7EC] flex items-center justify-center hover:bg-[#16A34A] hover:text-white transition-colors"><Plus className="w-3 h-3"/></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {cart.length>0&&(
          <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 space-y-3">
            <div className="space-y-1.5">
              {[['Subtotal',`₦${subtotal.toLocaleString()}`],['VAT (7.5%)',`₦${tax.toLocaleString()}`]].map(([l,v])=>(
                <div key={l} className="flex justify-between text-sm">
                  <span className="text-gray-500">{l}</span>
                  <span className="font-semibold text-gray-800">{v}</span>
                </div>
              ))}
              <div className="flex justify-between text-base pt-2 border-t border-gray-100">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-[#16A34A]">₦{total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={()=>setShowCheckout(true)} className="btn btn-primary w-full gap-2">
              Checkout <CreditCard className="w-4 h-4"/>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Cart FAB */}
      {cart.length>0&&(
        <button onClick={()=>setShowCheckout(true)} className="fixed bottom-6 right-6 btn btn-primary rounded-2xl gap-2 shadow-xl shadow-green-500/30 z-30 md:hidden">
          <ShoppingCart className="w-4 h-4"/> {cartCount} items · ₦{total.toLocaleString()}
        </button>
      )}

      {/* Checkout Modal */}
      {showCheckout&&(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Complete Sale</h3>
              <button onClick={()=>setShowCheckout(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-4 h-4"/></button>
            </div>
            {/* Payment method */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                {([{m:'cash',icon:Banknote,label:'Cash'},{m:'card',icon:CreditCard,label:'Card'},{m:'transfer',icon:Smartphone,label:'Transfer'}] as const).map(({m,icon:Icon,label})=>(
                  <button key={m} onClick={()=>setPayMethod(m)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm font-semibold ${payMethod===m?'border-[#16A34A] bg-[#EAF7EC] text-[#16A34A]':'border-gray-200 text-gray-600'}`}>
                    <Icon className="w-5 h-5"/>{label}
                  </button>
                ))}
              </div>
            </div>
            {/* Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              {cart.map(i=>(
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-4">{i.name} ×{i.qty}</span>
                  <span className="font-semibold text-gray-900 flex-shrink-0">₦{(i.price*i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-base">
                <span>Total</span><span className="text-[#16A34A]">₦{total.toLocaleString()}</span>
              </div>
            </div>
            {payMethod==='cash'&&(
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Amount Tendered</label>
                <input type="number" placeholder="0" className="input text-xl font-black text-center"/>
              </div>
            )}
            <button onClick={handleCheckout} className="btn btn-primary w-full btn-lg gap-2">
              Complete Sale · ₦{total.toLocaleString()} <CreditCard className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}

      {/* Receipt Success */}
      {showReceipt&&(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center space-y-4">
            <div className="text-6xl">✅</div>
            <h3 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Sale Complete!</h3>
            <p className="text-[#16A34A] text-2xl font-black">₦{total.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Transaction recorded successfully.</p>
            <button className="btn btn-secondary w-full gap-2"><Printer className="w-4 h-4"/>Print Receipt</button>
          </div>
        </div>
      )}
    </div>
  );
}
