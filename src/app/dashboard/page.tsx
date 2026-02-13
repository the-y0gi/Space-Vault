import { createClient } from "@/lib/supabase/server";
import BookmarkForm from "@/components/bookmark/BookmarkForm";
import BookmarkList from "@/components/bookmark/BookmarkList";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name || "Explorer";
  const firstName = fullName.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#F8F9FA] bg-grid-pattern text-black pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-20">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-10">
            <div className="text-2xl md:text-3xl font-bold tracking-tighter">
              Space <span className="text-gray-300">Vault.</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Personal Vault
                </span>
                <span className="text-sm font-semibold">{fullName}</span>
              </div>

              <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                <LogoutButton />
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex sm:hidden items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
              Welcome back, {firstName}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#111] leading-[1.05] mb-6">
              Every link, <span className="text-gray-300">organized.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-medium">
              Capture, curate, and access your digital library in a minimalist
              workspace.
            </p>
          </div>
        </header>

        <section className="mb-12">
          <div className="bg-white border border-gray-200 rounded-[28px] p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <BookmarkForm />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8 px-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
              Vaulted Content
            </h2>
            <div className="h-[1px] flex-1 bg-gray-200/60" />
          </div>
          <BookmarkList />
        </section>
      </div>
    </main>
  );
}
