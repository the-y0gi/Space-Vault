"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Plus, Link as LinkIcon, Type } from "lucide-react";

export default function BookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: user.id }]);
    if (!error) {
      setTitle("");
      setUrl("");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3"
    >
      <div className="relative w-full sm:w-64">
        <Type
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={14}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#f3f4f6] border-none rounded-xl py-2.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
          required
        />
      </div>

      <div className="relative w-full flex-1">
        <LinkIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={14}
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-[#f3f4f6] border-none rounded-xl py-2.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-black/5 transition-all outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Plus size={16} /> Save
          </>
        )}
      </button>
    </form>
  );
}
