'use client';

import Link from "next/link";
import Image from "next/image";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { motion } from "framer-motion";

export default function Navbar() {
  const isScrollingDown = useScrollDirection();

  return (
    <motion.nav
      className={`fixed w-full top-0 z-[1] border-b border-border bg-background/95 backdrop-blur-md transition-all duration-500 ease-in-out pointer-events-auto ${
        isScrollingDown ? '-translate-y-full' : 'translate-y-0'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-16">
        <div className="container-custom h-full">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo and Brand */}
              <Link href="/" className="cursor-pointer">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/images/Nexus_Social_Logo.png"
                    alt="Nexus Social Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold">Nexus</span>
                </motion.div>
              </Link>
              
              {/* Main navigation */}
              <div className="hidden md:flex items-center gap-6">
                {["Feed", "Messages", "Explore"].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase()}`}
                    className="cursor-pointer"
                  >
                    <motion.span
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {item}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center gap-4">
              <Link href="/auth" className="cursor-pointer">
                <motion.span
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.span>
              </Link>
              <Link href="/auth" className="cursor-pointer">
                <motion.span
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 