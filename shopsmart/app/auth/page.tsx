'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, BarChart3, TrendingUp, Users } from 'lucide-react';

export default function AuthPage() {
  const [tab,setTab]=useState<'login'|'signup'>('login');
  const [showPw,setShowPw]=useState(false);
  const [isAttendant,setIsAttendant]=useState(false);

  return (
    <div className="min-h-dvh flex">
      {/* LEFT — Visual */}
      <div className="hidden lg:flex lg:w-1/2 grad-hero flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#16A34A]/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FACC15]/8 rounded-full blur-3xl"/>
        </div>
        <Link href="/home" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl grad-green flex items-center justify-center text-white font-black text-lg">S</div>
          <span className="font-extrabold text-xl text-white" style={{fontFamily:'var(--font-heading)'}}>Shop<span className="text-[#4ADE80]">Smart</span></span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-3 leading-tight" style={{fontFamily:'var(--font-heading)'}}>
            Your business dashboard<br/>is waiting for you
          </h2>
          <p className="text-white/50 text-sm mb-10">Join 2,000+ vendors managing their entire operation from ShopSmart.</p>

          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[{v:'₦47,600',l:"Today's Revenue",icon:TrendingUp},{v:'24',l:'Orders Today',icon:BarChart3},{v:'4',l:'Active Staff',icon:Users}].map(s=>(
              <div key={s.l} className="glass rounded-2xl p-3 text-center">
                <s.icon className="w-4 h-4 text-[#4ADE80] mx-auto mb-2"/>
                <p className="text-white font-black text-sm">{s.v}</p>
                <p className="text-white/40 text-[10px] leading-tight">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="glass rounded-2xl p-4">
            <p className="text-white/50 text-xs mb-3">Weekly Revenue</p>
            <div className="flex items-end gap-1.5 h-14">
              {[45,70,40,90,60,85,72].map((h,i)=>(
                <div key={i} className="flex-1 rounded-t bg-[#16A34A]/25 relative">
                  <div className="absolute bottom-0 left-0 right-0 rounded-t bg-[#16A34A]" style={{height:`${h}%`}}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-white/25 text-xs relative z-10">© 2026 ShopSmart. Secure & Encrypted.</p>
      </div>

      {/* RIGHT — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/home" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl grad-green flex items-center justify-center text-white font-black">S</div>
            <span className="font-extrabold text-lg" style={{fontFamily:'var(--font-heading)'}}>Shop<span className="text-[#16A34A]">Smart</span></span>
          </Link>

          {/* Type toggle (Vendor vs Attendant) */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            {(['Vendor','Attendant'] as const).map(t=>(
              <button key={t} onClick={()=>setIsAttendant(t==='Attendant')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${(t==='Attendant')===isAttendant?'bg-white shadow text-gray-900':'text-gray-500'}`}>{t}</button>
            ))}
          </div>

          {!isAttendant ? (
            <>
              {/* Vendor Tabs */}
              <div className="flex gap-4 border-b border-gray-200 mb-8">
                {(['login','signup'] as const).map(t=>(
                  <button key={t} onClick={()=>setTab(t)}
                    className={`pb-3 text-sm font-semibold capitalize transition-colors border-b-2 ${tab===t?'border-[#16A34A] text-[#16A34A]':'border-transparent text-gray-400'}`}>
                    {t==='login'?'Sign In':'Create Account'}
                  </button>
                ))}
              </div>

              <h1 className="text-2xl font-black text-gray-900 mb-1" style={{fontFamily:'var(--font-heading)'}}>
                {tab==='login'?'Welcome back':'Create your store'}
              </h1>
              <p className="text-gray-400 text-sm mb-6">
                {tab==='login'?'Sign in to your vendor dashboard':'Start managing your business in minutes'}
              </p>

              <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
                {tab==='signup'&&(
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Store / Business Name</label>
                    <input type="text" placeholder="e.g. Amaka's Bakery" className="input"/>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" placeholder="vendor@example.com" className="input"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw?'text':'password'} placeholder="••••••••" className="input pr-11"/>
                    <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>
                {tab==='login'&&(
                  <div className="flex justify-end">
                    <Link href="#" className="text-[#16A34A] text-xs font-semibold">Forgot password?</Link>
                  </div>
                )}
                <Link href="/dashboard" className="btn btn-primary w-full gap-2">
                  {tab==='login'?'Sign In':'Create Account'} <ArrowRight className="w-4 h-4"/>
                </Link>
              </form>

              <p className="text-center text-sm text-gray-400 mt-6">
                {tab==='login'?'No account?':'Already have one?'}{' '}
                <button onClick={()=>setTab(tab==='login'?'signup':'login')} className="text-[#16A34A] font-semibold">
                  {tab==='login'?'Sign up free':'Sign in'}
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-black text-gray-900 mb-1" style={{fontFamily:'var(--font-heading)'}}>Attendant Login</h1>
              <p className="text-gray-400 text-sm mb-6">Enter your attendant credentials to access the POS.</p>
              <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Store ID or Vendor Code</label>
                  <input type="text" placeholder="e.g. STORE-001" className="input"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Attendant PIN</label>
                  <input type="password" placeholder="••••" maxLength={6} className="input tracking-widest text-center text-xl"/>
                </div>
                <Link href="/pos" className="btn btn-primary w-full gap-2">
                  Access POS <ArrowRight className="w-4 h-4"/>
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
