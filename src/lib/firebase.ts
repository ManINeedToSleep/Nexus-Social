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
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
// Add these lines to configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const storage = getStorage(app);

// Set persistence to LOCAL (survives browser restarts)
setPersistence(auth, browserLocalPersistence);

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
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
  createdAt: Timestamp;
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
      authorName: user.displayName || "",
      authorImage: user.photoURL || "/images/default_pfp.jpg",
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
    authorImage: user.photoURL || '/images/default_pfp.jpg',
    createdAt: Timestamp.now()
  };

  await updateDoc(postRef, {
    comments: arrayUnion(comment)
  });
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
