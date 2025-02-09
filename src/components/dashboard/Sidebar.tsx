'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
  const navItems = [
    { label: 'Profile', href: '/profile', icon: '👤' },
    { label: 'Messages', href: '/messages', icon: '💬' },
    { label: 'Notifications', href: '/notifications', icon: '🔔' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl border border-border p-6 sticky top-24">
      {/* User Profile Section */}
      <div className="text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src={user.photoURL || '/images/default-avatar.png'}
            alt={user.displayName || 'User'}
            fill
            className="rounded-full object-cover border-2 border-primary"
          />
        </div>
        <h2 className="text-xl font-bold mb-1">{user.displayName}</h2>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <motion.div
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
} 