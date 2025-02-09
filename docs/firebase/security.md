# Firebase Security Implementation

## Firestore Rules

### Basic Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
        && request.resource.data.authorId == request.auth.uid;
      allow update: if request.auth != null 
        && (
          // Allow users to like/unlike and comment
          request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(['likes', 'comments'])
          || 
          // Allow post author to edit their post
          resource.data.authorId == request.auth.uid
        );
      allow delete: if request.auth != null 
        && resource.data.authorId == request.auth.uid;
    }
  }
}
```

## Storage Rules

### Image Upload Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /posts/{userId}/{allImages=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Data Validation

### Client-Side
```typescript
// Example of post content validation
const validatePost = (content: string, imageFile: File | null): boolean => {
  if (!content.trim() && !imageFile) return false;
  if (content.length > 1000) return false;
  if (imageFile && imageFile.size > 5 * 1024 * 1024) return false;
  return true;
};
```

### Server-Side
- Use Firebase Functions for additional validation
- Implement rate limiting
- Validate data integrity

## Best Practices

1. Authentication
   - Always check user authentication
   - Validate user permissions
   - Implement proper role-based access

2. Data Access
   - Limit read/write operations
   - Implement proper indexing
   - Use security rules for validation

3. Error Handling
   - Proper error messages
   - Client-side validation
   - Server-side validation 