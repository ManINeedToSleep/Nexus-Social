# Session Management & Metadata

## Authentication Persistence

### Overview
We implement Firebase authentication persistence to maintain user sessions across page refreshes and browser restarts. This ensures users stay logged in until they explicitly sign out.

### Implementation

1. **Firebase Persistence Setup**
```typescript
// src/lib/firebase.ts
import { setPersistence, browserLocalPersistence } from "firebase/auth";

// Set persistence to LOCAL (survives browser restarts)
setPersistence(auth, browserLocalPersistence);
```

2. **Auth State Hook**
```typescript
// src/hooks/useAuth.ts
export function useAuth() {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);
}
```

### Session Behavior
- Sessions persist across page refreshes
- Sessions survive browser restarts
- Users remain logged in until they:
  - Explicitly sign out
  - Clear browser data
  - Session token expires (auto-refreshes by default)

## Metadata Management

### Next.js Metadata Handling
Due to Next.js restrictions on client components, we separate metadata into its own server component.

1. **Metadata Configuration**
```typescript
// src/app/metadata.ts
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Social",
  description: "A modern social platform",
};
```

2. **Layout Structure**
```typescript
// src/app/layout.tsx
'use client';

// Client-side layout with auth persistence
export default function RootLayout({ children }) {
  useAuth(); // Initialize auth listener
  // ... layout JSX
}
```

### Why Separate Metadata?
- Next.js metadata must be static or generated server-side
- Client components cannot export metadata
- Separation maintains SEO capabilities while allowing client-side auth

## Best Practices

1. **Security**
   - Use secure session tokens
   - Implement proper token refresh
   - Clear sessions on security-sensitive changes

2. **Performance**
   - Minimize auth state changes
   - Efficient persistence storage
   - Optimize token refresh timing

3. **User Experience**
   - Seamless session management
   - Clear login/logout feedback
   - Proper error handling

## Common Issues & Solutions

1. **Session Loss**
   - Check persistence configuration
   - Verify token expiration
   - Ensure proper error handling

2. **Metadata Issues**
   - Keep metadata in server components
   - Use dynamic metadata when needed
   - Follow Next.js metadata guidelines 