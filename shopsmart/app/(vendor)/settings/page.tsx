'use client';
import { useState } from 'react';
import { Camera, Bell, Lock, Globe, Palette, Save, Upload } from 'lucide-react';

const TABS=['Profile','Business','Notifications','Password','Appearance'];

export default function SettingsPage() {
  const [tab,setTab]=useState('Profile');
  const [notifs,setNotifs]=useState({newOrder:true,lowStock:true,withdrawal:true,weekly:false,promo:true});

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Settings</h1>
        <p className="text-sm text-gray-400">Manage your store profile and preferences</p>
      </div>

      {/* Tabs */}
      <div className="scroll-x gap-1 border-b border-gray-200 pb-0">
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${tab===t?'border-[#16A34A] text-[#16A34A]':'border-transparent text-gray-400 hover:text-gray-600'}`}>{t}</button>
        ))}
      </div>

      {tab==='Profile'&&(
        <div className="space-y-5">
          {/* Avatar */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Store Logo</h3>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl grad-green flex items-center justify-center text-white font-black text-2xl flex-shrink-0 relative">
                V
                <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-gray-600"/>
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Upload a logo</p>
                <p className="text-xs text-gray-400 mb-3">PNG, JPG up to 2MB. Recommended 200×200px.</p>
                <button className="btn btn-secondary btn-sm gap-2"><Upload className="w-3.5 h-3.5"/>Upload Image</button>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Store Banner</h3>
            <div className="h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#16A34A] transition-colors">
              <Upload className="w-5 h-5 text-gray-300"/>
              <p className="text-sm text-gray-400">Click to upload banner image</p>
              <p className="text-xs text-gray-300">1200×300px recommended</p>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h3 className="font-bold text-gray-900">Store Information</h3>
            {[
              {l:'Store Name',p:'e.g. Amaka\'s Bakery',v:'Vendor Store'},
              {l:'Store Handle',p:'@yourstore',v:'@vendorstore'},
              {l:'Email Address',p:'store@example.com',v:'vendor@shopsmart.ng'},
              {l:'Phone Number',p:'+234 800 000 0000',v:'+234 800 123 4567'},
              {l:'Store Description',p:'Tell customers about your store…',v:'',ta:true},
            ].map(f=>(
              <div key={f.l}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label>
                {f.ta?<textarea defaultValue={f.v} placeholder={f.p} className="input h-20 py-3 resize-none"/>
                      :<input type="text" defaultValue={f.v} placeholder={f.p} className="input"/>}
              </div>
            ))}
            <button className="btn btn-primary gap-2"><Save className="w-4 h-4"/>Save Changes</button>
          </div>
        </div>
      )}

      {tab==='Business'&&(
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900">Business Details</h3>
          {[
            {l:'Business Category',select:true,opts:['Food & Beverage','Retail','Fashion','Electronics','Health & Beauty']},
            {l:'Business Address',p:'Full business address',t:'text'},
            {l:'City',p:'e.g. Lagos',t:'text'},
            {l:'Business Registration Number',p:'RC 123456',t:'text'},
            {l:'Tax ID / TIN',p:'TIN Number',t:'text'},
          ].map(f=>(
            <div key={f.l}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label>
              {f.select?<select className="input">{f.opts!.map(o=><option key={o}>{o}</option>)}</select>
                       :<input type={f.t||'text'} placeholder={f.p} className="input"/>}
            </div>
          ))}
          <button className="btn btn-primary gap-2"><Save className="w-4 h-4"/>Save Changes</button>
        </div>
      )}

      {tab==='Notifications'&&(
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-gray-900">Notification Preferences</h3>
          {(Object.entries(notifs) as [keyof typeof notifs,boolean][]).map(([k,v])=>{
            const labels:Record<string,{l:string,d:string}>={
              newOrder:{l:'New Orders',d:'Get notified when a new order comes in'},
              lowStock:{l:'Low Stock Alerts',d:'Alert when product stock falls below 5'},
              withdrawal:{l:'Withdrawal Updates',d:'Notifications on withdrawal status'},
              weekly:{l:'Weekly Reports',d:'Get weekly summary every Monday'},
              promo:{l:'Promotion Reminders',d:'Reminders to launch promotions'},
            };
            return (
              <div key={k} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{labels[k].l}</p>
                  <p className="text-xs text-gray-400">{labels[k].d}</p>
                </div>
                <button onClick={()=>setNotifs(n=>({...n,[k]:!v}))}
                  className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${v?'bg-[#16A34A]':'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-all ${v?'left-6':'left-1'}`}/>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab==='Password'&&(
        <div className="card p-6 space-y-4 max-w-md">
          <h3 className="font-bold text-gray-900">Change Password</h3>
          {['Current Password','New Password','Confirm New Password'].map(f=>(
            <div key={f}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f}</label>
              <input type="password" placeholder="••••••••" className="input"/>
            </div>
          ))}
          <button className="btn btn-primary gap-2 w-full"><Lock className="w-4 h-4"/>Update Password</button>
        </div>
      )}

      {tab==='Appearance'&&(
        <div className="card p-6 space-y-5">
          <h3 className="font-bold text-gray-900">Theme & Appearance</h3>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Storefront Theme Color</p>
            <div className="flex flex-wrap gap-3">
              {['#16A34A','#2563EB','#7C3AED','#DC2626','#EA580C','#0891B2'].map(c=>(
                <button key={c} className="w-9 h-9 rounded-xl border-2 border-transparent hover:border-gray-400 transition-all" style={{background:c}}/>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Dashboard Mode</p>
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              {['Light','Dark'].map(m=>(
                <button key={m} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${m==='Light'?'border-[#16A34A] bg-[#EAF7EC] text-[#16A34A]':'border-gray-200 text-gray-600'}`}>{m}</button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary gap-2"><Save className="w-4 h-4"/>Save Appearance</button>
        </div>
      )}
    </div>
  );
}
