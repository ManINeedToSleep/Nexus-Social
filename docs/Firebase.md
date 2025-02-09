# Firebase Implementation Guide

## Setup and Configuration

### 1. Firebase Project Setup
1. Create a new project in [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore services
3. Configure authentication methods:
   - Email/Password
   - Google Sign-in

### 2. Environment Variables
Create `.env.local` in your project root:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Implementation Details

### 1. Firebase Configuration (`src/lib/firebase.ts`)
```typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
```

### 2. Authentication Methods

#### Email/Password Authentication
```typescript
// Sign Up
export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign In
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

#### Google Authentication
```typescript
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};
```

### 3. User Management

#### User Profile in Firestore
```typescript
export const createUserInFirestore = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: new Date().toISOString(),
    });
  }
};
```

### 4. State Management (Zustand)
```typescript
type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

## Features Implemented

1. **Authentication**
   - Email/Password registration and login
   - Google Sign-in
   - Password strength validation
   - Error handling

2. **User Management**
   - User profile creation
   - Profile updates
   - Persistent user state

3. **Security**
   - Environment variables for sensitive data
   - Client-side validation
   - Server-side security rules (Firestore)

## Usage Examples

### Sign Up
```typescript
try {
  const user = await signUpWithEmail(email, password);
  await updateProfile(user, { displayName: name });
  await createUserInFirestore(user);
} catch (error) {
  console.error('Sign up failed:', error);
}
```

### Sign In
```typescript
try {
  const user = await loginWithEmail(email, password);
  useAuthStore.getState().setUser(user);
} catch (error) {
  console.error('Sign in failed:', error);
}
```

### Google Sign-In
```typescript
try {
  const user = await signInWithGoogle();
  useAuthStore.getState().setUser(user);
} catch (error) {
  console.error('Google sign in failed:', error);
}
```

## Security Considerations

1. **Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

2. **Environment Variables**
- Always use environment variables for sensitive data
- Never commit `.env` files to version control
- Use different Firebase projects for development and production

## Best Practices

1. **Error Handling**
   - Always implement proper error handling
   - Show user-friendly error messages
   - Log errors for debugging

2. **State Management**
   - Use Zustand for global state management
   - Keep authentication state synchronized
   - Handle loading states appropriately

3. **Security**
   - Implement proper validation
   - Use appropriate Firebase security rules
   - Regular security audits

4. **Performance**
   - Implement lazy loading where appropriate
   - Use Firebase SDK efficiently
   - Monitor Firebase usage and quotas 