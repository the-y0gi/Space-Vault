"use client";

import { supabase } from "@/lib/supabase/client";
import { Globe, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] bg-grid-pattern flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
            <Globe className="text-black" size={32} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Welcome to Space <span className="text-gray-300">Vault.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            The minimalist way to curate and organize your digital world. Sign
            in to access your personal vault.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <button
            onClick={handleLogin}
            className="group w-full flex items-center justify-between bg-black text-white p-4 rounded-[26px] hover:bg-gray-800 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 ml-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-semibold text-sm">
                Continue with Google
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors mr-1">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-gray-400 uppercase tracking-widest font-medium">
          Secured by Supabase Auth
        </p>
      </div>
    </div>
  );
}
