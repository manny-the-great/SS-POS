'use client';
import { useState } from 'react';
import { UserPlus, MoreVertical, TrendingUp, Star, Shield, Eye, EyeOff } from 'lucide-react';

const ATTENDANTS=[
  {id:1,name:'Emeka Obi',email:'emeka@store.ng',role:'Manager',status:'active',sales:89,rev:'₦356K',pin:'****',joinDate:'Jan 2026'},
  {id:2,name:'Blessing Adeyemi',email:'blessing@store.ng',role:'Cashier',status:'active',sales:72,rev:'₦288K',pin:'****',joinDate:'Feb 2026'},
  {id:3,name:'Yusuf Musa',email:'yusuf@store.ng',role:'Attendant',status:'active',sales:61,rev:'₦244K',pin:'****',joinDate:'Mar 2026'},
  {id:4,name:'Sandra Nweke',email:'sandra@store.ng',role:'Cashier',status:'inactive',sales:48,rev:'₦192K',pin:'****',joinDate:'Apr 2026'},
];

const ROLE_COLORS:Record<string,string>={Manager:'badge-purple',Cashier:'badge-blue',Attendant:'badge-gray'};

export default function AttendantsPage() {
  const [showModal,setShowModal]=useState(false);
  const [showPin,setShowPin]=useState<Record<number,boolean>>({});

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Attendants</h1>
          <p className="text-sm text-gray-400">{ATTENDANTS.length} staff members · 3 active</p>
        </div>
        <button onClick={()=>setShowModal(true)} className="btn btn-primary gap-2 self-start sm:self-auto">
          <UserPlus className="w-4 h-4"/> Add Attendant
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{l:'Total Staff',v:'4'},{l:'Active',v:'3'},{l:'Total Sales',v:'270'},{l:'Revenue Generated',v:'₦1.08M'}].map(s=>(
          <div key={s.l} className="card p-4 text-center">
            <p className="text-xl font-black text-gray-900 mb-1">{s.v}</p>
            <p className="text-xs text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Attendant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ATTENDANTS.map(a=>(
          <div key={a.id} className="card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl grad-green flex items-center justify-center text-white font-black text-base flex-shrink-0">{a.name[0]}</div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{a.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{a.email}</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 flex-shrink-0">
                <MoreVertical className="w-4 h-4"/>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${ROLE_COLORS[a.role]} flex items-center gap-1`}><Shield className="w-3 h-3"/>{a.role}</span>
              <span className={`badge ${a.status==='active'?'badge-green':'badge-gray'}`}>{a.status}</span>
              <span className="text-[10px] text-gray-400 ml-auto">Since {a.joinDate}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[{l:'Sales',v:a.sales},{l:'Revenue',v:a.rev},{l:'Rating',v:'4.8★'}].map(s=>(
                <div key={s.l} className="bg-gray-50 rounded-xl p-2">
                  <p className="font-black text-gray-900 text-sm">{s.v}</p>
                  <p className="text-[10px] text-gray-400">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">PIN:</span>
              <span className="font-mono text-sm font-bold text-gray-700 flex-1">{showPin[a.id]?'1234':a.pin}</span>
              <button onClick={()=>setShowPin(prev=>({...prev,[a.id]:!prev[a.id]}))} className="text-gray-400 hover:text-gray-600">
                {showPin[a.id]?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal&&(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Add Attendant</h3>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">✕</button>
            </div>
            {['Full Name','Email Address','Phone Number'].map(f=>(
              <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1.5">{f}</label><input type="text" placeholder={f} className="input"/></div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
              <select className="input">
                {['Manager','Cashier','Attendant'].map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Access PIN (4-6 digits)</label>
              <input type="password" placeholder="••••" maxLength={6} className="input text-center tracking-widest text-xl"/>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setShowModal(false)} className="btn btn-secondary flex-1">Cancel</button>
              <button className="btn btn-primary flex-1 gap-2"><UserPlus className="w-4 h-4"/>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
