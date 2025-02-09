# Firebase Posts System

## Data Structure

### Post Interface
```typescript
interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
  createdAt: Timestamp;
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Timestamp;
}
```

## Post Operations

### Creating Posts
```typescript
export const createPost = async (
  content: string, 
  imageFile: File | null, 
  user: User
): Promise<string> => {
  try {
    let imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const postRef = await addDoc(collection(db, 'posts'), {
      content,
      imageUrl,
      authorId: user.uid,
      authorName: user.displayName,
      authorImage: user.photoURL,
      likes: [],
      comments: [],
      createdAt: serverTimestamp(),
    });

    return postRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
```

### Real-time Updates
```typescript
export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  const q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
    callback(posts);
  });
};
```

### Likes System
```typescript
export const likePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId)
  });
};

export const unlikePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId)
  });
};
```

### Comments System
```typescript
export const addComment = async (
  postId: string, 
  content: string, 
  user: User
) => {
  const postRef = doc(db, 'posts', postId);
  const comment: Comment = {
    id: Date.now().toString(),
    content,
    authorId: user.uid,
    authorName: user.displayName || '',
    authorImage: user.photoURL || '',
    createdAt: Timestamp.now()
  };

  await updateDoc(postRef, {
    comments: arrayUnion(comment)
  });
};
``` 