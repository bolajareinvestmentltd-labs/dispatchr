import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Dispatchr</h1>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        Premium logistics and fulfillment for your special day.
      </p>
      <Link href="/claim" className="px-6 py-3 bg-black text-white rounded-md hover:bg-slate-800 transition shadow-md">
        Claim Your Package
      </Link>
    </main>
  );
}