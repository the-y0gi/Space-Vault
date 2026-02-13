import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space | Smart Bookmark Manager",
  description: "Organize your digital world with a minimalist touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F9FA] text-black transition-colors duration-300`}
      >
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none z-[-1]" />
        
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none z-[-1]" />

        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}