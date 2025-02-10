/**
 * Root Layout Component
 * 
 * This is the top-level layout component that wraps all pages.
 * Handles:
 * - Global styles and theme
 * - Authentication persistence
 * - Common UI elements
 * - Meta tags and SEO
 */

'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize auth listener
  useAuth();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="relative min-h-screen">
          {!isDashboard && <Navbar />}
          {children}
        </div>
      </body>
    </html>
  );
}