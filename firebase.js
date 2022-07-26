import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAHa0zBhLDZbyz0UBOHVxDBiYsCPjnZpw8",
  authDomain: "twitter-next-daa61.firebaseapp.com",
  projectId: "twitter-next-daa61",
  storageBucket: "twitter-next-daa61.appspot.com",
  messagingSenderId: "95221719009",
  appId: "1:95221719009:web:817a7d37e9150012867ca0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
