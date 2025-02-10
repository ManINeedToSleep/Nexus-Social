/**
 * Authentication Hook
 * 
 * Custom hook to handle Firebase authentication state.
 * Syncs Firebase auth state with Zustand store.
 * 
 * Features:
 * - Automatic auth state persistence
 * - Firebase to Zustand sync
 * - Cleanup on unmount
 */

'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    // Get initial auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  return { loading };
} 