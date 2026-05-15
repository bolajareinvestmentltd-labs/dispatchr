import Link from 'next/link';
import { ArrowRight, Package, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-6">
      
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center space-y-8 mt-10">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          System Operational
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Flawless delivery for your <span className="text-slate-400">special day.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The enterprise-grade fulfillment engine designed exclusively for high-end event logistics. Claim your package, track it in real-time, and experience true VIP treatment.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/claim" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-slate-800 hover:scale-105 transition-all duration-200 shadow-xl shadow-black/10">
            Claim Your Package <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-32">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-6">
            <Zap className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">Instant Allocation</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Axis-based routing automatically pairs your package with the fastest available local dispatch rider.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-6">
            <ShieldCheck className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">Verified Claims</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Secure payment verification and mandatory receipt uploads guarantee safe and accurate fulfillment.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-6">
            <Package className="w-6 h-6 text-slate-700" />
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">Live Tracking</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Guests receive a dedicated, real-time portal to monitor their package from dispatch directly to their doorstep.</p>
        </div>

      </div>
    </main>
  );
}