// src/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Signup function
export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Login function
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Logout function
export function logout() {
    return signOut(auth);
}
