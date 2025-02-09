# Firebase Storage Implementation

## Configuration

### Storage Setup
```typescript
import { getStorage } from "firebase/storage";
export const storage = getStorage(app);
```

## Image Upload

### Post Images
```typescript
const uploadImage = async (file: File, userId: string): Promise<string> => {
  const imageRef = ref(storage, `posts/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};
```

## Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /posts/{userId}/{allImages=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // 5MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## Best Practices

1. Image Optimization
   - Limit file size (5MB max)
   - Accept only image files
   - Use proper file naming with timestamps

2. Security
   - Validate user authentication
   - Check file types
   - Implement user-specific paths

3. Performance
   - Use proper compression
   - Implement lazy loading
   - Cache control headers 