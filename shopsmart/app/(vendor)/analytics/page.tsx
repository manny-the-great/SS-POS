'use client';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, ShoppingCart, Users, Package, Download, Filter } from 'lucide-react';

const MONTHLY = [
  {m:'Jan',rev:210000,orders:98},{m:'Feb',rev:185000,orders:82},
  {m:'Mar',rev:310000,orders:140},{m:'Apr',rev:275000,orders:125},
  {m:'May',rev:420000,orders:189},{m:'Jun',rev:380000,orders:170},
  {m:'Jul',rev:510000,orders:230},{m:'Aug',rev:470000,orders:212},
];

const TOP_PRODUCTS = [
  {name:'Jollof Rice',sales:142,rev:568000},
  {name:'Croissant',sales:89,rev:133500},
  {name:'Smoothie Bowl',sales:78,rev:218400},
  {name:'Shawarma Wrap',sales:67,rev:234500},
  {name:'Dark Chocolate',sales:55,rev:137500},
];

const PIE_DATA = [
  {name:'Fast Food',value:38,color:'#16A34A'},
  {name:'Pastries',value:24,color:'#FACC15'},
  {name:'Drinks',value:20,color:'#2563EB'},
  {name:'Snacks',value:18,color:'#F97316'},
];

const ATTENDANTS = [
  {name:'Emeka Obi',sales:89,rev:'₦356K',rating:4.9},
  {name:'Blessing A.',sales:72,rev:'₦288K',rating:4.7},
  {name:'Yusuf M.',sales:61,rev:'₦244K',rating:4.6},
  {name:'Sandra N.',sales:48,rev:'₦192K',rating:4.5},
];

const PERIODS=['Today','7 Days','30 Days','3 Months','Year'];

export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Analytics</h1>
          <p className="text-sm text-gray-400">Track performance, revenue trends, and growth</p>
        </div>
        <div className="flex gap-2">
          <div className="scroll-x flex gap-1 flex-1 sm:flex-none">
            {PERIODS.map((p,i)=>(
              <button key={p} className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${i===1?'bg-[#16A34A] text-white':'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>{p}</button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm gap-2 flex-shrink-0"><Download className="w-4 h-4"/>Export</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {l:'Total Revenue',v:'₦2.76M',ch:'+23%',icon:TrendingUp,c:'text-[#16A34A]',bg:'bg-[#EAF7EC]'},
          {l:'Total Orders',v:'1,106',ch:'+18%',icon:ShoppingCart,c:'text-blue-600',bg:'bg-blue-50'},
          {l:'Avg Order Value',v:'₦2,497',ch:'+5%',icon:Package,c:'text-purple-600',bg:'bg-purple-50'},
          {l:'Total Customers',v:'312',ch:'+12%',icon:Users,c:'text-orange-500',bg:'bg-orange-50'},
        ].map(s=>(
          <div key={s.l} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}><s.icon className={`w-5 h-5 ${s.c}`}/></div>
            <p className="metric-label mb-1">{s.l}</p>
            <p className={`metric-val ${s.c} mb-1`}>{s.v}</p>
            <span className="badge badge-green text-[10px]">{s.ch} vs last period</span>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-gray-900">Revenue Trend</h3>
            <p className="text-sm text-gray-400">Monthly revenue breakdown</p>
          </div>
          <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center"><Filter className="w-3.5 h-3.5 text-gray-500"/></button>
        </div>
        <div className="chart-wrap h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY} margin={{top:5,right:5,bottom:0,left:10}}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} dy={6}/>
              <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} tickFormatter={v=>`₦${v/1000}k`} width={50}/>
              <Tooltip formatter={(v)=>`₦${Number(v).toLocaleString()}`} contentStyle={{borderRadius:12,border:'none',boxShadow:'0 4px 24px rgba(0,0,0,.1)'}}/>
              <Area type="monotone" dataKey="rev" stroke="#16A34A" strokeWidth={2.5} fillOpacity={1} fill="url(#ag)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Orders Per Month</h3>
          <div className="chart-wrap h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY} margin={{top:5,right:5,bottom:0,left:10}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} dy={6}/>
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} width={30}/>
                <Tooltip contentStyle={{borderRadius:12,border:'none',boxShadow:'0 4px 24px rgba(0,0,0,.1)'}}/>
                <Bar dataKey="orders" fill="#16A34A" radius={[6,6,0,0]} maxBarSize={32}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Sales by Category</h3>
          <div className="chart-wrap h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Legend formatter={v=><span className="text-xs text-gray-600">{v}</span>}/>
                <Tooltip formatter={(v)=>`${Number(v)}%`}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products + Best Attendants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {TOP_PRODUCTS.map((p,i)=>(
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-300 w-5 flex-shrink-0">#{i+1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                    <p className="text-sm font-black text-[#16A34A] flex-shrink-0 ml-2">₦{p.rev.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#16A34A] h-1.5 rounded-full" style={{width:`${(p.sales/142)*100}%`}}/>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{p.sales} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Best Attendants</h3>
          <div className="space-y-3">
            {ATTENDANTS.map((a,i)=>(
              <div key={a.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full grad-green flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{a.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.sales} sales · {a.rev}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-black text-[#FACC15]">★ {a.rating}</p>
                  <p className="text-[10px] text-gray-400">#{i+1} rank</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
