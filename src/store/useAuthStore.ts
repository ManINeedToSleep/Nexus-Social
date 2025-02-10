/**
 * Authentication State Management
 * 
 * Global store for managing authentication state using Zustand.
 * Handles user authentication state across the application.
 * Persists user data and provides methods for updating auth state.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
