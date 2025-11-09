// client/src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrYQHTHCEPk6y0V2nhKjcoAhoHibsDerU",
  authDomain: "ai-powered-nutrition-db36a.firebaseapp.com",
  projectId: "ai-powered-nutrition-db36a",
  storageBucket: "ai-powered-nutrition-db36a.firebasestorage.app",
  messagingSenderId: "79600539079",
  appId: "1:79600539079:web:8d2c4884681cb80047b5e2",
  measurementId: "G-YLTLCENF62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// ✅ Export Firebase services (named exports)
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

// Also export the initialized app (optional)
export default app;
