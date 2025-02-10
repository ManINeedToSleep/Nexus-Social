/**
 * Dashboard Layout Component
 * 
 * Main layout for the dashboard area. Provides:
 * - Common layout structure
 * - Navigation integration
 * - Sidebar management
 * - Responsive design
 * 
 * @note This is a client component that handles protected routes
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import TrendingSidebar from '@/components/dashboard/TrendingSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // Protected route check
  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <main className="flex-1">{children}</main>
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
} 