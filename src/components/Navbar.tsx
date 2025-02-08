'use client';

import Link from "next/link";
import Image from "next/image";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Navbar() {
  const isScrollingDown = useScrollDirection();

  return (
    <nav className={`fixed w-full top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-all duration-500 ease-in-out ${
      isScrollingDown ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/Nexus_Social_Logo.png"
                alt="Nexus Social Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Nexus</span>
            </Link>
            
            {/* Main navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/feed" className="text-muted-foreground hover:text-foreground transition-colors">
                Feed
              </Link>
              <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                Messages
              </Link>
              <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-secondary">
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 