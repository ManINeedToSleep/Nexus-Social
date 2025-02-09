import { signUpWithEmail, loginWithEmail, signInWithGoogle, logout as firebaseLogout, createUserInFirestore } from './firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { User, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

// Temporary mock implementation - will be replaced with actual auth later

export async function signIn(email: string, password: string): Promise<void> {
  try {
    const user = await loginWithEmail(email, password);
    useAuthStore.getState().setUser(user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Invalid credentials');
  }
}

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<void> {
  try {
    const user = await signUpWithEmail(email, password);
    if (user) {
      await updateProfile(user, { displayName: name });
      await createUserInFirestore(user);
      useAuthStore.getState().setUser(user);
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Registration failed');
  }
}

export async function signInWithGoogleProvider(): Promise<void> {
  try {
    const user = await signInWithGoogle();
    useAuthStore.getState().setUser(user);
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
}

export async function signOut(): Promise<void> {
  try {
    await firebaseLogout();
    useAuthStore.getState().setUser(null);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error('Sign out failed');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  return useAuthStore.getState().user;
} 