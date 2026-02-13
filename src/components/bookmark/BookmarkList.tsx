"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Trash2, ExternalLink, Globe, BookmarkIcon } from "lucide-react";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  user_id: string;
};

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    let channel: any;

    const setup = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setBookmarks(data);

      channel = supabase
        .channel("bookmarks-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
            }
            if (payload.eventType === "DELETE") {
              const deletedId = payload.old?.id;
              if (deletedId) {
                setBookmarks((prev) => prev.filter((b) => b.id !== deletedId));
              }
            }
          },
        )
        .subscribe();
    };

    setup();
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);

      if (error) throw error;

      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (error: any) {
      alert("Error deleting: " + error.message);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl bg-white/50">
        <BookmarkIcon className="mx-auto text-gray-300 mb-4" size={40} />
        <p className="text-gray-400 font-medium">No bookmarks saved yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="group bg-white border border-gray-100 p-5 rounded-[24px] transition-all hover:shadow-xl hover:shadow-gray-200/40 flex flex-col justify-between min-h-[160px] relative"
        >
          <div>
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                <Globe size={16} className="text-gray-400" />
              </div>

              <button
                onClick={() => handleDelete(bookmark.id)}
                className="p-2 text-gray-300 hover:text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
                aria-label="Delete bookmark"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="mt-4 font-bold text-gray-900 leading-tight line-clamp-2 pr-2 text-sm sm:text-base">
              {bookmark.title
                ?.toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </h3>

            <div className="flex items-center gap-1.5 mt-2">
              <p className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">
                {new URL(bookmark.url).hostname}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-black uppercase tracking-wider hover:gap-2 transition-all"
            >
              Open <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
