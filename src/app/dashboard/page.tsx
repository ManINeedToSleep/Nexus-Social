'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PostFeed from '@/components/dashboard/PostFeed';
import Sidebar from '@/components/dashboard/Sidebar';
import TrendingSidebar from '@/components/dashboard/TrendingSidebar';

export default function DashboardPage() {
  const router = useRouter();
  const { loading } = useAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router, loading]);

  if (loading) return null; // Or a loading spinner
  if (!isAuthenticated || !user) return null;

  return (
    <DashboardLayout>
      <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
        {/* Left Sidebar */}
        <aside className="hidden md:block md:col-span-3">
          <Sidebar user={user} />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-6">
          <PostFeed />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <TrendingSidebar />
        </aside>
      </div>
    </DashboardLayout>
  );
} 