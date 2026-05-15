import { sql } from '@/lib/db';
import { approveOrder } from '@/lib/actions';
import { ExternalLink, CheckCircle, Clock } from 'lucide-react';

export default async function AdminDashboard() {
  // 1. FETCH LIVE DATA directly from Neon
  const orders = await sql`SELECT * FROM Orders ORDER BY created_at DESC`;
  const riders = await sql`SELECT * FROM Riders ORDER BY id ASC`;

  return (
    <div className="max-w-6xl mx-auto p-8 mt-6 font-sans">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Control Panel</h1>
        <p className="text-slate-500 mt-1">Manage pending verifications and active dispatch riders.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Orders Section (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold border-b border-slate-200 pb-2">Recent Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-slate-500 italic">No orders have been placed yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                {/* Order Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg text-slate-900">{order.guest_name}</span>
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-600">#{order.id}</span>
                  </div>
                  <p className="text-sm text-slate-600">Axis: <span className="font-medium text-slate-900">{order.axis}</span></p>
                  
                  {/* Status Badges & Receipt Link */}
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    {order.status === 'Pending Verification' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                        <CheckCircle className="w-3 h-3" /> Confirmed
                      </span>
                    )}
                    
                    {order.receipt_url && (
                      <a 
                        href={order.receipt_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                      >
                        <ExternalLink className="w-3 h-3" /> View Receipt
                      </a>
                    )}
                  </div>
                </div>

                {/* Approve Button Form (Wired to Server Action) */}
                {order.status === 'Pending Verification' && (
                  <form action={approveOrder.bind(null, order.id)}>
                    <button type="submit" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm w-full sm:w-auto whitespace-nowrap">
                      Approve Payment
                    </button>
                  </form>
                )}
                
              </div>
            ))
          )}
        </div>

        {/* Riders Section */}
        <div className="space-y-6">
           <h2 className="text-xl font-semibold border-b border-slate-200 pb-2">Active Riders</h2>
           
           <div className="space-y-4">
             {riders.map((rider) => (
               <div key={rider.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                 <p className="font-bold text-slate-900">{rider.name}</p>
                 <p className="text-sm text-slate-500 mt-1">{rider.axis}</p>
                 <div className="mt-3 bg-white border border-slate-200 px-3 py-1.5 rounded-md inline-block">
                   <p className="text-sm font-medium text-slate-700 tracking-wide">{rider.phone}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}