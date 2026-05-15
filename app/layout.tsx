import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Dispatchr | Premium Logistics',
  description: 'High-end last-mile delivery engine.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We use a soft slate background and ensure text highlighting looks premium (black/white) */}
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white">
        
        {/* Premium Minimalist Navbar with Backdrop Blur */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
            <Link href="/" className="text-xl font-extrabold tracking-tighter">
              Dispatchr<span className="text-slate-400">.</span>
            </Link>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
              <Link href="/claim" className="hover:text-black transition-colors">Claim Package</Link>
              <Link href="/track/1" className="hover:text-black transition-colors">Sample Tracking</Link>
              <Link href="/admin" className="text-blue-600 hover:text-blue-800 transition-colors">Admin Portal</Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}