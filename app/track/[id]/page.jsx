export default function TrackPage({ params }) {
  return (
    <div className="max-w-md mx-auto p-8 text-center mt-10">
      <h1 className="text-2xl font-bold mb-2">Order #{params.id}</h1>
      <p className="text-slate-600 mb-8">Live Tracking Status</p>
      
      <div className="space-y-6 text-left border rounded-xl p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
          <p className="font-medium">Pending Verification</p>
        </div>
        <div className="flex items-center gap-4 opacity-40">
          <div className="w-4 h-4 rounded-full bg-slate-300"></div>
          <p className="font-medium">Payment Confirmed</p>
        </div>
        <div className="flex items-center gap-4 opacity-40">
          <div className="w-4 h-4 rounded-full bg-slate-300"></div>
          <p className="font-medium">Assigned to Rider</p>
        </div>
      </div>
    </div>
  );
}