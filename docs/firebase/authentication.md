# Firebase Authentication

## Implementation Details

### User Authentication Methods

1. Email/Password Authentication
```typescript
// Sign Up
export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserInFirestore(userCredential.user);
  return userCredential.user;
};

// Sign In
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

2. Google Authentication
```typescript
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await createUserInFirestore(result.user);
  return result.user;
};
```

### User Profile Management

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

## State Management

We use Zustand for managing authentication state:

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

## Protected Routes

Routes are protected using a combination of client and server-side checks:

```typescript
// Client-side protection
useEffect(() => {
  if (!user) {
    router.push('/auth');
  }
}, [user, router]);
``` 