"use client";

import { supabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function LogoutButton() {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; 
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all duration-200 group"
    >
      <span className="hidden md:inline">Sign Out</span>
      <LogOut
        size={16}
        className="group-hover:translate-x-0.5 transition-transform"
      />
    </button>
  );
}
