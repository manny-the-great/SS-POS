'use client';
import { Filter, ChevronRight } from 'lucide-react';

const ORDERS=[
  {id:'ORD-001',customer:'Rufus Bello',items:'Jollof Rice ×3, Croissant ×2',total:'₦14,500',date:'Aug 14, 2026',time:'9:02 PM',status:'Pending'},
  {id:'ORD-002',customer:'Odetayo Musa',items:'Shawarma Wrap ×1',total:'₦3,500',date:'Aug 14, 2026',time:'8:20 PM',status:'Confirmed'},
  {id:'ORD-003',customer:'Emmanuel Nweke',items:'Smoothie Bowl ×2, Iced Coffee ×3',total:'₦11,000',date:'Aug 14, 2026',time:'6:26 PM',status:'Delivered'},
  {id:'ORD-004',customer:'Gift Adeyemi',items:'Dark Chocolate ×4',total:'₦10,000',date:'Aug 13, 2026',time:'5:50 PM',status:'Delivered'},
  {id:'ORD-005',customer:'Fatima Ibrahim',items:'Orange Juice ×6',total:'₦7,200',date:'Aug 13, 2026',time:'4:15 PM',status:'Cancelled'},
  {id:'ORD-006',customer:'Chukwudi Obi',items:'Grilled Chicken ×1',total:'₦5,500',date:'Aug 12, 2026',time:'1:30 PM',status:'Delivered'},
];

const STATUS_STYLE:Record<string,string>={
  Pending:'badge-yellow',Confirmed:'badge-blue',Delivered:'badge-green',Cancelled:'badge-red'
};

export default function OrdersPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{fontFamily:'var(--font-heading)'}}>Orders</h1>
          <p className="text-sm text-gray-400">{ORDERS.length} orders this week</p>
        </div>
        <button className="btn btn-secondary btn-sm gap-2 self-start"><Filter className="w-4 h-4"/>Filter</button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{l:'All Orders',v:'24',c:'text-gray-900'},{l:'Pending',v:'6',c:'text-yellow-500'},{l:'Delivered',v:'15',c:'text-green-600'},{l:'Cancelled',v:'3',c:'text-red-500'}].map(s=>(
          <div key={s.l} className="card p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
            <p className={`text-2xl font-black ${s.c} mb-1`}>{s.v}</p>
            <p className="text-xs text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {ORDERS.map(o=>(
                <tr key={o.id}>
                  <td><span className="font-mono text-xs font-bold text-gray-500">{o.id}</span></td>
                  <td><p className="font-semibold text-gray-900 text-sm">{o.customer}</p></td>
                  <td><p className="text-sm text-gray-500 max-w-xs truncate-2">{o.items}</p></td>
                  <td><p className="font-black text-gray-900">{o.total}</p></td>
                  <td><div><p className="text-sm text-gray-600">{o.date}</p><p className="text-xs text-gray-400">{o.time}</p></div></td>
                  <td><span className={`badge ${STATUS_STYLE[o.status]}`}>{o.status}</span></td>
                  <td><button className="text-[#16A34A] hover:text-[#15803D]"><ChevronRight className="w-4 h-4"/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
