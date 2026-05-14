'use client';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  TrendingUp, ShoppingCart, Package, Users,
  ArrowUpRight, Terminal, Plus, Settings, Filter, ChevronRight
} from 'lucide-react';

const WEEK_DATA = [
  {d:'Mon',rev:38000},{d:'Tue',rev:52000},{d:'Wed',rev:29000},
  {d:'Thu',rev:68000},{d:'Fri',rev:45000},{d:'Sat',rev:80000},{d:'Sun',rev:62000}
];

const RECENT = [
  {id:1,init:'R',name:'Rufus B.',time:'09:02 PM',amt:'₦2,160',status:'Pending'},
  {id:2,init:'O',name:'Odetayo M.',time:'08:20 PM',amt:'₦3,260',status:'Pending'},
  {id:3,init:'N',name:'Emmanuel N.',time:'06:26 PM',amt:'₦6,360',status:'Delivered'},
  {id:4,init:'G',name:'Gift A.',time:'05:50 PM',amt:'₦3,560',status:'Delivered'},
  {id:5,init:'F',name:'Fatima I.',time:'04:15 PM',amt:'₦1,800',status:'Delivered'},
];

const STATUS:Record<string,string> = {
  Pending:'text-[#854D0E] bg-[#FEF9C3]',
  Delivered:'text-[#16A34A] bg-[#DCFCE7]',
};

const TOP_PRODUCTS = [
  {name:'Jollof Rice',sales:42,revenue:168000},
  {name:'Croissant',sales:38,revenue:99800},
  {name:'Smoothie Bowl',sales:31,revenue:108500},
  {name:'Dark Chocolate',sales:28,revenue:78400},
];

export default function DashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      {/* Banner */}
      <div className="grad-navy rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16A34A]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"/>
        <div className="relative z-10">
          <p className="text-[#4ADE80] text-xs font-bold tracking-widest uppercase mb-2">Merchant Command Center</p>
          <h2 className="text-2xl sm:text-3xl font-black mb-1 leading-tight" style={{fontFamily:'var(--font-heading)'}}>
            Hi, <span className="text-[#4ADE80]">Vendor Store</span> 👋
          </h2>
          <p className="text-white/50 text-sm">Here's what's happening at your store today.</p>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
          <button className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white py-2.5 px-5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-green-500/25">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"/> OPEN STORE
          </button>
          <Link href="/pos" className="flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white py-2.5 px-5 rounded-xl font-bold text-sm transition-colors">
            <Terminal className="w-4 h-4"/> LAUNCH POS
          </Link>
          <Link href="/inventory" className="flex items-center gap-2 bg-[#FACC15] hover:bg-[#EAB308] text-gray-900 py-2.5 px-5 rounded-xl font-bold text-sm transition-colors">
            <Plus className="w-4 h-4"/> ADD PRODUCT
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {label:"Today's Revenue",value:'₦47,600',change:'+12%',icon:TrendingUp,color:'text-[#16A34A]',bg:'bg-[#EAF7EC]'},
          {label:'Orders Today',value:'24',change:'+4 new',icon:ShoppingCart,color:'text-blue-600',bg:'bg-blue-50'},
          {label:'Active Products',value:'18',change:'2 low stock',icon:Package,color:'text-purple-600',bg:'bg-purple-50'},
          {label:'Customers',value:'312',change:'+8 this week',icon:Users,color:'text-orange-500',bg:'bg-orange-50'},
        ].map(s=>(
          <div key={s.label} className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`}/>
              </div>
              <ArrowUpRight className={`w-4 h-4 ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}/>
            </div>
            <p className="metric-label mb-1">{s.label}</p>
            <p className={`metric-val ${s.color} mb-1`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {title:'Store Settings',sub:'Profile & Info',href:'/settings',icon:Settings,color:'text-orange-500',bg:'bg-orange-50',btnStyle:'border border-orange-200 text-orange-500 hover:bg-orange-50'},
          {title:'Add Product',sub:'Inventory',href:'/inventory',icon:Plus,color:'text-blue-600',bg:'bg-blue-50',btnStyle:'bg-blue-600 text-white hover:bg-blue-700'},
          {title:'Customize',sub:'Storefront',href:'/storefront',icon:Settings,color:'text-[#16A34A]',bg:'bg-[#EAF7EC]',btnStyle:'border border-green-200 text-[#16A34A] hover:bg-[#EAF7EC]'},
          {title:'POS System',sub:'Process Sales',href:'/pos',icon:Terminal,color:'text-purple-600',bg:'bg-purple-50',btnStyle:'bg-purple-600 text-white hover:bg-purple-700'},
        ].map(q=>(
          <div key={q.title} className="card p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${q.bg} flex items-center justify-center flex-shrink-0`}>
                <q.icon className={`w-5 h-5 ${q.color}`}/>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">{q.title}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide truncate">{q.sub}</p>
              </div>
            </div>
            <Link href={q.href} className={`text-center py-2 rounded-lg text-xs font-bold transition-colors ${q.btnStyle}`}>
              Open
            </Link>
          </div>
        ))}
      </div>

      {/* Chart + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-5 sm:p-6">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Sales Analytics</h3>
              <div className="flex gap-8">
                <div>
                  <p className="metric-label mb-1">Revenue</p>
                  <p className="text-2xl font-black text-gray-900">₦374,000</p>
                </div>
                <div>
                  <p className="metric-label mb-1">Orders</p>
                  <p className="text-2xl font-black text-gray-900">156</p>
                </div>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100">
              <Filter className="w-3.5 h-3.5"/>
            </button>
          </div>
          <div className="chart-wrap h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEK_DATA} margin={{top:5,right:5,bottom:0,left:10}}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} dy={6}/>
                <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} tickFormatter={v=>`₦${v/1000}k`} width={45}/>
                <Tooltip formatter={v=>`₦${(v as number).toLocaleString()}`} contentStyle={{borderRadius:12,border:'none',boxShadow:'0 4px 24px rgba(0,0,0,.1)'}}/>
                <Area type="monotone" dataKey="rev" stroke="#16A34A" strokeWidth={2.5} fillOpacity={1} fill="url(#g1)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <Link href="/orders" className="text-[#16A34A] text-xs font-bold flex items-center gap-1">All <ChevronRight className="w-3.5 h-3.5"/></Link>
          </div>
          <div className="space-y-2 flex-1">
            {RECENT.map(r=>(
              <div key={r.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#EAF7EC] text-[#16A34A] font-bold flex items-center justify-center text-sm flex-shrink-0">{r.init}</div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.time}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-bold text-sm text-gray-900">{r.amt}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${STATUS[r.status]}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="card p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900">Top Selling Products</h3>
          <Link href="/inventory" className="text-[#16A34A] text-xs font-bold flex items-center gap-1">View All <ChevronRight className="w-3.5 h-3.5"/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOP_PRODUCTS.map((p,i)=>(
            <div key={p.name} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
              <span className="text-lg font-black text-gray-300 w-5 flex-shrink-0">#{i+1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.sales} sales</p>
              </div>
              <p className="font-black text-sm text-[#16A34A] flex-shrink-0">₦{p.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
