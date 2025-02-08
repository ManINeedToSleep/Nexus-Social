'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ size = 24, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-t-transparent border-r-primary border-b-transparent border-l-transparent"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute inset-[35%] rounded-full bg-primary"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 