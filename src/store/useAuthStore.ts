/**
 * Authentication State Management
 * 
 * Global store for managing authentication state using Zustand.
 * Handles user authentication state across the application.
 * Persists user data and provides methods for updating auth state.
 */

import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;      // Current authenticated user or null
  setUser: (user: User | null) => void;  // Method to update user state
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state: no authenticated user
  user: null,
  
  // Method to update the authenticated user
  setUser: (user) => set({ user }),
}));
