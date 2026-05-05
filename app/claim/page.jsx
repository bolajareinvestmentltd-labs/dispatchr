import { submitClaim } from '@/lib/actions';

export default function ClaimPage() {
  return (
    <div className="max-w-xl mx-auto p-8 mt-10">
      <h1 className="text-3xl font-bold mb-2">Claim Your Package</h1>
      <p className="text-slate-500 mb-6">Enter your details to arrange delivery.</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <form action={submitClaim} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" name="fullName" required className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-black" placeholder="E.g. John Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" name="email" required className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-black" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Select Delivery Axis</label>
            <select name="axis" className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-black">
              <option value="Ilorin - Tanke/Fate">Ilorin - Tanke/Fate (₦1,500)</option>
              <option value="Ilorin - G.R.A/Taiwo">Ilorin - G.R.A/Taiwo (₦1,500)</option>
              <option value="Out of State - Park Waybill">Out of State - Park Waybill (₦2,500)</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-100 mt-6">
            <p className="text-sm font-medium mb-1">Payment Details</p>
            <p className="text-sm text-slate-600">Bank: Opay / Moniepoint</p>
            <p className="text-sm text-slate-600">Account: 1234567890</p>
            <p className="text-sm text-slate-600">Name: Your Name Here</p>
          </div>

          {/* The New Image Upload Field */}
          <div className="pt-2">
            <label className="block text-sm font-medium mb-1">Transfer Receipt (Optional)</label>
            <input 
              type="file" 
              name="receipt" 
              accept="image/*" 
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-black text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-black hover:file:bg-slate-200" 
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-slate-800 transition">
            I Have Made The Transfer
          </button>
        </form>
      </div>
    </div>
  );
}