'use client';
import { TrendingUp, ArrowDownToLine, Download, Filter, Eye, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART=[{m:'Jan',v:210000},{m:'Feb',v:185000},{m:'Mar',v:310000},{m:'Apr',v:275000},{m:'May',v:420000},{m:'Jun',v:380000},{m:'Jul',v:510000},{m:'Aug',v:470000}];

const TRANSACTIONS=[
  {id:'TXN-001',type:'Sale',desc:'POS Sale - Jollof Rice ×3',date:'Aug 14, 2026',amount:12000,status:'credit'},
  {id:'TXN-002',type:'Sale',desc:'POS Sale - Croissant ×5',date:'Aug 14, 2026',amount:7500,status:'credit'},
  {id:'TXN-003',type:'Withdrawal',desc:'Bank Transfer - GTBank',date:'Aug 13, 2026',amount:50000,status:'debit'},
  {id:'TXN-004',type:'Sale',desc:'Online Order - Smoothie Bowl',date:'Aug 13, 2026',amount:2800,status:'credit'},
  {id:'TXN-005',type:'Sale',desc:'POS Sale - Shawarma ×2',date:'Aug 12, 2026',amount:7000,status:'credit'},
  {id:'TXN-006',type:'Withdrawal',desc:'Bank Transfer - Access Bank',date:'Aug 10, 2026',amount:80000,status:'debit'},
  {id:'TXN-007',type:'Sale',desc:'POS Sale - Iced Coffee ×4',date:'Aug 9, 2026',amount:7200,status:'credit'},
];

export default function WalletPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Wallet & Finance</h1>
          <p className="text-sm text-gray-400">Track earnings, withdrawals, and financial summaries</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm gap-2"><Download className="w-4 h-4"/>Export</button>
          <button className="btn btn-primary btn-sm gap-2"><ArrowDownToLine className="w-4 h-4"/>Withdraw</button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="grad-green rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"/>
          <p className="text-white/70 text-sm font-medium mb-2">Available Balance</p>
          <p className="text-3xl sm:text-4xl font-black mb-4" style={{fontFamily:'var(--font-heading)'}}>₦247,500</p>
          <button className="bg-white text-[#16A34A] font-bold text-sm px-4 py-2 rounded-xl hover:shadow-lg transition-shadow">Withdraw Now</button>
        </div>
        <div className="card p-6">
          <p className="metric-label mb-2">Total Earned (This Month)</p>
          <p className="metric-val text-[#16A34A] mb-1">₦510,000</p>
          <span className="badge badge-green text-[10px]">+21% vs last month</span>
        </div>
        <div className="card p-6">
          <p className="metric-label mb-2">Total Withdrawn</p>
          <p className="metric-val text-gray-900 mb-1">₦262,500</p>
          <p className="text-xs text-gray-400">Across 3 withdrawals this month</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900">Revenue History</h3>
          <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center"><Filter className="w-3.5 h-3.5 text-gray-500"/></button>
        </div>
        <div className="chart-wrap h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART} margin={{top:5,right:5,bottom:0,left:10}}>
              <defs>
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} dy={6}/>
              <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#9CA3AF'}} tickFormatter={v=>`₦${v/1000}k`} width={50}/>
              <Tooltip formatter={(v)=>`₦${Number(v).toLocaleString()}`} contentStyle={{borderRadius:12,border:'none',boxShadow:'0 4px 24px rgba(0,0,0,.1)'}}/>
              <Area type="monotone" dataKey="v" stroke="#16A34A" strokeWidth={2.5} fillOpacity={1} fill="url(#wg)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Transaction History</h3>
          <button className="text-[#16A34A] text-xs font-bold flex items-center gap-1">All <ChevronRight className="w-3.5 h-3.5"/></button>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>ID</th><th>Description</th><th>Date</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(t=>(
                <tr key={t.id}>
                  <td><span className="font-mono text-xs text-gray-400">{t.id}</span></td>
                  <td>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.desc}</p>
                      <p className="text-xs text-gray-400">{t.type}</p>
                    </div>
                  </td>
                  <td><span className="text-sm text-gray-500">{t.date}</span></td>
                  <td>
                    <span className={`font-black text-sm ${t.status==='credit'?'text-[#16A34A]':'text-red-500'}`}>
                      {t.status==='credit'?'+':'-'}₦{t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${t.status==='credit'?'badge-green':'badge-red'}`}>
                      {t.status==='credit'?'Credit':'Debit'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
