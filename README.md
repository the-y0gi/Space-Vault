# Space Vault 🌌 - Smart Bookmark App

A minimalist, high-performance bookmark manager built with Next.js and Supabase. Capture and organize your digital world in real-time.

---

## 🚀 Live Demo

👉 [View Live App on Vercel](https://space-vault.vercel.app)

---

## ✨ Features

- **Google OAuth Only** – Secure authentication using Google.
- **Private Vault** – Each user's bookmarks are completely isolated using Supabase Row Level Security (RLS).
- **Real-time Sync** – Bookmarks update instantly across multiple tabs.
- **Protected Routes** – Dashboard access is restricted to authenticated users.
- **Minimalist UI** – Clean and modern interface built with Tailwind CSS.
- **Easy Management** – Add and delete bookmarks with a smooth user experience.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 🧠 Problems Faced & Solutions

### Middleware Redirection Loops

**Problem:** While protecting routes, I faced redirection loops between `/login` and `/dashboard`.  
**Solution:** I refined the middleware logic to properly check session existence and current pathname, and excluded routes like `/_next` and `/auth` from protection.

### OAuth Callback Redirect Issue

**Problem:** After deployment, Google login was redirecting back to `localhost` instead of the production domain.  
**Solution:** Supabase still had `localhost` saved as the Site URL. Updating the Site URL and redirect configuration in Supabase fixed the issue.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/the-y0gi/Space-Vault
cd space-vault
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

### 4️⃣ Run the App

```bash
npm run dev
```

---

## 🗄️ Supabase Database Setup

Run the following SQL in the Supabase SQL Editor:

```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  title text not null,
  url text not null,
  user_id uuid references auth.users(id) on delete cascade not null
);

-- Enable Row Level Security
alter table bookmarks enable row level security;

-- Policy for inserting
create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

-- Policy for viewing
create policy "Users can view their own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

-- Policy for deleting
create policy "Users can delete their own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

### ⚡ Enable Realtime

1. Go to **Database** → **Publications**
2. Open `supabase_realtime`
3. Add the `bookmarks` table

This enables live updates across multiple tabs.

---

## 📌 What I Learned

This project helped me deeply understand OAuth authentication flows, Supabase Row Level Security, and real-time database subscriptions. It was my first time using Supabase in a production-ready app, and building this end-to-end system was both challenging and rewarding.
