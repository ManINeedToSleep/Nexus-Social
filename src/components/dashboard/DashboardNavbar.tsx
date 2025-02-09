'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function DashboardNavbar() {
  const router = useRouter();
  // Remove user if not using it
  // const user = useAuthStore((state) => state.user);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Nexus_Social_Logo.png"
                alt="Nexus Social"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Nexus</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="nav-link">
              Feed
            </Link>
            <Link href="/messages" className="nav-link">
              Messages
            </Link>
            <Link href="/notifications" className="nav-link">
              Notifications
            </Link>
            <button onClick={handleSignOut} className="btn-secondary">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 