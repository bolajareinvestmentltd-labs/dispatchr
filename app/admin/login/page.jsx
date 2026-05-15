'use client'; // This needs to be a client component for the form state

import { loginAdmin } from '@/lib/actions';
import { Lock } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogin() {
  const [error, setError] = useState(false);

  async function handleSubmit(formData) {
    const res = await loginAdmin(formData);
    if (res?.error) setError(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
        
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-slate-700" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Admin Access</h1>
        <p className="text-slate-500 mb-8 text-sm">Enter your master password to access the dispatch control panel.</p>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter master password..." 
              required
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black text-center tracking-widest" 
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">Incorrect password. Access denied.</p>}

          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition">
            Authenticate
          </button>
        </form>

      </div>
    </div>
  );
}