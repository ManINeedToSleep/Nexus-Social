/**
 * Firebase Configuration and Utilities
 * 
 * Central configuration for Firebase services and utility functions.
 * Handles authentication, database operations, and real-time updates.
 * 
 * @note Ensure environment variables are properly set
 */

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  User
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  Timestamp, 
  serverTimestamp,
  deleteDoc
} from "firebase/firestore";

import { 
  getStorage, 
  ref, 
  deleteObject } from "firebase/storage";

// Initialize Firebase with environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure persistence
setPersistence(auth, browserLocalPersistence);

// Add these lines to configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const storage = getStorage(app);

// Function to create a new user in Firestore after signing up
export const createUserInFirestore = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || '/images/default_pfp.jpg',
      createdAt: new Date().toISOString(),
    });
  }
};

// Sign up with Email & Password
export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserInFirestore(userCredential.user);
  return userCredential.user;
};

// Sign in with Email & Password
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await createUserInFirestore(result.user);
  return result.user;
};

// Logout function
export const logout = async () => {
  await signOut(auth);
};

// Post types
export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
  createdAt: Timestamp | null;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Timestamp;
}

// Post functions
export const createPost = async (
  content: string, 
  user: User
): Promise<string> => {
  try {
    const postRef = await addDoc(collection(db, 'posts'), {
      content,
      authorId: user.uid,
      authorName: user.displayName || "",
      authorImage: user.photoURL || "/images/default_pfp.jpg",
      likes: [],
      comments: [],
      createdAt: serverTimestamp(),
    });

    return postRef.id;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
};

export const likePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  
  // Optimistic update
  const postSnapshot = await getDoc(postRef);
  const currentLikes = postSnapshot.data()?.likes || [];
  
  if (currentLikes.includes(userId)) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId)
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId)
    });
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId)
  });
};

export const addComment = async (postId: string, content: string, user: User) => {
  const postRef = doc(db, 'posts', postId);
  const comment: Comment = {
    id: Date.now().toString(),
    content,
    authorId: user.uid,
    authorName: user.displayName || '',
    authorImage: user.photoURL || '/images/default_pfp.jpg',
    createdAt: Timestamp.now()
  };

  await updateDoc(postRef, {
    comments: arrayUnion(comment)
  });
  
  // Could add notifications here for the post author
};

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

export const deletePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'posts', postId);
  const post = await getDoc(postRef);
  
  if (!post.exists() || post.data()?.authorId !== userId) {
    throw new Error('Unauthorized or post not found');
  }
  
  // Delete post image if exists
  if (post.data()?.imageUrl) {
    const imageRef = ref(storage, post.data().imageUrl);
    await deleteObject(imageRef);
  }
  
  await deleteDoc(postRef);
};
