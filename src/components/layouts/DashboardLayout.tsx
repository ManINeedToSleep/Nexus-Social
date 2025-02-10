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

import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 flex gap-4 items-center justify-center">
        {/* Radial Gradient */}
        <div className="relative flex h-screen w-screen items-center justify-center bg-background">
          <div className="absolute inset-0 overflow-hidden">
            <div className="aurora-gradient h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-background [mask-image:radial-gradient(transparent,white)] dark:bg-background/90" />
        </div>
      </div>

      {/* Content */}
      <Navbar variant="dashboard" />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
} 