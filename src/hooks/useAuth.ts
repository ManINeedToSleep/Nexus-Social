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

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setUser]);
} 