import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyhQkfChmanDLSKXoeAnMumMNGhjPw-AI",
  authDomain: "thesashaktnari.firebaseapp.com",
  projectId: "thesashaktnari",
  storageBucket: "thesashaktnari.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "848643551725",
  appId: "1:848643551725:web:acdfb51d5cd1d0554277e4",
  measurementId: "G-01TTREC6LC"
};

// ✅ Ensure Firebase is initialized only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export authentication modules correctly
export { auth, provider, signInWithPopup, signOut };
