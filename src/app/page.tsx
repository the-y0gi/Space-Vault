import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 w-20 h-20 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex items-center justify-center">
        <Globe size={40} strokeWidth={1.5} />
      </div>

      <h1 className="text-6xl md:text-7xl font-medium tracking-tighter text-[#111] mb-6">
        Space <span className="text-gray-300">Vault.</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-xl leading-relaxed mb-10">
        A minimalist workspace to capture and organize your digital world. 
        Fast, private, and beautiful.
      </p>

      <Link 
        href="/dashboard"
        className="group bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200"
      >
        Open your vault
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Footer Info */}
      <div className="absolute bottom-10 flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400">
        <span>Cloud Sync</span>
        <span>Real-time</span>
        <span>Minimalist</span>
      </div>
    </main>
  );
}