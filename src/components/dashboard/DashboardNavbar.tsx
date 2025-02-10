/**
 * Dashboard Navigation Component
 * 
 * Main navigation bar for the dashboard area. Provides:
 * - User profile access
 * - Navigation links
 * - Authentication status
 * - Responsive design
 */

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DashboardNavbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link href="/dashboard" className="font-bold text-xl">
            Nexus
          </Link>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Image
              src={user?.photoURL || '/images/default_pfp.jpg'}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{user?.displayName}</span>
          </motion.div>
        </div>
      </div>
    </nav>
  );
} 