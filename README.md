# Space Vault 🌌 - Smart Bookmark App

A minimalist, high-performance bookmark manager built with Next.js and Supabase. Capture and organize your digital world in real-time.

## 🚀 Live Demo

[View Live App on Vercel](https://your-vercel-deployment-url.vercel.app) _(Replace with your live URL after deployment)_

## ✨ Features

- **Google OAuth**: Fast and secure login with Google only.
- **Personal Vault**: Each user's bookmarks are private (User A cannot see User B's).
- **Real-time Sync**: Updates instantly across tabs using Supabase Realtime.
- **Minimalist Design**: Clean, modern UI built with Tailwind CSS.
- **Easy Management**: Add URLs with titles and delete them with one click.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🧠 Problems Faced & Solutions

###  Middleware Redirection Loops

**Problem**: Setting up route protection created some redirection loops between `/login` and `/dashboard`.
**Solution**: Refined the middleware logic to specifically check for session existence and current pathname, ensuring that `/_next` and `/auth` routes are always bypassed.

## 🛠️ Setup Instructions

1. **Clone the repo**:

   ```bash
   git clone <your-repo-url>
   cd smart-bookmark
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the app**:

   ```bash
   npm run dev
   ```

5. **Supabase Schema**:
   Run this in your Supabase SQL Editor:

   ```sql
   create table bookmarks (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()),
     title text not null,
     url text not null,
     user_id uuid references auth.users(id) on delete cascade not null
   );

   -- Enable RLS
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
