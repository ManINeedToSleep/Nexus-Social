import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider, createUserInFirestore } from './firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { User, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

// Temporary mock implementation - will be replaced with actual auth later

export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    useAuthStore.getState().setUser(result.user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Invalid credentials');
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      await updateProfile(result.user, { displayName: name });
      await createUserInFirestore(result.user);
      useAuthStore.getState().setUser(result.user);
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Registration failed');
  }
};

export const signInWithGoogleProvider = async (): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserInFirestore(result.user);
    useAuthStore.getState().setUser(result.user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/popup-blocked':
          throw new Error('Please enable popups for this website');
        case 'auth/cancelled-popup-request':
          throw new Error('Sign in cancelled');
        case 'auth/unauthorized-domain':
          throw new Error('This domain is not authorized for Google sign in');
        default:
          throw new Error(error.message);
      }
    }
    throw new Error('Google sign in failed');
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    useAuthStore.getState().logout();
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Sign out failed');
  }
};

export async function getCurrentUser(): Promise<User | null> {
  return useAuthStore.getState().user;
} 