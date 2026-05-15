import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

export default async function TrackPage({ params }) {
  // 1. THE FIX: Unwrap the params Promise (Next.js 15+ requirement)
  const { id } = await params;

  // 2. FETCH REAL DATA: Pull the actual order from your Neon database
  const result = await sql`SELECT * FROM Orders WHERE id = ${id}`;
  
  if (result.length === 0) {
    return notFound(); // Shows a 404 page if someone types a random ID
  }
  
  const order = result[0];
  const currentStatus = order.status;

  // 3. LOGIC: Determine which steps are active
  const isPending = currentStatus === 'Pending Verification';
  const isConfirmed = currentStatus === 'Payment Confirmed' || currentStatus === 'Assigned to Rider';
  const isAssigned = currentStatus === 'Assigned to Rider';

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 font-sans">
      {/* Header Section */}
      <div className="border-b border-slate-200 pb-6 mb-8 text-center">
        <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-2">Dispatchr Logistics</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Order #{id}</h1>
        <p className="text-slate-500 mt-2">Delivery Axis: <span className="font-medium text-slate-800">{order.axis}</span></p>
      </div>

      {/* Tracking Chain Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 mb-8">Live Delivery Status</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          {/* Step 1: Verification */}
          <div className="relative flex items-start justify-between">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white z-10 ${isPending || isConfirmed ? 'border-black text-black' : 'border-slate-200 text-slate-300'}`}>
              <Clock className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-3rem)] pl-4">
              <h3 className={`text-base font-bold tracking-tight ${isPending || isConfirmed ? 'text-slate-900' : 'text-slate-400'}`}>Pending Verification</h3>
              <p className="text-sm text-slate-500 mt-1">We are currently reviewing your submitted transfer receipt.</p>
            </div>
          </div>

          {/* Step 2: Confirmed */}
          <div className="relative flex items-start justify-between">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white z-10 ${isConfirmed ? 'border-black text-black' : 'border-slate-200 text-slate-300'}`}>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-3rem)] pl-4">
              <h3 className={`text-base font-bold tracking-tight ${isConfirmed ? 'text-slate-900' : 'text-slate-400'}`}>Payment Confirmed</h3>
              <p className="text-sm text-slate-500 mt-1">Your payment is verified. Your package is currently being prepared for dispatch.</p>
            </div>
          </div>

          {/* Step 3: Assigned */}
          <div className="relative flex items-start justify-between">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white z-10 ${isAssigned ? 'border-black text-black' : 'border-slate-200 text-slate-300'}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-3rem)] pl-4">
              <h3 className={`text-base font-bold tracking-tight ${isAssigned ? 'text-slate-900' : 'text-slate-400'}`}>Assigned to Rider</h3>
              <p className="text-sm text-slate-500 mt-1">A rider has picked up your package and is en route to your axis.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}