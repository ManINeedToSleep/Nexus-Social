/**
 * UI State Management
 * 
 * Global store for managing UI state using Zustand.
 * Handles theme, modals, and UI preferences.
 */

import { create } from 'zustand';

interface UIState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  // Add other UI state as needed
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
})); 